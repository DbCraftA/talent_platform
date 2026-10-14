<template>
  <main class="bg-linear-to-br from-indigo-50/20 to-white">
    <div class="relative flex min-h-[100dvh] flex-col lg:flex-row">
      <div class="w-full lg:w-1/2">
        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">
          <div class="flex-1">
            <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <router-link to="/" aria-label="Wenovat"><img src="../images/logo.png" class="max-w-none" width="120" height="60" alt="Wenovat" /></router-link>
              <router-link class="text-sm font-bold text-indigo-500" to="/ai-infrastructure">Retour</router-link>
            </div>
          </div>

          <div class="px-4 py-8">
            <div class="max-w-md mx-auto">
              <h1 class="text-3xl text-gray-800 font-bold mb-3">Analyse de scénario infrastructure IA</h1>
              <p class="text-gray-500 mb-8">Décrivez votre contexte et vos contraintes. Les paramètres avancés sont optionnels : une estimation suffit pour obtenir un premier cadre de décision.</p>

              <form class="mb-12 space-y-8" @submit.prevent="analyzeWorkload">
                <section>
                  <div class="text-lg font-bold text-gray-800 mb-5"><span class="text-indigo-500">1.</span> Votre contexte</div>
                  <div class="space-y-4">
                    <FieldSelect id="useCase" label="Quel usage souhaitez-vous cadrer ?" v-model="form.useCase" :options="useCaseOptions" required />
                    <FieldSelect id="modelProfileId" label="Quel ordre de grandeur de modèle envisagez-vous ?" v-model="form.modelProfileId" :options="modelOptions" required help="Si le modèle n’est pas encore arrêté, sélectionnez simplement la classe la plus proche." />
                  </div>
                </section>

                <section>
                  <div class="text-lg font-bold text-gray-800 mb-5"><span class="text-indigo-500">2.</span> Votre usage</div>
                  <div class="space-y-4">
                    <FieldInput id="requestsPerDay" label="Quel volume d’activité prévoyez-vous ?" v-model="form.requestsPerDay" required :min="1" :help="requestsPerDayHelp" />
                    <FieldInput id="avgInputTokens" label="Quelle quantité d’information est envoyée au modèle ?" v-model="form.avgInputTokens" required :min="1" help="Prompt, historique et contexte éventuel. Valeur moyenne en nombre de tokens." />
                    <FieldInput id="avgOutputTokens" label="Quelle longueur de réponse attendez-vous ?" v-model="form.avgOutputTokens" required :min="1" help="Nombre approximatif de tokens générés par interaction." />
                    <FieldSelect id="peakFactor" label="Comment la charge évolue-t-elle dans la journée ?" v-model="form.peakFactor" :options="peakOptions" required />
                  </div>
                </section>

                <section>
                  <div class="text-lg font-bold text-gray-800 mb-5"><span class="text-indigo-500">3.</span> Vos contraintes</div>
                  <div class="space-y-4">
                    <FieldSelect id="dataSensitivity" label="Quel niveau de confidentialité devez-vous préserver ?" v-model="form.dataSensitivity" :options="sensitivityOptions" required help="Ce choix influence les scénarios d’hébergement proposés. Il ne constitue pas une qualification juridique des données." />
                    <FieldSelect id="priority" label="Quel critère doit guider la décision ?" v-model="form.priority" :options="priorityOptions" required />
                    <FieldSelect id="geography" label="Quelles sont vos contraintes d’hébergement ?" v-model="form.geography" :options="geographyOptions" required help="Cette préférence est utilisée pour filtrer les scénarios compatibles." />
                  </div>
                </section>

                <section class="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5">
                  <div class="mb-5">
                    <div class="text-lg font-bold text-gray-800"><span class="text-indigo-500">4.</span> Préciser les hypothèses — optionnel</div>
                    <p class="text-sm text-gray-500 mt-1">Si vous connaissez déjà ces paramètres, ils permettront d’affiner l’estimation. Sinon, laissez-les vides : le pré-assessment utilisera des hypothèses explicites.</p>
                  </div>
                  <div class="space-y-4">
                    <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">Paramètres techniques</div>
                    <FieldInput id="peakConcurrency" label="Concurrence au pic" v-model="form.peakConcurrency" help="Nombre maximal d’utilisateurs ou traitements simultanés à absorber." />
                    <FieldInput id="contextLength" label="Longueur de contexte" v-model="form.contextLength" help="Volume maximal d’information qu’une requête peut mobiliser." />
                    <FieldSelect id="precision" label="Précision / quantification" v-model="form.precision" :options="precisionOptions" help="À préciser uniquement si ce choix technique est déjà arrêté." />
                    <FieldSelect id="ttftTarget" label="Temps de première réponse cible" v-model="form.ttftTarget" :options="ttftOptions" help="À préciser si la réactivité utilisateur est critique. Également appelé TTFT." />
                    <FieldSelect id="generationSpeedTarget" label="Vitesse de génération cible" v-model="form.generationSpeedTarget" :options="generationOptions" help="À préciser si vous avez un objectif de débit particulier." />
                    <FieldSelect id="availabilityTarget" label="Disponibilité souhaitée" v-model="form.availabilityTarget" :options="availabilityOptions" />

                    <div v-if="form.useCase === 'rag'" class="space-y-4 border-t border-indigo-100 pt-5">
                      <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">Options RAG</div>
                      <div class="rounded-2xl bg-white/70 p-4 text-sm">
                        <div class="font-medium text-gray-800">Embedding de référence</div>
                        <div class="mt-1 font-bold text-indigo-500">BGE-M3</div>
                        <p class="mt-1 text-xs text-gray-500">Utilisé comme hypothèse standard pour ce pré-assessment.</p>
                      </div>
                      <FieldInput id="ragMonthlyIndexedTokens" label="Volume d'indexation mensuel" v-model="form.ragMonthlyIndexedTokens" :min="0" placeholder="250 000 000" help="Optionnel. Nombre approximatif de tokens du corpus à encoder ou ré-encoder chaque mois." />
                    </div>

                    <div v-else-if="form.useCase === 'agent'" class="space-y-4 border-t border-indigo-100 pt-5">
                      <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">Options Agentique</div>
                      <FieldInput id="agentModelCallsPerTask" label="Appels modèle moyens par tâche" v-model="form.agentModelCallsPerTask" :min="1" placeholder="3" help="Optionnel. Un agent peut appeler le modèle plusieurs fois pour une seule tâche utilisateur. Si vous ne savez pas, le moteur utilisera une estimation par défaut." />
                    </div>

                    <div v-else-if="form.useCase === 'batch'" class="space-y-4 border-t border-indigo-100 pt-5">
                      <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">Options Batch</div>
                      <p class="rounded-2xl bg-white/70 p-4 text-sm text-gray-600">Pour les workloads batch, la fenêtre de traitement est le principal critère de sizing.</p>
                      <FieldSelect id="batchProcessingWindowHours" label="Fenêtre de traitement" v-model="form.batchProcessingWindowHours" :options="batchWindowOptions" />
                      <p class="text-xs text-gray-500">Durée maximale disponible pour traiter le volume journalier.</p>
                    </div>

                    <div v-else-if="form.useCase === 'code_assistant'" class="space-y-4 border-t border-indigo-100 pt-5">
                      <div class="text-xs font-semibold uppercase tracking-wide text-gray-400">Options Code</div>
                      <label class="flex items-start gap-3 rounded-2xl bg-white/70 p-4 text-sm">
                        <input class="form-checkbox mt-1" type="checkbox" v-model="form.codeRepoAware" />
                        <span><span class="font-medium text-gray-800">Repository-aware</span><span class="mt-1 block text-xs text-gray-500">Activez cette option si le modèle doit rechercher du contexte dans un dépôt de code.</span></span>
                      </label>
                    </div>
                  </div>
                </section>

                <button class="btn-sm w-full justify-center text-white bg-gray-900 hover:bg-gray-800 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70" type="submit" :disabled="isLoading">{{ isLoading ? 'Analyse en cours' : 'Analyser mon scénario' }}</button>
                <p class="-mt-6 text-center text-xs text-gray-500">Architecture, dimensionnement et recommandations en quelques secondes.</p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="relative w-full overflow-y-auto lg:fixed lg:right-0 lg:top-0 lg:bottom-0 lg:block lg:w-1/2" aria-label="Résultats du simulateur">
        <div class="absolute inset-0 bg-linear-to-b from-indigo-100 to-white pointer-events-none -z-10" aria-hidden="true"></div>
        <div class="hidden md:block absolute right-0 pointer-events-none -z-10" aria-hidden="true">
          <img src="../images/auth-illustration.svg" class="max-w-none" width="1440" height="900" alt="Page Illustration" />
        </div>
        <div class="min-h-[680px] lg:min-h-full flex flex-col justify-center px-4 py-8 sm:px-6">
          <div class="w-full max-w-xl mx-auto">
            <div v-if="!result" class="space-y-3 group">
              <div v-if="isLoading" class="p-5 bg-white border border-indigo-100 rounded-2xl shadow-sm">
                <div class="flex items-center gap-3">
                  <div class="h-3 w-3 animate-pulse rounded-full bg-indigo-500"></div>
                  <div class="font-bold text-gray-900">Analyse du scénario en cours</div>
                </div>
                <p class="text-sm text-gray-500 mt-2">Wenovat prépare un premier cadre de décision à partir de votre contexte.</p>
              </div>
              <div v-if="errorMessage" class="p-4 bg-amber-50 border border-amber-200 rounded-xl transition duration-150 ease-in-out">
                <div class="font-bold text-amber-900">Analyse indisponible</div>
                <p class="text-sm text-amber-700 mt-1">{{ errorMessage }}</p>
                <button class="btn-sm mt-4 text-white bg-gray-900 hover:bg-gray-800" :disabled="isLoading" @click="analyzeWorkload">{{ isLoading ? 'Nouvel essai' : 'Réessayer' }}</button>
              </div>
              <div class="p-4 bg-sky-50 border border-sky-200 rounded-xl opacity-40 transition duration-150 ease-in-out">
                <div class="font-bold text-gray-900">Pré-assessment infrastructure</div>
                <p class="text-sm text-gray-500 mt-1">Vos résultats apparaîtront ici après analyse.</p>
              </div>
              <div class="p-4 bg-sky-50 border border-sky-200 rounded-xl transition duration-150 ease-in-out">
                <div class="font-bold text-gray-900">API · Cloud GPU · On-Prem</div>
                <p class="text-sm text-gray-500 mt-1">Les scénarios seront mis en regard de votre contexte et de vos contraintes.</p>
              </div>
              <div class="p-4 bg-sky-50 border border-sky-200 rounded-xl opacity-40 transition duration-150 ease-in-out">
                <div class="font-bold text-gray-900">Benchmark requis</div>
                <p class="text-sm text-gray-500 mt-1">La latence et le dimensionnement final nécessitent une validation sur workload réel.</p>
              </div>
            </div>

            <div v-else class="flex max-h-[calc(100dvh-4rem)] flex-col rounded-3xl bg-white/95 p-5 shadow-2xl backdrop-blur lg:max-h-[calc(100dvh-4rem)]">
              <div class="shrink-0 px-1 pb-6">
                <div class="relative">
                  <div class="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-gray-200" aria-hidden="true"></div>
                  <ul class="relative flex justify-between w-full">
                    <li v-for="(slide, index) in slides" :key="slide.key">
                      <button class="flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold" :class="activeSlide === index ? 'bg-indigo-500 text-white' : 'bg-white text-gray-500 shadow-sm'" @click="activeSlide = index">{{ index + 1 }}</button>
                    </li>
                  </ul>
                </div>
              </div>

              <transition name="fade" mode="out-in">
                <article :key="currentSlide.key" class="flex min-h-0 flex-1 flex-col overflow-hidden">
                  <p class="shrink-0 text-sm font-bold text-indigo-500">{{ currentSlide.eyebrow }}</p>
                  <h2 class="mt-2 shrink-0 font-cabinet-grotesk text-2xl font-bold text-gray-900">{{ currentSlide.title }}</h2>
                  <p class="mt-3 shrink-0 text-sm text-gray-500">{{ currentSlide.description }}</p>

                  <div class="mt-6 min-h-0 flex-1 overflow-y-auto pr-2 pb-4">
                    <div v-if="currentSlide.key === 'summary'" class="space-y-5">
                      <div v-if="!hasComputedSummary" class="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                        <div class="font-bold text-amber-900">Analyse indisponible</div>
                        <p class="mt-2 text-sm text-amber-700">Le moteur de pré-assessment n’a pas pu calculer ce scénario. Réessayez dans quelques instants.</p>
                        <button class="btn-sm mt-4 text-white bg-gray-900 hover:bg-gray-800" :disabled="isLoading" @click="analyzeWorkload">{{ isLoading ? 'Nouvel essai' : 'Réessayer' }}</button>
                      </div>
                      <template v-else>
                        <div class="rounded-2xl bg-zinc-900 p-5 text-white">
                          <div class="text-sm text-indigo-300 font-bold">{{ architectureHero.patternLabel }}</div>
                          <div class="text-2xl font-bold mt-1">{{ architectureHero.mainLine }}</div>
                          <div class="mt-3 flex flex-wrap gap-2 text-sm">
                            <span class="rounded-full bg-white/10 px-3 py-1 font-bold text-zinc-100">{{ architectureHero.componentLine }}</span>
                            <span v-if="architectureHero.agentMultiplierLine" class="rounded-full bg-white/10 px-3 py-1 font-bold text-zinc-100">{{ architectureHero.agentMultiplierLine }}</span>
                          </div>
                          <div class="text-zinc-300 mt-2">{{ architectureHero.contextLine }}</div>
                          <div v-if="architectureHero.batchLine" class="text-zinc-300 mt-1">{{ architectureHero.batchLine }}</div>
                        </div>

                        <section>
                          <h3 class="font-semibold text-gray-800">Architecture détectée</h3>
                          <div class="mt-3 grid grid-cols-1 min-[360px]:grid-cols-2 gap-3">
                            <ArchitectureComponentCard v-for="component in architectureComponentCards" :key="component.key" :card="component" />
                          </div>
                        </section>

                        <section v-if="attentionPoints.length" class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                          <header class="border-b border-gray-100 px-5 py-4">
                            <h3 class="font-semibold text-gray-800">Points d'attention</h3>
                          </header>
                          <div class="p-3">
                            <ul class="my-1">
                              <li v-for="(point, index) in attentionPoints" :key="point.key" class="flex px-2">
                                <div class="my-2 mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500">
                                  <span class="text-sm font-bold text-white">{{ index + 1 }}</span>
                                </div>
                                <div class="flex grow items-center border-gray-100 py-2 text-sm" :class="index === attentionPoints.length - 1 ? '' : 'border-b'">
                                  <div>
                                    <div class="font-medium text-gray-800">{{ point.title }}</div>
                                    <div v-if="point.description" class="text-gray-500">{{ point.description }}</div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </section>
                      </template>
                    </div>

                    <div v-else-if="currentSlide.key === 'technical'" class="space-y-5">
                      <div v-if="!hasTechnicalSizing" class="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                        <div class="font-bold text-amber-900">Dimensionnement indisponible</div>
                        <p class="mt-2 text-sm text-amber-700">Le moteur n’a pas pu calculer le sizing de ce scénario.</p>
                        <button class="btn-sm mt-4 text-white bg-gray-900 hover:bg-gray-800" :disabled="isLoading" @click="analyzeWorkload">{{ isLoading ? 'Nouvel essai' : 'Réessayer' }}</button>
                      </div>
                      <template v-else>
                        <section class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                          <header class="border-b border-gray-100 px-5 py-4">
                            <h3 class="font-semibold text-gray-800">{{ peakBlockTitle }}</h3>
                          </header>
                          <div class="p-4">
                            <div class="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 gap-3">
                              <TechnicalKpiCard v-for="item in peakKpis" :key="item.title" :item="item" />
                            </div>
                            <div v-if="technicalCompactRows.length" class="mt-4 grid grid-cols-1 gap-2 rounded-2xl bg-gray-50 p-3 text-sm min-[420px]:grid-cols-2">
                              <div v-for="row in technicalCompactRows" :key="row.label" class="flex items-center justify-between gap-3"><span class="text-gray-500">{{ row.label }}</span><span class="font-bold text-gray-900">{{ row.value }}</span></div>
                            </div>
                            <div v-if="technicalCallout" class="mt-4 rounded-2xl bg-indigo-50 p-4 text-sm text-gray-700">
                              <div class="font-bold text-gray-900">{{ technicalCallout.title }}</div>
                              <div class="mt-2 grid grid-cols-1 gap-2 min-[420px]:grid-cols-3">
                                <div v-for="row in technicalCallout.rows" :key="row.label"><div class="text-xs text-gray-500">{{ row.label }}</div><div class="font-bold text-indigo-600">{{ row.value }}</div></div>
                              </div>
                              <p v-if="technicalCallout.message" class="mt-2 text-xs text-gray-600">{{ technicalCallout.message }}</p>
                            </div>
                          </div>
                        </section>

                        <section class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                          <header class="border-b border-gray-100 px-5 py-4"><h3 class="font-semibold text-gray-800">Empreinte mémoire</h3></header>
                          <div v-if="memoryRows.length" class="p-5">
                            <div class="space-y-3">
                              <MetricLine v-for="row in memoryRows" :key="row.label" :item="row" />
                            </div>
                            <div class="my-4 border-t border-gray-100"></div>
                            <div class="rounded-2xl bg-violet-50 p-4">
                              <div class="text-sm font-bold text-violet-600">VRAM estimée</div>
                              <div class="mt-1 font-cabinet-grotesk text-3xl font-bold text-gray-900">{{ estimatedVramLabel }}</div>
                            </div>
                            <div class="mt-4 flex flex-wrap gap-2 text-xs">
                              <span v-if="memoryPrecisionLabel" class="rounded-full bg-gray-50 px-3 py-1 font-bold text-gray-600">{{ memoryPrecisionLabel }}</span>
                              <span v-if="memoryContextLabel" class="rounded-full bg-gray-50 px-3 py-1 font-bold text-gray-600">{{ memoryContextLabel }}</span>
                              <span v-if="memoryConfidenceLabel" class="rounded-full bg-indigo-50 px-3 py-1 font-bold text-indigo-500">Confiance : {{ memoryConfidenceLabel }}</span>
                            </div>
                          </div>
                          <div v-else class="p-5 text-sm text-gray-500">Estimation mémoire non disponible.</div>
                        </section>

                        <section class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                          <header class="border-b border-gray-100 px-5 py-4"><h3 class="font-semibold text-gray-800">Capacité GPU</h3></header>
                          <div v-if="capacityCandidate" class="p-5">
                            <div class="grid grid-cols-2 gap-3 text-sm">
                              <GpuMiniCard v-for="item in gpuCapacityRows" :key="item.label" :item="item" />
                            </div>
                            <div class="mt-4 rounded-2xl bg-emerald-50 p-5">
                              <div class="text-sm font-bold text-emerald-600">Capacité cible</div>
                              <div class="mt-1 font-cabinet-grotesk text-4xl font-bold text-gray-900">{{ targetGpuCapacity }}</div>
                              <div class="mt-1 text-sm text-gray-600">Configuration de production estimée</div>
                              <div v-if="capacityCandidate.label" class="mt-2 text-xs text-gray-500">Classe de référence : {{ capacityCandidate.label }}</div>
                            </div>
                            <div v-if="capacityUtilizationLabel" class="mt-4">
                              <div class="flex items-center justify-between text-xs text-gray-500"><span>Utilisation au pic estimée</span><span class="font-bold text-gray-700">{{ capacityUtilizationLabel }}</span></div>
                              <div class="mt-2 h-2 overflow-hidden rounded-full bg-gray-100"><div class="h-full rounded-full bg-emerald-500" :style="{ width: capacityUtilizationWidth }"></div></div>
                            </div>
                            <p class="mt-4 rounded-2xl bg-gray-50 p-4 text-xs text-gray-600">Le sizing throughput repose sur des performances de référence. Un benchmark du modèle, du runtime et du GPU retenus est nécessaire avant engagement.</p>
                          </div>
                          <div v-else class="p-5 text-sm text-gray-500">Capacité GPU à valider.</div>
                        </section>

                        <section class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                          <header class="border-b border-gray-100 px-5 py-4"><h3 class="font-semibold text-gray-800">{{ patternContext.title }}</h3></header>
                          <div class="p-5">
                            <div v-if="patternContext.rows.length" class="space-y-3">
                              <MetricLine v-for="row in patternContext.rows" :key="row.label" :item="row" />
                            </div>
                            <p v-if="patternContext.message" class="mt-4 rounded-2xl bg-indigo-50 p-4 text-sm text-gray-700">{{ patternContext.message }}</p>
                          </div>
                        </section>
                      </template>
                    </div>

                    <div v-else-if="currentSlide.key === 'economics'" class="space-y-5">
                      <section class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                        <header class="border-b border-gray-100 px-5 py-4">
                          <h3 class="font-semibold text-gray-800">Configurations Cloud compatibles</h3>
                          <p class="mt-1 text-xs text-gray-500">Configurations répondant aux besoins mémoire, throughput et région identifiés.</p>
                        </header>
                        <div class="p-5">
                          <div v-if="cloudComparisonState" class="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm">
                            <div class="font-bold text-amber-900">{{ cloudComparisonState.title }}</div>
                            <p class="mt-2 text-amber-700">{{ cloudComparisonState.message }}</p>
                            <button v-if="cloudComparisonState.retry" class="btn-sm mt-4 text-white bg-gray-900 hover:bg-gray-800" :disabled="isLoading" @click="analyzeWorkload">{{ isLoading ? 'Nouvel essai' : 'Réessayer' }}</button>
                          </div>
                          <div v-else class="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <CloudCandidateCard v-for="(candidate, index) in visibleCloudCandidates" :key="candidate.provider + candidate.region + candidate.instance_type" :candidate="candidate" :is-first="index === 0" />
                          </div>
                        </div>
                      </section>

                      <section class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                        <header class="border-b border-gray-100 px-5 py-4"><h3 class="font-semibold text-gray-800">{{ selectedScenarioTitle }}</h3></header>
                        <div class="p-5">
                          <div v-if="selectedScenarioAvailable" class="rounded-2xl bg-sky-50 p-5">
                            <div class="flex items-start gap-3"><div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">C</div><div class="min-w-0"><div class="font-bold text-gray-900">{{ selectedScenarioCandidate.provider || 'Provider à préciser' }}</div><div class="mt-1 text-sm text-gray-600">{{ selectedScenarioGpuLine }}</div><div class="mt-1 text-sm text-gray-600">{{ selectedScenarioCandidate.region || 'Région à préciser' }}</div></div></div>
                            <div class="mt-4 flex flex-wrap gap-2 text-xs"><span v-if="selectedStrategyLabel" class="rounded-full bg-indigo-50 px-3 py-1 font-bold text-indigo-500">{{ selectedStrategyLabel }}</span><span v-if="selectedScenarioIsLowest" class="rounded-full bg-emerald-50 px-3 py-1 font-bold text-emerald-600">Également le coût estimé le plus bas</span></div>
                            <div v-if="selectedScenarioEconomics?.monthly_cost != null" class="mt-4 font-cabinet-grotesk text-3xl font-bold text-gray-900">{{ formatCurrencyAmount(selectedScenarioEconomics.monthly_cost, selectedScenarioEconomics.currency) }} / mois</div>
                            <div v-if="selectedScenarioEconomics?.cost_per_million_tokens != null" class="mt-2 text-sm text-gray-700">{{ formatCurrencyAmount(selectedScenarioEconomics.cost_per_million_tokens, selectedScenarioEconomics.currency, 2) }} / million tokens</div>
                            <ul v-if="selectedScenarioReasons.length" class="mt-4 space-y-2 text-sm"><li v-for="reason in selectedScenarioReasons" :key="reason" class="flex gap-2"><span class="font-bold text-emerald-600">✓</span><span class="text-gray-700">{{ reason }}</span></li></ul>
                            <div v-if="selectedScenarioCostTradeoff" class="mt-4 rounded-2xl bg-white/70 p-3 text-sm"><div class="text-xs text-gray-500">Écart vs option la moins chère</div><div class="font-bold text-gray-900">{{ selectedScenarioCostTradeoff }}</div></div>
                            <p v-if="selectedScenarioTradeoffText" class="mt-4 rounded-2xl bg-white/70 p-3 text-xs text-gray-600">{{ selectedScenarioTradeoffText }}</p>
                            <div class="mt-4 flex flex-wrap gap-2 text-xs"><span v-if="selectedScenarioEconomics?.basis" class="rounded-full bg-white/70 px-3 py-1 font-bold text-gray-600">Base : {{ selectedScenarioEconomics.basis }}</span><span v-if="selectedScenarioConfidence" class="rounded-full bg-indigo-50 px-3 py-1 font-bold text-indigo-500">{{ selectedScenarioConfidence }}</span></div>
                          </div>
                          <div v-if="!selectedScenarioAvailable" class="rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">La sélection automatique n’est pas disponible pour ce scénario.</div>
                        </div>
                      </section>

                      <section class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                        <header class="border-b border-gray-100 px-5 py-4"><h3 class="font-semibold text-gray-800">Périmètre de l’estimation</h3></header>
                        <div class="p-5 space-y-4">
                          <div v-if="scopeIncluded.length"><div class="text-xs font-semibold uppercase tracking-wide text-gray-400">Inclus</div><ul class="mt-2 space-y-2 text-sm"><li v-for="item in scopeIncluded" :key="item" class="flex gap-2"><span class="font-bold text-emerald-600">✓</span><span class="text-gray-700">{{ item }}</span></li></ul></div>
                          <div v-if="scopeExcluded.length"><div class="text-xs font-semibold uppercase tracking-wide text-gray-400">À compléter</div><ul class="mt-2 space-y-2 text-sm"><li v-for="item in scopeExcluded" :key="item" class="flex gap-2"><span class="font-bold text-gray-400">○</span><span class="text-gray-700">{{ item }}</span></li></ul></div>
                          <div class="rounded-2xl bg-indigo-50 p-4 text-sm text-gray-700"><div class="font-bold text-gray-900">Il ne s’agit pas encore d’un TCO complet.</div><p class="mt-1">Le coût affiché couvre actuellement l’infrastructure Cloud GPU du modèle principal.</p><p v-if="result.economics_scope?.note" class="mt-2 text-xs text-gray-600">{{ result.economics_scope.note }}</p></div>
                        </div>
                      </section>

                      <section v-if="economicsPatternCallout" class="rounded-2xl bg-indigo-50 p-5 text-sm text-gray-700">
                        <div class="font-bold text-gray-900">{{ economicsPatternCallout.title }}</div>
                        <p class="mt-2">{{ economicsPatternCallout.message }}</p>
                        <div v-if="economicsPatternCallout.rows?.length" class="mt-3 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2"><div v-for="row in economicsPatternCallout.rows" :key="row.label"><div class="text-xs text-gray-500">{{ row.label }}</div><div class="font-bold text-indigo-600">{{ row.value }}</div></div></div>
                      </section>
                    </div>

                    <div v-else class="space-y-5">
                      <div v-if="!hasValidationContent" class="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                        <div class="font-bold text-amber-900">Validation indisponible</div>
                        <p class="mt-2 text-sm text-amber-700">Le pré-assessment n’a pas pu produire les recommandations de ce scénario.</p>
                        <button class="btn-sm mt-4 text-white bg-gray-900 hover:bg-gray-800" :disabled="isLoading" @click="analyzeWorkload">{{ isLoading ? 'Nouvel essai' : 'Réessayer' }}</button>
                      </div>
                      <template v-else>
                        <section class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                          <header class="border-b border-gray-100 px-5 py-4"><h3 class="font-semibold text-gray-800">Niveau de confiance</h3></header>
                          <div class="grid grid-cols-1 gap-3 p-5 min-[420px]:grid-cols-3">
                            <ConfidenceIndicator v-for="item in validationConfidenceRows" :key="item.label" :item="item" />
                          </div>
                        </section>

                        <section v-if="keyRecommendations.length" class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                          <header class="border-b border-gray-100 px-5 py-4"><h3 class="font-semibold text-gray-800">Recommandations clés</h3></header>
                          <div class="grid grid-cols-1 gap-3 p-5 min-[420px]:grid-cols-2">
                            <RecommendationCard v-for="item in keyRecommendations" :key="item.key" :item="item" />
                          </div>
                        </section>

                        <section class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                          <header class="border-b border-gray-100 px-5 py-4"><h3 class="font-semibold text-gray-800">Avant de décider</h3></header>
                          <div class="p-5">
                            <ul v-if="validationChecklist.length" class="space-y-3 text-sm">
                              <li v-for="item in validationChecklist" :key="item" class="flex gap-3"><span class="mt-0.5 font-bold text-indigo-500">○</span><span class="text-gray-700">{{ item }}</span></li>
                            </ul>
                            <p v-else class="text-sm text-gray-500">Les prochaines validations seront précisées lors du benchmark.</p>
                          </div>
                        </section>

                        <section class="rounded-2xl bg-zinc-900 p-5 text-white">
                          <div class="font-cabinet-grotesk text-2xl font-bold">Besoin d’aide pour décider ?</div>
                          <p class="mt-3 text-sm text-zinc-300">Ce pré-assessment met en évidence un scénario plausible, mais la décision finale dépend encore de vos contraintes réelles de performance, de sécurité, d’exploitation et de coût.</p>
                          <p class="mt-3 text-sm text-zinc-300">Wenovat peut vous aider à challenger ce scénario, comparer les alternatives et identifier l’architecture la plus adaptée à votre workload.</p>
                          <div class="mt-4 text-sm font-bold text-zinc-100">Nous pouvons notamment vous aider à :</div>
                          <ul class="mt-3 space-y-2 text-sm text-zinc-300">
                            <li class="flex gap-2"><span class="text-indigo-300">-</span><span>valider le sizing sur un benchmark représentatif ;</span></li>
                            <li class="flex gap-2"><span class="text-indigo-300">-</span><span>comparer Cloud GPU, API managée et On-Prem ;</span></li>
                            <li class="flex gap-2"><span class="text-indigo-300">-</span><span>confirmer les hypothèses de coût et de capacité ;</span></li>
                            <li class="flex gap-2"><span class="text-indigo-300">-</span><span>identifier les risques de gouvernance, souveraineté et exploitation.</span></li>
                          </ul>
                          <p class="mt-4 text-xs text-zinc-400">Scénario actuellement étudié : {{ selectedProviderLabel || 'à confirmer' }}</p>
                          <router-link class="btn-sm mt-5 inline-flex text-white bg-indigo-500 hover:bg-indigo-600" to="/nous-contacter">Demander l’avis de Wenovat</router-link>
                        </section>
                      </template>
                    </div>
                  </div>
                </article>
              </transition>

              <div class="mt-4 shrink-0 flex items-center justify-between border-t border-gray-100 pt-4">
                <button class="btn-sm bg-white text-gray-700 shadow-sm" @click="previousSlide">Précédent</button>
                <div class="flex items-center gap-3">
                  <button class="btn-sm text-white bg-indigo-500 hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50" type="button" :disabled="!hasShareableStudy" @click.stop="openShareDialog">
                    <svg class="mr-2 h-4 w-4 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 10.25c-.77 0-1.45.37-1.88.95L5.7 8.99a2.33 2.33 0 0 0 0-1.98l4.42-2.21A2.33 2.33 0 1 0 9.5 3.2L5.08 5.41a2.33 2.33 0 1 0 0 5.18l4.42 2.21A2.33 2.33 0 1 0 12 10.25Z" /></svg>
                    Envoyer l'étude
                  </button>
                  <button class="btn-sm text-white bg-gray-900 hover:bg-gray-800" @click="nextSlide">Suivant</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showShareModal" class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/60 px-4" role="dialog" aria-modal="true" aria-labelledby="share-study-modal-title" @click.self="closeShareDialog">
      <div class="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-7">
        <div v-if="shareStatus !== 'success'" class="flex items-start justify-between gap-4 mb-5">
          <div>
            <h2 id="share-study-modal-title" class="text-2xl font-bold text-gray-900">Partager cette étude</h2>
            <p class="mt-2 text-sm text-gray-500">Envoyez cette synthèse à un collègue, un responsable infrastructure ou un décideur.</p>
          </div>
          <button class="rounded-full p-1 text-gray-500 hover:bg-gray-100" type="button" aria-label="Fermer" :disabled="shareStatus === 'submitting'" @click="closeShareDialog">✕</button>
        </div>

        <form v-if="shareStatus !== 'success'" class="space-y-5" @submit.prevent="submitShareStudy">
          <div class="space-y-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div>
              <label class="block text-sm font-medium mb-1" for="share-recipient-email">Email du destinataire <span class="text-red-500">*</span></label>
              <input id="share-recipient-email" class="form-input w-full" type="email" v-model="shareForm.recipientEmail" placeholder="prenom@entreprise.fr" required :disabled="shareStatus === 'submitting'" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1" for="share-recipient-name">Nom du destinataire <span class="text-red-500">*</span></label>
              <input id="share-recipient-name" class="form-input w-full" type="text" v-model="shareForm.recipientName" placeholder="Pierre" required :disabled="shareStatus === 'submitting'" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1" for="share-recipient-role">Rôle</label>
              <select id="share-recipient-role" class="form-select w-full text-sm" v-model="shareForm.recipientRole" :disabled="shareStatus === 'submitting'">
                <option value="">Sélectionner un rôle</option>
                <option v-for="role in recipientRoleOptions" :key="role" :value="role">{{ role }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1" for="share-comment">Commentaire</label>
              <textarea id="share-comment" class="form-textarea w-full text-sm" rows="4" v-model="shareForm.comment" placeholder="Une question, une contrainte ou un contexte particulier ?" :disabled="shareStatus === 'submitting'"></textarea>
            </div>
            <div class="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
              <label for="share-website">Website</label>
              <input id="share-website" name="website" type="text" v-model="shareForm.website" tabindex="-1" autocomplete="off" />
            </div>
          </div>

          <div v-if="shareErrorMessage" class="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800" role="alert">
            {{ shareErrorMessage }}
          </div>

          <div class="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
            <button class="btn-sm bg-white text-gray-700 shadow-sm" type="button" :disabled="shareStatus === 'submitting'" @click="closeShareDialog">Annuler</button>
            <button class="btn-sm text-white bg-gray-900 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70" type="submit" :disabled="shareStatus === 'submitting'">
              <svg v-if="shareStatus === 'submitting'" class="mr-2 h-4 w-4 animate-spin fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              {{ shareStatus === 'submitting' ? 'Envoi en cours…' : "Envoyer l'étude" }}
            </button>
          </div>
        </form>

        <div v-else class="py-3 text-center">
          <svg class="mx-auto mb-6 h-16 w-16 fill-current" viewBox="0 0 64 64" aria-hidden="true">
            <circle class="text-green-500/20" cx="32" cy="32" r="32" />
            <path class="text-green-700" d="M37.22 26.375a1 1 0 1 1 1.56 1.25l-8 10a1 1 0 0 1-1.487.082l-4-4a1 1 0 0 1 1.414-1.414l3.21 3.21 7.302-9.128Z" />
          </svg>
          <h2 id="share-study-modal-title" class="text-2xl font-bold text-gray-900">Étude envoyée</h2>
          <p class="mt-3 text-sm text-gray-500">La synthèse a été envoyée à<br><span class="font-bold text-gray-900">{{ shareSuccessRecipient }}</span>.</p>
          <button class="btn-sm mt-6 text-white bg-gray-900 hover:bg-gray-800" type="button" @click="closeShareDialog">Fermer</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, h, ref } from 'vue'
