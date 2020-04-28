const dbHandler = require('../db-handler');

const request = require('supertest'); // Endpoint testing package.

const bcrypt = require('bcryptjs');
const User = require("../../models/User");

const Announcement = require("../../models/Announcement");

const app = require('../../app')

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const username1 = "MikeSmith";
let token = null;

// Add a user and obtain a token
beforeEach(async () => {
    const pwd = await bcrypt.hash("password", 12);
    await User({username: username1, password: pwd, role: 'coordinator' }).save();
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

describe("Verifying send announcement", () => {

    it("Verify send, it should respond with created", done => {
        request(app)
            .post("/announcements")
            .set('Authorization', 'Bearer '+token)
            .send({
                sender: username1,
                text: 'new announcement'
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.statusCode).toBe(201);
                done();
            });
    });

});

describe("Verifying retrieve announcements", () => {

    // add some chats
    beforeEach(async () => {
        await Announcement({publisher: username1, text: 'new virus'}).save();
        await Announcement({publisher: username1, text: 'lockdown'}).save();
        await Announcement({publisher: username1, text: 'cases'}).save();
    });

    it("Verify retrieving, it should respond with an array of announcements", done => {
        request(app)
            .get("/announcements")
            .set('Authorization', 'Bearer '+token)
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.statusCode).toBe(200);
                expect(response.body.length).toBe(3);
                done();
            });
    });

});
