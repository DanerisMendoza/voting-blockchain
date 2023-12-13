import api from "@/api/index.js";

export default {
  state: {
    voters: [],
    changePWDialog: false,
    password: null,
    npass: null,
  },

  getters: {
    GET_VOTERS: (state) => state.voters,
    GET_PW_DIALOG: (state) => state.changePWDialog,
    GET_NEW_PW: (state) => state.password,
    GET_CNEW_PW: (state) => state.npass,
  },

  mutations: {
    SET_VOTERS: (state, data) => {
      state.voters = data;
    },
    SET_PW_DIALOG: (state, data) => {
      state.changePWDialog = data;
    },
    SET_NEW_PW: (state, data) => {
      state.password = data;
    },
    SET_CNEW_PW: (state, data) => {
      state.npass = data;
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

    ChangePassword({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api
          .patch("api/ChangePassword", payload)
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
  },
};
