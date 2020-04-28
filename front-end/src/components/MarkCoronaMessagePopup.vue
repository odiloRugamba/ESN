<template>
    <v-dialog v-model="dialog" max-width="600px"
    >
      <template v-slot:activator="{ on }">
        <slot v-bind:on="on"></slot>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Mark patient's corona case</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-select
                  v-model="mark"
                  :items="marks"
                  label="Mark*"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="submitMark">Update mark</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import coronaMsgService from "@/services/coronaMsgService";
  export default {
    name: 'markCoronaMessage',
    props: [ 'message','sender' ],
    data(){
        return {
            dialog: false,
            mark: '',
            marks: [
              {
                text: 'Pick up for testing',
                value: 'pick up'
              },
              {
                text: 'No need for pickup',
                value: 'no pick up'
              },
              {
                text: 'Picked up',
                value: 'picked up'
              },
            ]
        }
    },
    methods: {
        submitMark(e){
            this.loading = true;
            coronaMsgService.markCoronaMessage(this.sender,this.message, this.mark)
            .then(res => {
                //hide the dialog and update status on the screen
                console.log("Updating mark")
                this.dialog = false;
            })
            .catch(err => {
              this.dialog = false;
           });
        }
    }
  }
</script>
