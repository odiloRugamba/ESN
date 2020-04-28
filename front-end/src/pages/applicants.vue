<template>
  <v-container fill-height fluid>
    <VolunteeringApp v-if="applicants.length != 0" 
      :applics="applicants"
      :loading="loading"
    />
    <p 
      v-else
      class="text-center"
    >No applications avilable</p>
  </v-container>
</template>

<script>
import VolunteeringApplicants from "@/components/applicants.vue";
import volunteeringService from "@/services/volunteeringService";
export default {
  name: "VolunteeringApplicants",
  props: ['callId'],
	components: {
        VolunteeringApp: VolunteeringApplicants
    },

	data() {
    return {
      applicants: [],
      loading: false,
    };
  },

  created() {
    this.loading = true;
    const call = {
      callId: this.callId,
      sender: this.$session.get('username'),
    }
    volunteeringService.fetchVolunteeringApplications(call).then(response => {
    if(response.status === 200) {
        this.applicants = response.data;
        this.loading = false;
    }
    })
     this.$socket.on("new-applicant", applicant => {
      this.applicants.push(applicant);
    });
  },

  methods: {
      newCall(){
          this.$router.push('/new-call');
      }
  }
}
</script>

<style scoped>
</style>