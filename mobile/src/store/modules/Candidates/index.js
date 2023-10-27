
export default {
    state: {
      SELECTED_POSITION: 0,
    },
    
    getters: {
      SELECTED_POSITION:(state) => state.SELECTED_POSITION,
    },

    mutations: {
      SELECTED_POSITION:(state, data)=>{state.SELECTED_POSITION = data},
    },
}