import Vue from "vue";
import Vuex from "vuex";
import loginstore from "@/store/Login/loginstore";
import registerstore from "@/store/Login/registerstore";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: false,
  modules: {
    loginstore,
    registerstore,
  },
});
