import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import SignIn from './pages/SignIn.vue'
import About from './pages/about.vue'
import ResetPassword from './pages/ResetPassword.vue'
import PostJob from './pages/PostAJob.vue'
import Methode from './pages/Methode.vue'
import Contact01 from './pages/contact01.vue'
import Contact02Company from './pages/Contact02Company.vue'
import Contact02Freelance from './pages/Contact02Freelance.vue'
import Contact02Any from './pages/Contact02Any.vue'
import ContactSubmitMessage from './pages/ContactSubmitMessage.vue'
import ClientFeedback01 from './pages/ClientFeedback01.vue'
import ClientFeedback02 from './pages/ClientFeedback02.vue'
import ClientFeedback03 from './pages/ClientFeedback03.vue'
import { useFormStore } from './stores/formContacterNous.js'
import { pinia } from './main'

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
      path: '/nous-contacter',
      component: Contact01
    },
    {
      path: '/c-02-c',
      component: Contact02Company
    },
    {
      path: '/c-02-f',
      component: Contact02Freelance
    },
    {
      path: '/c-02-a',
      component: Contact02Any
    },
    {
      path: '/c-03',
      component: ContactSubmitMessage
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

router.beforeEach((to) => {

  const form = useFormStore(pinia)


})


export default router
