const mongoose = require('mongoose')
const testDatabase = require("../../config/main").test_db
const dbHandler = require('../db-handler');


const LockdownStatus = require("../../models/LockdownStatus");


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Test LockdownStatus Model", () => {



    it('est create lockdownstatus', async done => {
        const lockdownstatus = new LockdownStatus();
        await lockdownstatus.save();
        const saved = await LockdownStatus.findOne();

        const expectedStatus = false;
        const actualStatus = saved.status;

        expect(actualStatus).toEqual(expectedStatus);
        done();
    });


    it("test update lockdownstatus", async done => {
        const lockdownstatus = await LockdownStatus();
        await lockdownstatus.save()

        lockdownstatus.status = true;
        await lockdownstatus.save();

        expect(lockdownstatus.status).toEqual(true);
        done();
    });

});
