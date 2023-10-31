import api from '@/api/index'
export default {
    state: {
      SELECTED_POSITION: 1,
      POSISTIONS: [],
      CANDIDATES: []
    },
    
    getters: {
      SELECTED_POSITION:(state) => state.SELECTED_POSITION,
      POSISTIONS:(state) => state.POSISTIONS,
      CANDIDATES:(state) => state.CANDIDATES,
    },

    mutations: {
      SELECTED_POSITION:(state, data)=>{state.SELECTED_POSITION = data},
      POSISTIONS:(state, data)=>{state.POSISTIONS = data},
      CANDIDATES:(state, data)=>{state.CANDIDATES = data},
    },
    actions: {
      GetPositions({ commit }) {
        return new Promise((resolve, reject) => {
          api.get('api/GetPositions').then((response) => {
            commit('POSISTIONS', response.data)
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