import axios from "axios"

export default {
    namespaced: true,
    state: {
        expenses_types: [],
    },
    actions: {
        index: function ({commit}) {
            return axios.get('/api/expenses_types')
                .then(response => {
                    commit('SET_EXPENSES_TYPES', response.data.data.expenses_types);
                })
        },
        store: function ({commit}, expense_type) {
            return axios.post('/api/expenses_types', {
                name: expense_type.name,
                super_type: expense_type.super_type
            })
                .then(response => {
                    commit('SET_EXPENSES_TYPES', response.data.data.expenses_types);
                })
        },
        update: function ({commit}, expense_type) {
            return axios.put('/api/expenses_types/' + expense_type.old_name,
                {
                    new_name: expense_type.name,
                    need_pay: expense_type.need_pay,
                    current_pay: expense_type.current_pay,
                    pay_out: expense_type.pay_out
                })
        },
        destroy: function ({commit}, expense_type) {
            return axios.delete('/api/expenses_types/' + expense_type.name)
                .then(response => {
                    commit('SET_EXPENSES_TYPES', response.data.data.expenses_types);
                })
        },
    },
    mutations: {
        SET_EXPENSES_TYPES: (state, expenses_types) => {
            state.expenses_types = expenses_types;
        },
    }
}
