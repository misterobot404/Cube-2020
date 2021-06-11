import Vue from 'vue'
import router from './routes'
import store from './store'
import vuetify from "./plugins/vuetify"
import "./plugins/axios"

import AppLayout from './layouts'

// Vue instance
new Vue({
    vuetify,
    store,
    router,
    render: h => h(AppLayout),
    created() {
        // loading the required data via API
        store.dispatch('units/index').then();
        store.dispatch('payment_types/index').then();
        store.dispatch('sales_types/index').then();
        store.dispatch('incomes_types/index').then();
        store.dispatch('expenses/index').then();
        store.dispatch('expenses_types/index').then();
    }
}).$mount('#app');



