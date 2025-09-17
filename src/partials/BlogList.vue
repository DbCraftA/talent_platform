<script setup>
import { ref } from "vue";

const category = ref(1);
</script>

<template>
  <section class="bg-linear-to-b  from-white to-indigo-100">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 border-t [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] ">
      <!-- HeroMethode content -->
      <div class="py-12 md:py-20">
        <!-- Section header -->
        <div class="pb-12 text-center">
          <h1
              class="font-nacelle  bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 text-3xl font-semibold  md:text-4xl"
          >
            Nos Réussites
          </h1>
          <div class="mx-auto max-w-3xl">
            <p class="text-xl text-gray-500">

              Discover the latest news, tips and user research insights from
              Open PRO.
            </p>
          </div>
        </div>

        <div>


          <!-- Articles -->
          <div
            class="mx-auto grid max-w-sm items-start gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3"
          >
            <!-- Article #1 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 2].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 2].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-linear-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/clientfeedback-01"
                  tabindex="-1"
                >
                  <img
                    class="aspect-101/64 w-full object-cover  transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../images/service-01.jpg"
                    width="347"
                    height="220"
                    alt="Article 01"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2">
                    <li>
                      <footer class="flex items-center gap-3">

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
                            IA
                          </h3>
                      </footer>
                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class=""
                    to="/clientfeedback-01"
                    >The ultimate guide to AI management in the age of new
                    tools</router-link >
                </h3>
              </header>
              <footer class="flex items-center gap-3">

                <div class="text-sm font-medium ">
                  <span>Mark Zuch</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class="text-indigo-500"
                    href="#0"
                    >Content Manager</a
                  >
                </div>
              </footer>
            </article>
            <!-- Article #2 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 3].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 3].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-linear-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/clientfeedback-02"
                  tabindex="-1"
                >
                  <img
                    class="aspect-101/64 w-full object-cover  transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../images/service-10.jpg"
                    width="347"
                    height="220"
                    alt="Article 02"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2">
                    <li>
                      <footer class="flex items-center gap-3">

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
                          CLOUD
                        </h3>
                      </footer>

                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class=" "
                    to="/clientfeedback-02"
                    >New AI releases for better, faster, more personalized
                    support</router-link
                  >
                </h3>
              </header>
              <footer class="flex items-center gap-3">
                <div class="text-sm font-medium ">
                  <span>Zara Burke</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class=" transition-colors text-indigo-500"
                    href="#0"
                    >Principal Editor</a
                  >
                </div>
              </footer>
            </article>
            <!-- Article #3 -->
            <article
              class="flex h-full flex-col transition-opacity"
              :class="
                ![1, 4].includes(category) && 'pointer-events-none opacity-15'
              "
              :inert="![1, 4].includes(category)"
            >
              <header>
                <router-link
                  class="group relative mb-6 block overflow-hidden rounded-2xl border border-gray-800/80 before:absolute before:inset-0 before:-z-10 before:bg-linear-to-br before:from-gray-900 before:via-indigo-500/50 before:to-indigo-500 before:opacity-50"
                  to="/clientfeedback-03"
                  tabindex="-1"
                >
                  <img
                    class="aspect-101/64 w-full object-cover   transition ease-out group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-[20%]"
                    src="../images/service-07.jpg"
                    width="347"
                    height="220"
                    alt="Article 03"
                  />
                </router-link>
                <div class="mb-3">
                  <ul class="flex flex-wrap gap-2">
                    <li>
                      <footer class="flex items-center gap-3">

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
                          IA
                        </h3>
                      </footer>

                    </li>
                  </ul>
                </div>
                <h3 class="font-nacelle mb-2 text-lg font-semibold">
                  <router-link
                    class=" "
                    to="/clientfeedback-03"
                    >Unlocking customer strategic potential with AI</router-link
                  >
                </h3>
              </header>
              <footer class="flex items-center gap-3">
                <div class="text-sm font-medium ">
                  <span>Liam Geramy</span>
                  <span class="text-gray-700"> - </span>
                  <a
                    class="text-indigo-500"
                    href="#0"
                    >Managing Editor</a
                  >
                </div>
              </footer>
            </article>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
