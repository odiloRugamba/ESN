const mongoose = require('mongoose')
const testDatabase = require("../../config/main").test_db
const dbHandler = require('../db-handler');

const Chat = require("../../models/Chat");



beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Test Chat Model", () => {


    it("Test create chat", async done => {
        // create a new chat message
        const chat = new Chat({ sender: "john20", text: "Hello world", current_status: { text: 'help' } })
        // persist the chat message
        await chat.save()

        // attempt to retrieve the chat message from the database
        const newChat = await Chat.findOne({ sender: "john20", text: "Hello world" });

        const expectedText = "Hello world";
        const actualText = newChat.text;
        // test if they match
        expect(actualText).toEqual(expectedText);
        done()
    })

    it("Test the update chat", async done => {
        // create a new chat message
        const chat = new Chat({ sender: "john21", text: "Hello world", current_status: { text: 'help' } })
        // persist the chat message
        await chat.save()

        // modify the chat
        chat.text = "Hello Mars";
        // save the changes
        await chat.save()

        // test if the new text is saved
        expect(chat.text).toEqual("Hello Mars");
        done();
    })

    it("Test delete the chat", async done => {
        // create a new chat message
        const chat = new Chat({ sender: "john22", text: "Hello world", current_status: { text: 'help' } })
        // persist the chat message
        await chat.save()

        //delete the user
        await Chat.remove({ sender: "john22", text: "Hello world" });

        // attempt to get the user in the database
        const savedChat = await Chat.findOne({ sender: "john22", text: "Hello world" });
        // test to see it return empty
        expect(savedChat).toBeFalsy();
        done();
    })

});