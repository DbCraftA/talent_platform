<template>
  <form ref="formElement" class="mb-12 space-y-8" novalidate :aria-busy="loading" @submit.prevent="submitForm" @input="startForm" @change="formChanged">
    <div v-if="Object.keys(errors).length" class="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-900" role="alert" aria-labelledby="development-ai-error-title">
      <h2 id="development-ai-error-title" class="font-bold">Vérifiez les réponses suivantes avant de lancer l’analyse :</h2>
      <ul class="mt-3 list-disc space-y-1 pl-5">
        <li v-for="(message, field) in errors" :key="field">
          <a class="underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" :href="`#${fieldId(field)}`">{{ fieldLabels[field] }} : {{ message }}</a>
        </li>
      </ul>
    </div>

    <section aria-labelledby="development-ai-project-title">
      <h2 id="development-ai-project-title" class="mb-5 text-lg font-bold text-gray-800"><span class="text-indigo-500">1.</span> Votre projet</h2>
      <div class="space-y-4">
        <FieldSelect v-for="field in projectFields" :id="fieldId(field.key)" :key="field.key" v-model="form[field.key]" :name="field.key" :label="field.label" :options="developmentAiOptions[field.key]" :help="field.help" :error="errors[field.key]" :disabled="loading" placeholder="Sélectionnez une réponse" required />
      </div>
    </section>

    <section aria-labelledby="development-ai-organization-title">
      <h2 id="development-ai-organization-title" class="mb-5 text-lg font-bold text-gray-800"><span class="text-indigo-500">2.</span> Votre organisation</h2>
      <div class="space-y-4">
        <FieldSelect v-for="field in organizationFields" :id="fieldId(field.key)" :key="field.key" v-model="form[field.key]" :name="field.key" :label="field.label" :options="developmentAiOptions[field.key]" :help="field.help" :error="errors[field.key]" :disabled="loading" placeholder="Sélectionnez une réponse" required />

        <fieldset :aria-describedby="describedBy('profiles')" :aria-invalid="Boolean(errors.profiles)">
          <legend class="text-sm font-medium text-gray-800">Quels profils participent au projet ? <span class="font-normal text-gray-500">Optionnel</span></legend>
          <p :id="`${fieldId('profiles')}-help`" class="mt-1 text-xs text-gray-500">Plusieurs réponses possibles. Laissez vide si vous ne souhaitez pas préciser.</p>
          <div class="mt-2 grid gap-x-4 gap-y-2 min-[360px]:grid-cols-2">
            <label v-for="(option, index) in developmentAiOptions.profiles" :key="option.value" class="flex cursor-pointer items-center gap-2 text-sm text-gray-800 focus-within:underline">
              <input :id="index === 0 ? fieldId('profiles') : `${fieldId('profiles')}-${index}`" v-model="form.profiles" class="form-checkbox shrink-0 text-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500" type="checkbox" name="profiles" :value="option.value" :disabled="loading" :aria-invalid="Boolean(errors.profiles)" :aria-describedby="describedBy('profiles')" />
              <span>{{ option.label }}</span>
            </label>
          </div>
          <p v-if="errors.profiles" :id="`${fieldId('profiles')}-error`" class="mt-2 text-sm font-medium text-red-700">{{ errors.profiles }}</p>
        </fieldset>

        <fieldset :aria-describedby="describedBy('aiUsage')" :aria-invalid="Boolean(errors.aiUsage)">
          <legend class="text-sm font-medium text-gray-800">Quel est l’usage actuel de l’IA par l’équipe ? <span class="text-red-500" aria-hidden="true">*</span></legend>
          <p :id="`${fieldId('aiUsage')}-help`" class="mt-1 text-xs text-gray-500">Sélectionnez la situation actuelle, ou « Je ne sais pas ».</p>
          <div class="mt-2 space-y-2">
            <label v-for="(option, index) in developmentAiOptions.aiUsage" :key="option.value" class="flex cursor-pointer items-start gap-2 text-sm text-gray-800 focus-within:underline">
              <input :id="index === 0 ? fieldId('aiUsage') : `${fieldId('aiUsage')}-${index}`" v-model="form.aiUsage" class="form-radio mt-0.5 shrink-0 text-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500" type="radio" name="aiUsage" :value="option.value" :disabled="loading" :aria-invalid="Boolean(errors.aiUsage)" :aria-describedby="describedBy('aiUsage')" required />
              <span><span class="block">{{ option.label }}</span><span class="block text-xs text-gray-500">{{ option.description }}</span></span>
            </label>
          </div>
          <p v-if="errors.aiUsage" :id="`${fieldId('aiUsage')}-error`" class="mt-2 text-sm font-medium text-red-700">{{ errors.aiUsage }}</p>
        </fieldset>
      </div>
    </section>

    <section aria-labelledby="development-ai-objectives-title">
      <h2 id="development-ai-objectives-title" class="mb-5 text-lg font-bold text-gray-800"><span class="text-indigo-500">3.</span> Vos objectifs</h2>
      <div class="space-y-4">
        <FieldSelect :id="fieldId('priority')" v-model="form.priority" name="priority" label="Quelle est votre priorité principale ?" :options="developmentAiOptions.priority" help="Choisissez un objectif, même si plusieurs vous intéressent." :error="errors.priority" :disabled="loading" placeholder="Sélectionnez une réponse" required />
        <fieldset :aria-describedby="describedBy('assistedStages')" :aria-invalid="Boolean(errors.assistedStages)">
          <legend class="text-sm font-medium text-gray-800">À quelles étapes souhaitez-vous une assistance IA ? <span class="font-normal text-gray-500">Optionnel</span></legend>
          <p :id="`${fieldId('assistedStages')}-help`" class="mt-1 text-xs text-gray-500">Plusieurs étapes possibles. Si vous hésitez, choisissez « Je ne sais pas » ou laissez vide.</p>
          <div class="mt-2 grid gap-x-4 gap-y-2 min-[360px]:grid-cols-2">
            <label v-for="(option, index) in developmentAiOptions.assistedStages" :key="option.value" class="flex cursor-pointer items-center gap-2 text-sm text-gray-800 focus-within:underline">
              <input :id="index === 0 ? fieldId('assistedStages') : `${fieldId('assistedStages')}-${index}`" v-model="form.assistedStages" class="form-checkbox shrink-0 text-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500" type="checkbox" name="assistedStages" :value="option.value" :disabled="loading" :aria-invalid="Boolean(errors.assistedStages)" :aria-describedby="describedBy('assistedStages')" />
              <span>{{ option.label }}</span>
            </label>
          </div>
          <p v-if="errors.assistedStages" :id="`${fieldId('assistedStages')}-error`" class="mt-2 text-sm font-medium text-red-700">{{ errors.assistedStages }}</p>
        </fieldset>
      </div>
    </section>

    <section aria-labelledby="development-ai-constraints-title">
      <h2 id="development-ai-constraints-title" class="mb-5 text-lg font-bold text-gray-800"><span class="text-indigo-500">4.</span> Vos contraintes et outils</h2>
      <div class="space-y-4">
        <FieldSelect v-for="field in constraintFields" :id="fieldId(field.key)" :key="field.key" v-model="form[field.key]" :name="field.key" :label="field.label" :options="developmentAiOptions[field.key]" :help="field.help" :error="errors[field.key]" :disabled="loading" placeholder="Sélectionnez une réponse" required />
        <fieldset :aria-describedby="describedBy('languages')" :aria-invalid="Boolean(errors.languages)">
          <legend class="text-sm font-medium text-gray-800">Quels langages utilisez-vous ? <span class="font-normal text-gray-500">Optionnel</span></legend>
          <p :id="`${fieldId('languages')}-help`" class="mt-1 text-xs text-gray-500">Sélectionnez plusieurs langages si nécessaire, ou laissez vide.</p>
          <div class="mt-2 grid gap-x-4 gap-y-2 min-[360px]:grid-cols-2">
            <label v-for="(option, index) in developmentAiOptions.languages" :key="option.value" class="flex cursor-pointer items-center gap-2 text-sm text-gray-800 focus-within:underline">
              <input :id="index === 0 ? fieldId('languages') : `${fieldId('languages')}-${index}`" v-model="form.languages" class="form-checkbox shrink-0 text-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500" type="checkbox" name="languages" :value="option.value" :disabled="loading" :aria-invalid="Boolean(errors.languages)" :aria-describedby="describedBy('languages')" />
              <span>{{ option.label }}</span>
            </label>
          </div>
          <p v-if="errors.languages" :id="`${fieldId('languages')}-error`" class="mt-2 text-sm font-medium text-red-700">{{ errors.languages }}</p>
        </fieldset>
      </div>
    </section>

    <section class="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5" aria-labelledby="development-ai-advanced-title">
      <div class="mb-5">
        <h2 id="development-ai-advanced-title" class="text-lg font-bold text-gray-800"><span class="text-indigo-500">5.</span> Préciser le contexte — optionnel</h2>
        <p class="mt-1 text-sm text-gray-500">Renseignez seulement ce que vous savez. Les champs vides ne sont pas envoyés ; « Je ne sais pas » est transmis si vous le choisissez.</p>
      </div>
      <div class="space-y-4">
        <FieldSelect v-for="field in advancedFields" :id="fieldId(field.key)" :key="field.key" v-model="form[field.key]" :name="field.key" :label="field.label" :options="developmentAiOptions[field.key]" :help="field.help" :error="errors[field.key]" :disabled="loading" placeholder="Ne pas préciser" :placeholder-disabled="false" />
      </div>
    </section>

    <button class="btn-sm w-full justify-center bg-gray-900 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70" type="submit" :disabled="loading">{{ loading ? 'Analyse en cours…' : 'Analyser mon projet' }}</button>
    <p class="-mt-6 text-center text-xs text-gray-500">Les réponses marquées d'un * sont nécessaires ; « Je ne sais pas » est une réponse possible.</p>
  </form>
