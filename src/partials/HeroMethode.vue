<script setup>
import StatsMethode from './StatsMethode.vue'
import building from '../images/complexe_lumineux.png'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="relative text-slate-950">
    <div class="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-16 pt-36 sm:px-6 md:grid-cols-2 md:gap-4 md:pb-24 md:pt-44">
      <div class="relative z-10">
        <h1 class="h2 font-cabinet-grotesk mb-6" data-aos="fade-right" data-aos-delay="100">
          Pourquoi nous
          <span class="relative inline-flex text-indigo-500">
            <svg class="absolute right-5 top-full -mt-4 max-w-full -z-10" width="100" height="24" viewBox="0 0 220 18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M134.66 13.107c-10.334-.37-20.721-.5-31.12-.291l-2.6.06c-4.116.04-8.193.602-12.3.749-14.502.43-29.029 1.196-43.514 2.465-6.414.63-12.808 1.629-19.04 2.866-7.93 1.579-16.113 3.71-23.367 5.003-2.211.374-3.397-1.832-2.31-4.906.5-1.467 1.838-3.456 3.418-4.813a16.047 16.047 0 0 1 6.107-3.365c16.88-4.266 33.763-6.67 51.009-7.389C71.25 3.187 81.81 1.6 92.309.966c11.53-.65 23.097-.938 34.66-.96 7.117-.054 14.25.254 21.36.318l16.194.803 4.62.39c3.85.32 7.693.618 11.53.813 8.346.883 16.673.802 25.144 2.159 1.864.276 3.714.338 5.566.873l.717.225c6.162 1.977 7.92 3.64 7.9 7.197l-.003.203c-.017.875.05 1.772-.112 2.593-.581 2.762-4.066 4.12-8.637 3.63-13.696-1.06-27.935-3.332-42.97-4.168-11.055-.83-22.314-1.459-33.596-1.603l-.022-.332Z" fill="#D1D5DB" fill-rule="evenodd" />
            </svg>
            choisir ?
          </span>
        </h1>
        <p class="mt-5 max-w-xl text-base leading-relaxed text-slate-900 sm:text-lg" data-aos="fade-up" data-aos-delay="150">Nous croyons que la vraie valeur vient de la capacité à relier <strong>expertise technique</strong> et <strong>impact business.</strong> Nos architectes identifient ce qui est essentiel, conçoivent des solutions pérennes et accélèrent vos projets Cloud & IA avec une approche pragmatique, flexible et orientée résultats.</p>
        <div class="mt-7 flex flex-col gap-3 sm:flex-row" data-aos="fade-up" data-aos-delay="200">
          <button type="button" class="btn gap-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700" @click="scrollTo('section1')">Prospection <span aria-hidden="true">→</span></button>
          <button type="button" class="btn rounded-xl border border-indigo-600 bg-white/80 text-indigo-700 hover:bg-indigo-50" @click="scrollTo('section2')">Accompagnement</button>
        </div>
      </div>
      <div class="relative isolate flex min-w-0 items-center justify-center max-md:-mx-4 sm:max-md:-mx-6 [mask-image:linear-gradient(to_right,#000_0%,#000_75%,transparent_100%)]" aria-hidden="true" data-aos="fade-left" data-aos-delay="150">
        <div class="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_0%,#000_72%,transparent_100%)]">
          <div class="absolute inset-[20%_0_0_13%] -z-10 bg-slate-950 [clip-path:polygon(65%_35%,100%_0,100%_100%,30%_100%)] md:inset-[18%_-5%_0_16%]"></div>
        </div>
        <img :src="building" alt="" class="relative h-auto max-h-[440px] w-full object-contain [mask-image:linear-gradient(to_bottom,#000_0%,#000_72%,transparent_100%)] md:max-h-[600px] md:scale-110" />
      </div>
    </div>
    <StatsMethode />
  </section>
</template>
