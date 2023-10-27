import Vue from 'vue'
import Vuex from 'vuex'
import Candidates from '@/store/modules/Candidates'


Vue.use(Vuex)

export default new Vuex.Store({
  
  strict: false,
  modules: {
    Candidates,
  }
})
