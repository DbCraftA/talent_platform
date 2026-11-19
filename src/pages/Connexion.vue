<script setup>
import { defineAsyncComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mockAuthService } from '../services/authService.js'

const isDev = import.meta.env.DEV
const DemoAccountSelect = isDev ? defineAsyncComponent(() => import('../components/DemoAccountSelect.vue')) : null
const router = useRouter()
const accountId = ref(isDev ? 'demo-freelance' : '')
const email = ref('')
const password = ref('')
const errors = ref({})
const notice = ref('')

function selectAccount(selectedEmail) {
  email.value = selectedEmail
  password.value = ''
  errors.value = {}
  notice.value = ''
}

async function submit() {
  const nextErrors = {}
  const normalizedEmail = email.value.trim()
  if (!normalizedEmail) nextErrors.email = 'Saisissez votre adresse e-mail.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) nextErrors.email = 'Saisissez une adresse e-mail valide.'
  if (!password.value.trim()) nextErrors.password = 'Saisissez un mot de passe.'

  errors.value = nextErrors
  notice.value = ''
  if (Object.keys(nextErrors).length) return

  try {
    const { destination } = await mockAuthService({ email: email.value, password: password.value, accountId: accountId.value })
    password.value = ''
    notice.value = 'Connexion de démonstration réussie. Redirection en cours.'
    await router.push(destination)
  } catch (error) {
    notice.value = error.message
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
        <h1 class="font-cabinet-grotesk text-4xl font-bold tracking-tight sm:text-5xl">Connexion</h1>
        <p class="mt-4 text-gray-600">Retrouvez votre espace freelance. L'accès de démonstration est réservé au développement.</p>

        <form class="mt-9 space-y-5" novalidate @submit.prevent="submit">
          <DemoAccountSelect v-if="isDev" v-model="accountId" @select="selectAccount" />

          <div>
            <label for="email" class="mb-2 block text-sm font-medium">Adresse e-mail</label>
            <input id="email" v-model="email" type="email" autocomplete="username" inputmode="email" required :aria-invalid="Boolean(errors.email)" :aria-describedby="errors.email ? 'email-error' : undefined" class="w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" />
            <p v-if="errors.email" id="email-error" class="mt-1 text-sm text-red-700">{{ errors.email }}</p>
          </div>
          <div>
            <label for="password" class="mb-2 block text-sm font-medium">Mot de passe</label>
            <input id="password" v-model="password" type="password" autocomplete="current-password" required :aria-invalid="Boolean(errors.password)" :aria-describedby="errors.password ? 'password-error' : undefined" class="w-full rounded-lg border-gray-300 px-4 py-3 focus:border-indigo-600 focus:ring-indigo-600" />
            <p v-if="errors.password" id="password-error" class="mt-1 text-sm text-red-700">{{ errors.password }}</p>
          </div>

          <p v-if="notice" role="status" aria-live="polite" class="rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-900">{{ notice }}</p>
          <button type="submit" class="w-full rounded-lg bg-gray-900 px-5 py-3 font-cabinet-grotesk font-bold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Se connecter</button>
        </form>

        <p class="mt-7 border-t border-gray-200 pt-6 text-sm text-gray-600">Pas encore membre ? <router-link to="/inscription" class="font-bold text-indigo-700 underline underline-offset-4 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Rejoindre la communauté</router-link></p>
      </div>
    </div>

    <aside class="relative hidden overflow-hidden bg-linear-to-b from-indigo-100 to-white px-10 py-16 text-gray-900 lg:flex lg:items-center lg:justify-center" aria-label="Présentation de votre espace Wenovat">
      <img src="../images/auth-illustration.svg" alt="" class="pointer-events-none absolute inset-0 h-full w-full object-cover" />

    </aside>
  </main>
</template>
