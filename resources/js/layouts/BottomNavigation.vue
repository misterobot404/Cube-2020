<template>
    <v-bottom-navigation
        height="60"
        color="primary"
        style="overflow: scroll hidden;"
        :style="'justify-content: start'"
        :shift="bottomNavigationShift"
        fix
        grow
        app
    >
        <!-- Links 1 -->
        <v-btn
            v-for="[icon, text, link] in links1"
            :to="link"
            :key="text"
        >
            <span>{{ text }}</span>
            <v-icon>{{ icon }}</v-icon>
        </v-btn>
        <!-- Links 2 -->
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
                        <span>Статьи</span>
                        <v-icon>article</v-icon>
                    </v-btn>
                </div>
            </template>

            <v-list>
                <v-list-item
                    v-for="[text,link] in links2"
                    :to="link"
                    :color="$vuetify.theme.dark ? null : 'primary'"
                    :key="text"
                >
                    <v-list-item-title v-text="text"/>
                </v-list-item>
            </v-list>
        </v-menu>
        <!-- Links 3 -->
        <v-btn
            v-for="[icon, text, link] in links3"
            :to="link"
            :key="text"
        >
            <span>{{ text }}</span>
            <v-icon>{{ icon }}</v-icon>
        </v-btn>
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
    data: ()=> ({
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
        ]
    }),
    computed: {
        ...mapState('layout', [
            "bottomNavigationShift",
        ])
    },
    methods: {
        ...mapMutations('layout',[
            "TOGGLE_SETTINGS_DIALOG"
        ])
    }
}
</script>
