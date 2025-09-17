<template>
  <section class="bg-linear-to-b from-indigo-200 to-white pb-10 pt-20">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <!-- Section header -->
      <div class="mx-auto max-w-3xl pb-12 text-center md:pb-20">
        <h2
            class="font-nacelle animate-[gradient_6s_linear_infinite] text-black/80 bg-[length:200%_auto] pb-4 text-3xl font-semibold md:text-4xl"
        >
          Notre méthode d'accompagnement
        </h2>
        <p class="text-lg text-gray-500">
          Chaque client a des besoins uniques. Selon le contexte, nous
          intervenons soit en accompagnement stratégique pour cadrer et
          orienter le projet, soit en mise à disposition rapide des meilleurs
          profils experts. Notre méthode garantit agilité et pertinence à
          chaque étape.
        </p>
      </div>
      <div class="grid grid-cols-12 gap-x-3 items-start ">
        <!-- SVG timeline (gauche) -->
        <div class="col-span-12 md:col-span-4 flex justify-center invisible sm:visible" data-aos-id-methode>
          <div class="w-0 relative sm:w-85">
            <svg viewBox="0 0 200 820" preserveAspectRatio="xMidYMid meet" class="w-full h-auto">
              <!-- vertical line top to fork -->
              <path d="M100 20 L100 180" stroke="#111827" stroke-width="1" fill="none"      data-aos="fade-up"  data-aos-anchor="[data-aos-id-methode]" />
              <path d="M100 180
         C80 220, 60 280, 60 360"
                    stroke="#111827" stroke-width="1" fill="none"
                    data-aos="fade-up" data-aos-anchor="[data-aos-id-methode]" data-aos-delay="400"/>

              <!-- Branche droite (arc arrondi jusqu’au nœud 360) -->
              <path d="M100 180
         C120 220, 140 280, 140 360"
                    stroke="#111827" stroke-width="1" fill="none"
                    data-aos="fade-up" data-aos-anchor="[data-aos-id-methode]" data-aos-delay="400"/>

              <!-- left branch down (arc de retour vers fusion) -->
              <path d="M60 360
         C60 440, 80 520, 100 580"
                    stroke="#111827" stroke-width="1" fill="none"
                    data-aos="fade-up" data-aos-anchor="[data-aos-id-methode]" data-aos-delay="600"/>

              <!-- right branch down (arc de retour vers fusion) -->
              <path d="M140 360
         C140 440, 120 520, 100 580"
                    stroke="#111827" stroke-width="1" fill="none"
                    data-aos="fade-up" data-aos-anchor="[data-aos-id-methode]" data-aos-delay="600"/>
              <!-- vertical line after merge -->
              <path d="M100 580 L100 780" stroke="#111827" stroke-width="1" fill="none"  data-aos="fade-up"  data-aos-anchor="[data-aos-id-methode]" data-aos-delay="800" />

              <!-- nodes circles -->
              <!-- node 1 top -->
              <circle cx="100" cy="20" r="4" fill="#6366f1" stroke="#0f172a" stroke-width="3"  data-aos="fade-up"  data-aos-anchor="[data-aos-id-methode]" />
              <!-- node fork center -->
              <circle cx="100" cy="180" r="4" fill="#6366f1" stroke="#0f172a" stroke-width="3" data-aos="fade-up"  data-aos-anchor="[data-aos-id-methode]" data-aos-delay="400"/>
              <!-- left branch node -->
              <circle cx="60" cy="360" r="4" fill="#6366f1" stroke="#0f172a" stroke-width="3" data-aos="fade-up"  data-aos-anchor="[data-aos-id-methode]" data-aos-delay="500" />
              <!-- right branch node -->
              <circle cx="140" cy="360" r="4" fill="#6366f1" stroke="#0f172a" stroke-width="3" data-aos="fade-up"  data-aos-anchor="[data-aos-id-methode]" data-aos-delay="500"/>
              <!-- merge node -->
              <circle cx="100" cy="580" r="4" fill="#6366f1" stroke="#0f172a" stroke-width="3" data-aos="fade-up"  data-aos-anchor="[data-aos-id-methode]" data-aos-delay="700"/>
              <!-- bottom node -->
              <circle cx="100" cy="780" r="4" fill="#6366f1" stroke="#0f172a" stroke-width="3" data-aos="fade-up"  data-aos-anchor="[data-aos-id-methode]" data-aos-delay="800" />

              <!-- numbers next to nodes absolute left-0 inline-flex rounded-full bg-indigo-500/25 px-2.5 py-0.5 text-md font-semibold text-indigo-500-->
              <text x="80" y="25" font-size="8" fill="#111827" font-weight="bold" class="absolute left-0 inline-flex rounded-full bg-indigo-500/25 px-2.5 py-0.5 text-md font-semibold text-indigo-500">1</text>
              <text x="80" y="185" font-size="8" fill="#111827" font-weight="bold">2</text>
              <text x="30" y="362" font-size="8" fill="#111827" font-weight="bold">a</text>
              <text x="160" y="362" font-size="8" fill="#111827" font-weight="bold">b</text>
              <text x="80" y="585" font-size="8" fill="#111827" font-weight="bold">3</text>
              <text x="80" y="785" font-size="8" fill="#111827" font-weight="bold">4</text>
            </svg>
          </div>
        </div>

        <!-- Texts (droite) -->
        <div class="col-span-12 md:col-span-8">
          <!-- Row 1: Analyse du besoin -->
          <div class="mb-12 md:mb-16">
            <div class="text-md text-indigo-500 mb-2">1 - Diagnostic Initial et Analyse Approfondie</div>
            <h3 class="text-2xl font-bold text-black mb-2">Comprendre pour mieux vous accompagner</h3>
            <p class="text-gray-600 mb-3">
              Nous commençons toujours par une phase d'écoute et d'analyse pour saisir l'essence de votre besoin :
            </p>
            <ul class="text-gray-600 list-disc pl-4 space-y-1">
              <li><strong>Exploration des objectifs business:</strong> Identification des résultats attendus et des indicateurs de succès</li>
              <li><strong>Cartographie du périmètre technique:</strong> Évaluation de l'existant et des contraintes techniques</li>
              <li><strong>Analyse des compétences internes:</strong> Identification des forces et des besoins en renfort</li>
            </ul>
          </div>

          <!-- Row 1: Analyse du besoin -->
          <div class="mb-12 md:mb-16">
            <div class="text-md text-indigo-500 mb-2">2 - Proposition d’accompagnement Dual </div>
            <h3 class="text-2xl font-bold text-black mb-2">La bonne approche au bon moment </h3>
            <p class="text-gray-600">
              La bonne approche au bon moment : en fonction de votre maturité et de vos besoins, nous vous proposons l’une de ces 2 approches complémentaires             </p>
            <div class="mt-10 mb-12 md:mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

              <!-- Branch 1 - Strategy -->
              <div class="pl-6 md:pl-0">
                <div class="text-md text-indigo-500 mb-2">a - Voie Stratégique : Conseil & Cadrage</div>
                <h4 class="text-xl font-semibold text-black mb-2">Cadrage stratégique</h4>
                <p class="text-gray-600 mb-3">
                  Pour structurer votre vision et définir la feuille de route
                </p>
                <ul class="text-gray-600 list-disc pl-4 space-y-1">
                  <li><strong>Assessment technologique </strong>: Évaluation de votre maturité et identification des opportunités</li>
                  <li><strong>Architecture cible </strong>: Conception de solutions pérennes et évolutives</li>
                  <li><strong>Roadmap d'implémentation </strong>: Planification des étapes clés et des ressources nécessaires</li>
                  <li><strong>Gouvernance et bonnes pratiques </strong>: Définition des standards et méthodologies</li>
                </ul>
              </div>

              <!-- Branch 2 - Experts -->
              <div class="pl-6 md:pl-0">
                <div class="text-md text-indigo-500 mb-2">b - Voie Opérationnelle : Experts & Exécution</div>
                <h4 class="text-xl font-semibold text-black mb-2">Mise à disposition d’experts</h4>
                <p class="text-gray-600 mb-3">
                  Pour accélérer vos projets avec les meilleurs talents
                </p>
                <ul class="text-gray-600 list-disc pl-4 space-y-1">
                  <li><strong>Mise à disposition d'experts </strong>: Architectes</li>
                  <li><strong>Renfort d'équipes existantes </strong>: Intégration harmonieuse dans vos structures</li>
                  <li><strong>Leadership technique </strong>: Mentoring de vos équipes</li>
                  <li><strong>Delivery opérationnel </strong>: Réalisation concrète des objectifs définis</li>
                </ul>
              </div>
            </div>
          </div>



          <!-- Row 3: Validation et engagement -->
          <div class="mb-12 md:mb-16">
            <div class="text-md text-indigo-500 mb-2">3 - Sélection et Validation collaborative </div>
            <h3 class="text-2xl font-bold text-black mb-2">Transparence et confiance dans le choix des solutions</h3>
            <p class="text-gray-600 mb-3">
              Nous vous impliquons pleinement dans le processus de sélection pour garantir une adhésion totale :
            </p>
            <ul class="text-gray-600 list-disc pl-4 space-y-1">
              <li><strong>Présentation d'options ciblées : </strong> Shortlist de 2-3 solutions ou profils soigneusement présélectionnés</li>
              <li><strong>Entretiens de validation : </strong> Rencontres directes avec les experts proposés</li>
              <li><strong>Démonstration d'expertise : </strong> Cas pratiques ou présentations techniques adaptés à votre contexte</li>
              <li><strong>Engagement contractuel clair : </strong> Objectifs, livrables et modalités d'intervention définis sans ambiguïté</li>
            </ul>
          </div>

          <!-- Row 4: Intégration & suivi -->
          <div>
            <div class="text-md text-indigo-500 mb-2">4 - Accompagnement et Suivi d’impact </div>
            <h3 class="text-2xl font-bold text-black mb-2">Au-delà de l'intervention, la garantie de résultats</h3>
            <p class="text-gray-600 mb-3">
              Notre engagement ne s'arrête pas au démarrage de la mission, nous assurons un suivi rigoureux :
            </p>
            <ul class="text-gray-600 list-disc pl-4 space-y-1">
              <li><strong>Onboarding structuré : </strong> Intégration efficace dans votre environnement et vos équipes</li>
              <li><strong>Points de pilotage réguliers : </strong> Suivi des avancées et ajustements si nécessaire</li>
              <li><strong>Mesure continue de la performance : </strong>  Évaluation des résultats selon les KPIs définis ensemble</li>
              <li><strong>Transfert de compétences : </strong> Formation de vos équipes pour pérenniser les acquis</li>
              <li><strong>Bilan de fin de mission : </strong> Capitalisation sur l'expérience et recommandations pour la suite</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Section footer -->
      <div class="mx-auto max-w-3xl pt-12  text-center text-black md:pt-20">
          <p
              class="font-nacelle animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text  text-2xl font-semibold text-gray-500"
          >
          Nous nous engageons à allier innovation, pragmatisme, agilité, transparence et excellence pour des résultats concrets et de qualité à chaque étape.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Aucun code JS nécessaire pour la structure statique.
// Si tu veux rendre les textes dynamiques, on peut exposer des props ici.
</script>

<style scoped>
/* Ajustements mineurs pour harmoniser l'apparence SVG / texte */
svg { display: block; }
@media (max-width: 767px) {
  /* sur mobile, on empile SVG puis textes */
  section .grid { align-items: flex-start; }
}
</style>
