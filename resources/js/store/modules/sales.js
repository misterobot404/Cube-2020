import axios from "axios"

export default {
    namespaced: true,
    state: {
        sales: [],
    },
    actions: {
        index: function ({commit}) {
            return axios.get('/api/sales')
                .then(response => {
                    commit('SET_SALES', response.data.data.sales);
                })
        },
        store: function ({commit}, sale) {
            return axios.post('/api/sales', sale)
                .then(response => {
                    commit('SET_SALES', response.data.data.sales);
                })
        },
        update: function ({commit}, sale) {
            return axios.put('/api/sales/' + sale.id,
                {
                    sale_type: sale.sale_type,
                    units: sale.units,
                    value: sale.value
                })
        },
        destroy: function ({commit}, sale) {
            return axios.delete('/api/sales/' + sale.id)
                .then(response => {
                    commit('SET_SALES', response.data.data.sales);
                })
        },
    },
    mutations: {
        SET_SALES: (state, sales) => {
            state.sales = sales;
        },
    }
}
