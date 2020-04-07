<template>
  <v-app-bar
    app
    color="primary"
    dark
    clipped-left
  >
    <v-app-bar-nav-icon 
      v-if="drawerIcon"
      @click.stop="drawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>Emergency Social Network Application</v-toolbar-title>
    <v-spacer></v-spacer>
      <StatusMenu
        v-if="isLoggedIn"
      >
        <template v-slot:default="slotProps">
          <v-btn 
          dark 
          left 
          bottom
          offset-y
          v-on="slotProps.on"
          >Update status</v-btn>
        </template>
      </StatusMenu>
      <v-btn 
        icon 
        v-if="isLoggedIn"
        @click="logout"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <template v-slot:extension v-if="isLoggedIn">
        <tabs></tabs>
      </template>
  </v-app-bar>
</template>

<script>
import tabs from "./tabs";
import StatusMenu from '@/components/Status.vue'
export default {
  name: "AppBar",
  props: [ 'isLoggedIn' ],
  components: {
    tabs,
    StatusMenu,
  },
  data() {
    return {
    };
  },
  computed: {
      drawerIcon: function() {
          return this.$vuetify.breakpoint.smAndDown;
      }
  },
  methods: {
    logout() {
      let username = this.$session.get("username");
      this.$socket.emit("offline", username);
      this.$session.clear();
      this.$session.destroy()
      this.$router.push("/");
    },
    drawer() {
      this.$emit('toggledrawer');
    }
  },
};
</script>

<style scoped></style>
