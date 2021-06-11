import axios from "axios"

export default {
    namespaced: true,
    state: {
        incomes_types: [],
    },
    actions: {
        index: function ({commit}) {
            return axios.get('/api/incomes_types')
                .then(response => {
                    commit('SET_INCOMES_TYPES', response.data.data.incomes_types);
                })
        },
        store: function ({commit}, income_type) {
            return axios.post('/api/incomes_types', {name: income_type.name, super_type: income_type.super_type})
                .then(response => {
                    commit('SET_INCOMES_TYPES', response.data.data.incomes_types);
                })
        },
        update: function ({commit}, income_type) {
            return axios.put('/api/incomes_types/rename',
                {
                    old_name: income_type.old_name,
                    new_name: income_type.name,
                })
        },
        destroy: function ({commit}, income_type) {
            return axios.delete('/api/incomes_types/' + income_type.name)
                .then(response => {
                    commit('SET_INCOMES_TYPES', response.data.data.incomes_types);
                })
        },
    },
    mutations: {
        SET_INCOMES_TYPES: (state, incomes_types) => {
            state.incomes_types = incomes_types;
        },
    }
}
