<template>
    <v-snackbar
        v-model="model_showMessage"
        :color="messageType"
        text
        multi-line
        outlined
        :timeout="2000"
    >
        {{ messageText }}
        <template v-slot:action="{ attrs }">
            <v-icon v-if="messageType === 'primary'" color="primary" class="mr-2">done</v-icon>
            <v-icon v-else color="error" class="mr-2">error_outline</v-icon>
        </template>
    </v-snackbar>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
    name: "Message",
    computed: {
        ...mapState('layout', [
            "showMessage",
            "messageText",
            "messageType"
        ]),
        model_showMessage: {
            get() {
                return this.showMessage
            },
            set() {
                this.TOGGLE_SHOW_MESSAGE({})
            }
        }
    },
    methods: {
        ...mapMutations('layout',["TOGGLE_SHOW_MESSAGE"])
    }
}
</script>
