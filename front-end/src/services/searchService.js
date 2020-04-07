/* eslint-disable */
import Api from '@/services/Api'

export default {

  search(context, terms, extras) {
     return Api().post('/search', {context: context, terms: terms, extras: extras})
  },
}