</template>

<script setup>
import { nextTick, reactive, ref } from 'vue'
import { developmentAiOptions } from '../../config/developmentAiOptions.js'
import { buildDevelopmentPayload, createDevelopmentFormState, validateDevelopmentForm } from '../../lib/developmentAi/payload.js'
import { isDevelopmentDemoEnabled } from '../../lib/developmentAi/demoMode.js'
import FieldSelect from '../simulator/FieldSelect.vue'

const props = defineProps({ loading: { type: Boolean, default: false } })
const emit = defineEmits(['submit', 'changed', 'started'])

const form = reactive(createDevelopmentFormState())
let started = false
if (import.meta.env.DEV && isDevelopmentDemoEnabled(import.meta.env)) {
  import('../../lib/developmentAi/demoFixture.js').then(({ demoDevelopmentForm }) => {
    // Do not overwrite a choice made while the local fixture was loading.
    if (!started) Object.assign(form, demoDevelopmentForm)
  })
}
const formElement = ref(null)
const errors = ref({})
const attempted = ref(false)

const projectFields = [
  { key: 'projectType', label: 'Quel type de projet ?', help: 'Choisissez le contexte du produit à analyser.' },
  { key: 'projectMaturity', label: 'À quel stade en est-il ?', help: 'Indiquez sa maturité actuelle.' },
  { key: 'projectDomain', label: 'Quel est le domaine du projet ?', help: 'Décrivez l’usage principal de l’application.' },
  { key: 'estimatedSize', label: 'Quelle est sa taille estimée ?', help: 'Une estimation suffit ; choisissez « Je ne sais pas » en cas de doute.' },
]
const organizationFields = [
  { key: 'teamSize', label: 'Combien de personnes dans l’équipe ?', help: 'Nombre approximatif de personnes impliquées.' },
  { key: 'methodology', label: 'Quelle méthodologie utilisez-vous ?', help: 'Choisissez la pratique la plus proche.' },
  { key: 'documentation', label: 'Quel est l’état de la documentation ?', help: 'Évaluez la documentation actuellement disponible.' },
]
const constraintFields = [
  { key: 'codeSensitivity', label: 'Sensibilité du code', help: 'Indiquez le niveau de confidentialité connu.' },
  { key: 'aiConstraints', label: 'Contraintes d’utilisation de l’IA', help: 'Choisissez la règle actuellement applicable.' },
  { key: 'developmentEnvironment', label: 'Environnement de développement', help: 'Où votre code est-il principalement hébergé ?' },
  { key: 'primaryIde', label: 'IDE principal', help: 'Quel éditeur l’équipe utilise-t-elle surtout ?' },
  { key: 'cicd', label: 'État de la CI/CD', help: 'Décrivez le niveau d’automatisation actuel.' },
]
const advancedFields = [
  { key: 'technicalComplexity', label: 'Complexité technique', help: 'Niveau de complexité perçu du projet.' },
  { key: 'automatedTests', label: 'Tests automatisés', help: 'État de l’automatisation des tests.' },
  { key: 'documentationQuality', label: 'Qualité de la documentation', help: 'La documentation est-elle exploitable au quotidien ?' },
  { key: 'architectureStandards', label: 'Standards d’architecture', help: 'Conventions partagées par l’équipe.' },
  { key: 'regulatoryConstraints', label: 'Contraintes réglementaires', help: 'Si vous connaissez déjà ce cadre.' },
  { key: 'targetTimeline', label: 'Horizon cible', help: 'Délai envisagé pour le projet.' },
]
const fieldLabels = Object.fromEntries([
  ...projectFields, ...organizationFields, ...constraintFields, ...advancedFields,
  { key: 'profiles', label: 'Profils' },
  { key: 'aiUsage', label: 'Usage actuel de l’IA' },
  { key: 'priority', label: 'Priorité principale' },
  { key: 'assistedStages', label: 'Étapes assistées' },
  { key: 'languages', label: 'Langages' },
].map(({ key, label }) => [key, label]))
const fieldId = (field) => `development-ai-${field}`
const describedBy = (field) => `${fieldId(field)}-help${errors.value[field] ? ` ${fieldId(field)}-error` : ''}`

function startForm() {
  if (started) return
  started = true
  emit('started')
}

function formChanged(event) {
  startForm()
  if (event.target.type === 'checkbox' && event.target.checked && ['profiles', 'assistedStages', 'languages'].includes(event.target.name)) {
    const field = event.target.name
    form[field] = event.target.value === 'unknown'
      ? ['unknown']
      : form[field].filter((value) => value !== 'unknown')
  }
  if (attempted.value) errors.value = validateDevelopmentForm(form)
  emit('changed')
}

async function submitForm() {
  if (props.loading) return
  attempted.value = true
  errors.value = validateDevelopmentForm(form)
  if (Object.keys(errors.value).length) {
    await nextTick()
    formElement.value?.querySelector('[aria-invalid="true"]:is(select, input)')?.focus()
    return
  }
  emit('submit', buildDevelopmentPayload(form))
}
</script>
