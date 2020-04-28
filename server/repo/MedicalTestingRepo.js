const User = require('../models/User');
const Geolocation = require('../models/Geolocation');

class MedicalTestingRepo {

    constructor() {
    }

    async getUsersInfectionStatus() {
        return await User.find({}).then(users => {
            return users.map(user => {
                return { 
                    username: user.username, 
                    status: user.current_status,
                    infection_status: user.infection_status,
                };
            });
        })
    }

    async updateInfectionStatus(username, status) {
        const user = await User.findOne({username: username});
        if(user) {
            user.infection_status.status = status;
            user.infection_status.timestamp = Date.now();
            this.flagPotentiallyInfected(username, user.infection_status.timestamp).then( () => {
            });
            return user.save().then( () => {
                return true;
            }).catch( () => {
                return false;
            });
        }
        return false;
    }

    async findUserLastLocations(username, start_date, end_date) {
        return Geolocation.find({
            user: username,
            timestamp: {
                $gte: start_date,
                $lte: end_date
            },
        });
    }

    async findUsersInContact(username, start_date, end_date, coordinates, max_distance) {
        return Geolocation.find({
            user: {
                $ne: username
            },
            timestamp: {
                $gte: start_date,
                $lte:end_date 
            },
            location: {
                $nearSphere: {
                    $geometry: {
                        type: 'Point',
                        coordinates: coordinates
                    },
                    $maxDistance: max_distance 
                }
            }
        });
    }

    async updateUserInfectionIfNotPositive(username, status) {
        return User.findOne({username: username}).then(user => {
            if(user.infection_status.status !== 'positive') {
                user.infection_status.status = status;
                user.infection_status.timestamp = new Date();
                return user.save();
            }
        });
    }

    async flagPotentiallyInfected(infected_username, infected_date) {
        let start_date = new Date(infected_date);
        start_date.setDate(start_date.getDate() - 14);
        start_date.setHours(0);
        start_date.setMinutes(0);
        start_date.setSeconds(0);
        start_date.setMilliseconds(0);
        const potentiallyInfected = new Set();
        // find movement of the infected in the last 14 days
        return await this.findUserLastLocations(infected_username, start_date, new Date(infected_date)).then( async geolocations => {
            for(const geolocation of geolocations) {
                const stime = new Date(geolocation.timestamp);
                const etime = new Date(geolocation.timestamp);
                stime.setMinutes(stime.getMinutes()-1);
                etime.setMinutes(etime.getMinutes()+1);
                return await this.findUsersInContact(infected_username, stime, etime, geolocation.location.coordinates, 2).then(async locs => {
                    for(const l of locs) {
                        if(!potentiallyInfected.has(l.user)) {
                            potentiallyInfected.add(l.user)
                            await this.updateUserInfectionIfNotPositive(l.user, 'potentially')
                        }
                    }
                });
            }
        })
    }

}


const medicalTestingRepo = new MedicalTestingRepo();
Object.freeze(medicalTestingRepo);

module.exports = medicalTestingRepo