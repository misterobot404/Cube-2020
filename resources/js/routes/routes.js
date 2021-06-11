import Main from "../pages/Main";
import Staff from "../pages/Staff";
import Incomes from "../pages/Incomes";
import Expenses from "../pages/Expenses";
import IncomesTypes from "../pages/IncomesTypes";
import ExpensesTypes from "../pages/ExpensesTypes";
import Sales from "../pages/Sales";
import Directory from "../pages/Directory";
import Login from "../pages/Login";

export const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/staff',
        component: Staff
    },
    {
        path: '/incomes',
        component: Incomes
    },
    {
        path: '/expenses',
        component: Expenses
    },
    {
        path: '/incomes_types',
        component: IncomesTypes
    },
    {
        path: '/expenses_types',
        component: ExpensesTypes
    },
    {
        path: '/sales',
        component: Sales
    },
    {
        path: '/directory',
        component: Directory
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '*',
        redirect: '/'
    }
];
