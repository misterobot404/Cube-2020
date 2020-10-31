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
    render: h => h(AppLayout)
}).$mount('#app');





