import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCookies from 'vue-cookies'
import { createI18n } from 'vue-i18n'
import VueSplide from '@splidejs/vue-splide';

import { messages } from './i18n/message'
const i18n = createI18n({
    legacy: false,
    locale:'uz',
    fallbackLocale: 'ru',
    messages
})

import { Quasar, Notify } from 'quasar'
import '@splidejs/vue-splide/css';

import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'

import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'
import 'quasar/src/css/index.sass'


//register components
import confirmAction from '@/components/confirm-action.vue'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('confirmAction',confirmAction)

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
app.use(i18n)
app.use( VueSplide )
app.use(createPinia())
app.use(router)


app.mount('#app')
