<template>
    <v-navigation-drawer
        v-model="drawer"
        app
    >
        <v-sheet
            color="grey lighten-4"
            class="pa-4"
        >
            <v-avatar
                class="mb-4"
                color="grey darken-1"
                size="64"
            />

            <div class="mx-1">Амирханов Илья Ильгизович
                <v-icon color="primary" small>star</v-icon>
            </div>
        </v-sheet>

        <v-divider/>

        <v-list>
            <v-list-item
                v-for="[icon, text] in links"
                :key="icon"
                link
                to="/staff"
            >
                <v-list-item-icon>
                    <v-icon>{{ icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ text }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "NavigationDrawer",
    data: () => ({
        drawer: null,
        links: [
            ['supervisor_account', 'Персонал'],
            ['move_to_inbox', 'Продажи'],
            ['send', 'Затраты'],
            ['delete', 'Что-то'],
        ],
    })
}
</script>
