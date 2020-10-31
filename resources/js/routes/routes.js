export const routes = [
    {
        path: '/',
        component: () => import('@/pages/Home')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/Login')
    },
    {
        path: '/staff',
        component: () => import('@/pages/Staff')
    },
    {
        path: '*',
        redirect: '/'
    }
];
