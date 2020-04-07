<template>
<div>
    <v-card
        raised
        min-width="400"
        :loading="loading"
    >
        <v-card-title class="headline">Join the Community</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                    label="Username"
                    outlined
                    v-model="user.username"
                />
                <v-text-field
                    label="Password"
                    outlined
                    type="password"
                    v-model="user.password"
                />
            </v-form>
            <v-alert
                dense
                type="error"
                v-model="invalidCredential"
            >
                Invalid credentials
            </v-alert>
        </v-card-text>
        <v-card-actions>
            <v-btn 
                text 
                color="accent"
                @click="join"
            >
                Join
            </v-btn>
        </v-card-actions>
    </v-card>
    <ConfirmJoin 
        :show="showConfirmDialog"
        @cancel="cancel"
        @confirmed="confirmed"
    />
</div>
</template>

<script>

import UserService from "@/services/userService";
import ConfirmJoin from "@/components/ConfirmJoin";

export default {
    name: 'JoinCommunity',
    components: {
        ConfirmJoin,
    },
    data() {
        return {
            user: {
                username: '',
                password: ''
            },
            showConfirmDialog: false,
            loading: false,
            invalidCredential: false,
        }
    },
    methods: {
        join() {
            // TO-DO break down this function
            const self = this;
            self.loading = true;
            UserService.isUser(this.user).then( response => {
                if(response.status === 200) {
                    // Username exists
                    UserService.loginUser(self.user).then( response => {
                        self.loading = false;
                        if(response.status === 200) {
                            self.$session.start();
                            self.$session.set('username', self.user.username);
                            self.$session.set('role', response.data.role);
                            self.$session.set('jwt', response.data.token);
                            //Vue.http.headers.common['Authorization'] = 'Bearer ' + response.data.token
                            self.$router.push('/chat');
                        }
                        else {
                            // Unknown response
                        }
                    }).catch(err => {
                        self.loading = false;
                        if(!err.response) {
                            // Server down
                        }
                        else if(err.response.status === 401) {
                            // Incorrect credentials
                            self.invalidCredential = true;
                        }
                        else {
                            // Other errors
                        }
                    })
                }
                else {
                    self.loading = false;
                }
            }).catch(err => {
                self.loading = false;
                if(!err.response) {
                    // Server down
                }
                else if(err.response.status === 404) {
                    // Username does not exists
                    this.showConfirmDialog = true;
                }
                else {
                    // Other errors
                }
            })
        },
        cancel() {
            this.showConfirmDialog = false;
        },
        confirmed() {
            const self = this;
            self.loading = true;
            this.showConfirmDialog = false;
            UserService.registeruser(this.user).then(response => {
                self.loading = false;
                if(response.status === 201) {
                    self.$session.start();
                    self.$session.set('username', self.user.username);
                    self.$session.set('role',  response.data.role);
                    self.$session.set('jwt', response.data.token);
                    //Vue.http.headers.common['Authorization'] = 'Bearer ' + response.data.token
                    self.$router.push('/welcome');
                }
            }).catch(err => {
                self.loading = false;
            })
        }
    }
}
</script>

<style scoped>

</style>