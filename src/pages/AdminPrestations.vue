<script setup>
import { computed, nextTick, onActivated, onUnmounted, ref } from 'vue'
import { getMockSession } from '../services/authService.js'
import { listMockAdminPrestations, transferMockCommercialOwner } from '../services/adminPrestationService.js'

const prestations = ref(listMockAdminPrestations())
const search = ref('')
const model = ref('')
const status = ref('')
const partner = ref('')
const selectedId = ref(null)
const newOwner = ref('')
const notice = ref('')
const error = ref('')
const dialog = ref(null)
let opener = null

const modelLabels = { FIXED_SUCCESS_FEE: 'Forfait au succès', PER_BILLABLE_DAY: 'Par journée facturable' }
const prestationLabels = { PLANNED: 'Planifiée', IN_PROGRESS: 'En cours', INTERRUPTED: 'Interrompue', COMPLETED: 'Terminée' }
const commissionLabels = { TO_CONFIRM: 'À confirmer', ACQUIRED: 'Acquise', INVOICED: 'Facturée (mock)', PAID: 'Payée (mock)', DISPUTED: 'Contestée' }
const commissionStyles = {
  TO_CONFIRM: 'bg-amber-100 text-amber-900', ACQUIRED: 'bg-sky-100 text-sky-900',
  INVOICED: 'bg-indigo-100 text-indigo-900', PAID: 'bg-emerald-100 text-emerald-900', DISPUTED: 'bg-rose-100 text-rose-900',
}
const currency = (value) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(value)
const date = (value) => value ? new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`)) : 'Non renseignée'
const timestamp = (value) => new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Paris' }).format(new Date(value))
const monthLabel = (month) => new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${month}-01T00:00:00Z`))
const partners = computed(() => [...new Map(prestations.value.filter((item) => item.partnerOrganizationId).map((item) => [item.partnerOrganizationId, item.partnerName])).entries()])
const hasFilters = computed(() => Boolean(search.value || model.value || status.value || partner.value))
const filtered = computed(() => {
  const query = search.value.trim().toLocaleLowerCase('fr-FR')
  return prestations.value.filter((item) =>
    (!query || [item.id, item.missionTitle, item.talentName, item.clientName, item.partnerName, item.commercialOwner].join(' ').toLocaleLowerCase('fr-FR').includes(query))
    && (!model.value || item.remuneration.model === model.value)
    && (!status.value || item.commissionStatus === status.value)
    && (!partner.value || (partner.value === 'NONE' ? !item.partnerOrganizationId : item.partnerOrganizationId === partner.value)))
})
const selected = computed(() => prestations.value.find((item) => item.id === selectedId.value) ?? null)

onActivated(() => { prestations.value = listMockAdminPrestations() })
onUnmounted(() => { document.removeEventListener('keydown', handleKeydown) })

function resetFilters() { search.value = ''; model.value = ''; status.value = ''; partner.value = '' }

async function openDetail(id, event) {
  opener = event.currentTarget
  selectedId.value = id
  newOwner.value = ''
  error.value = ''
  notice.value = ''
  document.addEventListener('keydown', handleKeydown)
  await nextTick()
  dialog.value?.focus()
}

function closeDetail() {
  selectedId.value = null
  document.removeEventListener('keydown', handleKeydown)
  nextTick(() => opener?.focus())
}

function handleKeydown(event) {
  if (event.key === 'Escape') { closeDetail(); return }
  if (event.key !== 'Tab' || !dialog.value) return
  const focusable = [...dialog.value.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])')]
  if (!focusable.length) return
  const first = focusable[0]
  const last = focusable.at(-1)
  if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.value)) { event.preventDefault(); last.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
}

function transferOwner() {
  error.value = ''
  notice.value = ''
  try {
    const { prestation, persisted } = transferMockCommercialOwner(selectedId.value, newOwner.value, getMockSession())
    prestations.value = listMockAdminPrestations()
    newOwner.value = ''
    notice.value = `Transfert vers ${prestation.commercialOwner} enregistré dans la maquette. Accord et commission inchangés.${persisted ? '' : ' Conservation limitée à cette visite.'}`
  } catch (reason) {
    error.value = reason instanceof Error ? reason.message : 'Transfert impossible.'
  }
}
</script>

