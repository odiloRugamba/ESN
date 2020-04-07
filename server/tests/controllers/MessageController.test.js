const mongoose = require('mongoose');
const testDatabase = require("../../config/main").test_db;

// const app = require('../../server');
const request = require('supertest'); // Endpoint testing package.

const Chat = require("../../models/Chat");

it('Testing to see if Jest works', () => {
    expect(1).toBe(1);
});


// Tests setup.
beforeAll(async () => {

    jest.setTimeout(30000);

    // Connecting to the database.
    await mongoose.connect(testDatabase, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10
    });
});


// Before each test.
beforeEach(async () => {

    // Creating new chats, and adding them to the database.
    const chat1 = new Chat({ sender: "MarkDan", text: "Hello there" });
    await chat1.save();

    const chat2 = new Chat({ sender: "JimBrian", text: "How are you doing?" });
    await chat2.save();

    const chat3 = new Chat({ sender: "PeterClever", text: "Not so great right now" });
    await chat3.save();

});


// After each test.
afterEach(async () => {
    // Removing the users.
    await Chat.remove({});
});


// Tests Teardown.
afterAll(async () => {
    // Closing the database connection.
    await mongoose.connection.close();
});


// describe("Verifying chats can be retrieved: (GET /messages/public ) ", () => {
//
//     it("It should respond with an array of messages", async done => {
//         const response = await request(app)
//             .get("/messages/public");
//
//         await console.log(response.statusCode);
//         expect(response.body.length).toBe(3);
//         expect(response.statusCode).toBe(200);
//
//         done();
//     });
// });
//
// describe("Verifying chats can be created: (POST /messages/public ) ", () => {
//
//     it("It should respond with a newly-created message", async done => {
//         const response = await request(app)
//             .post("/messages/public")
//             .send({
//                 sender: "MikeSmith"
//             })
//             .send({
//                 text: "How is it going bro?"
//             })
//             .set('Accept', 'application/json');
//
//         await console.log(response.statusCode);
//         // expect(response.body.length).toBe(3);
//         // expect(response.statusCode).toBe(200);
//
//         done();
//     });
// });