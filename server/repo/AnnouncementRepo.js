const Announcement = require('../models/Announcement');
const UserRepo = require('./UserRepo');

class AnnouncementRepo {

    constructor() {
    }

    async saveAnnouncement(announcement) {
        const user = await UserRepo.findUser(announcement.sender);
        if (user) {
        const newannouncement = new Announcement({publisher: announcement.sender, text: announcement.text});

        const saveAn = await newannouncement.save();
        return saveAn;
        }
        else return null;
    }


    async getAnnouncements() {
        const activeUsers = await UserRepo.getActiveUsername();
        return await Announcement.find({
            publisher: {
                "$in": activeUsers
            }
        }).sort( { created_at: -1 } )
    }

    async searchAnnouncementsByText(query) {
        return await Announcement
            .find({ "text": { "$regex": query, "$options": "i" } });

    }

}


const announcementRepo = new AnnouncementRepo();
Object.freeze(announcementRepo);

module.exports = announcementRepo;