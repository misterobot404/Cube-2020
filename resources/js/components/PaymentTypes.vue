<template>
    <v-card class="fill-height">
        <!-- Header -->
        <v-card-title class="font-weight-regular">
            <v-icon class="mr-2">payment</v-icon>
            Кошельки
            <v-spacer/>
            <!-- Add -->
            <CreateDialog/>
            <!-- Update -->
            <v-tooltip bottom v-if="$vuetify.breakpoint.smAndUp">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        @click="getPaymentTypes(true)"
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
                    <download-excel :data="payment_types" name="Кошельки">
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
                class="pt-sm-0 mt-sm-0"
            />
        </v-card-title>
        <!-- Table -->
        <v-data-table
            :loading="loading"
            :search="search"
            loader-height="2px"
            :headers="headers"
            show-select
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :items-per-page="15"
            :items="payment_types"
        >
            <template v-slot:item.name="props">
                <v-edit-dialog
                    :return-value.sync="props.item.name"
                    @open="props.item.old_name = props.item.name"
                    @save="updatePaymentTypes(props.item)"
                >
                    {{ props.item.name }}
                    <template v-slot:input>
                        <v-text-field
                            v-model="props.item.name"
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
            <!-- Item actions -->
            <template v-slot:item.actions="{ item }">
                <!-- Delete -->
                <v-icon
                    @click="destroyPaymentTypes(item)"
                >
                    delete_outline
                </v-icon>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import Vue from 'vue'
import JsonExcel from "vue-json-excel";
import {mapMutations, mapState, mapActions} from "vuex"
import CreateDialog from "./PaymentTypesCreateDialog";

Vue.component("downloadExcel", JsonExcel);

export default {
    name: "PaymentTypes",
    components: {CreateDialog},
    data: () => ({
        headers: [
            {
                text: 'Название',
                value: 'name',
            },
            {
                text: 'Баланс',
                value: 'balance',
                align: 'center'
            },
            {
                text: '',
                value: 'actions',
                sortable: false,
                align: 'right'
            }
        ],
        search: null,
        loading: false,
        // sort
        sortBy: 'balance',
        sortDesc: true,
    }),
    computed: {
        ...mapState({
            payment_types: state => state.payment_types.payment_types
        }),
    },
    methods: {
        ...mapActions('payment_types', [
            "index",
            "store",
            "update",
            "destroy"
        ]),
        ...mapMutations('layout', [
            "TOGGLE_SHOW_LAYOUT",
            "TOGGLE_SHOW_MESSAGE"
        ]),

        getPaymentTypes(resultMsg = false) {
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
        updatePaymentTypes(payment_types) {
            this.loading = true;
            this.update(payment_types)
                .then(() => {
                    this.TOGGLE_SHOW_MESSAGE({type: 'primary', text: "Данные изменены"});
                })
                .catch(() => {
                    payment_types.name = payment_types.old_name
                    this.TOGGLE_SHOW_MESSAGE({type: 'error', text: "Ошибка"});
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        destroyPaymentTypes(payment_types) {
            this.loading = true;
            this.destroy(payment_types.name)
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
    }
}
</script>

