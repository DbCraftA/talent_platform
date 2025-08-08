<template>
  <main class="bg-linear-to-br from-indigo-50/20 to-white ">

    <div class="relative flex">

      <!-- Content -->
      <div class="w-full md:w-1/2">

        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">

          <div class="flex-1">

            <!-- Header -->
            <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <!-- Logo -->
              <router-link class="block group" to="/" aria-label="Enovat">
                <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                  <path class="fill-indigo-500" d="M13.853 18.14 1 10.643 31 1l-.019.058z" />
                  <path class="fill-indigo-300" d="M13.853 18.14 30.981 1.058 21.357 31l-7.5-12.857z" />
                </svg>
              </router-link>
            </div>

            <!-- Progress bar -->
            <div class="px-4 pt-12 pb-8">
              <div class="max-w-md mx-auto w-full">
                <div class="relative">
                  <div class="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-gray-200 dark:bg-gray-700/60" aria-hidden="true"></div>
                  <ul class="relative flex justify-between w-full">
                    <li>
                      <router-link class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-violet-500 text-white" to="/onboarding-01">1</router-link>
                    </li>
                    <li>
                      <router-link class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-violet-500 text-white" to="/onboarding-02">2</router-link>
                    </li>
                    <li>
                      <router-link class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-violet-500 text-white" to="/onboarding-03">3</router-link>
                    </li>
                    <li>
                      <router-link class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400" to="/onboarding-04">4</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="px-4 py-8">
            <div class="max-w-md mx-auto">

              <h1 class="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">Company information</h1>
              <!-- Form -->
              <form>
                <div class="space-y-4 mb-8">
                  <!-- Company Name -->
                  <div>
                    <label class="block text-sm font-medium mb-1" for="company-name">Company Name <span class="text-red-500">*</span></label>
                    <input id="company-name" class="form-input w-full" type="text" />
                  </div>
                  <!-- City and Postal Code -->
                  <div class="flex space-x-4">
                    <div class="flex-1">
                      <label class="block text-sm font-medium mb-1" for="city">City <span class="text-red-500">*</span></label>
                      <input id="city" class="form-input w-full" type="text" />
                    </div>
                    <div class="flex-1">
                      <label class="block text-sm font-medium mb-1" for="postal-code">Postal Code <span class="text-red-500">*</span></label>
                      <input id="postal-code" class="form-input w-full" type="text" />
                    </div>
                  </div>
                  <!-- Street Address -->
                  <div>
                    <label class="block text-sm font-medium mb-1" for="street">Street Address <span class="text-red-500">*</span></label>
                    <input id="street" class="form-input w-full" type="text" />
                  </div>
                  <!-- Country -->
                  <div>
                    <label class="block text-sm font-medium mb-1" for="country">Country <span class="text-red-500">*</span></label>
                    <select id="country" class="form-select w-full">
                      <option>USA</option>
                      <option>Italy</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <router-link class="text-sm underline hover:no-underline" to="/onboarding-02">&lt;- Back</router-link>
                  <router-link class="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-auto" to="/onboarding-04">Next Step -&gt;</router-link>
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

<script>

export default {
  name: 'Onboarding03',
}
</script>