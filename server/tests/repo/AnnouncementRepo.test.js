const dbHandler = require('../db-handler');

const Announcement = require("../../models/Announcement");
const User = require("../../models/User");
const AnnouncementRepo = require("../../repo/AnnouncementRepo");


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Test the AnnouncementRepo", () => {

    
    it("Test AnnouncementRepo.saveAnnouncement() function", async done => {
        const user = User({ username: 'john5', password: "johndoe", current_status: { text: 'help' } });
        // save the user
        await user.save();

        const announ = await AnnouncementRepo.saveAnnouncement({ sender: "john5", text: "New pandemic coming"});
        expect(announ).not.toEqual(null);

        const announTest = await Announcement.findOne({ publisher: "john5", text: "New pandemic coming" });
        expect(announTest).not.toEqual(null);

        done();
    });
    
    it("Test non-existent user AnnouncementRepo.saveAnnouncement() function", async done => {

        const announ = await AnnouncementRepo.saveAnnouncement({ sender: "john5", text: "New pandemic coming"});
        expect(announ).toEqual(null);

        done();
    });
    
    it("Test AnnouncementRepo.getAnnouncement() function", async done => {
        await User({ username: 'john5', password: "johndoe"}).save();
        await User({ username: 'johnx', password: "password"}).save();

        await AnnouncementRepo.saveAnnouncement({ sender: "john5", text: "New pandemic coming"});
        await AnnouncementRepo.saveAnnouncement({ sender: "johnx", text: "Really!?"});
        await AnnouncementRepo.saveAnnouncement({ sender: "john5", text: "YES!!!"});

        const announcements = await AnnouncementRepo.getAnnouncements();
        expect(announcements).toHaveLength(3);

        done();
    });
    
})
