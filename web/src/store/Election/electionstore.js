import api from "@/api/index.js";

export default {
  state: {
    electionstatus: null,
    election: [],
  },

  getters: {
    GET_ELECTION: (state) => state.election,
    GET_EL_STATUS: (state) => state.electionstatus,
  },

  mutations: {
    SET_ELECTION: (state, data) => {
      state.election = data;
    },
    SET_EL_STATUS: (state, data) => {
      state.electionstatus = data;
    },
  },

  actions: {
    GetActiveElection({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get("api/GetActiveElection")
          .then((response) => {
            commit("SET_ELECTION", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GetElectionStatus({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get("api/GetElectionStatus")
          .then((response) => {
            commit("SET_EL_STATUS", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
