<script setup>
import { demoAccounts } from '../mocks/session.js'

defineProps({ modelValue: { type: String, required: true } })
const emit = defineEmits(['update:modelValue', 'select'])

function select(event) {
  const account = demoAccounts.find((entry) => entry.id === event.target.value)
  emit('update:modelValue', account.id)
  emit('select', account.email)
}
</script>

<template>
  <div class="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
    <label for="demo-account" class="mb-2 block text-sm font-bold text-indigo-900">DEV / MOCK : compte de démonstration</label>
    <select id="demo-account" :value="modelValue" class="w-full rounded-lg border-indigo-200 bg-white text-gray-900 focus:border-indigo-600 focus:ring-indigo-600" @change="select">
      <option v-for="account in demoAccounts" :key="account.id" :value="account.id">{{ account.role === 'ADMIN' ? 'Administrateur (simulation)' : 'Freelance (simulation)' }}</option>
    </select>
    <p class="mt-2 text-xs text-indigo-900">Ce choix simule un parcours, sans authentification ni droit d'accès réel.</p>
  </div>
</template>
