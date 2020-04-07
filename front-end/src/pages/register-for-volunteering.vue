<template>
<div>
    <v-container fluid>
        
        Apply for volunteering
            <v-form>
                <v-col class="d-flex" cols="12" sm="12">
                    <v-text-field
                        label="Name"
                        outlined
                        v-model="application.name"
                    />
                </v-col>
                <v-col class="d-flex" cols="12" sm="12">
                    <v-text-field
                        label="Phone"
                        outlined
                        v-model="application.phone"
                    />
                </v-col>
                <v-col class="d-flex" cols="12" sm="12">
                    <v-text-field
                        label="Email"
                        outlined
                        v-model="application.email"
                    />
                </v-col>

                <v-col class="d-flex" cols="12" sm="12">
                    <v-textarea
                    filled
                    auto-grow
                    label="Any additional details?"
                    rows="2"
                    row-height="20"
                    v-model="application.additionalDetails"
                    ></v-textarea>
                </v-col>
            </v-form>
            <v-alert
                dense
                type="error"
                v-model="invalidCredential"
            >
                invalid inputs
            </v-alert>
        <v-card-actions>
            <v-btn large @click="cancel" color="accent" dark>
                <v-icon dark>mdi-plus</v-icon>
                Cancel    
            </v-btn>
            <v-btn large @click="submit" color="primary" dark>
                <v-icon dark>mdi-plus</v-icon>
                Submit    
            </v-btn>
        </v-card-actions>
    </v-container>
    
</div>
</template>

<script>

import volunteeringService from "@/services/volunteeringService";
export default {
    name: 'registerForVolunteering',
    props: ['callId'],
    components: {
        
    },
    data() {
        return {
            application: {
                username: this.$session.get('username'),
                name: '',
                phone: '',
                email: '',
                additionalDetails: ''
            },
            items: ['Health workers', 'Drivers', 'public influencers'],
            loading: false,
            invalidCredential: false,
        }
    },
    methods: {
        submit(){
            
            const app = {
                                ...this.application,
                                callId: this.callId
                            }
            volunteeringService.createVolunteeringApplication(app).then(res =>{
                if(res.status==200)
                    this.$router.push("/volunteering")
                
            });
            
        },
        cancel() {
             this.$router.push("/volunteering")
        },
        
    }
}
</script>

<style scoped>

</style>