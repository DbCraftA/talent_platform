<script setup>
import { ref } from 'vue'
import { getMockSession } from '../services/authService.js'
import { getMockQualification, setMockQualification } from '../services/qualificationService.js'

const session = import.meta.env.DEV ? getMockSession() : null
const qualification = ref(getMockQualification('demo-freelance'))
const notice = ref('')

function toggleQualification() {
  try {
    qualification.value = setMockQualification('demo-freelance', qualification.value === 'QUALIFIED' ? 'NOT_EVALUATED' : 'QUALIFIED', session)
    notice.value = 'Décision de qualification de démonstration enregistrée sur cet appareil.'
  } catch (error) {
    notice.value = error.message
  }
}
</script>

<template>
  <section class="rounded-2xl border border-indigo-100 bg-white font-aspekta text-gray-900 shadow-sm">
    <div class="w-full max-w-2xl px-6 py-12 sm:px-10">
      <h1 class="font-cabinet-grotesk text-4xl font-bold">{{ session?.role === 'ADMIN' ? 'Parcours administrateur (DEV / MOCK)' : 'Aperçu indisponible' }}</h1>
      <p class="mt-5 text-lg text-gray-700">{{ session?.role === 'ADMIN' ? 'Simulation locale du parcours administrateur.' : 'Cette destination n’est pas un portail administrateur public.' }}</p>
      <p class="mt-3 text-gray-700">Aucun accès administrateur réel ni décision transmise à Wenovat.</p>
      <div v-if="session?.role === 'ADMIN'" class="mt-7 rounded-xl border border-indigo-100 bg-indigo-50 p-5">
        <h2 class="font-cabinet-grotesk text-xl font-bold">Qualification du compte freelance de démonstration</h2>
        <p class="mt-2 text-sm text-gray-700">Statut simulé : {{ qualification === 'QUALIFIED' ? 'Qualifié Wenovat' : 'Non évalué' }}. Ce contrôle est réservé à la maquette DEV.</p>
        <button type="button" class="mt-4 rounded-lg bg-indigo-700 px-4 py-2 font-semibold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="toggleQualification">{{ qualification === 'QUALIFIED' ? 'Retirer la qualification simulée' : 'Qualifier le compte de démonstration' }}</button>
        <p v-if="notice" role="status" class="mt-3 text-sm text-indigo-900">{{ notice }}</p>
      </div>
      <div class="mt-8 flex flex-wrap gap-4">
        <router-link to="/connexion" class="rounded-lg bg-gray-900 px-5 py-3 font-bold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Retour à la connexion</router-link>
        <router-link to="/" class="rounded-lg border border-indigo-300 px-5 py-3 font-bold text-indigo-800 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Accueil Wenovat</router-link>
      </div>
    </div>
  </section>
</template>
