
<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <slot v-bind:on="on"></slot>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Update your status</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-select
                  v-model="status"
                  :items="['Okay', 'Help', 'Emergency']"
                  label="Status*"
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
          <v-btn color="blue darken-1" text @click="submitStatus">Save changes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import Api from "@/services/Api";
  export default {
    name: 'updateStatus',
    data(){
        return {
            dialog: false,
            status: '',
            activeuser: this.$session.get('username'),
        }
    },
    created(){
       
    },
    methods: {
        
        submitStatus(e){
            e.preventDefault();
            this.$session.start();
            this.$session.set("userStatus", this.status),
            Api().post("/update-status", { username: this.$session.get('username'), userStatus: this.status })
            .then(res => {
                //hide the dialog and update status on the scrin
                //this.$router.push("/chat");
                this.dialog = false;
            })
            .catch(err => {
                console.log(err);
           });
        }
    }
  }
</script>
