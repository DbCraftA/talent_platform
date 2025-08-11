import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { useFormStore } from './stores/formContacterNous.js'

import 'aos/dist/aos.css';
import './css/style.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')



export { pinia }
