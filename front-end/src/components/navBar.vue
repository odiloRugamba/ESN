<template>
  <nav class="navbar navbar-light bg-light justify-content-between">
    <a class="navbar-brand">Emergency Social Network Application</a>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
    
    };
  },
  beforeCreate: function() {
    if (!this.$session.exists()) {
      //this.$router.push("/");
    }
  },
  methods: {
    logout() {
      let username = this.$session.get("activeuser");
      //this.$session.remove("token");
      this.$socket.emit("logout", username);
      this.$session.clear();
      this.$session.destroy()
      this.$router.push("/");
    }
  }
};
</script>

<style scoped></style>
