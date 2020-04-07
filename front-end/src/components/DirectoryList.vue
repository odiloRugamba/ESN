<template>
<v-navigation-drawer 
    app 
    clipped 
    :value="drawer"
    :permanent="permanent"
    @input="toggle"
>
    <template v-slot:prepend>
        <v-card flat>
            <v-card-title>Users</v-card-title>
            <v-card-subtitle>
                <Search 
                    context="users"
                    @searchresults="filter"
                    @reset="reset"
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
    <v-skeleton-loader
        v-else
        v-for="n in 5"
        :key="n"
        loading
        type="list-item-avatar-two-line"
    />
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

</style>