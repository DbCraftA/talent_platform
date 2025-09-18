<template>
  <main class="bg-linear-to-br from-indigo-50/20 to-white ">

    <div class="relative flex">

      <!-- Content -->
      <div class="w-full md:w-1/2">

        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">

          <div class="flex-1">

            <!-- Header -->
            <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <div class="  ">
                <!-- Logo -->
                <router-link  to="/" aria-label="Cruip">
                  <img src="../images/logo-test.png" class="max-w-none" width="50" height="50" alt="Hero Illustration" />
                </router-link>
              </div>
            </div>


            <!-- Progress bar -->
            <div class="px-4 pt-12 pb-8">
              <div class="max-w-md mx-auto w-full">
                <div class="relative">
                  <div class="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-gray-200 " aria-hidden="true"></div>
                  <ul class="relative flex justify-between w-full">
                    <li>
                      <a class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500  text-white" >1</a>
                    </li>
                    <li>
                      <a class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500  text-white" >2</a>
                    </li>
                    <li>
                      <a class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500  text-white" >3</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="px-4 py-8">
            <div class="max-w-md mx-auto">

              <div class="text-center">
                <svg class="inline-flex w-16 h-16 fill-current mb-6" viewBox="0 0 64 64">
                  <circle class="text-green-500/20" cx="32" cy="32" r="32" />
                  <path class="text-green-700" d="M37.22 26.375a1 1 0 1 1 1.56 1.25l-8 10a1 1 0 0 1-1.487.082l-4-4a1 1 0 0 1 1.414-1.414l3.21 3.21 7.302-9.128Z" />
                </svg>
                <h1 class="text-3xl text-gray-800 font-bold mb-8">  Merci pour votre confiance. Notre équipe reviendra vers vous dans les plus brefs délais.
                  </h1>
                <router-link class="btn-sm inline-flex items-center ml-auto text-white bg-gray-900 hover:bg-gray-800 group" to="/">
                  Retour à l'accueil
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

      <!-- Right side -->
      <div class="fixed right-0 top-0 bottom-0 hidden lg:block lg:w-1/2 overflow-hidden" aria-hidden="true">

        <!-- Bg -->
        <div class="absolute inset-0 bg-linear-to-b from-indigo-100 to-white pointer-events-none -z-10" aria-hidden="true"></div>

        <!-- Illustration -->
        <div class="hidden md:block absolute right-0 pointer-events-none -z-10" aria-hidden="true">
          <img src="../images/auth-illustration.svg" class="max-w-none" width="1440" height="900" alt="Page Illustration" />
        </div>

        <!-- Quotes -->
        <div class="absolute inset-0 flex flex-col justify-center">
          <div class="px-5 sm:px-6 py-8">
            <div class="w-full max-w-xl mx-auto">
              <div class="space-y-3 group">
                <!-- Testimonial -->
                <div class="p-4 bg-sky-50 border border-sky-200 rounded-xl opacity-30 hover:opacity-100 transition duration-150 ease-in-out">
                  <div class="flex items-center space-x-5">
                    <div class="relative shrink-0">
                      <img class="rounded-full" src="../images/world-user-01.jpg" width="88" height="88" alt="Testimonial 04" />
                      <svg class="absolute top-0 right-0 fill-indigo-400" width="26" height="17" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 16.026h8.092l6.888-16h-4.592L0 16.026Zm11.02 0h8.092L26 .026h-4.65l-10.33 16Z" />
                      </svg>
                    </div>
                    <figure>
                      <blockquote class="font-bold m-0 pb-1">
                        <p>Listing our jobs through JobBoard was simple, quick, and helped us find amazing candidates.</p>
                      </blockquote>
                      <figcaption class="text-sm font-medium">Lisa Smith, developer at <a class="text-sky-500 hover:underline" href="#0">AppyYou</a></figcaption>
                    </figure>
                  </div>
                </div>
                <!-- Testimonial -->
                <div class="p-4 bg-sky-50 border border-sky-200 rounded-xl hover:opacity-100 transition duration-150 ease-in-out">
                  <div class="flex items-center space-x-5">
                    <div class="relative shrink-0">
                      <img class="rounded-full" src="../images/world-user-07.jpg" width="88" height="88" alt="Testimonial 05" />
                      <svg class="absolute top-0 right-0 fill-indigo-400" width="26" height="17" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 16.026h8.092l6.888-16h-4.592L0 16.026Zm11.02 0h8.092L26 .026h-4.65l-10.33 16Z" />
                      </svg>
                    </div>
                    <figure>
                      <blockquote class="font-bold m-0 pb-1">
                        <p>Listing our jobs through JobBoard was simple, quick, and helped us find amazing candidates.</p>
                      </blockquote>
                      <figcaption class="text-sm font-medium">Mark Mills, developer at <a class="text-sky-500 hover:underline" href="#0">App.com</a></figcaption>
                    </figure>
                  </div>
                </div>
                <!-- Testimonial -->
                <div class="p-4 bg-sky-50 border border-sky-200 rounded-xl opacity-30 hover:opacity-100 transition duration-150 ease-in-out">
                  <div class="flex items-center space-x-5">
                    <div class="relative shrink-0">
                      <img class="rounded-full" src="../images/world-user-03.jpg" width="88" height="88" alt="Testimonial 06" />
                      <svg class="absolute top-0 right-0 fill-indigo-400" width="26" height="17" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 16.026h8.092l6.888-16h-4.592L0 16.026Zm11.02 0h8.092L26 .026h-4.65l-10.33 16Z" />
                      </svg>
                    </div>
                    <figure>
                      <blockquote class="font-bold m-0 pb-1">
                        <p>Listing our jobs through JobBoard was simple, quick, and helped us find amazing candidates.</p>
                      </blockquote>
                      <figcaption class="text-sm font-medium">Lisa Smith, developer at <a class="text-sky-500 hover:underline" href="#0">AppyYou</a></figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

  </main>
</template>

<script setup>
import { useFormStore } from '../stores/formContacterNous.js'
import {onMounted} from 'vue'

const form = useFormStore()

onMounted(() => {
  form.resetForm()
})

</script>