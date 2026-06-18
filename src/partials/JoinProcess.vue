<template>
  <section id="join-process" class="bg-linear-to-tr from-indigo-100 via-white to-indigo-100">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-20 border-t [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1]">
      <div class="mx-auto max-w-3xl pb-12 text-center md:pb-20">
        <h2 class="font-nacelle text-black/80 pb-4 text-3xl font-semibold md:text-4xl">
          Un processus simple, exigeant et humain
        </h2>
        <p class="text-lg text-gray-500">
          L’objectif n’est pas d’empiler des profils, mais de construire une communauté de confiance avec des architectes qui partagent le même niveau d’exigence.
        </p>
      </div>

      <div class="-my-4 mx-auto max-w-3xl md:-my-6" data-aos-id-join-process>
        <div v-for="(step, index) in steps" :key="step.title" class="relative py-4 pl-24 md:py-6" data-aos="fade-up" :data-aos-delay="index * 200" data-aos-anchor="[data-aos-id-join-process]">
          <div class="pl-2">
            <div class="inline-flex bg-linear-to-r text-indigo-500 bg-clip-text pb-2">
              {{ step.eyebrow }}
            </div>
            <div class="mb-2 flex items-center">
              <div class="absolute left-6 inline-flex px-2.5 py-0.5 text-sm font-semibold">
                {{ index + 1 }}
              </div>
              <div v-if="index < steps.length - 1" class="absolute left-0 ml-20 h-full -translate-x-1/2 sm:translate-y-3 translate-y-5 transform self-start bg-gray-800 px-px" aria-hidden="true"></div>
              <div class="absolute left-0 ml-20 box-content h-2 w-2 -translate-x-1/2 transform rounded-full border-4 border-gray-950 bg-indigo-500" aria-hidden="true"></div>
              <h4 class="font-nacelle text-xl font-semibold text-black">
                {{ step.title }}
              </h4>
            </div>
            <p class="text-[1rem] text-gray-500/75">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    eyebrow: 'Découverte',
    title: 'Premier échange',
    description: 'Nous échangeons sur votre parcours, vos domaines d’expertise, vos aspirations et le type de projets sur lesquels vous souhaitez intervenir.',
  },
  {
    eyebrow: 'Exigence collective',
    title: 'Validation par les pairs',
    description: 'Votre expérience est challengée par des architectes du même domaine, à travers des discussions concrètes et des retours terrain.',
  },
  {
    eyebrow: 'Communauté',
    title: 'Intégration au collectif',
    description: 'Une fois sélectionné, vous rejoignez un collectif qui partage veille, opportunités, méthodes et retours d’expérience.',
  },
  {
    eyebrow: 'Impact',
    title: 'Opportunités qualifiées',
    description: 'Nous vous sollicitons uniquement sur des besoins cohérents avec votre expertise, votre disponibilité et vos ambitions.',
  },
]
</script>
