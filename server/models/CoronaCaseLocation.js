const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    }
});

const coronaCaseLocationSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    location: {
        type: locationSchema,
    },
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

class CoronaCaseLocation {

}


coronaCaseLocationSchema.loadClass(CoronaCaseLocation);

module.exports = CoronaCaseLocationModel = mongoose.model('coronaCaseLocation', coronaCaseLocationSchema);