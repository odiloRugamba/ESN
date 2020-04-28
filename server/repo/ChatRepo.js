const Chat = require('../models/Chat');
const UserRepo = require('./UserRepo');

class ChatRepo {

    constructor() {
    }

    async savePublicChat(message) {
        const user = await UserRepo.findUser(message.sender);
        if (user) {
        const chat = new Chat({ sender: message.sender, text: message.text,status: user.current_status.text, messageType: 'public' });
        const saveChat = await chat.save();
        return saveChat;
        }
        else return null;
    }

    async savePrivateChat(sender, receiver, message) {
        const user = await UserRepo.findUser(sender);
        if (user) {
            const chat = new Chat({ sender: sender, receiver: receiver, text: message, status: user.current_status.text, messageType: 'private' });
            const saveChat = await chat.save();
            if(saveChat) {
                return saveChat;
            }
        } 
        return null;
    }

    async listPublicMessages() {
        const activeUsers = await UserRepo.getActiveUsername();
        return await Chat.find({
            messageType: "public",
            sender: {
                "$in": activeUsers
            }
        });
    }

    async getLatestMessages(username1, username2) {
        const activeUsers = await UserRepo.getActiveUsername();
        if(activeUsers.indexOf(username1) === -1 || activeUsers.indexOf(username2) === -1) {
            return [];
        }
        return await Chat.find({
            $or: [
                { $and: [{ sender: username1 }, { receiver: username2 }, { messageType: "private" }] },
                { $and: [{ receiver: username1 }, { sender: username2 }, { messageType: "private" }] }
            ]
        }).sort({ created_at: 1 })
        //Where usernames are this order based on timestamp, limit 10 where label is private
    }


    async searchPublicChatByText(query) {
        return await Chat
            .find({ messageType: "public", "text": { "$regex": query, "$options": "i" } });
    }


    async searchPrivateChatByText(query, username1, username2) {
        return await Chat.find({
            $or: [
                { 
                    $and: [
                        { sender: username1 }, 
                        { receiver: username2 }, 
                        { messageType: "private" },
                        { text: { "$regex": query, "$options": "i" } },
                    ] 
                },
                { 
                    $and: [
                        { receiver: username1 }, 
                        { sender: username2 }, 
                        { messageType: "private" },
                        { text: { "$regex": query, "$options": "i" } },
                    ] 
                }
            ]
        }).sort({ created_at: 1 })
    }


}


const chatRepo = new ChatRepo();
Object.freeze(chatRepo);

module.exports = chatRepo 
