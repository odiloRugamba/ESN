import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import chat from '@/pages/Chat'
import welcome from '@/pages/welcome'
import announcement from '@/pages/public-announcement'
import privatechat from '@/pages/PrivateChat'
import volunteering from '@/pages/volunteering'
import newCall from '@/pages/newCall'
import registerForVolunteering from '@/pages/register-for-volunteering'
import VolunteeringApplicants from '@/pages/applicants'



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat
    },
    {
      path: '/private/:username',
      name: 'private',
      component: privatechat
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: welcome,
    },
    {
      path: '/public-announcement',
      name: 'public-announcement',
      component: announcement,
    },
    {
      path: '/volunteering',
      name: 'volunteering',
      component: volunteering,
    },
    {
      path: '/new-call',
      name: 'newCall',
      component: newCall,
    },
    {
      path: '/register-for-volunteering',
      name: 'registerForVolunteering',
      component: registerForVolunteering,
      props: (route) => ({callId: route.query.callId})
    },
    {
      path: '/see-volunteering-applicants',
      name: 'VolunteeringApplicants',
      component: VolunteeringApplicants,
      props: (route) => ({callId: route.query.callId})
    }
  ]
})
