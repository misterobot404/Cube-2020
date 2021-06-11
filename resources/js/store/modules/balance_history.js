import axios from "axios"

export default {
    namespaced: true,
    state: {
        balance_history: [],
        daily_income: 0,
    },
    actions: {
        index: function ({commit}) {
            return axios.get('/api/balance_history')
                .then(response => {
                    commit('SET_BALANCE_HISTORY', response.data.data.balance_history);
                    commit('SET_DAILY_INCOME', response.data.data.daily_income);
                })
        },
    },
    mutations: {
        SET_BALANCE_HISTORY: (state, balance_history) => {
            state.balance_history = balance_history;
        },
        SET_DAILY_INCOME: (state, daily_income) => {
            state.daily_income = daily_income;
        },
    }
}
