import api from '@/api/index'
export default {
    state: {
        ELECTION: [],
        IS_ELECTION: null,
    },

    getters: {
        ELECTION: (state) => state.ELECTION,
        IS_ELECTION: (state) => state.IS_ELECTION,
    },

    mutations: {
        ELECTION: (state, data) => { state.ELECTION = data },
        IS_ELECTION: (state, data) => { state.IS_ELECTION = data },
    },
    actions: {
        GetActiveElection({ commit }) {
            return new Promise((resolve, reject) => {
                api.get('api/GetActiveElection').then((response) => {
                    commit('ELECTION', response.data)
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        
        IsElection({ commit }) {
            return new Promise((resolve, reject) => {
                api.get('api/isElection').then((response) => {
                    commit('IS_ELECTION', response.data)
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        
    }
}