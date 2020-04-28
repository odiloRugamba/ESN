const Location = require('../models/CoronaCaseLocation');
const UserRepo = require('./UserRepo');

class LocationRepo{
    constructor() {
    }

    async saveLocation(location) {
        const user = await UserRepo.findUser(location.sender);
        if (user) {
        const newLocation = new  Location({ 
            sender: location.sender, 
            location: {
                lat: location.lat,
                lng: location.lng
            }, 
            status: user.current_status.text, 
            messageType: 'coronamsg' 
        });
        const saveNewLocation = await newLocation.save();
        return saveNewLocation;
        }
        else return null;
    }

    async getLocations() {
        return await Location.find({ messageType: "coronamsg" }).sort({ created_at: 1 }) //Where usernames are this order based on timestamp, limit 10 where label is private
    }
}

const locationRepo = new LocationRepo();
Object.freeze(locationRepo);

module.exports = locationRepo 