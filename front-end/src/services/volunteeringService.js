/* eslint-disable */
import Api from '@/services/Api'

export default {

    fetchAllVolunteeringCalls(sender) {

        return Api().get('/all-volunteering-calls',{
            sender: sender
        })
    },

    fetchOpenVolunteeringCalls() {
        return Api().get('/open-volunteering-calls')
    },

    createVolunteeringCall(call) {
        return Api().post('/volunteering-call', {
            call: call
        })
    },

    fetchVolunteeringApplications(call) {
        return Api().post('/volunteering-applications', {
            call: call
        })
    },

    createVolunteeringApplication(application) {
        return Api().post('/create-volunteering-application', {
            application
        })
    },

    declineApplication(application) {
        return Api().post('/decline-application', {
            application
        })
    },
    approveApplication(application) {
        return Api().post('/approve-application', {
            application
        })
    },
    checkApplStatus(application) {
        return Api().post('/check-application-status', {
            application
        })
    },
    
}