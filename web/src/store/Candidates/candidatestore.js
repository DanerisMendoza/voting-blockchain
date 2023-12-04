import api from "@/api/index.js";

export default {
  state: {
    candidates: [],
  },

  getters: {
    GET_CANDIDATES: (state) => state.candidates,
  },

  mutations: {
    SET_CANDIDATES: (state, data) => {
      state.candidates = data;
    },
  },

  actions: {
    GetAllCandidates({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get("api/GetAllCandidates")
          .then((response) => {
            if (response.status == 200) {
              commit("SET_CANDIDATES", response.data);
              resolve(response.data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
