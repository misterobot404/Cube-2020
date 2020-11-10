<template>
    <v-card>
        <!-- Header -->
        <v-card-title class="font-weight-regular">
            <v-icon class="mr-1">store</v-icon>
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
                            :items="sale_type"
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
                            :items="units"
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

        <!-- Message up date-->
        <v-snackbar
            v-model="showMessage"
            color="primary"
            text
            multi-line
            outlined
            :timeout="2000"
        >
            {{messageText}}
            <template v-slot:action="{ attrs }">
                <v-icon color="primary">done</v-icon>
            </template>
        </v-snackbar>
    </v-card>
</template>

<script>
import Vue from 'vue'
import JsonExcel from "vue-json-excel";
import {mapMutations, mapState, mapActions} from "vuex"
import CreateDialog from "../components/Expenses/CreateDialog";

Vue.component("downloadExcel", JsonExcel);

export default {
    name: "Expenses",
    components: {CreateDialog},
    data() {
        return {
            headers: [
                {
                    text: 'Вид продажи',
                    value: 'sale_type',
                },
                {text: 'Стоимость', value: 'value', align: 'center'},
                {text: 'Единицы измерения', value: 'units', align: 'center'},
                {text: 'Дата', value: 'date', align: 'center'},
                {text: '', value: 'actions', sortable: false, align: 'center'},
            ],
            search: null,
            loading: false,
            // sort
            sortBy: 'date',
            sortDesc: true,
            // msg
            showMessage: false,
            messageText: null,

        }
    },
    computed: {
        ...mapState('sales', ["sales"]),
        ...mapState('static_data', [
            "sale_type",
            "units"
        ])
    },
    methods: {
        ...mapActions('sales', [
            "index",
            "store",
            "update",
            "destroy"
        ]),
        ...mapMutations('layout_settings', ["TOGGLE_SHOW_LAYOUT"]),

        getSales(resultMsg = false) {
            this.loading = true;
            this.index().finally(() => {
                this.loading = false;
                if (resultMsg) {
                    this.messageText = "Данные обновлены";
                    this.showMessage = true;
                }
            })
        },
        updateSale(sale) {
            this.loading = true;
            this.update(sale).finally(() => {
                this.loading = false;
                // msg
                this.messageText = "Продажа изменена";
                this.showMessage = true;
            })
        },
        destroySale($sale) {
            this.loading = true;
            this.destroy($sale).finally(() => {
                this.loading = false;
                this.showMessage = true;
                this.messageText = "Продажа удалена";
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

