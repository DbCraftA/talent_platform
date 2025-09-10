<template>
  <section class=" bg-linear-to-t from-white to-indigo-50/20  ">
    <div class="">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="relative max-w-3xl mx-auto text-center pb-12 md:pb-16">
          <div
              class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-xl shadow-md mb-8 relative before:absolute before:-top-12 before:w-52 before:h-52 before:bg-zinc-900 before:opacity-[.08] before:rounded-full before:blur-3xl before:-z-10"
          >
            <img src="../images/logo-02.png" width="60" height="60" alt="Logo">
          </div>
          <h2 class="font-inter-tight text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            Donnez à vos projets
            <em class="relative not-italic inline-flex justify-center items-end">
              l’architecture qu’ils méritent
              <svg class="absolute fill-zinc-300 w-[calc(50%+1rem)] md:w-[calc(100%+1rem)]  -z-10" xmlns="http://www.w3.org/2000/svg" width="120" height="10" viewBox="0 0 120 10" aria-hidden="true" preserveAspectRatio="none">
                <path d="M118.273 6.09C79.243 4.558 40.297 5.459 1.305 9.034c-1.507.13-1.742-1.521-.199-1.81C39.81-.228 79.647-1.568 118.443 4.2c1.63.233 1.377 1.943-.17 1.89Z" />
              </svg>
            </em>
          </h2>
          <p class="text-lg text-zinc-500 mb-8">
            Que ce soit à travers nos <strong>packs Cloud et IA</strong> ou la mise à disposition d’architectes certifiés,
            nous vous aidons à transformer vos enjeux stratégiques en résultats tangibles.
            Notre conviction : la technologie n’a de valeur que si elle sert votre business.
          </p>
          <div class="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div class="flex justify-center  pb-12">

              <div class="text-center">
                <router-link class="btn inline-flex items-center text-black  border-1 border-indigo-500 bg-white hover:bg-gray-200 group" to="/nous-contacter">
                  Nous contacter
                  <span class="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
              <svg class="fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width="16" height="8">
                <path d="m10.865.013.747.148c.243.065.481.143.716.235.495.18.97.42 1.415.716.265.192.571.343.858.55.096.064.192.135.288.209l.196.154.192.178c.09.08.175.168.254.262.189.21.33.466.414.747.076.275.073.568-.008.84-.09.27-.236.513-.427.708-.096.1-.198.191-.306.274l-.152.117-.116.074c-.369.252-.75.482-1.14.69-.577.315-1.153.585-1.701.932-.408.262-.803.549-1.182.86-.083.064-.16.136-.247.193a.918.918 0 0 1-.113.072.644.644 0 0 1-.118.016.708.708 0 0 1-.191.01.559.559 0 0 1-.246-.088l-.072-.054a1.481 1.481 0 0 1-.141-.107c-.128-.122-.1-.377.05-.726.036-.08.079-.156.128-.226l.316-.401c.164-.188.336-.372.514-.543.178-.17.356-.342.546-.493.19-.152.394-.265.59-.39.53-.329 1.05-.626 1.552-.93-.159.018-.32.034-.48.04-.511.036-1.026.044-1.546.048a43.432 43.432 0 0 1-2.31-.058l-.005-.02a78.728 78.728 0 0 0-2.292-.148c-.279-.016-.558.01-.837-.006L4.543 3.81l-.977-.046a19.357 19.357 0 0 1-.49-.029 12.6 12.6 0 0 0-1.303.013l-.828.055-.406.021H.335l-.18.008c-.145 0-.208-.15-.102-.356.16-.268.422-.46.723-.531.57-.117 1.144-.205 1.72-.264.287-.026.576-.048.865-.053.29-.004.578.01.865.042.69.065 1.408-.015 2.113-.015.776.003 1.549.02 2.324.04l1.428.039 1.087.039c.359.012.716.02 1.075.013.442-.008.879-.065 1.318-.112a3.672 3.672 0 0 0-.186-.166 9.045 9.045 0 0 0-1.06-.762 9.82 9.82 0 0 0-1.034-.537 5.9 5.9 0 0 1-1.284-.854c-.12-.115-.053-.199.12-.26a1.55 1.55 0 0 1 .738-.083Z" />
              </svg>
            </span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
<script setup lang="ts">
</script>