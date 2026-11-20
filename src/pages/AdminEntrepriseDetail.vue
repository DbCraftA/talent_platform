<script setup>
import { computed, onActivated, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getMockSession } from '../services/authService.js'
import { addMockOrganizationNote, attachMockOrganizationMissions, getMockOrganizationById, listMockAttachableMissions, listMockOrganizationMissions, listMockOrganizationServices, organizationCollaborationOptions, organizationProvenanceLabel, organizationProvenanceOptions, updateMockOrganization } from '../services/businessService.js'

const route = useRoute()
const revision = ref(0)
onActivated(() => { revision.value += 1 })
const attaching = ref(false)
const confirming = ref(false)
const confirmedSelection = ref('')
const selectedIds = ref([])
const missionSearch = ref('')
const notice = ref('')
const error = ref('')
const editing = ref(false)
const editError = ref('')
const noteError = ref('')
const noteText = ref('')
const form = ref(null)
const organization = computed(() => { revision.value; return getMockOrganizationById(route.params.id) })
const missions = computed(() => { revision.value; return listMockOrganizationMissions(route.params.id) })
const services = computed(() => { revision.value; return listMockOrganizationServices(route.params.id) })
const selectableMissions = computed(() => { revision.value; return listMockAttachableMissions().filter((mission) => mission.organizationId !== route.params.id) })
const filteredMissions = computed(() => selectableMissions.value.filter((mission) => [mission.title, mission.organization, mission.id].join(' ').toLocaleLowerCase('fr-FR').includes(missionSearch.value.trim().toLocaleLowerCase('fr-FR'))))
const transfers = computed(() => selectableMissions.value.filter((mission) => selectedIds.value.includes(mission.id) && mission.organizationId))
const compatible = (mission) => organization.value?.types.includes(mission.source === 'ESN' ? 'ESN' : 'CLIENT')
const typeLabels = { ESN: 'ESN', CLIENT: 'Client direct', PARTNER: 'Partenaire' }
const collaborationLabels = Object.fromEntries(organizationCollaborationOptions.map(({ value, label }) => [value, label]))
const agreementLabels = { NONE: 'Aucun accord signé', ACTIVE: 'Accord déclaré actif', EXPIRED: 'Accord expiré' }
const missionStatuses = { PENDING_REVIEW: 'À valider', APPROVED: 'Validée, non publiée', PUBLISHED: 'Publiée', MATCHING: 'Mise en relation', CLOSED: 'Clôturée' }
const serviceStatuses = { PLANNED: 'Prévue', IN_PROGRESS: 'En cours', COMPLETED: 'Terminée' }
const dateLabel = (value) => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`))
watch(() => route.params.id, () => { attaching.value = false; confirming.value = false; selectedIds.value = []; editing.value = false; form.value = null; noteText.value = ''; notice.value = ''; error.value = ''; editError.value = ''; noteError.value = '' })

function startEditing() {
  form.value = {
    name: organization.value.name, types: [...organization.value.types],
    contactName: organization.value.contacts[0]?.name ?? '', contactRole: organization.value.contacts[0]?.role ?? '',
    provenance: organization.value.provenance, provenanceDetail: organization.value.provenanceDetail ?? '',
    collaborationStatus: organization.value.collaborationStatus,
  }
  editError.value = ''
  editing.value = true
  notice.value = ''
}

function saveEdit() {
  editError.value = ''
  if (!form.value.name.trim() || !form.value.types.length || !form.value.provenance || (form.value.provenance === 'OTHER' && !form.value.provenanceDetail.trim())) {
    editError.value = 'Renseignez le nom, au moins un rôle et une provenance (précisez « Autre » si sélectionné).'
    return
  }
  try {
    const result = updateMockOrganization(route.params.id, form.value, getMockSession())
    revision.value += 1
    editing.value = false
    notice.value = `Fiche mise à jour. ${result.persisted ? 'Enregistrée sur cet appareil.' : 'Conservée uniquement pendant cette visite.'} L’accord commercial reste inchangé.`
  } catch (reason) { editError.value = reason instanceof Error ? reason.message : 'Mise à jour impossible.' }
}

function addNote() {
  noteError.value = ''
  try {
    const result = addMockOrganizationNote(route.params.id, noteText.value, getMockSession())
    revision.value += 1
    noteText.value = ''
    notice.value = `Note interne ajoutée. ${result.persisted ? 'Enregistrée sur cet appareil.' : 'Conservée uniquement pendant cette visite.'}`
  } catch (reason) { noteError.value = reason instanceof Error ? reason.message : 'Ajout impossible.' }
}

function closeAttachment() {
  attaching.value = false
  confirming.value = false
  selectedIds.value = []
  missionSearch.value = ''
  error.value = ''
}

function submitAttachment() {
  error.value = ''
  if (!selectedIds.value.length) { error.value = 'Sélectionnez au moins une mission à rattacher.'; return }
  if (transfers.value.length && (!confirming.value || confirmedSelection.value !== JSON.stringify({ id: route.params.id, missionIds: selectedIds.value }))) {
    confirmedSelection.value = JSON.stringify({ id: route.params.id, missionIds: selectedIds.value })
    confirming.value = true
    return
  }
  try {
    const result = attachMockOrganizationMissions(route.params.id, selectedIds.value, getMockSession(), confirming.value)
    revision.value += 1
    closeAttachment()
    notice.value = result.changed ? `Missions rattachées à l’entreprise fictive. ${result.persisted ? 'Modification enregistrée localement.' : 'Modification conservée uniquement pendant cette visite.'}` : 'Aucun rattachement modifié.'
  } catch (reason) { confirming.value = false; error.value = reason instanceof Error ? reason.message : 'Rattachement impossible.' }
}
</script>

<template>
  <section class="space-y-6 font-aspekta text-gray-900">
    <router-link to="/admin/entreprises" class="inline-flex min-h-10 items-center rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-indigo-600">← Retour aux entreprises</router-link>
    <div v-if="!organization" class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <h1 class="font-cabinet-grotesk text-3xl font-bold">Entreprise introuvable</h1>
      <p class="mt-3 text-gray-600">Aucune organisation fictive ne correspond à cet identifiant.</p>
    </div>
    <template v-else>
      <header class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Administration · entreprise fictive · {{ organization.id }}</p>
        <h1 class="mt-2 font-cabinet-grotesk text-3xl font-bold tracking-tight sm:text-4xl">{{ organization.name }}</h1>
        <div class="mt-4 flex flex-wrap gap-2"><span v-for="role in organization.types" :key="role" class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800">{{ typeLabels[role] }}</span></div>
        <p class="mt-4 text-sm text-gray-600">{{ organization.missionCount }} mission(s) associée(s) · {{ services.length }} prestation(s) d’exemple</p>
      </header>
      <p v-if="route.query.created" role="status" class="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">Entreprise créée dans la maquette. {{ route.query.created === 'saved' ? 'Enregistrée sur cet appareil.' : 'Conservée uniquement pendant cette visite.' }} Aucun accord commercial signé.</p>
      <p v-if="notice" role="status" class="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">{{ notice }}</p>

      <div class="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(17rem,1fr)]">
        <section class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="organization-info">
          <div class="flex flex-wrap items-center justify-between gap-3"><h2 id="organization-info" class="font-cabinet-grotesk text-xl font-bold">Organisation et contacts</h2><button v-if="!editing" type="button" class="min-h-10 rounded-lg border border-indigo-200 px-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50" @click="startEditing">Modifier la fiche</button></div>
          <form v-if="editing && form" class="mt-4 space-y-4 rounded-lg border border-indigo-100 bg-indigo-50 p-4" @submit.prevent="saveEdit">
            <label class="block"><span class="mb-1 block text-sm font-semibold">Nom de l’entreprise *</span><input v-model="form.name" required maxlength="120" type="text" class="w-full rounded-lg border-gray-300 text-sm" /></label>
            <fieldset><legend class="text-sm font-semibold">Rôle(s) *</legend><div class="mt-2 flex flex-wrap gap-3"><label v-for="(label, value) in typeLabels" :key="value" class="flex items-center gap-2 text-sm"><input v-model="form.types" :value="value" type="checkbox" class="rounded border-gray-300 text-indigo-700" />{{ label }}</label></div><p class="mt-1 text-xs text-gray-600">Transférez d’abord les missions liées avant de retirer un rôle ESN ou client direct.</p></fieldset>
            <div class="grid gap-4 sm:grid-cols-2"><label><span class="mb-1 block text-sm font-semibold">Nom du contact</span><input v-model="form.contactName" maxlength="120" type="text" class="w-full rounded-lg border-gray-300 text-sm" /></label><label><span class="mb-1 block text-sm font-semibold">Fonction du contact</span><input v-model="form.contactRole" maxlength="120" type="text" class="w-full rounded-lg border-gray-300 text-sm" /></label></div>
            <div class="grid gap-4 sm:grid-cols-2"><label><span class="mb-1 block text-sm font-semibold">Provenance *</span><select v-model="form.provenance" required class="w-full rounded-lg border-gray-300 text-sm"><option value="" disabled>Choisir une provenance</option><option v-for="option in organizationProvenanceOptions" :key="option.value" :value="option.value">{{ option.label }}</option></select></label><label v-if="form.provenance === 'OTHER'"><span class="mb-1 block text-sm font-semibold">Précisez la provenance *</span><input v-model="form.provenanceDetail" required maxlength="200" type="text" class="w-full rounded-lg border-gray-300 text-sm" /></label><label><span class="mb-1 block text-sm font-semibold">Stade de collaboration *</span><select v-model="form.collaborationStatus" required class="w-full rounded-lg border-gray-300 text-sm"><option v-for="option in organizationCollaborationOptions" :key="option.value" :value="option.value">{{ option.label }}</option></select></label></div>
            <p class="text-xs text-gray-700">L’accord commercial reste en lecture seule. Aucune shortlist n’est envoyée.</p>
            <p v-if="editError" role="alert" class="text-sm text-rose-800">{{ editError }}</p>
            <div class="flex flex-wrap gap-2"><button type="submit" class="min-h-10 rounded-lg bg-indigo-700 px-4 text-sm font-semibold text-white hover:bg-indigo-800">Enregistrer la fiche</button><button type="button" class="min-h-10 rounded-lg border border-gray-300 bg-white px-4 text-sm font-semibold" @click="editing = false; editError = ''">Annuler</button></div>
          </form>
          <dl class="mt-4 divide-y divide-gray-100 text-sm">
            <div class="flex flex-wrap justify-between gap-2 py-3"><dt class="text-gray-600">Provenance</dt><dd class="font-semibold">{{ organizationProvenanceLabel(organization) }}</dd></div>
            <div class="flex flex-wrap justify-between gap-2 py-3"><dt class="text-gray-600">Collaboration</dt><dd class="font-semibold">{{ collaborationLabels[organization.collaborationStatus] }}</dd></div>
          </dl>
          <h3 class="mt-4 font-semibold">Contacts fictifs</h3>
          <ul v-if="organization.contacts.length" class="mt-2 space-y-2 text-sm"><li v-for="contact in organization.contacts" :key="contact.id" class="rounded-lg bg-gray-50 p-3"><strong>{{ contact.name }}</strong><span class="mt-1 block text-gray-600">{{ contact.role }}</span></li></ul>
          <p v-else class="mt-2 text-sm text-gray-600">Aucun contact renseigné.</p>
        </section>

        <aside class="rounded-xl border p-5 shadow-sm sm:p-6" :class="organization.agreement.status === 'ACTIVE' ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'" aria-labelledby="agreement-title">
          <h2 id="agreement-title" class="font-cabinet-grotesk text-xl font-bold">Conditions commerciales</h2>
          <p class="mt-3 font-semibold">{{ agreementLabels[organization.agreement.status] }}</p>
          <p v-if="organization.agreement.validUntil" class="mt-1 text-sm">Validité déclarée jusqu’au {{ dateLabel(organization.agreement.validUntil) }}.</p>
          <p class="mt-3 text-sm leading-relaxed">{{ organization.agreement.status === 'ACTIVE' ? 'Statut fictif non vérifié : aucune shortlist n’est envoyée depuis cette maquette.' : 'Envoi de shortlist interdit : aucun accord commercial signé et valide n’est établi. Aucun envoi réel dans cette maquette.' }}</p>
          <p class="mt-3 text-xs text-gray-700">Aucun contrat ni justificatif n’est stocké ici.</p>
        </aside>
      </div>

      <section class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="organization-notes">
        <h2 id="organization-notes" class="font-cabinet-grotesk text-xl font-bold">Notes internes · démonstration</h2>
        <p class="mt-2 text-sm text-gray-600">Journal local en ajout uniquement. Ne saisissez aucune donnée réelle ou sensible.</p>
        <form class="mt-4" @submit.prevent="addNote"><label class="block"><span class="mb-1 block text-sm font-semibold">Ajouter un commentaire</span><textarea v-model="noteText" required maxlength="1000" rows="3" class="w-full rounded-lg border-gray-300 text-sm" /></label><p v-if="noteError" role="alert" class="mt-2 text-sm text-rose-800">{{ noteError }}</p><button type="submit" class="mt-3 min-h-10 rounded-lg bg-indigo-700 px-4 text-sm font-semibold text-white hover:bg-indigo-800">Ajouter la note</button></form>
        <ol v-if="organization.notes.length" class="mt-5 divide-y divide-gray-100"><li v-for="note in organization.notes" :key="note.id" class="py-3"><p class="whitespace-pre-wrap break-words text-sm text-gray-800">{{ note.text }}</p><p class="mt-1 text-xs text-gray-500">{{ note.author }} · {{ new Date(note.createdAt).toLocaleString('fr-FR') }}</p></li></ol>
        <p v-else class="mt-5 text-sm text-gray-600">Aucune note interne pour cette entreprise.</p>
      </section>

      <div class="grid gap-5 lg:grid-cols-2">
        <section class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="organization-opportunities">
          <div class="flex flex-wrap items-start justify-between gap-3"><h2 id="organization-opportunities" class="font-cabinet-grotesk text-xl font-bold">Opportunités et missions fictives</h2><button v-if="!attaching" type="button" class="min-h-10 rounded-lg border border-indigo-200 px-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50" @click="attaching = true; notice = ''">Rattacher des missions</button></div>
          <form v-if="attaching" class="mt-4 rounded-lg border border-indigo-100 bg-indigo-50 p-4" @submit.prevent="submitAttachment">
            <p class="text-sm text-gray-700">Sélectionnez des missions à rattacher. Les missions déjà liées à cette entreprise restent associées ; un transfert depuis une autre entreprise demande confirmation.</p>
            <label class="mt-3 block"><span class="mb-1 block text-sm font-semibold">Rechercher une mission</span><input v-model="missionSearch" type="search" class="w-full rounded-lg border-gray-300 text-sm" /></label>
            <div class="mt-3 max-h-64 space-y-1 overflow-y-auto rounded-lg border border-gray-200 bg-white p-2">
              <label v-for="mission in filteredMissions" :key="mission.id" class="flex items-start gap-2 rounded-lg p-2 text-sm hover:bg-gray-50" :class="!compatible(mission) ? 'opacity-60' : ''"><input v-model="selectedIds" type="checkbox" :value="mission.id" :disabled="!compatible(mission)" class="mt-1 rounded border-gray-300 text-indigo-700" @change="confirming = false" /><span><strong>{{ mission.title }}</strong><span class="block text-gray-600">{{ mission.organizationId ? `Actuellement : ${mission.organization}` : 'Sans entreprise' }} · {{ mission.source === 'ESN' ? 'Rôle ESN requis' : 'Rôle client direct requis' }}</span></span></label>
              <p v-if="!filteredMissions.length" class="p-2 text-sm text-gray-600">Aucune autre mission correspondante.</p>
            </div>
            <p v-if="error" role="alert" class="mt-3 text-sm text-rose-800">{{ error }}</p>
            <div class="mt-4 flex flex-wrap gap-2"><button type="submit" class="min-h-10 rounded-lg bg-indigo-700 px-4 text-sm font-semibold text-white hover:bg-indigo-800">Enregistrer les rattachements</button><button type="button" class="min-h-10 rounded-lg border border-gray-300 bg-white px-4 text-sm font-semibold" @click="closeAttachment">Annuler</button></div>
          </form>
          <ul v-if="missions.length" class="mt-4 divide-y divide-gray-100"><li v-for="mission in missions" :key="mission.id" class="py-3 first:pt-0"><router-link :to="`/admin/missions/${mission.id}`" class="font-semibold text-indigo-700 hover:underline focus-visible:outline-2 focus-visible:outline-indigo-600">{{ mission.title }}</router-link><p class="mt-1 text-sm text-gray-600">{{ missionStatuses[mission.status] }} · {{ mission.tier === 'PREMIUM' ? 'Premium' : 'Standard' }} · {{ mission.source === 'ESN' ? 'Via ESN' : 'Client direct' }}</p></li></ul>
          <p v-else class="mt-4 text-sm text-gray-600">Aucune mission fictive associée.</p>
        </section>
        <section class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="organization-services">
          <h2 id="organization-services" class="font-cabinet-grotesk text-xl font-bold">Prestations fictives</h2>
          <ul v-if="services.length" class="mt-4 divide-y divide-gray-100"><li v-for="service in services" :key="service.id" class="py-3 first:pt-0"><p class="font-semibold">{{ service.title }}</p><p class="mt-1 text-sm text-gray-600">{{ serviceStatuses[service.status] }} · {{ service.id }}</p></li></ul>
          <p v-else class="mt-4 text-sm text-gray-600">Aucune prestation fictive associée.</p>
          <p class="mt-4 text-xs text-gray-500">Suivi illustratif uniquement, sans facturation ni document contractuel.</p>
        </section>
      </div>
    </template>
    <div v-if="confirming" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-4" @keydown.esc="confirming = false"><div role="dialog" aria-modal="true" aria-labelledby="transfer-title" class="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl"><h2 id="transfer-title" class="font-cabinet-grotesk text-xl font-bold">Confirmer le transfert des missions ?</h2><p class="mt-2 text-sm text-gray-600">Les missions quitteront leur entreprise actuelle pour « {{ organization?.name }} ». Leur source et leur statut ne changent pas.</p><ul class="mt-3 list-disc space-y-1 pl-5 text-sm"><li v-for="mission in transfers" :key="mission.id">{{ mission.title }} · {{ mission.organization }}</li></ul><p v-if="error" role="alert" class="mt-3 text-sm text-rose-800">{{ error }}</p><div class="mt-5 flex flex-wrap justify-end gap-2"><button type="button" class="min-h-11 rounded-lg border border-gray-300 px-4 font-semibold" @click="confirming = false">Annuler</button><button type="button" class="min-h-11 rounded-lg bg-indigo-700 px-4 font-semibold text-white" @click="submitAttachment">Confirmer le transfert</button></div></div></div>
  </section>
</template>
