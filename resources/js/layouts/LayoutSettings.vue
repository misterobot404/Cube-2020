<template>
    <v-dialog
        v-model="dialog_model"
        width="500"
    >
        <v-card>
            <v-card-title>
                Настройки
            </v-card-title>
            <v-divider/>
            <v-card-text>
                <v-switch
                    label="Тёмная тема"
                    v-model="darkTheme_model"
                />
                <v-switch
                    v-if="$vuetify.breakpoint.lgAndUp"
                    label="Скрывать панель навигации"
                    v-model="navigationDrawerDynamic_model"
                />
                <v-switch
                    v-else
                    label="Скрывать название категорий навигации"
                    v-model="bottomNavigationShift_model"
                />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
    name: "LayoutSettings",
    data: () => ({
        dialog: false
    }),
    computed: {
        ...mapState('layout', [
            "settingsDialog",
            "bottomNavigationShift",
            "navigationDrawerDynamic",
        ]),
        dialog_model: {
            get() {
                return this.settingsDialog
            },
            set() {
                this.TOGGLE_SETTINGS_DIALOG()
            }
        },
        darkTheme_model: {
            get() {
                return this.$vuetify.theme.dark
            },
            set(val) {
                this.$vuetify.theme.dark = val;
                localStorage.setItem('layout_darkTheme', val);
            }
        },
        bottomNavigationShift_model: {
            get() {
                return this.bottomNavigationShift
            },
            set() {
                this.TOGGLE_BOTTOM_NAVIGATION_SHIFT()
            }
        },
        navigationDrawerDynamic_model: {
            get() {
                return this.navigationDrawerDynamic
            },
            set() {
                this.TOGGLE_NAVIGATION_DRAWER_DYNAMIC()
            }
        },
    },
    methods: {
        ...mapMutations('layout', [
            "TOGGLE_SETTINGS_DIALOG",
            "TOGGLE_BOTTOM_NAVIGATION_SHIFT",
            "TOGGLE_NAVIGATION_DRAWER_DYNAMIC"
        ])
    }
}
</script>
