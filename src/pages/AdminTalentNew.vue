<script setup>
import { nextTick, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { expertiseOptions } from '../mocks/talents.js'
import { getMockSession } from '../services/authService.js'
import { createMockExternalTalent } from '../services/talentService.js'

const router = useRouter()
const form = reactive({
  firstName: '', lastName: '', architectTitle: '', originChannel: '', originDetails: '',
  expertise: [], location: '', availability: 'UNKNOWN', contactStatus: 'NOT_CONTACTED',
  contactNotes: '', emailAuthorized: false, email: '',
})
const errors = ref({})
const submitError = ref('')
const sending = ref(false)

function validate() {
  const issues = {}
  if (!form.firstName.trim()) issues.firstName = 'Renseignez le prénom.'
  if (!form.lastName.trim()) issues.lastName = 'Renseignez le nom.'
  if (!form.architectTitle.trim()) issues.architectTitle = 'Renseignez le titre d’architecte.'
  if (!form.originChannel) issues.originChannel = 'Choisissez un canal d’origine.'
  if (form.originChannel === 'OTHER' && !form.originDetails.trim()) issues.originDetails = 'Précisez le canal d’origine.'
  if (!form.expertise.length) issues.expertise = 'Choisissez au moins une spécialité.'
  if (!form.availability) issues.availability = 'Indiquez une disponibilité, même inconnue.'
  if (!form.contactStatus) issues.contactStatus = 'Choisissez un statut de contact.'
  if (form.contactStatus === 'CONTACTED' && !form.contactNotes.trim()) issues.contactNotes = 'Décrivez le contact effectué manuellement.'
  if (form.contactStatus === 'DO_NOT_CONTACT' && form.emailAuthorized) issues.emailAuthorized = 'Un refus de contact interdit l’utilisation de l’email.'
  if (form.email && !form.emailAuthorized) issues.email = 'Autorisez explicitement l’utilisation de l’email avant sa saisie.'
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) issues.email = 'Saisissez une adresse e-mail valide.'
  errors.value = issues
  if (Object.keys(issues).length) nextTick(() => document.getElementById(Object.keys(issues)[0])?.focus())
  return !Object.keys(issues).length
}

function onPermissionChange() {
  if (!form.emailAuthorized) form.email = ''
}

function onContactStatusChange() {
  if (form.contactStatus === 'DO_NOT_CONTACT') {
    form.emailAuthorized = false
    form.email = ''
  }
}

