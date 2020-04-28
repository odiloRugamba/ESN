/* eslint-disable */
import Api from '@/services/Api'

export default {

  updateUserTrackingStatus (username, status) {
    return Api().put('/tracklocation/users/'+username+'/permission', { status: status })
  },

  updateUserLocation (username, latitude, longitude) {
    return Api().post('/tracklocation/users/'+username, {lat: latitude, long: longitude})
  },
}
