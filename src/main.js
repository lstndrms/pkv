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
import ToastService from 'primevue/toastservice';
import DataTable from "primevue/datatable";
import ConfirmPopup from "primevue/confirmpopup";
import Column from "primevue/column";
import Button from "primevue/button";
import Toast from 'primevue/toast';
import InputText from "primevue/inputtext";
import RadioButton from "primevue/radiobutton";
import Calendar from "primevue/calendar";
import InputNumber from "primevue/inputnumber";
import ProgressSpinner from "primevue/progressspinner";

const app = createApp(App)

app.use(router)
app.use(VueBasicAlert)
app.use(store)
app.use(PrimeVue)
app.use(DialogService)
app.use(ConfirmationService)
app.use(ToastService)


app.component('DataTable', DataTable)
app.component('ConfirmPopup', ConfirmPopup)
app.component('InputText', InputText)
app.component('RadioButton', RadioButton)
app.component('InputNumber', InputNumber)
app.component('ProgressSpinner', ProgressSpinner)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Column', Column)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Button', Button)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Toast', Toast)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Calendar', Calendar)



app.mount('#app')