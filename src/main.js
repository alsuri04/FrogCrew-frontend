import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './assets/axios.js'

const app = createApp(App)

app.use(router)
app.use(store)

app.config.globalProperties.$axios = axios

app.mount('#app')
