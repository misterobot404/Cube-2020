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
                    money_off
                </v-icon>
                <v-toolbar-title>Добавление расхода</v-toolbar-title>
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
                                    v-model="selected_expense_type"
                                    height="68"
                                    filled
                                    :items="expenses_types.map(el => el.name)"
                                    label="Статься расходов"
                                    :rules="[v => !!v || 'Выберите статью расходов']"
                                    required
                                />
                            </v-col>
                            <v-col cols="12" class="pb-0 pt-1">
                                <v-select
                                    v-model="selected_payment_type"
                                    height="68"
                                    filled
                                    :items="payment_types.map(el => el.name)"
                                    label="Кошельки"
                                    :rules="[v => !!v || 'Выберите кошелёк']"
                                    required
                                />
                            </v-col>
                            <v-col cols="12" class="pb-0 pt-1">
                                <v-text-field
                                    :value="selected_payment_balance"
                                    readonly
                                    type="number"
                                    height="68"
                                    outlined
                                    label="Доступно средств"
                                />
                            </v-col>
                            <v-col cols="12" class="pb-0 pt-1">
                                <v-text-field
                                    label="Надо"
                                    filled
                                    type="number"
                                    v-model.trim="need_pay"
                                    :rules="[v => !!v || 'Обязательное поле']"
                                    required
                                />
                            </v-col>
                            <v-col cols="12" class="pb-0 pt-1">
                                <v-text-field
                                    label="Начисленное"
                                    filled
                                    type="number"
                                    v-model.trim="current_pay"
                                    :rules="[v => !!v || 'Обязательное поле', v => selected_payment_balance >= v || 'Не достаточно денег на кошельке']"
                                    required
                                />
                            </v-col>
                            <v-col cols="12" class="pb-0 pt-1">
                                <v-text-field
                                    label="Выдано"
                                    filled
                                    type="number"
                                    v-model.trim="pay_out"
                                    :rules="[v => !!v || 'Обязательное поле', v => Number(current_pay) >= v || 'Превышено начисление']"
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
                    @click="createExpense()"
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
    name: "ExpensesCreateDialog",
    data: () => ({
        dialog: false,
        showMessage: false,
        loading: false,
        selected_expense_type: null,
        selected_payment_type: null,
        need_pay: null,
        current_pay: null,
        pay_out: null,
        description: "",
        comment: "",
    }),
    computed: {
        ...mapState({
            expenses: state => state.expenses.expenses,
            expenses_types: state => state.expenses_types.expenses_types,
            payment_types: state => state.payment_types.payment_types
        }),
        selected_payment_balance() {
            return this.selected_payment_type ? Number(this.payment_types.find(el => el.name === this.selected_payment_type).balance) : 0
        }
    },
    watch: {
        dialog(val) {
            if (!val) this.clearField()
        }
    },
    methods: {
        ...mapActions('expenses', ["store"]),
        clearField() {
            this.$refs.form.reset();
            this.showMessage = false
        },
        createExpense() {
            this.showMessage = false;
            if (this.$refs.form.validate()) {
                this.loading = true;
                let expense = {
                    expense_type: this.selected_expense_type,
                    payment_type: this.selected_payment_type,
                    need_pay: this.need_pay,
                    current_pay: this.current_pay,
                    pay_out: this.pay_out,
                    description: this.description,
                    comment: this.comment
                }
                this.store(expense)
                    .then(() => {
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
