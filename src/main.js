import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import App from './App.vue'
import router from './router/router'
import VueBasicAlert from 'vue-basic-alert'
import store from '@/store'
import PrimeVue from 'primevue/config';
import DialogService from 'primevue/dialogservice';
import ConfirmationService from 'primevue/confirmationservice';
import DataTable from "primevue/datatable";
import ConfirmPopup from "primevue/confirmpopup";
import Column from "primevue/column";
import Button from "primevue/button";

const app = createApp(App)

app.use(router)
app.use(VueBasicAlert)
app.use(store)
app.use(PrimeVue)
app.use(DialogService)
app.use(ConfirmationService)


app.component('DataTable', DataTable)
app.component('ConfirmPopup', ConfirmPopup)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Column', Column)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Button', Button)


app.mount('#app')