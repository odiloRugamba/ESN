// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueWebsocket from "vue-websocket";
import VueSession from "vue-session"
import vuetify from "@/plugins/vuetify"
import store from '@/store'
import * as VueGoogleMaps from "vue2-google-maps";

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
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBKe-kA0K-GYgGyVspdRoyNFLz2i6chmpM',
    libraries: "places" // necessary for places input
  }
});
Vue.config.productionTip = false 

/* eslint-disable no-new */
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
