<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getMockSession } from '../services/authService.js'
import { getMockTalent, saveMockTalent } from '../services/talentService.js'
import { expertiseOptions } from '../mocks/talents.js'

const router = useRouter()
const session = getMockSession()
const initialTalent = getMockTalent(session)
const talent = ref(initialTalent)
const step = ref(initialTalent?.onboardingStep || 1)
const errors = ref({})
const notice = ref('')
const persisted = ref(true)
const cvChosenThisVisit = ref(false)
const stepLabels = ['Informations', 'CV et expériences', 'Expertises', 'Disponibilité']
const experienceId = () => `experience-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
const expertisesByValue = Object.fromEntries(expertiseOptions.map(({ value, label }) => [value, label]))
const remoteLabels = { ON_SITE: 'Sur site', HYBRID: 'Hybride', REMOTE: 'À distance' }
const availabilityLabels = { IMMEDIATE: 'Immédiate', WITHIN_MONTH: 'Sous un mois', LATER: 'Plus tard' }
const completion = computed(() => talent.value?.onboardingStatus === 'COMPLETED')

function persist() {
  if (!talent.value) return
  const result = saveMockTalent({ ...talent.value, onboardingStep: step.value })
  persisted.value = result.persisted
  if (!result.persisted) notice.value = 'Stockage local indisponible : vos données ne seront conservées que pendant cette visite.'
  else if (notice.value.startsWith('Stockage local indisponible')) notice.value = ''
}

watch(talent, persist, { deep: true })

function savedStep(nextStep) {
  step.value = nextStep
  persist()
}

function validationErrors(currentStep) {
  const next = {}
  if (currentStep === 1) {
    if (!talent.value.firstName.trim()) next.firstName = 'Saisissez votre prénom.'
    if (!talent.value.lastName.trim()) next.lastName = 'Saisissez votre nom.'
    if (!talent.value.architectTitle.trim()) next.architectTitle = "Saisissez votre titre d'architecte."
  } else if (currentStep === 2) {
    if (!talent.value.experiences.length) next.experiences = 'Ajoutez au moins une expérience.'
    talent.value.experiences.forEach((experience) => {
      if (!experience.title.trim()) next[`experience-${experience.id}`] = "Saisissez l'intitulé de cette expérience."
    })
  } else if (currentStep === 3) {
    if (!talent.value.expertise.length) next.expertise = 'Choisissez au moins une expertise.'
    if (talent.value.dailyRate === '' || !Number.isFinite(Number(talent.value.dailyRate)) || Number(talent.value.dailyRate) <= 0) next.dailyRate = 'Saisissez un TJM supérieur à zéro.'
    if (!talent.value.remotePreference) next.remotePreference = 'Choisissez une préférence de télétravail.'
    if (!talent.value.location.trim()) next.location = 'Saisissez votre localisation.'
  } else if (currentStep === 4 && !talent.value.availability) {
    next.availability = 'Choisissez votre disponibilité.'
  }
  return next
}

async function focusError() {
  await nextTick()
  document.querySelector('[aria-invalid="true"]')?.focus()
}

function next() {
  errors.value = validationErrors(step.value)
  if (Object.keys(errors.value).length) {
    notice.value = 'Corrigez les champs signalés pour continuer.'
    focusError()
    return
  }
  errors.value = {}
  notice.value = ''
  savedStep(step.value + 1)
}

function previous() {
  errors.value = {}
  notice.value = ''
  savedStep(step.value - 1)
}

function addExperience() {
  talent.value.experiences.push({ id: experienceId(), title: '', description: '' })
}

function removeExperience(index) {
  talent.value.experiences.splice(index, 1)
  errors.value = {}
}

function selectCv(event) {
  const file = event.target.files?.[0]
  if (!file) return
  talent.value.cv = { name: file.name, size: file.size }
  cvChosenThisVisit.value = true
  event.target.value = ''
}

function removeCv() {
  talent.value.cv = null
  cvChosenThisVisit.value = false
}

function toggleExpertise(value) {
  const selected = talent.value.expertise
  talent.value.expertise = selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]
}

async function finish() {
  for (let candidate = 1; candidate <= 4; candidate += 1) {
    const candidateErrors = validationErrors(candidate)
    if (Object.keys(candidateErrors).length) {
      if (candidate !== step.value) savedStep(candidate)
      errors.value = candidateErrors
      notice.value = 'Corrigez les champs signalés pour terminer.'
      focusError()
      return
    }
  }
  talent.value.onboardingStatus = 'COMPLETED'
  persist()
  await router.push({ path: '/espace', query: { onboarding: 'termine' } })
}

function saveAndLeave() {
  persist()
  router.push('/espace')
}
</script>

<template>
  <section v-if="!talent" class="rounded-2xl border border-indigo-100 bg-white px-6 py-12 shadow-sm sm:px-10">
    <h1 class="font-cabinet-grotesk text-3xl font-bold">Parcours freelance</h1>
    <p class="mt-4">Ce parcours est réservé au profil freelance de démonstration.</p>
    <router-link to="/espace" class="mt-6 inline-block font-semibold text-indigo-700 underline">Retour à l'espace</router-link>
  </section>
  <section v-else class="overflow-hidden rounded-2xl border border-indigo-100 bg-white font-aspekta text-gray-900 shadow-sm">
    <div class="grid lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.7fr)]">
      <div class="min-w-0 px-5 py-8 sm:px-10 sm:py-12">
        <div class="mx-auto max-w-xl">
          <p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Profil freelance · démonstration</p>
          <h1 class="mt-3 font-cabinet-grotesk text-3xl font-bold sm:text-4xl">Compléter mon profil</h1>
          <p class="mt-3 text-sm text-gray-600">Vos réponses sont conservées localement sur ce navigateur. Seul un administrateur peut décider d'une qualification Wenovat.</p>
          <p v-if="completion" class="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">Parcours de démonstration déjà terminé : vous pouvez modifier vos informations.</p>

          <nav aria-label="Progression du profil" class="mt-9">
            <div class="relative flex justify-between">
              <div class="absolute left-3 right-3 top-3 h-0.5 bg-indigo-100" aria-hidden="true" />
              <div v-for="(label, index) in stepLabels" :key="label" class="relative flex w-1/4 flex-col items-center gap-2 text-center">
                <span class="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold" :class="index + 1 <= step ? 'bg-indigo-700 text-white' : 'border border-indigo-200 bg-white text-gray-600'" :aria-current="step === index + 1 ? 'step' : undefined">{{ index + 1 }}</span>
                <span class="text-[0.65rem] font-semibold leading-tight sm:text-xs">{{ label }}</span>
              </div>
            </div>
            <p class="mt-5 text-sm font-semibold text-indigo-800">Étape {{ step }} sur 4 : {{ stepLabels[step - 1] }}</p>
          </nav>

          <form class="mt-8 space-y-6" novalidate @submit.prevent="step === 4 ? finish() : next()">
            <template v-if="step === 1">
              <h2 class="font-cabinet-grotesk text-2xl font-bold">Informations et titre</h2>
              <div>
                <label for="talent-first-name" class="mb-2 block text-sm font-medium">Prénom *</label>
                <input id="talent-first-name" v-model="talent.firstName" type="text" autocomplete="given-name" :aria-invalid="Boolean(errors.firstName)" :aria-describedby="errors.firstName ? 'first-name-error' : undefined" class="w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" />
                <p v-if="errors.firstName" id="first-name-error" class="mt-1 text-sm text-red-700">{{ errors.firstName }}</p>
              </div>
              <div>
                <label for="talent-last-name" class="mb-2 block text-sm font-medium">Nom *</label>
                <input id="talent-last-name" v-model="talent.lastName" type="text" autocomplete="family-name" :aria-invalid="Boolean(errors.lastName)" :aria-describedby="errors.lastName ? 'last-name-error' : undefined" class="w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" />
                <p v-if="errors.lastName" id="last-name-error" class="mt-1 text-sm text-red-700">{{ errors.lastName }}</p>
              </div>
              <div>
                <label for="talent-title" class="mb-2 block text-sm font-medium">Titre d'architecte *</label>
                <input id="talent-title" v-model="talent.architectTitle" type="text" placeholder="Ex. Architecte Cloud" :aria-invalid="Boolean(errors.architectTitle)" :aria-describedby="errors.architectTitle ? 'title-error' : undefined" class="w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" />
                <p v-if="errors.architectTitle" id="title-error" class="mt-1 text-sm text-red-700">{{ errors.architectTitle }}</p>
              </div>
            </template>

            <template v-if="step === 2">
              <h2 class="font-cabinet-grotesk text-2xl font-bold">CV et expériences</h2>
              <div class="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                <label for="talent-cv" class="mb-2 block text-sm font-medium">CV (facultatif)</label>
                <input id="talent-cv" type="file" accept=".pdf,.doc,.docx" class="block w-full min-w-0 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-700 file:px-4 file:py-2 file:font-semibold file:text-white" @change="selectCv" />
                <p v-if="talent.cv" class="mt-3 break-all text-sm font-semibold">{{ talent.cv.name }} · {{ Math.round(talent.cv.size / 1024) }} Ko</p>
                <p v-if="talent.cv && !cvChosenThisVisit" class="mt-1 text-sm text-gray-600">Le fichier lui-même n'est plus sélectionné après un rechargement.</p>
                <button v-if="talent.cv" type="button" class="mt-2 text-sm font-semibold text-indigo-700 underline" @click="removeCv">Retirer les métadonnées du CV</button>
                <p class="mt-3 text-sm text-gray-600">Aucun fichier n'est téléversé ou analysé ; seuls son nom et sa taille sont conservés localement.</p>
              </div>
              <div>
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <h3 class="font-cabinet-grotesk text-xl font-bold">Expériences *</h3>
                  <button type="button" class="rounded-lg border border-indigo-300 px-3 py-2 text-sm font-semibold text-indigo-800 hover:bg-indigo-50" @click="addExperience">Ajouter une expérience</button>
                </div>
    <p v-if="errors.experiences" id="experiences-error" role="alert" class="mt-2 text-sm text-red-700">{{ errors.experiences }}</p>
                <div v-for="(experience, index) in talent.experiences" :key="experience.id" class="mt-4 space-y-3 rounded-xl border border-gray-200 p-4">
                  <div class="flex items-center justify-between gap-3">
                    <p class="font-semibold">Expérience {{ index + 1 }}</p>
                    <button type="button" class="text-sm font-semibold text-red-700 underline" :aria-label="`Supprimer l'expérience ${index + 1}`" @click="removeExperience(index)">Supprimer</button>
                  </div>
                  <label :for="`experience-title-${experience.id}`" class="block text-sm font-medium">Intitulé *</label>
                  <input :id="`experience-title-${experience.id}`" v-model="experience.title" type="text" :aria-invalid="Boolean(errors[`experience-${experience.id}`])" :aria-describedby="errors[`experience-${experience.id}`] ? `experience-error-${experience.id}` : undefined" class="w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" />
                  <p v-if="errors[`experience-${experience.id}`]" :id="`experience-error-${experience.id}`" class="text-sm text-red-700">{{ errors[`experience-${experience.id}`] }}</p>
                  <label :for="`experience-description-${experience.id}`" class="block text-sm font-medium">Description (facultative)</label>
                  <textarea :id="`experience-description-${experience.id}`" v-model="experience.description" rows="3" class="w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" />
                </div>
              </div>
            </template>

            <template v-if="step === 3">
              <h2 class="font-cabinet-grotesk text-2xl font-bold">Expertises et préférences</h2>
              <fieldset>
                <legend class="mb-3 text-sm font-medium">Expertises * (plusieurs choix possibles)</legend>
                <div class="grid gap-3 sm:grid-cols-2">
                  <label v-for="option in expertiseOptions" :key="option.value" class="flex cursor-pointer items-center gap-3 rounded-xl border border-indigo-100 p-4 text-sm font-medium hover:bg-indigo-50">
                    <input type="checkbox" :checked="talent.expertise.includes(option.value)" :aria-invalid="Boolean(errors.expertise)" :aria-describedby="errors.expertise ? 'expertise-error' : undefined" class="rounded border-gray-300 text-indigo-700 focus:ring-indigo-600" @change="toggleExpertise(option.value)" />
                    {{ option.label }}
                  </label>
                </div>
                <p v-if="errors.expertise" id="expertise-error" class="mt-2 text-sm text-red-700">{{ errors.expertise }}</p>
              </fieldset>
              <div>
                <label for="talent-rate" class="mb-2 block text-sm font-medium">TJM souhaité (€ / jour) *</label>
                <input id="talent-rate" v-model="talent.dailyRate" type="number" min="1" step="1" inputmode="numeric" :aria-invalid="Boolean(errors.dailyRate)" :aria-describedby="errors.dailyRate ? 'rate-error' : undefined" class="w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" />
                <p v-if="errors.dailyRate" id="rate-error" class="mt-1 text-sm text-red-700">{{ errors.dailyRate }}</p>
              </div>
              <div>
                <label for="talent-remote" class="mb-2 block text-sm font-medium">Télétravail *</label>
                <select id="talent-remote" v-model="talent.remotePreference" :aria-invalid="Boolean(errors.remotePreference)" :aria-describedby="errors.remotePreference ? 'remote-error' : undefined" class="w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600">
                  <option value="">Choisir une préférence</option>
                  <option v-for="(label, value) in remoteLabels" :key="value" :value="value">{{ label }}</option>
                </select>
                <p v-if="errors.remotePreference" id="remote-error" class="mt-1 text-sm text-red-700">{{ errors.remotePreference }}</p>
              </div>
              <div>
                <label for="talent-location" class="mb-2 block text-sm font-medium">Localisation *</label>
                <input id="talent-location" v-model="talent.location" type="text" placeholder="Ville ou région" :aria-invalid="Boolean(errors.location)" :aria-describedby="errors.location ? 'location-error' : undefined" class="w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" />
                <p v-if="errors.location" id="location-error" class="mt-1 text-sm text-red-700">{{ errors.location }}</p>
              </div>
            </template>

            <template v-if="step === 4">
              <h2 class="font-cabinet-grotesk text-2xl font-bold">Disponibilité et confirmation</h2>
              <div>
                <label for="talent-availability" class="mb-2 block text-sm font-medium">Disponibilité *</label>
                <select id="talent-availability" v-model="talent.availability" :aria-invalid="Boolean(errors.availability)" :aria-describedby="errors.availability ? 'availability-error' : undefined" class="w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600">
                  <option value="">Choisir une disponibilité</option>
                  <option v-for="(label, value) in availabilityLabels" :key="value" :value="value">{{ label }}</option>
                </select>
                <p v-if="errors.availability" id="availability-error" class="mt-1 text-sm text-red-700">{{ errors.availability }}</p>
              </div>
              <div class="space-y-2 rounded-xl border border-indigo-100 bg-indigo-50 p-5 text-sm">
                <h3 class="font-cabinet-grotesk text-xl font-bold">Récapitulatif</h3>
                <p><strong>Profil :</strong> {{ talent.firstName }} {{ talent.lastName }} · {{ talent.architectTitle }}</p>
                <p><strong>Expériences :</strong> {{ talent.experiences.map((item) => item.title).join(', ') }}</p>
                <p><strong>CV :</strong> {{ talent.cv ? `${talent.cv.name} (métadonnées uniquement)` : 'Non renseigné' }}</p>
                <p><strong>Expertises :</strong> {{ talent.expertise.map((item) => expertisesByValue[item]).join(', ') }}</p>
                <p><strong>TJM :</strong> {{ talent.dailyRate }} € / jour</p>
                <p><strong>Préférences :</strong> {{ remoteLabels[talent.remotePreference] }}, {{ talent.location }}</p>
                <p><strong>Disponibilité :</strong> {{ availabilityLabels[talent.availability] || 'À renseigner' }}</p>
              </div>
              <p class="text-sm text-gray-600">Terminer enregistre uniquement ce profil de démonstration. Cela ne constitue pas une qualification Wenovat.</p>
            </template>

            <p v-if="notice" role="status" aria-live="polite" class="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{{ notice }}</p>
            <div class="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-6">
              <button v-if="step > 1" type="button" class="rounded-lg px-3 py-2 text-sm font-semibold text-indigo-800 underline underline-offset-4 hover:bg-indigo-50" @click="previous">← Précédent</button>
              <button v-else type="button" class="rounded-lg px-3 py-2 text-sm font-semibold text-indigo-800 underline underline-offset-4 hover:bg-indigo-50" @click="saveAndLeave">Enregistrer et quitter</button>
              <button type="submit" class="rounded-lg bg-gray-900 px-5 py-3 font-cabinet-grotesk font-bold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{ step === 4 ? 'Terminer et revenir à mon espace' : 'Suivant →' }}</button>
            </div>
            <button v-if="step > 1" type="button" class="text-sm font-medium text-indigo-800 underline" @click="saveAndLeave">Enregistrer et quitter</button>
          </form>
          <p class="mt-5 text-xs text-gray-600">{{ persisted ? 'Brouillon enregistré sur cet appareil.' : 'Sauvegarde locale indisponible : brouillon conservé uniquement pendant cette visite.' }}</p>
        </div>
      </div>
      <aside class="hidden border-l border-indigo-100 bg-linear-to-br from-indigo-100 via-white to-indigo-50 px-10 py-16 lg:flex lg:flex-col lg:justify-center" aria-label="Informations sur le parcours">
        <div class="mx-auto max-w-xs">
          <p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Wenovat · Architectes IT</p>
          <h2 class="mt-5 font-cabinet-grotesk text-4xl font-bold leading-tight">Votre parcours, à votre rythme.</h2>
          <p class="mt-6 text-gray-700">Renseignez vos expériences et vos préférences pour préparer votre profil. Vous pouvez interrompre ce parcours et le reprendre plus tard sur cet appareil.</p>
          <div class="mt-10 h-1 w-16 rounded-full bg-indigo-700" aria-hidden="true" />
          <p class="mt-5 text-sm font-medium text-indigo-900">Aucune analyse de CV ni décision de qualification automatique.</p>
        </div>
      </aside>
    </div>
  </section>
</template>
