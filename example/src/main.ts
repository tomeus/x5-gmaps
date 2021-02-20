import gmaps from 'x5-gmaps'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
  .use(gmaps, { key: import.meta.env.VITE_GOOGLE_KEY })
  .mount('#app')
