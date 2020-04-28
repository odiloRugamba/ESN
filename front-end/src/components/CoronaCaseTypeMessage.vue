<template>
<div>
<incorrectAddress 
        :show="showDialog"
        @confirmed="confirmed"
    />
    <v-footer app inset>
        <v-row>
          <v-col :cols="textFieldCols">
            <v-textarea
              rows="1"
              no-resize
              dense
              rounded
              filled 
              :placeholder="placeholder"
              style="max-height: 56px;"
              v-model="message"
            ></v-textarea>
          </v-col>
          <v-col :cols="buttonCols">
            <v-btn 
              dark
              fab
              small
              depressed
              color="accent" 
              @click="send"
            >
              <v-icon dark>mdi-send</v-icon>
            </v-btn>
          </v-col>
          <v-col :cols="buttonCols">
            
            <v-btn 
            slot="activator"
              dark
              fab
              small
              depressed
              @click="sendLocation"
              v-if="!isHealthWorker"
            >
              <v-icon dark>mdi-google-maps</v-icon>
            </v-btn>
          </v-col>
        </v-row>
    </v-footer>
</div>
</template>

<script>

import coronaMsgService from "@/services/coronaMsgService";
import AnnouncementemeService from "@/services/announcementService";
import incorrectAddress from "@/components/IncorrectAdress"

export default {
    name: 'CoronaMessage',
    props: [ 'type', 'receiver', 'placeholder' ],
    components:{
      incorrectAddress
    },
    data() {
        return {
            message: '',
            showDialog: false,
        }
    },
    computed: {
        textFieldCols: function() {
            return this.$vuetify.breakpoint.smAndDown ? 8 : 10;
        },
        buttonCols: function() {
            return this.$vuetify.breakpoint.smAndDown ? 2 : 1;
        },
        isHealthWorker: function() {
            return this.$session.get('user').role === 'health_worker';
        },
    },
    methods: {
        send() {
          
            let result;
            if(this.message === '') {
                return;
            }
            if(this.type === 'coronamsg') {
              console.log("clicked send");
                result = coronaMsgService.sendCoronaMessage(this.$session.get('username'), this.message);
            }
            if(result) {
                const self = this;
                result.then(response => {
                    if(response.status === 201) {
                        self.message = '';
                    }
                });
            }
        },

        sendLocation() {
          let result;
          navigator.geolocation.getCurrentPosition(position => {
            result = coronaMsgService.sendLocation(this.$session.get('username'), position.coords.latitude, position.coords.longitude);
          }, err => {
            // display error
          });
        },
        confirmed() {
          this.showDialog = false;
        }
    }
}
</script>

<style scoped>
</style>