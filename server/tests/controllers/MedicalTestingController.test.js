const dbHandler = require('../db-handler');

// const app = require('../../server');
const request = require('supertest'); // Endpoint testing package.

const bcrypt = require('bcryptjs');
const User = require("../../models/User");

const app = require('../../app')

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

const username = "nurse";
let token = null;

// Add a health worker user and obtain a token
beforeEach(async () => {
    const pwd = await bcrypt.hash("password", 12);
    await User({username: username, password: pwd, role: 'health_worker', infection_status: {status: 'potentially'} }).save();
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

it("Verifying get users infection status", async (done) => {
    await User({username: 'johnx', password: 'password'}).save();
    await User({username: 'johny', password: 'password', infection_status: {status: 'negative'}}).save();
    await User({username: 'johnz', password: 'password', infection_status: {status: 'positive'}}).save();
    request(app)
        .get('/users/infection/status')
        .set('Authorization', 'Bearer '+token)
        .expect(200)
        .then(async response => {
            expect(response.body.length).toBe(4);

            const nottested = response.body.filter(x => x.infection_status.status === 'nottested');
            expect(nottested.length).toBe(1);
            expect(nottested[0].username).toBe('johnx');

            const negative = response.body.filter(x => x.infection_status.status === 'negative');
            expect(negative.length).toBe(1);
            expect(negative[0].username).toBe('johny');

            const positive = response.body.filter(x => x.infection_status.status === 'positive');
            expect(positive.length).toBe(1);
            expect(positive[0].username).toBe('johnz');
            done();
        })
});

it("Verifying update user infection status", async (done) => {
    await User({username: 'johnx', password: 'password'}).save();
    request(app)
        .post('/users/johnx/infection/status')
        .set('Authorization', 'Bearer '+token)
        .send({status: 'negative'})
        .expect(200)
        .then(async () => {
            const user = await User.findOne({username: 'johnx'});
            expect(user.infection_status.status).toBe('negative');
            done();
        })
});

it("Verifying update non-existent user infection status", async (done) => {
    request(app)
        .post('/users/johnx/infection/status')
        .set('Authorization', 'Bearer '+token)
        .send({status: 'negative'})
        .expect(404, done);
});
