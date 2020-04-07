<template>
  <div class="container-fluid h-100">
    <div class="row justify-content-center h-100">
      <div class="col-md-8 col-xl-6 chat">
        <form @submit="submitStatus">
            <select v-model="status" class="status-choices">
                <option value="ok" selected>Ok</option>
                <option value="Help" selected>Help</option>
                <option value="Emergency">Emergency</option>
            </select>
            <input type="submit" class="submit-status-choices" value="Share status">
        </form>

        <div><br><br>
        <strong>Below is the meaning of different statuses that you may share</strong>
      </div>
      <hr />
        <div id="okay">
            <img src="../assets/okay_icon.png" width="50">
            I am okay. I do not need any help 
        </div> 
        <div id="help">
            <img src="../assets/help-icon.png" width="50">
            I need help, but this is not a life threatening emergency.
        </div> 
        <div id="help">
            <img src="../assets/emergency-icon.png" width="50">
            I need help now, as this is a life threatening emergency!
        </div>
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
            status: '',
            activeuser: this.$session.get("activeuser"),
        }
    },
    created(){
        
    },
    methods: {
        
        submitStatus(e){
            e.preventDefault();
            this.$session.start();
            this.$session.set("userStatus", this.status),
            Api().post("/update-status", { username: this.$session.get("activeuser"), userStatus: this.status })
            .then(res => {
                console.log(res);
                this.$router.push("/chat");
            })
            .catch(err => {
                console.log(err);
           });
        }
    }
}
</script>

<style scoped>
.status-choices{
    margin-top: 30px;
    width: 70%;
    height: 40px;
}

.submit-status-choices{
    height: 40px;
}
</style>