<template>
<div>
    <v-container fluid>
        
        Create new call for application for volunteers
            <v-form>
                <v-col class="d-flex" cols="12" sm="12">
                    <v-text-field
                        label="Title"
                        outlined
                        v-model="call.title"
                    />
                </v-col>
                <v-col cols="12" sm="12">
                    <v-text-field
                        label="End date"
                        placeholder="MM/DD/YYYY"
                        outlined
                        v-model="call.endDate"
                    ></v-text-field>
                </v-col>
                
                <v-col class="d-flex" cols="12" sm="12">
                    <v-select
                    :items="items"
                    label="Category"
                    v-model="call.category"
                    dense
                    ></v-select>
                </v-col>

                <v-col class="d-flex" cols="12" sm="12">
                    <v-textarea
                    filled
                    auto-grow
                    label="Specify tasks to be performed by volunteers"
                    rows="2"
                    row-height="20"
                    v-model="call.tasks"
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
            <v-btn large @click="create" color="primary" dark>
                <v-icon dark>mdi-plus</v-icon>
                Create    
            </v-btn>
        </v-card-actions>
    </v-container>
</div>
</template>

<script>

import volunteeringService from "@/services/volunteeringService";

export default {
    name: 'newCall',
    components: {
        
    },
    data() {
        return {
            call: {
                author: this.$session.get('username'),
                title: '',
                endDate: '',
                category: '',
                tasks: '',
            },
            items: ['Health workers', 'Drivers', 'public influencers'],
            loading: false,
            invalidCredential: false,
        }
    },
    methods: {
        create(){
            volunteeringService.createVolunteeringCall(this.call).then(res => {
                if(res.status = 200){
                    this.$router.push("/volunteering");
                }
            })
        },
        cancel() {
             this.$router.push("/volunteering");
        },
        
    }
}
</script>

<style scoped>

</style>