import Vue from "vue";
import Vuex from "vuex";
import loginstore from "@/store/Login/loginstore";
import registerstore from "@/store/Login/registerstore";
import positionstore from "./Positions/positionstore";
import partyliststore from "./PartyList/partyliststore";
import candidatestore from "./Candidates/candidatestore";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: false,
  modules: {
    loginstore,
    registerstore,
    positionstore,
    partyliststore,
    candidatestore,
  },
});
