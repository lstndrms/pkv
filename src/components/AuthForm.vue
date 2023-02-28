<template>
    <div class="auth-form">
        <form @submit.prevent>
            <h5>Авторизация</h5>
            <p>
                <input type="text" class="input" placeholder="email" v-model="state.form.email"><br>
                <small class="error-line" v-if="v$.form.email.$error">Введите корректный адрес</small>
            </p>
            <p>
                <input type="password" class="input" placeholder="пароль" v-model="state.form.password"><br>
                <small class="error-line" v-if="v$.form.password.$error">Минимальная длина пароля 6 символов</small>
            </p>
            <p class="checkbox-box" hidden>
                <input type="checkbox">Запомнить меня
            </p>
            <button @click="submitForm" class="form-button">Войти</button> 
        </form>
        <p><router-link style="color: black;" to="/password_recover">Восстановить пароль</router-link></p>
        <p><router-link style="color: black;" to="/register">Нет аккаунта? Зарегистрироваться</router-link></p>
    </div>
    <vue-basic-alert 
       :duration="300"
       :closeIn="3000"
       ref="alert" />
</template>

<script>
import axios from 'axios'
import useValidate from '@vuelidate/core'
import { email, required, minLength} from '@vuelidate/validators'
import { computed, reactive } from 'vue'

export default {
    setup() {
        const state = reactive({
            form: {
                email: '',
                password: ''
            }
        })
        const rules = computed(() => {
            return {
                form: {
                    email: {required, email},
                    password: {required, minLength: minLength(6)}
                }
            }
        })

        const v$ = useValidate(rules, state)

        return {
            state,
            v$
        }
    },
    methods: {
        clearPassword() {
            this.state.form.password = ''
        },
        showError(errMsg) {
            this.$refs.alert.showAlert(
                'error', // There are 4 types of alert: success, info, warning, error
                errMsg, // Message of the alert
                'Ошибка', // Header of the alert
                { iconSize: 35, // Size of the icon (px)
                iconType: 'solid', // Icon styles: now only 2 styles 'solid' and 'regular'
                position: 'top right' } // Position of the alert 'top right', 'top left', 'bottom left', 'bottom right'
          )
          this.clearPassword()
        },
        async submitForm() {
            const isFormCorrect = await this.v$.$validate()
            if(isFormCorrect) {
                
                await axios.post('/auth/sign-in', this.state.form)
                .then(async (res) => {
                    localStorage.setItem('token', res.data.auth_token);
                    await this.$store.dispatch('setToken', res.data.auth_token)
                    this.$router.push('/profile')
                })
                .catch((e)=> {
                    this.showError(e.response.data.message)
                });
            }
        }
    },

}
</script>

<style scoped>
.auth-form {
    padding-top: 20px;
    padding-bottom: 20px;
    width: 100%;
    text-align: center;
    background-color: rgba(255, 255, 255, 1);
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .2));
    border-radius: 20px;
}

.form-button {
    width: 50%;
    border: none;
    background-color: #B7C4D9;
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .2));
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 20px;
}
.error-line {
    padding: 0;
    margin: 0;
}
.input {
    width: 80%;
    border: 1px solid #B7C4D9;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    border-radius: 7px;
}
.checkbox-box {
    text-align: left;
    padding-left: 11%;
}
.checkbox-box input {
    margin-right: 10px;
}



</style>