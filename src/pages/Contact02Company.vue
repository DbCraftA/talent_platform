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
                  <img src="../images/logo.png" class="max-w-none" width="80" height="40" alt="Hero Illustration" />
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

              <h1 class="text-3xl text-gray-800  font-bold mb-6">Votre entreprise, vos besoins</h1>
              <div class="text-gray-500">Merci de faire appel à Enovat pour vos recrutements ! Avant de commencer, quelques questions nous permettront de mieux appréhender vos besoins.</div>

              <!-- Form -->
             <form class="mb-12" ref="emailField" @submit.prevent="sendEmail" >
                    <div class=" divide-gray-200 -my-6 pt-8">

                      <!-- Group #1 -->
                      <div class="py-6 border-b-1 ">
                        <div class="text-lg font-bold text-gray-800 mb-5"><span class="text-indigo-500">1.</span> Votre entreprise</div>
                        <div class="space-y-4">
                          <div class="flex-1">
                            <label class="block text-sm font-medium mb-1" for="city">Nom <span class="text-red-500">*</span></label>
                            <input id="nom" name="nom" class="form-input w-full" v-model="form.nom"  type="text" required autocomplete="off" />
                          </div>
                          <div>
                            <label class="block text-sm font-medium mb-1" for="name">Nom de votre entreprise <span class="text-red-500">*</span></label>
                            <input id="raison" name="raison" class="form-input w-full" v-model="form.raison"  type="text" required autocomplete="off" placeholder="E.g., Acme Inc." />
                          </div>
                          <div>
                            <label class="block text-sm font-medium mb-1" for="email"> Email <span class="text-red-500">*</span></label>
                            <input id="company-name" name="email" class="form-input w-full" v-model="form.email" type="email" required autocomplete="off" />
                          </div>
                          <div>
                            <label class="block text-sm text-gray-800 font-medium mb-1" for="commitment">Combien de collaborateurs compte votre entreprise ? <span class="text-rose-500">*</span></label>
                            <select id="taille_entreprise" name="taille_entreprise" v-model="form.taille_entreprise" class="form-select text-sm py-2 w-full" required>
                              <option>Moins de 10</option>
                              <option>11 - 50</option>
                              <option>51 - 200</option>
                              <option>201 - 1000</option>
                              <option>Supérieur à 1000</option>
                            </select>
                          </div>

                        </div>
                      </div>
                      <div class="sm:flex space-y-3 sm:space-y-0 sm:space-x-4 mb-8 pt-8" >
                        <label class="flex-1 relative block cursor-pointer"  @click="tab = '1'">
                          <input type="radio" name="radio-buttons" class="peer sr-only"  checked />
                          <div class="h-full text-center bg-white  px-4 py-6 rounded-lg border border-gray-200 hover:border-gray-300  shadow-xs transition">
                            <svg class="inline-flex fill-current text-violet-500 mt-2 mb-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10a9.955 9.955 0 0 1-2.003 6.005 2 2 0 0 0-1.382-1.115l-3.293-.732-.295-1.178A4.992 4.992 0 0 0 17 11v-1a5 5 0 0 0-10 0v1c0 1.626.776 3.07 1.977 3.983l-.294 1.175-3.293.732a1.999 1.999 0 0 0-1.384 1.119A9.956 9.956 0 0 1 2 12Zm3.61 7.693A9.96 9.96 0 0 0 12 22c2.431 0 4.66-.868 6.393-2.31l-.212-.847-4.5-1-.496-1.984a5.016 5.016 0 0 1-2.365 0l-.496 1.983-4.5 1-.213.85ZM12 7a3 3 0 0 0-3 3v1a3 3 0 1 0 6 0v-1a3 3 0 0 0-3-3Z" fill-rule="evenodd" />
                            </svg>
                            <div class="font-semibold text-gray-800  mb-1">Architecte</div>
                            <div class="text-sm">Vous cherchez un talent ?</div>
                          </div>
                          <div class="absolute inset-0 border-2 border-transparent peer-checked:border-violet-400  rounded-lg pointer-events-none" aria-hidden="true"></div>
                        </label>
                        <label class="flex-1 relative block cursor-pointer"  @click="tab = '2'">
                          <input type="radio" name="radio-buttons" class="peer sr-only" />
                          <div class="h-full text-center bg-white  px-4 py-6 rounded-lg border border-gray-200  hover:border-gray-300  shadow-xs transition">
                            <svg class="inline-flex fill-current text-violet-500 mt-2 mb-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                              <path d="M13 22V11a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v13H0V14a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v8h2Zm6-15h-2V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7H5V3a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4ZM9 22v-8a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v8h7Zm13 0V11a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v11h7Zm-5-8v-2h3v2h-3Zm0 3v-2h3v2h-3Zm0 3v-2h3v2h-3ZM4 20v-2h3v2H4Zm0-3v-2h3v2H4Z"/>
                            </svg>
                            <div class="font-semibold text-gray-800  mb-1">Projet</div>
                            <div class="text-sm">Vous cherchez un accompagnement ?</div>
                          </div>
                          <div class="absolute inset-0 border-2 border-transparent peer-checked:border-violet-400  rounded-lg pointer-events-none" aria-hidden="true"></div>
                        </label>
                      </div>
                      <transition
                          enter-active-class="transition ease-in-out duration-700 transform order-first"
                          enter-from-class="opacity-0 translate-x-8"
                          enter-to-class="opacity-100 translate-x-0"
                          leave-active-class="transition ease-in-out duration-300 transform absolute"
                          leave-from-class="opacity-100 translate-x-0"
                          leave-to-class="opacity-0 -translate-x-8"
                      >

                      <div v-show="tab === '1'">

                          <!-- Group #2 -->
                          <div class="py-6">
                            <div class="text-lg font-bold text-gray-800 mb-5"><span class="text-indigo-500">2.</span> Le talent que vous cherchez</div>
                            <div class="space-y-4">
                              <div>
                                <label class="block text-sm text-gray-800 font-medium mb-1" for="role">Quel profil recherchez-vous ?  <span class="text-rose-500">*</span></label>
                                <select id="role" name="role" v-model="form.role"  class="form-select text-sm py-2 w-full" :required="tab === '1'">
                                  <option>Architecte d’Entreprise</option>
                                  <option>Architecte Applicatif</option>
                                  <option>Architecte Logiciel</option>
                                  <option>Architecte Cloud</option>
                                  <option>Architecte Infrastructure</option>
                                  <option>Architecte Réseau & Sécurité</option>
                                  <option>Architecte Data</option>
                                  <option>Architecte Intelligence Artificielle</option>
                                  <option>Architecte DevOps</option>
                                  <option>Architecte Solutions</option>
                                  <option>Architecte Technique</option>
                                  <option>Architecte Intégration</option>
                                  <option>Architecte SI (Systèmes d’Information)</option>
                                  <option>Autre</option>
                                </select>
                              </div>
                              <div>
                                <label class="block text-sm text-gray-800 font-medium mb-1" for="commitment">Quelle disponibilité attendez-vous du profil ? <span class="text-rose-500">*</span></label>
                                <select id="temps_par_semaine" name="temps_par_semaine" v-model="form.temps_par_semaine" class="form-select text-sm py-2 w-full" :required="tab === '1'">
                                  <option>Temps plein</option>
                                  <option>Temps partiel</option>
                                  <option>Stage</option>
                                  <option>Contrat / Freelance</option>
                                  <option>CDI</option>
                                  <option>Co-fondateur</option>
                                </select>
                              </div>

                              <div>
                                <label class="block text-sm text-gray-800 font-medium mb-1" for="description">Description du poste<span class="text-rose-500">*</span></label>
                                <textarea id="description_poste"  name="description_poste" v-model="form.description_poste"  class="form-textarea text-sm py-2 w-full" rows="4" :required="tab === '1'"></textarea>
                                <div class="text-xs text-gray-500 italic mt-2">Exemple: “Architecte cloud aws ”</div>
                              </div>
                            </div>
                          </div>

                          <!-- Group #3 -->
                          <div class="py-6">
                            <div class="text-lg font-bold text-gray-800 mb-5"><span class="text-indigo-500">3.</span> Votre projet en quelques mots</div>
                            <div class="space-y-4">
                              <div>
                                <label class="block text-sm text-gray-800 font-medium mb-1" for="commitment">Pour quel type de projet recrutez-vous ?  <span class="text-rose-500">*</span></label>
                                <select id="motif_projet"  name="motif_projet" v-model="form.motif_projet"  class="form-select text-sm py-2 w-full" :required="tab === '1'">
                                  <option>Nouvelle idée ou projet</option>
                                  <option>Un projet qui a besoin de nouvelles ressources </option>
                                  <option>Autre</option>
                                </select>
                              </div>
                              <div>
                                <label class="block text-sm text-gray-800 font-medium mb-1" for="commitment">Quelle est la durée estimée de la collobaration ? </label>
                                <select id="duree"  name="duree_mission" v-model="form.duree_mission"  class="form-select text-sm py-2 w-full" :required="tab === '1'">
                                  <option>Court terme (1 à 2 mois)</option>
                                  <option>Moyen terme (3 à 6 mois)</option>
                                  <option>Long terme (6 mois et +)</option>
                                  <option>Je ne sais pas encore</option>
                                </select>
                              </div>
                              <div>
                                <label class="block text-sm text-gray-800 font-medium mb-1" for="commitment">Quelle est votre date idéale de démarrage ? </label>
                                <select id="date_debut"  name="date_debut" v-model="form.date_debut"  class="form-select text-sm py-2 w-full" :required="tab === '1'">
                                  <option>Dès que possible</option>
                                  <option>Dans 1 mois</option>
                                  <option>Dans 3 mois</option>
                                  <option>Dans 3 mois</option>
                                  <option>Je me déciderai plus tard</option>
                                </select>
                              </div>
                              <!-- Champ libre -->
                              <div>
                                <label class="block text-sm font-medium mb-1" for="street">Pouvez-vous décrire brièvement votre projet ?</label>
                                <textarea rows="5" id="street" name="champ_libre"   class="border border-gray-200 rounded-sm w-full" v-model="form.champ_libre" type="text" />
                              </div>
                            </div>
                            <div class="mt-4">
                              <div class="text-xs text-gray-500"> J’accepte que mes informations soient utilisées pour être contacté concernant des missions.</div>
                            </div>
                          </div>

                      </div>
                      </transition>
                      <transition
                          enter-active-class="transition ease-in-out duration-700 transform order-first"
                          enter-from-class="opacity-0 translate-x-8"
                          enter-to-class="opacity-100 translate-x-0"
                          leave-active-class="transition ease-in-out duration-300 transform absolute"
                          leave-from-class="opacity-100 translate-x-0"
                          leave-to-class="opacity-0 -translate-x-8"
                      >
                        <div v-show="tab === '2'">

                          <!-- Group #2 -->
                          <div class="py-6">
                            <div class="text-lg font-bold text-gray-800 mb-5"><span class="text-indigo-500">2.</span> Votre besoin d’accompagnement</div>
                            <div class="space-y-4">
                              <div>
                                <label class="block text-sm text-gray-800 font-medium mb-1" >Quel type d’accompagnement recherchez-vous ? <span class="text-rose-500">*</span></label>
                                <select id="motif_projet" name="motif_projet" v-model="form.motif_projet" class="form-select text-sm py-2 w-full" :required="tab === '2'">
                                  <option>Accompagnement stratégique (vision, roadmap, alignement business/tech)</option>
                                  <option>Assessment technique (audit d’architecture, évaluation IA & Cloud, dette technique)</option>
                                  <option>Renforcement d’équipe (mise à disposition de profils experts)</option>
                                  <option>Autre</option>
                                </select>
                              </div>
                              <div>
                                <label class="block text-sm text-gray-800 font-medium mb-1" for="priorite">Quelle est votre priorité principale ? <span class="text-rose-500">*</span></label>
                                <select id="priorite" name="priorite" v-model="form.priorite" class="form-select text-sm py-2 w-full" :required="tab === '2'" >
                                  <option>Réduire la dette technique</option>
                                  <option>Accélérer l’innovation</option>
                                  <option>Améliorer la performance opérationnelle</option>
                                  <option>Sécuriser et fiabiliser mon système</option>
                                  <option>Explorer de nouveaux cas d’usage IA / Cloud</option>
                                  <option>Autre</option>
                                </select>
                              </div>
                              <div>
                                <label class="block text-sm text-gray-800 font-medium mb-1" for="description_besoin">Décrivez votre besoin ou votre défi actuel<span class="text-rose-500">*</span></label>
                                <textarea rows="5" id="description_besoin" name="description_besoin" class="border border-gray-200 rounded-sm w-full" v-model="form.description_besoin" type="text" :required="tab === '2'">Exemple : “Nous voulons évaluer notre architecture cloud et définir une roadmap IA adaptée à notre activité.”</textarea>
                                <div class="text-xs text-gray-500 italic mt-2">Exemple : “Nous voulons évaluer notre architecture cloud et définir une roadmap IA adaptée à notre activité.”</div>
                              </div>
                            </div>
                          </div>

                          <!-- Group #3 -->
                          <div class="py-6">
                            <div class="text-lg font-bold text-gray-800 mb-5"><span class="text-indigo-500">3.</span> Votre projet en quelques mots</div>
                            <div class="space-y-4">
                              <div>
                                <label class="block text-sm text-gray-800 font-medium mb-1" for="contexte">Quel est le contexte de votre projet ? <span class="text-rose-500">*</span></label>
                                <select id="contexte" name="contexte" v-model="form.contexte" class="form-select text-sm py-2 w-full" :required="tab === '2'">
                                  <option>Nouvelle initiative stratégique</option>
                                  <option>Refonte ou optimisation d’un système existant</option>
                                  <option>Exploration et cadrage IA / Cloud</option>
                                  <option>Audit / Diagnostic pour prise de décision</option>
                                </select>
                              </div>
                              <div>
                                <label class="block text-sm text-gray-800 font-medium mb-1" for="duree">Quelle durée de mission envisagez-vous ?</label>
                                <select id="duree" name="duree" v-model="form.duree_mission" class="form-select text-sm py-2 w-full" :required="tab === '2'">
                                  <option>Court terme (1 à 2 mois)</option>
                                  <option>Moyen terme (3 à 6 mois)</option>
                                  <option>Long terme (6 mois et +)</option>
                                  <option>Je ne sais pas encore</option>
                                </select>
                              </div>
                              <div>
                                <label class="block text-sm text-gray-800 font-medium mb-1" for="date_debut">Quelle est votre date idéale de démarrage ?</label>
                                <select id="date_debut" name="date_debut" v-model="form.date_debut" class="form-select text-sm py-2 w-full" :required="tab === '2'">
                                  <option>Dès que possible</option>
                                  <option>Dans 1 mois</option>
                                  <option>Dans 3 mois</option>
                                  <option>Je déciderai plus tard</option>
                                </select>
                              </div>
                              <!-- Champ libre -->
                              <div>
                                <label class="block text-sm font-medium mb-1" for="champ_libre">Souhaitez-vous partager un élément clé (objectif, contrainte, deadline) ?</label>
                                <textarea rows="5" id="champ_libre" name="champ_libre" class="border border-gray-200 rounded-sm w-full" v-model="form.champ_libre" type="text"></textarea>
                              </div>
                            </div>
                            <div class="mt-4">
                              <div class="text-xs text-gray-500">J’accepte que mes informations soient utilisées pour être recontacté dans le cadre de mon projet d’accompagnement.</div>
                            </div>
                          </div>

                        </div>
                      </transition>

                    </div>
                     <div class="flex items-center justify-between pt-5">
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
import { SERVICE_ID, TEMPLATE_B2B_ID, USER_ID } from '../utils/constantes.js'

const form = useFormStore()
const router = useRouter()

const emailField = ref(null)
const isLoading = ref(false)


const tab = ref('1')


const sendEmail = () => {
  isLoading.value = true
  emailjs
      .sendForm(SERVICE_ID, TEMPLATE_B2B_ID, emailField.value,  USER_ID)
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