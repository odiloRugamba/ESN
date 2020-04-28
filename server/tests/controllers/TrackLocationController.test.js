const dbHandler = require('../db-handler');

// const app = require('../../server');
const request = require('supertest'); // Endpoint testing package.

const User = require("../../models/User");
const UserRepo = require("../../repo/UserRepo");
const Geolocation = require('../../models/Geolocation');

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

it("Verifying update user permission", async (done) => {
    request(app)
        .put('/tracklocation/users/'+username+'/permission')
        .set('Authorization', 'Bearer '+token)
        .send({status: 'denied'})
        .expect(200)
        .then(async () => {
            const user = await User.findOne({username: username});
            expect(user.tracking_status).toBe('denied')
            done();
        })
});

it("Verifying update user location", async (done) => {
    request(app)
        .post('/tracklocation/users/'+username)
        .set('Authorization', 'Bearer '+token)
        .send({lat: 30, long: -1.9})
        .expect(201)
        .then(async () => {
            const location = await Geolocation.findOne({user: username});
            expect(location.location.coordinates.length).toBe(2);
            expect(location.location.coordinates[0]).toBe(-1.9);
            expect(location.location.coordinates[1]).toBe(30);
            done();
        })
});
