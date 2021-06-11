<template>
    <v-dialog
        v-model="dialog"
        max-width="420px"
        overlay-opacity="0.2"
    >
        <template v-slot:activator="{ on }">
            <v-btn block depressed v-on="on">
                <v-icon style="opacity: 0.68">
                    person_add
                </v-icon>
            </v-btn>
        </template>
        <v-card>
            <!-- Header -->
            <v-toolbar
                height="68"
                flat
                class="pr-1"
            >
                <v-icon
                    class="mr-3"
                >
                    person_add
                </v-icon>
                <v-toolbar-title>Добавление пользователя</v-toolbar-title>
            </v-toolbar>
            <v-divider/>
            <v-card-text class="px-6 pb-0">
                <v-form ref="form" v-model="valid">
                    <v-row>
                        <v-col cols="12" class="pb-0 pt-4">
                            <v-alert
                                :value="showMessage"
                                transition="scale-transition"
                                outlined
                                text
                                type="success"
                            >
                                Пользователь успешно добавлен
                            </v-alert>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="name"
                                          :rules="rules.name"
                                          label="Имя пользователя"
                                          autocomplete="name"
                                          prepend-icon="person"
                                          hint="Под этим именем вас будут знать другие пользователи."
                                          required/>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="email"
                                          :rules="rules.email"
                                          label="Эл. почта"
                                          autocomplete="email"
                                          prepend-icon="mail"
                                          hint="Этот адрес электронной почты нужно будет подтвердить."
                                          required/>
                        </v-col>
                        <v-col cols="12">
                            <v-select
                                v-model="role"
                                :items="['Оператор', 'Администратор']"
                                label="Роль"
                                prepend-icon="admin_panel_settings"
                                hint="Это поле определяет права пользователя."
                                required/>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="password"
                                          label="Пароль"
                                          :type="passwordShow ? 'text' : 'password'"
                                          :append-icon="passwordShow ? 'visibility_off' : 'visibility'"
                                          @click:append="passwordShow = !passwordShow"
                                          autocomplete="new-password"
                                          prepend-icon="lock"
                                          :rules="rules.password"
                                          hint="Пароль должен содержать не менее 6 символов."
                                          required/>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="passwordConfirm"
                                          label="Подтвердите пароль"
                                          :type="passwordConfirmShow ? 'text' : 'password'"
                                          :append-icon="passwordConfirmShow ? 'visibility_off' : 'visibility'"
                                          @click:append="passwordConfirmShow = !passwordConfirmShow"
                                          prepend-icon="lock"
                                          :rules="rules.passwordConfirm"
                                          required/>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions class="px-6 pb-6 justify-center">
                <v-btn color="primary"
                       outlined
                       class="px-5"
                       :loading="registrationProcess"
                       :disabled="!valid || !filled"
                       @click="registration()">Добавить
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import store from '@/store'
import {mapState} from 'vuex'

export default {
    name: "StaffCreateDialog",
    data() {
        return {
            dialog: false,
            valid: false,
            loading: false,
            showMessage: false,

            name: null,
            email: null,
            role: null,
            password: null,
            passwordConfirm: null,
            passwordShow: false,
            passwordConfirmShow: false,
            registrationProcess: false,

            rules: {
                name: [
                    v => !v || RegExp('^[A-Za-zА-Яа-я0-9]+( [A-Za-zА-Яа-я0-9]+)*$').test(v) || 'Имя пользователя должно содержать только буквы и цифры.',
                    v => !v || v.length >= 4 && v.length <= 30 || 'Имя пользователя должно содержать от 4 до 30 символов.',
                ],
                email: [
                    v => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return !v || pattern.test(v) || 'Введите действующий адрес электронной почты.'
                    },
                ],
                password: [v => !v || v.length >= 6 || 'Пароль должен содержать от 6 символов.'],
                passwordConfirm: [v => !v || v === this.password || 'Пароли не совпадают. Повторите попытку.']
            }
        }
    },
    computed: {
        ...mapState('auth',["users"]),
        filled: function () {
            return this.name && this.email && this.password && this.passwordConfirm && this.role
        }
    },
    watch: {
        dialog(val) {
            if (!val) this.clearField()
        }
    },
    methods: {
        registration() {
            this.showMessage = false;

            const payload = {
                name: this.name,
                email: this.email,
                role: this.role === 'Администратор' ? 'admin' : 'user',
                password: this.password
            };

            this.registrationProcess = true;
            this.$store.dispatch('auth/register', payload)
                .then(() => {
                    this.showMessage = true;
                    this.registrationProcess = false;
                })
                .catch(() => {
                    this.registrationProcess = false;
                })
        },
        clearField() {
            this.$refs.form.reset();
            this.showMessage = false
        },
    }
}
</script>
