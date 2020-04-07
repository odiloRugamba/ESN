<template>
    <v-footer app inset>
        <v-row>
          <v-col cols="11">
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
          <v-col cols="1">
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
        </v-row>
    </v-footer>
</template>

<script>

import MessageService from "@/services/messageService";
import AnnouncementemeService from "@/services/announcementService";

export default {
    name: 'TypeMessage',
    props: [ 'type', 'receiver', 'placeholder' ],
    data() {
        return {
            message: '',
        }
    },
    methods: {
        send() {
            let result;
            if(this.message === '') {
                return;
            }
            if(this.type === 'public') {
                result = MessageService.sendPublicMessage(this.$session.get('username'), this.message);
            }
            else if(this.type === 'private') {
                result = MessageService.sendPrivateMessage(this.$session.get('username'), this.receiver.username, this.message);
            }
            else if(this.type === 'announcement') {
                result = AnnouncementemeService.sendAnnouncement(this.$session.get('username'), this.message);
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
    }
}
</script>

<style scoped>
</style>