import { formatNumber } from '../lib/inference/estimator.js'
import { buildInferencePayload } from '../lib/inference/apiPayload.js'
import { callInferenceApi, shareStudy } from '../lib/inference/inferenceApi.js'
import { useCases, modelProfiles } from '../config/modelProfiles.js'
import { precisionProfiles } from '../config/inferenceAssumptions.js'

const useCaseOptions = [
  { value: 'chat', label: 'Conversation / chat' },
  { value: 'rag', label: 'RAG / recherche documentaire' },
  { value: 'agent', label: 'Agentique' },
  { value: 'batch', label: 'Batch' },
  { value: 'code_assistant', label: 'Code / copilots développeurs' },
]
const modelLabelById = { lt_10b: '< 10B', '10_30b': '10–30B', '30_70b': '30–70B', '70b_plus': '70B+' }
const modelOptions = modelProfiles.map((item) => ({ value: item.id, label: modelLabelById[item.id] || item.label }))
const precisionOptions = Object.entries(precisionProfiles).map(([value, profile]) => ({ value, label: profile.label }))
const peakOptions = [{ value: 'continuous', label: 'Continue — 24/7' }, { value: 'business_stable', label: 'Journée de travail — plutôt stable' }, { value: 'business_peak_3x', label: 'Journée de travail — pics importants' }, { value: 'bursty_5x', label: 'Très irrégulière / événementielle' }]
const sensitivityOptions = [{ value: 'public', label: 'Données publiques' }, { value: 'internal', label: 'Données internes' }, { value: 'sensitive', label: 'Données sensibles' }, { value: 'highly_sensitive', label: 'Données très sensibles' }]
const priorityOptions = [{ value: 'cost', label: 'Maîtriser les coûts' }, { value: 'latency', label: 'Privilégier la performance' }, { value: 'simplicity', label: 'Simplifier l’exploitation' }, { value: 'control', label: 'Garder davantage de contrôle' }]
const geographyOptions = [{ value: 'france', label: 'France' }, { value: 'eu', label: 'Union européenne' }, { value: 'europe', label: 'Europe' }, { value: 'unrestricted', label: 'Sans contrainte particulière' }]
const ttftOptions = [{ value: 'none', label: 'Pas de contrainte' }, { value: '500', label: '< 500 ms' }, { value: '1000', label: '< 1 seconde' }, { value: '2000', label: '< 2 secondes' }]
const generationOptions = [{ value: 'none', label: 'Je ne sais pas' }, { value: '20', label: '20 tok/s' }, { value: '40', label: '40 tok/s' }, { value: '80', label: '80 tok/s' }]
const availabilityOptions = [{ value: 'best_effort', label: 'Best effort / sans SLA' }, { value: '99.5', label: '99.5%' }, { value: '99.9', label: '99.9%' }, { value: '99.95', label: '99.95%' }]
const batchWindowOptions = [{ value: 'none', label: 'Je ne sais pas' }, { value: '1', label: '1 heure' }, { value: '4', label: '4 heures' }, { value: '8', label: '8 heures' }, { value: '12', label: '12 heures' }, { value: '24', label: '24 heures' }]

