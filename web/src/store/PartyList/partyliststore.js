import api from "@/api/index.js";

export default {
  state: {
    partylistDialog: {
      value: false,
      mode: null,
    },
    partylistRecords: [],
    partylistName: null,
    partylistMembers: [],
    PLselections: [],
  },

  getters: {
    GET_PL_DIALOG_VALUE: (state) => state.partylistDialog.value,
    GET_PL_DIALOG_MODE: (state) => state.partylistDialog.mode,
    GET_PARTY_LISTS: (state) => state.partylistRecords,
    GET_PL_NAME: (state) => state.partylistName,
    GET_PL_MEMBERS: (state) => state.partylistMembers,
    GET_PL_SELECTIONS: (state) => state.PLselections,
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
    SET_PL_MEMBERS: (state, data) => {
      state.partylistMembers = data;
    },
    SET_PL_SELECTIONS: (state, data) => {
      state.PLselections = data;
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

    ViewPartyList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api
          .post("api/ViewPartyList", payload)
          .then((response) => {
            if (response.status == 200) {
              commit("SET_PL_MEMBERS", response.data);
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
