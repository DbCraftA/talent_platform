import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import SignIn from './pages/SignIn.vue'
import ScheduleCall from './pages/ScheduleCall.vue'
import ResetPassword from './pages/ResetPassword.vue'
import PostJob from './pages/PostAJob.vue'
import About from './pages/About.vue'

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
      path: '/about',
      component: About
    }
  ]
})

export default router