const form = ref({ useCase: 'chat', modelProfileId: '70b_plus', requestsPerDay: '', avgInputTokens: '', avgOutputTokens: '', peakFactor: 'business_peak_3x', dataSensitivity: 'internal', priority: 'cost', geography: 'france', peakConcurrency: '', contextLength: '', precision: 'unknown', ttftTarget: 'none', generationSpeedTarget: 'none', availabilityTarget: 'best_effort', ragMonthlyIndexedTokens: '', agentModelCallsPerTask: '', batchProcessingWindowHours: 'none', codeRepoAware: false })
const result = ref(null)
const activeSlide = ref(0)
const showShareModal = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const shareStatus = ref('idle')
const shareErrorMessage = ref('')
const shareSuccessRecipient = ref('')
const shareForm = ref({ recipientEmail: '', recipientName: '', recipientRole: '', comment: '', website: '' })
const recipientRoleOptions = ['Architecte', 'Responsable infrastructure', 'CTO / Directeur technique', 'DSI', 'Responsable cloud', 'Responsable data / IA', 'Product owner', 'Décideur métier', 'Acheteur IT', 'Consultant']

const requestsPerDayHelp = computed(() => {
  if (form.value.useCase === 'agent') return 'Nombre de tâches déclenchées par jour. Les appels modèle supplémentaires sont pris en compte séparément.'
  if (form.value.useCase === 'batch') return 'Nombre approximatif de traitements à réaliser chaque jour.'
  return 'Une estimation suffit. Nombre approximatif de requêtes par jour.'
})

