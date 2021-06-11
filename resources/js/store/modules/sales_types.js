import axios from "axios"

export default {
    namespaced: true,
    state: {
        sales_types: [],
    },
    actions: {
        index: function ({commit}) {
            return axios.get('/api/sales_types')
                .then(response => {
                    commit('SET_SALES_TYPES', response.data.data.sales_types);
                })
        },
        store: function ({commit}, name) {
            return axios.post('/api/sales_types', {name: name})
                .then(response => {
                    commit('SET_SALES_TYPES', response.data.data.sales_types);
                })
        },
        update: function ({commit}, sales_types) {
            return axios.put('/api/sales_types/' + sales_types.old_name,
                {
                    new_name: sales_types.name,
                })
        },
        destroy: function ({commit}, name) {
            return axios.delete('/api/sales_types/' + name)
                .then(response => {
                    commit('SET_SALES_TYPES', response.data.data.sales_types);
                })
        },
    },
    mutations: {
        SET_SALES_TYPES: (state, sales_types) => {
            state.sales_types = sales_types;
        },
    }
}
