/* eslint-disable */
import Api from '@/services/Api'

export default {

    fetchCoronaMessages () {
      return Api().get('/coronamessages')
    },
  
    sendCoronaMessage (sender, message) {
        console.log(" reached sendCoronaMessage");
      return Api().post('/coronamessages', {sender: sender, text: message})
    },

    markCoronaMessage (sender, message, mark) {
      console.log("Trying to mark message "+message+ "sent by "+sender+" to "+mark);
      return Api().post('/markCoronaMessage', {sender: sender, message: message, mark:mark})
    },

    sendLocation (sender, lat, lng) {
      return Api().post('/sendLocation', {sender: sender, lat: lat, lng: lng})
    },
  
  fetchLocations () {
    return Api().get('/locations')
  },
  
  }