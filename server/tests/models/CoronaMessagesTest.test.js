const dbHandler = require('../db-handler');

const CoronaMessage = require("../../models/CoronaMessage");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe("Test Corona Message Model", () => {


    it("Test create Corona Message", async done => {
        // create a new corona message
        const coronaMsg = new CoronaMessage({ sender: "john20", text: "I have corona virus", current_status: { text: 'help' } })
        // persist the corona message
        await coronaMsg.save()

        // attempt to retrieve the corona message from the database
        const newCoronaMsg = await CoronaMessage.findOne({ sender: "john20", text: "I have corona virus" });

        const expectedText = "I have corona virus";
        const actualText = newCoronaMsg.text;
        // test if they match
        expect(actualText).toEqual(expectedText);
        done()
    })

    it("Test update the Corona Message", async done => {
        // create a new corona message
        const coronaMsg = new CoronaMessage({ sender: "john21", text: "I have corona virus", current_status: { text: 'help' } })
        // persist the corona message
        await coronaMsg.save()

        // modify the corona message
        coronaMsg.text = "I don't have corona virus";
        // save the changes
        await coronaMsg.save()

        // test if the new text is saved
        expect(coronaMsg.text).toEqual("I don't have corona virus");
        done();
    })

    it("Test delete the Corona Message", async done => {
        // create a new corona message
        const coronaMsg = new CoronaMessage({ sender: "john22", text: "I have corona virus", current_status: { text: 'help' } })
        // persist the corona message
        await coronaMsg.save()

        //delete the user
        await CoronaMessage.remove({ sender: "john22", text: "I have corona virus" });

        // attempt to get the user in the database
        const savedCoronaMsga = await CoronaMessage.findOne({ sender: "john22", text: "I have corona virus" });
        // test to see it return empty
        expect(savedCoronaMsga).toBeFalsy();
        done();
    })

});