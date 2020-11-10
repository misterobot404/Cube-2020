export const routes = [
    {
        path: '/',
        component: () => import('@/pages/Main')
    },
    {
        path: '/staff',
        component: () => import('@/pages/Staff')
    },
    {
        path: '/chat',
        component: () => import('@/pages/Chat')
    },
    {
        path: '/sales',
        component: () => import('@/pages/Sales')
    },
    {
        path: '/expenses',
        component: () => import('@/pages/Expenses')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/Login')
    },
    {
        path: '/sales_type',
        component: () => import('@/pages/directories/Sales_type')
    },
    {
        path: '/expense_type',
        component: () => import('@/pages/directories/Expense_type')
    },
    {
        path: '/units',
        component: () => import('@/pages/directories/Units')
    },
    {
        path: '*',
        redirect: '/'
    }
];
