<template>
  <v-app id="app">
    <AppBar 
      @toggledrawer="toggledrawer"
      :isLoggedIn="isLoggedIn"
    />
    <DirectoryList 
      :drawer="drawer"
      @toggle="changedrawer"
      @selected="selected"
      v-if="isLoggedIn"
    />
    <v-content>
      <router-view :receiver="receiver"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";
import DirectoryList from "@/components/DirectoryList.vue";
export default {
  name: 'app',
  components: {
    AppBar,
    DirectoryList,
  },
  data() {
    return {
      drawer: false,
      receiver: {},
      isLoggedIn: false,
    }
  },
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push("/");
    }
  },
  created() {
    const self = this;
    self.isLoggedIn = self.$session.exists();
    this.$router.afterEach( () => {
      self.isLoggedIn = self.$session.exists();
    })
  },
  methods: {
    toggledrawer() {
      this.drawer = !this.drawer;
    },
    changedrawer(status) {
      this.drawer = status;
    },
    selected(user) {
      this.receiver = user;
      this.$router.push({ 
        name: 'private', 
        params: {
          username: this.receiver.username
        }
      });
    }
  },
  watch: {
    isLoggedIn: function(isLoggedIn) {
      if(this.isLoggedIn) {
        let username = this.$session.get("username");
        this.$socket.emit("online", username);
      }
    }
  },
  socket: {
    events: {
      connect() {
        if(this.$session.exists()) {
          this.$socket.emit('online', this.$session.get('username'))
        }
      },
      disconnect() {
        if(this.$session.exists()) {
          this.$socket.emit('offline', this.$session.get('username'))
        }
      }
    }
  }
}
</script>

<style>
</style>
