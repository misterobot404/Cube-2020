import axios from "axios"

export default {
    namespaced: true,
    state: {
        units: [],
    },
    actions: {
        index: function ({commit}) {
            return axios.get('/api/units')
                .then(response => {
                    commit('SET_UNITS', response.data.data.units);
                })
        },
        store: function ({commit}, name) {
            return axios.post('/api/units', {name: name})
                .then(response => {
                    commit('SET_UNITS', response.data.data.units);
                })
        },
        update: function ({commit}, units) {
            return axios.put('/api/units/' + units.old_name,
                {
                    new_name: units.name,
                })
        },
        destroy: function ({commit}, name) {
            return axios.delete('/api/units/' + name)
                .then(response => {
                    commit('SET_UNITS', response.data.data.units);
                })
        },
    },
    mutations: {
        SET_UNITS: (state, units) => {
            state.units = units;
        },
    }
}
