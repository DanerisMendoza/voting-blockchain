import api from "@/api/index.js";

export default {
  state: {
    registerDialog: false,
  },

  getters: {
    GET_REGISTER_DIALOG: (state) => state.registerDialog,
  },

  mutations: {
    SET_REGISTER_DIALOG: (state, data) => {
      state.registerDialog = data;
    },
  },
  actions: {
    Register({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api
          .post("api/Register", payload)
          .then((response) => {
            if (response.status == 200) {
              resolve(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
