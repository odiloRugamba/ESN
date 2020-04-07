<template>
  <v-container fluid fill-height>
        <v-row>
          <v-col cols="12">
            <Search 
                context="public-messages"
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
          type="public"
        />
  </v-container>
</template>

<script>
import Chat from "@/components/Chat.vue";
import Search from "@/components/Search.vue";
import TypeMessage from "@/components/TypeMessage.vue";
import MessageService from "@/services/messageService";
export default {
  components: {
    Chat: Chat,
    Search: Search,
    TypeMessage: TypeMessage,
  },
  data() {
    return {
      messages: [],
      displayedMessages: [],
      loading: false,
    };
  },

  created() {
    const self = this;
    self.loading = true;
    MessageService.fetchPublicMessages().then(response => {
      if(response.status === 200) {
        self.messages = response.data;
        self.displayedMessages = self.messages;
        self.loading = false;
      }
    })
    this.$socket.on("new-public", msg => {
      this.messages.push(msg);
    });
  },
  methods: {
    filter(messages) {
      this.displayedMessages = messages;
    },
    reset() {
      this.displayedMessages = this.messages;
    }
  }
};
</script>

<style scoped>
</style>