
export default {
    namespaced: true,
    state: {
        showLayout: true,
        settingsDialog: false,
        navigationDrawerDynamic: localStorage.getItem('layout_settings_navigationDrawerDynamic') === "true",
        bottomNavigationShift: localStorage.getItem('layout_settings_bottomNavigationShift') === "true",
        navigationLinks: [
            ['insights', 'Главная', '/'],
            ['people_outline', 'Персонал', '/staff'],
            ['chat_bubble_outline', 'Чат', '/chat'],
            ['store', 'Продажи', '/sales'],
            ['money_off', 'Затраты', '/expenses'],
        ],
        navigationLinksInSection: [
            ['Статьи затрат', '/expense_type'],
            ['Статьи прихода', '/income_types'],
            ['Единицы измерения', '/units'],
            ['Виды продаж', '/sales_type'],
            ['Виды оплаты', '/payment_types'],
        ],
    },
    mutations: {
        TOGGLE_SHOW_LAYOUT: (state) => {
            state.showLayout = !state.showLayout;
        },
        TOGGLE_SETTINGS_DIALOG: (state) => {
            state.settingsDialog = !state.settingsDialog;
        },
        TOGGLE_NAVIGATION_DRAWER_DYNAMIC: (state) => {
            state.navigationDrawerDynamic = !state.navigationDrawerDynamic;
            localStorage.setItem('layout_settings_navigationDrawerDynamic', state.navigationDrawerDynamic);
        },
        TOGGLE_BOTTOM_NAVIGATION_SHIFT: (state) => {
            state.bottomNavigationShift = !state.bottomNavigationShift;
            localStorage.setItem('layout_settings_bottomNavigationShift', state.bottomNavigationShift);
        }
    }
}
