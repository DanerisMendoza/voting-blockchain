import api from '@/api/index'
export default {
    state: {
        ELECTION: [],
    },

    getters: {
        ELECTION: (state) => state.ELECTION,
    },

    mutations: {
        ELECTION: (state, data) => { state.ELECTION = data },
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
    }
}