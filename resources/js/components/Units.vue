<template>
    <v-card class="fill-height">
        <!-- Header -->
        <v-card-title class="font-weight-regular">
            <v-icon class="mr-2">scatter_plot</v-icon>
            Единицы измерения
            <v-spacer/>
            <!-- Add -->
            <CreateDialog/>
            <!-- Update -->
            <v-tooltip bottom v-if="$vuetify.breakpoint.smAndUp">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        @click="getUnits(true)"
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
                    <download-excel :data="units" name="Ед. измерения">
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
            :items-per-page="15"
            :items="units"
        >
            <!-- edit value -->
            <template v-slot:item.name="props">
                <v-edit-dialog
                    :return-value.sync="props.item.name"
                    @open="props.item.old_name = props.item.name"
                    @save="updateUnits(props.item)"
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
            <!-- Item actions -->
            <template v-slot:item.actions="{ item }">
                <!-- Delete -->
                <v-icon
                    @click="destroyUnits(item)"
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
import CreateDialog from "./UnitsCreateDialog";

Vue.component("downloadExcel", JsonExcel);

export default {
    name: "Units",
    components: {CreateDialog},
    data: () => ({
        headers: [
            {
                text: 'Название',
                value: 'name',
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
    }),
    computed: {
        ...mapState({
            units: state => state.units.units
        }),
    },
    methods: {
        ...mapActions('units', [
            "index",
            "store",
            "update",
            "destroy"
        ]),
        ...mapMutations('layout', [
            "TOGGLE_SHOW_LAYOUT",
            "TOGGLE_SHOW_MESSAGE"
        ]),

        getUnits(resultMsg = false) {
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
        updateUnits(units) {
            this.loading = true;
            this.update(units)
                .then(() => {
                    this.TOGGLE_SHOW_MESSAGE({type: 'primary', text: "Данные изменены"});
                })
                .catch(() => {
                    units.name = units.old_name
                    this.TOGGLE_SHOW_MESSAGE({type: 'error', text: "Ошибка"});
                })
                .finally(() => {
                    this.loading = false;
                })
        },
        destroyUnits(units) {
            this.loading = true;
            this.destroy(units.name)
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

