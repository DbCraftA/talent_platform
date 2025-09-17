<template>
  <section class="relative bg-linear-to-b from-white to-indigo-100">
    <div
        class="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-80 -translate-x-[120%] opacity-50"
        aria-hidden="true"
    >
      <img
          class="max-w-none"
          src="../images/blurred-shape.svg"
          width="760"
          height="668"
          alt="Blurred shape"
      />
    </div>

    <div class="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
      <img src="../images/hero-illustration.svg" class="max-w-none" width="1440" height="749" alt="Hero Illustration" />
    </div>


    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div
        class="border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] "
      >
        <!-- Section header -->
        <div class="mx-auto max-w-3xl pb-4 text-center md:pb-12">
          <div
            class="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50"
          >
            <span
              class="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-indigo-500"
              >Nos différenciateurs</span
            >
          </div>
          <h2
            class="font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 text-3xl font-semibold  md:text-4xl"
          >
            Une approche pensée pour générer de la valeur réelle
          </h2>
          <p class="text-xl text-gray-500/65">
            Nous allions pragmatisme et expertise pour transformer vos enjeux en résultats concrets. Notre modèle flexible, centré sur vos besoins, vous garantit rapidité, sécurité et impact durable.
          </p>
        </div>

        <div class="flex justify-center px-4 pb-4 md:pb-12" data-aos="fade-up">
          <img
            class="max-w-none w-70 md:w-lg"
            src="../images/hero-mac.png"
            alt="Features"
          />
        </div>

        <!-- Items -->
        <div
          class="mx-auto grid max-w-sm gap-12 sm:max-w-none sm:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:grid-cols-3"
        >
          <article>
            <svg
              class="mb-3 fill-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <path d="M0 0h14v17H0V0Zm2 2v13h10V2H2Z" />
              <path
                fill-opacity=".48"
                d="m16.295 5.393 7.528 2.034-4.436 16.412L5.87 20.185l.522-1.93 11.585 3.132 3.392-12.55-5.597-1.514.522-1.93Z"
              />
            </svg>
            <h3
              class="font-nacelle mb-1 text-[1rem] font-semibold "
            >
              Approche pragmatique
            </h3>
            <p class="text-gray-500/75">
              Des solutions concrètes et actionnables, conçues pour générer un ROI rapide et mesurable.
            </p>
          </article>
          <article>
            <svg
              class="mb-3 fill-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <path fill-opacity=".48" d="M7 8V0H5v8h2Zm12 16v-4h-2v4h2Z" />
              <path d="M19 6H0v2h17v8H7v-6H5v8h19v-2h-5V6Z" />
            </svg>
            <h3
              class="font-nacelle mb-1 text-[1rem] font-semibold "
            >
              Modèle flexible
            </h3>
            <p class="text-gray-500/75">
              Des modalités adaptées à vos besoins et à vos budgets, sans compromis sur la qualité.
            </p>
          </article>
          <article>
            <svg
              class="mb-3 fill-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <path
                d="M23.414 6 18 .586 16.586 2l3 3H7a6 6 0 0 0-6 6h2a4 4 0 0 1 4-4h12.586l-3 3L18 11.414 23.414 6Z"
              />
              <path
                fill-opacity=".48"
                d="M13.01 12.508a2.5 2.5 0 0 0-3.502.482L1.797 23.16.203 21.952l7.71-10.17a4.5 4.5 0 1 1 7.172 5.437l-4.84 6.386-1.594-1.209 4.841-6.385a2.5 2.5 0 0 0-.482-3.503Z"
              />
            </svg>
            <h3
              class="font-nacelle mb-1 text-[1rem] font-semibold "
            >
              Transfert de connaissances
            </h3>
            <p class="text-gray-500/75">
              Nos experts forment vos équipes internes pour renforcer vos capacités en continu.
            </p>
          </article>
          <article>
            <svg
              class="mb-3 fill-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <path
                fill-opacity=".48"
                d="m3.031 9.05-.593-.805 1.609-1.187.594.804a6.966 6.966 0 0 1 0 8.276l-.594.805-1.61-1.188.594-.805a4.966 4.966 0 0 0 0-5.9Z"
              />
              <path
                d="m7.456 6.676-.535-.845 1.69-1.07.534.844a11.944 11.944 0 0 1 0 12.789l-.535.845-1.69-1.071.536-.845a9.944 9.944 0 0 0 0-10.647Z"
              />
              <path
                d="m11.888 4.35-.514-.858 1.717-1.027.513.858a16.9 16.9 0 0 1 2.4 8.677 16.9 16.9 0 0 1-2.4 8.676l-.513.859-1.717-1.028.514-.858A14.9 14.9 0 0 0 14.003 12a14.9 14.9 0 0 0-2.115-7.65Z"
                opacity=".48"
              />
              <path
                d="m16.321 2-.5-.866 1.733-1 .5.866A22 22 0 0 1 21 12c0 3.852-1.017 7.636-2.948 10.97l-.502.865-1.73-1.003.501-.865A19.878 19.878 0 0 0 19 12a20 20 0 0 0-2.679-10Z"
              />
            </svg>
            <h3
              class="font-nacelle mb-1 text-[1rem] font-semibold "
            >
              Solutions clé en main
            </h3>
            <p class="text-gray-500/75">
              De la stratégie à l’implémentation technique, nous vous accompagnons de bout en bout.
            </p>
          </article>
          <article>
            <svg
              class="mb-3 fill-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <path
                fill-opacity=".48"
                d="M12 8.8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
              />
              <path
                d="m7.454 2.891.891-.454L7.437.655l-.891.454a12 12 0 0 0 0 21.382l.89.454.91-1.781-.892-.455a10 10 0 0 1 0-17.818ZM17.456 1.11l-.891-.454-.909 1.782.891.454a10 10 0 0 1 0 17.819l-.89.454.908 1.781.89-.454a12 12 0 0 0 0-21.382Z"
              />
            </svg>
            <h3
              class="font-nacelle mb-1 text-[1rem] font-semibold "
            >
              Réduction des risques
            </h3>
            <p class="text-gray-500/75">
              Une architecture robuste et des choix technologiques qui sécurisent vos projets.
            </p>
          </article>
          <article>
            <svg
              class="mb-3 fill-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <path
                fill-opacity=".48"
                d="M19 8h5v2h-5V8Zm-4 5h9v2h-9v-2Zm9 5H11v2h13v-2Z"
              />
              <path
                d="M19.406 3.844 6.083 20.497.586 15 2 13.586l3.917 3.917L17.844 2.595l1.562 1.25Z"
              />
            </svg>
            <h3
              class="font-nacelle mb-1 text-[1rem] font-semibold "
            >
              Accélération du time-to-market
            </h3>
            <p class="text-gray-500/75">
              Des méthodes éprouvées qui vous permettent de livrer plus vite, avec plus de confiance.
            </p>
          </article>
        </div>

        <!-- CTA -->
        <div class="text-center pt-12 md:pt-20 pb-5">
          <router-link class="btn inline-flex border-1 border-indigo-500 items-center text-white bg-gray-900 hover:bg-gray-800 group" to="/nous-contacter">
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
  </section>
</template>
<script setup lang="ts">
</script>