import api from '@/api/index'
export default {
    state: {
      SELECTED_POSITION: 0,
      POSISTIONS: []
    },
    
    getters: {
      SELECTED_POSITION:(state) => state.SELECTED_POSITION,
      POSISTIONS:(state) => state.POSISTIONS,
    },

    mutations: {
      SELECTED_POSITION:(state, data)=>{state.SELECTED_POSITION = data},
      POSISTIONS:(state, data)=>{state.POSISTIONS = data},
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
    }
}