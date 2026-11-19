<script setup>
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { expertiseOptions } from '../mocks/talents.js'
import { getMockSession } from '../services/authService.js'
import { getMockAdminTalentById } from '../services/talentService.js'
import { decideMockAdminQualification, getMockAdminQualification } from '../services/qualificationService.js'

const route = useRoute()
const session = getMockSession()
const talent = ref(null)
const history = ref([])
const pending = ref(null)
const reason = ref('')
const error = ref('')
const notice = ref('')
const reasonInput = ref(null)
const dialog = ref(null)
let trigger = null

const expertiseLabels = Object.fromEntries(expertiseOptions.map(({ value, label }) => [value, label]))
const qualificationLabels = { NOT_EVALUATED: 'Non évalué', SELECTED_FOR_REVIEW: 'Sélectionné pour revue', INTERVIEW_SCHEDULED: 'Entretien planifié', QUALIFIED: 'Qualifié Wenovat', NOT_QUALIFIED: 'Non qualifié' }
const qualificationStyles = { NOT_EVALUATED: 'bg-gray-100 text-gray-700', SELECTED_FOR_REVIEW: 'bg-sky-100 text-sky-800', INTERVIEW_SCHEDULED: 'bg-amber-100 text-amber-900', QUALIFIED: 'bg-emerald-100 text-emerald-800', NOT_QUALIFIED: 'bg-rose-100 text-rose-800' }
const availabilityLabels = { IMMEDIATE: 'Immédiate', WITHIN_MONTH: 'Sous un mois', LATER: 'Plus tard' }
const remoteLabels = { ON_SITE: 'Sur site', HYBRID: 'Hybride', REMOTE: 'À distance' }
const actions = [
  { status: 'SELECTED_FOR_REVIEW', label: 'Sélectionner pour revue' },
  { status: 'INTERVIEW_SCHEDULED', label: 'Programmer entretien' },
  { status: 'QUALIFIED', label: 'Qualifier' },
  { status: 'NOT_QUALIFIED', label: 'Non qualifier' },
  { status: 'NOT_EVALUATED', label: 'Réévaluer' },
]
const money = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeStyle: 'short' })
const premiumEligible = computed(() => talent.value?.source === 'WENOVAT' && talent.value.qualificationStatus === 'QUALIFIED')
const originLabels = { PROFESSIONAL_NETWORK: 'Réseau professionnel', AUTHORIZED_SEARCH: 'Recherche autorisée', REFERRAL: 'Recommandation', OTHER: 'Autre canal autorisé' }
const contactLabels = { NOT_CONTACTED: 'Non contacté', CONTACTED: 'Contacté manuellement', DO_NOT_CONTACT: 'Ne pas contacter' }
const initials = computed(() => [talent.value?.firstName, talent.value?.lastName].filter(Boolean).map((part) => part[0]?.toUpperCase()).join(''))

function reload() {
  talent.value = getMockAdminTalentById(route.params.id)
  history.value = getMockAdminQualification(route.params.id)?.history ?? []
}

watch(() => route.params.id, () => { closeDialog(); notice.value = ''; reload() }, { immediate: true })
onUnmounted(() => { document.body.style.overflow = '' })

function period(experience) {
  return experience.startDate ? `${experience.startDate} · ${experience.endDate || 'Aujourd’hui'}` : 'Dates non renseignées'
}

function openDialog(action, event) {
  trigger = event.currentTarget
  pending.value = action
  reason.value = ''
  error.value = ''
  document.body.style.overflow = 'hidden'
  nextTick(() => reasonInput.value?.focus())
}

function closeDialog() {
  pending.value = null
  error.value = ''
  document.body.style.overflow = ''
  nextTick(() => trigger?.focus())
}

function onDialogKeydown(event) {
  if (event.key === 'Escape') { closeDialog(); return }
  if (event.key !== 'Tab') return
  const focusable = [...(dialog.value?.querySelectorAll('button, textarea') ?? [])]
  if (!focusable.length) return
  const first = focusable[0]
  const last = focusable.at(-1)
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
}

