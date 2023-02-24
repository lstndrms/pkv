import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import App from './App.vue'
import router from './router/router'
import VueBasicAlert from 'vue-basic-alert'
import store from '@/store'
import PrimeVue from 'primevue/config';

createApp(App)
    .use(router)
    .use(VueBasicAlert)
    .use(store)
    .use(PrimeVue)
.mount('#app')
