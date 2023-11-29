import api from '@/api/index'
export default {
    state: {
        SETTINGS: [],
    },

    getters: {
        SETTINGS: (state) => state.SETTINGS,
    },

    mutations: {
        SETTINGS: (state, data) => { state.SETTINGS = data },
    },
    actions: {
        GetSettings({ commit }) {
            return new Promise((resolve, reject) => {
                api.get('api/GetSettings').then((response) => {
                    commit('SETTINGS', response.data)
                    resolve(response.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        },
    }
}