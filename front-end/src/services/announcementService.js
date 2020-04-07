/* eslint-disable */
import Api from '@/services/Api'

export default {

  fetchAnnouncements () {
    return Api().get('/announcements')
  },

  sendAnnouncement (sender, announcement) {
    return Api().post('/announcements', {sender: sender, text: announcement})
  },
}
