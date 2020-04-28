<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <v-app-bar-nav-icon 
      v-if="drawerIcon"
      @click.stop="drawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>Emergency Social Network</v-toolbar-title>
    <v-spacer></v-spacer>
    <AppBarActions 
      v-if="isLoggedIn"
    />
    <template v-slot:extension v-if="showTabs">
      <router-view name="app_bar_extension"></router-view>
    </template>
  </v-app-bar>
</template>

<script>
import tabs from "./tabs";
import AppBarActions from '@/components/AppBarActions.vue'
export default {
  name: "AppBar",
  props: [ 'isLoggedIn' ],
  components: {
    tabs,
    AppBarActions,
  },
  data() {
    return {
    };
  },
  computed: {
      drawerIcon: function() {
          return this.$vuetify.breakpoint.smAndDown;
      },
      menuIcon: function() {
        return this.isLoggedIn && this.$vuetify.breakpoint.smAndDown;
      },
      fullMenu: function() {
        return this.isLoggedIn && this.$vuetify.breakpoint.mdAndUp;
      },
      showTabs: function() {
        return this.isLoggedIn && this.$route.matched.some( x => 'app_bar_extension' in x.components);
      },
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
