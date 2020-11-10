import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import auth from "./modules/auth";
import sales from "./modules/sales";
import expenses from "./modules/expenses";
import directories from "./modules/directories";
import layout_settings from "./modules/layout_settings";

export default new Vuex.Store({
    strict: true,
    modules: {
        auth,
        directories,
        expenses,
        sales,
        layout_settings
    }
})


