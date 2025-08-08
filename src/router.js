import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import SignIn from './pages/SignIn.vue'
import About from './pages/about.vue'
import ResetPassword from './pages/ResetPassword.vue'
import PostJob from './pages/PostAJob.vue'
import Methode from './pages/methode.vue'
import Onboarding01 from './pages/Onboarding01.vue'
import Onboarding02 from './pages/Onboarding02.vue'
import Onboarding03 from './pages/Onboarding03.vue'
import Onboarding04 from './pages/Onboarding04.vue'
import ClientFeedback01 from './pages/ClientFeedback01.vue'
import ClientFeedback02 from './pages/ClientFeedback02.vue'
import ClientFeedback03 from './pages/ClientFeedback03.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  scrollBehavior(to) {
    if (to.hash) {
      window.scroll({ top: 0 })
    } else {
      document.querySelector('html').style.scrollBehavior = 'auto'
      window.scroll({ top: 0 })
      document.querySelector('html').style.scrollBehavior = ''
    }
  },  
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/signin',
      component: SignIn
    },
    {
      path: '/schedule-call',
      component: PostJob
    },    
    {
      path: '/reset-password',
      component: ResetPassword
    },
    {
      path: '/methode',
      component: Methode
    },
    {
      path: '/a-propos',
      component: About
    },
    {
      path: '/onboarding-01',
      component: Onboarding01
    },
    {
      path: '/onboarding-02',
      component: Onboarding02
    },
    {
      path: '/onboarding-03',
      component: Onboarding03
    },
    {
      path: '/onboarding-04',
      component: Onboarding04
    },
    {
      path: '/clientfeedback-01',
      component: ClientFeedback01
    },
    {
      path: '/clientfeedback-02',
      component: ClientFeedback02
    },
    {
      path: '/clientfeedback-03',
      component: ClientFeedback03
    },
  ]
})

export default router
