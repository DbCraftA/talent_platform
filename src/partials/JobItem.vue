<template>
  <div class="nth-[-n+12]:-order-1 group" :class="{ 'border-b border-gray-200': !item.sticky }">
    <div class="px-4 py-6" :class="{ 'bg-indigo-100 rounded-xl': item.sticky }">
      <div class="sm:flex items-center space-y-3 sm:space-y-0 sm:space-x-5">
        <div class="shrink-0">
          <img :src="item.image" width="56" height="56" :alt="item.name" />
        </div>
        <div class="grow lg:flex items-center justify-between space-y-5 lg:space-x-2 lg:space-y-0">
          <div>
            <div class="flex items-start space-x-2">
              <div class="text-sm text-gray-800 font-semibold mb-1">{{item.name}}</div>
              <svg v-if="item.sticky" class="w-3 h-3 shrink-0 fill-amber-400" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.143 5.143A4.29 4.29 0 0 1 6.857.857a.857.857 0 0 0-1.714 0A4.29 4.29 0 0 1 .857 5.143a.857.857 0 0 0 0 1.714 4.29 4.29 0 0 1 4.286 4.286.857.857 0 0 0 1.714 0 4.29 4.29 0 0 1 4.286-4.286.857.857 0 0 0 0-1.714Z" />
              </svg>
            </div>
            <div class="mb-2">
              <router-link class="text-lg text-gray-800 font-bold" :to="item.slug">{{item.title}}</router-link>
            </div>
            <div class="-m-1">
              <a class="text-xs text-gray-500 font-medium inline-flex px-2 py-0.5 hover:text-gray-600 rounded-md m-1 whitespace-nowrap transition duration-150 ease-in-out" :class="item.sticky ? 'bg-indigo-50' : 'bg-gray-100'" href="#0">{{item.tag1}}</a>
              <a class="text-xs text-gray-500 font-medium inline-flex px-2 py-0.5 hover:text-gray-600 rounded-md m-1 whitespace-nowrap transition duration-150 ease-in-out" :class="item.sticky ? 'bg-indigo-50' : 'bg-gray-100'" href="#0">{{item.tag2}}</a>
            </div>
          </div>
          <div class="min-w-[120px] flex items-center lg:justify-end space-x-3 lg:space-x-0">
            <div class="lg:hidden lg:group-hover:block">
              <router-link class="btn-sm py-1.5 px-3 text-white bg-indigo-500 hover:bg-indigo-600 group shadow-xs" :to="item.slug">
                Apply Now <span class="tracking-normal text-indigo-200 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
              </router-link>
            </div>
            <div class="lg:group-hover:hidden text-sm italic text-gray-500">{{item.date}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobItem',
  props: ['item'],
}
</script>