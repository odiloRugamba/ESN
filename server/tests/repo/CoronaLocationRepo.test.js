const LocationRepo = require("../../repo/LocationRepo");
const dbHandler = require('../db-handler');

const User = require("../../models/User");
const CoronaCaseLocation = require('../../models/CoronaCaseLocation');


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe("Test the LocationRepo", () => {
    
    it("Test LocationRepo.saveLocation() function", async done => {
        await User({username: 'johnx', password: 'password'}).save();

        const ret = await LocationRepo.saveLocation({sender:'johnx', lat:30, lng: -1.9});

        const location = await CoronaCaseLocation.findOne({sender: 'johnx'});
        expect(location.location.lat).toEqual(30);
        expect(location.location.lng).toEqual(-1.9);

        done();
    });

    it("Test LocationRepo.getLocations() function", async done => {

        // create a couple of locations and persist them in the database
        const coronaLocation1 = new CoronaCaseLocation({
            location: {
                lat: 30,
                lng:  -1.9 
            },
            sender: 'doe1',
            messageType: "coronamsg"
        });
        await coronaLocation1.save()

        // query the database to see the content
        const coronaLocations = await LocationRepo.getLocations();

         expect(coronaLocations.length).toEqual(1);
         done();
     });
    
})