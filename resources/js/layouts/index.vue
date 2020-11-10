<template>
    <v-app :style="$vuetify.theme.dark ? 'background-color: #111519': 'background-color: #F2F5F8'">
        <template v-if="this.isAuth && this.showLayout">
            <NavigationDrawer/>
            <BottomNavigation v-if="$vuetify.breakpoint.mdAndDown"/>
            <LayoutSettings/>
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

export default {
    name: 'AppLayout',
    components: {
        BottomNavigation,
        NavigationDrawer,
        RouterPage,
        LayoutSettings
    },
    computed: {
        ...mapState('layout_settings', ['showLayout']),
        ...mapGetters('auth', ['isAuth'])
    }
}
</script>

