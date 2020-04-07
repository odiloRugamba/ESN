const mongoose = require('mongoose');

const volunteeringApplicationSchema = new mongoose.Schema({
    callId: String,
    name: String,
    phone: String,
    email: String,
    additionalDetails: String,
    citizenId: String,
    approved: Boolean,
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});


module.exports = volunteeringApplicationModel = mongoose.model('volunteeringApplication', volunteeringApplicationSchema);
