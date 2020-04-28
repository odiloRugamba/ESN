<template>
  <v-container fill-height fluid>
      <SymptomsPopup>
        <template v-slot:default="slotProps">
          <v-btn 
          dark 
          left 
          bottom
          offset-y
          v-on="slotProps.on"
          v-if="!isHealthWorker"
          >Share your symptoms</v-btn>
        </template>
      </SymptomsPopup>
      <Chat
      :messages="displayedCoronaMessages"
      :addresses="displayedAddresses"
      />
    <CoronaMessage
    v-if="!isHealthWorker"
      placeholder="Message doctors or send your address for pick up"
      type="coronamsg"
    />
    <CoronaMessage
    v-else
      placeholder="Respond to patients"
      type="coronamsg"
    />
  </v-container>
</template>

<script>
import Chat from "@/components/CoronaCaseChat.vue";
import CoronaMessage from "@/components/CoronaCaseTypeMessage.vue";
import SymptomsPopup from "@/components/SymptomsPopup.vue"
import coronaMsgService from "@/services/coronaMsgService";

export default {
	name: "corona-cases",
	components: {
   Chat: Chat,
   CoronaMessage: CoronaMessage,
   SymptomsPopup: SymptomsPopup,
  },

	data() {
    return {
      messages: [],
      displayedCoronaMessages: [],
      displayedAddresses: [],
      loading: false,
    };
  },

  created() {
    const self = this;
    self.loading = true;

    coronaMsgService.fetchCoronaMessages().then(response => {
      if(response.status === 200) {
        self.messages = response.data;
        self.displayedCoronaMessages = self.messages;
        self.loading = false;
      }
    })

    coronaMsgService.fetchLocations().then(response => {
      if(response.status === 200) {
        self.displayedAddresses = response.data;
        self.loading = false;
      }
    })

     this.$socket.on("new-corona-msg", cornamsg => {
      this.messages.push(cornamsg);
    });

    this.$socket.on("new-location", cornamsg => {
      this.displayedAddresses.push(cornamsg);
    });
  },
  computed: {
    isHealthWorker: function() {
            return this.$session.get('user').role === 'health_worker';
        },
  },
  methods: {
    filter(messages) {
      this.displayedCoronaMessages = messages;
    },
    reset() {
      this.displayedCoronaMessages = this.messages;
    }
  }
}
</script>

<style scoped>
</style>