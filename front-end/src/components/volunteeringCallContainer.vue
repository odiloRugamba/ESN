<template>
    <v-card
        dark
        color="#385F73"
    >
        <v-card-title>{{call.title}}
          
            <div v-if="isCoordinator" class="my-2">
                <v-btn small @click="seeApplicants">See applicants</v-btn>
            </div>
            <div v-else class="my-2" justify="right">
                <v-btn v-if="!applied" small @click="register">Register</v-btn>
                <v-btn v-if="applied && applicationStatus" small >#approved</v-btn>
                <v-btn v-if="applied && applicationStatus === false" small >#Declined</v-btn>
                <v-btn v-if="applied && applicationStatus ==='' " small >#Applied</v-btn>
            </div>
        </v-card-title>
        <v-card-text>{{call.tasks}}</v-card-text>
        <v-card-actions>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>#{{call.category}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-row
                align="center"
                justify="end"
            >
                <span>{{formatTimestamp(call.created_at)}}</span>
            </v-row>
        </v-card-actions>
    </v-card>
</template>

<script>

import moment from 'moment-mini'
import volunteeringService from "@/services/volunteeringService";

export default {
    name: "volunteeringCallContainer",
    props: [ 'call','isCoordinator' ],
    data(){
        return {
            applicationStatus:'',
            applied: false,
        }
    },
    created(){
        const application = {
            callId: this.call._id,
            username: this.$session.get('username')
        }
        volunteeringService.checkApplStatus(application).then(res => {
            if(res.status == 200)
            {
                console.log(res.data.approved);
                this.applicationStatus = res.data.approved
                if(res.data.approved !== undefined)
                {
                    this.applied = true;
                }
            }
        })
    },
    methods: {
        formatTimestamp(timestamp) {
            return moment(timestamp).format('MM DD YYYY')
        },
        seeApplicants(){
            this.$router.push({ path: "/see-volunteering-applicants", query: {callId: this.call._id}});
        },
        register(){
            this.$router.push({ path: "/register-for-volunteering", query: {callId: this.call._id}});
        }
    }
}
</script>

<style scoped>
</style>