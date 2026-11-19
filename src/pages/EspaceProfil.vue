<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { getMockSession } from '../services/authService.js'
import { getMockTalent, saveMockTalent } from '../services/talentService.js'
import { expertiseOptions } from '../mocks/talents.js'

const session = getMockSession()
const talent = ref(getMockTalent(session))
const draft = ref(null)
const technologiesInput = ref('')
const errors = ref({})
const notice = ref('')
const cvChosenThisVisit = ref(false)
const remoteLabels = { ON_SITE: 'Sur site', HYBRID: 'Hybride', REMOTE: 'À distance' }
const availabilityLabels = { IMMEDIATE: 'Immédiate', WITHIN_MONTH: 'Sous un mois', LATER: 'Plus tard' }
const qualificationLabels = {
  NOT_EVALUATED: 'Non évaluée',
  SELECTED_FOR_REVIEW: 'Sélectionné pour examen',
  INTERVIEW_SCHEDULED: 'Entretien planifié',
  QUALIFIED: 'Qualifié Wenovat',
  NOT_QUALIFIED: 'Non qualifié',
}
const expertiseLabels = Object.fromEntries(expertiseOptions.map(({ value, label }) => [value, label]))
const name = computed(() => [talent.value?.firstName, talent.value?.lastName].filter(Boolean).join(' ') || 'Nom à renseigner')
const initials = computed(() => [talent.value?.firstName, talent.value?.lastName].filter(Boolean).map((value) => value[0].toUpperCase()).join('') || 'IT')
const linkedinHref = computed(() => validLinkedin(talent.value?.linkedinUrl) ? talent.value.linkedinUrl : '')

onMounted(() => { talent.value = getMockTalent(session) })

function validLinkedin(value) {
  if (!value) return false
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && (url.hostname === 'linkedin.com' || url.hostname.endsWith('.linkedin.com'))
  } catch {
    return false
  }
}

function edit() {
  talent.value = getMockTalent(session)
  draft.value = structuredClone(talent.value)
  technologiesInput.value = draft.value.technologies.join(', ')
  errors.value = {}
  notice.value = ''
  cvChosenThisVisit.value = false
}

function cancel() {
  draft.value = null
  errors.value = {}
  notice.value = ''
}

function toggleExpertise(value) {
  draft.value.expertise = draft.value.expertise.includes(value)
    ? draft.value.expertise.filter((item) => item !== value)
    : [...draft.value.expertise, value]
}

