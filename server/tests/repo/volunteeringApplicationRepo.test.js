const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const VolunteeringCallRepo = require("../../repo/VolunteeringCallRepo");
const VolunteeringAppRepo = require("../../repo/VolunteeringApplicationRepo");
const dbHandler = require('../db-handler');

const User = require("../../models/User");


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Test the VolunteeringCallRepo", () => {
    
    it("Test VolunteeringApplicationRepo.saveApplication() function", async done => {
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
        
        //create a call
        const application = {
            callId: r._id,
            name: "odilo rugamba",
            phone: "789920389",
            email: "odilo@gmail.com",
            additionalDetails: "test details",
            username: "odilo"
        }
        //unauthorized author
        const result = await VolunteeringAppRepo.saveApplication(application);
        expect(result.name).toEqual(application.name);

        done();
    });
    
    it("Test VolunteeringApplicationRepo.getAllApplications() function", async done => {
        // create a user
        const u = new User({username: "odilo", password: "password"});
        await u.save();


        //create a call
        const c = {
            title: "new call",
            category: "drivers",
            tasks: "driving drugs to hospitals",
            author: "odilo",
            endDate: "4/20/2020"
        }
        const r = await VolunteeringCallRepo.saveNewVolunteeringCall(c);
        
        //create a call
        const application = {
            callId: r._id,
            name: "odilo rugamba",
            phone: "789920389",
            email: "odilo@gmail.com",
            additionalDetails: "test details",
            username: "odilo"
        }
        //create application
       await VolunteeringAppRepo.saveApplication(application);
        const call = {
            callId: r._id
        }
        const result = await VolunteeringAppRepo.getAllApplications(call);
        expect(result.length == 1).toEqual(true);
        done();
    });
  



    
    it("Test VolunteeringApplicationRepo.approveApplication() function", async done => {
        // create a user
        const u = new User({username: "odilo", password: "password"});
        await u.save();


        //create a call
        const c = {
            title: "new call",
            category: "drivers",
            tasks: "driving drugs to hospitals",
            author: "odilo",
            endDate: "4/20/2020"
        }
        const r = await VolunteeringCallRepo.saveNewVolunteeringCall(c);
        
        //create a call
        const app = {
            callId: r._id,
            name: "odilo rugamba",
            phone: "789920389",
            email: "odilo@gmail.com",
            additionalDetails: "test details",
            username: "odilo"
        }
        //create application
       const r2 = await VolunteeringAppRepo.saveApplication(app);
        const application = {
            callId: r._id,
            application: r2._id
        }
        const result = await VolunteeringAppRepo.approveApplication(application);
        expect(result.approved).toEqual(true);
        done();
    });
  
    
    it("Test VolunteeringApplicationRepo.declineApplication() function", async done => {
        // create a user
        const u = new User({username: "odilo", password: "password"});
        await u.save();


        //create a call
        const c = {
            title: "new call",
            category: "drivers",
            tasks: "driving drugs to hospitals",
            author: "odilo",
            endDate: "4/20/2020"
        }
        const r = await VolunteeringCallRepo.saveNewVolunteeringCall(c);
        
        //create a call
        const app = {
            callId: r._id,
            name: "odilo rugamba",
            phone: "789920389",
            email: "odilo@gmail.com",
            additionalDetails: "test details",
            username: "odilo"
        }
        //create application
       const r2 = await VolunteeringAppRepo.saveApplication(app);
        const application = {
            callId: r._id,
            application: r2._id
        }
        const result = await VolunteeringAppRepo.declineApplication(application);
        expect(result.approved).toEqual(false);
        done();
    });




    
    it("Test VolunteeringApplicationRepo.checkApplStatus() function", async done => {
        // create a user
        const u = new User({username: "odilo", password: "password"});
        await u.save();


        //create a call
        const c = {
            title: "new call",
            category: "drivers",
            tasks: "driving drugs to hospitals",
            author: "odilo",
            endDate: "4/20/2020"
        }
        const r = await VolunteeringCallRepo.saveNewVolunteeringCall(c);
        
        //create a call
        const app = {
            callId: r._id,
            name: "odilo rugamba",
            phone: "789920389",
            email: "odilo@gmail.com",
            additionalDetails: "test details",
            username: "odilo"
        }
        //create application
       const r2 = await VolunteeringAppRepo.saveApplication(app);
        const application = {
            username: 'odilo',
            callId: r._id
        }
        const r3 = await VolunteeringAppRepo.checkApplStatus(application);
        expect(r3.approved).toEqual('');
        const r4 = await VolunteeringAppRepo.checkApplStatus({username: "notfound", callId: r._id});
        expect(r4).toEqual(null);
        await VolunteeringAppRepo.approveApplication({application:r2._id, callId: r._id});
        const r5 = await VolunteeringAppRepo.checkApplStatus({username: "odilo", callId: r._id});
        expect(r5.approved).toEqual(true);
        done();
    });

})


