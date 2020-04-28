const dbHandler = require('../db-handler');

const User = require("../../models/User");
const Chat = require("../../models/Chat");
const ChatRepo = require("../../repo/ChatRepo");


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Test the UserRepo", () => {

    
    it("Test ChatRepo.savePublicChat() function", async done => {

        // create a message
        const msg = { sender: "john5", text: "Hello word" };
        await User({ username: 'john5', password: "password" }).save()

        expect(await ChatRepo.savePublicChat(msg)).not.toBe(null);

        // attempt to get the message from the database
        const chat = await Chat.findOne({ sender: "john5" });

        expect(chat).not.toBe(null);
        expect(chat.messageType).toBe('public');

        done();
    });
    
    it("Test when no user in ChatRepo.savePublicChat() function", async done => {

        // create a message
        const msg = { sender: "john5", text: "Hello word" };

        expect(await ChatRepo.savePublicChat(msg)).toBe(null);

        // attempt to get the message from the database
        const chat = await Chat.findOne({ sender: "john5" });

        expect(chat).toBe(null);

        done();
    });
    

    it("Test ChatRepo.listPublicMessages() function", async done => {

        await User({ username: 'doe1', password: "password" }).save()
        await User({ username: 'doe2', password: "password" }).save()
        await User({ username: 'doe3', password: "password" }).save()
        // create a couple of messages and persist them in the database
        const chat1 = new Chat({ sender: "doe1", text: "Hello world", messageType: "public" });
        await chat1.save()

        const chat2 = new Chat({ sender: "doe2", text: "Hello world", messageType: "public" });
        await chat2.save()

        const chat3 = new Chat({ sender: "doe3", text: "Hello world", messageType: "public" });
        await chat3.save()

        // query the database to see the content
        const chats = await ChatRepo.listPublicMessages();

        expect(chats.length).toEqual(3);
        done();
    });

    it("Test ChatRepo.savePrivateChat() function", async done => {

        await User({ username: 'johnx', password: "password" }).save()
        await User({ username: 'john5', password: "password" }).save()

        expect(await ChatRepo.savePrivateChat('johnx', 'john5', 'MESSAGE')).not.toBe(null);

        // attempt to get the message from the database
        const chat = await Chat.findOne({ sender: "johnx" });

        expect(chat).not.toBe(null);
        expect(chat.messageType).toBe('private');
        expect(chat.receiver).toBe('john5');

        done();
    });

    it("Test no user in ChatRepo.savePrivateChat() function", async done => {

        expect(await ChatRepo.savePrivateChat('johnx', 'john5', 'MESSAGE')).toBe(null);

        // attempt to get the message from the database
        const chat = await Chat.findOne({ sender: "johnx" });

        expect(chat).toBe(null);

        done();
    });

    it("Test ChatRepo.getLatestMessages() function", async done => {

        // create a message
        await User({ username: 'johnx', password: "password" }).save()
        await User({ username: 'john5', password: "password" }).save()

        expect(await ChatRepo.savePrivateChat('johnx', 'john5', 'MESSAGE')).not.toBe(null);
        expect(await ChatRepo.savePrivateChat('john5', 'johnx', 'Hi')).not.toBe(null);
        expect(await ChatRepo.savePrivateChat('johnx', 'john5', 'Hello')).not.toBe(null);

        // attempt to get the message from the database
        const chats = await ChatRepo.getLatestMessages('john5', 'johnx');

        expect(chats).not.toBe(null);
        expect(chats.length).toBe(3);

        done();
    });
    
    it("Test ChatRepo.searchPublicChatByText() function", async done => {

        // create a message
        await User({ username: 'john5', password: "password" }).save()

        expect(await ChatRepo.savePublicChat({ sender: "john5", text: "Hello word" })).not.toBe(null);
        expect(await ChatRepo.savePublicChat({ sender: "john5", text: "good day" })).not.toBe(null);
        expect(await ChatRepo.savePublicChat({ sender: "john5", text: "hi" })).not.toBe(null);

        // attempt to get the message from the database
        const chat = await ChatRepo.searchPublicChatByText('DAY');

        expect(chat).not.toBe(null);
        expect(chat.length).toBe(1);
        expect(chat[0].text.toLowerCase().indexOf('day')).not.toBe(-1);

        done();
    });
    
})
