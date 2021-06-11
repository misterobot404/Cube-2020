import axios from "axios"

export default {
    namespaced: true,
    state: {
        expenses: [],
    },
    actions: {
        index: function ({commit}) {
            return axios.get('/api/expenses')
                .then(response => {
                    commit('SET_EXPENSES', response.data.data.expenses);
                })
        },
        store: function ({commit, dispatch}, expense) {
            return axios.post('/api/expenses', {
                expense_type: expense.expense_type,
                payment_type: expense.payment_type,
                need_pay: expense.need_pay,
                current_pay: expense.current_pay,
                pay_out: expense.pay_out,
                description: expense.description,
                comment: expense.comment
            })
                .then(response => {
                    dispatch('payment_types/index', null, {root: true});
                    commit('SET_EXPENSES', response.data.data.expenses);
                })
        },
        update: function ({commit, dispatch}, expense) {
            return axios.put('/api/expenses/' + expense.id,
                {
                    expense_type: expense.expense_type,
                    payment_type: expense.payment_type,
                    need_pay: expense.need_pay,
                    current_pay: expense.current_pay,
                    pay_out: expense.pay_out,
                    description: expense.description,
                    comment: expense.comment
                })
                .then(() => {
                    dispatch('payment_types/index', null, {root: true});
                })
        },
        destroy: function ({commit, dispatch}, id) {
            return axios.delete('/api/expenses/' + id)
                .then(response => {
                    dispatch('payment_types/index', null, {root: true});
                    commit('SET_EXPENSES', response.data.data.expenses);
                })
        },
    },
    mutations: {
        SET_EXPENSES: (state, expenses) => {
            state.expenses = expenses;
        },
    }
}
