<template>
  <div class="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">

    <!-- Bg -->
    <div class="absolute inset-0 bg-linear-to-b from-indigo-100 to-white pointer-events-none -z-10" aria-hidden="true"></div>

    <!-- Illustration -->
    <div class="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
      <img src="../images/hero-illustration.svg" class="max-w-none" width="1440" height="749" alt="Hero Illustration" />
    </div>

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <!-- Page content -->
      <section>
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="pt-28 pb-8 md:pt-36 md:pb-16">

            <div class="md:flex md:justify-between">

              <!-- Sidebar -->
              <aside class="mb-8 md:mb-0 md:w-64 lg:w-72 md:ml-12 lg:ml-20 md:shrink-0 md:order-1">
                <div class="sticky top-8">

                  <div class="relative bg-gray-50 rounded-xl border border-gray-200 p-5">

                    <div class="text-center mb-6">
                      <img class="inline-flex mb-2" src="../images/company-icon-08.svg" width="72" height="72" alt="Company 08" />
                      <h2 class="text-lg font-bold text-gray-800">Medium Inc.</h2>
                    </div>

                    <div class="flex justify-center md:justify-start mb-5">
                      <ul class="inline-flex flex-col space-y-2">
                        <li class="flex items-center">
                          <svg class="shrink-0 fill-gray-400 mr-3" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.707 4.293a1 1 0 0 0-1.414 1.414L10.586 8H2V2h3a1 1 0 1 0 0-2H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h8.586l-2.293 2.293a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414l-4-4Z" />
                          </svg>
                          <span class="text-sm text-gray-600">24 August, 2024</span>
                        </li>
                        <li class="flex items-center">
                          <svg class="shrink-0 fill-gray-400 mr-3" width="14" height="16" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7" cy="7" r="2" />
                            <path d="M6.3 15.7c-.1-.1-4.2-3.7-4.2-3.8C.7 10.7 0 8.9 0 7c0-3.9 3.1-7 7-7s7 3.1 7 7c0 1.9-.7 3.7-2.1 5-.1.1-4.1 3.7-4.2 3.8-.4.3-1 .3-1.4-.1Zm-2.7-5 3.4 3 3.4-3c1-1 1.6-2.2 1.6-3.6 0-2.8-2.2-5-5-5S2 4.2 2 7c0 1.4.6 2.7 1.6 3.7 0-.1 0-.1 0 0Z" />
                          </svg>
                          <span class="text-sm text-gray-600">London, UK / Remote friendly</span>
                        </li>
                        <li class="flex items-center">
                          <svg class="shrink-0 fill-gray-400 mr-3" width="16" height="12" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 0H1C.4 0 0 .4 0 1v10c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm-1 10H2V2h12v8Z" />
                            <circle cx="8" cy="6" r="2" />
                          </svg>
                          <span class="text-sm text-gray-600">$75K - $100K</span>
                        </li>
                      </ul>
                    </div>

                    <div class="max-w-xs mx-auto mb-5">
                      <a class="btn w-full text-white bg-indigo-500 hover:bg-indigo-600 group shadow-xs" href="#0">
                        Apply Now <span class="tracking-normal text-indigo-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                      </a>
                    </div>

                    <div class="text-center">
                      <a class="text-sm text-indigo-500 font-medium hover:underline" href="#0">Visit Website</a>
                    </div>

                  </div>

                </div>
              </aside>

              <!-- Main content -->
              <div class="md:grow">

                <!-- Job description -->
                <div class="pb-8">
                  <div class="mb-4">
                    <router-link class="text-indigo-500 font-medium" to="/"><span class="tracking-normal">&lt;-</span> All Jobs</router-link>
                  </div>
                  <h1 class="text-4xl font-extrabold font-inter mb-10">Engineering Manager Developer Experience</h1>
                  <!-- Job description -->
                  <div class="space-y-8 mb-8">
                    <div>
                      <h3 class="text-xl font-bold text-gray-800 mb-3">The Role</h3>
                      <div class="text-gray-500 space-y-3">
                        <p>In the world of AI, behavioural predictions are leading the charge to better machine learning.</p>
                        <p>There is so much happening in the AI space. Advances in the economic sectors have seen automated business practices rapidly increasing economic value. While the realm of the human sciences has used the power afforded by computational capabilities to solve many human based dilemmas. Even the art scene has adopted carefully selected ML applications to usher in the technological movement.</p>
                        <p>As a Senior Client Engineer, you'll work alongside other engineers, designers, and product managers to tackle everything from huge company initiatives to modest but important bug fixes, from start to finish. You'll also collaborate with your product team on discovery, helping to assess the direction and feasibility of product changes. And, perhaps most importantly, you'll actively contribute to the evolution of the culture and processes of a growing engineering team.</p>
                      </div>
                    </div>
                    <div>
                      <h3 class="text-xl font-bold text-gray-800 mb-3">About You</h3>
                      <div class="text-gray-500 space-y-3">
                        <p>You love building great software. Your work could be supporting new feature development, migrating existing features, and creating other mobile and web solutions for customers. You'll have a primary focus on frontend development using Javascript. Our client's tech stack is JavaScript, primarily using React. A strong understanding of JS core (ES2019+) is required, with some exposure in Java as back-end technology. We use modern tools, which means you'll have the opportunity to work with Webpack, Redux, Apollo, Styled Components, and much more.</p>
                        <p>You love learning. Engineering is an ever-evolving world. You enjoy playing with new tech and exploring areas that you might not have experience with yet. You are self-driven, self-learner willing to share knowledge and participate actively in your community.</p>
                        <p>Having overlap with your team is critical when working in a global remote team. Modus requires all team members to overlap with EST morning hours daily. In addition, reliable high speed internet is a must.</p>
                      </div>
                    </div>
                    <div>
                      <h3 class="text-xl font-bold text-gray-800 mb-3">Things You Might Do</h3>
                      <div class="text-gray-500 space-y-3">
                        <p>We are a fast-growing, and remote-first company, so you'll likely get experience on many different projects across the organization. That said, here are some things you'll probably do:</p>
                        <ul class="list-disc list-inside space-y-3">
                          <li>Give back to the community via open source and blog posts</li>
                          <li>Travel and meet great people- as part of our remote-first lifestyle, it's important that we come together as needed to work together, meet each other in person and have fun together. Please keep that in mind when you apply</li>
                          <li>Teach and be taught: Modus creates active teams that work in internal and external projects together, giving opportunities to stay relevant with the latest technologies and learning from experts worldwide</li>
                          <li>Interact directly with internal and external clients to represent Modus and its values</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <!-- Social share -->
                  <div class="flex items-center justify-end space-x-4">
                    <div class="text-xl font-nycd text-gray-400">Share job</div>
                    <ul class="inline-flex space-x-3">
                      <li>
                        <a class="flex justify-center items-center text-indigo-500 bg-indigo-100 hover:text-white hover:bg-indigo-500 rounded-full transition duration-150 ease-in-out" href="#0" aria-label="Twitter">
                          <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a class="flex justify-center items-center text-indigo-500 bg-indigo-100 hover:text-white hover:bg-indigo-500 rounded-full transition duration-150 ease-in-out" href="#0" aria-label="Facebook">
                          <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.023 24 14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257Z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a class="flex justify-center items-center text-indigo-500 bg-indigo-100 hover:text-white hover:bg-indigo-500 rounded-full transition duration-150 ease-in-out" href="#0" aria-label="Telegram">
                          <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.968 10.276a.338.338 0 0 0-.232-.253 1.192 1.192 0 0 0-.63.045s-14.019 5.038-14.82 5.596c-.172.121-.23.19-.259.272-.138.4.293.573.293.573l3.613 1.177a.388.388 0 0 0 .183-.011c.822-.519 8.27-5.222 8.7-5.38.068-.02.118 0 .1.049-.172.6-6.606 6.319-6.64 6.354a.138.138 0 0 0-.05.118l-.337 3.528s-.142 1.1.956 0a30.66 30.66 0 0 1 1.9-1.738c1.242.858 2.58 1.806 3.156 2.3a1 1 0 0 0 .732.283.825.825 0 0 0 .7-.622s2.561-10.275 2.646-11.658c.008-.135.021-.217.021-.317a1.177 1.177 0 0 0-.032-.316Z" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>




              </div>

            </div>

          </div>
        </div>
      </section>

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script>
import { ref } from 'vue'

import Header from '../partials/Header.vue'
import JobItem from '../partials/JobItem.vue'
import Footer from '../partials/Footer.vue'


export default {
  name: 'JobPost',
  components: {
    Header,
    JobItem,
    Footer,
  }
}
</script>