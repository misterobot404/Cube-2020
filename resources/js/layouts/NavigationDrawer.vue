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
                    <v-img :src="user.avatar"></v-img>
                </v-list-item-avatar>
                <v-list-item-content class="white--text">
                    <v-list-item-title style="white-space: normal">
                        {{ user.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="caption white--text">
                        {{ user.email }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <!-- List -->
            <v-list nav>
                <!-- Links 1 -->
                <v-list-item
                    v-for="[icon, text, link] in links1"
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
                <!-- Links 2 -->
                <v-list-group :value="links2.map(x => x[1]).includes($route.path)">
                    <template v-slot:activator>
                        <v-list-item-icon>
                            <v-icon>article</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Статьи</v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item
                        v-for="[text,link] in links2"
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
                <!-- Links 3 -->
                <v-list-item
                    v-for="[icon, text, link] in links3"
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
            <template v-slot:append>
                <v-btn depressed block @click="Logout" :loading="logoutProcess">
                    <v-icon
                        :class="navigationDrawerDynamic ? null : 'mr-2'"
                        style="opacity: 0.8"
                    >
                        transit_enterexit
                    </v-icon>
                    <span v-if="!navigationDrawerDynamic">Logout</span>
                </v-btn>
            </template>
        </v-navigation-drawer>
    </div>
</template>

<script>
import {mapMutations, mapState, mapActions} from 'vuex';

export default {
    name: "NavigationDrawer",
    data: () => ({
        links1: [
            ['insights', 'Аналитика', '/'],
            ['people_outline', 'Пользователи', '/staff'],
            ['attach_money', 'Приход', '/incomes'],
            ['money_off', 'Расход', '/expenses'],
        ],
        links2: [
            ['Статьи прихода', '/incomes_types'],
            ['Статьи расхода', '/expenses_types'],
        ],
        links3: [
            ['fastfood', 'Продажи', '/sales'],
            ['book', 'Справочник', '/directory'],
        ],
        logoutProcess: false,
    }),
    computed: {
        ...mapState({
            navigationDrawerDynamic: state => state.layout.navigationDrawerDynamic,
            user: state => state.auth.user,
        })
    },
    methods: {
        ...mapMutations('layout', [
            "TOGGLE_SETTINGS_DIALOG"
        ]),
        ...mapActions('auth', ["logout"]),
        Logout() {
            this.logoutProcess = true;

            this.logout()
                .finally(() => {this.logoutProcess = false;})
        },
    }
}
</script>
