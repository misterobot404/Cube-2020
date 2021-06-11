<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <!-- Header -->
                <v-card-title class="font-weight-regular">
                    <v-icon class="mr-2">fiber_manual_record</v-icon>
                    Статьи прихода
                    <v-spacer/>
                    <!-- Add -->
                    <CreateDialog v-if="user.role === 'admin'"/>
                    <!-- Update -->
                    <v-tooltip bottom v-if="$vuetify.breakpoint.smAndUp">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                @click="getIncomesTypes(true)"
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
                            <download-excel :data="incomes_types" name="Статьи прихода">
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
                    :items="incomes_types"
                    item-key="id"
                >
                    <!-- edit value -->
                    <template v-slot:item.name="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.name"
                            @open="props.item.old_name = props.item.name"
                            @save="updateIncomeType(props.item)"
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
                    <template v-slot:item.super_type="{ item }">
                        <v-simple-checkbox
                            v-model="item.super_type"
                            disabled
                        />
                    </template>
                    <!-- Item actions -->
                    <template v-slot:item.actions="{ item }">
                        <!-- Delete -->
                        <v-icon @click="destroyIncomeType(item)">
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
import {mapMutations, mapState, mapActions} from "vuex";
import CreateDialog from "../components/IncomesTypesCreateDialog";
import store from "../store";

Vue.component("downloadExcel", JsonExcel);

export default {
    name: "IncomesTypes",
    components: {CreateDialog},
    data: () => ({
        headers: [
            {
                text: 'Название',
                value: 'name',
            },
            {text: 'Супер статья', value: 'super_type', align: 'center'},
            {text: '', value: 'actions', sortable: false, align: 'right'},
        ],
        search: null,
        loading: false,
        // sort
        sortBy: 'super_type',
        sortDesc: false,
    }),
    computed: {
        ...mapState({
            user: state => state.auth.user,
            incomes_types: state => state.incomes_types.incomes_types
        }),
    },
    methods: {
        ...mapActions('incomes_types', [
            "index",
            "store",
            "update",
            "destroy"
        ]),
        ...mapMutations('layout', [
            "TOGGLE_SHOW_LAYOUT",
            "TOGGLE_SHOW_MESSAGE"
        ]),

        getIncomesTypes(resultMsg = false) {
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
        updateIncomeType(income_type) {
            this.loading = true;
            this.update(income_type)
                .then(() => {
                    store.dispatch('expenses_types/index').then();
                    this.TOGGLE_SHOW_MESSAGE({type: 'primary', text: "Данные изменены"});
                })
                .catch(() => {
                    income_type.name = income_type.old_name
                    this.TOGGLE_SHOW_MESSAGE({type: 'error', text: "Ошибка"});
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        destroyIncomeType(income_type) {
            this.loading = true;
            this.destroy(income_type)
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
    }
}
</script>

