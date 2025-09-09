<template>
  <section class="relative">
  
    <!-- Bg -->
    <div class="absolute inset-0 bg-zinc-800 -z-10" aria-hidden="true"></div>
  
    <!-- Illustration
    <div class="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
      <img class="max-w-none" src="../images/features-illustration.svg" width="2120" height="931" />
    </div>-->
  
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="py-12 md:py-20">
  
        <!-- Section header -->
        <div class="max-w-5xl pb-12 md:pb-16">
          <h2 class="h2 font-cabinet-grotesk text-white">Pour chaque mission, chaque profil, nous vous proposons uniquement ce qui crée de la valeur concrète.</h2>
        </div>
  
        <!-- Carousel -->
        <div class="pb-12 md:pb-16">
          <!-- Carousel built with Swiper.js [https://swiperjs.com/] -->
          <!-- * Custom styles in src/css/additional-styles/theme.scss -->
          <div class="carousel swiper-container max-w-sm mx-auto sm:max-w-none">
            <div class="swiper-wrapper">
              <!-- Carousel items -->
              <div class="swiper-slide max-w-[446px] h-auto">
                <!-- Image -->
                <img class="w-full aspect-4/3 object-cover h-full" src="../images/vitaly-gariev-Oexx7cEMKFA-unsplash.jpg" width="446" height="335" alt="Carousel 01" />
              </div>
              <div class="swiper-slide max-w-[446px] h-auto">
                <!-- Image -->
                <img class="w-full aspect-4/3 object-cover h-full" src="../images/carousel-02.jpg" width="446" height="335" alt="Carousel 02" />
              </div>
              <div class="swiper-slide max-w-[446px] h-auto">
                <!-- Image -->
                <img class="w-full aspect-4/3 object-cover h-full" src="../images/igor-omilaev-.jpg" width="446" height="335" alt="Carousel 03" />
              </div>
              <div class="swiper-slide max-w-[446px] h-auto">
                <!-- Image -->
                <img class="w-full aspect-4/3 object-cover h-full" src="../images/carousel-04.jpg" width="446" height="335" alt="Carousel 04" />
              </div>
            </div>
          </div>
  
          <!-- Arrows -->
          <div class="flex mt-12 space-x-3 justify-end">
            <button class="carousel-prev relative z-20 w-11 h-11 rounded-full flex items-center justify-center group bg-gray-900">
              <span class="sr-only">Previous</span>
              <svg class="fill-indigo-500 group-hover:fill-white transition duration-150 ease-in-out" width="13" height="12" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg">
                <path d="m3.914 5 3.5-3.5L6 .086 1.086 5H1v.086L.086 6 1 6.914V7h.086L6 11.914 7.414 10.5 3.914 7H13V5z" />
              </svg>
            </button>
            <button class="carousel-next relative z-20 w-11 h-11 rounded-full flex items-center justify-center group bg-gray-900">
              <span class="sr-only">Next</span>
              <svg class="fill-indigo-500 group-hover:fill-white transition duration-150 ease-in-out" width="13" height="12" viewBox="0 0 13 12" xmlns="http://www.w3.org/2000/svg">
                <path d="m9.086 5-3.5-3.5L7 .086 11.914 5H12v.086l.914.914-.914.914V7h-.086L7 11.914 5.586 10.5l3.5-3.5H0V5z" />
              </svg>
            </button>
          </div>
        </div>
  
        <!-- Grid -->
        <div class="max-w-sm mx-auto grid sm:grid-cols-2 sm:max-w-3xl lg:grid-cols-4 lg:max-w-none items-start">
  
          <!-- #1 -->
          <div class="relative p-5 before:opacity-0 hover:before:opacity-20 before:absolute before:inset-0 before:rounded-sm before:bg-linear-to-tr before:from-white before:to-white/25 before:shadow-xl before:transition-all before:duration-150 before:ease-in-out" data-aos="fade-up">
            <img class="mb-3" src="../images/strategy.png" width="40" height="40" alt="Icon 01">
            <h3 class="font-cabinet-grotesk font-bold text-lg text-white">Assessment & Stratégie</h3>
            <div class="text-white text-opacity-80">Cadrer votre vision et transformer vos ambitions en feuille de route claire.</div>
          </div>
  
          <!-- #2 -->
          <div class="relative p-5 before:opacity-0 hover:before:opacity-20 before:absolute before:inset-0 before:rounded-sm before:bg-linear-to-tr before:from-white before:to-white/25 before:shadow-xl before:transition-all before:duration-150 before:ease-in-out" data-aos="fade-up" data-aos-delay="100">
            <img class="mb-3" src="../images/architecte.png" width="40" height="40" alt="Icon 04">
            <h3 class="font-cabinet-grotesk font-bold text-lg text-white">Mise à disposition d’architectes</h3>
            <div class="text-white text-opacity-80">Des talents validés par nos pairs, intégrés selon votre contexte.</div>
          </div>
  
          <!-- #3 -->
          <div class="relative p-5 before:opacity-0 hover:before:opacity-20 before:absolute before:inset-0 before:rounded-sm before:bg-linear-to-tr before:from-white before:to-white/25 before:shadow-xl before:transition-all before:duration-150 before:ease-in-out" data-aos="fade-up" data-aos-delay="200">
            <img class="mb-3" src="../images/cloud.png" width="40" height="40" alt="Icon 03">
            <h3 class="font-cabinet-grotesk font-bold text-lg text-white">Services Cloud</h3>
            <div class="text-white text-opacity-80">Optimisez vos infrastructures avec des solutions Cloud performantes et scalables.</div>
          </div>
  
          <!-- #4 -->
          <div class="relative p-5 before:opacity-0 hover:before:opacity-20 before:absolute before:inset-0 before:rounded-sm before:bg-linear-to-tr before:from-white before:to-white/25 before:shadow-xl before:transition-all before:duration-150 before:ease-in-out" data-aos="fade-up" data-aos-delay="300">
            <img class="mb-3" src="../images/ia.png" width="40" height="40" alt="Icon 02">
            <h3 class="font-cabinet-grotesk font-bold text-lg text-white">Services IA</h3>
            <div class="text-white text-opacity-80">Passez de l’idée à la valeur grâce à l’IA appliquée.</div>
          </div>
  
        </div>
  
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue'

// Import Swiper
import Swiper, { Navigation } from 'swiper'
import 'swiper/css'

Swiper.use([Navigation])

export default {
  name: 'Features01',
  setup() {
    onMounted(() => {
      const carousel = new Swiper('.carousel', {
        slidesPerView: 'auto',
        grabCursor: true,
        loop: false,
        centeredSlides: false,
        initialSlide: 0,
        spaceBetween: 24,
        watchSlidesProgress: true,
        navigation: {
          nextEl: '.carousel-next',
          prevEl: '.carousel-prev',
        },
      })
    })
  }
}
</script>