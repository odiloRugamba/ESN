const dbHandler = require('../db-handler');

// const app = require('../../server');
const request = require('supertest'); // Endpoint testing package.

const UserRepo = require("../../repo/UserRepo");

const app = require('../../app')

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Verifying login of a user: (GET /login ) ", () => {

    it("It should respond with a user, with a valid token", async done => {
        await UserRepo.saveUser("MikeSmith", "password");

        const response = await request(app)
            .post("/login")
            .send({
                username: "MikeSmith",
                password: "password"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("user");
        expect(response.body.user).toHaveProperty("username");
        expect(response.body.user.username).toBe("MikeSmith");
        expect(response.body).toHaveProperty("token");

        done();
    });

    it("It should respond with unauthorized", async done => {
        await UserRepo.saveUser("MikeSmith", "password");

        const response = await request(app)
            .post("/login")
            .send({
                username: "MikeSmith",
                password: "wrongPassword"
            });

        expect(response.statusCode).toBe(401);

        done();
    });
});

describe("Verifying retrieval of users: (GET /users ) ", () => {

    const username = "MikeSmith";
    let token = null;

    beforeEach(async () => {
        await UserRepo.saveUser(username, "password");
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

    it("It should respond with an array of users", async done => {
        await UserRepo.saveUser("johnx", "password");
        await UserRepo.saveUser("johny", "password");

        request(app)
            .get("/users")
            .set('Authorization', 'Bearer '+token)
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.statusCode).toBe(200);
                expect(response.body.length).toBe(3);
                done();
            })
    });
});


describe("Verifying registration: (POST /register ) ", () => {
    it("Verifying correct registration", async (done) => {
        request(app)
            .post('/register')
            .send({username: 'johnx', password: 'password'})
            .expect(201)
            .then(response => {
                expect('user' in response.body).toBe(true);
                expect(response.body.user.username).toBe('johnx');
                expect('token' in response.body).toBe(true);
                done();
            })
    });

    it("Verifying missing username", async (done) => {
        request(app)
            .post('/register')
            .send({password: 'password'})
            .expect(400, done)
    });

    it("Verifying existing username", async (done) => {
        await UserRepo.saveUser("johnx", "password");
        request(app)
            .post('/register')
            .send({username: 'johnx', password: 'password'})
            .expect(409, done)
    });

});

describe("Verifying check of username: (HEAD /users/:username ) ", () => {
    it("It should return 404", async (done) => {
        request(app)
            .head('/users/johnx')
            .expect(404, done)
    });

    it("It should return 200", async (done) => {
        await UserRepo.saveUser("johnx", "password");
        request(app)
            .head('/users/johnx')
            .expect(200, done)
    });
});
