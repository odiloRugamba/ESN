<template>
  <v-container fill-height fluid>
    <v-row>
      <v-col cols="12">
        <Search 
            context="search-announcements"
            @searchresults="filter"
            @reset="reset"
        />
      </v-col>
    </v-row>
    <Chat 
      :messages="displayedAnnouncements"
      :loading="loading"
    />
    <TypeMessage
      placeholder="Announcement"
      type="announcement"
    />
  </v-container>
</template>

<script>
import Search from "@/components/Search.vue";
import Chat from "@/components/Chat.vue";
import TypeMessage from "@/components/TypeMessage.vue";
import AnnouncementemeService from "@/services/announcementService";
export default {
	name: "public-announcement",
	components: {
   Chat: Chat,
   Search: Search,
   TypeMessage: TypeMessage,
  },

	data() {
    return {
      announcements: [],
      displayedAnnouncements: [],
      loading: false,
    };
  },

  created() {
    const self = this;
    self.loading = true;
    AnnouncementemeService.fetchAnnouncements().then(response => {
      if(response.status === 200) {
        response.data.forEach(ann => {
          ann.sender = ann.publisher;
          ann.created_at = ann.timestamp
        });
        self.announcements = response.data;
        self.displayedAnnouncements = self.announcements;
        self.loading = false;
      }
    })
    
     this.$socket.on("new-announcement", announcement => {
       announcement.sender = announcement.publisher;
      this.announcements.push(announcement);
    });
  },

  methods: {
    filter(announcements) {
      announcements.forEach(ann => {
          ann.sender = ann.publisher;
          ann.created_at = ann.timestamp
        });
      this.displayedAnnouncements = announcements;
    },
    reset() {
      this.displayedAnnouncements = this.announcements;
    }
  }
}
</script>

<style scoped>
</style>