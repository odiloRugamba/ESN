const mongoose = require('mongoose');

const lockdownStatusSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
});

class LockdownStatus {

}

lockdownStatusSchema.loadClass(LockdownStatus);

module.exports = LockdownStatusModel = mongoose.model('lockdownstatus', lockdownStatusSchema);
