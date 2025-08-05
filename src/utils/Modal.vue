<template>
  <!-- Modal backdrop -->
  <transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-out duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-show="modalOpen" class="fixed inset-0 z-50 bg-gray-900/50 transition-opacity" aria-hidden="true"></div>
  </transition>

  <!-- Modal dialog -->
  <transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-out duration-200"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-show="modalOpen"
      :id="id"
      class="fixed inset-0 z-50 overflow-hidden flex items-center justify-center px-4 sm:px-6"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="ariaLabel"
    >
      <div class="bg-white overflow-auto max-w-6xl w-full max-h-full" ref="modalContent">          
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Modal',
  emits: ['close-modal'],
  props: ['id', 'ariaLabel', 'modalOpen'],
  setup(props, { emit }) {

    const modalContent = ref(null)

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!props.modalOpen || modalContent.value.contains(target)) return
      emit('close-modal')
    }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!props.modalOpen || keyCode !== 27) return
      emit('close-modal')
    }

    onMounted(() => {
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })

    return {
      modalContent,
    }
  }
}
</script>