<template>
  <main class="bg-linear-to-br from-indigo-50/20 to-white text-gray-800">
    <div class="relative flex min-h-[100dvh] flex-col lg:flex-row">
      <div class="w-full lg:w-1/2">
        <div class="flex h-full min-h-[100dvh] flex-col after:flex-1">
          <div class="flex-1">
            <div class="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
              <router-link to="/" aria-label="Wenovat"><img src="../images/logo.png" class="max-w-none" width="120" height="60" alt="Wenovat" /></router-link>
              <router-link to="/" class="text-sm font-bold text-indigo-500">Retour</router-link>
            </div>
          </div>

          <div class="px-4 py-8">
            <div class="mx-auto max-w-md">
              <h1 class="mb-3 text-3xl font-bold text-gray-800">Développement assisté par IA</h1>
              <p class="mb-8 text-gray-500">Décrivez votre projet, votre équipe et vos contraintes pour obtenir un premier cadre de réflexion. Vos réponses ne sont envoyées qu'au lancement de l'analyse.</p>
              <DevelopmentAssessmentForm :loading="isLoading" @submit="analyze" @changed="invalidateResult" @started="trackStart" />
            </div>
          </div>
        </div>
      </div>

      <div class="relative w-full min-w-0 overflow-y-auto lg:fixed lg:bottom-0 lg:right-0 lg:top-0 lg:w-1/2" aria-label="Résultats du simulateur">
        <div class="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-indigo-100 to-white" aria-hidden="true"></div>
        <div class="pointer-events-none absolute right-0 -z-10 hidden md:block" aria-hidden="true">
          <img src="../images/auth-illustration.svg" class="max-w-none" width="1440" height="900" alt="" />
        </div>
        <div class="flex min-h-[680px] flex-col justify-center px-4 py-8 sm:px-6 lg:min-h-full">
          <div class="mx-auto w-full min-w-0 max-w-xl">
            <div v-if="!result" class="space-y-3">
              <div v-if="isLoading" class="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm" role="status" aria-live="polite">
                <div class="flex items-center gap-3"><div class="h-3 w-3 animate-pulse rounded-full bg-indigo-500" aria-hidden="true"></div><div class="font-bold text-gray-900">Analyse du projet en cours</div></div>
                <p class="mt-2 text-sm text-gray-500">Nous attendons la réponse du service d'évaluation.</p>
              </div>
              <div v-if="errorMessage" class="rounded-xl border border-amber-200 bg-amber-50 p-4" role="alert">
                <div class="font-bold text-amber-900">Analyse indisponible</div>
                <p class="mt-1 text-sm text-amber-700">{{ errorMessage }}</p>
                <button v-if="lastSubmittedPayload" type="button" class="btn-sm mt-4 bg-gray-900 text-white hover:bg-gray-800" :disabled="isLoading" @click="analyze(lastSubmittedPayload)">Réessayer</button>
              </div>
              <div class="rounded-xl border border-sky-200 bg-sky-50 p-4 opacity-40"><div class="font-bold text-gray-900">Diagnostic développement IA</div><p class="mt-1 text-sm text-gray-500">Votre diagnostic apparaîtra ici après analyse.</p></div>
              <div class="rounded-xl border border-sky-200 bg-sky-50 p-4"><div class="font-bold text-gray-900">Scénarios et frameworks</div><p class="mt-1 text-sm text-gray-500">Comparez les propositions adaptées à votre contexte.</p></div>
              <div class="rounded-xl border border-sky-200 bg-sky-50 p-4 opacity-40"><div class="font-bold text-gray-900">Parcours et recommandations</div><p class="mt-1 text-sm text-gray-500">Les prochaines étapes seront présentées dans l'ordre transmis.</p></div>
            </div>

            <div v-else class="flex max-h-[calc(100dvh-4rem)] min-w-0 flex-col rounded-3xl bg-white/95 p-5 shadow-2xl backdrop-blur">
              <div class="shrink-0 px-1 pb-6"><ResultNavigation :slides="slides" :active-index="activeSlide" @select="selectSlide" /></div>
              <article :key="currentSlide.key" class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
                <p class="shrink-0 text-sm font-bold text-indigo-500">{{ activeSlide + 1 }} / {{ slides.length }}</p>
                <h2 ref="resultsHeading" tabindex="-1" class="mt-2 shrink-0 font-cabinet-grotesk text-2xl font-bold text-gray-900 outline-none">{{ currentSlide.title }}</h2>
                <p class="mt-3 shrink-0 text-sm text-gray-500">{{ currentSlide.description }}</p>
                <div class="mt-6 min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden pr-2 pb-4">
                  <DiagnosticResult v-if="currentSlide.key === 'diagnostic'" :diagnostic="result.diagnostic" />
                  <JourneyResult v-else-if="currentSlide.key === 'journey'" :journey="result.journey" />
                  <ScenariosResult v-else-if="currentSlide.key === 'scenarios'" :scenarios="result.scenarios" />
                  <FrameworksResult v-else-if="currentSlide.key === 'frameworks'" :frameworks="result.frameworks" />
                </div>
              </article>
              <div class="mt-4 flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-4">
                <button type="button" class="btn-sm bg-white text-gray-700 shadow-sm" @click="previousSlide">Précédent</button>
                <div class="flex flex-wrap items-center justify-end gap-2">
                  <button v-if="!demoEnabled" type="button" class="btn-sm bg-indigo-500 text-white hover:bg-indigo-600" @click="openShareDialog('results_navigation')">Envoyer l'étude</button>
                  <button type="button" class="btn-sm bg-gray-900 text-white hover:bg-gray-800" @click="nextSlide">Suivant</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <StudyShareDialog
      id="development-study-modal"
      :open="shareOpen"
      :status="shareStatus"
      :error-message="shareErrorMessage"
      :success-recipient="shareSuccessRecipient"
      :role-options="roleOptions"
      description="Recevez les résultats et les recommandations de cette étude de développement assisté par IA."
      @close="closeShareDialog"
      @submit="submitShareStudy"
    />
  </main>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, shallowRef } from 'vue'
