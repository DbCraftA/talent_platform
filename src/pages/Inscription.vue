<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { mockRegisterFreelance } from '../services/authService.js'

const router = useRouter()
const lastName = ref('')
const firstName = ref('')
const email = ref('')
const password = ref('')
const specialty = ref('')
const consent = ref(false)
const errors = ref({})
const notice = ref('')
const submitting = ref(false)

async function submit() {
  const nextErrors = {}
  if (!lastName.value.trim()) nextErrors.lastName = 'Saisissez votre nom.'
  if (!firstName.value.trim()) nextErrors.firstName = 'Saisissez votre prénom.'
  const normalizedEmail = email.value.trim()
  if (!normalizedEmail) nextErrors.email = 'Saisissez votre adresse e-mail.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) nextErrors.email = 'Saisissez une adresse e-mail valide.'
  if (!password.value.trim()) nextErrors.password = 'Saisissez un mot de passe simulé.'
  if (!consent.value) nextErrors.consent = 'Confirmez votre consentement au prototype.'

  errors.value = nextErrors
  notice.value = ''
  if (Object.keys(nextErrors).length || submitting.value) return

  submitting.value = true
  try {
    const { destination } = await mockRegisterFreelance({
      lastName: lastName.value,
      firstName: firstName.value,
      email: email.value,
      password: password.value,
      specialty: specialty.value,
      consent: consent.value,
    })
    password.value = ''
    notice.value = 'Inscription de démonstration enregistrée. Redirection vers votre espace.'
    await router.push(destination)
  } catch (error) {
    notice.value = error.message
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="min-h-screen bg-white font-aspekta text-gray-900 lg:grid lg:grid-cols-2">
    <div class="flex min-h-screen flex-col">
      <header class="flex items-center justify-between gap-4 px-5 py-3 sm:px-10">
        <router-link to="/" aria-label="Wenovat - accueil" class="rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <img src="../images/logo.png" width="120" height="60" alt="Wenovat" />
        </router-link>
        <router-link to="/" class="text-sm font-medium text-indigo-700 underline underline-offset-4 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Retour à l'accueil</router-link>
      </header>

      <div class="mx-auto flex w-full max-w-md grow flex-col justify-center px-5 py-10 sm:px-8">
        <p class="mb-3 text-sm font-bold uppercase tracking-wider text-indigo-700">Espace membre Wenovat</p>
        <h1 class="font-cabinet-grotesk text-4xl font-bold tracking-tight sm:text-5xl">Rejoindre la communauté</h1>
        <p class="mt-4 text-gray-600">Inscription ouverte aux architectes freelances. La qualification Wenovat est décidée uniquement par un administrateur, après l'inscription.</p>

        <form class="mt-9 space-y-5" novalidate @submit.prevent="submit">
          <div>
            <label for="signup-last-name" class="mb-2 block text-sm font-medium">Nom <span class="text-red-700">*</span></label>
            <input id="signup-last-name" v-model="lastName" type="text" autocomplete="family-name" required :aria-invalid="Boolean(errors.lastName)" :aria-describedby="errors.lastName ? 'signup-last-name-error' : undefined" class="w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" />
            <p v-if="errors.lastName" id="signup-last-name-error" class="mt-1 text-sm text-red-700">{{ errors.lastName }}</p>
          </div>
          <div>
            <label for="signup-first-name" class="mb-2 block text-sm font-medium">Prénom <span class="text-red-700">*</span></label>
            <input id="signup-first-name" v-model="firstName" type="text" autocomplete="given-name" required :aria-invalid="Boolean(errors.firstName)" :aria-describedby="errors.firstName ? 'signup-first-name-error' : undefined" class="w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" />
            <p v-if="errors.firstName" id="signup-first-name-error" class="mt-1 text-sm text-red-700">{{ errors.firstName }}</p>
          </div>
          <div>
            <label for="signup-email" class="mb-2 block text-sm font-medium">Adresse e-mail <span class="text-red-700">*</span></label>
            <input id="signup-email" v-model="email" type="email" autocomplete="email" inputmode="email" required :aria-invalid="Boolean(errors.email)" :aria-describedby="errors.email ? 'signup-email-error' : undefined" class="w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" />
            <p v-if="errors.email" id="signup-email-error" class="mt-1 text-sm text-red-700">{{ errors.email }}</p>
          </div>
          <div>
            <label for="signup-specialty" class="mb-2 block text-sm font-medium">Spécialité principale <span class="text-gray-500">(facultatif)</span></label>
            <select id="signup-specialty" v-model="specialty" class="w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600">
              <option value="">Choisir une spécialité</option>
              <option value="CLOUD">Cloud</option>
              <option value="DATA">Data</option>
              <option value="IA">IA</option>
              <option value="CYBER">Cyber</option>
              <option value="ENTERPRISE_ARCHITECTURE">Architecture d'entreprise</option>
            </select>
          </div>
          <div>
            <label for="signup-password" class="mb-2 block text-sm font-medium">Mot de passe simulé <span class="text-red-700">*</span></label>
            <input id="signup-password" v-model="password" type="password" autocomplete="new-password" required :aria-invalid="Boolean(errors.password)" :aria-describedby="errors.password ? 'signup-password-error' : 'signup-password-help'" class="w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" />
            <p id="signup-password-help" class="mt-1 text-sm text-gray-600">Ce mot de passe n'est ni enregistré ni utilisé pour créer un compte réel.</p>
            <p v-if="errors.password" id="signup-password-error" class="mt-1 text-sm text-red-700">{{ errors.password }}</p>
          </div>
          <div>
            <label class="flex items-start gap-3 text-sm text-gray-700" for="signup-consent">
              <input id="signup-consent" v-model="consent" type="checkbox" required :aria-invalid="Boolean(errors.consent)" :aria-describedby="errors.consent ? 'signup-consent-error' : undefined" class="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              <span>Je comprends que cette inscription est une démonstration, sans création de compte ni authentification réelle. <span class="text-red-700">*</span></span>
            </label>
            <p v-if="errors.consent" id="signup-consent-error" class="mt-1 text-sm text-red-700">{{ errors.consent }}</p>
          </div>

          <p v-if="notice" role="status" aria-live="polite" class="rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-900">{{ notice }}</p>
          <button type="submit" :disabled="submitting" class="w-full rounded-lg bg-gray-900 px-5 py-3 font-cabinet-grotesk font-bold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait disabled:opacity-60">S'inscrire à la démonstration</button>
        </form>

        <p class="mt-7 border-t border-gray-200 pt-6 text-sm text-gray-600">Déjà membre ? <router-link to="/connexion" class="font-bold text-indigo-700 underline underline-offset-4 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Se connecter</router-link></p>
      </div>
    </div>

    <aside class="relative hidden overflow-hidden bg-linear-to-b from-indigo-100 to-white px-10 py-16 text-gray-900 lg:flex lg:items-center lg:justify-center" aria-label="Présentation de votre espace Wenovat">
      <img src="../images/auth-illustration.svg" alt="" class="pointer-events-none absolute inset-0 h-full w-full object-cover" />
    </aside>
  </main>
</template>
