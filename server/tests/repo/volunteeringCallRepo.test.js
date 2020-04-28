const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const VolunteeringCallRepo = require("../../repo/VolunteeringCallRepo");
const dbHandler = require('../db-handler');

const User = require("../../models/User");


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Test the VolunteeringCallRepo", () => {
    
    it("Test VolunteeringCallRepo.saveNewVolunteeringCall() function", async done => {
        // create a user
        const u = new User({username: "odilo", password: "password"});
        await u.save();

        //create a call
        const call = {
            title: "new call",
            category: "drivers",
            tasks: "driving drugs to hospitals",
            author: "odilo",
            endDate: "4/20/2020"
        }
        //authorized author
        const result = await VolunteeringCallRepo.saveNewVolunteeringCall(call);
        expect(result.title).toEqual(call.title);

        //create a call
        const call2 = {
            title: "new call",
            category: "drivers",
            tasks: "driving drugs to hospitals",
            author: "odil",
            endDate: "4/20/2020"
        }
        //unauthorized author
        const result2 = await VolunteeringCallRepo.saveNewVolunteeringCall(call2);
        expect(result2).toEqual(null);
        done();
    });
    
    it("Test VolunteeringCallRepo.getOpenVolunteeringCalls() function", async done => {
        // create a user
        const u = new User({username: "odilo", password: "password"});
        await u.save();


        //create a call
        const call = {
            title: "new call",
            category: "drivers",
            tasks: "driving drugs to hospitals",
            author: "odilo",
            endDate: "4/20/2021"
        }
        await VolunteeringCallRepo.saveNewVolunteeringCall(call);
        //create a call
        const call2 = {
            title: "new call",
            category: "drivers",
            tasks: "driving drugs to hospitals",
            author: "odilo",
            endDate: "2/20/2020"
        }
        await VolunteeringCallRepo.saveNewVolunteeringCall(call2);
        
        
        const result = await VolunteeringCallRepo.getOpenVolunteeringCalls();
        expect(result.length == 1).toEqual(true);
        done();
    });
  
    it("Test VolunteeringCallRepo.getAllVolunteeringCalls() function", async done => {
        // create a user
        const u = new User({username: "odilo", password: "password"});
        await u.save();


        //create a call
        const call = {
            title: "new call",
            category: "drivers",
            tasks: "driving drugs to hospitals",
            author: "odilo",
            endDate: "4/20/2020"
        }

        await VolunteeringCallRepo.saveNewVolunteeringCall(call);
        //create a call
        const call2 = {
            title: "new call",
            category: "drivers",
            tasks: "driving drugs to hospitals",
            author: "odilo",
            endDate: "2/20/2020"
        }
        await VolunteeringCallRepo.saveNewVolunteeringCall(call2);
        
        const result = await VolunteeringCallRepo.getAllVolunteeringCalls();
        expect(result.length == 2).toEqual(true);
        done();
    });

    
    it("Test VolunteeringCallRepo.findCall() function", async done => {
        // create a user
        const u = new User({username: "odilo", password: "password"});
        await u.save();


        //create a call
        const call = {
            title: "new call",
            category: "drivers",
            tasks: "driving drugs to hospitals",
            author: "odilo",
            endDate: "4/20/2020"
        }

        const r = await VolunteeringCallRepo.saveNewVolunteeringCall(call);
        
        const result = await VolunteeringCallRepo.findCall(r._id);
        expect(result._id).toEqual(r._id);
        done();
    });

})


