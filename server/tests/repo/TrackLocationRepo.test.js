const TrackLocationRepo = require("../../repo/TrackLocationRepo");
const dbHandler = require('../db-handler');

const User = require("../../models/User");
const Geolocation = require('../../models/Geolocation');


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Test the TrackLocationRepo", () => {
    
    it("Test TrackLocationRepo.updatePermission() function", async done => {
        await User({username: 'johnx', password: 'password'}).save();

        const ret = await TrackLocationRepo.updatePermission('johnx', 'granted');
        expect(ret).toEqual(true);

        const user = await User.findOne({username: 'johnx'});

        expect(user.tracking_status).toEqual('granted');
        done();
    });
    
    it("Test non-existent user in TrackLocationRepo.updatePermission() function", async done => {

        const ret = await TrackLocationRepo.updatePermission('johnx', 'granted');
        expect(ret).toEqual(false);

        done();
    });
    
    it("Test invalid status in TrackLocationRepo.updatePermission() function", async done => {
        await User({username: 'johnx', password: 'password'}).save();

        const ret = await TrackLocationRepo.updatePermission('johnx', 'help');
        expect(ret).toEqual(false);

        done();
    });
    
    it("Test TrackLocationRepo.updateLocation() function", async done => {
        await User({username: 'johnx', password: 'password'}).save();

        const ret = await TrackLocationRepo.updateLocation('johnx', -1.9, 30);
        expect(ret).toEqual(true);

        const location = await Geolocation.findOne({user: 'johnx'});
        expect(location.location.coordinates.length).toEqual(2);
        expect(location.location.coordinates[0]).toEqual(30);
        expect(location.location.coordinates[1]).toEqual(-1.9);

        done();
    });
    
    it("Test invalid coordinates TrackLocationRepo.updateLocation() function", async done => {
        await User({username: 'johnx', password: 'password'}).save();

        const ret = await TrackLocationRepo.updateLocation('johnx', 129, 30);
        expect(ret).toEqual(false);

        done();
    });
    
    it("Test non-existent user TrackLocationRepo.updateLocation() function", async done => {

        const ret = await TrackLocationRepo.updateLocation('johnx', -19, 30);
        expect(ret).toEqual(false);

        done();
    });
    
})