import api from '@/api/index'

export default {
  state: {
    SIDE_NAV: [],
    USERS: [],
    USER_DETAILS: { name: null },
    IS_VOTED: null,
    TODAY: null,
  },

  getters: {
    SIDE_NAV: (state) => state.SIDE_NAV,
    USER_DETAILS: (state) => state.USER_DETAILS,
    USERS: (state) => state.USERS,
    IS_VOTED: (state) => state.IS_VOTED,
    TODAY: (state) => state.TODAY,
  },

  mutations: {
    SIDE_NAV: (state, data) => { state.SIDE_NAV = data },
    USER_DETAILS: (state, data) => { state.USER_DETAILS = data },
    USERS: (state, data) => { state.USERS = data },
    IS_VOTED: (state, data) => { state.IS_VOTED = data },
    TODAY: (state, data) => { state.TODAY = data },
  },

  actions: {
    GetToday({ commit }) {
      return new Promise((resolve, reject) => {
        api.get('api/GetToday').then((response) => {
          commit('TODAY', response.data)
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        });
      })
    },
    IsVoted({ commit }) {
      return new Promise((resolve, reject) => {
        api.get('api/IsVoted').then((response) => {
          commit('IS_VOTED', response.data)
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        });
      })
    },
    GetUserDetails({ commit }) {
      return new Promise((resolve, reject) => {
        api.get('api/GetUserDetails').then((response) => {
          commit('USER_DETAILS', response.data)
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        });
      })
    },
    Logout() {
      return new Promise((resolve, reject) => {
        api.post('api/Logout').then((response) => {
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        });
      })
    },
    LOGIN({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api.post('api/Login', payload).then((response) => {
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        });
      })
    },
    UPDATE_LAST_VOTE_DATE({ commit }, payload) {
      return new Promise((resolve, reject) => {
        api.patch('api/UpdateLastVoteDate', payload).then((response) => {
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        });
      })
    },

  }
}