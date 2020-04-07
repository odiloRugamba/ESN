const VolunteeringApplication = require('../models/VolunteeringApplication');
const VolunteeringCallRepo = require('./VolunteeringCallRepo');
const UserRepo = require('./UserRepo');

class VolunteeringApplicationRepo {

    constructor() {}

    async saveApplication(application) {
        const user = await UserRepo.findUser(application.username);
        const call = await VolunteeringCallRepo.findCall(application.callId);
        
        if (user && call) {
            const newApplication = new VolunteeringApplication({
                callId: application.callId,
                name: application.name,
                phone: application.phone,
                email: application.email,
                additionalDetails: application.additionalDetails,
                citizenId: user._id
            });

            return await newApplication.save();
        } 
        else 
        return null;
    }

    async getAllApplications(call) {
        return await VolunteeringApplication.find({callId: call.callId}).sort('-created_at')
    }

    async approveApplication(application){
        const app = await VolunteeringApplication.findOne({_id: application.application, callId: application.callId});
        app.approved = true;
        return await app.save();
    }


    async declineApplication(application){
        const app = await VolunteeringApplication.findOne({_id: application.application, callId: application.callId});
        app.approved = false;
        return await app.save();
    }

    async checkApplStatus(application) {
        const user = await UserRepo.findUser(application.username);
        if(user){
            const app = await VolunteeringApplication.findOne({callId: application.callId, citizenId: user._id});
            if(app)
            {
                if(app.approved === undefined || app.approved === '')
                    return {approved: ''}
                return {approved: app.approved}
            }
            return null;
        }
        return null
    }
}


const VolAppRepo = new VolunteeringApplicationRepo();
Object.freeze(VolAppRepo);

module.exports = VolAppRepo