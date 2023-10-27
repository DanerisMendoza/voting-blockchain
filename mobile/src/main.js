import Vue from 'vue'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css'; // Import Vuetify CSS
import Vuetify from 'vuetify'; // Import Vuetify
import router from './router';
import store from './store'

Vue.config.productionTip = false
Vue.use(Vuetify);
const vuetify = new Vuetify(); // Initialize Vuetify

new Vue({ 
  vuetify, 
  router,
  store,
  render: h => h(App),
}).$mount('#app')
