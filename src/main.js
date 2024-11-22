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

const token = localStorage.getItem('authToken')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const IsAuthenticated = localStorage.getItem('IsAuthenticated')
if(IsAuthenticated){
  store.commit('setAuthentication', true);
}

const IsAdmin = localStorage.getItem('IsAdmin')
if(IsAdmin){
  store.commit('setIsAdmin', IsAdmin)
}

localStorage.getItem('IsAdmin')
localStorage.getItem('IsAuthenticated')