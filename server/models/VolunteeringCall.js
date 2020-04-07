const mongoose = require('mongoose');

const volunteeringCallSchema = new mongoose.Schema({
    title: String,
    category: String,
    tasks: String,
    author: String,
    endDate: Date,
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});


class Call {

    isClosed() {
        return this.endDate > Date.Now;
    }

    isOpen() {
        return this.endDate < Date.Now;
    }
}

volunteeringCallSchema.loadClass(Call);
module.exports = volunteeringCallModel = mongoose.model('volunteeringCall', volunteeringCallSchema);
