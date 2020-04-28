<template>
<div>
    <v-card
        raised
        min-width="400"
        :loading="loading"
    >
        <v-card-title class="headline">Join the Community</v-card-title>
        <v-card-text>
            <v-form
                v-model="valid"
                ref="form"
            >
                <v-text-field
                    label="Username"
                    outlined
                    v-model="user.username"
                    :rules="usernameRules"
                    :error-messages="usernameErrorMessages"
                    @change="usernameErrorMessages = []"
                />
                <v-text-field
                    label="Password"
                    outlined
                    type="password"
                    v-model="user.password"
                    :rules="passwordRules"
                />
            </v-form>
            <v-alert
                dense
                type="error"
                v-model="showError"
            >
                {{ errorMessage }}
            </v-alert>
        </v-card-text>
        <v-card-actions>
            <v-btn 
                text 
                color="accent"
                :disabled="!valid"
                @click="checkUsernameCriteria"
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
import axios from 'axios'

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
            usernameRules: [
                v => !!v || 'Username is required',
                v => v.length >= 3 || 'Username must be at least 3 characters long'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length >= 4 || 'Password must be at least 4 characters long'
            ],
            usernameErrorMessages: [],
            valid: false,
            showConfirmDialog: false,
            loading: false,
            showError: false,
            errorMessage: ''
        }
    },
    methods: {
        checkUsernameCriteria() {
            const self = this;
            self.loading = true;
            UserService.isUsernameAcceptable(this.user.username).then( response => {
                self.loading = false;
                if(response.status === 200) {
                    // Username exists, user tries to login
                    self.join();
                }
            }).catch(err => {
                self.loading = false;
                if(!err.response) {
                }
                else if(err.response.status === 406) {
                    self.usernameErrorMessages = 'Username not allowed';
                }
                else if(err.response.status === 404) {
                    // Username does not exists, new user
                    self.showConfirmDialog = true;
                }
            })
        },
        join() {
            const self = this;
            self.loading = true;
            UserService.loginUser(self.user).then( response => {
                self.loading = false;
                if(response.status === 200) {
                    self.saveSession(response.data.user, response.data.token);
                }
            }).catch(err => {
                self.loading = false;
                if(err.response && err.response.status === 401) {
                    // Incorrect credentials
                    self.errorMessage = 'Invalid credentials';
                    self.showError = true;
                }
                else if(err.response && err.response.status === 403) {
                    // Incorrect credentials
                    self.errorMessage = 'Account deactivated';
                    self.showError = true;
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
                    self.saveSession(response.data.user, response.data.token);
                }
            }).catch(err => {
                self.loading = false;
            })
        },
        saveSession(user, token) {
            this.$session.start();
            this.$session.set('username', user.username);
            this.$session.set('user', user);
            this.$session.set('jwt', token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            this.$router.push('/welcome');
        }
    }
}
</script>

<style scoped>

</style>