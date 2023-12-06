import api from "@/api/index.js";

export default {
  state: {
    schedDialog: false,
    votingsched: {
      start: null,
      end: null,
    },
    filingsched: {
      start: null,
      end: null,
    },
  },

  getters: {
    GET_SCHED_DIALOG: (state) => state.schedDialog,
    GET_VS_START: (state) => state.votingsched.start,
    GET_VS_END: (state) => state.votingsched.end,
    GET_FS_START: (state) => state.filingsched.start,
    GET_FS_END: (state) => state.filingsched.end,
  },

  mutations: {
    SET_SCHED_DIALOG: (state, data) => {
      state.schedDialog = data;
    },
    SET_VS_START: (state, data) => {
      state.votingsched.start = data;
    },
    SET_VS_END: (state, data) => {
      state.votingsched.end = data;
    },
    SET_FS_START: (state, data) => {
      state.filingsched.start = data;
    },
    SET_FS_END: (state, data) => {
      state.filingsched.end = data;
    },
  },

  actions: {
    AddSchedule({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api
          .post("api/AddSchedule", payload)
          .then((response) => {
            if (response.status == 200 || 201) {
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
