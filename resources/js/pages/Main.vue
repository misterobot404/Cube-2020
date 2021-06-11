<template>
    <v-fade-transition hide-on-leave v-if="!loading">
        <v-row>
            <v-col cols="12">
                <v-card
                    color="#00355E"
                    dark
                    class="rounded-lg"
                    style="min-height: 420px;"
                >
                    <v-col class="pa-0 overflow-hidden">
                        <v-card-title class="pb-0">
                            <div>Баланс компании</div>
                            <v-spacer/>
                            <download-excel :data="balance_history" name="История баланса">
                                <v-btn
                                    text
                                    icon
                                    style="text-transform: none;"
                                    color="primary"
                                >
                                    <v-icon>
                                        description
                                    </v-icon>
                                </v-btn>
                            </download-excel>
                        </v-card-title>
                        <v-col>
                            <div class="pa-2 pb-4 text-h4 font-weight-regular">
                                {{ balance }} ₽
                            </div>
                            <v-spacer/>
                            <div class="px-2 pb-2">
                                <div class="title mb-1">Дневная выручка</div>
                                <div class="d-flex align-center">
                                    <div class="text-h4"> {{ daily_income }} ₽</div>
                                    <div class="spacer"></div>
                                    <div class="d-flex flex-column text-right">
                                        <div class="font-weight-bold">
                                            <span>
                                                <span class="success--text">{{ daily_income > 0 ? (balance / (balance - daily_income) * 100 - 100).toFixed(1) : 0 }} %</span>
                                            </span>
                                        </div>
                                        <div class="caption">относительно прошлого дня</div>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                        <v-col class="pa-0">
                            <VueApexCharts height="200" type="area" :series="balance_series" :options="balance_options"></VueApexCharts>
                        </v-col>
                    </v-col>
                </v-card>
            </v-col>
            <v-col class="col-12 col-sm-6">
                <v-card class="rounded-lg">
                    <v-col class="pa-0">
                        <v-card-title class="pb-0">
                            <div>Формирование баланса</div>
                        </v-card-title>
                    </v-col>
                    <v-row>
                        <v-spacer/>
                        <VueApexCharts height="320" :width="$vuetify.breakpoint.mdAndUp ? '560' : '100%'" type="donut" :series="income_series"
                                       :options="income_options"/>
                        <v-spacer/>
                    </v-row>
                </v-card>
            </v-col>
            <v-col class="col-12 col-sm-6">
                <v-card class="rounded-lg">
                    <v-col class="pa-0">
                        <v-card-title class="pb-0">
                            <div>Баланс кошельков</div>
                        </v-card-title>
                    </v-col>
                    <v-row>
                        <v-spacer/>
                        <VueApexCharts height="320" :width="$vuetify.breakpoint.mdAndUp ? '560' : '100%'" type="donut" :series="payment_types_income_series"
                                       :options="payment_types_income_options"/>
                        <v-spacer/>
                    </v-row>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card
                    class="rounded-lg"
                    style="min-height: 560px;"
                >
                    <v-col class="pa-0 overflow-hidden">
                        <v-card-title class="pb-0">
                            <div>Баланс статей</div>
                        </v-card-title>
                        <VueApexCharts height="500" type="bar" :series="expenses_series" :options="expenses_options"/>
                    </v-col>
                </v-card>
            </v-col>
        </v-row>
    </v-fade-transition>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import VueApexCharts from 'vue-apexcharts';

