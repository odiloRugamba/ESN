const dbHandler = require('../db-handler');

const request = require('supertest'); // Endpoint testing package.

const UserRepo = require("../../repo/UserRepo");

const app = require('../../app')

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const username = "MikeSmith";
let token = null;

// Add a user and obtain a token
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


describe("Verifying update of a user status: (PUT /users/:username/status ) ", () => {

    it("With a valid status code, it should respond with OK", async done => {
        request(app)
            .put('/users/'+username+'/status')
            .set('Authorization', 'Bearer '+token)
            .send({
                status: 'help'
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.statusCode).toBe(200);
                UserRepo.findUser(username).then(user => {
                    expect(user.current_status.text).toBe('help');
                    done();
                });
            });
    });

    it("With an invalid status code, it should respond with OK", async done => {
        request(app)
            .put('/users/'+username+'/status')
            .set('Authorization', 'Bearer '+token)
            .send({
                status: 'newStatus'
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.statusCode).toBe(404);
                UserRepo.findUser(username).then(user => {
                    expect(user.current_status.text).toBe('undefined');
                    done();
                });
            });
    });

});

describe("Verifying get infection status of a user: (GET /users/:username/infection/status ) ", () => {

    it("It should respond with OK and the infection status", async done => {
        request(app)
            .get('/users/'+username+'/infection/status')
            .set('Authorization', 'Bearer '+token)
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.statusCode).toBe(200);
                expect(response.body).toHaveProperty("status");
                expect(response.body.status).toBe("nottested");
                done();
            });
    });

});
