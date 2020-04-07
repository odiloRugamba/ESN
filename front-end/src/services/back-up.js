/* eslint-disable */
import Api from '@/services/Api'

export default {

    async fetchAllVolunteeringCalls(sender) {
        return {
            status: 200,
            data: [{
                    CallId: "1-B-3",
                    createdAt: "2019",
                    title: "second call for volunteers",
                    category: "Health workers",
                    tasks: "these people will help at hospital x for recieving new emergency cases",
                    author: "odilo",
                    endDate: "2021",
                    status: "closed"
                },
                {
                    CallId: "1-B-4",
                    createdAt: "2019",
                    title: "new call for application for volunteers",
                    category: "Health workers",
                    tasks: "these people will help at hospital x for recieving new emergency cases",
                    author: "odilo",
                    endDate: "2021",
                    status: "open"
                },
                {
                    CallId: "1-B-5",
                    createdAt: "2019",
                    title: "another call for application for volunteers",
                    category: "Health workers",
                    tasks: "these people will help at hospital x for recieving new emergency cases",
                    author: "odilo",
                    endDate: "2021",
                    status: "open"
                },
            ]

        }
    },

    async fetchOpenVolunteeringCalls() {
        return {
            status: 200,
            data: [
                
                {
                    CallId: "1-B-4",
                    createdAt: "2019",
                    title: "new call for application for volunteers",
                    category: "Health workers",
                    tasks: "these people will help at hospital x for recieving new emergency cases",
                    author: "odilo",
                    endDate: "2021",
                    status: "open"
                },
                {
                    CallId: "1-B-5",
                    createdAt: "2019",
                    title: "another call for application for volunteers",
                    category: "Health workers",
                    tasks: "these people will help at hospital x for recieving new emergency cases",
                    author: "odilo",
                    endDate: "2021",
                    status: "open"
                },
            ]

        }
    },

    createVolunteeringCall(sender, call) {
        return Api().post('/volunteering-call', {
            sender: sender,
            call: call
        })
    },

    async fetchVolunteeringApplications(sender, callId) {

        return {
            status: 200,
            data: [
                {
                    _id: "2-YH",
                    name: "odilo Rugamba",
                    email: "omutuyin@andrew.cmu.edu",
                    phone: "078112748",
                    details: "I am a retired nurse and I would like to lend my help",
                    status: "Accepted"
                },
                {
                    _id: "2-oH",
                    name: "Mutuyingabo Rugamba",
                    email: "odiloRugamba@gmail.com",
                    phone: "078112748",
                    details: "I am a retired nurse and I would like to lend my help",
                    status: ""
                },
                {
                    _id: "2-Y9",
                    name: "odilo account",
                    email: "omutuyin@andrew.cmu.edu",
                    phone: "078112748",
                    details: "I am a retired nurse and I would like to lend my help",
                    status: ""
                }
            ]
        }
    },

    createVolunteeringApplication(sender, call) {
        return Api().post('/create-volunteering-application', {
            sender: sender,
            callId: call
        })
    },

    declineApplication(sender, applicationId) {
        return Api().post('/decline-application', {
            sender: sender,
            applicationId: applicationId
        })
    },
    approveApplication(sender, applicationId) {
        return Api().post('/approve-application', {
            sender: sender,
            applicationId: applicationId
        })
    },
}