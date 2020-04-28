const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        enum: ['undefined', 'ok', 'help', 'emergency', ''],
        default: 'undefined'
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const infectionSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: ['nottested', 'positive', 'negative', 'potentially'],
        default: 'nottested'
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['administrator', 'coordinator', 'citizen', 'city_rep', 'health_worker', 'doctor'],
        default: 'citizen'
    },
    current_status: {
        type: statusSchema,
        default: {}
    },
    tracking_status: {
        type: String,
        enum: ['request', 'granted', 'denied'],
        default: 'request'
    },
    infection_status: {
        type: infectionSchema,
        default: {}
    },
    active: { type: Boolean, default: true }
});

userSchema.pre('validate', function () {
    this.current_status.text = this.current_status.text.toLowerCase();
});

class User {

    getJSON() {
        return {
            id: this.id,
            username: this.username,
            status: this.current_status,
            role: this.role,
            tracking_status: this.tracking_status,
        };
    }
}

userSchema.loadClass(User);

module.exports = UserModel = mongoose.model('user', userSchema);
