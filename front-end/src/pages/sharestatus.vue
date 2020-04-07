<template>
  <div class="container-fluid h-100">
    <div class="row justify-content-center h-100">
      <div class="col-md-8 col-xl-6 chat">
        <form @submit="submitStatus">
            <select v-model="status">
                <option value="Help" selected>Help</option>
                <option value="Emergency">Emergency</option>
            </select>
            <input type="submit" value="Share status">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/services/Api";
export default {
    name: "shareStatus",
    data(){
        return {
            status: ''
        }
    },
    created(){
        
    },
    methods: {
        submitStatus(e){
            e.preventDefault();
            this.$session.start();
            Api.post("/update-status", { username: this.$session.get("username"), status: this.status })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>

</style>