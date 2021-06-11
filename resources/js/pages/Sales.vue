<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <!-- Header -->
                <v-card-title class="font-weight-regular">
                    <v-icon class="mr-2">fastfood</v-icon>
                    Продажи
                    <v-spacer/>
                    <!-- Add -->
                    <CreateDialog/>
                    <!-- Update -->
                    <v-tooltip bottom v-if="$vuetify.breakpoint.smAndUp">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                @click="getSales(true)"
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
                            <download-excel :data="sales" name="Продажи">
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
                    :items="sales"
                    item-key="id"
                >
                    <!-- sale_type value -->
                    <template v-slot:item.sale_type="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.sale_type"
                            :large="$vuetify.breakpoint.smAndDown"
                            @save="updateSale(props.item)"
                        >
                            {{ props.item.sale_type }}
                            <template v-slot:input>
                                <v-select
                                    v-model="props.item.sale_type"
                                    single-line
                                    :items="sales_types.map(el => el.name)"
                                    label="Изменить"
                                />
                            </template>
                        </v-edit-dialog>
                    </template>
                    <!-- edit value -->
                    <template v-slot:item.value="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.value"
                            @save="updateSale(props.item)"
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
                    <!-- units value -->
                    <template v-slot:item.units="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.units"
                            :large="$vuetify.breakpoint.smAndDown"
                            @save="updateSale(props.item)"
                        >
                            {{ props.item.units }}
                            <template v-slot:input>
                                <v-select
                                    v-model="props.item.units"
                                    single-line
                                    :items="units.map(el => el.name)"
                                    label="Изменить"
                                />
                            </template>
                        </v-edit-dialog>
                    </template>
                    <!-- Item actions -->
                    <template v-slot:item.actions="{ item }">
                        <!-- Delete -->
                        <v-icon
                            @click="destroySale(item)"
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
import CreateDialog from "../components/SalesCreateDialog";

Vue.component("downloadExcel", JsonExcel);

export default {
    name: "Sales",
    components: {CreateDialog},
    data: () => ({
        headers: [
            {
                text: 'Вид продажи',
                value: 'sale_type',
            },
            {text: 'Количество', value: 'value', align: 'center'},
            {text: 'Единицы измерения', value: 'units', align: 'center'},
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
            sales: state => state.sales.sales,
            sales_types: state => state.sales_types.sales_types,
            units: state => state.units.units
        }),
    },
    watch: {
        $route(to) {
            if (to.path === '/sales')
                this.getSales()
        }
    },
    methods: {
        ...mapActions('sales', [
            "index",
            "store",
            "update",
            "destroy"
        ]),
        ...mapMutations('layout', [
            "TOGGLE_SHOW_LAYOUT",
            "TOGGLE_SHOW_MESSAGE"
        ]),

        getSales(resultMsg = false) {
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
        updateSale(sale) {
            this.loading = true;
            this.update(sale)
                .then(() => {
                    this.TOGGLE_SHOW_MESSAGE({type: 'primary', text: "Данные изменены"});
                })
                .catch(() => {
                    this.TOGGLE_SHOW_MESSAGE({type: 'error', text: "Ошибка"});
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        destroySale(sale) {
            this.loading = true;
            this.destroy(sale)
                .then(() => {
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
        this.getSales()
    }
}
</script>

