import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from './routes'
import store from '@/store'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.path === "/login") && store.getters['auth/isAuth']) next(from);

    if (to.matched.some(record => record.path !== "/login") && !store.getters['auth/isAuth'])
        next({ path: '/login', query: { redirect: to.fullPath }})
    else next()
});

export default router