function confirm() {
  if (!reason.value.trim()) {
    error.value = 'Renseignez un motif pour confirmer cette décision.'
    nextTick(() => reasonInput.value?.focus())
    return
  }
  try {
    const { persisted } = decideMockAdminQualification(route.params.id, pending.value.status, reason.value, getMockSession())
    reload()
    notice.value = persisted
      ? 'Décision simulée enregistrée sur cet appareil et ajoutée à l’historique.'
      : 'Décision simulée ajoutée à l’historique pour cette visite uniquement : stockage local indisponible.'
    closeDialog()
  } catch (cause) {
    error.value = cause.message
  }
}
</script>

<template>
  <div class="font-aspekta text-gray-900">
    <router-link to="/admin/talents" class="mb-4 inline-flex min-h-10 items-center text-sm font-semibold text-indigo-700 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-indigo-600">← Retour à la liste des talents</router-link>

    <section v-if="!talent" class="rounded-2xl border border-indigo-100 bg-white p-7 shadow-sm sm:p-10">
      <p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Administration · données fictives</p>
      <h1 class="mt-3 font-cabinet-grotesk text-3xl font-bold">Talent introuvable</h1>
      <p class="mt-3 text-gray-600">Aucun profil de démonstration ne correspond à cet identifiant.</p>
    </section>

    <article v-else class="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div class="relative h-24 overflow-hidden rounded-t-xl bg-linear-to-r from-indigo-950 via-indigo-800 to-violet-500 sm:h-28" aria-hidden="true">
        <div class="absolute -right-12 -top-32 h-72 w-72 rounded-full border border-white/20" />
        <div class="absolute right-28 -top-20 h-64 w-64 rounded-full border border-white/10" />
        <div class="absolute -bottom-18 left-1/4 h-28 w-96 rotate-[-12deg] rounded-full bg-white/10 blur-2xl" />
      </div>

      <div class="px-5 pb-10 sm:px-7 lg:px-8">
        <header>
          <div class="-mt-9 flex flex-wrap items-end justify-between gap-x-4 gap-y-3 sm:-mt-11">
            <span class="relative ml-3 flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white bg-indigo-100 font-cabinet-grotesk text-2xl font-bold text-indigo-900 shadow-sm sm:ml-5 sm:h-24 sm:w-24" aria-label="Avatar à initiales">{{ initials }}</span>
            <a href="#qualification" class="inline-flex min-h-10 items-center rounded-lg border border-indigo-200 px-3 text-sm font-semibold text-indigo-800 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Gérer la qualification ↓</a>
          </div>
          <p class="mt-4 text-xs font-bold uppercase tracking-wider text-indigo-700">Données fictives — mode démo</p>
          <h1 class="mt-1 font-cabinet-grotesk text-2xl font-bold sm:text-3xl">{{ talent.firstName }} {{ talent.lastName }}</h1>
          <p class="mt-1 text-sm text-gray-600">{{ talent.architectTitle }}</p>
          <div class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
            <span class="inline-flex items-center gap-1.5"><svg class="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>{{ talent.location || 'Localisation non renseignée' }}</span>
            <span>Origine : <strong class="font-semibold text-gray-800">{{ talent.source === 'WENOVAT' ? 'Wenovat' : 'Externe' }}</strong></span>
            <span class="rounded-full px-2.5 py-1 text-xs font-semibold" :class="qualificationStyles[talent.qualificationStatus]">{{ qualificationLabels[talent.qualificationStatus] }}</span>
          </div>
          <p class="mt-3 text-xs text-gray-500">{{ talent.profileStatus === 'SOURCED' ? 'Profil sourcé, non membre : aucun compte créé. Le contact manuel n’ouvre aucun accès au portail.' : 'Exemple de démonstration : aucun compte ou profil réel associé.' }}</p>
        </header>

        <div class="mt-6 border-b border-gray-300" aria-hidden="true" />

        <p v-if="notice" role="status" aria-live="polite" class="mt-5 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-900">{{ notice }}</p>
        <p v-if="route.query.created === 'saved' || route.query.created === 'memory'" role="status" aria-live="polite" class="mt-5 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-900">{{ route.query.created === 'saved' ? 'Profil externe fictif enregistré dans ce navigateur. Aucune invitation ou transmission de CV effectuée.' : 'Profil externe fictif disponible pour cette visite seulement : stockage local indisponible. Aucune invitation ou transmission de CV effectuée.' }}</p>

        <div class="grid gap-x-10 gap-y-9 pt-6 lg:grid-cols-[minmax(0,1fr)_14rem] xl:gap-x-14">
          <div class="min-w-0 space-y-9">
            <section v-if="talent.profileStatus === 'SOURCED'" class="rounded-lg border border-violet-200 bg-violet-50 p-4">
              <h2 class="font-cabinet-grotesk text-base font-bold">Sourcing externe</h2>
              <dl class="mt-3 space-y-2 text-sm text-gray-700">
                <div><dt class="font-semibold">Profil</dt><dd>Sourcé, non membre enregistré</dd></div>
                <div><dt class="font-semibold">Canal d’origine</dt><dd>{{ originLabels[talent.originChannel] }}{{ talent.originDetails ? ` · ${talent.originDetails}` : '' }}</dd></div>
                <div><dt class="font-semibold">État du contact</dt><dd>{{ contactLabels[talent.contactStatus] }}</dd></div>
                <div><dt class="font-semibold">Permission email fictif</dt><dd>{{ talent.contactAuthorizationStatus === 'DEMO_AUTHORIZED' ? 'Autorisation déclarée pour la démo' : 'Non confirmée' }}</dd></div>
                <div><dt class="font-semibold">Notes de contact</dt><dd class="whitespace-pre-line break-words">{{ talent.contactNotes || 'Aucune note.' }}</dd></div>
              </dl>
            </section>
            <section>
              <h2 class="font-cabinet-grotesk text-base font-bold">Résumé professionnel</h2>
              <p class="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-600">{{ talent.professionalSummary || 'Non renseigné.' }}</p>
            </section>

            <section>
              <h2 class="font-cabinet-grotesk text-base font-bold">Compétences</h2>
              <div class="mt-3 grid gap-5 sm:grid-cols-2">
                <div class="border-l-2 border-indigo-400 pl-4">
                  <h3 class="text-xs font-bold uppercase tracking-wide text-gray-500">Domaines d’architecture</h3>
                  <ul v-if="talent.expertise?.length" class="mt-3 space-y-2 text-sm font-medium text-gray-800">
                    <li v-for="item in talent.expertise" :key="item" class="flex items-start gap-2"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden="true" />{{ expertiseLabels[item] }}</li>
                  </ul>
                  <p v-else class="mt-3 text-sm text-gray-600">Non renseigné.</p>
                </div>
                <div class="border-l-2 border-gray-200 pl-4">
                  <h3 class="text-xs font-bold uppercase tracking-wide text-gray-500">Technologies</h3>
                  <ul v-if="talent.technologies?.length" class="mt-3 space-y-2 text-sm text-gray-700">
                    <li v-for="item in talent.technologies" :key="item" class="flex items-start gap-2"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" aria-hidden="true" />{{ item }}</li>
                  </ul>
                  <p v-else class="mt-3 text-sm text-gray-600">Non renseigné.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 class="font-cabinet-grotesk text-base font-bold">Parcours professionnel</h2>
              <ol v-if="talent.experiences?.length" class="mt-3 divide-y divide-gray-100 rounded-lg border border-gray-200 px-4 shadow-sm">
                <li v-for="experience in talent.experiences" :key="experience.id" class="flex gap-3 py-4">
                  <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700" aria-hidden="true"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17 9 11l4 4 8-8" /></svg></span>
                  <div class="min-w-0">
                    <h3 class="text-sm font-semibold">{{ experience.title }}</h3>
                    <p class="mt-0.5 text-xs text-gray-500">{{ period(experience) }}</p>
                    <p class="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-600">{{ experience.description || 'Détails non renseignés.' }}</p>
                  </div>
                </li>
              </ol>
              <p v-else class="mt-2 text-sm text-gray-600">Aucune expérience renseignée.</p>
            </section>

            <section id="qualification" class="scroll-mt-24 border-t border-gray-200 pt-7" aria-labelledby="qualification-title">
              <h2 id="qualification-title" class="font-cabinet-grotesk text-base font-bold">Qualification Wenovat</h2>
              <p class="mt-2 text-sm text-gray-600">Décision exclusivement administrateur, simulée dans ce navigateur. Une qualification ne change pas l’origine du talent.</p>
              <p class="mt-3 text-sm font-semibold">Statut actuel : {{ qualificationLabels[talent.qualificationStatus] }}</p>
              <div v-if="session?.role === 'ADMIN'" class="mt-4 flex flex-wrap gap-2">
                <button v-for="action in actions.filter((item) => item.status !== talent.qualificationStatus)" :key="action.status" type="button" class="min-h-11 rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-800 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="openDialog(action, $event)">{{ action.label }}</button>
              </div>
              <p v-else class="mt-3 text-sm text-gray-600">Actions indisponibles hors session administrateur de démonstration.</p>
            </section>

            <section id="historique" class="scroll-mt-24 border-t border-gray-200 pt-7">
              <h2 class="font-cabinet-grotesk text-base font-bold">Historique des décisions simulées</h2>
              <ol v-if="history.length" class="mt-3 divide-y divide-gray-100 rounded-lg border border-gray-200 px-4 shadow-sm">
                <li v-for="event in history" :key="event.id" class="py-4 text-sm">
                  <p class="font-semibold text-gray-900">{{ qualificationLabels[event.previousStatus] }} → {{ qualificationLabels[event.nextStatus] }}</p>
                  <p class="mt-1 text-xs text-gray-500">{{ dateFormat.format(new Date(event.date)) }} · {{ event.author }}</p>
                  <p class="mt-2 whitespace-pre-line break-words text-gray-700"><strong>Motif :</strong> {{ event.reason }}</p>
                </li>
              </ol>
              <p v-else class="mt-2 text-sm text-gray-600">Aucune décision enregistrée dans cette maquette. Le statut initial est une donnée d’exemple, pas une décision historisée.</p>
            </section>
          </div>

          <aside class="min-w-0 space-y-6 text-sm">
            <section>
              <h2 class="font-cabinet-grotesk text-base font-bold">Informations pratiques</h2>
              <dl class="mt-3 space-y-4">
                <div><dt class="font-semibold text-gray-800">Titre</dt><dd class="mt-0.5 text-gray-600">{{ talent.architectTitle }}</dd></div>
                <div><dt class="font-semibold text-gray-800">Localisation</dt><dd class="mt-0.5 text-gray-600">{{ talent.location || 'Non renseignée' }}</dd></div>
                <div><dt class="font-semibold text-gray-800">Disponibilité</dt><dd class="mt-0.5 text-gray-600">{{ availabilityLabels[talent.availability] || 'Non renseignée' }}</dd></div>
                <div><dt class="font-semibold text-gray-800">Télétravail</dt><dd class="mt-0.5 text-gray-600">{{ remoteLabels[talent.remotePreference] || 'Non renseigné' }}</dd></div>
                <div><dt class="font-semibold text-gray-800">TJM indicatif fictif</dt><dd class="mt-0.5 text-gray-600">{{ talent.dailyRate == null ? 'Non renseigné' : `${money.format(talent.dailyRate)} / jour` }}</dd></div>
              </dl>
            </section>
            <section class="border-t border-gray-200 pt-5">
              <h2 class="font-cabinet-grotesk text-base font-bold">CV et coordonnées</h2>
              <template v-if="session?.role === 'ADMIN'">
                <dl class="mt-3 space-y-4">
                  <div><dt class="font-semibold text-gray-800">Courriel</dt><dd class="mt-0.5 break-all text-gray-600">{{ talent.profileStatus === 'SOURCED' && !talent.emailAuthorized ? 'Non autorisé / non renseigné' : talent.contact?.email || 'Non renseigné' }}</dd></div>
                  <div><dt class="font-semibold text-gray-800">CV</dt><dd class="mt-0.5 break-all text-gray-600">{{ talent.cv?.name || 'Non renseigné' }}</dd></div>
                </dl>
                <p v-if="talent.cv" class="mt-2 text-xs text-gray-500">Nom fictif uniquement : aucun fichier à télécharger.</p>
              </template>
              <p v-else class="mt-2 text-gray-600">Données réservées à l’administrateur de démonstration.</p>
            </section>
            <section class="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
              <h2 class="font-cabinet-grotesk text-base font-bold">Accès portail premium</h2>
              <p class="mt-2 font-semibold text-indigo-900">{{ premiumEligible ? 'Éligible dans la maquette' : 'Non éligible' }}</p>
              <p class="mt-1 text-gray-700">{{ premiumEligible ? 'Origine Wenovat et qualification simulée réunies.' : 'Accès réservé aux membres Wenovat qualifiés. La qualification seule ne crée pas de compte.' }}</p>
            </section>
            <section v-if="talent.source === 'EXTERNAL'" class="rounded-lg border border-violet-200 bg-violet-50 p-4">
              <h2 class="font-cabinet-grotesk text-base font-bold">Présentation externe exceptionnelle</h2>
              <p class="mt-2 text-gray-700">{{ talent.externalPresentationException?.description || 'Une présentation au cas par cas peut être envisagée, sans accès au portail premium.' }}</p>
              <p class="mt-2 font-semibold text-violet-900">Cette exception ne confère aucune qualification ni accès premium.</p>
            </section>
          </aside>
        </div>
      </div>
    </article>

    <div v-if="pending" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-950/60 p-4" @click.self="closeDialog" @keydown="onDialogKeydown">
      <div ref="dialog" role="dialog" aria-modal="true" aria-labelledby="decision-title" aria-describedby="decision-description" class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <div class="flex items-start justify-between gap-4">
          <h2 id="decision-title" class="font-cabinet-grotesk text-2xl font-bold">Confirmer : {{ pending.label.toLowerCase() }}</h2>
          <button type="button" class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-indigo-600" aria-label="Fermer la confirmation" @click="closeDialog">✕</button>
        </div>
        <p id="decision-description" class="mt-4 text-sm text-gray-700">{{ qualificationLabels[talent.qualificationStatus] }} → {{ qualificationLabels[pending.status] }} pour {{ talent.firstName }} {{ talent.lastName }}. Cette décision reste locale à la démonstration.</p>
        <form class="mt-5" novalidate @submit.prevent="confirm">
          <label for="qualification-reason" class="block text-sm font-semibold">Motif de la décision *</label>
          <textarea id="qualification-reason" ref="reasonInput" v-model="reason" rows="3" required :aria-invalid="Boolean(error)" :aria-describedby="error ? 'qualification-error' : undefined" class="mt-2 w-full rounded-lg border-gray-300 p-3 text-sm focus:border-indigo-600 focus:ring-indigo-600" placeholder="Précisez la raison de la décision simulée" />
          <p v-if="error" id="qualification-error" role="alert" class="mt-2 text-sm text-red-700">{{ error }}</p>
          <div class="mt-6 flex flex-wrap justify-end gap-3">
            <button type="button" class="min-h-11 rounded-lg border border-gray-300 px-4 text-sm font-semibold text-gray-800 hover:bg-gray-50" @click="closeDialog">Annuler</button>
            <button type="submit" class="min-h-11 rounded-lg bg-indigo-700 px-4 text-sm font-semibold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-indigo-600">Confirmer la décision</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
