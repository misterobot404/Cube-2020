<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <!-- Header -->
                <v-card-title class="font-weight-regular">
                    <v-icon class="mr-2">attach_money</v-icon>
                    Приход
                    <v-spacer/>
                    <!-- Add -->
                    <CreateDialog/>
                    <!-- Update -->
                    <v-tooltip bottom v-if="$vuetify.breakpoint.smAndUp">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                @click="getIncomes(true)"
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
                            <download-excel :data="income" name="Приход">
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
                    :items-per-page="15"
                    :items="income"
                    item-key="id"
                >
                    <template v-slot:item.income_type="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.income_type"
                            @save="updateIncome(props.item)"
                        >
                            {{ props.item.income_type }}
                            <template v-slot:input>
                                <v-select
                                    v-model="props.item.income_type"
                                    single-line
                                    :items="incomes_types.map(el => el.name)"
                                    label="Изменить"
                                />
                            </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.value="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.value"
                            @open="props.item.old_value = props.item.value"
                            @save="updateIncome(props.item)"
                        >
                            {{ props.item.value }}
                            <template v-slot:input>
                                <v-text-field
                                    v-model="props.item.value"
                                    type="number"
                                    label="Изменить"
                                    single-line
                                />
                            </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:item.description="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.description"
                            @save="updateIncome(props.item)"
                            large
                        >
                            <div style="max-width: 200px !important;">{{ props.item.description ? props.item.description : '-' }}</div>
                            <template v-slot:input>
                                <v-textarea
                                    v-model="props.item.description"
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
                            @click="destroyIncome(item)"
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
import CreateDialog from "../components/IncomesCreateDialog";

Vue.component("downloadExcel", JsonExcel);

export default {
    name: "Incomes",
    components: {CreateDialog},
    data: () => ({
        headers: [
            {
                text: 'Статья прихода',
                value: 'income_type',
            },
            {text: 'Кошелёк', value: 'payment_type', sortable: false, align: 'center'},
            {text: 'Сумма', value: 'value', align: 'center'},
            {text: 'Описание', value: 'description', sortable: false, align: 'center'},
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
            income: state => state.incomes.incomes,
            incomes_types: state => state.incomes_types.incomes_types,
            payment_types: state => state.payment_types.payment_types,
            units: state => state.units.units,
            user: state => state.auth.user
        }),
    },
    watch: {
        $route(to) {
            if (to.path === '/incomes')
                this.getIncomes()
        }
    },
    methods: {
        ...mapActions('incomes', [
            "index",
            "store",
            "update",
            "destroy"
        ]),
        ...mapMutations('layout', [
            "TOGGLE_SHOW_LAYOUT",
            "TOGGLE_SHOW_MESSAGE"
        ]),

        getIncomes(resultMsg = false) {
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
        updateIncome(income) {
            if (this.payment_types.find(el => el.name === income.payment_type && Number(el.balance) + Number(income.value) - Number(income.old_value) < 0)) {
                this.getIncomes();
                this.TOGGLE_SHOW_MESSAGE({type: 'error', text: "Эти деньги используются"});
            } else {
                this.loading = true;
                this.update(income)
                    .then(() => {
                        this.TOGGLE_SHOW_MESSAGE({type: 'primary', text: "Данные изменены"});
                    })
                    .catch(() => {this.TOGGLE_SHOW_MESSAGE({type: 'error', text: "Ошибка"});})
                    .finally(() => {
                        this.loading = false;
                    })
            }
        },
        destroyIncome(income) {
            if (this.payment_types.find(el => el.name === income.payment_type && Number(el.balance) - Number(income.value) < 0)) {
                this.TOGGLE_SHOW_MESSAGE({type: 'error', text: "Эти деньги используются"});
            } else {
                this.loading = true;
                this.destroy(income)
                    .then(() => {
                        this.TOGGLE_SHOW_MESSAGE({type: 'primary', text: "Данные удалены"});
                    })
                    .catch(() => {
                        this.TOGGLE_SHOW_MESSAGE({type: 'error', text: "Ошибка"});
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            }
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
        this.getIncomes()
    }
}
</script>

