<template>
    <v-row class="chat-app">
        <div class="col-sm-12 col-12 pt-0">
            <v-card class="d-flex flex-row v-sheet" light>
                <aside v-show="$vuetify.breakpoint.smAndUp" class="flex-shrink-0 v-navigation-drawer v-navigation-drawer--open" left="" data-booted="true"
                       style="height: 100%; top: 0px; transform: translateX(0%); width: 256px;">
                    <div class="v-navigation-drawer__content">
                        <div class="px-3 border-bottom">
                            <div class="v-input mb-0 mt-0 theme--light v-text-field v-text-field--is-booted v-text-field--placeholder">
                                <div class="v-input__control">
                                    <div class="v-input__slot">
                                        <div class="v-text-field__slot"><input id="input-280" placeholder="Поиск контакта" type="text"></div>
                                    </div>
                                    <div class="v-text-field__details">
                                        <div class="v-messages theme--light">
                                            <div class="v-messages__wrapper"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div role="list" class="v-list hightauto v-sheet theme--light v-list--nav">
                            <div tabindex="0" role="listitem" class="v-list-item v-list-item--link theme--light s">
                                <div class="v-avatar mr-3" style="height: 42px; min-width: 42px; width: 42px;"><img
                                    src="/images/chat/1.8cccc71b.jpg" alt="1.jpg"></div>
                                <div class="v-list-item__content">
                                    <div class="v-list-item__title"><h5>Александр Рудейко</h5><span class="caption">Hey! What's up? So many times since we</span>
                                    </div>
                                </div>
                            </div>
                            <div tabindex="0" role="listitem" class="v-list-item v-list-item--link theme--light s">
                                <div class="v-avatar mr-3" style="height: 42px; min-width: 42px; width: 42px;"><img
                                    src="/images/chat/2.92fb17ec.jpg" alt="2.jpg"></div>
                                <div class="v-list-item__content">
                                    <div class="v-list-item__title"><h5>Георгий Тимофеев</h5><span class="caption">Good news coming tonight. Seems they agreed to proceed</span>
                                    </div>
                                </div>
                            </div>
                            <div tabindex="0" role="listitem" class="v-list-item v-list-item--link theme--light s">
                                <div class="v-avatar mr-3" style="height: 42px; min-width: 42px; width: 42px;"><img
                                    src="/images/chat/3.78962450.jpg" alt="3.jpg"></div>
                                <div class="v-list-item__content">
                                    <div class="v-list-item__title"><h5>Елизавета Павлюк</h5><span class="caption">Check out my latest email plz!</span></div>
                                </div>
                            </div>
                            <div tabindex="0" role="listitem" class="v-list-item v-list-item--link theme--light s">
                                <div class="v-avatar mr-3" style="height: 42px; min-width: 42px; width: 42px;"><img
                                    src="/images/chat/4.7eef6399.jpg" alt="4.jpg"></div>
                                <div class="v-list-item__content">
                                    <div class="v-list-item__title"><h5>Герман Солошин</h5><span class="caption">What about summer break?</span></div>
                                </div>
                            </div>
                            <div tabindex="0" role="listitem" class="v-list-item v-list-item--link theme--light s">
                                <div class="v-avatar mr-3" style="height: 42px; min-width: 42px; width: 42px;"><img
                                    src="/images/chat/5.764ff046.jpg" alt="5.jpg"></div>
                                <div class="v-list-item__content">
                                    <div class="v-list-item__title"><h5>Максим Желтов</h5><span class="caption">Just ain't sure about the weekend now. 90% I'll make it.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="v-navigation-drawer__border"></div>
                </aside>
                <div class="chat-right-part">
                    <div class="chat-topbar d-flex px-3 py-3 align-center">
                        <div>
                            <button type="button"
                                    class="v-app-bar__nav-icon d-block d-lg-none mr-2 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--default"><span
                                class="v-btn__content"><i aria-hidden="true" class="v-icon notranslate mdi mdi-menu theme--light"></i></span></button>
                        </div>
                        <div class="v-avatar mr-3" style="height: 42px; min-width: 42px; width: 42px;"><img
                            src="/images/chat/1.8cccc71b.jpg" width="37"></div>
                        <div class="user-about"><h4>Александр Рудейко</h4></div>
                    </div>
                    <div>
                        <div class="chat-room px-3 py-3">
                            <div
                                v-for="(item, index) in chat"
                                :key="index"
                                class="d-flex align-center mb-3 messageItem"
                                :class="item.why === 'right' ? 'fromMe' : null"
                            >
                                <div class="thumb">
                                    <div class="v-avatar mx-2" style="height: 37px; min-width: 37px; width: 37px;"><img
                                        :src="item.img" alt="..."></div>
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
                        <div class="v-input v-textarea theme--light v-text-field v-text-field--is-booted v-text-field--placeholder">
                            <div class="v-input__control">
                                <div class="v-input__slot">
                                    <div class="v-text-field__slot"><input v-model=msg
                                                                           @keyup.enter="submit"
                                                                           name="input-4-1"
                                                                           id="input-305"
                                                                           placeholder="Type and hit Enter"/>
                                    </div>
                                    <v-btn icon class="ml-1" @click="submit">
                                        <v-icon>
                                            send
                                        </v-icon>
                                    </v-btn>
                                </div>
                                <div class="v-text-field__details">
                                    <div class="v-messages theme--light">
                                        <div class="v-messages__wrapper"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </v-card>
        </div>
    </v-row>
</template>

<script>
export default {
    name: "Chat",
    data: () => ({
        msg: "",
        chat: [
            {why: "left", massage: "Привет! Как дела?", img: "/images/chat/1.8cccc71b.jpg"},
            {why: "left", massage: "Это тестовый чат.", img: "/images/chat/1.8cccc71b.jpg"},
            {why: "left", massage: "Напиши мне что-то.", img: "/images/chat/1.8cccc71b.jpg"},
            {why: "right", massage: "Сейчас попробую ...", img: "/images/avatars/admin.jpg"},
        ],
    }),
    methods: {
        submit() {
            this.chat.push({why: "right", massage: this.msg, img: "/images/avatars/admin.jpg"});
            this.msg = "";
            setTimeout(()=> this.chat.push({why: "left", massage: "Спасибо!", img: "/images/chat/1.8cccc71b.jpg"}), 800)
        }
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



