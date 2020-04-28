<template>
  <v-container fill-height fluid>


    <VolunteeringCalls v-if="calls.length!=0"
      :calls="calls"
      :isCoordinator="isCoordinator"
      :loading="loading"
    />
    <p v-else
    >
      No volunteering calls avilable
    </p>
     <v-row v-if="isCoordinator">
      <v-col cols="12">
          <div class="my-2">
            <v-btn small @click="newCall" color="primary" dark>
                <v-icon dark>mdi-plus</v-icon>
                new application call
                    
            </v-btn>
          </div>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
import VolunteeringCalls from "@/components/volunteering-calls.vue";
import volunteeringService from "@/services/volunteeringService";
export default {
	name: "volunteering",
	components: {
        VolunteeringCalls: VolunteeringCalls
    },

	data() {
    return {
      calls: [],
      isCoordinator: '',
      role: this.$session.get('user').role,
      loading: false,
    };
  },

  created() {
    this.loading = true;
    
    //update role
    if(this.role === 'coordinator')
        {
          this.isCoordinator=true;
        }
        else{
          this.isCoordinator = false;
        }


    if(this.isCoordinator){
        volunteeringService.fetchAllVolunteeringCalls("sender").then(response => {
        if(response.status === 200) {
            this.calls = response.data;
            this.loading = false;
            
        }
        })
    }else{
        volunteeringService.fetchOpenVolunteeringCalls().then(response => {
        if(response.status === 200) {
            this.calls = response.data;
            this.loading = false;
            
        }
        })
    }
     this.$socket.on("new-volunteering-call", call => {
      this.calls.push(call);
    });
  },

  methods: {
      newCall(){
          this.$router.push('/new-call');
      },
  }
}
</script>

<style scoped>
</style>