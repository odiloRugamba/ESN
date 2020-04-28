<template>
  <v-container fluid>
    <p class="headline text-center">Welcome to the Emmergency Social Network Application</p>

    <p class="title text-center">Below is the meaning of different statuses that you may share</p>
    <v-row no-gutters>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col cols="3" md="1">
            <v-img src="../assets/okay_icon.png" contain/>
          </v-col>
          <v-col 
            cols="9" 
            md="10"
            offset="0" 
            offset-md="1" 
            align-self="center"
          >
            <p>I am okay. I do not need any help.</p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col cols="3" md="1">
            <v-img src="../assets/help-icon.png" contain/>
          </v-col>
          <v-col 
            cols="9" 
            md="10"
            offset="0" 
            offset-md="1" 
            align-self="center"
          >
            <p>I need help, but this is not a life threatening emergency.</p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col cols="3" md="1">
            <v-img src="../assets/emergency-icon.png" contain/>
          </v-col>
          <v-col 
            cols="9" 
            md="10"
            offset="0" 
            offset-md="1" 
            align-self="center"
          >
            <p>I need help now, as this is a life threatening emergency!</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'welcome'
};
</script>