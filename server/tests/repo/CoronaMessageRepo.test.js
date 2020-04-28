const dbHandler = require('../db-handler');

const User = require("../../models/User");
const CoronaMessage = require("../../models/CoronaMessage");
const CoronaMessageRepo = require("../../repo/CoronaMessageRepo");


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Test the CoronaMessageRepo", () => {

    
    it("Test CoronaMessageRepo.saveCoronaMessage() function", async done => {

        // create a message
        const msg = { sender: "john5", text: "I have corona virus" };
        await User({ username: 'john5', password: "password" }).save()

        expect(await CoronaMessageRepo.saveCoronaMessage(msg)).not.toBe(null);

        // attempt to get the message from the database
        const coronaMsg = await CoronaMessage.findOne({ sender: "john5" });

        expect(coronaMsg).not.toBe(null);
        expect(coronaMsg.messageType).toBe('coronamsg');

        done();
    });
    
    it("Test when no user in CoronaMessageRepo.saveCoronaMessage() function", async done => {

        // create a message
        const msg = { sender: "john5", text: "I have corona virus" };

        expect(await CoronaMessageRepo.saveCoronaMessage(msg)).toBe(null);

        // attempt to get the message from the database
        const coronaMsg = await CoronaMessage.findOne({ sender: "john5" });

        expect(coronaMsg).toBe(null);

        done();
    });
    

    it("Test CoronaMessageRepo.getAllCoronaMessages() function", async done => {

        // create a couple of messages and persist them in the database
        const coronaMsg1 = new CoronaMessage({ sender: "doe1", text: "I have corona virus", messageType: "coronamsg" });
        await coronaMsg1.save()

        const coronaMsg2 = new CoronaMessage({ sender: "doe2", text: "I have corona virus", messageType: "coronamsg" });
        await coronaMsg2.save()

        const coronaMsg3 = new CoronaMessage({ sender: "doe3", text: "I have corona virus", messageType: "coronamsg" });
        await coronaMsg3.save()

        // query the database to see the content
        const coronaMsgs = await CoronaMessageRepo.getAllCoronaMessages();

         expect(coronaMsgs.length).toEqual(3);
         done();
     });
    
})
