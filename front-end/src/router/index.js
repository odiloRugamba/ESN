import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import tabs from "@/components/tabs";
import messages from '@/pages/Messages'
import chat from '@/pages/Chat'
import welcome from '@/pages/welcome'
import announcement from '@/pages/public-announcement'
import privatechat from '@/pages/PrivateChat'
import lockdown from '@/pages/Lockdown'
import infection from '@/pages/Covid19Infection'
import volunteering from '@/pages/volunteering'
import newCall from '@/pages/newCall'
import registerForVolunteering from '@/pages/register-for-volunteering'
import VolunteeringApplicants from '@/pages/applicants'
import coronacases from '@/pages/CoronaCases'
import AdministerUserProfile from "@/pages/AdministerUserProfile";

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
      name: 'messages',
      components: {
        default: messages,
        app_bar_extension: tabs
      },
      children: [
        {
          path: '/chat',
          name: 'chat',
          component: chat
        },
        {
          path: '/private/:receiver?',
          name: 'private',
          component: privatechat,
          props: true
        },
        {
          path: '/public-announcement',
          name: 'public-announcement',
          component: announcement,
        },
      ]
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: welcome,
    },
    {
      path: '/lockdown',
      name: 'lockdown',
      component: lockdown,
    },
    {
      path: '/infection',
      name: 'infection',
      component: infection,
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
    },
    {
      path: '/corona-cases',
      name: 'coronacases',
      component: coronacases,
    },
    {
      path: '/administer',
      name: 'AdministerUserProfile',
      component: AdministerUserProfile,
    }
  ]
})
