// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueWebsocket from "vue-websocket";
import VueSession from "vue-session"
import vuetify from "@/plugins/vuetify"

const env = process.env.NODE_ENV || 'dev';

let HOST = '';

if(env === 'production') {
  HOST = 'https://esn-fse.herokuapp.com'
}
else {
  HOST = 'http://localhost:8081' 
}

Vue.use(VueSession)
Vue.use(VueWebsocket, HOST); 
Vue.config.productionTip = false 

/* eslint-disable no-new */
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
