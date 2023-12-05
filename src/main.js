import '@tabler/core/dist/js/tabler.min.js'
import '@tabler/core/dist/css/tabler.min.css'
import '@tabler/core/dist/css/tabler-flags.min.css'
import 'moment/min/moment-with-locales.min.js'

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import moment from 'moment'

import App from './App.vue'
import router from './router'

import 'moment/dist/locale/pt-br'

moment.locale('pt-br')

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide('moment', moment)

app.mount('#app')
