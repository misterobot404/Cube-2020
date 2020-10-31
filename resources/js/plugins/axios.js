import axios from "axios"
import store from  '@/store'

// При отказе в доступе (401) к защищенному ресурсу делать LOGOUT
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            store.commit("auth/LOGOUT", null, {root: true});
        } else return Promise.reject(error);
    });
