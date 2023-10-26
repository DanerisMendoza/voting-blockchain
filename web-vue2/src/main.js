import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'; // Import Vuetify CSS
import Vuetify from 'vuetify'; // Import Vuetify
import '@ionic/core/css/ionic.bundle.css'
import '@ionic/core/css/core.css'
import Ionic from '@ionic/vue'
import router from './router';

Vue.config.productionTip = false
Vue.use(Vuetify);
Vue.use(Ionic)
const vuetify = new Vuetify(); // Initialize Vuetify

new Vue({ 
  vuetify, 
  router,
  render: h => h(App),
}).$mount('#app')
