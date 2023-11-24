import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue-cookies'

import { Quasar, Notify } from 'quasar'

import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Quasar,{
    plugins: {
        Notify
    },
    config: {
        notify:{
            position: 'top',
            
        }
    }
})

app.use(VueCookies, { expires: '1d'})

app.use(createPinia())
app.use(router)

app.mount('#app')
