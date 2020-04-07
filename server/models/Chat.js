const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    text: String,
    messageType: String,
    status: {
        type: String,
        default: ""
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

class Chat {

    isPrivate() {
        return this.receiver === null;
    }

    isPublic() {
        return this.receiver !== null;
    }
}

chatSchema.loadClass(Chat);

module.exports = ChatModel = mongoose.model('chat', chatSchema);
