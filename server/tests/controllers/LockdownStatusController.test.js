const dbHandler = require('../db-handler');

const request = require('supertest'); // Endpoint testing package.

const bcrypt = require('bcryptjs');
const User = require("../../models/User");

const app = require('../../app')

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const username = "kigali mayor";
let token = null;

// Add a city rep user and obtain a token
beforeEach(async () => {
    const pwd = await bcrypt.hash("password", 12);
    await User({username: username, password: pwd, role: 'city_rep' }).save();
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

it("Verifying update lockdown status", async (done) => {
    request(app)
        .post('/lockdown/status')
        .set('Authorization', 'Bearer '+token)
        .send({status: true})
        .expect(200, done)
});

it("Verifying get lockdown status", async (done) => {
    request(app)
        .get('/lockdown/status')
        .set('Authorization', 'Bearer '+token)
        .expect(200)
        .then(response => {
            expect('status' in response.body).toBe(true);
            expect('tracking' in response.body).toBe(true);
            expect('nottracking' in response.body).toBe(true);
            expect('infected' in response.body).toBe(true);
            expect('potentially' in response.body).toBe(true);
            done();
        })
});
