/* eslint-disable */
import Api from '@/services/Api'

export default {

    registeruser(user) {
     return Api().post('/register', user)
    },

    loginUser(user) {
     return Api().post('/login', user)
    },

    updateStatus(username, status) {
     return Api().put('/users/'+username+'/status', { status: status })
    },

    isUsernameAcceptable(username) {
     return Api().head('/users/'+username)
    },

    listUsers() {
    return Api().get('/users')
    },

    retrieveUser(username) {

        return Api().get('/users/' + username);
    },

    updateUserProfile(user) {

        return Api().post('/updateuser', user);
    },

    getAllUsers() {
        return Api().get('/allusers');
    }
}
