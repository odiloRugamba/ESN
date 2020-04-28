<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-btn
                    block
                    large
                    tile
                    dark
                    :loading="loadingStatus"
                    :color="btnColor"
                    @click="onlockdown"
                >
                    <v-icon v-text="btnIcon"></v-icon>
                    {{btnText}}
                </v-btn>
            </v-col>
        </v-row>
        <v-row
            v-if="!loadingStatus"
        >
            <v-col cols="12">
                <v-card
                    raised
                    shaped
                    dark
                    color="accent"
                >
                    <v-card-title class="headline mb-1">
                        {{infected}} infected people
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row
            v-if="!loadingStatus"
        >
            <v-col cols="12">
                <v-card
                    raised
                    shaped
                    dark
                    color="accent"
                >
                    <v-card-title class="headline mb-1">
                        {{potentially}} potentially infected people
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row
            v-if="!loadingStatus"
        >
            <v-col cols="12">
                <v-card
                    raised
                    shaped
                    dark
                    color="accent"
                >
                    <v-card-title class="headline mb-1">
                        {{tracking}} people tracking
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row
            v-if="!loadingStatus"
        >
            <v-col cols="12">
                <v-card
                    raised
                    shaped
                    dark
                    color="accent"
                >
                    <v-card-title class="headline mb-1">
                        {{nottracking}} people not tracking
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <div
            v-if="loadingStatus"
        >
            <v-skeleton-loader
                v-for="n in 4"
                :key="n"
                loading
                type="list-item"
            />
            </div>
    </v-container>
</template>

<script>

import LockdownService from "@/services/LockdownService";

export default {
    data() {
        return {
            lockdownstatus: false,
            loadingStatus: true,
            btnText: 'activate',
            btnIcon: 'mdi-lock-outline',
            btnColor: 'error',
            tracking: '?',
            nottracking: '?',
            infected: '?',
            potentially: '?',
        }
    },
    created() {
        const self = this;
        this.loadingStatus = true;
        LockdownService.getStatus().then(response => {
            if(response.status === 200) {
                self.lockdownstatus = response.data.status.status;
                self.tracking = response.data.tracking;
                self.nottracking = response.data.nottracking;
                self.infected = response.data.infected;
                self.potentially = response.data.potentially;
            }
            if(self.lockdownstatus) {
                self.btnText = 'deactivate';
                self.btnIcon = 'mdi-lock-open-variant-outline';
                self.btnColor = 'success';
            }
            else {
                self.btnText = 'activate';
                self.btnIcon = 'mdi-lock-outline';
                self.btnColor = 'error';
            }
            self.loadingStatus = false;
        });
    },
    methods: {
        onlockdown() {
            if(this.btnText === 'activate') {
                // Activate
                const self = this;
                self.loadingStatus = true;
                LockdownService.updateStatus(true).then(response => {
                    if(response.status === 200) {
                        self.btnText = 'deactivate';
                        self.btnIcon = 'mdi-lock-open-variant-outline';
                        self.btnColor = 'success';
                    }
                    self.loadingStatus = false;
                })
            }
            else {
                // Deactivate
                const self = this;
                self.loadingStatus = true;
                LockdownService.updateStatus(false).then(response => {
                    if(response.status === 200) {
                        self.btnText = 'activate';
                        self.btnIcon = 'mdi-lock-outline';
                        self.btnColor = 'error';
                    }
                    self.loadingStatus = false;
                });
            }
        }
    }
}
</script>

<style scoped>
</style>