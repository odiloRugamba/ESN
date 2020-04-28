<template>
  <div class="d-flex">
    <IconButtonAction
      icon="mdi-magnify"
      v-if="canSearch"
      @click="searchClick"
    />
    <IconButtonAction
      v-if="full"
      icon="mdi-emoticon-outline"
      @click="statusDialog = true"
    />
    <IconButtonAction
      v-if="full"
      icon="mdi-logout"
      @click="logout"
    />
    <v-menu 
      v-else 
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn 
          icon 
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <ListItemAction
          icon="mdi-emoticon-outline"
          text="Status"
          @click="statusDialog = true"
        />
        <ListItemAction
          icon="mdi-logout"
          text="Logout"
          @click="logout"
        />
      </v-list>
    </v-menu>
    <StatusDialog
      v-model="statusDialog"
    />
  </div>
</template>

<script>
import StatusDialog from '@/components/Status.vue'
import IconButtonAction from '@/components/ActionBar/IconButtonAction.vue'
import ListItemAction from '@/components/ActionBar/ListItemAction.vue'

import { mapState } from 'vuex'

export default {
  name: "AppBarActions",
  components: {
    StatusDialog,
    IconButtonAction,
    ListItemAction,
  },
  data() {
    return {
      statusDialog: false,
      showSearchToolbar: false,
    };
  },
  computed:{
    full: function() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
    ...mapState({
      canSearch: state => state.search.canSearch,
    })
  },
  methods: {
    logout() {
      let username = this.$session.get("username");
      this.$socket.emit("offline", username);
      this.$session.clear();
      this.$session.destroy()
      this.$router.push("/");
    },
    searchClick() {
      this.$store.commit('search/setShowSearchToolbar', true);
    }
  },
};
</script>

<style scoped></style>
