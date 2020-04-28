/* eslint-disable */
import Api from '@/services/Api'

export default {

  getStatus () {
    return Api().get('/lockdown/status')
  },

  updateStatus (status) {
    return Api().post('/lockdown/status', {status: status})
  },
}
