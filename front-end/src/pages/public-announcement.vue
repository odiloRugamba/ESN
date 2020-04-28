<template>
  <v-container fill-height fluid>
    <Chat 
      :messages="displayedAnnouncements"
      :loading="loading"
    />
    <TypeMessage
    v-if="isCordinator"
      placeholder="Announcement"
      type="announcement"
    />
  </v-container>
</template>

<script>
import Chat from "@/components/Chat.vue";
import TypeMessage from "@/components/TypeMessage.vue";
import AnnouncementemeService from "@/services/announcementService";

import { mapState } from 'vuex'

export default {
	name: "public-announcement",
	components: {
   Chat: Chat,
   TypeMessage: TypeMessage,
  },
	data() {
    return {
      announcements: [],
      loading: false,
    };
  },
  computed: {
    isCordinator: function() {
            return this.$session.get('user').role === 'coordinator';
        },
    ...mapState({
      displayedAnnouncements (state) {
        if(state.search.searchResult) {
          state.search.searchResult.forEach(ann => this.transformAnnouncement(ann));
          return state.search.searchResult;
        }
        return this.announcements;
      }
    })
  },
  created() {
    const self = this;
    self.loading = true;
    AnnouncementemeService.fetchAnnouncements().then(response => {
      if(response.status === 200) {
        response.data.forEach(ann => this.transformAnnouncement(ann));
        self.announcements = response.data;
        self.loading = false;
      }
    })
    
    this.$socket.on("new-announcement", announcement => {
      this.transformAnnouncement(announcement);
      this.announcements.push(announcement);
    });
    this.$store.commit('search/setCanSearch', true);
    this.$store.commit('search/setSearchContext', 'search-announcements');
  },
  methods: {
    transformAnnouncement(announcement) {
      announcement.sender = announcement.publisher;
      announcement.created_at = announcement.timestamp
    }
  }
}
</script>

<style scoped>
</style>