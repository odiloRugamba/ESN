const Geolocation = require('../models/Geolocation');
const User = require('../models/User');

class TrackLocationRepo {

    constructor() {
    }

    async updateLocation(username, latitude, longitude) {
        return User.findOne({ username: username })
            .then(async user => {
                if(user) {
                    const geolocation = new Geolocation({
                        location: {
                            type: 'Point',
                            coordinates: [ longitude, latitude ]
                        },
                        user: user.username
                    });
                    return await geolocation.save().then( () => {
                        return true
                    })
                    .catch( () => {
                        return false;
                    });
                }
                return false;
            })
            .catch(err => {
                return false;
            });
    }

    async updatePermission(username, status) {
        return User.findOne({ username: username })
            .then(async user => {
                if(user) {
                    user.tracking_status = status;
                    return await user.save().then( () => { return true }).catch( () => { return false });
                }
                return false;
            })
            .catch(err => {
                return false;
            });
    }

}


const trackLocationRepo = new TrackLocationRepo();
Object.freeze(trackLocationRepo);

module.exports = trackLocationRepo