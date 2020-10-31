<template>
    <v-app>
        <NavigationDrawer v-if="this.$store.getters['auth/isAuth']"/>
        <RouterPage/>
    </v-app>
</template>

<script>
import RouterPage from "./RouterPage"
import NavigationDrawer from "./NavigationDrawer"

export default {
    name: 'AppLayout',
    components: {
        NavigationDrawer,
        RouterPage,
    }
}
</script>
