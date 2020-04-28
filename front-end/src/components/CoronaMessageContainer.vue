<template>
    <v-card
        dark
        color="#385F73"
    >
        <v-card-title>{{message.sender}}
            <v-spacer></v-spacer>
            <MarkPopup 
            :message =" message.text"
            :sender =" message.sender">
        <template v-slot:default="slotProps">
          <v-btn 
          dark 
          left 
          bottom
          offset-y
          v-on="slotProps.on"
          
          v-if="isHealthWorker"
          
          >Mark as</v-btn>
        </template>
      </MarkPopup>
        </v-card-title>


        <v-card-text v-if="isHealthWorker">{{message.mark}}</v-card-text>
        <v-card-text>{{message.text}}</v-card-text>
        <v-card-actions>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>{{message.status}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-row
                align="center"
                justify="end"
            >
                <span>{{formatTimestamp(message.created_at)}}</span>
            </v-row>
        </v-card-actions>
    </v-card>
</template>

<script>

import moment from 'moment-mini'
import MarkPopup from "@/components/MarkCoronaMessagePopup.vue"

export default {
    name: "messageContainer",
    props: [ 'message' ],
    components: {
        MarkPopup,
    },
    methods: {
        formatTimestamp(timestamp) {
            return moment(timestamp).format('MMMM Do YYYY, h:mm a')
        }
    },
    computed: {
    isHealthWorker: function() {
            return this.$session.get('user').role === 'health_worker';
        },
  },
}
</script>

<style scoped>
</style>