<template>
  <v-tabs 
    :grow="true"
    background-color="primary"
    dark
  >
    <v-tab
      to="/chat"
      exact
    >
      Chat
    </v-tab>
    <v-tab
      to="/private"
    >
      Private
    </v-tab>
    <v-tab
      to="/public-announcement"
      exact
    >
      Announcement
    </v-tab>
    <v-tab
      to="/volunteering"
      exact
    >
      Volunteering
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
    name: "tabs"
}
</script>

<style scoped></style>