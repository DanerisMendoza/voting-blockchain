import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'; // Import Vuetify CSS
import Vuetify from 'vuetify'; // Import Vuetify

Vue.config.productionTip = false
Vue.use(Vuetify);
const vuetify = new Vuetify(); // Initialize Vuetify

new Vue({ 
  vuetify, // Use Vuetify
  render: h => h(App),
}).$mount('#app')
