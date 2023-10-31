import Vue from 'vue'
import Vuex from 'vuex'
import Candidates from '@/store/modules/Candidates'
import User from '@/store/modules/User'


Vue.use(Vuex)

export default new Vuex.Store({
  
  strict: false,
  modules: {
    Candidates,
    User,
  }
})
