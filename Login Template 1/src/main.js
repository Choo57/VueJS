import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import "./assets/scss/custom.scss";
import "./assets/fonts/metrisch.css"; // Import Metrisch font
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia();
pinia.use(({ store }) => { // Add router to pinia stores globally.
    store.$router = markRaw(router); // this.$router can be used in all stores now
});

app.use(pinia)
app.use(router)

app.mount('#app')
