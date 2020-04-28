const dbHandler = require('../db-handler');


const Geolocation = require("../../models/Geolocation");


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());


describe("Test Geolocation Model", () => {

    it('est create geolocation', async done => {
        const geolocation = new Geolocation({
            location: {
                type: 'Point',
                coordinates: [ 30, -13 ]
            },
            user: 'newuser'
        });
        await geolocation.save();
        const saved = await Geolocation.findOne({user: 'newuser'});

        const expectedCoords = [ 30 , -13 ];
        const actualCoords = saved.location.coordinates;

        expect(actualCoords[0]).toEqual(expectedCoords[0]);
        expect(actualCoords[1]).toEqual(expectedCoords[1]);
        done();
    });

});
