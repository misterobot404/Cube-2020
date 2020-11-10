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
                    store
                </v-icon>
                <v-toolbar-title> Добавление продажи</v-toolbar-title>
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
                                    Продажа успешно добавлена
                                </v-alert>
                            </v-col>
                            <v-col cols="12" class="pb-0 pt-3">
                                <v-select
                                    v-model="select_sale_type"
                                    height="68"
                                    filled
                                    :items="sales_type"
                                    label="Вид продажи"
                                    :rules="[v => !!v || 'Выберите вид продажи']"
                                    required
                                />
                            </v-col>
                            <v-col cols="12" class="pb-0 pt-1">
                                <v-select
                                    v-model="select_units"
                                    height="68"
                                    filled
                                    :items="units"
                                    label="Ед. измерения"
                                    :rules="[v => !!v || 'Выберите вид продажи']"
                                    required
                                />
                            </v-col>
                            <v-col cols="12" class="pb-0 pt-1">
                                <v-text-field
                                    label="Количество"
                                    filled
                                    v-model.trim="value"
                                    type="number"
                                    :rules="[
                                        v => !!v || 'Введите количество'
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
                    @click="createSale()"
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
    name: "CreateDialog",
    data: () => ({
        dialog: false,
        showMessage: false,
        loading: false,
        select_sale_type: null,
        select_units: null,
        value: null
    }),
    computed: {
        ...mapState('directories', [
            "sales_type",
            "units"
        ])
    },
    watch: {
        dialog(val) {
            if (!val) this.clearField()
        }
    },
    methods: {
        ...mapActions('sales', ["store"]),
        clearField() {
            this.$refs.form.reset();
            this.showMessage = false
        },
        createSale() {
            this.showMessage = false;
            let sale = {
                sale_type: this.select_sale_type,
                units: this.select_units,
                value: this.value,
            }
            this.loading = true;
            this.store(sale)
                .then(() => {
                    this.showMessage = true;
                })
                .finally(() => {
                    this.loading = false;
                })
        }
    }
}
</script>
