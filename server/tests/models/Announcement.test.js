const dbHandler = require('../db-handler');

const Announcement = require("../../models/Announcement");



beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Test Announcement Model", () => {


    it("Test create announcement", async done => {
        
        const ann = new Announcement({ publisher: "john5", text: "New pandemic coming"})
        
        await ann.save()

        const newAnnouncement = await Announcement.findOne({ publisher: "john5", text: "New pandemic coming" });

        const expectedText = "New pandemic coming";
        const actualText = newAnnouncement.text;
        // test if they match
        expect(actualText).toEqual(expectedText);
        done()
    })


    it("Test delete the announcement", async done => {
        
        const ann = new Announcement({ publisher: "john5", text: "New pandemic coming" })
        
        await ann.save()
        
        await Announcement.remove({ publisher: "john5", text: "New pandemic coming" });

        
        const savedAnn = await Announcement.findOne({ publisher: "john5", text: "New pandemic coming" });
        
        expect(savedAnn).toBeFalsy();
        done();
    })

});