import { createApp } from 'vue';
import { IonicVue } from '@ionic/vue';
import App from './App.vue';
import router from './router';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

// Create a new Vue app instance and use IonicVue and Vue Router
const app = createApp(App).use(IonicVue).use(router);

// Ensure that the router is ready before mounting the app
router.isReady().then(() => {
  // Mount the app to the element with id 'app'
  app.mount('#app');
});
