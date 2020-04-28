<template>
    <v-container fluid>
        <v-list
            two-line
        >
            <v-list-item 
                v-for="user in users"
                :key="user.username"
            >
                <v-list-item-avatar>
                    <v-icon 
                        color="red"
                        v-text="getIcon(user)"
                    >
                    </v-icon>
                </v-list-item-avatar>
        
                <v-list-item-content>
                    <v-list-item-title v-text="user.username"></v-list-item-title>
                    <v-list-item-subtitle v-text="user.status.text"></v-list-item-subtitle>
                </v-list-item-content>
        
                <v-list-item-action>
                    <v-btn
                        outlined
                        dark
                        color="warning"
                        @click="mark(user)"
                    >
                        Mark as infected
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </v-list>
        <v-dialog
            persistent
            max-width="290"
            v-model="confirmation"
        >
            <v-card
                :loading="processing"
            >
                <v-card-title>New infected citizen</v-card-title>
                <v-card-text>Are you sure you want to mark the citizen '{{selectedUser.username}}' as infected?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red darken-1"
                        text
                        @click="confirmation = false"
                    >
                        Disagree
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="confirmed"
                    >
                        Agree
                    </v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>
    </v-container>
</template>

<script>

import UserListItem from '@/components/UserListItem'
import UserService from "@/services/userService";
import TestingService from "@/services/MedicalTestingService";

export default {
    components: {
        UserListItem,
    },
    data() {
        return {
            users: [],
            confirmation: false,
            selectedUser: {},
            processing: false,
        }
    },
    created() {
        this.loadUsers();
    },
    methods: {
        loadUsers() {
            const self = this;
            TestingService.getUsersInfectionStatus().then( response => {
                self.users = response.data;
            })
        },
        getIcon(user) {
            if(user.infection_status.status === 'positive') {
                return 'fa-virus';
            }
            return '';
        },
        mark(user) {
            this.selectedUser = user;
            this.confirmation = true;
        },
        confirmed() {
            const self = this;
            self.processing = true;
            TestingService.updateUserInfectionStatus(this.selectedUser.username, 'positive')
                .then(response => {
                    if(response.status === 200) {
                        self.loadUsers();
                    }
                    self.processing = false;
                    self.confirmation = false;
                });
        }
    }
}
</script>

<style scoped>
</style>