function addExperience() {
  draft.value.experiences.push({ id: `experience-${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`}`, title: '', description: '', startDate: '', endDate: '' })
}

function selectCv(event) {
  const file = event.target.files?.[0]
  if (!file) return
  draft.value.cv = { name: file.name, size: file.size }
  cvChosenThisVisit.value = true
  event.target.value = ''
}

async function save() {
  const next = {}
  if (!draft.value.firstName.trim()) next.firstName = 'Saisissez votre prénom.'
  if (!draft.value.lastName.trim()) next.lastName = 'Saisissez votre nom.'
  if (!draft.value.architectTitle.trim()) next.architectTitle = "Saisissez votre titre d'architecte."
  if (!draft.value.expertise.length) next.expertise = 'Choisissez au moins une expertise.'
  if (!draft.value.experiences.length) next.experiences = 'Ajoutez au moins une expérience.'
  draft.value.experiences.forEach((experience) => {
    if (!experience.title.trim()) next[`title-${experience.id}`] = 'Renseignez votre rôle.'
    if (experience.startDate && !/^\d{4}-(0[1-9]|1[0-2])$/.test(experience.startDate)) next[`start-${experience.id}`] = 'Indiquez un mois de début valide.'
    if (experience.endDate && !/^\d{4}-(0[1-9]|1[0-2])$/.test(experience.endDate)) next[`end-${experience.id}`] = 'Indiquez un mois de fin valide.'
    if (experience.endDate && !experience.startDate) next[`start-${experience.id}`] = 'Indiquez le mois de début avant le mois de fin.'
    if (experience.startDate && experience.endDate && experience.endDate < experience.startDate) next[`end-${experience.id}`] = 'La fin doit suivre le début.'
  })
  if (draft.value.dailyRate !== '' && (!Number.isFinite(Number(draft.value.dailyRate)) || Number(draft.value.dailyRate) <= 0)) next.dailyRate = 'Indiquez un TJM supérieur à zéro.'
  if (draft.value.linkedinUrl && !validLinkedin(draft.value.linkedinUrl.trim())) next.linkedinUrl = 'Indiquez une URL LinkedIn sécurisée (https://linkedin.com/…).'
  errors.value = next
  if (Object.keys(next).length) {
    notice.value = 'Corrigez les champs signalés avant de sauvegarder.'
    await nextTick()
    document.querySelector('[aria-invalid="true"]')?.focus()
    return
  }
  try {
    const technologies = [...new Set(technologiesInput.value.split(/[,\n;]/).map((entry) => entry.trim()).filter(Boolean))]
    const { persisted } = saveMockTalent({ ...draft.value, technologies })
    talent.value = getMockTalent(session)
    draft.value = null
    notice.value = persisted
      ? 'Profil de démonstration enregistré sur cet appareil.'
      : 'Profil conservé uniquement pendant cette visite : le stockage local est indisponible.'
  } catch {
    notice.value = 'Enregistrement impossible. Réessayez après avoir vérifié vos informations.'
  }
}

function period(experience) {
  if (!experience.startDate && !experience.endDate) return 'Dates à renseigner'
  return `${experience.startDate || 'Début à renseigner'} — ${experience.endDate || 'Aujourd’hui'}`
}
</script>

<template>
  <section v-if="!talent" class="rounded-2xl border border-indigo-100 bg-white p-8">
    <h1 class="font-cabinet-grotesk text-3xl font-bold">Mon profil</h1>
    <p class="mt-3">Ce profil est réservé aux comptes freelances de démonstration.</p>
    <router-link to="/espace" class="mt-4 inline-block font-semibold text-indigo-700 underline">Retour à mon espace</router-link>
  </section>
  <article v-else class="rounded-xl border border-gray-200 bg-white font-aspekta text-gray-900 shadow-sm">
    <div class="relative h-24 overflow-hidden rounded-t-xl bg-linear-to-r from-indigo-950 via-indigo-800 to-violet-500 sm:h-28" aria-hidden="true">
      <div class="absolute -right-12 -top-32 h-72 w-72 rounded-full border border-white/20" />
      <div class="absolute right-28 -top-20 h-64 w-64 rounded-full border border-white/10" />
      <div class="absolute -bottom-18 left-1/4 h-28 w-96 rotate-[-12deg] rounded-full bg-white/10 blur-2xl" />
    </div>

    <div class="px-5 pb-10 sm:px-7 lg:px-8">
      <header>
        <div class="-mt-9 flex flex-wrap items-end justify-between gap-x-4 gap-y-3 sm:-mt-11">
          <span class="relative ml-3 flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white bg-indigo-100 font-cabinet-grotesk text-2xl font-bold text-indigo-900 shadow-sm sm:ml-5 sm:h-24 sm:w-24" aria-label="Avatar à initiales">{{ initials }}</span>
          <button v-if="!draft" type="button" class="inline-flex min-h-10 items-center rounded-lg bg-indigo-700 px-4 text-sm font-semibold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="edit">Modifier mon profil</button>
        </div>
        <p class="mt-4 text-xs font-bold uppercase tracking-wider text-indigo-700">Mon profil · démonstration</p>
        <h1 class="mt-1 font-cabinet-grotesk text-2xl font-bold sm:text-3xl">{{ name }}</h1>
        <p class="mt-1 text-sm text-gray-600">{{ talent.architectTitle || 'Titre d’architecte à renseigner' }}</p>
        <div class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
          <span class="inline-flex items-center gap-1.5"><svg class="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>{{ talent.location || 'Localisation à renseigner' }}</span>
          <span>Origine : <strong class="font-semibold text-gray-800">Wenovat</strong></span>
          <span class="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">{{ qualificationLabels[talent.qualificationStatus] || 'Non évaluée' }}</span>
        </div>
        <p class="mt-3 text-xs text-gray-500">Ces informations restent dans votre navigateur et ne constituent pas une qualification Wenovat.</p>
      </header>

      <div class="mt-6 border-b border-gray-300" aria-hidden="true" />
      <p v-if="notice" role="status" aria-live="polite" class="mt-5 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-900">{{ notice }}</p>

      <div v-if="!draft" class="grid gap-x-10 gap-y-9 pt-6 lg:grid-cols-[minmax(0,1fr)_14rem] xl:gap-x-14">
        <div class="min-w-0 space-y-9">
          <section>
            <h2 class="font-cabinet-grotesk text-base font-bold">Résumé professionnel</h2>
            <p class="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-600">{{ talent.professionalSummary || 'Résumé professionnel à renseigner.' }}</p>
          </section>
          <section>
            <h2 class="font-cabinet-grotesk text-base font-bold">Compétences</h2>
            <div class="mt-3 grid gap-5 sm:grid-cols-2">
              <div class="border-l-2 border-indigo-400 pl-4">
                <h3 class="text-xs font-bold uppercase tracking-wide text-gray-500">Domaines d’architecture</h3>
                <ul v-if="talent.expertise.length" class="mt-3 space-y-2 text-sm font-medium text-gray-800">
                  <li v-for="item in talent.expertise" :key="item" class="flex items-start gap-2"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden="true" />{{ expertiseLabels[item] }}</li>
                </ul>
                <p v-else class="mt-3 text-sm text-gray-600">Domaines à renseigner : Cloud, Data, IA, Cyber ou Architecture d’entreprise.</p>
              </div>
              <div class="border-l-2 border-gray-200 pl-4">
                <h3 class="text-xs font-bold uppercase tracking-wide text-gray-500">Technologies</h3>
                <ul v-if="talent.technologies.length" class="mt-3 space-y-2 text-sm text-gray-700">
                  <li v-for="technology in talent.technologies" :key="technology" class="flex items-start gap-2"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" aria-hidden="true" />{{ technology }}</li>
                </ul>
                <p v-else class="mt-3 text-sm text-gray-600">Technologies à renseigner.</p>
              </div>
            </div>
          </section>
          <section>
            <h2 class="font-cabinet-grotesk text-base font-bold">Parcours professionnel</h2>
            <ol v-if="talent.experiences.some((entry) => entry.title || entry.description || entry.startDate || entry.endDate)" class="mt-3 divide-y divide-gray-100 rounded-lg border border-gray-200 px-4 shadow-sm">
              <li v-for="experience in talent.experiences.filter((entry) => entry.title || entry.description || entry.startDate || entry.endDate)" :key="experience.id" class="flex gap-3 py-4">
                <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700" aria-hidden="true"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17 9 11l4 4 8-8" /></svg></span>
                <div class="min-w-0">
                  <h3 class="text-sm font-semibold">{{ experience.title || 'Rôle à renseigner' }}</h3>
                  <p class="mt-0.5 text-xs text-gray-500">{{ period(experience) }}</p>
                  <p class="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-600">{{ experience.description || 'Mission à détailler.' }}</p>
                </div>
              </li>
            </ol>
            <p v-else class="mt-2 text-sm text-gray-600">Aucune expérience détaillée pour le moment.</p>
          </section>
        </div>

        <aside class="min-w-0 space-y-6 text-sm">
          <section>
            <h2 class="font-cabinet-grotesk text-base font-bold">Informations pratiques</h2>
            <dl class="mt-3 space-y-4">
              <div><dt class="font-semibold text-gray-800">Titre</dt><dd class="mt-0.5 text-gray-600">{{ talent.architectTitle || 'À renseigner' }}</dd></div>
              <div><dt class="font-semibold text-gray-800">Localisation</dt><dd class="mt-0.5 text-gray-600">{{ talent.location || 'À renseigner' }}</dd></div>
              <div><dt class="font-semibold text-gray-800">Disponibilité</dt><dd class="mt-0.5 text-gray-600">{{ availabilityLabels[talent.availability] || 'À renseigner' }}</dd></div>
              <div><dt class="font-semibold text-gray-800">Télétravail</dt><dd class="mt-0.5 text-gray-600">{{ remoteLabels[talent.remotePreference] || 'À renseigner' }}</dd></div>
              <div><dt class="font-semibold text-gray-800">TJM indicatif</dt><dd class="mt-0.5 text-gray-600">{{ talent.dailyRate ? `${talent.dailyRate} € / jour` : 'À renseigner' }}</dd></div>
            </dl>
          </section>
          <section class="border-t border-gray-200 pt-5">
            <h2 class="font-cabinet-grotesk text-base font-bold">CV et coordonnées</h2>
            <dl class="mt-3 space-y-4">
              <div><dt class="font-semibold text-gray-800">LinkedIn</dt><dd class="mt-0.5 break-all text-gray-600"><a v-if="linkedinHref" :href="linkedinHref" target="_blank" rel="noopener noreferrer" class="font-semibold text-indigo-700 underline">Voir mon profil LinkedIn</a><span v-else>{{ talent.linkedinUrl ? 'Lien à corriger' : 'À renseigner' }}</span></dd></div>
              <div><dt class="font-semibold text-gray-800">CV</dt><dd class="mt-0.5 break-all text-gray-600">{{ talent.cv?.name || 'À renseigner' }}<span v-if="talent.cv" class="mt-1 block text-xs text-gray-500">Nom du fichier uniquement, sans document téléversé.</span></dd></div>
            </dl>
          </section>
          <section class="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
            <h2 class="font-cabinet-grotesk text-base font-bold">Qualification Wenovat</h2>
            <p class="mt-2 font-semibold text-indigo-900">{{ qualificationLabels[talent.qualificationStatus] || 'Non évaluée' }}</p>
            <p class="mt-1 text-gray-700">Date : non renseignée.</p>
            <p class="mt-2 text-gray-700">En lecture seule. Seul un administrateur Wenovat peut décider d’une qualification ; ce profil ne donne pas automatiquement accès aux missions premium.</p>
          </section>
        </aside>
      </div>

      <form v-else novalidate class="space-y-6 pt-6" @submit.prevent="save">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div><h2 class="font-cabinet-grotesk text-2xl font-bold">Modifier mon profil</h2><p class="mt-2 text-sm text-gray-600">Les champs marqués * sont obligatoires. La qualification Wenovat ne peut pas être modifiée ici.</p></div>
        <button type="button" class="rounded-lg border border-indigo-200 px-4 py-2 font-semibold text-indigo-800 hover:bg-indigo-50" @click="cancel">Annuler</button>
      </div>
      <div class="grid gap-5 sm:grid-cols-2">
        <div><label for="profile-first" class="block text-sm font-semibold">Prénom *</label><input id="profile-first" v-model="draft.firstName" type="text" autocomplete="given-name" :aria-invalid="Boolean(errors.firstName)" class="mt-2 w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" /><p v-if="errors.firstName" class="mt-1 text-sm text-red-700">{{ errors.firstName }}</p></div>
        <div><label for="profile-last" class="block text-sm font-semibold">Nom *</label><input id="profile-last" v-model="draft.lastName" type="text" autocomplete="family-name" :aria-invalid="Boolean(errors.lastName)" class="mt-2 w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" /><p v-if="errors.lastName" class="mt-1 text-sm text-red-700">{{ errors.lastName }}</p></div>
      </div>
      <div><label for="profile-title" class="block text-sm font-semibold">Titre d’architecte *</label><input id="profile-title" v-model="draft.architectTitle" type="text" placeholder="Ex. Architecte Cloud" :aria-invalid="Boolean(errors.architectTitle)" class="mt-2 w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" /><p v-if="errors.architectTitle" class="mt-1 text-sm text-red-700">{{ errors.architectTitle }}</p></div>
      <div><label for="profile-summary" class="block text-sm font-semibold">Résumé professionnel (facultatif)</label><textarea id="profile-summary" v-model="draft.professionalSummary" rows="4" class="mt-2 w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" /></div>
      <fieldset><legend class="text-sm font-semibold">Domaines d’architecture *</legend><div class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><label v-for="option in expertiseOptions" :key="option.value" class="flex items-center gap-3 rounded-xl border border-indigo-100 p-3 text-sm"><input type="checkbox" :checked="draft.expertise.includes(option.value)" :aria-invalid="Boolean(errors.expertise)" class="rounded border-gray-300 text-indigo-700 focus:ring-indigo-600" @change="toggleExpertise(option.value)" />{{ option.label }}</label></div><p v-if="errors.expertise" class="mt-1 text-sm text-red-700">{{ errors.expertise }}</p></fieldset>
      <div><label for="profile-technologies" class="block text-sm font-semibold">Technologies (facultatif)</label><textarea id="profile-technologies" v-model="technologiesInput" rows="2" placeholder="Ex. AWS, Terraform, Kubernetes" class="mt-2 w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" /><p class="mt-1 text-xs text-gray-600">Séparez les technologies par des virgules ou des retours à la ligne.</p></div>

      <section class="border-t border-indigo-100 pt-6"><div class="flex flex-wrap items-center justify-between gap-3"><h3 class="font-cabinet-grotesk text-xl font-bold">Expériences *</h3><button type="button" class="rounded-lg border border-indigo-300 px-4 py-2 text-sm font-semibold text-indigo-800 hover:bg-indigo-50" @click="addExperience">Ajouter une expérience</button></div><p v-if="errors.experiences" class="mt-2 text-sm text-red-700">{{ errors.experiences }}</p>
        <div v-for="(experience, index) in draft.experiences" :key="experience.id" class="mt-4 space-y-4 rounded-xl border border-indigo-100 p-4 sm:p-5">
          <div class="flex items-center justify-between gap-3"><p class="font-semibold">Expérience {{ index + 1 }}</p><button type="button" class="text-sm font-semibold text-red-700 underline" :aria-label="`Supprimer l’expérience ${index + 1}`" @click="draft.experiences.splice(index, 1)">Supprimer</button></div>
          <div><label :for="`role-${experience.id}`" class="block text-sm font-semibold">Rôle *</label><input :id="`role-${experience.id}`" v-model="experience.title" type="text" placeholder="Ex. Architecte solutions" :aria-invalid="Boolean(errors[`title-${experience.id}`])" class="mt-2 w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" /><p v-if="errors[`title-${experience.id}`]" class="mt-1 text-sm text-red-700">{{ errors[`title-${experience.id}`] }}</p></div>
          <div class="grid gap-4 sm:grid-cols-2"><div><label :for="`start-${experience.id}`" class="block text-sm font-semibold">Début (facultatif)</label><input :id="`start-${experience.id}`" v-model="experience.startDate" type="month" :aria-invalid="Boolean(errors[`start-${experience.id}`])" class="mt-2 w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" /><p v-if="errors[`start-${experience.id}`]" class="mt-1 text-sm text-red-700">{{ errors[`start-${experience.id}`] }}</p></div><div><label :for="`end-${experience.id}`" class="block text-sm font-semibold">Fin (facultatif, vide si en cours)</label><input :id="`end-${experience.id}`" v-model="experience.endDate" type="month" :aria-invalid="Boolean(errors[`end-${experience.id}`])" class="mt-2 w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" /><p v-if="errors[`end-${experience.id}`]" class="mt-1 text-sm text-red-700">{{ errors[`end-${experience.id}`] }}</p></div></div>
          <div><label :for="`mission-${experience.id}`" class="block text-sm font-semibold">Mission et réalisations (facultatif)</label><textarea :id="`mission-${experience.id}`" v-model="experience.description" rows="3" class="mt-2 w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" /></div>
        </div>
      </section>

      <div class="grid gap-5 border-t border-indigo-100 pt-6 sm:grid-cols-2">
        <div><label for="profile-location" class="block text-sm font-semibold">Localisation (facultatif)</label><input id="profile-location" v-model="draft.location" type="text" class="mt-2 w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" /></div>
        <div><label for="profile-remote" class="block text-sm font-semibold">Télétravail (facultatif)</label><select id="profile-remote" v-model="draft.remotePreference" class="mt-2 w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600"><option value="">À renseigner</option><option v-for="(label, value) in remoteLabels" :key="value" :value="value">{{ label }}</option></select></div>
        <div><label for="profile-rate" class="block text-sm font-semibold">TJM indicatif (€ / jour, facultatif)</label><input id="profile-rate" v-model="draft.dailyRate" type="number" min="1" step="1" inputmode="numeric" :aria-invalid="Boolean(errors.dailyRate)" class="mt-2 w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" /><p v-if="errors.dailyRate" class="mt-1 text-sm text-red-700">{{ errors.dailyRate }}</p></div>
        <div><label for="profile-availability" class="block text-sm font-semibold">Disponibilité (facultatif)</label><select id="profile-availability" v-model="draft.availability" class="mt-2 w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600"><option value="">À renseigner</option><option v-for="(label, value) in availabilityLabels" :key="value" :value="value">{{ label }}</option></select></div>
      </div>
      <div><label for="profile-linkedin" class="block text-sm font-semibold">Lien LinkedIn (facultatif)</label><input id="profile-linkedin" v-model="draft.linkedinUrl" type="url" inputmode="url" placeholder="https://www.linkedin.com/in/…" :aria-invalid="Boolean(errors.linkedinUrl)" class="mt-2 w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" /><p v-if="errors.linkedinUrl" class="mt-1 text-sm text-red-700">{{ errors.linkedinUrl }}</p></div>
      <div class="rounded-xl bg-indigo-50 p-4"><label for="profile-cv" class="block text-sm font-semibold">CV (facultatif)</label><input id="profile-cv" type="file" accept=".pdf,.doc,.docx" class="mt-2 block w-full min-w-0 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-700 file:px-4 file:py-2 file:text-white" @change="selectCv" /><p v-if="draft.cv" class="mt-3 break-all text-sm font-semibold">{{ draft.cv.name }} <span v-if="cvChosenThisVisit">(sélectionné pendant cette visite)</span></p><button v-if="draft.cv" type="button" class="mt-2 text-sm font-semibold text-indigo-700 underline" @click="draft.cv = null">Retirer le nom du CV</button><p class="mt-2 text-xs text-gray-600">Seuls le nom et la taille du fichier sont conservés localement. Le document n’est pas téléversé ni consultable.</p></div>
      <div class="flex flex-wrap justify-end gap-3 border-t border-indigo-100 pt-6"><button type="button" class="rounded-lg border border-indigo-200 px-5 py-3 font-semibold text-indigo-800 hover:bg-indigo-50" @click="cancel">Annuler</button><button type="submit" class="rounded-lg bg-indigo-700 px-5 py-3 font-semibold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Enregistrer mon profil</button></div>
      </form>
    </div>
  </article>
</template>
