<template>
  <v-container fluid fill-height>
        <h3>{{receiver.username}}</h3>
        <v-row>
          <v-col cols="12">
            <Search 
                context="private-messages"
                :extras="extras"
                @searchresults="filter"
                @reset="reset"
            />
          </v-col>
        </v-row>
        <Chat 
          :messages="displayedMessages"
          :loading="loading"
        />
        <TypeMessage
          placeholder="Message"
          type="private"
          :receiver="receiver"
        />
  </v-container>
</template>

<script>
import DirectoryList from "@/components/DirectoryList.vue";
import Chat from "@/components/Chat.vue";
import Search from "@/components/Search.vue";
import TypeMessage from "@/components/TypeMessage.vue";
import MessageService from "@/services/messageService";
export default {
  components: {
    DirectoryList: DirectoryList,
    Chat: Chat,
    Search: Search,
    TypeMessage: TypeMessage,
  },
  props: [ 'receiver' ],
  data() {
    return {
      messages: [],
      displayedMessages: [],
      extras: {},
      loading: false,
    };
  },

  created() {
    const self = this;
    this.$socket.on("new-private", msg => {
      // TO-DO check if same receiver before appending
      self.messages.push(msg);
    });
    this.extras.username1 = this.$session.get('username');
    if(this.receiver !== undefined && this.receiver !== null && this.receiver !== '') {
      this.extras.username2 = this.receiver.username;
      this.loadPrivMsg();
    }
  },
  methods: {
    loadPrivMsg() {
      const self = this;
      self.loading = true;
      MessageService.fetchPrivateMessages(this.$session.get('username'), this.receiver.username)
        .then(response => {
          if(response.status === 200) {
            self.messages = response.data;
            self.displayedMessages = self.messages;
            self.loading = false;
          }
        })
    },
    filter(messages) {
      this.displayedMessages = messages;
    },
    reset() {
      this.displayedMessages = this.messages;
    }
  },
  watch: {
    $route(to, from) {
      this.extras.username2 = this.receiver.username;
      this.loadPrivMsg();
    }
  }
};
</script>

<style scoped>
</style>