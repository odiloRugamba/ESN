const VolunteeringCall = require('../models/VolunteeringCall');
const UserRepo = require('./UserRepo');

class VolunteeringCallRepo {

    constructor() {}

    async saveNewVolunteeringCall(call) {
        const user = await UserRepo.findUser(call.author);
        if (user) {
            const newCall = new VolunteeringCall({
                title: call.title,
                category: call.category,
                tasks: call.tasks,
                author: call.author,
                endDate: call.endDate,
            });

            return await newCall.save();
        } 
        else 
        return null;
    }


    async getOpenVolunteeringCalls() {
        return await VolunteeringCall.find({endDate: {$gte: Date.now()}}).sort('-created_at')
    }

    async getAllVolunteeringCalls() {
        return await VolunteeringCall.find().sort('-created_at')
    }

    async findCall(callId) {
        return await VolunteeringCall.findOne({_id:callId});
    }
}


const VolCallRepo = new VolunteeringCallRepo();
Object.freeze(VolCallRepo);

module.exports = VolCallRepo;