<template>
    <v-row class="chat-app">
        <v-col class="col-sm-12 col-12">
            <v-card class="d-flex flex-row v-sheet">
                <v-navigation-drawer
                    :mini-variant="$vuetify.breakpoint.xsOnly"
                    mini-variant-width="80"
                    class="flex-shrink-0"
                    floating
                    permanent
                >
                    <!-- Search -->
                    <div class="px-3 border-bottom">
                        <v-text-field v-model="search" placeholder="Поиск" class="mt-0" append-icon="search"/>
                    </div>
                    <!-- List -->
                    <v-list nav class="pb-0">
                        <v-list-item-group v-model="selectedDialog">
                            <!-- Links 1 -->
                            <v-list-item
                                v-for="(user, index) in users"
                                v-show="(user.name.indexOf(search) >= 0 || search === '') && login_user.email !== user.email"
                                :key="index"
                                :color="$vuetify.theme.dark ? null : 'primary'"
                                class="mb-1"
                            >
                                <v-list-item-avatar class="mr-3">
                                    <v-img :src="user.avatar"/>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title><h5>{{ user.name }}</h5><span class="caption">
                                        {{ user.role === "admin" ? 'Администратор' : 'Оператор' }}
                                    </span></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                        <v-list-item>
                            <StaffCreateDialog/>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>
                <div class="chat-right-part">
                    <div class="chat-topbar d-flex px-3 py-3 align-center">
                        <div>
                            <button type="button"
                                    class="v-app-bar__nav-icon d-block d-lg-none mr-2 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--default"><span
                                class="v-btn__content"><i aria-hidden="true" class="v-icon notranslate mdi mdi-menu theme--light"></i></span></button>
                        </div>
                        <div class="v-avatar mr-3" style="height: 42px; min-width: 42px; width: 42px;"><img
                            :src="users[selectedDialog].avatar" width="37" :alt="users[selectedDialog].avatar"></div>
                        <div class="user-about"><h4 v-text="users[selectedDialog].name"/></div>
                    </div>
                    <div>
                        <div class="chat-room px-3 py-3">
                            <div
                                v-for="(item, index) in users[selectedDialog].chat"
                                :key="index"
                                class="d-flex align-center mb-3 messageItem"
                                :class="item.why === 'right' ? 'fromMe' : null"
                            >
                                <div class="thumb">
                                    <div class="v-avatar mx-2" style="height: 37px; min-width: 37px; width: 37px;"><img
                                        :src="item.avatar" alt="..."></div>
                                </div>
                                <span class="v-chip v-chip--no-color theme--light v-size--default">
                                    <span class="v-chip__content">
                                    {{ item.massage }}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="pa-3 border-top">
                        <v-row no-gutters class="justify-center align-center">
                            <v-text-field
                                v-model="msg"
                                @keyup.enter="submit"
                                placeholder="Введите сообщение..."
                            />
                            <v-btn large icon class="ml-1" @click="submit">
                                <v-icon>
                                    send
                                </v-icon>
                            </v-btn>
                        </v-row>
                    </div>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import {mapState, mapActions} from "vuex";
import StaffCreateDialog from "../components/StaffCreateDialog";

export default {
    name: "Staff",
    components: {
        StaffCreateDialog
    },
    data: () => ({
        selectedDialog: 0,
        search: "",
        msg: "",
    }),
    computed: {
        ...mapState({
            login_user: state => state.auth.user,
            users: state => state.auth.users,
        })
    },
    methods: {
        ...mapActions('auth', ["getUsers"]),
        submit() {
            this.users[this.selectedDialog].chat.push({why: "left", massage: this.msg, avatar: this.login_user.avatar});
            this.msg = "";
            setTimeout(() => this.users[this.selectedDialog].chat.push({why: "left", massage: "Спасибо!", avatar: this.users[this.selectedDialog].avatar}), 800)
        }
    },
    created() {
        this.getUsers()
    }
}
</script>

<style scoped>
.chat-app {
    overflow: hidden;
}

.border-bottom {
    border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.hightauto {
    min-height: calc(100vh - 360px);
}

.chat-app .chat-right-part {
    width: 100%;
    border-left: 1px solid rgba(0, 0, 0, .1);
}

.chat-app .chat-right-part .chat-topbar {
    border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.chat-app .chat-room .fromMe {
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse;
}

.v-application.theme--light .border-top {
    border-top: 1px solid rgba(0, 0, 0, .1);
}

.chat-app .chat-room {
    min-height: calc(100vh - 385px);
}
</style>



