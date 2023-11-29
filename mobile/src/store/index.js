import Vue from 'vue'
import Vuex from 'vuex'
import Candidates from '@/store/modules/Candidates'
import User from '@/store/modules/User'
import Settings from '@/store/modules/Settings'


Vue.use(Vuex)

export default new Vuex.Store({
  
  strict: false,
  modules: {
    Candidates,
    User,
    Settings,
  }
})
