<template>
    <v-dialog 
      v-bind:value="value" 
      v-on:input="$emit('input', $event.target.value)"
      :loading="loading"
      persistent 
      max-width="600px"
    >
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
                  :items="statuses"
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
          <v-btn color="blue darken-1" text @click="$emit('input', false)">Close</v-btn>
          <v-btn color="blue darken-1" text @click="submitStatus">Save changes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import UserService from "@/services/userService";
  export default {
    name: 'updateStatus',
    props: [ 'value' ],
    data(){
        return {
            loading: false,
            status: '',
            statuses: [
              {
                text: 'Okay',
                value: 'ok'
              },
              {
                text: 'Help',
                value: 'help'
              },
              {
                text: 'Emergency',
                value: 'emergency'
              },
            ]
        }
    },
    methods: {
        submitStatus(e){
            this.loading = true;
            UserService.updateStatus(this.$session.get('user').username, this.status)
            .then(res => {
                //hide the dialog and update status on the screen
                this.loading = false;
                let user = this.$session.get('user')
                user.status.text = this.status;
                this.$session.set('user', user);
                this.$emit('input', false);
            })
            .catch(err => {
              this.loading = false;
           });
        }
    }
  }
</script>
