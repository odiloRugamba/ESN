/**
 * Class Announcement.js:
 *  Model class that creates structure for the Announcement objects using the defined schema.
 */


const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    publisher: String,
    text: String,
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
});

class Announcement {

}

announcementSchema.loadClass(Announcement);

module.exports = AnnouncementModel = mongoose.model('announcement', announcementSchema);