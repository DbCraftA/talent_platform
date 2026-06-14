<template>
  <section class="relative overflow-hidden">

    <!-- Bg -->
    <div class="absolute inset-0 bg-linear-to-b from-indigo-100 to-white pointer-events-none -z-10" aria-hidden="true"></div>

    <!-- Illustration -->
    <div class="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
      <img src="../images/hero-illustration.svg" class="max-w-none" width="1440" height="749" alt="Hero Illustration" />
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="pt-28 pb-8 md:pt-36 md:pb-16">

        <!-- HeroMethode content -->
        <div class="max-w-xl mx-auto lg:max-w-none flex flex-col lg:flex-row lg:items-center lg:space-x-12 xl:space-x-20 space-y-12 lg:space-y-0">

          <div class="lg:w-9/12 text-center lg:text-left">
            <!-- Copy -->
            <h1 class="h2 font-cabinet-grotesk mb-6" data-aos="fade-right" data-aos-delay="100">
              L’expertise stratégique au service de vos
              <br />
              <span class="relative inline-flex text-indigo-500">
                  <svg class="absolute right-5 top-full -mt-4 max-w-full -z-10" width="100" height="24" viewBox="0 0 220 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M134.66 13.107c-10.334-.37-20.721-.5-31.12-.291l-2.6.06c-4.116.04-8.193.602-12.3.749-14.502.43-29.029 1.196-43.514 2.465-6.414.63-12.808 1.629-19.04 2.866-7.93 1.579-16.113 3.71-23.367 5.003-2.211.374-3.397-1.832-2.31-4.906.5-1.467 1.838-3.456 3.418-4.813a16.047 16.047 0 0 1 6.107-3.365c16.88-4.266 33.763-6.67 51.009-7.389C71.25 3.187 81.81 1.6 92.309.966c11.53-.65 23.097-.938 34.66-.96 7.117-.054 14.25.254 21.36.318l16.194.803 4.62.39c3.85.32 7.693.618 11.53.813 8.346.883 16.673.802 25.144 2.159 1.864.276 3.714.338 5.566.873l.717.225c6.162 1.977 7.92 3.64 7.9 7.197l-.003.203c-.017.875.05 1.772-.112 2.593-.581 2.762-4.066 4.12-8.637 3.63-13.696-1.06-27.935-3.332-42.97-4.168-11.055-.83-22.314-1.459-33.596-1.603l-.022-.332Z" fill="#D1D5DB" fill-rule="evenodd" />
                  </svg>
                   ambitions.
                </span>
            </h1>
            <div class="max-w-6xl pt-5 ">
              <p class="text-lg text-center lg:text-left text-gray-500 mb-2 ">
                Dans un monde où la technologie évolue sans cesse,  creusant le fossé entre <strong>vision stratégique</strong> et <strong>réalité technique</strong>. Nous intervenons pour <strong>transformer</strong> cette distance en véritable <strong>levier de réussite</strong>. Que vous soyez en phase <strong>d'exploration, de transformation ou d'optimisation,</strong> notre équipe passionnée vous accompagne pour faire de vos projets des succès durables et impactants.
              </p>
            </div>
            <!-- Button + Avatars -->
            <div class=" pt-10 ">

              <div class="sm:flex sm:justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-3">
                <div class="inline-flex -space-x-3 -ml-0.5">
                  <img class="rounded-full border-2  box-content" src="../images/world-user-02.jpg" width="32" height="32" alt="Avatar 01" />
                  <img class="rounded-full border-2  box-content" src="../images/world-user-06.jpg" width="32" height="32" alt="Avatar 02" />
                  <img class="rounded-full border-2 box-content" src="../images/world-user-03.jpg" width="32" height="32" alt="Avatar 03" />
                  <img class="rounded-full border-2  box-content" src="../images/world-user-01.jpg" width="32" height="32" alt="Avatar 04" />
                </div>
                <div class="text-sm text-gray-500 font-medium">Plus d'une <span class="text-indigo-500">100ne</span> de profils qualifiés</div>
              </div>

            </div>
          </div>

          <div class="hidden lg:flex lg:w-5/12 justify-center lg:justify-end" data-aos="zoom-y-out">
            <div class="text-center scale-75 sm:scale-90 lg:scale-100 origin-center">
              <div
                  class="inline-flex relative rounded-full before:absolute before:inset-0 before:-z-10 before:scale-[.85] before:bg-linear-to-b before:from-blue-200 before:to-sky-700/50 before:blur-3xl before:animate-[pulse_4s_cubic-bezier(.4,0,.6,1)_infinite] after:absolute after:inset-0 after:rounded-[inherit] after:[background:radial-gradient(closest-side,var(--color-blue-500),transparent)]">
                <img class="bg-gray-100/80 rounded-full" src="../images/planet.png" width="400" height="400" alt="Planet" />
                <div class="pointer-events-none" aria-hidden="true">
                  <img class="absolute z-10 -top-20 -right-64 max-w-none" src="../images/planet-overlay.svg" width="789"
                       height="755" alt="Planet decoration" />
                  <div>

                    <img
                        class="absolute z-10 top-16 left-10 opacity-80 transition-opacity  rounded-full max-sm:scale-75! duration-500 animate-[float_4s_ease-in-out_infinite_both]"
                        src="../images/world-user-04.jpg"
                        width="45"
                        height="45"
                        alt="User 01"
                        data-aos="fade-up"
                    />
                    <img
                        class="absolute rounded-full z-10 top-25 left-56 opacity-80 transition-opacity duration-500 animate-[float_4s_ease-in-out_infinite_1s_both]"
                        src="../images/world-user-03.jpg" width="50" height="50" alt="Tag 02" />
                    <img
                        class="absolute rounded-full  z-10 bottom-26 -left-5 opacity-90 transition-opacity duration-500 animate-[float_4s_ease-in-out_infinite_2s_both]"
                        src="../images/world-user-07.jpg"  width="50" height="50" alt="Tag 03" />
                    <img
                        class="absolute rounded-full z-10  top-36 left-20 opacity-80 transition-opacity duration-500 animate-[float_4s_ease-in-out_infinite_3s_both]"
                        src="../images/world-user-05.jpg" width="50" height="50" alt="Tag 04" />
                    <img
                        class="absolute rounded-full z-10 bottom-32 left-64 opacity-80 transition-opacity duration-500 animate-[float_4s_ease-in-out_infinite_3s_both]"
                        src="../images/world-user-08.jpg" width="50" height="50" alt="Tag 04" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <Stats />

      </div>
    </div>
  </section>
</template>

<script>
import StatsMethode from "./StatsLandingPage.vue";

export default  {
  name: 'Hero',
  components: {Stats: StatsMethode},
}
</script>