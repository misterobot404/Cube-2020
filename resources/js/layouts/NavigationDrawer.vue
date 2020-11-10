<template>
    <div>
        <v-navigation-drawer
            :key="navigationDrawerDynamic"
            :expand-on-hover="navigationDrawerDynamic"
            :mini-variant="navigationDrawerDynamic"
            mini-variant-width="60"
            app
        >
            <!-- UserPanel -->
            <v-list-item
                style="background: url(https://wrappixel.com/demos/vuejs-admin-templates/materialpro-vuetify-admin/main/img/user-info.1216cbac.jpg) no-repeat;"
                two-line
            >
                <v-list-item-avatar style="padding: 45px 0" size="48">
                    <v-img src="/images/avatars/admin.jpg"></v-img>
                </v-list-item-avatar>
                <v-list-item-content class="white--text">
                    <v-list-item-title style="white-space: normal">
                        Амирханов Илья Ильгизович
                    </v-list-item-title>
                    <v-list-item-subtitle class="caption white--text">admin@admin.com</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <!-- List -->
            <v-list nav>
                <!-- Pages -->
                <v-list-item
                    v-for="[icon, text, link] in navigationLinks"
                    :key="text"
                    :to="link"
                    :color="$vuetify.theme.dark ? null : 'primary'"
                    class="mb-1"
                >
                    <v-list-item-icon>
                        <v-icon>{{ icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <!-- Directory -->
                <v-list-group>
                    <template v-slot:activator>
                        <v-list-item-icon>
                            <v-icon>book</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Справочник</v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item
                        v-for="[text,link] in navigationLinksInSection"
                        dense
                        :to="link"
                        :key="text"
                        :color="$vuetify.theme.dark ? 'white' : null"
                    >
                        <v-list-item-icon>
                            <v-icon>
                                fiber_manual_record
                            </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="text"/>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
                <!-- Settings -->
                <v-list-item @click="TOGGLE_SETTINGS_DIALOG">
                    <v-list-item-icon>
                        <v-icon>settings</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Настройки</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex';

export default {
    name: "NavigationDrawer",
    data: () => ({}),
    computed: {
        ...mapState('layout_settings', [
            "navigationLinks",
            "navigationDrawerDynamic",
            "navigationLinksInSection"
        ])
    },
    methods: {
        ...mapMutations('layout_settings',[
            "TOGGLE_SETTINGS_DIALOG"
        ])
    }
}
</script>

<style scoped>
</style>
