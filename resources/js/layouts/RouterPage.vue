<template>
    <v-main>
        <v-container
            class="py-8 px-6"
            style="min-width: 320px !important"
            fluid
        >
            <keep-alive>
                <router-view/>
            </keep-alive>
        </v-container>
    </v-main>
</template>

<script>
export default {name: "RouterPage"}
</script>
