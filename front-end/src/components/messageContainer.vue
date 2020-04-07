<template>
    <v-card
        dark
        color="#385F73"
    >
        <v-card-title>{{message.sender}}</v-card-title>
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

export default {
    name: "messageContainer",
    props: [ 'message' ],
    methods: {
        formatTimestamp(timestamp) {
            return moment(timestamp).format('MMMM Do YYYY, h:mm a')
        }
    }
}
</script>

<style scoped>
</style>