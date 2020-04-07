<template>
  <div>
    <span class="float-left pl-3">Welcome to [Made Changes!] the Emmergency Management App</span>

    <span class="float-right pr-3">
      <router-link to="/chat">Proceed to user directory and chat</router-link>
    </span>
    <hr />
    <div>
      <div>
        <strong>Below is the meaning of different statuses that you may share</strong>
      </div>
      <hr />
        <div id="okay">
            <img src="../assets/okay_icon.png" width="100">
            I am okay. I do not need any help 
        </div> 
        <div id="help">
            <img src="../assets/help-icon.png" width="100">
            I need help, but this is not a life threatening emergency.
        </div> 
        <div id="help">
            <img src="../assets/emergency-icon.png" width="100">
            I need help now, as this is a life threatening emergency!
        </div>
    </div>
    <div>
</div>
  </div>
</template>

<script>
import Api from "@/services/Api";
export default {
  computed: {
    getuser() {
      return this.$store.state.users;
    }
  },
  methods: {
    async updateStatus() {
     var users = this.getuser;
     console.log(username);
     if(isLoggedIn)
     {
       console.log("Logged In")
     }
      this.errorMsg = "";
      
      var founduser;
    },
    isLoggedIn() {
      var user = this.getuser;
      if (user.username.length > 0) {
        return true;
      }
      return false;
    }
  }
};
</script>