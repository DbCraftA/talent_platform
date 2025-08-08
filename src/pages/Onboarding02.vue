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
                  <div class="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-gray-200 " aria-hidden="true"></div>
                  <ul class="relative flex justify-between w-full">
                    <li>
                      <router-link class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-violet-500 text-white" to="/onboarding-01">1</router-link>
                    </li>
                    <li>
                      <router-link class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-violet-500 text-white" to="/onboarding-02">2</router-link>
                    </li>
                    <li>
                      <router-link class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-white  text-gray-500 " to="/onboarding-03">3</router-link>
                    </li>
                    <li>
                      <router-link class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-white  text-gray-500 " to="/onboarding-04">4</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="px-4 py-8">
            <div class="max-w-md mx-auto">

              <h1 class="text-3xl text-gray-800  font-bold mb-6">Tell us about your company</h1>
              <!-- Form -->
              <form>
                <div class="sm:flex space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
                  <label class="flex-1 relative block cursor-pointer">
                    <input type="radio" name="radio-buttons" class="peer sr-only" checked />
                    <div class="h-full text-center bg-white  px-4 py-6 rounded-lg border border-gray-200 hover:border-gray-300  shadow-xs transition">
                      <svg class="inline-flex fill-current text-violet-500 mt-2 mb-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10a9.955 9.955 0 0 1-2.003 6.005 2 2 0 0 0-1.382-1.115l-3.293-.732-.295-1.178A4.992 4.992 0 0 0 17 11v-1a5 5 0 0 0-10 0v1c0 1.626.776 3.07 1.977 3.983l-.294 1.175-3.293.732a1.999 1.999 0 0 0-1.384 1.119A9.956 9.956 0 0 1 2 12Zm3.61 7.693A9.96 9.96 0 0 0 12 22c2.431 0 4.66-.868 6.393-2.31l-.212-.847-4.5-1-.496-1.984a5.016 5.016 0 0 1-2.365 0l-.496 1.983-4.5 1-.213.85ZM12 7a3 3 0 0 0-3 3v1a3 3 0 1 0 6 0v-1a3 3 0 0 0-3-3Z" fill-rule="evenodd" />
                      </svg>
                      <div class="font-semibold text-gray-800  mb-1">Individual</div>
                      <div class="text-sm">Lorem ipsum is place text commonly used.</div>
                    </div>
                    <div class="absolute inset-0 border-2 border-transparent peer-checked:border-violet-400  rounded-lg pointer-events-none" aria-hidden="true"></div>
                  </label>
                  <label class="flex-1 relative block cursor-pointer">
                    <input type="radio" name="radio-buttons" class="peer sr-only" />
                    <div class="h-full text-center bg-white  px-4 py-6 rounded-lg border border-gray-200  hover:border-gray-300  shadow-xs transition">
                      <svg class="inline-flex fill-current text-violet-500 mt-2 mb-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M13 22V11a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v13H0V14a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v8h2Zm6-15h-2V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7H5V3a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4ZM9 22v-8a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v8h7Zm13 0V11a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v11h7Zm-5-8v-2h3v2h-3Zm0 3v-2h3v2h-3Zm0 3v-2h3v2h-3ZM4 20v-2h3v2H4Zm0-3v-2h3v2H4Z"/>
                      </svg>
                      <div class="font-semibold text-gray-800  mb-1">Organization</div>
                      <div class="text-sm">Lorem ipsum is place text commonly used.</div>
                    </div>
                    <div class="absolute inset-0 border-2 border-transparent peer-checked:border-violet-400  rounded-lg pointer-events-none" aria-hidden="true"></div>
                  </label>
                </div>
                <div class="flex items-center justify-between space-x-6 mb-8">
                  <div>
                    <div class="font-medium text-gray-800  text-sm mb-1">💸 Lorem ipsum is place text commonly?</div>
                    <div class="text-xs">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.</div>
                  </div>
                  <div class="flex items-center">
                    <div class="form-switch">
                      <input type="checkbox" id="switch" class="sr-only" checked />
                      <label for="switch">
                        <span class="bg-white shadow-xs" aria-hidden="true"></span>
                        <span class="sr-only">Switch label</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <router-link class="text-sm underline hover:no-underline" to="/onboarding-01">&lt;- Back</router-link>
                  <router-link class="btn bg-gray-900 text-gray-100 hover:bg-gray-800    ml-auto" to="/onboarding-03">Next Step -&gt;</router-link>
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
  name: 'Onboarding02',
}
</script>