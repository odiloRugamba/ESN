const User = require('../models/User');
const LockdownStatus = require('../models/LockdownStatus');

class LockdownStatusRepo {

    constructor() {
    }

    async getLockdownStatus() {
        const nottracking = await User.count({tracking_status: { $ne: 'granted'}});
        const tracking = await User.count({tracking_status: 'granted'});
        const infected = await User.count({'infection_status.status': 'positive'});
        const potentially = await User.count({'infection_status.status': 'potentially'});
        const status = await LockdownStatus.findOne({});
        return {
            tracking: tracking,
            nottracking: nottracking,
            infected: infected,
            potentially: potentially,
            status: status
        };
    }

    async updateLockdownStatus(status) {
        return await LockdownStatus.updateOne({}, { $set: { status: status, timestamp: Date.now()} }, { upsert: true });
    }

}


const lockdownStatusRepo = new LockdownStatusRepo();
Object.freeze(lockdownStatusRepo);

module.exports = lockdownStatusRepo