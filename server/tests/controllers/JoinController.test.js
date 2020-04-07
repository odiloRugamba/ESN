const mongoose = require('mongoose');
const testDatabase = require("../../config/main").test_db;

// const app = require('../../server');
const request = require('supertest'); // Endpoint testing package.

const User = require("../../models/User");

it('Testing to see if Jest works', () => {
    expect(1).toBe(1);
});


// Tests setup.
// beforeAll(async () => {
//     // Connecting to the database.
//     await mongoose.connect(testDatabase, { useNewUrlParser: true,
//         useUnifiedTopology: true});
// });

// Before each tests.
// beforeEach(async () => {
//
//     // Adding users to test database.
//     const user1 = new User({ username: "MikeJones", password: "mikejones" });
//     await user1.save();
//
//     const user2 = new User({ username: "JimJones", password: "jimjones" });
//     await user2.save();
//
//     const user3 = new User({ username: "Kimkim", password: "kimkim" });
//     await user3.save();
// });

// After each test.
// afterEach(async () => {
//     // Removing the users.
//     await User.remove({});
// });

// Tests Teardown.
// afterAll(async () => {
//     // Closing the database connection.
//     await mongoose.connection.close();
// });

// describe("Verifying creation of a user with a token: (GET /login ) ", () => {
//
//     it("It should respond with a user, with a valid token", async done => {
//
//         const response = await request(app)
//             .get("/login")
//             .send({
//                 username: "MikeSmith"
//             })
//             .send({
//                 password: "password"
//             })
//             .set('Accept', 'application/json');
//
//         expect(response.body).toBe(3);
//         expect(response.statusCode).toBe(200);
//         // expect(response.body[0]).toHaveProperty("username");
//
//         done();
//     });
// });

// describe("Verifying retrieval of users: (GET /users ) ", () => {
//
//     it("It should respond with an array of users", async done => {
//         const response = await request(app)
//             .get("/users");
//
//         expect(response.body.length).toBe(3);
//         expect(response.statusCode).toBe(200);
//         // expect(response.body[0]).toHaveProperty("username");
//
//         done();
//     });
// });
//
// describe("Verifying creation of users: (POST /users ) ", () => {
//
//     it("It should respond with a newly created user", async done => {
//         const newUser = await request(app)
//             .post("/users")
//             .send({
//                 username: "MikeSmith"
//             })
//             .send({
//                 password: "password"
//             })
//             .set('Accept', 'application/json');

        // expect(newUser.body.username).toBe("MikeSmith");
        // expect(newUser.statusCode).toBe(200);

        // // Number of users should now be 4.
        // const response = await request(app)
        //     .get("/users");
        // expect(response.body.length).toBe(4);

//         done();
//     });
// });


// // it("Verify that a single user can be retrieved", async (done) => {
// //     const res = await request(app).get('/users/{username}');
// //     expect(res.statusCode).toBe(200);
// //     done();
// // });
//
// // it("Verifying that a registered user logs in", async (done) => {
// //     const res = await request(app).post('/login');
// //     expect(res.statusCode).toBe(200);
// //     console.log(res);
// //     done();
// // });


/*
it(" asynchronouse code", async (done) => {
    const user = await request(app).get('/login').expect(404);
    expect(user.statusCode).toBe(404);
    done();
})




    it(" asynchronouse code", async (done) => {
        const req = await request(app).get('/login').expect(404);
        //expect(user.statusCode).toBe(404);
        //console.log(req);
        done();
    })


    it(" post login ", async (done) => {
        const req = await request(app).post('/login')
            .send("username=john")
            .send("password=johndoe")
            .set('Accept', 'application/json')
            .expect(200);
        //console.log(req);
        done();
    })
    */