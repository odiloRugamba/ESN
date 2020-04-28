const mongoose = require('mongoose');

const coronaMsgSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    text: String,
    messageType: String,
    status: {
        type: String,
        default: ""
    },
    mark: String,
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

class CoronaMessage{

}

coronaMsgSchema.loadClass(CoronaMessage);

module.exports = CoronaMessageModel = mongoose.model('coronaMessage', coronaMsgSchema);