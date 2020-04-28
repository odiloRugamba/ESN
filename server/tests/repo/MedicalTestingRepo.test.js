const MedicalTestingRepo = require("../../repo/MedicalTestingRepo");
const dbHandler = require('../db-handler');

const User = require("../../models/User");
const Geolocation = require('../../models/Geolocation');


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Test the MedicalTestingRepo", () => {
    
    it("Test MedicalTestingRepo.getUsersInfectionStatus() function", async done => {
        await User({username: 'johnx', password: 'password'}).save();

        const users = await MedicalTestingRepo.getUsersInfectionStatus();

        expect(users.length).toEqual(1);
        expect(users[0].infection_status.status).toEqual('nottested');
        done();
    });
    
    it("Test MedicalTestingRepo.updateInfectionStatus() function", async done => {
        let user = await User({username: 'johnx', password: 'password'}).save();
        expect(user.infection_status.status).toEqual('nottested');

        const result = await MedicalTestingRepo.updateInfectionStatus('johnx', 'negative');
        expect(result).toEqual(true);

        user = await User.findOne({username: 'johnx'});
        expect(user.infection_status.status).toEqual('negative');

        done();
    });
    
    it("Test update invalid infection status in MedicalTestingRepo.updateInfectionStatus() function", async done => {
        let user = await User({username: 'johnx', password: 'password'}).save();
        expect(user.infection_status.status).toEqual('nottested');

        const result = await MedicalTestingRepo.updateInfectionStatus('johnx', 'newinfection');
        expect(result).toEqual(false);

        done();
    });
    
    it("Test update non-existent user in MedicalTestingRepo.updateInfectionStatus() function", async done => {

        const result = await MedicalTestingRepo.updateInfectionStatus('johnx', 'negative');
        expect(result).toEqual(false);

        done();
    });
    
    it("Test MedicalTestingRepo.findPotentiallyInfected() function", async done => {
        let user = await User({username: 'johnx', password: 'password'}).save();
        expect(user.infection_status.status).toEqual('nottested');
        user = await User({username: 'johny', password: 'password'}).save();
        expect(user.infection_status.status).toEqual('nottested');

        await Geolocation({
            location: {
                type: 'Point',
                coordinates: [ 30.082111, -1.935114 ]
            },
            user: 'johnx'
        }).save();
        await Geolocation({
            location: {
                type: 'Point',
                coordinates: [ 30.082111, -1.935114 ]
            },
            user: 'johny'
        }).save();

        MedicalTestingRepo.flagPotentiallyInfected('johnx', Date.now()).then( () => {
            User.findOne({username: 'johny'}).then(user => {
                expect(user.infection_status.status).toEqual('potentially');
                done();
            })
        })

    });
    
})