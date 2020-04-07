const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        enum: ['undefined','ok', 'help', 'emergency', ''],
        default: 'undefined'
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
        default: 'citizen'
    },
    current_status: {
        type: statusSchema,
        default: statusSchema
    }
});

userSchema.pre('validate', function() {
    this.current_status.text = this.current_status.text.toLowerCase();
});

class User {

    get status() {
        return this.status;
    }

    set status(st) {
        this.status = st;
    }
    getJSON() {
        return { id: this.id, username: this.username, status: this.current_status };
    }
}

userSchema.loadClass(User);

module.exports = UserModel = mongoose.model('user', userSchema);
