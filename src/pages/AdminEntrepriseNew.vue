<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getMockSession } from '../services/authService.js'
import { createMockOrganization, listMockAttachableMissions, organizationCollaborationOptions, organizationProvenanceOptions } from '../services/businessService.js'

const router = useRouter()
const name = ref('')
const types = ref([])
const contactName = ref('')
const contactRole = ref('')
const provenance = ref('')
const provenanceDetail = ref('')
const collaborationStatus = ref('PROSPECTING')
const comment = ref('')
const missionIds = ref([])
const missionSearch = ref('')
const error = ref('')
const confirming = ref(false)
const confirmedSelection = ref('')
const missions = listMockAttachableMissions()
const typeLabels = { ESN: 'ESN', CLIENT: 'Client direct', PARTNER: 'Partenaire' }
const filteredMissions = computed(() => missions.filter((mission) => [mission.title, mission.organization, mission.id].join(' ').toLocaleLowerCase('fr-FR').includes(missionSearch.value.trim().toLocaleLowerCase('fr-FR'))))
const transfers = computed(() => missions.filter((mission) => missionIds.value.includes(mission.id) && mission.organizationId))
const compatible = (mission) => Boolean(mission) && types.value.includes(mission.source === 'ESN' ? 'ESN' : 'CLIENT')

function submit() {
  error.value = ''
  if (!name.value.trim() || !types.value.length || !provenance.value || (provenance.value === 'OTHER' && !provenanceDetail.value.trim())) {
    error.value = 'Renseignez le nom, au moins un rôle et une provenance (précisez « Autre » si sélectionné).'
    return
  }
  if (transfers.value.length && (!confirming.value || confirmedSelection.value !== JSON.stringify({ name: name.value.trim(), types: types.value, missionIds: missionIds.value }))) {
    confirmedSelection.value = JSON.stringify({ name: name.value.trim(), types: types.value, missionIds: missionIds.value })
    confirming.value = true
    return
  }
  try {
    const result = createMockOrganization({
      name: name.value, types: types.value, contactName: contactName.value, contactRole: contactRole.value,
      provenance: provenance.value, provenanceDetail: provenanceDetail.value, collaborationStatus: collaborationStatus.value,
      comment: comment.value, missionIds: missionIds.value, confirmTransfers: confirming.value,
    }, getMockSession())
    router.push({ path: `/admin/entreprises/${result.organization.id}`, query: { created: result.persisted ? 'saved' : 'visit' } })
  } catch (reason) { error.value = reason instanceof Error ? reason.message : 'Création impossible.'; confirming.value = false }
}
</script>

