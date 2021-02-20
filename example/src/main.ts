import gmaps from '../../dist/x5-gmaps.es.js'
import '../../dist/style.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
  .use(gmaps, { key: import.meta.env.VITE_GOOGLE_KEY })
  .mount('#app')
