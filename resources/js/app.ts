import './bootstrap';

import { createApp } from 'vue';
import router from './router'

// import ClientIndex from '@/components/clients/ClientIndex.vue';
import App from './App.vue'

const app = createApp(App)

// createApp({
//     components: {
//         ClientIndex
//     }
// })
app.use(router).mount('#app')
