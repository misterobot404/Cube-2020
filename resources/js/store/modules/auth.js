import axios from "axios"
import router from '@/routes'

export default {
    namespaced: true,

    state: {
        token: null,
        user: {"name":"Амирханов Илья Ильгизович","email":"admin@admin.com","avatar":"/images/avatars/admin.jpg","role":"admin"},
        defaultUsers: [
            {
                name: 'Александр Рудейко',
                avatar: '/images/chat/1.8cccc71b.jpg',
                email: "misterobot404@gmail.com",
                role: 'admin',
                chat: [
                    {why: "left", massage: "Привет! Как дела?", avatar: "/images/chat/1.8cccc71b.jpg"},
                    {why: "left", massage: "Это тестовый чат.", avatar: "/images/chat/1.8cccc71b.jpg"},
                    {why: "left", massage: "Напиши мне что-то.", avatar: "/images/chat/1.8cccc71b.jpg"},
                ]
            },
            {
                name: 'Георгий Тимофеев',
                avatar: '/images/chat/2.92fb17ec.jpg',
                email: "misterobot404@gmail.com",
                role: 'user',
                chat: [
                    {why: "left", massage: "Привет! Это Гоша.", avatar: "/images/chat/2.92fb17ec.jpg"},
                ]
            },
            {
                name: 'Елизавета Павлюк',
                avatar: '/images/chat/3.78962450.jpg',
                email: "misterobot404@gmail.com",
                role: 'user',
                chat: [
                    {why: "left", massage: "Привет! Это Лиза.", avatar: "/images/chat/3.78962450.jpg"}
                ]
            },
            {
                name: 'Герман Солошин',
                avatar: '/images/chat/4.7eef6399.jpg',
                email: "misterobot404@gmail.com",
                role: 'user',
                chat: [
                    {why: "left", massage: "Привет! Это Герман.", avatar: "/images/chat/4.7eef6399.jpg"},
                ]
            },
            {
                name: 'Максим Желтов',
                avatar: '/images/chat/5.764ff046.jpg',
                email: "misterobot404@gmail.com",
                role: 'user',
                chat: [
                    {why: "left", massage: "Привет! Это Макс.", avatar: "/images/chat/5.764ff046.jpg"},
                ]
            },
        ],
        users: [
            {
                name: 'Александр Рудейко',
                avatar: '/images/chat/1.8cccc71b.jpg',
                email: "misterobot404@gmail.com",
                role: 'admin',
                chat: [
                    {why: "left", massage: "Привет! Как дела?", avatar: "/images/chat/1.8cccc71b.jpg"},
                    {why: "left", massage: "Это тестовый чат.", avatar: "/images/chat/1.8cccc71b.jpg"},
                    {why: "left", massage: "Напиши мне что-то.", avatar: "/images/chat/1.8cccc71b.jpg"},
                ]
            },
            {
                name: 'Георгий Тимофеев',
                avatar: '/images/chat/2.92fb17ec.jpg',
                email: "misterobot404@gmail.com",
                role: 'user',
                chat: [
                    {why: "left", massage: "Привет! Это Гоша.", avatar: "/images/chat/2.92fb17ec.jpg"},
                ]
            },
            {
                name: 'Елизавета Павлюк',
                avatar: '/images/chat/3.78962450.jpg',
                email: "misterobot404@gmail.com",
                role: 'user',
                chat: [
                    {why: "left", massage: "Привет! Это Лиза.", avatar: "/images/chat/3.78962450.jpg"}
                ]
            },
            {
                name: 'Герман Солошин',
                avatar: '/images/chat/4.7eef6399.jpg',
                email: "misterobot404@gmail.com",
                role: 'user',
                chat: [
                    {why: "left", massage: "Привет! Это Герман.", avatar: "/images/chat/4.7eef6399.jpg"},
                ]
            },
            {
                name: 'Максим Желтов',
                avatar: '/images/chat/5.764ff046.jpg',
                email: "misterobot404@gmail.com",
                role: 'user',
                chat: [
                    {why: "left", massage: "Привет! Это Макс.", avatar: "/images/chat/5.764ff046.jpg"},
                ]
            },
        ]
    },
    getters: {
        isAuth: (state) => {
            if (state.token && state.user) {
                // add token to axios header
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token;
                return true;
            } else return false;
        }
    },
    actions: {
        /**
         * Checking authorization data on the server and receiving a token
         *
         * @param state
         * @param commit
         * @param payload: name + email + password
         */
        login({state, commit}, payload) {
            return axios.post('/api/login', payload).then(response => {
                commit('LOGIN', {
                        token: response.data.data.token,
                        user: response.data.data.user
                    }
                );
            })
        },
        /**
         * Disable authorization token to on the server
         *
         * @param commit
         */
        logout: function ({commit}) {
            return axios.post('/api/logout').then(() =>
                commit('LOGOUT')
            )
        },
        register({ commit, dispatch }, payload) {
            return axios.post('/api/register', payload)
                .then(() => dispatch('getUsers'))
        },
        getUsers({commit}) {
            return axios.get('/api/users').then(response => commit('SET_USERS',response.data.data.users))
        },
    },
    mutations: {
        /**
         * Set authentication data
         *
         * @param state
         * @param payload: token + user
         */
        LOGIN: (state, payload) => {
            state.token = payload.token;
            state.user = payload.user;
        },
        /**
         * Remove authentication data from state and localStorage. Remove token from axios header.
         *
         * @param state
         */
        LOGOUT: (state) => {
            state.token = null;
            state.user = null;

            // remove token to axios header
            delete axios.defaults.headers.common['Authorization'];

            // if the user was on page with auth middleware
            router.push('/login');
        },
        SET_USERS: (state, users) => {
            state.users = state.defaultUsers.concat(users);
        },
    }
}
