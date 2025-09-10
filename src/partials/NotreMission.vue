<template>
  <section class=" bg-linear-to-t from-indigo-50/20 to-white ">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div
        class="border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20"
      >
        <!-- Section header -->
        <div class="mx-auto max-w-3xl pb-12 text-center">
          <h2
            class="font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 text-3xl font-semibold text-black md:text-4xl"
          >
            Notre mission : l’architecture au service du business
          </h2>
          <p class="text-lg text-gray-500">
            Être votre partenaire de confiance pour faire le lien entre l’expertise technologique de pointe et vos objectifs de croissance.
            Parce que nous avons nous-mêmes vécu les défis de la complexité technologique et des transformations organisationnelles, nous savons qu’un accompagnement clair, pragmatique et exigeant fait toute la différence.          </p>
        </div>

        <!-- Check list -->
        <div class="flex justify-center pb-5">
          <ul
              class="inline-flex flex-col flex-wrap justify-center gap-x-10 gap-y-4 text-[1rem] text-gray-500 sm:flex sm:flex-row sm:items-center"
          >
            <li class="flex items-center">
              <svg class="mr-3 shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <circle class="fill-indigo-500" cx="10" cy="10" r="10" />
                <path class="fill-indigo-200" d="m14.707 7.707-6.485 6.485-2.929-2.93L6.707 9.85l1.515 1.515 5.071-5.071 1.414 1.414Z"/>
              </svg>
              <span>Accompagnement stratégique sur-mesure</span>
            </li>
            <li class="flex items-center">
              <svg class="mr-3 shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <circle class="fill-indigo-500" cx="10" cy="10" r="10" />
                <path class="fill-indigo-200" d="m14.707 7.707-6.485 6.485-2.929-2.93L6.707 9.85l1.515 1.515 5.071-5.071 1.414 1.414Z"/>
              </svg>
              <span>Exigence architecturale et qualité durable</span>
            </li>
            <li class="flex items-center">
              <svg class="mr-3 shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <circle class="fill-indigo-500" cx="10" cy="10" r="10" />
                <path class="fill-indigo-200" d="m14.707 7.707-6.485 6.485-2.929-2.93L6.707 9.85l1.515 1.515 5.071-5.071 1.414 1.414Z"/>
              </svg>
              <span>Impact mesurable sur vos enjeux business</span>
            </li>
            <li class="flex items-center">
              <svg class="mr-3 shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <circle class="fill-indigo-500" cx="10" cy="10" r="10" />
                <path class="fill-indigo-200" d="m14.707 7.707-6.485 6.485-2.929-2.93L6.707 9.85l1.515 1.515 5.071-5.071 1.414 1.414Z"/>
              </svg>
              <span>Une communauté d’experts engagés</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
</script>