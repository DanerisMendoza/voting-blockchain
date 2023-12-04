import api from "@/api/index.js";

export default {
  state: {
    candidates: [],
    application: {},
  },

  getters: {
    GET_CANDIDATES: (state) => state.candidates,
    GET_APPLICATION: (state) => state.application,
  },

  mutations: {
    SET_CANDIDATES: (state, data) => {
      state.candidates = data;
    },
    SET_APPLICATION: (state, data) => {
      state.application = data;
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

    GetCandidateById({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get("api/GetCandidateById")
          .then((response) => {
            if (response.status == 200) {
              commit("SET_APPLICATION", response.data);
              resolve(response.data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    AddAsCandidate({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api
          .post("api/AddAsCandidate", payload)
          .then((response) => {
            if (response.status == 200 || 201) {
              resolve(response.data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    CancelApplication({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .delete("api/CancelApplication")
          .then((response) => {
            if (response.status == 200) {
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
