<template>
    <v-bottom-navigation
        height="60"
        color="primary"
        style="overflow: scroll hidden;"
        :style="$vuetify.breakpoint.xsOnly ? 'justify-content: start' : null"
        :shift="bottomNavigationShift"
        fixed
        app
    >
        <!-- Links -->
        <v-btn
            v-for="[icon, text, link] in navigationLinks"
            :to="link"
            :key="text"
        >
            <span>{{ text }}</span>
            <v-icon>{{ icon }}</v-icon>
        </v-btn>
        <!-- Directories link -->
        <v-menu
            top
            offset-y
        >
            <template v-slot:activator="{ on, attrs }">
                <div
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-btn style="pointer-events: none; height: 100%">
                        <v-icon>book</v-icon>
                    </v-btn>
                </div>
            </template>

            <v-list>
                <v-list-item
                    v-for="[text,link] in navigationLinksInSection"
                    :to="link"
                    :color="$vuetify.theme.dark ? null : 'primary'"
                    :key="text"
                >
                    <v-list-item-title v-text="text"/>
                </v-list-item>
            </v-list>
        </v-menu>
        <!-- Settings -->
        <div @click="TOGGLE_SETTINGS_DIALOG">
            <v-btn style="pointer-events: none; height: 100%">
                <span>Настройки</span>
                <v-icon>settings</v-icon>
            </v-btn>
        </div>
    </v-bottom-navigation>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
    name: "BottomNavigation",
    computed: {
        ...mapState('layout_settings', [
            "navigationLinks",
            "bottomNavigationShift",
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
