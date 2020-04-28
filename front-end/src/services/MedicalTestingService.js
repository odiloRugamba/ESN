/* eslint-disable */
import Api from '@/services/Api'

export default {

  getStatus () {
    return Api().get('/lockdown/status')
  },

  getUsersInfectionStatus () {
    return Api().get('/users/infection/status')
  },

  getUserInfectionStatus (username) {
    return Api().get('/users/'+username+'/infection/status')
  },

  updateUserInfectionStatus (username, status) {
    return Api().post('/users/'+username+'/infection/status', {status: status})
  },
}
