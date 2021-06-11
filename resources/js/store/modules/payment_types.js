import axios from "axios"

export default {
    namespaced: true,
    state: {
        payment_types: [],
    },
    actions: {
        index: function ({commit}) {
            return axios.get('/api/payment_types')
                .then(response => {
                    commit('SET_PAYMENT_TYPES', response.data.data.payment_types);
                })
        },
        store: function ({commit}, name) {
            return axios.post('/api/payment_types', {name: name})
                .then(response => {
                    commit('SET_PAYMENT_TYPES', response.data.data.payment_types);
                })
        },
        update: function ({commit}, payment_types) {
            return axios.put('/api/payment_types/' + payment_types.old_name,
                {
                    new_name: payment_types.name,
                })
        },
        destroy: function ({commit}, name) {
            return axios.delete('/api/payment_types/' + name)
                .then(response => {
                    commit('SET_PAYMENT_TYPES', response.data.data.payment_types);
                })
        },
    },
    mutations: {
        SET_PAYMENT_TYPES: (state, payment_types) => {
            state.payment_types = payment_types;
        },
    }
}
