/* eslint-disable */
import Api from '@/services/Api'

export default {

  fetchPublicMessages () {
    return Api().get('/messages/public')
  },

  fetchPrivateMessages (username1, username2) {
    return Api().get('/messages/private/'+username1+'/'+username2)
  },

  sendPublicMessage (sender, message) {
    return Api().post('/messages/public', {sender: sender, text: message})
  },

  sendPrivateMessage (sender, receiver, message) {
    return Api().post('/messages/private', {sender: sender, receiver: receiver, text: message})
  },

}
