<script setup>
import { computed, onActivated, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { listMockOrganizations, organizationCollaborationOptions, organizationProvenanceLabel } from '../services/businessService.js'

const route = useRoute()
const organizations = ref(listMockOrganizations())
const search = ref('')
const type = ref('')
const agreement = ref('')
const typeLabels = { ESN: 'ESN', CLIENT: 'Client direct', PARTNER: 'Partenaire' }
const collaborationLabels = Object.fromEntries(organizationCollaborationOptions.map(({ value, label }) => [value, label]))
const agreementLabels = { NONE: 'Aucun accord signé', ACTIVE: 'Accord déclaré actif', EXPIRED: 'Accord expiré' }
const hasFilters = computed(() => Boolean(search.value || type.value || agreement.value))
const filteredOrganizations = computed(() => {
  const query = search.value.trim().toLocaleLowerCase('fr-FR')
  return organizations.value.filter((organization) => {
    const text = [organization.name, organizationProvenanceLabel(organization), ...organization.contacts.flatMap((contact) => [contact.name, contact.role])].join(' ').toLocaleLowerCase('fr-FR')
    return (!query || text.includes(query))
      && (!type.value || organization.types.includes(type.value))
      && (!agreement.value || organization.agreement.status === agreement.value)
  })
})

onActivated(() => { organizations.value = listMockOrganizations() })
watch(() => route.fullPath, () => { organizations.value = listMockOrganizations() })

function resetFilters() {
  search.value = ''
  type.value = ''
  agreement.value = ''
}
</script>

<template>
  <section class="space-y-6 font-aspekta text-gray-900" aria-labelledby="organizations-title">
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div><p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Données fictives · mode démo</p><h1 id="organizations-title" class="mt-2 font-cabinet-grotesk text-3xl font-bold tracking-tight sm:text-4xl">Entreprises</h1><p class="mt-2 text-sm text-gray-600">ESN, clients directs et partenaires peuvent se cumuler. Les accords affichés ne sont pas vérifiés.</p></div>
      <router-link to="/admin/entreprises/nouveau" class="inline-flex min-h-11 items-center rounded-lg bg-indigo-700 px-4 text-sm font-semibold text-white hover:bg-indigo-800">Ajouter une entreprise</router-link>
    </header>

    <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <label class="block sm:col-span-2 xl:col-span-1">
          <span class="mb-1 block text-sm font-semibold text-gray-700">Rechercher</span>
          <input v-model="search" type="search" placeholder="Nom, contact, provenance…" class="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600" />
        </label>
        <label class="block">
          <span class="mb-1 block text-sm font-semibold text-gray-700">Type d’organisation</span>
          <select v-model="type" class="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600">
            <option value="">Tous les types</option>
            <option v-for="(label, value) in typeLabels" :key="value" :value="value">{{ label }}</option>
          </select>
        </label>
        <label class="block">
          <span class="mb-1 block text-sm font-semibold text-gray-700">Accord commercial</span>
          <select v-model="agreement" class="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600">
            <option value="">Tous les accords</option>
            <option v-for="(label, value) in agreementLabels" :key="value" :value="value">{{ label }}</option>
          </select>
        </label>
      </div>
      <div class="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3 text-sm text-gray-600">
        <span>Filtres cumulables · données de démonstration</span>
        <button v-if="hasFilters" type="button" class="min-h-10 rounded-lg px-2 font-semibold text-indigo-700 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-indigo-600" @click="resetFilters">Effacer les filtres</button>
      </div>
    </div>

    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <header class="flex flex-wrap items-baseline gap-2 px-5 py-4">
        <h2 class="font-cabinet-grotesk text-lg font-bold">Organisations</h2>
        <span role="status" class="text-sm text-gray-600">{{ filteredOrganizations.length }} sur {{ organizations.length }} entreprises de démonstration</span>
      </header>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[920px] text-left text-sm">
          <thead class="border-y border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-600">
            <tr>
              <th scope="col" class="px-5 py-3">Entreprise</th>
              <th scope="col" class="px-3 py-3">Rôles</th>
              <th scope="col" class="px-3 py-3">Contact principal</th>
              <th scope="col" class="px-3 py-3">Provenance</th>
              <th scope="col" class="px-3 py-3">Collaboration</th>
              <th scope="col" class="px-3 py-3">Accord commercial</th>
              <th scope="col" class="px-3 py-3 text-center">Missions</th>
              <th scope="col" class="px-5 py-3 text-right">Fiche</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="organization in filteredOrganizations" :key="organization.id" class="hover:bg-indigo-50/40">
              <td class="px-5 py-4"><router-link :to="`/admin/entreprises/${organization.id}`" class="font-semibold text-gray-900 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-indigo-600">{{ organization.name }}</router-link><span class="mt-1 block text-xs text-gray-500">Démo · {{ organization.id }}</span></td>
              <td class="px-3 py-4"><div class="flex flex-wrap gap-1"><span v-for="role in organization.types" :key="role" class="rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-800">{{ typeLabels[role] }}</span></div></td>
              <td class="px-3 py-4 text-gray-700">{{ organization.contacts[0]?.name ?? 'Non renseigné' }}</td>
              <td class="px-3 py-4 text-gray-700">{{ organizationProvenanceLabel(organization) }}</td>
              <td class="px-3 py-4 text-gray-700">{{ collaborationLabels[organization.collaborationStatus] }}</td>
              <td class="px-3 py-4"><span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold" :class="organization.agreement.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-800' : organization.agreement.status === 'EXPIRED' ? 'bg-amber-100 text-amber-900' : 'bg-rose-50 text-rose-800'">{{ agreementLabels[organization.agreement.status] }}</span></td>
              <td class="px-3 py-4 text-center font-semibold">{{ organization.missionCount }}</td>
              <td class="px-5 py-4 text-right"><router-link :to="`/admin/entreprises/${organization.id}`" class="whitespace-nowrap font-semibold text-indigo-700 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-indigo-600" :aria-label="`Voir la fiche de ${organization.name}`">Voir la fiche</router-link></td>
            </tr>
            <tr v-if="!filteredOrganizations.length"><td colspan="8" class="px-5 py-10 text-center text-gray-600">Aucune entreprise fictive ne correspond à ces critères. Modifiez les filtres ou effacez-les.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
