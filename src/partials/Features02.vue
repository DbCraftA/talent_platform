<template>
  <section class="  bg-linear-to-tr from-white to-indigo-100 ">
    <div class="max-w-6xl mx-auto min-h-[1000px] px-4 sm:px-6">
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
                <p class="text-lg text-gray-500 mb-8">Là où beaucoup de cabinets privilégient la complexité technologique, nous plaçons le business au cœur de notre approche.
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
                        Work is is changing faster than at any other time in history. This rapid change requires a new hiring model.
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
                        Work is is changing faster than at any other time in history. This rapid change requires a new hiring model.
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
                        Work is is changing faster than at any other time in history. This rapid change requires a new hiring model.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- Content #2 -->
              <div v-show="category === '2'">
                <h3 class="h3 font-cabinet-grotesk mb-3">Des freelances validés par des experts du domaine.</h3>
                <p class="text-lg text-gray-500 mb-8">Nous croyons que seuls ceux qui connaissent réellement les enjeux du terrain peuvent évaluer efficacement un profil.
                  C’est pourquoi chaque freelance est validé par un expert du même domaine technique.</p>
                <ul class="inline-flex flex-col space-y-6">
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-indigo-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Évaluations menées par des praticiens (pas des recruteurs)</div>
                      <div class="text-gray-500">
                        Work is is changing faster than at any other time in history. This rapid change requires a new hiring model.
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
                        Work is is changing faster than at any other time in history. This rapid change requires a new hiring model.
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
                        Work is is changing faster than at any other time in history. This rapid change requires a new hiring model.
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

            <!-- Image -->
              <div class="md:w-5/12 lg:w-1/2" data-aos="fade-up" data-aos-delay="100">
                <img class="mx-auto md:max-w-none" src="../images/features-01.png" width="540" height="405" alt="Features" />
              </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Features02',
  data: function () {
    return {
      category: '1'
    }
  },
}
</script>