function resetShareForm() {
  shareForm.value = { recipientEmail: '', recipientName: '', recipientRole: '', comment: '', website: '' }
  shareStatus.value = 'idle'
  shareErrorMessage.value = ''
  shareSuccessRecipient.value = ''
}

function openShareDialog() {
  if (!hasShareableStudy.value) {
    shareErrorMessage.value = 'Lancez d’abord votre pré-assessment avant de le partager.'
    shareStatus.value = 'error'
  }
  showShareModal.value = true
}

function closeShareDialog() {
  if (shareStatus.value === 'submitting') return
  showShareModal.value = false
  resetShareForm()
}

const optionalString = (value) => {
  const text = cleanText(value)
  return text || undefined
}

function shareErrorLabel(error) {
  if (error?.status === 400) return error.responseMessage || error.message || 'Adresse email destinataire invalide.'
  if (error?.status === 502 || error?.status === 503) return "L'étude n'a pas pu être envoyée pour le moment. Réessayez plus tard."
  return "Impossible de contacter le service d'envoi. Vérifiez votre connexion et réessayez."
}

async function submitShareStudy() {
  if (!hasShareableStudy.value) {
    shareStatus.value = 'error'
    shareErrorMessage.value = 'Lancez d’abord votre pré-assessment avant de le partager.'
    return
  }

  const recipientEmail = cleanText(shareForm.value.recipientEmail)
  shareStatus.value = 'submitting'
  shareErrorMessage.value = ''

  try {
    const payload = {
      recipient: {
        email: recipientEmail,
        name: optionalString(shareForm.value.recipientName),
        role: optionalString(shareForm.value.recipientRole),
      },
      comment: optionalString(shareForm.value.comment),
      website: shareForm.value.website || '',
      study: result.value,
    }
    const response = await shareStudy(payload)
    shareSuccessRecipient.value = response?.recipient || recipientEmail
    shareStatus.value = 'success'
  } catch (error) {
    shareStatus.value = 'error'
    shareErrorMessage.value = shareErrorLabel(error)
  }
}

