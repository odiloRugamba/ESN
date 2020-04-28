<template>
<div>
    <v-container fluid>
        
        Apply for volunteering
        <ValidationObserver ref="observer">
            <v-form>
                <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:30">
                    <v-col class="d-flex" cols="12" sm="12">
      
                        <v-text-field
                            label="Name"
                            :counter="30"
                            :error-messages="errors"
                            outlined
                            v-model="application.name"
                        />
                    </v-col>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Phone" rules="required|numeric|min:8|max:12">
                    <v-col class="d-flex" cols="12" sm="12">
                        <v-text-field
                            label="Phone"
                            :counter="12"
                            :error-messages="errors"
                            outlined
                            v-model="application.phone"
                        />
                    </v-col>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                    <v-col class="d-flex" cols="12" sm="12">
                        <v-text-field
                            label="Email"
                            :error-messages="errors"
                            outlined
                            v-model="application.email"
                        />
                    </v-col>
                </ValidationProvider>
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
    name: 'registerForVolunteering',
    props: ['callId'],
     components: {
      ValidationProvider,
      ValidationObserver,
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
            loading: false,
            invalidCredential: false,
        }
    },
    methods: {
        submit(){
           this.$refs.observer.validate().then( res =>{
               if(res){
                const app = {
                        ...this.application,
                        callId: this.callId
                    }
                volunteeringService.createVolunteeringApplication(app).then(res =>{
                    if(res.status==200)
                        this.$router.push("/volunteering")
                    
                });
               }
           })
            
        },
        cancel() {
             this.$router.push("/volunteering")
        },
        
    }
}
</script>

<style scoped>

</style>