<template>
    <v-app
        :style="this.isAuth ? ($vuetify.theme.dark ? 'background-color: #111519': 'background-color: #F2F5F8') : null"
        :class="this.isAuth ? null : 'auth-background'"
    >
        <template v-if="this.isAuth && this.showLayout">
            <NavigationDrawer/>
            <BottomNavigation v-if="$vuetify.breakpoint.mdAndDown"/>
            <LayoutSettings/>
            <Message/>
        </template>
        <RouterPage/>
    </v-app>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import RouterPage from "./RouterPage";
import NavigationDrawer from "./NavigationDrawer";
import BottomNavigation from "./BottomNavigation";
import LayoutSettings from "./LayoutSettings";
import Message from "./Message";

export default {
    name: 'AppLayout',
    components: {
        Message,
        BottomNavigation,
        NavigationDrawer,
        RouterPage,
        LayoutSettings
    },
    computed: {
        ...mapState('layout', ['showLayout']),
        ...mapGetters('auth', ['isAuth'])
    }
}
</script>

<style scoped>
.auth-background {
    background-position: center center;
    background-size: cover;
    background-image: url('~@/assets/background.jpg');
}
</style>