export default {
    name: "Main",
    components: {
        VueApexCharts
    },
    data: () => ({
        loading: false
    }),
    computed: {
        ...mapState('balance_history', [
            "balance_history",
            "daily_income"
        ]),
        ...mapState('payment_types', [
            "payment_types",
        ]),
        ...mapState('expenses', [
            "expenses",
        ]),
        ...mapState('expenses_types', [
            "expenses_types",
        ]),
        balance() {
            return this.balance_history[this.balance_history.length - 1].balance
        },
        balance_options() {
            return {
                xaxis: {
                    labels: {
                        show: false
                    },
                    tooltip: {
                        enabled: false
                    },
                    axisBorder: {
                        show: false,
                    },
                    categories: this.balance_history.map(el => el.date)
                },
                yaxis: {
                    labels: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
                grid: {
                    show: false,
                    padding: {
                        left: 0,
                        right: 0
                    }
                },
                tooltip: {
                    followCursor: true,
                    theme: 'dark',
                    marker: {
                        show: false,
                    },
                },
                stroke: {
                    curve: 'smooth',
                    lineCap: 'butt',
                    width: 2,
                },
                chart: {
                    toolbar: {
                        show: false,
                    },
                    sparkline: {
                        enabled: true
                    },
                    parentHeightOffset: 0
                },
                dataLabels: {
                    enabled: false,
                }
            }
        },
        balance_series() {
            return [{
                name: 'Баланс',
                data: this.balance_history.map(el => el.balance)
            }]
        },
        income_options() {
            return {
                labels: ["Баланс кошельков", "Баланс статей"],
                plotOptions: {
                    pie: {
                        donut: {
                            labels: {
                                show: true,
                                name: {
                                    show: true
                                },
                                value: {
                                    show: true
                                }
                            },
                            title: {
                                text: 'Gradient Donut with custom Start-angle'
                            },
                        },
                        pie: {
                            expandOnClick: true,
                        },
                    },
                }
            }
        },
        income_series() {
            let payment_types_balance = 0;
            this.payment_types.map(el => payment_types_balance += Number(el.balance));
            let expenses_balance = 0;
            this.expenses_types.map(el => expenses_balance += Number(el.balance));
            return [payment_types_balance, expenses_balance]
        },
        payment_types_income_options() {
            return {
                labels: this.payment_types.map(el => el.name),
                plotOptions: {
                    pie: {
                        donut: {
                            labels: {
                                show: true,
                                name: {
                                    show: true
                                },
                                value: {
                                    show: true
                                }
                            }
                        },
                        pie: {
                            expandOnClick: true
                        }
                    }
                }
            }
        },
        payment_types_income_series() {
            return this.payment_types.map(el => Number(el.balance))
        },
        expenses_options() {
            return {
                xaxis: {
                    tooltip: {
                        enabled: false
                    },
                    axisBorder: {
                        show: false,
                    },
                    labels: {
                        show: true,
                        rotate: -45,
                        rotateAlways: false,
                        hideOverlappingLabels: true,
                        showDuplicates: false,
                        trim: false,
                        minHeight: 180,
                    },
                    categories: this.expenses_types.map(el => el.name)
                },
                yaxis: {
                    labels: {
                        show: true
                    }
                },
                tooltip: {
                    followCursor: true,
                    theme: 'dark',
                    marker: {
                        show: false,
                    },
                },
                stroke: {
                    curve: 'smooth',
                    lineCap: 'butt',
                    width: 2,
                },
                chart: {
                    toolbar: {
                        show: false,
                    },
                    parentHeightOffset: 0
                },
                dataLabels: {
                    enabled: false,
                }
            }
        },
        expenses_series() {
            return [{
                name: 'К начислению',
                data: this.expenses_types.map(el => el.need_pay - el.current_pay)
            },
                {
                name: 'Баланс',
                data: this.expenses_types.map(el => el.balance)
            },]
        },
    },
    watch: {
        $route(to) {
            if (to.path === '/')
                this.getBalanceHistory()
        }
    },
    methods: {
        ...mapMutations('layout', ["TOGGLE_SHOW_MESSAGE"]),
        ...mapActions('balance_history', ["index"]),
        getBalanceHistory() {
            this.loading = true;
            this.index()
                .then(() => {
                    this.loading = false;
                })
                .catch(() => {
                    this.TOGGLE_SHOW_MESSAGE({type: 'error', text: "Ошибка"});
                })
        },
    },
    created() {
        this.getBalanceHistory()
    }
}
</script>


