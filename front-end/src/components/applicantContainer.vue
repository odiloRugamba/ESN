<template>
    <v-card
        dark
        color="#385F73"
    >
        <v-card-title>{{applicant.name}} </v-card-title>
        <v-card-text>Email: {{applicant.email}}</v-card-text>
        <v-card-text>phone: {{applicant.phone}}</v-card-text>
        <v-card-text>Details: {{applicant.additionalDetails}}</v-card-text>
        <v-card-actions>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title v-if="toBeProcessed"><v-btn small @click="accept">Accept</v-btn></v-list-item-title>
                    <v-list-item-title v-if="toBeProcessed"><v-btn small @click="decline">Decline</v-btn></v-list-item-title>
                    <v-list-item-title v-if="!toBeProcessed">
                        <span v-if="status"> #Approved</span>
                        <span v-else> #Declined</span>
                    </v-list-item-title>
                </v-list-item-content>
                
            </v-list-item>
           
        </v-card-actions>
    </v-card>
</template>

<script> 

import moment from 'moment-mini'
import volunteeringService from "@/services/volunteeringService";

export default {
    name: "ApplicantContainer",
    props: [ 'applicant' ],
    data() {
        return {
            status: this.applicant.approved,
            toBeProcessed: false,
        }
    },
    created(){
        if(this.status === "" || this.status === undefined)
            this.toBeProcessed = true;
        else
            this.toBeProcessed = false;
    },
    methods: {
        formatTimestamp(timestamp) {
            return moment(timestamp).format('MM DD YYYY')
        },
        accept(){
            const app = {
                sender: this.$session.get('username'),
                callId: this.applicant.callId,
                application: this.applicant._id,
            }
            volunteeringService.approveApplication(app).then(res => {
            if(res.status == 200)
                this.status = true;
                this.toBeProcessed = false;
            })
        },
        decline(){
            const app = {
                sender: this.$session.get('username'),
                callId: this.applicant.callId,
                application: this.applicant._id,
            }
            volunteeringService.declineApplication(app).then(res => {
            if(res.status == 200)
                this.status = false;
                this.toBeProcessed = false;
            })
        },
       
    }
}
</script>

<style scoped>
</style>