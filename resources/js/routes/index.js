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
    // authorization
    if (to.matched.some(record => record.name !== "login") && !store.getters['auth/isAuth'])
        next({ name: 'login', query: { redirect: to.fullPath }})
    else next()
});

export default router
