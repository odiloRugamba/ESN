const dbHandler = require('../db-handler');

const request = require('supertest'); // Endpoint testing package.

const UserRepo = require("../../repo/UserRepo");
const ChatRepo = require("../../repo/ChatRepo");
const AnnouncementRepo = require("../../repo/AnnouncementRepo");

const app = require('../../app')

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const username = "MikeSmith";
const username2 = "john";
let token = null;

// Add a user and obtain a token
beforeEach(async () => {
    await UserRepo.saveUser(username, "password");
    await UserRepo.saveUser(username2, "password");
    const response = await request(app)
        .post('/login')
        .send({
            username: username,
            password: "password"
        });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    token = response.body.token;
});


describe("Verifying searching for users", () => {

    it("it should respond with an array", async done => {
        request(app)
            .post('/search')
            .set('Authorization', 'Bearer '+token)
            .send({
                context: 'users',
                terms: 'john'
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.statusCode).toBe(200);
                expect(response.body.length).toBe(1);
                done();
            });
    });

});

describe("Verifying searching for public chats", () => {

    it("it should respond with an array", async done => {
        expect(await ChatRepo.savePublicChat({ sender: username, text: "Hello word" })).not.toBe(null);
        expect(await ChatRepo.savePublicChat({ sender: username, text: "good day" })).not.toBe(null);
        expect(await ChatRepo.savePublicChat({ sender: username2, text: "hi" })).not.toBe(null);

        request(app)
            .post('/search')
            .set('Authorization', 'Bearer '+token)
            .send({
                context: 'public-messages',
                terms: 'h'
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.statusCode).toBe(200);
                expect(response.body.length).toBe(2);
                done();
            });
    });

});

describe("Verifying searching for private chats", () => {

    it("it should respond with an array", async done => {
        expect(await ChatRepo.savePrivateChat(username, username2, "Hello word")).not.toBe(null);
        expect(await ChatRepo.savePrivateChat(username2, username, "good day")).not.toBe(null);
        expect(await ChatRepo.savePrivateChat(username, username2, "hi")).not.toBe(null);

        request(app)
            .post('/search')
            .set('Authorization', 'Bearer '+token)
            .send({
                context: 'private-messages',
                terms: 'DaY',
                extras: {
                    username1: username,
                    username2: username2
                }
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.statusCode).toBe(200);
                expect(response.body.length).toBe(1);
                done();
            });
    });

});

describe("Verifying searching for announcements", () => {

    it("it should respond with an array", async done => {
        expect(await AnnouncementRepo.saveAnnouncement({sender: username, text: "new announcement"})).not.toBe(null);
        expect(await AnnouncementRepo.saveAnnouncement({sender: username2, text: "new virus"})).not.toBe(null);
        expect(await AnnouncementRepo.saveAnnouncement({sender: username2, text: "under lockdown"})).not.toBe(null);
        expect(await AnnouncementRepo.saveAnnouncement({sender: username, text: "cases rising"})).not.toBe(null);
        expect(await AnnouncementRepo.saveAnnouncement({sender: username, text: "people recovering"})).not.toBe(null);

        request(app)
            .post('/search')
            .set('Authorization', 'Bearer '+token)
            .send({
                context: 'search-announcements',
                terms: 'NEW'
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.statusCode).toBe(200);
                expect(response.body.length).toBe(2);
                done();
            });
    });

});
