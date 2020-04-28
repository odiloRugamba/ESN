
<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <slot v-bind:on="on"></slot>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Which COVID-19 symptoms do you have?</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div><input type="checkbox" value="cough" v-model="symptoms" true-value="1" false-value="0">Cough</div>
            <div><input type="checkbox" value="fever" v-model="symptoms" true-value="1" false-value="0">Fever</div>
            <div><input type="checkbox" value="tiredness" v-model="symptoms" true-value="1" false-value="0">Tiredness</div>
            <div><input type="checkbox" value="difficulty breathing" v-model="symptoms" true-value="1" false-value="0">Difficulty breathing</div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="sendSymptoms">Send to doctors</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script> 
//import the service that sends messages in the corona cases page
import coronaMsgService from "@/services/coronaMsgService";
export default {
   
    data(){
        return {
            dialog: false,
            symptoms: [],
            symptomsMessage: 'The symptoms I have are',
        }
    },
    methods: {
        sendSymptoms(e){
            e.preventDefault();
            //find out the symptoms that are selected
            // construct a string from them
            for (let i = 0; i < this.symptoms.length; i++) {
                this.symptomsMessage = this.symptomsMessage + " "+ this.symptoms[i]+",";
            }
            console.log(this.symptomsMessage)
            //call the method that sends messages to send the constructed string.
            coronaMsgService.sendCoronaMessage(this.$session.get('username'), this.symptomsMessage)
            .then(res => {
                console.log(res);
                //hide the dialog and update status on the scrin
                //this.$router.push("/chat");
                this.dialog = false;
            });
        }
    }
}
</script>