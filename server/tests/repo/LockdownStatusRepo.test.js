const LockdownStatusRepo = require("../../repo/LockdownStatusRepo");
const dbHandler = require('../db-handler');

const LockdownStatus = require("../../models/LockdownStatus");


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Test the LockdownStatusRepo", () => {
    
    it("Test LockdownStatus.updateLockdownStatus() function", async done => {
        await LockdownStatusRepo.updateLockdownStatus(true);

        const lockdownstatus = await LockdownStatus.findOne();

        expect(lockdownstatus.status).toEqual(true);
        done();
    });
    
    it("Test LockdownStatus.getLockdownStatus() function", async done => {
        await LockdownStatusRepo.updateLockdownStatus(false);

        const lockdownstatus = await LockdownStatusRepo.getLockdownStatus();

        expect(lockdownstatus.status.status).toEqual(false);
        expect(lockdownstatus.tracking).toEqual(0);
        expect(lockdownstatus.nottracking).toEqual(0);
        expect(lockdownstatus.infected).toEqual(0);
        expect(lockdownstatus.potentially).toEqual(0);
        done();
    });
    
})