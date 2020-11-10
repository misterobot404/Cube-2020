<template>
    <v-dialog
        :value="true"
        persistent
        hide-overlay
        max-width="460"
    >
        <!-- Dialog -->
        <v-card>
            <!-- Header -->
            <v-toolbar
                height="68"
                flat
                class="pr-1"
            >
                <v-icon
                    class="mr-2"
                >
                    login
                </v-icon>
                <v-toolbar-title> Авторизация</v-toolbar-title>
            </v-toolbar>
            <v-divider/>
            <!-- Body -->
            <v-card-text class="pb-0">
                <v-alert
                    :value="showError"
                    class="mt-4 mb-0"
                    border="left"
                    transition="scale-transition"
                    colored-border
                    type="error"
                    elevation="2"
                >
                    <h4>Не удаётся войти.</h4>
                    <span>Пожалуйста, проверьте правильность ввода почты и пароля.</span>
                </v-alert>
                <v-form ref="form">
                    <v-container class="pb-0">
                        <v-row>
                            <v-col cols="12" class="pb-0 pt-3">
                                <v-text-field v-model="email"
                                              :rules="rules.email"
                                              label="Эл. почта"
                                              autocomplete="email"
                                              prepend-icon="mail"
                                              required/>
                            </v-col>
                            <v-col cols="12" class="pb-0 pt-3">
                                <v-text-field v-model="password"
                                              label="Пароль"
                                              :type="passwordShow ? 'text' : 'password'"
                                              :append-icon="passwordShow ? 'visibility_off' : 'visibility'"
                                              @click:append="passwordShow = !passwordShow"
                                              autocomplete="current-password"
                                              prepend-icon="lock"
                                              hint="Пароль должен содержать не менее 6 символов."
                                              required/>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <!-- Footer -->
            <v-card-actions class="px-9 pb-4">
                <v-spacer/>
                <v-btn
                    color="primary"
                    class="px-7"
                    outlined
                    rounded
                    :loading="authProcess"
                    @click="auth"
                >
                    Войти
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            showError: false,
            passwordShow: false,
            valid: false,
            authProcess: false,
            rules: {
                email: [
                    v => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return !v || pattern.test(v) || 'Введите корректный адрес электронной почты.'
                    }
                ]
            }
        }
    },
    computed: {
        filled() {
            return this.email.length !== 0 && this.password.length !== 0
        }
    },
    methods: {
        ...mapActions('auth', {
            authAction: 'login'
        }),
        auth() {
            this.showError = false;
            this.authProcess = true;
            this.authAction({
                email: this.email,
                password: this.password
            })
                .then(() => {
                    this.$router.push(this.$route.query.redirect || '/')
                })
                .catch(() => {
                    this.showError = true;
                })
                .finally(() => {
                    this.authProcess = false;
                });
        }
    }
}
</script>



