import axios from "axios"

export default {
    namespaced: true,
    state: {
        incomes: [],
    },
    actions: {
        index: function ({commit}) {
            return axios.get('/api/incomes')
                .then(response => {
                    commit('SET_INCOMES', response.data.data.incomes);
                })
        },
        store: function ({commit, dispatch}, income) {
            return axios.post('/api/incomes', {
                income_type: income.income_type,
                payment_type: income.payment_type,
                value: income.value,
                description: income.description
            })
                .then(response => {
                    dispatch('payment_types/index', null, {root: true});
                    commit('SET_INCOMES', response.data.data.incomes);
                })
        },
        update: function ({commit, dispatch, rootState}, income) {
            return axios.put('/api/incomes/' + income.id,
                {
                    income_type: income.income_type,
                    payment_type: income.payment_type,
                    value: income.value,
                    description: income.description
                })
                .then(() => {
                    dispatch('payment_types/index', null, {root: true});
                })
        },
        destroy: function ({commit, dispatch, rootState}, income) {
            return axios.delete('/api/incomes/' + income.id)
                .then(response => {
                    dispatch('payment_types/index', null, {root: true});
                    commit('SET_INCOMES', response.data.data.incomes);
                })
        },
    },
    mutations: {
        SET_INCOMES: (state, incomes) => {
            state.incomes = incomes;
        },
    }
}
