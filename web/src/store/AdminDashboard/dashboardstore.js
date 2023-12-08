import api from "@/api/index.js";

export default {
  state: {
    schedDialog: false,
    votingsched: {
      start: null,
      end: null,
      timestart: null,
      timend: null,
    },
    filingsched: {
      start: null,
      end: null,
      timestart: null,
      timend: null,
    },
  },

  getters: {
    GET_SCHED_DIALOG: (state) => state.schedDialog,
    // Voting Schedule
    GET_VS_START: (state) => state.votingsched.start,
    GET_VS_START_TIME: (state) => state.votingsched.timestart,
    GET_VS_END_TIME: (state) => state.votingsched.timend,
    GET_VS_END: (state) => state.votingsched.end,
    // Filing Schedule
    GET_FS_START: (state) => state.filingsched.start,
    GET_FS_END: (state) => state.filingsched.end,
    GET_FS_START_TIME: (state) => state.filingsched.timestart,
    GET_FS_END_TIME: (state) => state.filingsched.timend,
  },

  mutations: {
    SET_SCHED_DIALOG: (state, data) => {
      state.schedDialog = data;
    },
    // Voting Schedule
    SET_VS_START: (state, data) => {
      state.votingsched.start = data;
    },
    SET_VS_END: (state, data) => {
      state.votingsched.end = data;
    },
    SET_VS_START_TIME: (state, data) => {
      state.votingsched.timestart = data;
    },
    SET_VS_END_TIME: (state, data) => {
      state.votingsched.timend = data;
    },
    // Filing Schedule
    SET_FS_START: (state, data) => {
      state.filingsched.start = data;
    },
    SET_FS_END: (state, data) => {
      state.filingsched.end = data;
    },
    SET_FS_START_TIME: (state, data) => {
      state.filingsched.timestart = data;
    },
    SET_FS_END_TIME: (state, data) => {
      state.filingsched.timend = data;
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