import DevelopmentAssessmentForm from '../components/developmentAi/DevelopmentAssessmentForm.vue'
import DiagnosticResult from '../components/developmentAi/DiagnosticResult.vue'
import ScenariosResult from '../components/developmentAi/ScenariosResult.vue'
import FrameworksResult from '../components/developmentAi/FrameworksResult.vue'
import JourneyResult from '../components/developmentAi/JourneyResult.vue'
import ResultNavigation from '../components/simulator/ResultNavigation.vue'
import StudyShareDialog from '../components/simulator/StudyShareDialog.vue'
import { trackEvent } from '../lib/analytics.js'
import { callDevelopmentAssessment, shareDevelopmentStudy, buildDevelopmentSharePayload } from '../lib/developmentAi/assessmentApi.js'
import { validateDevelopmentResult } from '../lib/developmentAi/contract.js'
import { isDevelopmentDemoEnabled } from '../lib/developmentAi/demoMode.js'

const slides = [
  { key: 'diagnostic', title: 'Diagnostic global', description: 'Score, dimensions et constats transmis par le service.' },
  { key: 'journey', title: 'Parcours de développement recommandé', description: 'Étapes prioritaires, points forts et axes d’amélioration pour votre contexte.' },
  { key: 'frameworks', title: 'Frameworks et outils', description: 'Comparez les frameworks renvoyés pour votre situation.' },
  { key: 'scenarios', title: 'Scénarios d’adoption', description: 'Explorez les actions et les livrables proposés, puis comparez les scénarios transmis.' },
]
const roleOptions = ['Architecte', 'Développeur', 'Tech Lead', 'Product owner', 'Responsable technique', 'DSI', 'Consultant', 'Autre']
const demoEnabled = isDevelopmentDemoEnabled(import.meta.env)
const currentSlide = computed(() => slides[activeSlide.value])
const result = shallowRef(null)
const activeSlide = ref(0)
const isLoading = ref(false)
const errorMessage = ref('')
const lastSubmittedPayload = ref(null)
const resultsHeading = ref(null)
const shareOpen = ref(false)
const shareStatus = ref('idle')
const shareErrorMessage = ref('')
const shareSuccessRecipient = ref('')
let started = false
let requestId = 0
let viewedScreens = new Set()

function trackStart() {
  if (started) return
  started = true
  trackEvent('dev_ai_simulator_started', { simulator_id: 'development_ai' })
}

