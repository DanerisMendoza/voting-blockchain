import api from "@/api/index.js";

export default {
  state: {
    voters: [],
  },

  getters: {
    GET_VOTERS: (state) => state.voters,
  },

  mutations: {
    SET_VOTERS: (state, data) => {
      state.voters = data;
    },
  },

  actions: {
    GetAllVoters({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get("api/GetAllVoters")
          .then((response) => {
            if (response.status == 200) {
              commit("SET_VOTERS", response.data);
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
