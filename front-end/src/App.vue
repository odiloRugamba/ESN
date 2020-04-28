<template>
  <v-app id="app">
    <transition
      name="fade"
    >
      <component 
        :is="bar"
        :isLoggedIn="isLoggedIn"
        @toggledrawer="toggledrawer"
      ></component>
    </transition>
    <DirectoryList 
      :drawer="drawer"
      @toggle="changedrawer"
      @selected="selected"
      v-if="isLoggedIn"
    />
    <v-content>
      <router-view></router-view>
    </v-content>
    <TrackLocation />
    <v-snackbar
        v-model="snackbar"
        top
        :color ="snackbarColor"
        :timeout="6000"
    >
      Your account has been deactivated.
        <v-btn
            dark
            text
            @click="snackbar = false"
        >
            Close
        </v-btn>
    </v-snackbar>
    <ChatNotification
      v-model="showNotification"
      color="info"
      :message="notificationMessage"
      :link="notificationLink"
    />
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";
import SearchToolBar from '@/components/ActionBar/SearchToolBar.vue'
import DirectoryList from "@/components/DirectoryList.vue";
import TrackLocation from "@/components/TrackLocation.vue";
import ChatNotification from "@/components/ChatNotification.vue";
import axios from 'axios'

import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    AppBar,
    SearchToolBar,
    DirectoryList,
    TrackLocation,
    ChatNotification
  },
  data() {
    return {
      drawer: false,
      isLoggedIn: false,
      bar: 'AppBar',
      snackbar: false,
      snackbarColor: 'info',
      showNotification: false,
      notificationMessage: '',
      notificationLink: ''
    }
  },
  computed: {
    ...mapState({
      showSearchToolbar: state => state.search.showSearchToolbar
    })
  },
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push("/");
    }
    else {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$session.get('jwt');
      if(this.$route.name === 'index') {
        this.$router.push({ name: 'welcome' });
      }
    }
  },
  created() {
    const self = this;
    self.isLoggedIn = self.$session.exists();
    this.$router.beforeEach( (to, from, next) => {
      self.$store.commit('search/resetSearch');
      next();
    })
    this.$router.afterEach( (to) => {
      self.isLoggedIn = self.$session.exists();
    });
    this.$socket.on("new-private", this.newPrivateMessage);
  },
  methods: {
    toggledrawer() {
      this.drawer = !this.drawer;
    },
    changedrawer(status) {
      this.drawer = status;
    },
    selected(user) {
      this.$router.push({ 
        name: 'private', 
        params: {
          receiver: user.username
        }
      });
    },
    newPrivateMessage(message) {
      if((message.sender !== this.$session.get('user').username) &&
      (this.$route.name !== 'private' || this.$route.params.receiver !== message.sender)) {
        this.notificationMessage = message.sender+': '+message.text;
        this.notificationLink = '/private/'+message.sender;
        this.showNotification = true;
      }
    }
  },
  watch: {
    isLoggedIn: function(isLoggedIn) {
      if(this.isLoggedIn) {
        let username = this.$session.get("username");
        this.$socket.emit("online", username);
      }
    },
    showSearchToolbar: function(showSearchToolbar) {
      if(this.showSearchToolbar) {
        this.bar = 'SearchToolBar';
      }
      else {
        this.bar = 'AppBar';
        this.$store.commit('search/clearSearch');
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
      },
      deactivate() {
        if(this.$session.exists()) {
          let username = this.$session.get("username");
          this.$socket.emit("offline", username);
          this.$session.clear();
          this.$session.destroy()
          this.snackbar = true;
          this.$router.push("/");
        }
      },
    }
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
