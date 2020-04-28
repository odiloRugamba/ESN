<template>
<v-navigation-drawer 
    app 
    :value="drawer"
    :permanent="permanent"
    @input="toggle"
>
    <template v-slot:prepend>
        <v-card
            dark
            flat
            tile
            class="mx-auto grad"
        >
            <v-icon 
                class="ml-3 mt-3"
                x-large 
            >
                mdi-account-circle
            </v-icon>
            <v-card-title v-text="user.username"></v-card-title>
            <v-card-subtitle v-text="user.role"></v-card-subtitle>
            <v-card-text v-text="user.status.text"></v-card-text>
        </v-card>
        <v-divider></v-divider>
        <v-list>
            <v-list-item 
                link
                to="/chat"
                color="secondary"
            >
                <v-list-item-icon>
                    <v-icon>mdi-forum</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Messages</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item 
                link
                to="/volunteering"
                color="secondary"
            >
                <v-list-item-icon>
                    <v-icon>mdi-hand-heart</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Volunteering</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item 
                link
                to="/corona-cases"
                color="secondary"
            >
                <v-list-item-icon>
                    <v-icon>mdi-virus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Corona cases</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item 
                link
                to="/lockdown"
                color="secondary"
                v-if="isCityRep"
            >
                <v-list-item-icon>
                    <v-icon>mdi-lock-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Lockdown</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item 
                link
                to="/infection"
                color="secondary"
                v-if="isHealthWorker"
            >
                <v-list-item-icon>
                    <v-icon>fa-virus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Covid-19 Infection</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item
                link
                to="/administer"
                color="secondary"
                v-if="isAdmin"
            >
                <v-list-item-icon>
                    <v-icon>fa-users</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Administer</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-card flat>
            <v-card-title>Users</v-card-title>
            <v-card-subtitle>
                <Search 
                    context="users"
                    @searchresults="filter"
                    @reset="reset"
                    @searching="loading = true"
                    @searchend="loading = false"
                />
            </v-card-subtitle>
        </v-card>
    </template>
    <v-list 
        v-if="!loading"
        two-line
    >
        <UserListItem
            v-for="user in displayedUsers"
            :key="user.username"
            :user="user"
            @selected="selected"
        />
    </v-list>
    <div
        v-if="loading"
    >
    <v-skeleton-loader
        v-for="n in 5"
        :key="n"
        loading
        type="list-item-avatar-two-line"
    />
    </div>
</v-navigation-drawer>
</template>

<script>

import UserListItem from './UserListItem.vue'
import UserService from "@/services/userService";
import Search from './Search.vue'

export default {
    name: 'DirectoryList',
    props: [ 'drawer' ],
    components: {
        UserListItem,
        Search,
    },
    data() {
        return {
            users: [],
            displayedUsers: [],
            loading: false,
        }
    },
    computed: {
        permanent: function() {
            return this.$vuetify.breakpoint.mdAndUp;
        },
        isCityRep: function() {
            return this.$session.get('user').role === 'city_rep';
        },
        isHealthWorker: function() {
            return this.$session.get('user').role === 'health_worker';
        },
        isCitizen: function() {
            return this.$session.get('user').role === 'citizen';
        },
        isAdmin: function() {
            return this.$session.get('user').role === 'administrator';
        },
        user: function() {
            // TO-DO this is not updated when user update
            return this.$session.get('user');
        }
    },
    created() {
        const self = this;
        self.loading = true;
        UserService.listUsers().then( response => {
            self.users = response.data;
            self.displayedUsers = self.users;
            self.loading = false;
        })
    },
    methods: {
        selected(user) {
            this.$emit('selected', user);
        },
        filter(users) {
            this.displayedUsers = users;
            this.loading = false;
        },
        reset() {
            this.displayedUsers = this.users;
        },
        toggle(status) {
            this.$emit('toggle', status);
        },
    }
}
</script>

<style scoped>
.grad {
    background: linear-gradient(to right, #3a7bd5, #3a6073);
}
</style>