async function submit() {
  submitError.value = ''
  if (!validate()) return
  sending.value = true
  try {
    const { talent, persisted } = createMockExternalTalent(form, getMockSession())
    await router.push({ path: `/admin/talents/${talent.id}`, query: { created: persisted ? 'saved' : 'memory' } })
  } catch (error) {
    submitError.value = error.message || 'Enregistrement impossible. Réessayez.'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section class="mx-auto max-w-3xl font-aspekta text-gray-900">
    <router-link to="/admin/talents" class="inline-flex min-h-11 items-center text-sm font-semibold text-indigo-700 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-indigo-600">← Retour à la liste des talents</router-link>
    <header class="mt-6 mb-7">
      <p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Données fictives — mode démo</p>
      <h1 class="mt-2 font-cabinet-grotesk text-3xl font-bold">Ajouter un talent externe</h1>
      <p class="mt-3 text-sm leading-relaxed text-gray-600">Fiche de sourcing créée manuellement, sans compte Wenovat, sans qualification automatique, sans email envoyé ni transfert de CV. Utilisez uniquement des données fictives : la saisie peut être conservée dans ce navigateur, sans protection adaptée aux données réelles.</p>
    </header>

    <form class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm" novalidate @submit.prevent="submit">
      <div class="border-b border-gray-200 bg-indigo-50/60 p-5 sm:p-7">
        <h2 class="font-cabinet-grotesk text-lg font-bold">Statuts initiaux</h2>
        <div class="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
          <span class="rounded-full bg-violet-100 px-3 py-1.5 text-violet-800">Origine : externe</span>
          <span class="rounded-full bg-gray-100 px-3 py-1.5 text-gray-800">Qualification : non évalué</span>
          <span class="rounded-full bg-white px-3 py-1.5 text-indigo-800">Profil : sourcé, non membre</span>
        </div>
        <p class="mt-3 text-xs text-gray-600">Un candidat contacté reste un profil externe ; un membre enregistré s’inscrit séparément et n’est jamais créé par ce formulaire.</p>
      </div>

      <div class="space-y-8 p-5 sm:p-7">
        <fieldset>
          <legend class="font-cabinet-grotesk text-lg font-bold">Identité et expertise</legend>
          <div class="mt-4 grid gap-5 sm:grid-cols-2">
            <div><label for="firstName" class="block text-sm font-semibold">Prénom *</label><input id="firstName" v-model="form.firstName" type="text" autocomplete="off" :aria-invalid="Boolean(errors.firstName)" :aria-describedby="errors.firstName ? 'firstName-error' : undefined" class="mt-1 w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600" /><p v-if="errors.firstName" id="firstName-error" class="mt-1 text-sm text-red-700">{{ errors.firstName }}</p></div>
            <div><label for="lastName" class="block text-sm font-semibold">Nom *</label><input id="lastName" v-model="form.lastName" type="text" autocomplete="off" :aria-invalid="Boolean(errors.lastName)" :aria-describedby="errors.lastName ? 'lastName-error' : undefined" class="mt-1 w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600" /><p v-if="errors.lastName" id="lastName-error" class="mt-1 text-sm text-red-700">{{ errors.lastName }}</p></div>
            <div class="sm:col-span-2"><label for="architectTitle" class="block text-sm font-semibold">Titre d’architecte *</label><input id="architectTitle" v-model="form.architectTitle" type="text" autocomplete="off" placeholder="Architecte Cloud, Data, IA…" :aria-invalid="Boolean(errors.architectTitle)" :aria-describedby="errors.architectTitle ? 'architectTitle-error' : undefined" class="mt-1 w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600" /><p v-if="errors.architectTitle" id="architectTitle-error" class="mt-1 text-sm text-red-700">{{ errors.architectTitle }}</p></div>
          </div>
          <div class="mt-5" id="expertise" tabindex="-1"><p class="text-sm font-semibold">Spécialités *</p><div class="mt-2 flex flex-wrap gap-x-5 gap-y-3"><label v-for="option in expertiseOptions" :key="option.value" class="inline-flex min-h-10 items-center gap-2 text-sm"><input v-model="form.expertise" type="checkbox" :value="option.value" class="rounded border-gray-300 text-indigo-700 focus:ring-indigo-600" />{{ option.label }}</label></div><p v-if="errors.expertise" class="mt-1 text-sm text-red-700">{{ errors.expertise }}</p></div>
        </fieldset>

        <fieldset class="border-t border-gray-200 pt-7">
          <legend class="font-cabinet-grotesk text-lg font-bold">Sourcing et disponibilité</legend>
          <div class="mt-4 grid gap-5 sm:grid-cols-2">
            <div><label for="originChannel" class="block text-sm font-semibold">Canal d’origine *</label><select id="originChannel" v-model="form.originChannel" :aria-invalid="Boolean(errors.originChannel)" :aria-describedby="errors.originChannel ? 'originChannel-error' : undefined" class="mt-1 w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600"><option value="">Sélectionner un canal</option><option value="PROFESSIONAL_NETWORK">Réseau professionnel</option><option value="AUTHORIZED_SEARCH">Recherche autorisée</option><option value="REFERRAL">Recommandation</option><option value="OTHER">Autre canal autorisé</option></select><p v-if="errors.originChannel" id="originChannel-error" class="mt-1 text-sm text-red-700">{{ errors.originChannel }}</p></div>
            <div v-if="form.originChannel === 'OTHER'"><label for="originDetails" class="block text-sm font-semibold">Précision du canal *</label><input id="originDetails" v-model="form.originDetails" type="text" :aria-invalid="Boolean(errors.originDetails)" :aria-describedby="errors.originDetails ? 'originDetails-error' : undefined" class="mt-1 w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600" /><p v-if="errors.originDetails" id="originDetails-error" class="mt-1 text-sm text-red-700">{{ errors.originDetails }}</p></div>
            <div><label for="location" class="block text-sm font-semibold">Localisation</label><input id="location" v-model="form.location" type="text" autocomplete="off" placeholder="Ville ou région (facultatif)" class="mt-1 w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600" /></div>
            <div><label for="availability" class="block text-sm font-semibold">Disponibilité déclarée *</label><select id="availability" v-model="form.availability" :aria-invalid="Boolean(errors.availability)" :aria-describedby="errors.availability ? 'availability-error' : undefined" class="mt-1 w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600"><option value="UNKNOWN">Non déclarée / inconnue</option><option value="IMMEDIATE">Immédiate (déclarée)</option><option value="WITHIN_MONTH">Sous un mois (déclarée)</option><option value="LATER">Plus tard (déclarée)</option></select><p v-if="errors.availability" id="availability-error" class="mt-1 text-sm text-red-700">{{ errors.availability }}</p></div>
          </div>
        </fieldset>

        <fieldset class="border-t border-gray-200 pt-7">
          <legend class="font-cabinet-grotesk text-lg font-bold">Contact et permissions</legend>
          <p class="mt-2 text-sm text-gray-600">Un contact déjà effectué est une information saisie manuellement ; aucune action de ce formulaire ne contacte le talent.</p>
          <div class="mt-4"><label for="contactStatus" class="block text-sm font-semibold">État du contact *</label><select id="contactStatus" v-model="form.contactStatus" :aria-invalid="Boolean(errors.contactStatus)" :aria-describedby="errors.contactStatus ? 'contactStatus-error' : undefined" class="mt-1 w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600" @change="onContactStatusChange"><option value="NOT_CONTACTED">Non contacté</option><option value="CONTACTED">Contacté manuellement</option><option value="DO_NOT_CONTACT">Ne pas contacter</option></select><p v-if="errors.contactStatus" id="contactStatus-error" class="mt-1 text-sm text-red-700">{{ errors.contactStatus }}</p></div>
          <div class="mt-5"><label for="contactNotes" class="block text-sm font-semibold">Notes de contact {{ form.contactStatus === 'CONTACTED' ? '*' : '(facultatif)' }}</label><textarea id="contactNotes" v-model="form.contactNotes" rows="3" :aria-invalid="Boolean(errors.contactNotes)" :aria-describedby="errors.contactNotes ? 'contactNotes-error' : undefined" placeholder="Contexte fictif du sourcing ou du contact manuel" class="mt-1 w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600" /><p v-if="errors.contactNotes" id="contactNotes-error" class="mt-1 text-sm text-red-700">{{ errors.contactNotes }}</p></div>
          <div class="mt-5 rounded-lg border border-gray-200 p-4"><label for="emailAuthorized" class="flex items-start gap-3 text-sm"><input id="emailAuthorized" v-model="form.emailAuthorized" type="checkbox" :disabled="form.contactStatus === 'DO_NOT_CONTACT'" class="mt-0.5 rounded border-gray-300 text-indigo-700 focus:ring-indigo-600" @change="onPermissionChange" /><span>Je confirme que l’usage et la conservation d’une adresse e-mail <strong>fictive</strong> sont autorisés pour ce scénario de démonstration. Cette confirmation n’est pas un consentement réel du talent.</span></label><p v-if="errors.emailAuthorized" class="mt-1 text-sm text-red-700">{{ errors.emailAuthorized }}</p><label for="email" class="mt-4 block text-sm font-semibold">Email fictif (facultatif)</label><input id="email" v-model="form.email" type="email" autocomplete="off" :disabled="!form.emailAuthorized || form.contactStatus === 'DO_NOT_CONTACT'" placeholder="exemple@example.invalid" :aria-invalid="Boolean(errors.email)" :aria-describedby="errors.email ? 'email-error' : undefined" class="mt-1 w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600 disabled:bg-gray-100" /><p v-if="errors.email" id="email-error" class="mt-1 text-sm text-red-700">{{ errors.email }}</p></div>
        </fieldset>
      </div>

      <div class="flex flex-wrap items-center justify-end gap-3 border-t border-gray-200 p-5 sm:p-7"><p v-if="submitError" role="alert" class="w-full text-sm text-red-700">{{ submitError }}</p><router-link to="/admin/talents" class="inline-flex min-h-11 items-center rounded-lg border border-gray-300 px-4 text-sm font-semibold text-gray-800 hover:bg-gray-50">Annuler</router-link><button type="submit" :disabled="sending" class="min-h-11 rounded-lg bg-indigo-700 px-5 text-sm font-semibold text-white hover:bg-indigo-800 disabled:opacity-60">{{ sending ? 'Enregistrement…' : 'Enregistrer le profil fictif' }}</button></div>
    </form>
  </section>
</template>
