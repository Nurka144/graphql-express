<template>
    <div>
        <b-container>
            <b-row>
                <div style="display: flex; justify-content: center; align-items: center; height: 100vh; width: 100%;">
                    <b-form @submit.prevent>
                        <b-form-group id="input-group-1" label="Login:" label-for="input-1">
                            <b-form-input id="input-1" v-model="form.login" type="text" placeholder="Enter login" required>
                            </b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
                            <b-form-input id="input-2" type="password" v-model="form.password" placeholder="Enter password" required></b-form-input>
                        </b-form-group>

                        <div style="display: flex; justify-content: space-around;">
                            <b-button @click="onLogin" variant="primary">Войти</b-button>
                            <b-button @click="onRegister" variant="danger">Регистрация</b-button>
                        </div>
                    </b-form>
                </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    login: '',
                    password: ''
                }
            }
        },
        methods: {
            onLogin() {
                 this.$apollo.mutate({
                    mutation: require('../graphql/user/loginUser.gql'),
                    variables: {login: this.form.login, password: this.form.password}
                })
                .then(data => {
                    let dataLogin = {
                        login: this.form.login,
                        token: data.data.login.token
                    }
                    this.$store.commit('login', dataLogin)
                    this.$router.push({ path: '/' });
                })
                .catch(error => {
                    alert(error.message)
                })
            },
            onRegister() {
                this.$apollo.mutate({
                    mutation: require('../graphql/user/createUser.gql'),
                    variables: {login: this.form.login, password: this.form.password}
                })
                .then(data => {
                    alert(data.data.createUser._id)
                })
                .catch(error => {
                    alert(error.message)
                })
                
            }
        }
    }
</script>