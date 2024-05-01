import './assets/output.css'

import { createApp, onMounted } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { themeChange } from 'theme-change'

export default {
  setup() {
    onMounted(() => {
      themeChange(true)
    })
  },
}
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