async function analyzeWorkload() {
  const payload = buildInferencePayload(form.value)
  isLoading.value = true
  errorMessage.value = ''
  activeSlide.value = 0
  try {
    result.value = await callInferenceApi(payload)
  } catch (error) {
    console.error('Inference API unavailable', error)
    errorMessage.value = 'Le moteur de pré-assessment n’a pas pu calculer ce scénario. Réessayez dans quelques instants.'
    result.value = { status: 'api_unavailable' }
  } finally {
    isLoading.value = false
  }
}

const selectedUseCaseLabel = computed(() => useCases.find((item) => item.id === form.value.useCase)?.label || 'Workload')
const slides = [{ key: 'summary', eyebrow: '1 / 4', title: 'Votre architecture', description: 'Les composants et points d’attention identifiés à partir de votre contexte.' }, { key: 'technical', eyebrow: '2 / 4', title: 'Dimensionnement technique', description: 'Estimation de la charge, de l’empreinte mémoire et de la capacité GPU nécessaire.' }, { key: 'economics', eyebrow: '3 / 4', title: 'Options d’hébergement & coûts', description: 'Configurations compatibles avec votre dimensionnement et ordre de grandeur des coûts d’infrastructure.' }, { key: 'advisory', eyebrow: '4 / 4', title: 'Points à valider', description: 'Les principaux points à confirmer avant de retenir une architecture de production.' }]
const currentSlide = computed(() => slides[activeSlide.value])
const hasShareableStudy = computed(() => Boolean(result.value && result.value.status !== 'api_unavailable'))
function nextSlide() { activeSlide.value = (activeSlide.value + 1) % slides.length }
function previousSlide() { activeSlide.value = (activeSlide.value - 1 + slides.length) % slides.length }
const rangeValue = (range, suffix = '') => range ? `${formatNumber(range.min)}–${formatNumber(range.max)}${suffix}` : 'n/a'
const formatPercent = (value) => Number.isFinite(Number(value)) ? `${formatNumber(Number(value) * 100)}%` : 'n/a'
const formatCurrencyValue = (value, currency = 'USD', maximumFractionDigits = 0) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: currency || 'USD', maximumFractionDigits }).format(Number.isFinite(Number(value)) ? Number(value) : 0)
const safeNumber = (value) => value === undefined || value === null || value === '' ? null : (Number.isFinite(Number(value)) ? Number(value) : null)
const formatRate = (value, unit) => safeNumber(value) === null ? 'À préciser' : `~${formatNumber(safeNumber(value))} ${unit}`
const formatTokensPerSecond = (value) => formatRate(value, 'tok/s')
const formatRangeGB = (range) => {
  const min = safeNumber(range?.min)
  const max = safeNumber(range?.max)
  if (min === null || max === null || (min <= 0 && max <= 0)) return 'À préciser'
  return `~${formatNumber(min)}–${formatNumber(max)} GB`
}
const formatContextLength = (value) => {
  const number = safeNumber(value)
  if (number === null || number <= 0) return 'À préciser'
  return number >= 1000 ? `${formatNumber(Math.round(number / 1000))}k` : formatNumber(number)
}
const confidenceLabel = (value) => value === 'high' ? 'Élevée' : value === 'medium' ? 'Moyenne' : value === 'low' ? 'À confirmer' : ''
const validationConfidenceLabel = (type, value) => {
  if (value === 'high') return 'Bonne confiance'
  if (type === 'economics' && value === 'medium') return 'À affiner'
  if (type === 'latency' && value === 'low') return 'Benchmark requis'
  if (value === 'medium') return 'À confirmer'
  if (value === 'low') return 'À valider'
  return 'Confiance à confirmer'
}
const confidenceDots = (value) => value === 'high' ? '●●●' : value === 'medium' ? '●●○' : value === 'low' ? '●○○' : '○○○'
const cloudConfidenceLabel = (value) => value === 'high' ? 'Confiance élevée' : value === 'medium' ? 'Confiance moyenne' : value === 'low' ? 'À confirmer' : ''
const formatCurrencyAmount = (amount, currency = 'USD', maximumFractionDigits = 0) => {
  const number = safeNumber(amount)
  if (number === null) return 'À préciser'
  if (currency === 'EUR') return `~${new Intl.NumberFormat('fr-FR', { maximumFractionDigits }).format(number)} €`
  return `~${new Intl.NumberFormat('fr-FR', { maximumFractionDigits }).format(number)} ${currency || 'USD'}`
}
const formatLargeNumber = (value) => {
  const number = Number(value)
  if (!Number.isFinite(number) || number <= 0) return ''
  if (number >= 1_000_000_000) return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(number / 1_000_000_000)} Md`
  if (number >= 1_000_000) return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(number / 1_000_000)} M`
  if (number >= 1_000) return `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(number / 1_000)} k`
  return formatNumber(number)
}
const formatGeography = (value) => String(value || 'france').replaceAll('_', ' ').replace(/\b\p{L}/gu, (letter) => letter.toUpperCase())
const formatModel = (value) => {
  const model = String(value || '').split('/').pop() || ''
  if (!model) return 'n/a'
  if (model.toLowerCase() === 'bge-m3') return 'BGE-M3'
  return model.replaceAll('_', ' ').replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
}
const cleanText = (value) => String(value || '').trim()
const splitRecommendation = (value, key) => {
  const text = cleanText(value)
  const [title, ...rest] = text.split(/[:.]/)
  return { key, title: cleanText(title || text), description: cleanText(rest.join('.').trim()) }
}
const patternResult = computed(() => result.value?.pattern || {})
const patternComponents = computed(() => Array.isArray(patternResult.value.components) ? patternResult.value.components : [])
const hasComputedSummary = computed(() => Number(result.value?.summary?.monthly_tokens) > 0)
const componentCounts = computed(() => patternComponents.value.reduce((counts, component) => {
  if (component.kind === 'inference') counts.inference += 1
  if (component.kind === 'control') counts.control += 1
  return counts
}, { inference: 0, control: 0 }))
const formatCountLabel = (count, singular, plural = `${singular}s`) => `${count} ${count > 1 ? plural : singular}`
const architectureHero = computed(() => {
  const settings = patternResult.value.settings || {}
  const monthlyTokens = formatLargeNumber(result.value?.summary?.monthly_tokens)
  const callsMultiplier = Number(settings.calls_multiplier)
  const processingWindowHours = Number(settings.processing_window_hours)
  return {
    patternLabel: patternResult.value.label || result.value?.summary?.use_case || selectedUseCaseLabel.value,
    mainLine: `${result.value?.summary?.model_class || 'Modèle'}${monthlyTokens ? ` · ${monthlyTokens} tokens/mois` : ''}`,
    componentLine: `${formatCountLabel(componentCounts.value.inference, 'workload IA')} · ${formatCountLabel(componentCounts.value.control, 'contrôle')}`,
    contextLine: `${result.value?.summary?.traffic_profile || 'Profil de trafic'} · ${formatGeography(result.value?.summary?.geography)}`,
    batchLine: settings.sizing_mode === 'batch_window' && processingWindowHours > 0 ? `Traitement dans une fenêtre de ${formatNumber(processingWindowHours)} h` : '',
    agentMultiplierLine: callsMultiplier > 1 ? `Amplification agentique : ×${formatNumber(callsMultiplier)} appels modèle / tâche` : '',
  }
})
const componentAccentByKind = {
  generation: { badgeClass: 'bg-violet-50 text-violet-600', borderClass: 'border-violet-100' },
  embedding: { badgeClass: 'bg-sky-50 text-sky-600', borderClass: 'border-sky-100' },
  retrieval: { badgeClass: 'bg-sky-50 text-sky-600', borderClass: 'border-sky-100' },
  control: { badgeClass: 'bg-amber-50 text-amber-700', borderClass: 'border-amber-100' },
  default: { badgeClass: 'bg-indigo-50 text-indigo-500', borderClass: 'border-indigo-100' },
}
const architectureComponentCards = computed(() => patternComponents.value.map((component) => {
  const presets = {
    primary_llm: { badge: 'LLM', title: 'Modèle principal', value: result.value?.summary?.model_class || formatModel(component.model), sublabel: 'Génération', accent: 'generation' },
    query_embedding: { badge: 'Embedding', title: 'Requêtes', value: formatModel(component.model), sublabel: 'Temps réel', accent: 'embedding' },
    index_embedding: { badge: 'Embedding', title: 'Indexation', value: formatModel(component.model), sublabel: 'Batch', accent: 'embedding' },
    guardrails_policy: { badge: 'Contrôle', title: 'Guardrails', value: 'Recommandé', sublabel: cleanText(component.reason) || 'Données sensibles', accent: 'control' },
    agent_execution_policy: { badge: 'Contrôle', title: 'Agent policy', value: 'Requis', sublabel: 'Outils & permissions', accent: 'control' },
    code_security_policy: { badge: 'Contrôle', title: 'Code security', value: 'Recommandé', sublabel: 'Secrets & accès repo', accent: 'control' },
    code_retrieval_embedding: { badge: 'Retrieval', title: 'Repo retrieval', value: 'Embedding', sublabel: 'Option repo-aware', accent: 'retrieval' },
  }
  const fallback = { badge: component.kind === 'control' ? 'Contrôle' : component.role || component.kind || 'Composant', title: component.label || component.id, value: component.model ? formatModel(component.model) : (component.required ? 'Requis' : 'Recommandé'), sublabel: component.mode || component.role || component.sizing_status || '', accent: component.kind === 'control' ? 'control' : component.role === 'embedding' ? 'embedding' : 'default' }
  const card = presets[component.id] || fallback
  const accent = componentAccentByKind[card.accent] || componentAccentByKind.default
  return { key: component.id, ...card, ...accent }
}))
const attentionPoints = computed(() => {
  const recommendations = patternResult.value.recommendations || {}
  const decisionSignals = result.value?.decision_signals || {}
  const rows = []
  ;['governance', 'architecture'].forEach((category) => (recommendations[category] || []).forEach((text, index) => rows.push(splitRecommendation(text, `${category}-${index}`))))
  ;['economics', 'operations'].forEach((key) => {
    const signal = decisionSignals[key]
    if (signal?.label || signal?.explanation) rows.push({ key: `signal-${key}`, title: cleanText(signal.label), description: cleanText(signal.explanation) })
  })
  ;(recommendations.security || []).forEach((text, index) => rows.push(splitRecommendation(text, `security-${index}`)))
  return rows.filter((row) => row.title).slice(0, 3)
})
const capacityCandidates = computed(() => result.value?.technical?.capacity?.candidates || [])
const cloudCandidates = computed(() => result.value?.cloud_comparison?.candidates || [])
const confidenceRows = computed(() => Object.entries(result.value?.confidence || {}).map(([label, value]) => ({ label, value })))
const performanceResult = computed(() => result.value?.technical?.performance || null)
const memoryResult = computed(() => result.value?.technical?.memory || null)
const capacityCandidate = computed(() => result.value?.technical?.capacity?.reference_candidate || null)
const currentPatternId = computed(() => patternResult.value.id || result.value?.summary?.use_case || form.value.useCase)
const hasTechnicalSizing = computed(() => Boolean(performanceResult.value || memoryResult.value || capacityCandidate.value))
const peakBlockTitle = computed(() => currentPatternId.value === 'batch' ? 'Charge à traiter' : 'Charge de pointe')
const dailyVolumeLabel = computed(() => formatLargeNumber(result.value?.summary?.monthly_tokens ? Number(result.value.summary.monthly_tokens) / 30 : null) || 'À préciser')
const peakKpis = computed(() => {
  const performance = performanceResult.value || {}
  if (currentPatternId.value === 'batch') return [
    { icon: 'B', iconBg: 'bg-sky-500', iconColor: 'text-white', title: 'Volume journalier', value: dailyVolumeLabel.value, sublabel: 'Tokens à traiter' },
    { icon: 'H', iconBg: 'bg-sky-100', iconColor: 'text-sky-600', title: 'Fenêtre', value: patternResult.value.settings?.processing_window_hours ? `${formatNumber(patternResult.value.settings.processing_window_hours)} h` : 'À préciser', sublabel: 'Traitement disponible' },
    { icon: 'T', iconBg: 'bg-sky-100', iconColor: 'text-sky-600', title: 'Throughput requis', value: formatTokensPerSecond(performance.peak_output_tokens_per_second), sublabel: 'Débit soutenu' },
  ]
  return [
    { icon: 'P', iconBg: 'bg-sky-500', iconColor: 'text-white', title: 'Peak requests', value: formatRate(performance.peak_rps, 'req/s'), sublabel: 'Requêtes de pointe' },
    { icon: 'T', iconBg: 'bg-sky-100', iconColor: 'text-sky-600', title: 'Generation load', value: formatTokensPerSecond(performance.peak_output_tokens_per_second), sublabel: 'Débit de génération' },
    { icon: 'C', iconBg: 'bg-sky-100', iconColor: 'text-sky-600', title: 'Concurrency', value: safeNumber(performance.peak_concurrency) === null ? 'À préciser' : formatNumber(performance.peak_concurrency), sublabel: performance.peak_concurrency_estimated ? 'Estimé' : 'Fourni' },
  ]
})
const technicalCompactRows = computed(() => {
  const performance = performanceResult.value || {}
  const memory = memoryResult.value || {}
  if (currentPatternId.value === 'chat') return [{ label: 'TTFT cible', value: performance.ttft_target_ms ? `< ${formatNumber(performance.ttft_target_ms)} ms` : 'À préciser' }, { label: 'Génération', value: performance.generation_speed_target_tps ? `${formatNumber(performance.generation_speed_target_tps)} tok/s / utilisateur` : 'À préciser' }]
  if (currentPatternId.value === 'code_assistant') return [{ label: 'Context length', value: formatContextLength(memory.context_length) }, { label: 'Concurrency', value: safeNumber(performance.peak_concurrency) === null ? 'À préciser' : formatNumber(performance.peak_concurrency) }, ...(safeNumber(memory.context_length) >= 32768 ? [{ label: 'Signal', value: 'Long context' }] : [])]
  return []
})
const technicalCallout = computed(() => {
  if (currentPatternId.value === 'agent') {
    const tasks = safeNumber(result.value?.summary?.effective_requests_per_day)
    const multiplier = safeNumber(patternResult.value.settings?.calls_multiplier)
    return { title: 'Amplification agentique', rows: [{ label: 'Tâches / jour', value: tasks === null ? 'À préciser' : formatLargeNumber(tasks) }, { label: 'Appels / tâche', value: multiplier === null ? 'À préciser' : `×${formatNumber(multiplier)}` }, { label: 'Appels LLM / jour', value: tasks !== null && multiplier !== null ? formatLargeNumber(tasks * multiplier) : 'À préciser' }] }
  }
  if (currentPatternId.value === 'batch') return { title: 'Throughput soutenu', rows: [], message: 'Le sizing batch est piloté par le throughput soutenu dans la fenêtre de traitement.' }
  return null
})
const memoryRows = computed(() => {
  const memory = memoryResult.value
  if (!memory) return []
  return [{ icon: 'M', iconBg: 'bg-violet-500', iconColor: 'text-white', label: 'Poids du modèle', value: formatRangeGB(memory.model_weights_gb) }, { icon: 'K', iconBg: 'bg-violet-100', iconColor: 'text-violet-600', label: 'KV cache', value: formatRangeGB(memory.kv_cache_gb) }, { icon: 'R', iconBg: 'bg-violet-100', iconColor: 'text-violet-600', label: 'Runtime + marge', value: formatRangeGB(memory.runtime_overhead_gb) }]
})
const estimatedVramLabel = computed(() => formatRangeGB(memoryResult.value?.estimated_vram_gb))
const memoryPrecisionLabel = computed(() => memoryResult.value?.effective_precision ? `Precision ${String(memoryResult.value.effective_precision).toUpperCase()}${memoryResult.value.precision_estimated ? ' estimée' : ''}` : '')
const memoryContextLabel = computed(() => memoryResult.value?.context_length ? `Context ${formatContextLength(memoryResult.value.context_length)}${memoryResult.value.context_estimated ? ' estimé' : ''}` : '')
const memoryConfidenceLabel = computed(() => confidenceLabel(memoryResult.value?.confidence))
const gpuCapacityRows = computed(() => {
  const candidate = capacityCandidate.value || {}
  return [{ label: 'Mémoire', value: safeNumber(candidate.memory_gpu_count) === null ? 'À préciser' : `${formatNumber(candidate.memory_gpu_count)} GPU minimum` }, { label: 'Throughput', value: safeNumber(candidate.throughput_gpu_count) === null ? 'À préciser' : `${formatNumber(candidate.throughput_gpu_count)} GPU minimum` }, { label: 'Production', value: safeNumber(candidate.production_gpu_count) === null ? 'À préciser' : `${formatNumber(candidate.production_gpu_count)} GPU` }, { label: 'HA', value: safeNumber(candidate.ha_gpu_count) === null ? 'À préciser' : `${formatNumber(candidate.ha_gpu_count)} GPU` }]
})
const targetGpuCapacity = computed(() => {
  const candidate = capacityCandidate.value || {}
  const ha = safeNumber(candidate.ha_gpu_count)
  const production = safeNumber(candidate.production_gpu_count)
  const target = ha !== null && production !== null && ha > production ? ha : production ?? ha
  return target === null ? 'À préciser' : `~${formatNumber(target)} GPU`
})
const capacityUtilizationLabel = computed(() => capacityCandidate.value?.estimated_peak_utilization !== undefined ? formatPercent(capacityCandidate.value.estimated_peak_utilization) : '')
const capacityUtilizationWidth = computed(() => `${Math.min(100, Math.max(0, (safeNumber(capacityCandidate.value?.estimated_peak_utilization) || 0) * 100))}%`)
const componentById = (id) => patternComponents.value.find((component) => component.id === id)
const embeddingVolumeLabel = (component) => component?.workload?.monthly_requests ? `~${formatLargeNumber(component.workload.monthly_requests)} embeddings/mois` : component?.workload?.monthly_indexed_tokens ? `~${formatLargeNumber(component.workload.monthly_indexed_tokens)} tokens/mois` : ''
const patternContext = computed(() => {
  const performance = performanceResult.value || {}
  const memory = memoryResult.value || {}
  if (currentPatternId.value === 'rag') {
    const query = componentById('query_embedding')
    const index = componentById('index_embedding')
    return { title: 'Workloads secondaires', rows: [{ icon: 'E', iconBg: 'bg-sky-100', iconColor: 'text-sky-600', label: 'Embedding requêtes', value: 'BGE-M3', description: embeddingVolumeLabel(query) || 'Temps réel' }, { icon: 'E', iconBg: 'bg-sky-100', iconColor: 'text-sky-600', label: 'Indexation', value: 'BGE-M3', description: embeddingVolumeLabel(index) || 'Volume à préciser' }], message: 'Ces workloads sont distincts du sizing GPU du LLM principal.' }
  }
  if (currentPatternId.value === 'agent') {
    const tasks = safeNumber(result.value?.summary?.effective_requests_per_day)
    const multiplier = safeNumber(patternResult.value.settings?.calls_multiplier)
    return { title: 'Amplification du workload', rows: [{ icon: 'A', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', label: 'Tâches utilisateurs / jour', value: tasks === null ? 'À préciser' : formatLargeNumber(tasks) }, { icon: '×', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', label: 'Appels modèle / tâche', value: multiplier === null ? 'À préciser' : `×${formatNumber(multiplier)}`, description: patternResult.value.settings?.model_calls_per_task_estimated ? 'Hypothèse' : 'Fourni' }, { icon: 'L', iconBg: 'bg-indigo-500', iconColor: 'text-white', label: 'Appels LLM effectifs / jour', value: tasks !== null && multiplier !== null ? formatLargeNumber(tasks * multiplier) : 'À préciser' }] }
  }
  if (currentPatternId.value === 'batch') return { title: 'Logique de sizing Batch', rows: [{ icon: 'H', iconBg: 'bg-sky-100', iconColor: 'text-sky-600', label: 'Fenêtre de traitement', value: patternResult.value.settings?.processing_window_hours ? `${formatNumber(patternResult.value.settings.processing_window_hours)} h` : 'À préciser' }, { icon: 'T', iconBg: 'bg-sky-500', iconColor: 'text-white', label: 'Sizing mode', value: 'Throughput soutenu' }], message: 'Le dimensionnement vise à absorber la charge dans la fenêtre de traitement, et non à minimiser le TTFT.' }
  if (currentPatternId.value === 'code_assistant') return { title: 'Contexte Code', rows: [{ icon: 'C', iconBg: 'bg-violet-100', iconColor: 'text-violet-600', label: 'Context length', value: formatContextLength(memory.context_length) }, { icon: 'Q', iconBg: 'bg-violet-100', iconColor: 'text-violet-600', label: 'Precision', value: memory.effective_precision ? String(memory.effective_precision).toUpperCase() : 'À préciser' }, ...(componentById('code_retrieval_embedding') ? [{ icon: 'R', iconBg: 'bg-sky-100', iconColor: 'text-sky-600', label: 'Repo-aware retrieval', value: 'Activé' }] : [])], message: 'Les longs contextes et le retrieval peuvent augmenter la pression mémoire.' }
  return { title: 'SLO interactif', rows: [{ icon: 'T', iconBg: 'bg-sky-100', iconColor: 'text-sky-600', label: 'TTFT cible', value: performance.ttft_target_ms ? `< ${formatNumber(performance.ttft_target_ms)} ms` : 'À préciser' }, { icon: 'S', iconBg: 'bg-sky-100', iconColor: 'text-sky-600', label: 'Vitesse cible', value: performance.generation_speed_target_tps ? `${formatNumber(performance.generation_speed_target_tps)} tok/s` : 'À préciser' }, { icon: 'C', iconBg: 'bg-sky-500', iconColor: 'text-white', label: 'Concurrency', value: safeNumber(performance.peak_concurrency) === null ? 'À préciser' : formatNumber(performance.peak_concurrency) }], message: 'Pour un workload conversationnel, le benchmark doit privilégier TTFT, streaming et P95/P99 sous concurrence.' }
})
const cloudComparison = computed(() => result.value?.cloud_comparison || {})
const visibleCloudCandidates = computed(() => Array.isArray(cloudComparison.value.candidates) ? cloudComparison.value.candidates : [])
const cloudComparisonState = computed(() => {
  const status = cloudComparison.value.status
  if (status === 'unavailable') return { title: 'Catalogue Cloud temporairement indisponible', message: 'Le sizing technique a bien été calculé mais les configurations et prix Cloud n’ont pas pu être chargés.', retry: true }
  if (status === 'no_eligible_candidate' || (status === 'ok' && !visibleCloudCandidates.value.length)) return { title: 'Aucune configuration compatible identifiée', message: 'Le besoin calculé ne correspond actuellement à aucune configuration éligible dans le catalogue et la zone sélectionnée. À valider par benchmark ou avec une architecture multi-instance.' }
  if (!visibleCloudCandidates.value.length) return { title: 'Configurations Cloud indisponibles', message: 'Aucune configuration Cloud exploitable n’est disponible dans cette réponse.' }
  return null
})
const cloudEconomics = computed(() => result.value?.economics?.cloud_gpu || null)
const cloudEconomicsConfidence = computed(() => cloudConfidenceLabel(cloudEconomics.value?.confidence))
const scenarioSelection = computed(() => result.value?.scenario_selection || {})
const selectedScenarioCandidate = computed(() => scenarioSelection.value.selected_candidate || null)
const selectedScenarioEconomics = computed(() => result.value?.economics?.selected_cloud_scenario || null)
const selectedScenarioAvailable = computed(() => scenarioSelection.value.status === 'ok' && Boolean(selectedScenarioCandidate.value))
const strategyLabelMap = { control_and_sovereignty: 'Contrôle & souveraineté', cost: 'Optimisation du coût', latency_validation: 'Performance à valider', simplicity_validation: 'Simplicité opérationnelle' }
const selectedStrategyLabel = computed(() => strategyLabelMap[scenarioSelection.value.strategy] || cleanText(scenarioSelection.value.strategy))
const selectedScenarioTitle = computed(() => scenarioSelection.value.strategy === 'cost' ? 'Scénario aligné avec votre priorité coût' : scenarioSelection.value.strategy === 'latency_validation' ? 'Scénario de référence à benchmarker' : scenarioSelection.value.strategy === 'simplicity_validation' ? 'Scénario Cloud de référence' : selectedScenarioAvailable.value ? 'Scénario aligné avec vos priorités' : 'Scénario à approfondir')
const selectedScenarioGpuLine = computed(() => {
  const candidate = selectedScenarioCandidate.value || {}
  return `${candidate.accelerator_name || 'GPU à préciser'}${candidate.total_gpu_count ? ` × ${candidate.total_gpu_count}` : ''}`
})
const selectedScenarioReasons = computed(() => (scenarioSelection.value.reasons || []).map(cleanText).filter(Boolean).slice(0, 3))
const sameCloudCandidate = (left, right) => Boolean(left && right && left.provider === right.provider && left.instance_type === right.instance_type && left.region === right.region)
const selectedScenarioIsLowest = computed(() => sameCloudCandidate(selectedScenarioCandidate.value, scenarioSelection.value.lowest_cost_candidate))
const selectedScenarioCostTradeoff = computed(() => {
  const tradeoff = scenarioSelection.value.cost_tradeoff || {}
  if (!safeNumber(tradeoff.monthly_premium_vs_lowest) || safeNumber(tradeoff.monthly_premium_vs_lowest) <= 0) return ''
  const premium = formatCurrencyAmount(tradeoff.monthly_premium_vs_lowest, tradeoff.currency || selectedScenarioEconomics.value?.currency)
  const percent = safeNumber(tradeoff.premium_percent_vs_lowest)
  return percent === null ? `${premium} / mois` : `${premium} / mois · +${formatNumber(percent)} %`
})
const selectedScenarioTradeoffText = computed(() => (scenarioSelection.value.tradeoffs || []).map(cleanText).filter(Boolean).slice(0, 2).join(' '))
const selectedScenarioConfidence = computed(() => cloudConfidenceLabel(selectedScenarioEconomics.value?.confidence))
const scopeLabelMap = { primary_llm_cloud_gpu: 'Serving du LLM principal', query_embedding: 'Embedding des requêtes', index_embedding: 'Embedding d’indexation', guardrails_policy: 'Guardrails & politique de données', agent_execution_policy: 'Contrôles d’exécution agent', code_security_policy: 'Sécurité du code', code_retrieval_embedding: 'Retrieval du repository' }
const scopeLabel = (id) => scopeLabelMap[id] || String(id || '').replaceAll('_', ' ').replace(/\b\p{L}/gu, (letter) => letter.toUpperCase())
const scopeIncluded = computed(() => (result.value?.economics_scope?.included || []).map(scopeLabel))
const scopeExcluded = computed(() => (result.value?.economics_scope?.excluded || []).map(scopeLabel))
const economicsPatternCallout = computed(() => {
  const excluded = result.value?.economics_scope?.excluded || []
  if (currentPatternId.value === 'rag' && (excluded.includes('query_embedding') || excluded.includes('index_embedding'))) {
    const indexComponent = componentById('index_embedding')
    return { title: 'RAG', message: 'Les coûts d’embedding des requêtes et d’indexation ne sont pas encore inclus dans ce montant.', rows: indexComponent?.workload?.monthly_indexed_tokens ? [{ label: 'Volume d’indexation fourni', value: `~${formatLargeNumber(indexComponent.workload.monthly_indexed_tokens)} tokens/mois` }] : [] }
  }
  if (currentPatternId.value === 'agent' && safeNumber(patternResult.value.settings?.calls_multiplier) > 1) return { title: 'Volume agentique pris en compte', message: 'Le sizing du LLM intègre une amplification des appels modèle par tâche.', rows: [{ label: 'Amplification', value: `×${formatNumber(patternResult.value.settings.calls_multiplier)}` }] }
  if (currentPatternId.value === 'batch') {
    const spotCandidate = visibleCloudCandidates.value.find((candidate) => candidate.estimated_spot_monthly_730h != null)
    if (spotCandidate) return { title: 'Option Spot indicative', message: 'Pertinent uniquement si le workload tolère les interruptions.', rows: [{ label: 'On-demand', value: `${formatCurrencyAmount(spotCandidate.estimated_monthly_730h, spotCandidate.currency)} / mois` }, { label: 'Spot indicatif', value: `${formatCurrencyAmount(spotCandidate.estimated_spot_monthly_730h, spotCandidate.currency)} / mois` }] }
  }
  return null
})
const validationConfidenceRows = computed(() => {
  const confidence = result.value?.confidence || {}
  return [
    { icon: 'S', label: 'Sizing', dots: confidenceDots(confidence.sizing), value: validationConfidenceLabel('sizing', confidence.sizing) },
    { icon: '€', label: 'Économie', dots: confidenceDots(confidence.economics), value: validationConfidenceLabel('economics', confidence.economics) },
    { icon: 'P', label: 'Performance', dots: confidenceDots(confidence.latency), value: validationConfidenceLabel('latency', confidence.latency) },
  ]
})
const recommendationCategoryMeta = {
  architecture: { label: 'Architecture', icon: 'A', badgeClass: 'bg-violet-50 text-violet-600' },
  governance: { label: 'Gouvernance', icon: 'G', badgeClass: 'bg-indigo-50 text-indigo-500' },
  security: { label: 'Sécurité', icon: 'S', badgeClass: 'bg-amber-50 text-amber-700' },
  optimization: { label: 'Optimisation', icon: 'O', badgeClass: 'bg-sky-50 text-sky-600' },
}
const keyRecommendations = computed(() => {
  const recommendations = patternResult.value.recommendations || {}
  const rows = []
  ;['architecture', 'governance', 'security', 'optimization'].forEach((category) => {
    if (rows.length >= 3) return
    const text = cleanText(recommendations[category]?.[0])
    if (text) rows.push({ key: category, text, ...recommendationCategoryMeta[category] })
  })
  return rows
})
const validationChecklist = computed(() => (result.value?.next_validation || []).map(cleanText).filter(Boolean).slice(0, 5))
const hasValidationContent = computed(() => Boolean(result.value?.confidence || keyRecommendations.value.length || validationChecklist.value.length))
const selectedProviderLabel = computed(() => scenarioSelection.value.status === 'ok' ? cleanText(scenarioSelection.value.selected_candidate?.provider) : '')
const providerLabelMap = { aws: 'AWS', azure: 'Microsoft Azure', gcp: 'Google Cloud', ovh: 'OVHcloud', ovhcloud: 'OVHcloud', scaleway: 'Scaleway' }
const providerLabel = (provider) => {
  const raw = cleanText(provider)
  if (!raw) return 'Provider'
  return providerLabelMap[raw.toLowerCase()] || raw
}

