import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import auth from "./modules/auth";
import sales from "./modules/sales";
import layout from "./modules/layout";
import units from "./modules/units";
import sales_types from "./modules/sales_types";
import payment_types from "./modules/payment_types";
import incomes from "./modules/incomes";
import incomes_types from "./modules/incomes_types";
import expenses from "./modules/expenses";
import expenses_types from "./modules/expenses_types";
import balance_history from "./modules/balance_history";

export default new Vuex.Store({
    strict: false,
    modules: {
        auth,
        units,
        sales,
        sales_types,
        payment_types,
        incomes,
        incomes_types,
        expenses,
        expenses_types,
        layout,
        balance_history
    }
})


