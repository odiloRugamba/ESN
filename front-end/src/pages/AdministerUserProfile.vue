<template>
    <v-container>
        <v-list
            v-if="!loading"
            two-line
        >
            <UserListItem
                v-for="user in users"
                :key="user.username"
                :user="user"
                @selected="selected(user)"
            />
        </v-list>
        <div
            v-if="loading"
        >
            <v-skeleton-loader
                v-for="n in 15"
                :key="n"
                loading
                type="list-item-avatar-two-line"
            />
            </div>
    <AdministerUserProfile 
        :user="user" 
        v-model="show"
    />
  </v-container>
</template>

<script>
import UserService from "@/services/userService";
import UserListItem from "@/components/UserListItem";
import AdministerUserProfile from "@/components/AdministerUserProfile"
export default {
    components: {
        UserListItem,
        AdministerUserProfile,
    },
    data() {
        return {
            show: false,
            loading: false,
            users: [],
            user: {},
        }
    },
    created() {
        this.loadUsers();
    },
    methods: {
        loadUsers() {
            const self = this;
            self.loading = true;
            UserService.getAllUsers()
                .then( response => {
                    response.data.forEach(user => {
                        user.status = user.current_status;
                    })
                    self.users = response.data;
                    self.loading = false;
            });

        },
        selected(user) {
            this.user = JSON.parse(JSON.stringify(user));
            this.show = true;
        }
    },
    watch: {
        show: function(show) {
            if(!show) {
                this.loadUsers();
            }
        }
    }
}
</script>

<style scoped>
</style>