function invalidateResult() {
  requestId += 1
  result.value = null
  isLoading.value = false
  errorMessage.value = ''
  lastSubmittedPayload.value = null
  viewedScreens = new Set()
}

function trackScreen(index) {
  if (!result.value || viewedScreens.has(index) || demoEnabled) return
  viewedScreens.add(index)
  trackEvent('dev_ai_result_screen_viewed', { simulator_id: 'development_ai', result_screen: slides[index].key })
}

async function analyze(payload) {
  if (isLoading.value) return
  trackStart()
  invalidateResult()
  const id = requestId
  lastSubmittedPayload.value = payload
  isLoading.value = true
  trackEvent('dev_ai_assessment_submitted', { simulator_id: 'development_ai' })

  try {
    let response
    if (import.meta.env.DEV && import.meta.env.VITE_DEV_AI_DEMO === 'true') {
      const { demoDevelopmentResult } = await import('../lib/developmentAi/demoFixture.js')
      response = demoDevelopmentResult
    } else {
      response = await callDevelopmentAssessment(payload)
    }
    validateDevelopmentResult(response)
    if (id !== requestId) return
    result.value = response
    activeSlide.value = 0
    if (!demoEnabled) trackEvent('dev_ai_assessment_succeeded', { simulator_id: 'development_ai' })
    trackScreen(0)
    await nextTick()
    resultsHeading.value?.focus()
  } catch (error) {
    if (id !== requestId) return
    if (error?.message?.includes('Réponse incomplète')) errorMessage.value = 'La réponse du service est incomplète. Aucun résultat ne peut être affiché ou partagé. Réessayez plus tard.'
    else if (error?.message?.includes('VITE_DEV_AI_')) errorMessage.value = error.message
    else if (error?.name === 'AbortError') errorMessage.value = 'Le service ne répond pas dans le délai imparti. Réessayez.'
    else errorMessage.value = 'Le service d’analyse est indisponible. Vérifiez votre connexion et réessayez.'
  } finally {
    if (id === requestId) isLoading.value = false
  }
}

function selectSlide(index) {
  if (index < 0 || index >= slides.length || activeSlide.value === index) return
  activeSlide.value = index
  trackScreen(index)
}
function nextSlide() { selectSlide((activeSlide.value + 1) % slides.length) }
function previousSlide() { selectSlide((activeSlide.value - 1 + slides.length) % slides.length) }

function openShareDialog(ctaLocation) {
  if (!result.value || demoEnabled) return
  shareStatus.value = 'idle'
  shareErrorMessage.value = ''
  shareOpen.value = true
  trackEvent('dev_ai_study_form_opened', { simulator_id: 'development_ai', cta_location: ctaLocation })
}
function closeShareDialog() {
  if (shareStatus.value === 'submitting') return
  shareOpen.value = false
  shareStatus.value = 'idle'
  shareErrorMessage.value = ''
  shareSuccessRecipient.value = ''
}
async function submitShareStudy(form) {
  if (shareStatus.value === 'submitting' || !result.value || demoEnabled) return
  const email = form.recipientEmail.trim()
  const name = form.recipientName.trim()
  if (!email || !name) {
    shareErrorMessage.value = 'Renseignez un email et un nom pour envoyer l’étude.'
    return
  }
  const study = result.value
  shareStatus.value = 'submitting'
  shareErrorMessage.value = ''
  try {
    const response = await shareDevelopmentStudy(buildDevelopmentSharePayload({ email, name, role: form.recipientRole.trim() }, form.comment.trim(), form.website, study))
    shareSuccessRecipient.value = response?.recipient || email
    shareStatus.value = 'success'
    trackEvent('dev_ai_study_lead_submitted', { simulator_id: 'development_ai' })
  } catch (error) {
    shareStatus.value = 'error'
    if (error?.message?.includes('VITE_DEV_AI_')) shareErrorMessage.value = error.message
    else if (error?.name === 'AbortError') shareErrorMessage.value = 'L’envoi a expiré. Réessayez.'
    else if (error?.status === 400) shareErrorMessage.value = 'Les informations du destinataire sont invalides. Vérifiez-les et réessayez.'
    else shareErrorMessage.value = 'Impossible d’envoyer l’étude pour le moment. Réessayez plus tard.'
  }
}
onBeforeUnmount(() => { requestId += 1 })
</script>