<template>
  <section class="space-y-6 font-aspekta text-gray-900" aria-labelledby="prestations-title">
    <header>
      <p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Données fictives · mode démo</p>
      <h1 id="prestations-title" class="mt-2 font-cabinet-grotesk text-3xl font-bold tracking-tight sm:text-4xl">Prestations & commissions</h1>
      <p class="mt-2 max-w-3xl text-sm text-gray-600">Suivi simulé des placements et des commissions HT. Aucun montant affiché ne constitue une facture ou un paiement réel.</p>
    </header>

    <div class="grid gap-3 sm:grid-cols-2">
      <div class="rounded-xl border border-indigo-100 bg-indigo-50 p-4"><p class="text-sm font-bold text-indigo-900">Forfait au succès</p><p class="mt-1 text-sm text-gray-700">Montant convenu, par exemple 1 000 € HT, acquis au premier jour réellement travaillé et facturable ; il reste acquis si la prestation est ensuite interrompue.</p></div>
      <div class="rounded-xl border border-indigo-100 bg-indigo-50 p-4"><p class="text-sm font-bold text-indigo-900">Par journée facturable</p><p class="mt-1 text-sm text-gray-700">Tarif de commission négocié × journées validées au relevé mensuel. Les journées simplement déclarées ne sont pas comptées.</p></div>
    </div>

    <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <label class="block"><span class="mb-1 block text-sm font-semibold text-gray-700">Rechercher</span><input v-model="search" type="search" placeholder="Mission, architecte, client…" class="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600" /></label>
        <label class="block"><span class="mb-1 block text-sm font-semibold text-gray-700">Modèle de rémunération</span><select v-model="model" class="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600"><option value="">Tous les modèles</option><option v-for="(label, value) in modelLabels" :key="value" :value="value">{{ label }}</option></select></label>
        <label class="block"><span class="mb-1 block text-sm font-semibold text-gray-700">Statut de commission</span><select v-model="status" class="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600"><option value="">Tous les statuts</option><option v-for="(label, value) in commissionLabels" :key="value" :value="value">{{ label }}</option></select></label>
        <label class="block"><span class="mb-1 block text-sm font-semibold text-gray-700">Partenaire porteur</span><select v-model="partner" class="w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600"><option value="">Tous les partenaires</option><option value="NONE">Sans partenaire porteur</option><option v-for="[id, name] in partners" :key="id" :value="id">{{ name }}</option></select></label>
      </div>
      <div class="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3 text-sm text-gray-600"><span>Filtres cumulables · calculs de démonstration</span><button v-if="hasFilters" type="button" class="min-h-10 rounded-lg px-2 font-semibold text-indigo-700 hover:bg-indigo-50" @click="resetFilters">Effacer les filtres</button></div>
    </div>

    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <header class="flex flex-wrap items-baseline gap-2 px-5 py-4"><h2 class="font-cabinet-grotesk text-lg font-bold">Placements fictifs</h2><span role="status" class="text-sm text-gray-600">{{ filtered.length }} sur {{ prestations.length }} prestations</span></header>
      <div class="overflow-x-auto"><table class="w-full min-w-[1100px] text-left text-sm">
        <thead class="border-y border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-600"><tr><th scope="col" class="px-5 py-3">Mission / architecte</th><th scope="col" class="px-3 py-3">Client / partenaire</th><th scope="col" class="px-3 py-3">Commercial</th><th scope="col" class="px-3 py-3">Période</th><th scope="col" class="px-3 py-3">Prestation</th><th scope="col" class="px-3 py-3">Règle</th><th scope="col" class="px-3 py-3">Commission HT</th><th scope="col" class="px-5 py-3 text-right">Détail</th></tr></thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="item in filtered" :key="item.id" class="hover:bg-indigo-50/40">
            <td class="px-5 py-4"><span class="font-semibold">{{ item.missionTitle }}</span><span class="block text-gray-600">{{ item.talentName }}</span><span class="block text-xs text-gray-500">Exemple · {{ item.id }}</span></td>
            <td class="px-3 py-4 text-gray-700">{{ item.clientName }}<span class="block text-xs text-gray-500">Porteur : {{ item.partnerName ?? 'Aucun' }}</span></td>
            <td class="px-3 py-4 text-gray-700">{{ item.commercialOwner }}</td>
            <td class="px-3 py-4 text-gray-700">{{ date(item.startDate) }}<span class="block text-xs text-gray-500">au {{ date(item.endDate) }}</span></td>
            <td class="px-3 py-4 text-gray-700">{{ prestationLabels[item.status] }}</td>
            <td class="px-3 py-4 text-gray-700">{{ modelLabels[item.remuneration.model] }}</td>
            <td class="px-3 py-4"><strong class="block">{{ currency(item.commission.amount) }}</strong><span class="mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold" :class="commissionStyles[item.commissionStatus]">{{ commissionLabels[item.commissionStatus] }}</span></td>
            <td class="px-5 py-4 text-right"><button type="button" class="whitespace-nowrap font-semibold text-indigo-700 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-indigo-600" :aria-label="`Voir le détail de ${item.missionTitle}`" @click="openDetail(item.id, $event)">Voir le détail</button></td>
          </tr>
          <tr v-if="!filtered.length"><td colspan="8" class="px-5 py-10 text-center text-gray-600">Aucune prestation fictive ne correspond aux filtres. Modifiez-les ou effacez-les.</td></tr>
        </tbody>
      </table></div>
    </div>

    <div v-if="selected" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-3 sm:p-5" @click.self="closeDetail">
      <div ref="dialog" role="dialog" aria-modal="true" aria-labelledby="prestation-detail-title" tabindex="-1" class="max-h-[94dvh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-5 shadow-xl outline-none sm:p-7">
        <div class="flex items-start justify-between gap-4"><div><p class="text-xs font-bold uppercase tracking-wider text-indigo-700">Exemple fictif · {{ selected.id }}</p><h2 id="prestation-detail-title" class="mt-1 font-cabinet-grotesk text-2xl font-bold">{{ selected.missionTitle }}</h2></div><button type="button" class="min-h-10 shrink-0 rounded-lg border border-gray-300 px-3 text-sm font-semibold hover:bg-gray-50" @click="closeDetail">Fermer</button></div>
        <dl class="mt-5 grid gap-x-5 gap-y-3 rounded-lg bg-gray-50 p-4 text-sm sm:grid-cols-2"><div><dt class="text-gray-500">Architecte</dt><dd class="font-semibold">{{ selected.talentName }}</dd></div><div><dt class="text-gray-500">Client</dt><dd class="font-semibold">{{ selected.clientName }}</dd></div><div><dt class="text-gray-500">Partenaire porteur</dt><dd class="font-semibold">{{ selected.partnerName ?? 'Aucun' }}</dd></div><div><dt class="text-gray-500">Responsable commercial actuel</dt><dd class="font-semibold">{{ selected.commercialOwner }}</dd></div><div><dt class="text-gray-500">Début / fin prévue ou constatée</dt><dd class="font-semibold">{{ date(selected.startDate) }} / {{ date(selected.endDate) }}</dd></div><div><dt class="text-gray-500">Statut de prestation</dt><dd class="font-semibold">{{ prestationLabels[selected.status] }}</dd></div></dl>
        <section class="mt-6" aria-labelledby="commission-detail-title"><h3 id="commission-detail-title" class="font-cabinet-grotesk text-lg font-bold">Calcul de la commission HT</h3><p class="mt-2 text-sm text-gray-700">{{ modelLabels[selected.remuneration.model] }} · {{ commissionLabels[selected.commissionStatus] }}</p><p v-if="selected.remuneration.model === 'FIXED_SUCCESS_FEE'" class="mt-2 text-sm text-gray-700">{{ currency(selected.remuneration.fixedAmount) }} × {{ selected.commission.acquired ? '1 premier jour réellement travaillé et facturable confirmé le ' + date(selected.firstBillableWorkDate) : '0 jour réellement travaillé et facturable confirmé' }} = <strong>{{ currency(selected.commission.amount) }} HT</strong>. Une interruption ultérieure ne retire pas ce droit.</p><p v-else class="mt-2 text-sm text-gray-700">{{ currency(selected.remuneration.negotiatedDailyRate) }} HT / jour × {{ selected.commission.validatedDays }} journées validées = <strong>{{ currency(selected.commission.amount) }} HT</strong>. Ce tarif est celui de la commission négociée, pas le TJM de l'architecte.</p><p v-if="selected.commissionStatus === 'DISPUTED'" class="mt-2 text-sm font-semibold text-rose-800">Montant calculé, actuellement contesté : aucun règlement n'est déduit de ce statut.</p></section>
        <section class="mt-6" aria-labelledby="statement-title"><h3 id="statement-title" class="font-cabinet-grotesk text-lg font-bold">Relevé mensuel simulé</h3><div class="mt-2 overflow-x-auto rounded-lg border border-gray-200"><table class="w-full min-w-[360px] text-left text-sm"><thead class="bg-gray-50 text-gray-600"><tr><th scope="col" class="px-3 py-2">Mois</th><th scope="col" class="px-3 py-2 text-right">Déclarées</th><th scope="col" class="px-3 py-2 text-right">Validées</th><th scope="col" class="px-3 py-2 text-right">En attente</th></tr></thead><tbody><tr v-for="statement in selected.monthlyStatements" :key="statement.month" class="border-t border-gray-100"><td class="px-3 py-2 capitalize">{{ monthLabel(statement.month) }}</td><td class="px-3 py-2 text-right">{{ statement.declaredDays }}</td><td class="px-3 py-2 text-right">{{ statement.validatedDays }}</td><td class="px-3 py-2 text-right">{{ statement.declaredDays - statement.validatedDays }}</td></tr></tbody></table></div><p class="mt-2 text-xs text-gray-600">Le relevé est un exemple non modifiable ; seul le premier jour billable confirmé déclenche le forfait.</p></section>
        <section class="mt-6 border-t border-gray-200 pt-5" aria-labelledby="transfer-title"><h3 id="transfer-title" class="font-cabinet-grotesk text-lg font-bold">Suivi commercial</h3><p class="mt-1 text-sm text-gray-600">Changer de responsable n'ajuste ni l'accord commercial, ni la règle, ni le montant ou le statut de la commission.</p><form class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end" @submit.prevent="transferOwner"><label class="flex-1 text-sm font-semibold text-gray-700">Nouveau responsable commercial<input v-model="newOwner" type="text" required maxlength="120" autocomplete="off" class="mt-1 w-full rounded-lg border-gray-300 text-sm focus:border-indigo-600 focus:ring-indigo-600" /></label><button type="submit" class="min-h-10 rounded-lg bg-indigo-700 px-4 text-sm font-semibold text-white hover:bg-indigo-800">Enregistrer le transfert</button></form><p v-if="error" role="alert" class="mt-3 rounded-lg bg-rose-50 p-3 text-sm text-rose-900">{{ error }}</p><p v-if="notice" role="status" class="mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">{{ notice }}</p><h4 class="mt-5 text-sm font-bold">Historique des transferts</h4><ol v-if="selected.transfers.length" class="mt-2 space-y-2 text-sm"><li v-for="transfer in [...selected.transfers].reverse()" :key="transfer.id" class="rounded-lg border border-gray-200 p-3">{{ transfer.fromOwner }} → {{ transfer.toOwner }} · {{ timestamp(transfer.transferredAt) }} (simulation)</li></ol><p v-else class="mt-2 text-sm text-gray-600">Aucun transfert enregistré.</p></section>
      </div>
    </div>
  </section>
</template>
