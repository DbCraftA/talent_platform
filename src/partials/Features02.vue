<template>
  <section class="  bg-linear-to-tr from-white to-indigo-100 ">
    <div class="max-w-6xl mx-auto min-h-[1000px] px-4 sm:px-6">
      <div class="py-12 md:py-20">

        <!-- Section header -->
        <div class="max-w-3xl mx-auto text-center pb-12 md:pb-16">
          <h2 class="h2 font-cabinet-grotesk">Everything you need to find, hire, and manage talents</h2>
        </div>

        <div>

          <!-- Category buttons -->
          <div class="pb-12 md:pb-20">
            <div class="flex flex-wrap justify-center -m-1.5">
              <button class="btn-sm m-1.5 h-8 shadow-sm" :class="category === '1' ? 'bg-blue-500 text-white' : 'bg-white text-gray-900 hover:bg-blue-50'" @click="category = '1'">Flexible Features</button>
              <button class="btn-sm m-1.5 h-8 shadow-sm" :class="category === '2' ? 'bg-blue-500 text-white' : 'bg-white text-gray-900 hover:bg-blue-50'" @click="category = '2'">Flexible Features</button>
              <button class="btn-sm m-1.5 h-8 shadow-sm" :class="category === '3' ? 'bg-blue-500 text-white' : 'bg-white text-gray-900 hover:bg-blue-50'" @click="category = '3'">Flexible Features</button>
              <button class="btn-sm m-1.5 h-8 shadow-sm" :class="category === '4' ? 'bg-blue-500 text-white' : 'bg-white text-gray-900 hover:bg-blue-50'" @click="category = '4'">Flexible Features</button>
            </div>
          </div>

          <!-- Section content -->
          <div class="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-8 space-y-reverse md:space-y-0">

            <!-- Content -->
            <div class="md:w-7/12 lg:w-1/2 order-1 md:order-none" data-aos="fade-up">
              <!-- Content #1 -->
              <div v-show="category === '1'">
                <h3 class="h3 font-cabinet-grotesk mb-3">The member-owned tech society.</h3>
                <p class="text-lg text-gray-500 mb-8">Work is is changing faster than at any other time in history. This rapid change requires a new hiring model. A model that is fair, inclusive, and empowering. That's why we built this.</p>
                <ul class="inline-flex flex-col space-y-6">
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-blue-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Ensure Quick Turnarounds</div>
                      <div class="text-gray-500">
                        Work is is changing faster than at any other time in history. This rapid change requires a new hiring model.
                      </div>
                    </div>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-blue-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Ensure Quick Turnarounds</div>
                      <div class="text-gray-500">
                        Work is is changing faster than at any other time in history. This rapid change requires a new hiring model.
                      </div>
                    </div>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-blue-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Ensure Quick Turnarounds</div>
                      <div class="text-gray-500">
                        Work is is changing faster than at any other time in history. This rapid change requires a new hiring model.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- Content #2 -->
              <div v-show="category === '2'">
                <h3 class="h3 font-cabinet-grotesk mb-3">Find talents, hire and manage them.</h3>
                <p class="text-lg text-gray-500 mb-8">Work is is changing faster than at any other time in history. This rapid change requires a new hiring model. A model that is fair, inclusive, and empowering. That's why we built this.</p>
                <ul class="inline-flex flex-col space-y-6">
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-blue-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Ensure Quick Turnarounds</div>
                      <div class="text-gray-500">
                        Work is is changing faster than at any other time in history. This rapid change requires a new hiring model.
                      </div>
                    </div>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-blue-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Ensure Quick Turnarounds</div>
                      <div class="text-gray-500">
                        Work is is changing faster than at any other time in history. This rapid change requires a new hiring model.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- Content #3 -->
              <div v-show="category === '3'">
                <h3 class="h3 font-cabinet-grotesk mb-3">A model that is fair, inclusive, and empowering.</h3>
                <p class="text-lg text-gray-500 mb-8">Work is is changing faster than at any other time in history. This rapid change requires a new hiring model. A model that is fair, inclusive, and empowering. That's why we built this.</p>
                <ul class="inline-flex flex-col space-y-6">
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-blue-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Ensure Quick Turnarounds</div>
                      <div class="text-gray-500">
                        Work is is changing faster than at any other time in history. This rapid change requires a new hiring model.
                      </div>
                    </div>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-blue-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Ensure Quick Turnarounds</div>
                      <div class="text-gray-500">
                        Work is is changing faster than at any other time in history. This rapid change requires a new hiring model.
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- Content #4 -->
              <div v-show="category === '4'">
                <h3 class="h3 font-cabinet-grotesk mb-3">This rapid change requires a new hiring model.</h3>
                <p class="text-lg text-gray-500 mb-8">Work is is changing faster than at any other time in history. This rapid change requires a new hiring model. A model that is fair, inclusive, and empowering. That's why we built this.</p>
                <ul class="inline-flex flex-col space-y-6">
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-blue-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Ensure Quick Turnarounds</div>
                      <div class="text-gray-500">
                        Work is is changing faster than at any other time in history. This rapid change requires a new hiring model.
                      </div>
                    </div>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-blue-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Ensure Quick Turnarounds</div>
                      <div class="text-gray-500">
                        Work is is changing faster than at any other time in history. This rapid change requires a new hiring model.
                      </div>
                    </div>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-3 h-3 fill-current text-blue-500 mt-1.5 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <div>
                      <div class="font-cabinet-grotesk font-bold text-lg mb-1">Ensure Quick Turnarounds</div>
                      <div class="text-gray-500">
                        Work is is changing faster than at any other time in history. This rapid change requires a new hiring model.
                      </div>
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