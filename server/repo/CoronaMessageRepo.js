const CoronaMessage = require('../models/CoronaMessage');
const UserRepo = require('./UserRepo');

class CoronaMessageRepo {

    constructor() {
    }

    async saveCoronaMessage(message) {
        const user = await UserRepo.findUser(message.sender);
        if (user) {
        const coronaMessage = new  CoronaMessage({ sender: message.sender, text: message.text,status: user.current_status.text, messageType: 'coronamsg' });
        const saveChat = await coronaMessage.save();
        return saveChat;
        }
        else return null;
    }

    async updateCoronaMessageMark(message) {
        const coronaMessage = await CoronaMessage.findOne({ sender: message.sender, text: message.message, messageType: 'coronamsg' });
        coronaMessage.mark=message.mark;
        const saveChat = await coronaMessage.save();
        return saveChat;
    }

    async getAllCoronaMessages() {
        return await CoronaMessage.find({ messageType: "coronamsg" }).sort({ created_at: 1 }) //Where usernames are this order based on timestamp, limit 10 where label is private
    }

    async getCitizenCoronaMessages(username) {
        return await CoronaMessage.find({ sender: username }, { messageType: "coronamsg" }).sort({ created_at: 1 })
    }
}

const coronaMessageRepo = new CoronaMessageRepo();
Object.freeze(coronaMessageRepo);

module.exports = coronaMessageRepo 