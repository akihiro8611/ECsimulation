import './assets/reset.css';

import App from './App.vue';
import router from './router/index.ts';
import { createPinia } from 'pinia';
import { createApp } from 'vue';



const app = createApp(App);
const pinia = createPinia()

app.use(router)
app.use(pinia);
app.mount('#app')