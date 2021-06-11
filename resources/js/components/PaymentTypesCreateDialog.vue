<template>
    <v-dialog
        v-model="dialog"
        max-width="400"
        overlay-opacity="0.2"
    >
        <!-- Open dialog button -->
        <template #activator="{ on: dialog }">
            <v-tooltip bottom>
                <template #activator="{ on: tooltip }">
                    <v-btn
                        icon
                        large
                        color="primary"
                        class="mr-1"
                        v-on="{ ...tooltip, ...dialog }"
                    >
                        <v-icon size="24">
                            library_add
                        </v-icon>
                    </v-btn>
                </template>
                <span>Добавить</span>
            </v-tooltip>
        </template>
        <!-- Dialog -->
        <v-card>
            <!-- Header -->
            <v-toolbar
                height="68"
                flat
                class="pr-1"
            >
                <v-icon
                    large
                    class="mr-2"
                >
                    payment
                </v-icon>
                <v-toolbar-title> Добавление вида платежа</v-toolbar-title>
                <v-spacer/>
                <v-btn
                    icon
                    @click="dialog = false; clearField()"
                >
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider/>
            <!-- Body -->
            <v-card-text class="pb-0">
                <v-form ref="form">
                    <v-container class="pb-0">
                        <v-row>
                            <v-col cols="12" class="pb-0 pt-3">
                                <v-alert
                                    :value="showMessage"
                                    transition="scale-transition"
                                    outlined
                                    text
                                    type="success"
                                >
                                    Кошелёк добавлен
                                </v-alert>
                            </v-col>
                            <v-col cols="12" class="pb-0 pt-1">
                                <v-text-field
                                    label="Название"
                                    filled
                                    v-model.trim="name"
                                    :rules="[
                                        v => !!v || 'Введите название',
                                        v => payment_types === null || payment_types.find(el => el.name === v) === undefined || 'Такое название уже существует'
                                    ]"
                                    required
                                />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-divider/>
            <!-- Footer -->
            <v-card-actions class="px-9 py-4">
                <v-btn
                    text
                    @click="clearField()"
                >
                    Очистить
                </v-btn>
                <v-spacer/>
                <v-btn
                    class="px-7"
                    color="primary"
                    outlined
                    :loading="loading"
                    @click="createPaymentTypes()"
                >
                    Создать
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    name: "PaymentTypesCreateDialog",
    data: () => ({
        dialog: false,
        showMessage: false,
        loading: false,
        name: null
    }),
    computed: {
        ...mapState({payment_types: state => state.payment_types.payment_types})
    },
    watch: {
        dialog(val) {
            if (!val) this.clearField()
        }
    },
    methods: {
        ...mapActions('payment_types', ["store"]),
        clearField() {
            this.$refs.form.reset();
            this.showMessage = false
        },
        createPaymentTypes() {
            this.showMessage = false;
            if (this.$refs.form.validate()) {
                this.loading = true;
                this.store(this.name)
                    .then(() => {
                        this.showMessage = true;
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            }
        }
    }
}
</script>
