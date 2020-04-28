<template>
    <v-dialog
        v-bind:value="value" 
        v-on:input="$emit('input', false)"
    >
        <v-card
            :loading="loading"
        >
            <v-card-title
                class="headline display-1"
            >
                Administer User Profile
            </v-card-title>
            <v-card-text>
                <v-form
                    v-model="valid"
                >
                    <v-switch
                        v-model="user.active"
                        label="Active"
                        color="green"
                        hide-details
                        class="my-5"
                    ></v-switch>

                    <v-select
                        :items="roles"
                        label="Account Privilege Level"
                        v-model="user.role"
                    ></v-select>

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

                    <v-snackbar
                        v-model="snackbar"
                        top
                        :color ="snackbarColor"
                        :timeout="6000"
                    >
                        {{ snackbarText }}
                        <v-btn
                            dark
                            text
                            @click="snackbar = false"
                        >
                            Close
                        </v-btn>
                    </v-snackbar>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    text
                    color="accent"
                    @click="save"
                    :disabled="!valid"
                >
                    Save
                </v-btn>
                <v-btn
                    text
                    color="red"
                    @click="$emit('input', false)"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import axios from "axios";
    import UserService from "@/services/userService";

    export default {
        name: "AdministerUserProfile",
        props: [ 'value', 'user' ],
        components: {
        },
        data: () => ({
            username: '',
            loading: false,
            snackbar: false,
            snackbarText: "",
            snackbarColor: "success",
            roles: ['administrator', 'coordinator', 'citizen', 'city_rep', 'health_worker', 'doctor'],
            usernameRules: [
                v => !!v || 'Username is required',
                v => v.length >= 3 || 'Username must be at least 3 characters long'
            ],
            passwordRules: [
                v => !v || v.length >= 4 || 'Password must be at least 4 characters long'
            ],
            usernameErrorMessages: [],
            valid: false,
        }),
        methods: {
            save() {
                if(this.username === this.user.username) {
                    this.updateProfile();
                    return;
                }
                const self = this;
                self.loading = true;
                UserService.isUsernameAcceptable(this.user.username).then( response => {
                    self.loading = false;
                    if(response.status === 200) {
                        // Username exists
                        self.usernameErrorMessages = 'Username not available';
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
                        self.updateProfile();
                    }
                })
            },
            updateProfile() {
                const self = this;
                self.loading = true;
                UserService.updateUserProfile(self.user)
                    .then( response => {
                        self.loading = false;
                        self.$emit('input', false);
                        self.snackbarText = 'Updated successfully';
                        self.snackbarColor = 'success';
                        self.snackbar = true;
                    })
                    .catch( err => {
                        self.loading = false;
                        self.snackbarText = 'Error updating profile';
                        self.snackbarColor = 'error';
                        self.snackbar = true;
                    })

            },
        },
        watch: {
            value: function(value) {
                if(value) {
                    this.username = this.user.username;
                }
            }
        }
    }
</script>

<style scoped>

</style>