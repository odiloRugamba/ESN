const dbHandler = require('../db-handler');

const request = require('supertest'); // Endpoint testing package.

const bcrypt = require('bcryptjs');
const User = require("../../models/User");
const UserRepo = require("../../repo/UserRepo");

const app = require('../../app')

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const username = "MikeSmith";
let token = null;

// Add a user and obtain a token
beforeEach(async () => {
    const pwd = await bcrypt.hash("password", 12);
    await User({username: username, password: pwd, role: 'administrator' }).save();
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

describe("Verifying administer user profile", () => {

    it("Verify list users, it should respond with an array", done => {
        request(app)
            .get("/allusers")
            .set('Authorization', 'Bearer '+token)
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveLength(1);
                done();
            });
    });

});

describe("Verifying administer user profile", () => {

    let user = null;

    // add some chats
    beforeEach(async () => {
        await UserRepo.saveUser('johnx', 'password');
        user = await User.findOne({username: 'johnx'});
        expect(user).not.toBe(null);
    });

    it("Verify update user profile, it should respond with 200", done => {
        user.active = false;
        request(app)
            .post("/updateuser")
            .set('Authorization', 'Bearer '+token)
            .send(user)
            .end(async (err, response) => {
                expect(err).toBe(null);
                expect(response.statusCode).toBe(200);
                user = await User.findOne({username: 'johnx'});
                expect(user.active).toBe(false);
                done();
            });
    });

});
