<template>
  <section id="offres" class="relative overflow-hidden bg-linear-to-br from-white  to-indigo-100 py-16 ">
    <div class="absolute inset-0 -z-10 " aria-hidden="true"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div class="max-w-2xl" data-aos="fade-up">
          <h2 class="h2 font-cabinet-grotesk text-black">Découvrez nos offres clés</h2>
        </div>
        <p class="max-w-xl text-lg text-gray-500 md:text-right" data-aos="fade-up" data-aos-delay="100">
          Des offres conçues pour apporter rapidement de la valeur, du cadrage stratégique jusqu’à l’exécution opérationnelle.
        </p>
      </div>

      <div class="mt-10 grid gap-5 sm:grid-cols-2 md:mt-14 lg:mt-20 lg:grid-cols-3">
        <article
          v-for="(offer, index) in offers"
          :key="offer.title"
          class="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[24px] border border-zinc-700 bg-linear-to-b from-zinc-700 to-zinc-900 p-6 shadow-2xl sm:min-h-[360px] lg:min-h-[420px]"
          data-aos="fade-up"
          :data-aos-delay="100 + index * 150"
        >
          <div>
            <div class="mb-10 inline-flex h-16 w-16 items-center justify-center rounded-2xl   ring-1 ring-white/10">
              <img class="h-10 w-10" :src="offer.icon" width="40" height="40" :alt="offer.alt" />
            </div>
          </div>

          <div>
            <h3 class="text-2xl font-semibold leading-tight tracking-tight text-white ">
              {{ offer.title }}
            </h3>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import strategyIcon from '../images/strategy.png'
import architecteIcon from '../images/architecte.png'
import cloudIcon from '../images/cloud.png'

export default {
  name: 'OffersHighlights',
  data() {
    return {
      offers: [
        {
          icon: strategyIcon,
          alt: 'Icône stratégie',
          title: 'Assessment & Stratégie',
        },
        {
          icon: architecteIcon,
          alt: 'Icône architecte',
          title: 'Mise à disposition d’architectes',
        },
        {
          icon: cloudIcon,
          alt: 'Icône cloud',
          title: 'Packs Cloud & IA',
        },
      ],
    }
  },
}
</script>
