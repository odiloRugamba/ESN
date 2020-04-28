const mongoose = require('mongoose');
const testDatabase = require("../../config/main").test_db;
const dbHandler = require('../db-handler');
const Announcement = require("../../models/Announcement");

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


// /**
//  * Announcement model class test suite.
//  */
//
// describe("Testing Announcement Model", () => {
//
//     it("Testing that announcement can be created", async done => {
//
//         // Creating new announcement.
//         const newAnnouncement = new Announcement({ text: "Special announcement" });
//
//         // Saving the announcement.
//         await newAnnouncement.save();
//
//         // Attempting to retrieve saved announcement from the database.
//         const savedAnnouncement = await Announcement.findOne({ text: "Special announcement" });
//
//         const expectedText = "Special announcement";
//         const retrievedText = savedAnnouncement.text;
//
//         // Matching test.
//         expect(retrievedText).toEqual(expectedText);
//         done();
//     });


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
    });


    it("Test delete the announcement", async done => {
        
        const ann = new Announcement({ publisher: "john5", text: "New pandemic coming" })
        
        await ann.save()
        
        await Announcement.remove({ publisher: "john5", text: "New pandemic coming" });

        
        const savedAnn = await Announcement.findOne({ publisher: "john5", text: "New pandemic coming" });
        
        expect(savedAnn).toBeFalsy();
        done();
    });

});