import api from "@/api/index.js";

export default {
  state: {
    partylistDialog: {
      value: false,
      mode: null,
    },
    partylistRecords: [],
    partylistName: null,
  },

  getters: {
    GET_PL_DIALOG_VALUE: (state) => state.partylistDialog.value,
    GET_PL_DIALOG_MODE: (state) => state.partylistDialog.mode,
    GET_PARTY_LISTS: (state) => state.partylistRecords,
    GET_PL_NAME: (state) => state.partylistName,
  },

  mutations: {
    SET_PL_DIALOG_VALUE: (state, data) => {
      state.partylistDialog.value = data;
    },
    SET_PL_DIALOG_MODE: (state, data) => {
      state.partylistDialog.mode = data;
    },
    SET_PARTY_LISTS: (state, data) => {
      state.partylistRecords = data;
    },
    SET_PL_NAME: (state, data) => {
      state.partylistName = data;
    },
  },

  actions: {
    GetPartyList({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .get("api/GetPartyList")
          .then((response) => {
            if (response.status == 200) {
              commit("SET_PARTY_LISTS", response.data);
              resolve(response.data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    AddPartyList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api
          .post("api/AddPartyList", payload)
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
