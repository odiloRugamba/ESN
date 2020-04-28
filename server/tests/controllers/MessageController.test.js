const dbHandler = require('../db-handler');

const request = require('supertest'); // Endpoint testing package.

const UserRepo = require("../../repo/UserRepo");

const Chat = require("../../models/Chat");

const app = require('../../app')

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const username1 = "MikeSmith";
const username2 = "johnx";
let token = null;

// Add a user and obtain a token
beforeEach(async () => {
    await UserRepo.saveUser(username1, "password");
    await UserRepo.saveUser(username2, "password");
    const response = await request(app)
        .post('/login')
        .send({
            username: username1,
            password: "password"
        });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    token = response.body.token;
});

describe("Verifying public chats", () => {

    // add some chats
    beforeEach(async () => {
        await Chat({sender: username1, text: 'hi', messageType: 'public'}).save();
        await Chat({sender: username2, text: 'hello', messageType: 'public'}).save();
        await Chat({sender: username1, text: 'how are you?', messageType: 'public'}).save();
    });

    it("Verify retrieving chats, it should respond with an array of messages", done => {
        request(app)
            .get("/messages/public")
            .set('Authorization', 'Bearer '+token)
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.statusCode).toBe(200);
                expect(response.body.length).toBe(3);
                done();
            });
    });

    it("Verify send a chat, it should respond with created", done => {
        request(app)
            .post("/messages/public")
            .set('Authorization', 'Bearer '+token)
            .send({
                sender: username1,
                text: 'message'
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.statusCode).toBe(201);
                done();
            });
    });

});

describe("Verifying private chats", () => {

    // add some chats
    beforeEach(async () => {
        await Chat({sender: username1, receiver: username2, text: 'hi', messageType: 'private'}).save();
        await Chat({sender: username2, receiver: username1, text: 'hello', messageType: 'private'}).save();
        await Chat({sender: username1, receiver: username2, text: 'how is it?', messageType: 'private'}).save();
    });

    it("Verify retrieving chats, it should respond with an array of messages", done => {
        request(app)
            .get("/messages/private/"+username1+"/"+username2)
            .set('Authorization', 'Bearer '+token)
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.statusCode).toBe(200);
                expect(response.body.length).toBe(3);
                done();
            });
    });

    it("Verify send a chat, it should respond with created", done => {
        request(app)
            .post("/messages/private")
            .set('Authorization', 'Bearer '+token)
            .send({
                sender: username1,
                receiver: username2,
                text: 'message'
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.statusCode).toBe(201);
                done();
            });
    });

});
