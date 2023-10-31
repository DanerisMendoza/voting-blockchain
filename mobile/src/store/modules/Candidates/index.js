import api from '@/api/index'
export default {
    state: {
      POSITIONS: [],
      CANDIDATES: []
    },
    
    getters: {
      POSITIONS:(state) => state.POSITIONS,
      CANDIDATES:(state) => state.CANDIDATES,
    },

    mutations: {
      POSITIONS:(state, data)=>{state.POSITIONS = data},
      CANDIDATES:(state, data)=>{state.CANDIDATES = data},
    },
    actions: {
      GetPositions({ commit }) {
        return new Promise((resolve, reject) => {
          api.get('api/GetPositions').then((response) => {
            commit('POSITIONS', response.data)
            resolve(response.data)
          }).catch((error) => {
            reject(error)
          });
        })
      },
      GetCandidates({ commit }, payload) {
        return new Promise((resolve, reject) => {
          api.get('api/GetCandidates',payload).then((response) => {
            commit('CANDIDATES', response.data)
            resolve(response.data)
          }).catch((error) => {
            reject(error)
          });
        })
      },
    }
}