const FieldInput = { props: ['id', 'label', 'modelValue', 'help', 'required', 'min', 'placeholder'], emits: ['update:modelValue'], setup(props, { emit }) { return () => h('div', [h('label', { class: 'block text-sm font-medium mb-1', for: props.id }, [props.label, props.required ? h('span', { class: 'ml-1 text-red-500' }, '*') : null]), h('input', { id: props.id, class: 'form-input w-full', type: 'number', min: props.min ?? '0', placeholder: props.placeholder, required: Boolean(props.required), value: props.modelValue, onInput: (event) => emit('update:modelValue', event.target.value) }), props.help ? h('p', { class: 'mt-1 text-xs text-gray-500' }, props.help) : null]) } }
const FieldText = { props: ['name', 'label', 'modelValue', 'type', 'required', 'placeholder'], emits: ['update:modelValue'], setup(props, { emit }) { return () => h('div', [h('label', { class: 'block text-sm font-medium mb-1' }, [props.label, props.required ? h('span', { class: 'ml-1 text-red-500' }, '*') : null]), h('input', { name: props.name, class: 'form-input w-full', type: props.type || 'text', required: Boolean(props.required), placeholder: props.placeholder, value: props.modelValue, onInput: (event) => emit('update:modelValue', event.target.value) })]) } }
const FieldSelect = { props: ['id', 'label', 'modelValue', 'options', 'required', 'help'], emits: ['update:modelValue'], setup(props, { emit }) { return () => h('div', [h('label', { class: 'block text-sm font-medium mb-1', for: props.id }, [props.label, props.required ? h('span', { class: 'ml-1 text-red-500' }, '*') : null]), h('select', { id: props.id, class: 'form-select w-full text-sm', required: Boolean(props.required), value: props.modelValue, onChange: (event) => emit('update:modelValue', event.target.value) }, props.options.map((option) => h('option', { key: option.value, value: option.value }, option.label))), props.help ? h('p', { class: 'mt-1 text-xs text-gray-500' }, props.help) : null]) } }
const ResultRow = { props: ['label', 'value'], setup(props) { return () => h('div', { class: 'flex flex-col justify-between gap-1 rounded-2xl bg-gray-50 p-4' }, [h('span', { class: 'text-xs text-gray-500' }, props.label), h('span', { class: 'font-cabinet-grotesk text-lg font-bold text-gray-900' }, props.value)]) } }
const ArchitectureComponentCard = { props: ['card'], setup(props) { return () => h('div', { class: ['min-w-0 overflow-hidden rounded-2xl border bg-white p-4 shadow-sm', props.card.borderClass] }, [h('span', { class: ['inline-flex max-w-full rounded-full px-2.5 py-1 text-[11px] font-bold break-words', props.card.badgeClass] }, props.card.badge), h('div', { class: 'mt-3 min-w-0 text-sm font-bold text-gray-900 break-words' }, props.card.title), h('div', { class: 'mt-1 min-w-0 font-cabinet-grotesk text-lg sm:text-xl font-bold text-gray-900 break-words' }, props.card.value), props.card.sublabel ? h('div', { class: 'mt-1 min-w-0 text-xs leading-snug text-gray-500 break-words' }, props.card.sublabel) : null]) } }
const TechnicalKpiCard = { props: ['item'], setup(props) { return () => h('div', { class: 'min-w-0 rounded-2xl bg-gray-50 p-4' }, [h('div', { class: ['flex h-9 w-9 items-center justify-center rounded-full', props.item.iconBg] }, [h('span', { class: ['text-sm font-bold', props.item.iconColor] }, props.item.icon)]), h('div', { class: 'mt-3 text-xs font-medium text-gray-500' }, props.item.title), h('div', { class: 'mt-1 break-words font-cabinet-grotesk text-xl font-bold text-gray-900' }, props.item.value), h('div', { class: 'mt-1 text-xs text-gray-500' }, props.item.sublabel)]) } }
const MetricLine = { props: ['item'], setup(props) { return () => h('div', { class: 'flex items-center gap-3 rounded-2xl bg-gray-50 p-3 text-sm' }, [h('div', { class: ['flex h-9 w-9 shrink-0 items-center justify-center rounded-full', props.item.iconBg] }, [h('span', { class: ['text-sm font-bold', props.item.iconColor] }, props.item.icon)]), h('div', { class: 'min-w-0 grow' }, [h('div', { class: 'font-medium text-gray-800' }, props.item.label), props.item.description ? h('div', { class: 'text-xs text-gray-500' }, props.item.description) : null]), h('div', { class: 'shrink-0 text-right font-bold text-gray-900' }, props.item.value)]) } }
const GpuMiniCard = { props: ['item'], setup(props) { return () => h('div', { class: 'rounded-2xl bg-gray-50 p-4' }, [h('div', { class: 'text-xs text-gray-500' }, props.item.label), h('div', { class: 'mt-1 break-words font-bold text-gray-900' }, props.item.value)]) } }
const CloudCandidateCard = { props: ['candidate', 'isFirst'], setup(props) { return () => h('div', { class: 'min-w-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm' }, [h('div', { class: 'flex items-center justify-between gap-3' }, [h('div', { class: 'flex min-w-0 items-center gap-3' }, [h('div', { class: 'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-600' }, 'C'), h('div', { class: 'min-w-0' }, [h('div', { class: 'truncate font-bold text-gray-900' }, providerLabel(props.candidate.provider)), h('div', { class: 'truncate text-xs text-gray-500' }, props.candidate.region || 'Région à préciser')])]), props.candidate.estimated_spot_monthly_730h != null ? h('span', { class: 'shrink-0 rounded-full bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-700' }, 'Spot') : null]), h('div', { class: 'mt-4 text-base font-bold text-gray-900' }, `${props.candidate.accelerator_name || 'GPU'}${props.candidate.total_gpu_count ? ` × ${props.candidate.total_gpu_count}` : ''}`), props.candidate.estimated_monthly_730h != null ? h('div', { class: 'mt-2 font-cabinet-grotesk text-2xl font-bold text-gray-900' }, `${formatCurrencyAmount(props.candidate.estimated_monthly_730h, props.candidate.currency)} / mois`) : h('div', { class: 'mt-2 text-sm font-bold text-gray-900' }, 'Coût à préciser'), props.candidate.estimated_peak_utilization != null ? h('div', { class: 'mt-2 text-xs text-gray-500' }, `${formatPercent(props.candidate.estimated_peak_utilization)} utilisation estimée`) : null]) } }
const ConfidenceIndicator = { props: ['item'], setup(props) { return () => h('div', { class: 'rounded-2xl bg-gray-50 p-4 text-sm' }, [h('div', { class: 'flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-500' }, props.item.icon), h('div', { class: 'mt-3 font-bold text-gray-900' }, props.item.label), h('div', { class: 'mt-1 font-bold tracking-widest text-indigo-500' }, props.item.dots), h('div', { class: 'mt-1 text-xs text-gray-500' }, props.item.value)]) } }
const RecommendationCard = { props: ['item'], setup(props) { return () => h('div', { class: 'min-w-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm' }, [h('div', { class: 'flex items-center gap-2' }, [h('span', { class: ['flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold', props.item.badgeClass] }, props.item.icon), h('span', { class: 'text-xs font-bold uppercase tracking-wide text-gray-400' }, props.item.label)]), h('p', { class: 'mt-4 text-sm font-medium leading-snug text-gray-800' }, props.item.text)]) } }
</script>

<style scoped>
.fade-enter-active,.fade-leave-active { transition: opacity 180ms ease, transform 180ms ease; }
.fade-enter-from,.fade-leave-to { opacity: 0; transform: translateY(8px); }
</style>
