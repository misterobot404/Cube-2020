import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: localStorage.getItem('layout_darkTheme') === "true"
    },
    icons: {
        iconfont: 'md',
    }
})
