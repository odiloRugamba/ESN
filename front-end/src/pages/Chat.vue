<template>
  <v-container fluid fill-height>
        <Chat 
          :messages="displayedMessages"
          :loading="loading"
        />
        <TypeMessage
          placeholder="Message"
          type="public"
        />
  </v-container>
</template>

<script>
import Chat from "@/components/Chat.vue";
import TypeMessage from "@/components/TypeMessage.vue";
import MessageService from "@/services/messageService";

import { mapState } from 'vuex'

export default {
  components: {
    Chat: Chat,
    TypeMessage: TypeMessage,
  },
  data() {
    return {
      messages: [],
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
    self.loading = true;
    MessageService.fetchPublicMessages().then(response => {
      if(response.status === 200) {
        self.messages = response.data;
        self.loading = false;
      }
    })
    this.$socket.on("new-public", msg => {
      this.messages.push(msg);
    });
    this.$store.commit('search/setCanSearch', true);
    this.$store.commit('search/setSearchContext', 'public-messages');
  },
};
</script>

<style scoped>
</style>