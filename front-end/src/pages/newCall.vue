<template>
<div>
    <v-container fluid>
        
        Create new call for application for volunteers
        <ValidationObserver ref="observer">
            <v-form>
                <ValidationProvider v-slot="{ errors }" name="Title" rules="required|min:5|max:50">
                    <v-col class="d-flex" cols="12" sm="12">
                        <v-text-field
                            label="Title"
                            :counter="50"
                            :error-messages="errors"
                            outlined
                            v-model="call.title"
                        />
                    </v-col>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="End date" rules="required">
                    <v-col cols="12" sm="12">
                        <v-text-field
                            label="End date"
                            placeholder="MM/DD/YYYY"
                            :error-messages="errors"
                            outlined
                            v-model="call.endDate"
                        ></v-text-field>
                    </v-col>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Category" rules="required">
                    <v-col class="d-flex" cols="12" sm="12">
                        <v-select
                        :items="items"
                        :error-messages="errors"
                        label="Category"
                        v-model="call.category"
                        dense
                        ></v-select>
                    </v-col>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Tasks" rules="required|min:5|max:500">
                    <v-col class="d-flex" cols="12" sm="12">
                        <v-textarea
                        filled
                        auto-grow
                        label="Specify tasks to be performed by volunteers"
                        rows="2"
                        :counter="500"
                        :error-messages="errors"
                        row-height="20"
                        v-model="call.tasks"
                        ></v-textarea>
                    </v-col>
                </ValidationProvider>
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
        </ValidationObserver>
    </v-container>
</div>
</template>


<script>
    import { required, email, max, numeric, min } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
    import volunteeringService from "@/services/volunteeringService";
setInteractionMode('eager')

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('min', {
    ...min,
    message: '{_field_} may not be less than {length} characters',
  })

  extend('numeric', {
    ...numeric,
    message: '{_field_} can only be numeric characters',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

export default {
    name: 'newCall',
    components: {
      ValidationProvider,
      ValidationObserver,
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
             this.$refs.observer.validate().then( res =>{
               if(res){
                    volunteeringService.createVolunteeringCall(this.call).then(res => {
                        if(res.status = 200){
                            this.$router.push("/volunteering");
                        }
                    })
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