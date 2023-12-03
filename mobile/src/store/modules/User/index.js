import api from '@/api/index'

export default {
  state: {
    SIDE_NAV: [],
    USERS: [],
    USER_DETAILS: { name: null }
  },

  getters: {
    SIDE_NAV: (state) => state.SIDE_NAV,
    USER_DETAILS: (state) => state.USER_DETAILS,
    USERS: (state) => state.USERS,
  },

  mutations: {
    SIDE_NAV: (state, data) => { state.SIDE_NAV = data },
    USER_DETAILS: (state, data) => { state.USER_DETAILS = data },
    USERS: (state, data) => { state.USERS = data },
  },

  actions: {
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