<template>
  <section class="  bg-linear-to-tr from-white to-indigo-100 ">
    <div class="max-w-6xl mx-auto min-h-[1100px] px-4 sm:px-6">
      <div class="py-12 md:py-20">

        <!-- Section header -->
        <div class="max-w-3xl mx-auto text-center pb-12 md:pb-16">
          <h2 class="h2 font-cabinet-grotesk">Notre mission : connecter expertise tech et performance business.</h2>
        </div>

        <div>

          <!-- Category buttons -->
          <div class="pb-12 md:pb-20">
            <div class="flex flex-wrap justify-center -m-1.5">
              <button class="btn-sm m-1.5 h-8 shadow-sm" :class="category === '1' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-900 hover:bg-indigo-50'" @click="category = '1'">La technologie au service du business</button>
              <button class="btn-sm m-1.5 h-8 shadow-sm" :class="category === '2' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-900 hover:bg-indigo-50'" @click="category = '2'">Experts validés par des pairs</button>
              <button class="btn-sm m-1.5 h-8 shadow-sm" :class="category === '3' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-900 hover:bg-indigo-50'" @click="category = '3'">Focus IA & Cloud</button>
              <button class="btn-sm m-1.5 h-8 shadow-sm" :class="category === '4' ? 'bg-indigo-500 text-white' : 'bg-white text-gray-900 hover:bg-indigo-50'" @click="category = '4'">Rigeur et agilité</button>
            </div>
          </div>

          <!-- Section content -->
          <div class="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-8 space-y-reverse md:space-y-0">

            <!-- Content -->
            <div class="md:w-7/12 lg:w-1/2 order-1 md:order-none" data-aos="fade-up">
              <!-- Content #1 -->
              <div v-show="category === '1'">
                <h3 class="h3 font-cabinet-grotesk mb-3">La technologie au service du business , pas l’inverse.</h3>
                <p class="text-lg text-gray-500 mb-8">Plutôt que de mettre l’accent sur la complexité technologique, nous choisissons de placer le business au cœur de notre approche. Chaque décision technique est guidée par sa capacité à générer de la valeur et à soutenir vos objectifs.
                 </p>
                <ul class="inline-flex flex-col space-y-6">
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-indigo-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Identification des cas d'usage à fort ROI avant toute
                        considération technique</div>
                      <div class="text-gray-500">
                        Nous commençons systématiquement par analyser et sélectionner les cas d’usage qui apportent le plus de valeur ajoutée à l’entreprise, afin de garantir un impact concret et mesurable.
                      </div>
                    </div>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-indigo-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Capacité à traduire des concepts techniques en langage
                        business</div>
                      <div class="text-gray-500">
                        Nos équipes traduisent les notions technologiques complexes en un langage clair et compréhensible, facilitant ainsi la prise de décision et l’alignement avec les objectifs stratégiques.
                      </div>
                    </div>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-indigo-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Solutions dimensionnées aux besoins réels et non
                        surdimensionnées</div>
                      <div class="text-gray-500">
                        Nous concevons des solutions adaptées à la taille et aux enjeux spécifiques de chaque client, en évitant toute complexité ou surcoût superflu.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- Content #2 -->
              <div v-show="category === '2'">
                <h3 class="h3 font-cabinet-grotesk mb-3">Des freelances validés par des experts du domaine.</h3>
                <p class="text-lg text-gray-500 mb-8">Des architectes logiciels validés par des experts du domaine. Nous pensons que seuls ceux qui maîtrisent réellement les enjeux du métier peuvent évaluer efficacement un profil.
                  C’est pourquoi chaque architecte logiciel est validé par un expert du même domaine technique.
                </p>
                <ul class="inline-flex flex-col space-y-6">
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-indigo-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Évaluations menées par des praticiens (pas des recruteurs)</div>
                      <div class="text-gray-500">Le secteur évolue plus rapidement que jamais. Cette transformation exige un nouveau modèle d’évaluation et de sélection.
                      </div>
                    </div>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-indigo-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Grilles métiers spécifiques à chaque spécialité (ML, Data, DevOps, Cloud...)</div>
                      <div class="text-gray-500">
                        Chaque domaine possède ses propres exigences, c’est pourquoi nous utilisons des référentiels adaptés à chaque spécialité.
                      </div>
                    </div>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-indigo-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Entretiens approfondis sur des cas concrets et récents</div>
                      <div class="text-gray-500">
                        Nous évaluons les architectes logiciels à travers des mises en situation réelles, reflétant les défis actuels du secteur.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- Content #3 -->
              <div v-show="category === '3'">
                <h3 class="h3 font-cabinet-grotesk mb-3">Des packs prêts à l’emploi pour vos projets Cloud & IA.</h3>
                <p class="text-lg text-gray-500 mb-8">Nous mettons à votre disposition des solutions packagées qui combinent expertise stratégique et accompagnement opérationnel.
                  Nos packs couvrent vos besoins essentiels — du cadrage cloud à l’accélération de vos cas d’usage— pour vous offrir rapidité, visibilité et résultats concrets.</p>
                <ul class="inline-flex flex-col space-y-6">
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-indigo-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Expertise Cloud</div>
                      <div class="text-gray-500">
                        Un accompagnement complet pour poser les bases de votre transformation cloud : audit de votre infrastructure, définition d’une architecture cible et d’une roadmap claire, puis identification d’un expert cloud pour piloter la mise en œuvre. Vous bénéficiez d’une solution clé en main, avec un prix prévisible et des résultats garantis.
                      </div>
                    </div>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-indigo-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Expertise Data & IA</div>
                      <div class="text-gray-500">
                        Une approche pragmatique pour passer de l’idée à la valeur : évaluation de vos cas d’usage IA, conception d’un POC rapide et mise en place d’une architecture Data & MLOps adaptée. L’objectif : accélérer vos projets IA et assurer un passage maîtrisé du POC à la production.                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- Content #4 -->
              <div v-show="category === '4'">
                <h3 class="h3 font-cabinet-grotesk mb-3">La rigueur d’un grand groupe et l’agilité d’une scale-up.</h3>
                <p class="text-lg text-gray-500 mb-8">Nous combinons la rigueur et la vision des meilleurs cabinets de conseil avec la rapidité et la flexibilité d’une startup. Une approche hybride qui vous garantit à la fois solidité stratégique et efficacité opérationnelle.</p>
                <ul class="inline-flex flex-col space-y-6">
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-indigo-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Excellence technique</div>
                      <div class="text-gray-500">
                        Notre force : le niveau d’exigence des grands cabinets, allié à des méthodes structurées, une vision technologique globale et une parfaite maîtrise des dernières innovations.
                      </div>
                    </div>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-indigo-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Attributs startup</div>
                      <div class="text-gray-500">
                        Nous allions agilité et rapidité d’exécution avec une proximité renforcée, des coûts optimisés et des solutions pragmatiques toujours orientées résultats.                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Image
              <div class="md:w-5/12 lg:w-1/2" data-aos="fade-up" data-aos-delay="100">
                <img class="mx-auto md:max-w-none" src="../images/features-01.png" width="540" height="405" alt="Features" />
              </div>
              -->
            <div class="pl-5 pt-25  xl:pl-30" data-aos="zoom-y-out">
              <div class="text-center">
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
            <!-- Animation Moving
            <div class="md:w-5/12 lg:w-1/2 max-[700px]:hidden" data-aos="fade-up" data-aos-delay="100">
              <div class="relative py-40 pt-60 -mt-12">

                <Particles class="absolute inset-0 -z-10" :quantity="8" :staticity="30" />
                <div class="flex items-center justify-center">
                  <div class="relative w-48 h-48 flex justify-center items-center">
                    <svg class="absolute  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none blur-md" width="480" height="480" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="pulse-a" x1="50%" x2="50%" y1="100%" y2="0%">
                          <stop offset="0%" stop-color="var(--color-indigo-300)" />
                          <stop offset="76.382%" stop-color="var(--color-indigo-300)" />
                          <stop offset="100%" stop-color="var(--color-indigo-300)" />
                        </linearGradient>
                      </defs>
                      <g fill-rule="evenodd">
                        <path class="pulse" fill="url(#pulse-a)" fill-rule="evenodd" d="M240,0 C372.5484,0 480,107.4516 480,240 C480,372.5484 372.5484,480 240,480 C107.4516,480 0,372.5484 0,240 C0,107.4516 107.4516,0 240,0 Z M240,88.8 C156.4944,88.8 88.8,156.4944 88.8,240 C88.8,323.5056 156.4944,391.2 240,391.2 C323.5056,391.2 391.2,323.5056 391.2,240 C391.2,156.4944 323.5056,88.8 240,88.8 Z"></path>
                        <path class="pulse pulse-1" fill="url(#pulse-a)" fill-rule="evenodd" d="M240,0 C372.5484,0 480,107.4516 480,240 C480,372.5484 372.5484,480 240,480 C107.4516,480 0,372.5484 0,240 C0,107.4516 107.4516,0 240,0 Z M240,88.8 C156.4944,88.8 88.8,156.4944 88.8,240 C88.8,323.5056 156.4944,391.2 240,391.2 C323.5056,391.2 391.2,323.5056 391.2,240 C391.2,156.4944 323.5056,88.8 240,88.8 Z"></path>
                        <path class="pulse pulse-2" fill="url(#pulse-a)" fill-rule="evenodd" d="M240,0 C372.5484,0 480,107.4516 480,240 C480,372.5484 372.5484,480 240,480 C107.4516,480 0,372.5484 0,240 C0,107.4516 107.4516,0 240,0 Z M240,88.8 C156.4944,88.8 88.8,156.4944 88.8,240 C88.8,323.5056 156.4944,391.2 240,391.2 C323.5056,391.2 391.2,323.5056 391.2,240 C391.2,156.4944 323.5056,88.8 240,88.8 Z"></path>
                      </g>
                    </svg>
                    <div class="absolute  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[500px] h-[500px] rounded-full overflow-hidden [mask-image:_radial-gradient(black,_transparent_60%)]">
                      <div class="h-[200%] animate-endless">
                        <div class="absolute inset-0 [background:repeating-linear-gradient(transparent,transparent_48px,var(--color-white)_48px,var(--color-white)_49px)] blur-[2px] opacity-20"></div>
                        <div class="absolute inset-0 [background:repeating-linear-gradient(transparent,transparent_48px,var(--color-indigo-500)_48px,var(--color-indigo-500)_49px)]"></div>
                        <div class="absolute inset-0 [background:repeating-linear-gradient(90deg,transparent,transparent_48px,var(--color-white)_48px,var(--color-white)_49px)] blur-[2px] opacity-20"></div>
                        <div class="absolute inset-0 [background:repeating-linear-gradient(90deg,transparent,transparent_48px,var(--color-indigo-500)_48px,var(--color-indigo-500)_49px)]"></div>
                      </div>
                    </div>
                    <transition
                        enter-active-class="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                        enter-from-class="opacity-0 -rotate-[60deg]"
                        enter-to-class="opacity-100 rotate-0"
                        leave-active-class="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 absolute"
                        leave-from-class="opacity-100 rotate-0"
                        leave-to-class="opacity-0 rotate-[60deg]"
                    >
                      <div class="absolute" v-show="category === '1'">
                        <div class="relative flex items-center justify-center w-16 h-16 border border-transparent rounded-2xl shadow-2xl -rotate-[14deg] [background:linear-gradient(var(--color-slate-900),var(--color-slate-900))_padding-box,conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)_border-box] before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-2xl">
                          <svg class="relative fill-slate-200" xmlns="http://www.w3.org/2000/svg" width="26" height="14">
                            <path fill-rule="nonzero" d="m10 5.414-8 8L.586 12 10 2.586l6 6 8-8L25.414 2 16 11.414z" />
                          </svg>
                        </div>
                      </div>
                    </transition>
                    <transition
                        enter-active-class="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                        enter-from-class="opacity-0 -rotate-[60deg]"
                        enter-to-class="opacity-100 rotate-0"
                        leave-active-class="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 absolute"
                        leave-from-class="opacity-100 rotate-0"
                        leave-to-class="opacity-0 rotate-[60deg]"
                    >
                      <div class="absolute" v-show="category === '2'">
                        <div class="relative flex items-center justify-center w-16 h-16 border border-transparent rounded-2xl shadow-2xl -rotate-[14deg] [background:linear-gradient(var(--color-slate-900),var(--color-slate-900))_padding-box,conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)_border-box] before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-2xl">

                          <img class=" " src="../images/expert.png" width="36" height="14" alt="Icon 02">

                        </div>
                      </div>
                    </transition>
                    <transition
                        enter-active-class="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                        enter-from-class="opacity-0 -rotate-[60deg]"
                        enter-to-class="opacity-100 rotate-0"
                        leave-active-class="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 absolute"
                        leave-from-class="opacity-100 rotate-0"
                        leave-to-class="opacity-0 rotate-[60deg]"
                    >
                      <div class="absolute" v-show="category === '3'">
                        <div class="relative flex items-center justify-center w-16 h-16 border border-transparent rounded-2xl shadow-2xl -rotate-[14deg] [background:linear-gradient(var(--color-slate-900),var(--color-slate-900))_padding-box,conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)_border-box] before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-2xl">
                          <img class="shrink-0 " src="../images/ia.png" width="36" height="14" alt="Icon 02">

                        </div>
                      </div>

                    </transition>
                    <transition
                        enter-active-class="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                        enter-from-class="opacity-0 -rotate-[60deg]"
                        enter-to-class="opacity-100 rotate-0"
                        leave-active-class="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 absolute"
                        leave-from-class="opacity-100 rotate-0"
                        leave-to-class="opacity-0 rotate-[60deg]"
                    >
                      <div class="absolute" v-show="category === '4'">
                        <div class="relative flex items-center justify-center w-16 h-16 border border-transparent rounded-2xl shadow-2xl -rotate-[14deg] [background:linear-gradient(var(--color-slate-900),var(--color-slate-900))_padding-box,conic-gradient(var(--color-slate-400),var(--color-slate-700)_25%,var(--color-slate-700)_75%,var(--color-slate-400)_100%)_border-box] before:absolute before:inset-0 before:bg-slate-800/30 before:rounded-2xl">
                          <svg class="relative fill-slate-200" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                            <path d="M18 14h-2V8h2c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4v2H8V4c0-2.2-1.8-4-4-4S0 1.8 0 4s1.8 4 4 4h2v6H4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4v-2h6v2c0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4ZM16 4c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2h-2V4ZM2 4c0-1.1.9-2 2-2s2 .9 2 2v2H4c-1.1 0-2-.9-2-2Zm4 14c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2h2v2ZM8 8h6v6H8V8Zm10 12c-1.1 0-2-.9-2-2v-2h2c1.1 0 2 .9 2 2s-.9 2-2 2Z" />
                          </svg>
                        </div>
                      </div>

                    </transition>
                  </div>
                </div>
              </div>
            </div>
            -->
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import Particles from './Particles.vue'
export default {
  name: 'Features02',
  components: {
    Particles
  },
  data: function () {
    return {
      category: '1'
    }
  },
  setup() {

    const tab = ref('1')

    return {
      tab,
    }
  },
}
</script>