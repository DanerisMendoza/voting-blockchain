import api from '@/api/index'
export default {
    state: {
        ELECTION: [],
        ELECTION_STATUS: null,
    },

    getters: {
        ELECTION: (state) => state.ELECTION,
        ELECTION_STATUS: (state) => state.ELECTION_STATUS,
    },

    mutations: {
        ELECTION: (state, data) => { state.ELECTION = data },
        ELECTION_STATUS: (state, data) => { state.ELECTION_STATUS = data },
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
        GetElectionStatus({ commit }) {
            return new Promise((resolve, reject) => {
                api.get('api/GetElectionStatus').then((response) => {
                    commit('ELECTION_STATUS', response.data)
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
    }
}