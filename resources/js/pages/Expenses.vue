<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <!-- Header -->
                <v-card-title class="font-weight-regular">
                    <v-icon class="mr-2">money_off</v-icon>
                    Расход
                    <v-spacer/>
                    <!-- Add -->
                    <CreateDialog/>
                    <!-- Update -->
                    <v-tooltip bottom v-if="$vuetify.breakpoint.smAndUp">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                @click="getExpenses(true)"
                                icon
                                large
                                class="mr-1"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon size="24">
                                    update
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Обновить</span>
                    </v-tooltip>
                    <!-- Excel -->
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <download-excel :data="expenses" name="Расходы">
                                <v-btn
                                    @click=""
                                    icon
                                    large
                                    class="mr-1"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-icon size="24">
                                        description
                                    </v-icon>
                                </v-btn>
                            </download-excel>
                        </template>
                        <span>Excel</span>
                    </v-tooltip>
                    <!-- Print -->
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                @click="print()"
                                icon
                                large
                                class="mr-4"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon size="24">
                                    print
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Печать</span>
                    </v-tooltip>
                    <!-- Search -->
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Поиск"
                        single-line
                        hide-details
                        :style="$vuetify.breakpoint.smAndUp ? 'max-width: 340px': null"
                        class="pt-sm-0 mt-sm-0"
                    />
                </v-card-title>
                <!-- Table -->
                <v-data-table
                    :loading="loading"
                    :search="search"
                    loader-height="2px"
                    :headers="headers"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    show-select
                    multi-sort
                    :items-per-page="15"
                    :items="expenses"
                    item-key="id"
                >
                    <!-- edit value -->
                    <template v-slot:item.need_pay="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.need_pay"
                            @save="updateExpense(props.item)"
                        >
                            {{ props.item.need_pay }}
                            <template v-slot:input>
                                <v-text-field
                                    v-model="props.item.need_pay"
                                    type="number"
                                    label="Изменить"
                                    single-line
                                />
                            </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.current_pay="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.current_pay"
                            @save="updateExpense(props.item)"
                        >
                            {{ props.item.current_pay }}
                            <template v-slot:input>
                                <v-text-field
                                    v-model="props.item.current_pay"
                                    type="number"
                                    label="Изменить"
                                    single-line
                                />
                            </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.pay_out="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.pay_out"
                            @save="updateExpense(props.item)"
                        >
                            {{ props.item.pay_out }}
                            <template v-slot:input>
                                <v-text-field
                                    v-model="props.item.pay_out"
                                    type="number"
                                    label="Изменить"
                                    single-line
                                />
                            </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.balance="{ item }">
                        <v-chip>
                            {{ item.balance }}
                        </v-chip>
                    </template>
                    <template v-slot:item.description="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.description"
                            @save="updateExpense(props.item)"
                            large
                        >
                            {{ props.item.description ? props.item.description : '-' }}
                            <template v-slot:input>
                                <v-textarea
                                    v-model="props.item.description"
                                    label="Изменить"
                                />
                            </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.comment="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.comment"
                            @save="updateExpense(props.item)"
                            large
                        >
                            {{ props.item.comment ? props.item.comment : '-' }}
                            <template v-slot:input>
                                <v-textarea
                                    v-model="props.item.comment"
                                    label="Изменить"
                                />
                            </template>
                        </v-edit-dialog>
                    </template>
                    <!-- Item actions -->
                    <template v-slot:item.actions="{ item }">
                        <!-- Delete -->
                        <v-icon
                            v-if="user.role === 'admin'"
                            @click="destroyExpense(item)"
                        >
                            delete_outline
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import Vue from 'vue'
import JsonExcel from "vue-json-excel";
import {mapMutations, mapState, mapActions} from "vuex"
import CreateDialog from "../components/ExpensesCreateDialog";
import store from "../store";

Vue.component("downloadExcel", JsonExcel);

export default {
    name: "Expenses",
    components: {CreateDialog},
    data: () => ({
        headers: [
            {
                text: 'Статья расхода',
                value: 'expense_type',
            },
            {text: 'Кошелёк', value: 'payment_type', sortable: false, align: 'center'},
            {text: 'Надо', value: 'need_pay', sortable: false, align: 'center'},
            {text: 'Начислено', value: 'current_pay', sortable: false, align: 'center'},
            {text: 'Выдано', value: 'pay_out', sortable: false, align: 'center'},
            {text: 'Баланс', value: 'balance', align: 'center'},
            {text: 'Описание', value: 'description', sortable: false, align: 'center'},
            {text: 'Комментарий', value: 'comment', sortable: false, align: 'center'},
            {text: 'Дата', value: 'date', align: 'center'},
            {text: '', value: 'actions', sortable: false, align: 'center'},
        ],
        search: null,
        loading: false,
        // sort
        sortBy: 'date',
        sortDesc: true,
    }),
    computed: {
        ...mapState({
            expenses: state => state.expenses.expenses,
            user: state => state.auth.user
        }),
    },
    watch: {
        $route(to) {
            if (to.path === '/expenses')
                this.getExpenses()
        }
    },
    methods: {
        ...mapActions('expenses', [
            "index",
            "store",
            "update",
            "destroy"
        ]),
        ...mapMutations('layout', [
            "TOGGLE_SHOW_LAYOUT",
            "TOGGLE_SHOW_MESSAGE"
        ]),

        getExpenses(resultMsg = false) {
            this.loading = true;
            this.index()
                .then(() => {
                    if (resultMsg) {
                        this.TOGGLE_SHOW_MESSAGE({type: 'primary', text: "Данные обновлены"});
                    }
                })
                .catch(() => {
                    this.TOGGLE_SHOW_MESSAGE({type: 'error', text: "Ошибка"});
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        updateExpense(expense_type) {
            this.loading = true;
            this.update(expense_type)
                .then(() => {
                    store.dispatch('expenses_types/index').then();
                    this.TOGGLE_SHOW_MESSAGE({type: 'primary', text: "Данные изменены"});
                })
                .catch(() => {
                    expense_type.name = expense_type.old_name
                    this.TOGGLE_SHOW_MESSAGE({type: 'error', text: "Ошибка"});
                })
                .finally(() => {
                    this.getExpenses();
                    this.loading = false;
                })
        },
        destroyExpense(expense_type) {
            this.loading = true;
            this.destroy(expense_type.id)
                .then(() => {
                    store.dispatch('expenses_types/index').then();
                    this.TOGGLE_SHOW_MESSAGE({type: 'primary', text: "Данные удалены"});
                })
                .catch(() => {
                    this.TOGGLE_SHOW_MESSAGE({type: 'error', text: "Ошибка"});
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        print() {
            this.TOGGLE_SHOW_LAYOUT();
            setTimeout(() => {
                window.print();
                this.TOGGLE_SHOW_LAYOUT();
            }, 300);
        }
    },
    created() {
        this.getExpenses()
    }
}
</script>

