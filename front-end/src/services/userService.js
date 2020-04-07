/* eslint-disable */
import Api from '@/services/Api'

export default {

  registeruser(user) {
     return Api().post('/register', user)
  },

  loginUser(user) {
     return Api().post('/login', user)
  },

  isUser(username) {
     return Api().post('/username', username)
  },

  listUsers() {
    return Api().get('/users')
  }
}
