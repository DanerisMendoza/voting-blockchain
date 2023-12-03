import api from "@/api/index.js";

export default {
  state: {
    positionsDialog: {
      value: false,
      mode: null,
    },
    positionTitle: null,
    positionRecords: [],
  },

  getters: {
    GET_POSITION_DIALOG_VALUE: (state) => state.positionsDialog.value,
    GET_POSITION_DIALOG_MODE: (state) => state.positionsDialog.mode,
    GET_POSITION_TITLE: (state) => state.positionTitle,
    GET_POSITIONS: (state) => state.positionRecords,
  },

  mutations: {
    SET_POSITION_DIALOG_VALUE: (state, data) => {
      state.positionsDialog.value = data;
    },
    SET_POSITION_DIALOG_MODE: (state, data) => {
      state.positionsDialog.mode = data;
    },
    SET_POSITION_TITLE: (state, data) => {
      state.positionTitle = data;
    },
    SET_POSITIONS: (state, data) => {
      state.positionRecords = data;
    },
  },

  actions: {
    AddPosition({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api
          .post("api/AddPosition", payload)
          .then((response) => {
            if (response.status == 200 || 201) {
              // commit("SET_POSITION_TITLE", response.data.position);
              // commit("SET_POSITIONS", response.data);
              // commit("SET_POSITION_DIALOG_VALUE", false);
              // commit("SET_POSITION_DIALOG_MODE", null);
              resolve(response.data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    GetPositions({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get("api/GetPositions")
          .then((response) => {
            if (response.status == 200 || 201) {
              commit("SET_POSITIONS", response.data);
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
