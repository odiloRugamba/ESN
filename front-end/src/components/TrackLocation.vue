<template>
<div>
    <v-dialog
        persistent
        max-width="290"
        v-model="show"
    >
        <v-card>
        <v-card-title>City under lockdown</v-card-title>
        <v-card-text>The city is under lockdown. Please enable your location.</v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="dialogDismissed"
            >
                OK
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog
        persistent
        max-width="290"
        v-model="warning"
    >
        <v-card>
        <v-card-title>Infection Status</v-card-title>
        <v-card-text>The system has determined that you came into contact with an infected citizen. Thus, you may be infected too. Please self-quarantine and follow the instructions to stop the spread.</v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="warning = false"
            >
                OK
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>

import LockdownService from "@/services/LockdownService";
import TrackLocationService from "@/services/TrackLocationService";
import TestingService from "@/services/MedicalTestingService";

export default {
    name: 'TrackLocation',
    data() {
        return {
            show: false,
            warning: false,
        }
    },
    created() {
        if(this.$session.exists()) {
            const self = this;
            const lockdownIntervalId = setInterval(() => {
                self.isUnderLockdown().then(locked => {
                    if(locked) {
                        self.show = true;
                        clearInterval(lockdownIntervalId);
                    }
                })
            }, 5*1000);
            const id = setInterval(() => {
                TestingService.getUserInfectionStatus(self.$session.get('username')).then(response => {
                    if(response.status === 200 && response.data.status === 'potentially') {
                        self.warning = true;
                        clearInterval(id);
                    }
                })
            }, 10*1000);
        }
    },
    methods: {
        isUnderLockdown() {
            const self = this;
            return LockdownService.getStatus().then(response => {
                if(response.status === 200) {
                    return response.data.status.status;
                }
                return false;
            }).catch( () => { return false; });
        },
        getLocationPermission() {
            return this.$session.get('user').tracking_status;
        },
        requestLocationPermission() {
            const self = this;
            return new Promise( (resolve, reject) => {
                navigator.geolocation.getCurrentPosition(position => {
                    resolve(true);
                }, error => {
                    resolve(false);
                })
            });
        },
        trackLocation() {
            setInterval(this.updateLocation, 10000);
        },
        updateLocation() {
            const self = this;
            const username = this.$session.get('user').username;
            navigator.geolocation.getCurrentPosition(position => {
                TrackLocationService.updateUserLocation(username, position.coords.latitude, position.coords.longitude).then(response => {});
            }, error => {
                self.permissionDenied();
            })
        },
        dialogDismissed() {
            const self = this;
            const username = this.$session.get('user').username;
            self.show = false;
            self.requestLocationPermission().then(granted => {
                if(granted) {
                    TrackLocationService.updateUserTrackingStatus(username, 'granted').then(response => {});
                    self.trackLocation();
                }
                else {
                    self.permissionDenied();
                }
            });
        },
        permissionDenied() {
            let user = this.$session.get('user');
            TrackLocationService.updateUserTrackingStatus(user.username, 'denied').then(response => {});
            // Update session info
            user.tracking_status = 'denied';
            this.$session.set('user', user);
        }
    }
}
</script>

<style scoped>
</style>