<template>
  <section class="space-y-6 font-aspekta text-gray-900">
    <router-link to="/admin/entreprises" class="inline-flex min-h-10 items-center rounded-lg border border-gray-200 bg-white px-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">← Retour aux entreprises</router-link>
    <header><p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Administration · mode démo</p><h1 class="mt-2 font-cabinet-grotesk text-3xl font-bold">Ajouter une entreprise</h1><p class="mt-2 text-sm text-gray-600">Création locale fictive. Aucun compte, contrat ou message n’est créé.</p></header>
    <form class="space-y-6" @submit.prevent="submit">
      <section class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="new-company-details">
        <h2 id="new-company-details" class="font-cabinet-grotesk text-xl font-bold">Organisation</h2>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <label class="sm:col-span-2"><span class="mb-1 block text-sm font-semibold">Nom de l’entreprise *</span><input v-model="name" required maxlength="120" type="text" class="w-full rounded-lg border-gray-300 text-sm" @input="confirming = false" /></label>
          <fieldset class="sm:col-span-2"><legend class="text-sm font-semibold">Rôle(s) *</legend><div class="mt-2 flex flex-wrap gap-4"><label v-for="(label, value) in typeLabels" :key="value" class="flex items-center gap-2 text-sm"><input v-model="types" :value="value" type="checkbox" class="rounded border-gray-300 text-indigo-700" @change="missionIds = missionIds.filter((id) => compatible(missions.find((mission) => mission.id === id))); confirming = false" />{{ label }}</label></div></fieldset>
          <label><span class="mb-1 block text-sm font-semibold">Nom du contact (facultatif)</span><input v-model="contactName" maxlength="120" type="text" class="w-full rounded-lg border-gray-300 text-sm" @input="confirming = false" /></label>
          <label><span class="mb-1 block text-sm font-semibold">Fonction du contact (facultatif)</span><input v-model="contactRole" maxlength="120" type="text" class="w-full rounded-lg border-gray-300 text-sm" @input="confirming = false" /></label>
          <label><span class="mb-1 block text-sm font-semibold">Provenance *</span><select v-model="provenance" required class="w-full rounded-lg border-gray-300 text-sm" @change="confirming = false"><option value="" disabled>Choisir une provenance</option><option v-for="option in organizationProvenanceOptions" :key="option.value" :value="option.value">{{ option.label }}</option></select></label>
          <label v-if="provenance === 'OTHER'"><span class="mb-1 block text-sm font-semibold">Précisez la provenance *</span><input v-model="provenanceDetail" required maxlength="200" type="text" class="w-full rounded-lg border-gray-300 text-sm" @input="confirming = false" /></label>
          <label><span class="mb-1 block text-sm font-semibold">Stade de collaboration *</span><select v-model="collaborationStatus" required class="w-full rounded-lg border-gray-300 text-sm" @change="confirming = false"><option v-for="option in organizationCollaborationOptions" :key="option.value" :value="option.value">{{ option.label }}</option></select></label>
          <label class="sm:col-span-2"><span class="mb-1 block text-sm font-semibold">Premier commentaire interne (facultatif)</span><textarea v-model="comment" maxlength="1000" rows="3" class="w-full rounded-lg border-gray-300 text-sm" @input="confirming = false" /><span class="mt-1 block text-xs text-gray-600">Ajouté comme première note datée. Ne saisissez aucune donnée réelle ou sensible.</span></label>
        </div>
        <p class="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">Le stade de collaboration n’est pas un accord commercial. Conditions commerciales initiales : Aucun accord signé. Aucun envoi de shortlist possible.</p>
      </section>
      <section class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="new-company-missions">
        <h2 id="new-company-missions" class="font-cabinet-grotesk text-xl font-bold">Rattacher des missions existantes</h2>
        <p class="mt-2 text-sm text-gray-600">Facultatif. Choisissez d’abord les rôles ; les missions incompatibles sont désactivées. Une mission déjà rattachée sera transférée après confirmation.</p>
        <label class="mt-4 block"><span class="mb-1 block text-sm font-semibold">Rechercher une mission</span><input v-model="missionSearch" type="search" placeholder="Titre ou entreprise actuelle…" class="w-full rounded-lg border-gray-300 text-sm" /></label>
        <div class="mt-3 max-h-72 space-y-1 overflow-y-auto rounded-lg border border-gray-200 p-2">
          <label v-for="mission in filteredMissions" :key="mission.id" class="flex items-start gap-3 rounded-lg p-2 text-sm hover:bg-gray-50" :class="!compatible(mission) ? 'opacity-60' : ''"><input v-model="missionIds" :value="mission.id" :disabled="!compatible(mission)" type="checkbox" class="mt-1 rounded border-gray-300 text-indigo-700" @change="confirming = false" /><span><strong>{{ mission.title }}</strong><span class="block text-gray-600">{{ mission.organizationId ? `Actuellement : ${mission.organization}` : 'Sans entreprise' }} · {{ mission.source === 'ESN' ? 'Rôle ESN requis' : 'Rôle client direct requis' }}</span></span></label>
          <p v-if="!filteredMissions.length" class="p-3 text-sm text-gray-600">Aucune mission correspondante.</p>
        </div>
      </section>
      <p v-if="error" role="alert" class="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">{{ error }}</p>
      <div class="flex flex-wrap gap-3"><button type="submit" class="min-h-11 rounded-lg bg-indigo-700 px-5 font-semibold text-white hover:bg-indigo-800">Créer l’entreprise</button><router-link to="/admin/entreprises" class="inline-flex min-h-11 items-center rounded-lg border border-gray-300 px-5 font-semibold hover:bg-gray-50">Annuler</router-link></div>
    </form>
    <div v-if="confirming" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-4" @keydown.esc="confirming = false">
      <div role="dialog" aria-modal="true" aria-labelledby="confirm-transfer-title" class="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <h2 id="confirm-transfer-title" class="font-cabinet-grotesk text-xl font-bold">Confirmer le transfert des missions ?</h2><p class="mt-2 text-sm text-gray-600">Les missions suivantes quitteront leur entreprise actuelle pour « {{ name.trim() }} ». Aucun statut ni accès premium ne change.</p>
        <ul class="mt-3 list-disc space-y-1 pl-5 text-sm"><li v-for="mission in transfers" :key="mission.id">{{ mission.title }} · {{ mission.organization }}</li></ul>
        <p v-if="error" role="alert" class="mt-3 text-sm text-rose-800">{{ error }}</p>
        <div class="mt-5 flex flex-wrap justify-end gap-3"><button type="button" class="min-h-11 rounded-lg border border-gray-300 px-4 font-semibold" @click="confirming = false">Annuler</button><button type="button" class="min-h-11 rounded-lg bg-indigo-700 px-4 font-semibold text-white" @click="submit">Confirmer et créer</button></div>
      </div>
    </div>
  </section>
</template>
