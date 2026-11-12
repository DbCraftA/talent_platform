<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 px-4" role="dialog" aria-modal="true" :aria-labelledby="`${id}-title`" @click.self="requestClose" @keydown="handleKeydown">
    <div ref="content" class="w-full max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-7" tabindex="-1">
      <div v-if="status !== 'success'" class="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 :id="`${id}-title`" class="text-2xl font-bold text-gray-900">Recevoir l'étude complète</h2>
          <p class="mt-2 text-sm text-gray-500">{{ description }}</p>
        </div>
        <button class="rounded-full p-1 text-gray-500 hover:bg-gray-100" type="button" aria-label="Fermer" :disabled="status === 'submitting'" @click="requestClose">✕</button>
      </div>

      <form v-if="status !== 'success'" class="space-y-5" @submit.prevent="$emit('submit', { ...form })">
        <div class="space-y-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div>
            <label class="mb-1 block text-sm font-medium" :for="`${id}-email`">Email du destinataire <span class="text-red-500">*</span></label>
            <input :id="`${id}-email`" ref="emailInput" v-model="form.recipientEmail" class="form-input w-full" type="email" placeholder="prenom@entreprise.fr" required :disabled="status === 'submitting'" />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium" :for="`${id}-name`">Nom du destinataire <span class="text-red-500">*</span></label>
            <input :id="`${id}-name`" v-model="form.recipientName" class="form-input w-full" type="text" placeholder="Pierre" required :disabled="status === 'submitting'" />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium" :for="`${id}-role`">Rôle</label>
            <select :id="`${id}-role`" v-model="form.recipientRole" class="form-select w-full text-sm" :disabled="status === 'submitting'">
              <option value="">Sélectionner un rôle</option>
              <option v-for="role in roleOptions" :key="role" :value="role">{{ role }}</option>
            </select>
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium" :for="`${id}-comment`">Commentaire</label>
            <textarea :id="`${id}-comment`" v-model="form.comment" class="form-textarea w-full text-sm" rows="4" placeholder="Une question, une contrainte ou un contexte particulier ?" :disabled="status === 'submitting'"></textarea>
          </div>
          <div class="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label :for="`${id}-website`">Website</label>
            <input :id="`${id}-website`" v-model="form.website" name="website" type="text" tabindex="-1" autocomplete="off" />
          </div>
        </div>

        <div v-if="errorMessage" class="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800" role="alert">{{ errorMessage }}</div>
        <div class="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
          <button class="btn-sm bg-white text-gray-700 shadow-sm" type="button" :disabled="status === 'submitting'" @click="requestClose">Annuler</button>
          <button class="btn-sm bg-gray-900 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70" type="submit" :disabled="status === 'submitting'">
            <svg v-if="status === 'submitting'" class="mr-2 h-4 w-4 animate-spin fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ status === 'submitting' ? 'Envoi en cours…' : "Envoyer l'étude" }}
          </button>
        </div>
      </form>

      <div v-else class="py-3 text-center">
        <svg class="mx-auto mb-6 h-16 w-16 fill-current" viewBox="0 0 64 64" aria-hidden="true"><circle class="text-green-500/20" cx="32" cy="32" r="32" /><path class="text-green-700" d="M37.22 26.375a1 1 0 1 1 1.56 1.25l-8 10a1 1 0 0 1-1.487.082l-4-4a1 1 0 0 1 1.414-1.414l3.21 3.21 7.302-9.128Z" /></svg>
        <h2 :id="`${id}-title`" class="text-2xl font-bold text-gray-900">Étude envoyée</h2>
        <p class="mt-3 text-sm text-gray-500">L'étude a été envoyée à<br /><span class="font-bold text-gray-900">{{ successRecipient }}</span>.</p>
        <button ref="successButton" class="btn-sm mt-6 bg-gray-900 text-white hover:bg-gray-800" type="button" @click="requestClose">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  open: { type: Boolean, required: true },
  status: { type: String, default: 'idle' },
  description: { type: String, required: true },
  roleOptions: { type: Array, default: () => [] },
  errorMessage: { type: String, default: '' },
  successRecipient: { type: String, default: '' },
})
const emit = defineEmits(['close', 'submit'])
const content = ref(null)
const emailInput = ref(null)
const successButton = ref(null)
const form = ref({ recipientEmail: '', recipientName: '', recipientRole: '', comment: '', website: '' })
let returnFocus = null

watch(() => props.open, async (open) => {
  if (open) {
    returnFocus = document.activeElement
    form.value = { recipientEmail: '', recipientName: '', recipientRole: '', comment: '', website: '' }
    await nextTick()
    emailInput.value?.focus()
  } else {
    await nextTick()
    if (returnFocus?.isConnected) returnFocus.focus()
    returnFocus = null
  }
})

watch(() => props.status, async (status) => {
  if (status === 'success' && props.open) {
    await nextTick()
    successButton.value?.focus()
  } else if (status === 'submitting' && props.open) {
    await nextTick()
    content.value?.focus()
  }
})

function requestClose() {
  if (props.status !== 'submitting') emit('close')
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    if (props.status !== 'submitting') {
      event.preventDefault()
      requestClose()
    }
    return
  }
  if (event.key !== 'Tab') return
  const focusable = [...content.value.querySelectorAll('button:not(:disabled), input:not(:disabled):not([tabindex="-1"]), select:not(:disabled), textarea:not(:disabled)')]
  if (!focusable.length) { event.preventDefault(); content.value.focus(); return }
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && (document.activeElement === first || document.activeElement === content.value)) { event.preventDefault(); last.focus() }
  else if (!event.shiftKey && (document.activeElement === last || document.activeElement === content.value)) { event.preventDefault(); first.focus() }
}
</script>
