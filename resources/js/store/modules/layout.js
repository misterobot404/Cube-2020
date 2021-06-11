export default {
    namespaced: true,
    state: {
        showLayout: true,
        settingsDialog: false,
        navigationDrawerDynamic: localStorage.getItem('layout_navigationDrawerDynamic') === "true",
        bottomNavigationShift: localStorage.getItem('layout_bottomNavigationShift') === "true",
        // msg
        showMessage: false,
        messageText: "",
        messageType: ""
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
            localStorage.setItem('layout_navigationDrawerDynamic', state.navigationDrawerDynamic);
        },
        TOGGLE_BOTTOM_NAVIGATION_SHIFT: (state) => {
            state.bottomNavigationShift = !state.bottomNavigationShift;
            localStorage.setItem('layout_bottomNavigationShift', state.bottomNavigationShift);
        },
        TOGGLE_SHOW_MESSAGE: (state, {type, text}) => {
            if (type && text) {
                state.messageType = type;
                state.messageText = text;
            }
            state.showMessage = !state.showMessage;
        },
    }
}
