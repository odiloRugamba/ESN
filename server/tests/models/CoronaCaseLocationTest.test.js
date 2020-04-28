const dbHandler = require('../db-handler');


const CoronaCaseLocation = require("../../models/CoronaCaseLocation");


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () =>  await dbHandler.closeDatabase());

describe("Test CoronaCaseLocation Model", () => {

    it('Test create corona location', async done => {
        const coronaLocation = new CoronaCaseLocation({
            location: {
                lat: 30,
                lng:  -13 
            },
            sender: 'newuser'
        });
        await coronaLocation.save();
        const saved = await CoronaCaseLocation.findOne({sender: 'newuser'});

        const expectedLat =  30 ;
        const expectedLng =  -13 ;
        const actualLat = saved.location.lat;
        const actualLng = saved.location.lng;

        expect(actualLat).toEqual(expectedLat);
        expect(actualLng).toEqual(expectedLng);
        done();
    });

});