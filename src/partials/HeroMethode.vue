<template>
  <section class="relative overflow-hidden">

    <!-- Bg -->
    <div class="absolute inset-0 bg-linear-to-br from-indigo-100 to-white pointer-events-none -z-10" aria-hidden="true"></div>


    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="pt-28 pb-8 md:pt-36 md:pb-16">

        <!-- HeroMethode content -->
        <div class="max-w-5xl  text-center">

          <!-- Copy -->
          <h1 class="h1 font-cabinet-grotesk mb-6" data-aos="fade-right" data-aos-delay="100">Pourquoi nous <span class="relative inline-flex text-indigo-500">
                <svg class="absolute left-0 top-full -mt-4 max-w-full -z-10" width="220" height="24" viewBox="0 0 220 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M134.66 13.107c-10.334-.37-20.721-.5-31.12-.291l-2.6.06c-4.116.04-8.193.602-12.3.749-14.502.43-29.029 1.196-43.514 2.465-6.414.63-12.808 1.629-19.04 2.866-7.93 1.579-16.113 3.71-23.367 5.003-2.211.374-3.397-1.832-2.31-4.906.5-1.467 1.838-3.456 3.418-4.813a16.047 16.047 0 0 1 6.107-3.365c16.88-4.266 33.763-6.67 51.009-7.389C71.25 3.187 81.81 1.6 92.309.966c11.53-.65 23.097-.938 34.66-.96 7.117-.054 14.25.254 21.36.318l16.194.803 4.62.39c3.85.32 7.693.618 11.53.813 8.346.883 16.673.802 25.144 2.159 1.864.276 3.714.338 5.566.873l.717.225c6.162 1.977 7.92 3.64 7.9 7.197l-.003.203c-.017.875.05 1.772-.112 2.593-.581 2.762-4.066 4.12-8.637 3.63-13.696-1.06-27.935-3.332-42.97-4.168-11.055-.83-22.314-1.459-33.596-1.603l-.022-.332Z" fill="#D1D5DB" fill-rule="evenodd" />
                </svg>
                 choisir
              </span> ?
          </h1>
          <p class="text-lg text-gray-500">Our name "Toptal" comes from Top Talent — meaning we constantly strive to find and work with the best from around the world. Our rigorous screening process identifies experts in their domains who have passion and drive.


            Of the thousands of applications Toptal sees each month, typically fewer than 3% are accepted.</p>

          <div class="max-w-xs pt-10 mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div >
              <a class="btn text-zinc-100 bg-zinc-900 hover:bg-zinc-800 w-full shadow-sm" href="#0">Prospection</a>
            </div>
            <div>
              <a class="btn text-zinc-600 bg-white hover:text-zinc-900 w-full shadow-sm" href="#1">Accompagnement</a>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <Stats />



      </div>
    </div>
  </section>
</template>

<script>
import Stats from "./Stats.vue";

export default  {
  name: 'Hero',
  components: {Stats}
}

</script>