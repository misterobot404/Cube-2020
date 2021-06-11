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
                    attach_money
                </v-icon>
                <v-toolbar-title>Добавление прихода</v-toolbar-title>
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
                                    Операция проведена
                                </v-alert>
                            </v-col>
                            <v-col cols="12" class="pb-0 pt-3">
                                <v-select
                                    v-model="selected_income_type"
                                    height="68"
                                    filled
                                    :items="incomes_types.map(el => el.name)"
                                    label="Статьи прихода"
                                    :rules="[v => !!v || 'Выберите статью прихода']"
                                    required
                                />
                            </v-col>
                            <v-col v-if="selected_income_type && incomes_types.find(el => el.name === selected_income_type).super_type" cols="12" class="pb-0 pt-1">
                                <v-text-field
                                    :value="expenses_types.find(el => el.name === selected_income_type).balance"
                                    readonly
                                    type="number"
                                    height="68"
                                    outlined
                                    label="Доступно средств"
                                />
                            </v-col>
                            <v-col cols="12" class="pb-0 pt-1">
                                <v-select
                                    v-model="selected_payment_type"
                                    height="68"
                                    filled
                                    :items="payment_types.map(el => el.name)"
                                    label="Кошелёк"
                                    :rules="[v => !!v || 'Выберите кошелёк']"
                                    required
                                />
                            </v-col>
                            <v-col cols="12" class="pb-0 pt-1">
                                <v-text-field
                                    label="Сумма"
                                    filled
                                    type="number"
                                    v-model.trim="value"
                                    :rules="[
                                        v => !!v || 'Обязательное поле',
                                        v => !(selected_income_type && incomes_types.find(el => el.name === selected_income_type).super_type) || v <= Number(expenses_types.find(el => el.name === selected_income_type).balance) || 'Превышен баланс супер статьи',
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
                    @click="createIncome()"
                >
                    Создать
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions, mapState} from "vuex";
import store from "../store";

export default {
    name: "IncomeCreateDialog",
    data: () => ({
        dialog: false,
        showMessage: false,
        loading: false,
        selected_income_type: null,
        selected_payment_type: null,
        value: null,
        description: ""
    }),
    computed: {
        ...mapState({
            incomes_types: state => state.incomes_types.incomes_types,
            expenses_types: state => state.expenses_types.expenses_types,
            payment_types: state => state.payment_types.payment_types,
        })
    },
    watch: {
        dialog(val) {
            if (!val) this.clearField()
        }
    },
    methods: {
        ...mapActions('incomes', ["store"]),
        clearField() {
            this.$refs.form.reset();
            this.showMessage = false
        },
        createIncome() {
          this.showMessage = false;
            if (this.$refs.form.validate()) {
                this.loading = true;
                let income = {
                    income_type: this.selected_income_type,
                    payment_type: this.selected_payment_type,
                    value: this.value,
                    description: this.description
                }
                this.store(income)
                    .then(() => {
                        store.dispatch('payment_types/index').then();
                        store.dispatch('expenses_types/index').then();
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
