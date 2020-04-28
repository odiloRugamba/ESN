<template>
  <v-container fluid fill-height>
        <h3>{{receiver}}</h3>
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
import TypeMessage from "@/components/TypeMessage.vue";
import MessageService from "@/services/messageService";

import { mapState } from 'vuex'

export default {
  components: {
    DirectoryList: DirectoryList,
    Chat: Chat,
    TypeMessage: TypeMessage,
  },
  props: [ 'receiver' ],
  data() {
    return {
      messages: [],
      extras: {},
      loading: false,
    };
  },
  computed: {
    ...mapState({
      displayedMessages (state) {
        if(state.search.searchResult) {
          return state.search.searchResult;
        }
        return this.messages;
      }
    })
  },
  created() {
    const self = this;
    this.$socket.on("new-private", msg => {
      let username = this.$session.get('user').username;
      if((msg.sender === username && msg.receiver === this.receiver) ||
          (msg.sender === receiver && msg.receiver === username)) {
        self.messages.push(msg);
      }
    });
    this.extras.username1 = this.$session.get('username');
    if(this.receiver !== undefined && this.receiver !== null && this.receiver !== '') {
      this.extras.username2 = this.receiver;
      this.loadPrivMsg();
      this.$store.commit('search/setCanSearch', true);
      this.$store.commit('search/setSearchContext', 'private-messages');
      this.$store.commit('search/setExtras', this.extras);
    }
  },
  methods: {
    loadPrivMsg() {
      const self = this;
      self.loading = true;
      MessageService.fetchPrivateMessages(this.$session.get('username'), this.receiver)
        .then(response => {
          if(response.status === 200) {
            self.messages = response.data;
            self.loading = false;
          }
        })
    },
  },
  watch: {
    $route(to, from) {
      this.extras.username2 = this.receiver;
      this.loadPrivMsg();
      this.$store.commit('search/setExtras', this.extras);
    }
  }
};
</script>

<style scoped>
</style>