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
                <router-link  to="/" aria-label="Enovat">
                  <img src="../images/logo-test-2.png" class="max-w-none" width="80" height="40" alt="Hero Illustration" />
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
                      <router-link class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500  text-white" to="/nous-contacter">1</router-link>
                    </li>
                    <li>
                      <router-link class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500  text-white " v-if="form.type === 'free'" to="/c-02-f">2</router-link>
                      <router-link class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500  text-white " v-else-if="form.type === 'company'" to="/c-02-c">2</router-link>
                      <router-link class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500  text-white " v-else-if="form.type === 'any'" to="/c-02-a">2</router-link>
                    </li>
                    <li>
                      <a class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-white text-gray-500" >3</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="px-4 py-8">
            <div class="max-w-md mx-auto">

              <h1 class="text-3xl text-gray-800  font-bold mb-6">Présentez-vous en quelques mots</h1>
              <div class="text-gray-500"> Merci de faire confiance à Enovat pour votre recherche de mission ! Quelques questions rapides pour mieux cerner vos compétences et vos attentes.</div>

              <!-- Form -->
              <form ref="emailField" @submit.prevent="sendEmail"  >
                <div class="  mb-8 pt-8">
                  <div class="divide-y divide-gray-200">
                  <div class="py-6 space-y-4 mb-6">
                    <div class="text-lg font-bold text-gray-800 mb-5"><span class="text-indigo-500">1.</span> Vos informations</div>

                    <!-- Nom & Prenom -->
                  <div class="flex space-x-4">
                    <div class="flex-1">
                      <label class="block text-sm font-medium mb-1" for="city">Nom <span class="text-red-500">*</span></label>
                      <input id="city" class="form-input w-full" name="nom" v-model="form.nom"  type="text" required autocomplete="off" />
                    </div>
                    <div class="flex-1">
                      <label class="block text-sm font-medium mb-1" for="postal-code">Prénom <span class="text-red-500">*</span></label>
                      <input id="postal-code" class="form-input w-full" name="prenom" v-model="form.prenom"  type="text" />
                    </div>
                  </div>
                  <!-- Email -->
                  <div>
                    <label class="block text-sm font-medium mb-1" for="company-name">Email <span class="text-red-500">*</span></label>
                    <input id="company-name" class="form-input w-full" name="email" v-model="form.email" type="text" required autocomplete="off" />
                  </div>
                  <!-- Linkedin -->
                  <div>
                    <label class="block text-sm font-medium mb-1" for="company-name">Linkedin</label>
                    <input id="company-name" class="form-input w-full" name="linkedin" v-model="form.linkedin" type="url" />
                  </div>
                  <!-- Domaine -->
                  <div class="flex space-x-4">
                    <div class="flex-1">
                      <label class="block text-sm font-medium mb-1" for="country">Domaine <span class="text-red-500">*</span></label>
                      <select id="country" v-model="form.domaine" name="domaine" class="form-select w-full" required autocomplete="off">
                        <option>Développement logiciel</option>
                        <option>Data & IA</option>
                        <option>Cloud & DevOps</option>
                        <option>Cybersécurité</option>
                        <option>Design UX/UI</option>
                        <option>Management de projet</option>
                        <option>Autre</option>
                      </select>
                    </div>
                      <div class="flex-2">
                        <div>
                        <label class="block text-sm font-medium mb-1" for="company-name">Profession</label>
                        <input id="company-name" name="profession" class="form-input w-full" v-model="form.profession" type="text" />
                      </div>
                    </div>
                  </div>
                  <!-- Expérience -->
                  <div >
                    <label for="experience" class="block text-sm font-medium mb-1">Niveau d’expérience</label>
                    <select id="experience" name="experience"  v-model="form.experience"  class="form-input w-full">
                      <option>Junior (0-2 ans)</option>
                      <option>Confirmé (3-5 ans)</option>
                      <option>Senior (6-9 ans)</option>
                      <option>Expert (10+ ans)</option>
                    </select>
                  </div>
                  </div>

                  <div class=" space-y-4 mb-8">
                    <div class="text-lg font-bold text-gray-800 mb-5"><span class="text-indigo-500">2.</span> Votre projet</div>

                      <!-- Disponibilité -->
                  <div>
                    <label for="disponibilite" class="block text-sm font-medium mb-1">Disponibilité</label>
                    <select id="disponibilite" name="date_debut" v-model="form.date_debut" class="form-input w-full">
                      <option>Disponible immédiatement</option>
                      <option>Dans 1 mois</option>
                      <option>Dans 3 mois</option>
                      <option>À temps partiel uniquement</option>
                    </select>
                  </div>

                  <!-- Localisation -->
                  <div>
                    <label for="localisation" class="block text-sm font-medium mb-1">Localisation / Fuseau horaire</label>
                    <input id="localisation" type="text"  name="location" v-model="form.location" class="form-input w-full" placeholder="Paris, France (GMT+1)" />
                  </div>

                  <!-- TJM -->
                  <div>
                    <label for="tjm" class="block text-sm font-medium mb-1">Taux journalier moyen (TJM) souhaité</label>
                    <input id="tjm" type="text" name="tjm" v-model="form.tjm"  class="form-input w-full" placeholder="Ex. 500 € / jour" />
                  </div>
                  <!-- Champ libre -->
                  <div>
                    <label class="block text-sm font-medium mb-1" for="street">Parlez nous un peu de vous et ce que vous cherchez <span class="text-red-500">*</span></label>
                    <textarea rows="5" id="street" name="champ_libre"  class="border border-gray-200 rounded-sm w-full" v-model="form.champ_libre" type="text" required />
                  </div>
                    <div class="mt-4">
                      <div class="text-xs text-gray-500">    J’accepte que mes informations soient utilisées pour être contacté concernant des missions.</div>
                    </div>
                  </div>
                  </div>

                  </div>
                <div class="flex items-center justify-between">
                  <router-link class="text-sm underline hover:no-underline" to="/nous-contacter">Retour</router-link>
                  <button v-if="!isLoading" type="submit" class="btn-sm cursor-pointer inline-flex items-center ml-auto text-white bg-gray-900 hover:bg-gray-800 group" >
                    Valider
                    <span class="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                    <svg  class="fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width="16" height="8">
                      <path d="m10.865.013.747.148c.243.065.481.143.716.235.495.18.97.42 1.415.716.265.192.571.343.858.55.096.064.192.135.288.209l.196.154.192.178c.09.08.175.168.254.262.189.21.33.466.414.747.076.275.073.568-.008.84-.09.27-.236.513-.427.708-.096.1-.198.191-.306.274l-.152.117-.116.074c-.369.252-.75.482-1.14.69-.577.315-1.153.585-1.701.932-.408.262-.803.549-1.182.86-.083.064-.16.136-.247.193a.918.918 0 0 1-.113.072.644.644 0 0 1-.118.016.708.708 0 0 1-.191.01.559.559 0 0 1-.246-.088l-.072-.054a1.481 1.481 0 0 1-.141-.107c-.128-.122-.1-.377.05-.726.036-.08.079-.156.128-.226l.316-.401c.164-.188.336-.372.514-.543.178-.17.356-.342.546-.493.19-.152.394-.265.59-.39.53-.329 1.05-.626 1.552-.93-.159.018-.32.034-.48.04-.511.036-1.026.044-1.546.048a43.432 43.432 0 0 1-2.31-.058l-.005-.02a78.728 78.728 0 0 0-2.292-.148c-.279-.016-.558.01-.837-.006L4.543 3.81l-.977-.046a19.357 19.357 0 0 1-.49-.029 12.6 12.6 0 0 0-1.303.013l-.828.055-.406.021H.335l-.18.008c-.145 0-.208-.15-.102-.356.16-.268.422-.46.723-.531.57-.117 1.144-.205 1.72-.264.287-.026.576-.048.865-.053.29-.004.578.01.865.042.69.065 1.408-.015 2.113-.015.776.003 1.549.02 2.324.04l1.428.039 1.087.039c.359.012.716.02 1.075.013.442-.008.879-.065 1.318-.112a3.672 3.672 0 0 0-.186-.166 9.045 9.045 0 0 0-1.06-.762 9.82 9.82 0 0 0-1.034-.537 5.9 5.9 0 0 1-1.284-.854c-.12-.115-.053-.199.12-.26a1.55 1.55 0 0 1 .738-.083Z" />
                    </svg>
                  </span>
                  </button>
                  <button disabled v-else type="submit" class="btn-sm cursor-progress inline-flex items-center ml-auto text-white bg-gray-900 hover:bg-gray-800 group" >
                    Valider
                    <span class="tracking-normal text-blue-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                       <svg  class="fill-indigo-500 size-4 animate-spin " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  </span>
                  </button>
                </div>
              </form>

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
                      <img class="rounded-full" src="../images/mehdi.jpeg" width="88" height="88" alt="Testimonial 04" />
                      <svg class="absolute top-0 right-0 fill-indigo-400" width="26" height="17" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 16.026h8.092l6.888-16h-4.592L0 16.026Zm11.02 0h8.092L26 .026h-4.65l-10.33 16Z" />
                      </svg>
                    </div>
                    <figure>
                      <blockquote class="font-bold m-0 pb-1">
                        <p>Ma mission était en parfaite adéquation avec mon expertise, et l’accompagnement constant m’a permis de rester focalisé sur la valeur que j’apporte.</p>
                      </blockquote>
                      <figcaption class="text-sm font-medium">Mehdi Ouaghlani | Architecte Data</figcaption>
                    </figure>
                  </div>
                </div>
                <!-- Testimonial -->
                <div class="p-4 bg-sky-50 border border-sky-200 rounded-xl hover:opacity-100 transition duration-150 ease-in-out">
                  <div class="flex items-center space-x-5">
                    <div class="relative shrink-0">
                      <img class="rounded-full" src="../images/dyalna.jpeg" width="88" height="88" alt="Testimonial 04" />
                      <svg class="absolute top-0 right-0 fill-indigo-400" width="26" height="17" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 16.026h8.092l6.888-16h-4.592L0 16.026Zm11.02 0h8.092L26 .026h-4.65l-10.33 16Z" />
                      </svg>
                    </div>
                    <figure>
                      <blockquote class="font-bold m-0 pb-1">
                        <p>La shortlist ciblée proposée nous a permis de gagner plusieurs semaines sur un projet critique, tout en réduisant considérablement les risques techniques.</p>
                      </blockquote>
                      <figcaption class="text-sm font-medium">Abdelaali Sadki | Head of Platforms for GCC</figcaption>
                    </figure>
                  </div>
                </div>
                <!-- Testimonial -->
                <div class="p-4 bg-sky-50 border border-sky-200 rounded-xl opacity-30 hover:opacity-100 transition duration-150 ease-in-out">
                  <div class="flex items-center space-x-5">
                    <div class="relative shrink-0">
                      <img class="rounded-full" src="../images/antoine.jpeg" width="88" height="88" alt="Testimonial 06" />
                      <svg class="absolute top-0 right-0 fill-indigo-400" width="26" height="17" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 16.026h8.092l6.888-16h-4.592L0 16.026Zm11.02 0h8.092L26 .026h-4.65l-10.33 16Z" />
                      </svg>
                    </div>
                    <figure>
                      <blockquote class="font-bold m-0 pb-1">
                        <p>Un process simple et efficace qui m’a ouvert la porte d’une mission taillée sur mesure, parfaitement alignée avec mon expertise et mes ambitions professionnelles.</p>
                      </blockquote>
                      <figcaption class="text-sm font-medium">Antoine Scoffier | Architecte DevOps & Cloud</figcaption>
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
import { useRouter } from 'vue-router'
import emailjs from '@emailjs/browser'
import { ref } from 'vue'
import { SERVICE_ID, TEMPLATE_B2C_ID, USER_ID } from '../utils/constantes.js'

const form = useFormStore()
const router = useRouter()

const emailField = ref(null)
const isLoading = ref(false)


const sendEmail = () => {
  isLoading.value = true
  emailjs
      .sendForm(SERVICE_ID, TEMPLATE_B2C_ID, emailField.value,  USER_ID)
      .then(
          () => {
            isLoading.value = false
            console.log('SUCCESS!');
            form.resetForm()
            router.push('/c-03')
          },
          (error) => {
            isLoading.value = false
            console.log('FAILED...', error.text);
          },
      );

}



</script>