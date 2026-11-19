import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Methode from './pages/Methode.vue'
import JoinCommunity from './pages/JoinCommunity.vue'
import Blog from './pages/Blog.vue'
import Contact01 from './pages/contact01.vue'
import Contact02Company from './pages/Contact02Company.vue'
import Contact02Freelance from './pages/Contact02Freelance.vue'
import Contact02Any from './pages/Contact02Any.vue'
import ContactSubmitMessage from './pages/ContactSubmitMessage.vue'
import ClientFeedback01 from './pages/ClientFeedback01.vue'
import ClientFeedback02 from './pages/ClientFeedback02.vue'
import ClientFeedback03 from './pages/ClientFeedback03.vue'
import AiInfrastructureEstimator from './pages/AiInfrastructureEstimator.vue'
import AiInfrastructureSimulator from './pages/AiInfrastructureSimulator.vue'
import AiDevelopmentOffer from './pages/AiDevelopmentOffer.vue'
import AiDevelopmentSimulator from './pages/AiDevelopmentSimulator.vue'
import Connexion from './pages/Connexion.vue'
import Inscription from './pages/Inscription.vue'
import EspaceDemo from './pages/EspaceDemo.vue'
import EspaceOnboarding from './pages/EspaceOnboarding.vue'
import EspaceProfil from './pages/EspaceProfil.vue'
import EspaceMissions from './pages/EspaceMissions.vue'
import EspaceMissionDetail from './pages/EspaceMissionDetail.vue'
import EspaceCandidatures from './pages/EspaceCandidatures.vue'
import AdminDemo from './pages/AdminDemo.vue'
import AdminTalents from './pages/AdminTalents.vue'
import AdminTalentDetail from './pages/AdminTalentDetail.vue'
import AdminTalentNew from './pages/AdminTalentNew.vue'
import AdminMissions from './pages/AdminMissions.vue'
import AdminMissionDetail from './pages/AdminMissionDetail.vue'
import PortalLayout from './layouts/PortalLayout.vue'
import AdminLayout from './layouts/AdminLayout.vue'
import PortalPlaceholder from './pages/PortalPlaceholder.vue'
import { getMockSession } from './services/authService.js'
import { useFormStore } from './stores/formContacterNous.js'
import { pinia } from './main'
import MentionsLegal from "./pages/MentionsLegal.vue";

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
      path: '/methode',
      component: Methode
    },
    {
      path: '/rejoindre-la-communaute',
      component: JoinCommunity
    },
    {
      path: '/connexion',
      component: Connexion
    },
    {
      path: '/inscription',
      component: Inscription
    },
    {
      path: '/espace',
      component: PortalLayout,
      children: [
        { path: '', component: EspaceDemo },
        { path: 'onboarding', component: EspaceOnboarding, meta: { title: 'Bienvenue dans la communauté' } },
        { path: 'profil', component: EspaceProfil, meta: { title: 'Mon profil' } },
        { path: 'missions', component: EspaceMissions, meta: { title: 'Missions' } },
        { path: 'missions/:id', component: EspaceMissionDetail, meta: { title: 'Mission' } },
        { path: 'candidatures', component: EspaceCandidatures, meta: { title: 'Mes candidatures' } },
      ]
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        { path: '', component: AdminDemo },
        { path: 'talents', component: AdminTalents, meta: { title: 'Talents' } },
        { path: 'talents/nouveau', component: AdminTalentNew, meta: { title: 'Ajouter un talent' } },
        { path: 'talents/:id', component: AdminTalentDetail, meta: { title: 'Détail talent' } },
        { path: 'missions', component: AdminMissions, meta: { title: 'Missions' } },
        { path: 'missions/:id', component: AdminMissionDetail, meta: { title: 'Détail mission' } },
        { path: 'entreprises', component: PortalPlaceholder, meta: { title: 'Entreprises' } },
        { path: 'prestations', component: PortalPlaceholder, meta: { title: 'Prestations & revenus' } },
      ]
    },
    {
      path: '/blog',
      component: Blog
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
    {
      path: '/mentions',
      component: MentionsLegal
    },
    {
      path: '/ai-infrastructure',
      component: AiInfrastructureEstimator
    },
    {
      path: '/ai-infrastructure/simulateur',
      component: AiInfrastructureSimulator
    },
    {
      path: '/developpement-assiste-ia',
      component: AiDevelopmentOffer
    },
    {
      path: '/developpement-assiste-ia/simulateur',
      component: AiDevelopmentSimulator
    },
  ]
})

router.beforeEach((to) => {
  const session = getMockSession()
  if (to.path === '/espace' || to.path.startsWith('/espace/')) {
    if (!session) return '/connexion'
    if (session.role !== 'FREELANCE') return '/admin'
  }
  if (to.path === '/admin' || to.path.startsWith('/admin/')) {
    if (!session) return '/connexion'
    if (session.role !== 'ADMIN') return '/espace'
  }
})


export default router
