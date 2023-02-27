<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3">
                <LogoBlock/>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-lg-4 offset-lg-4 col-sm-8 offset-sm-2">
                <div class="auth-form">
                    <form @submit.prevent>
                        <h5>Восстановление пароля</h5>
                        <h6>Мы вышлем вам ссылку для восстановления на указанный адрес</h6>
                        <p>
                            <input type="text" class="input" placeholder="email" v-model="state.form.email"><br>
                            <small class="error-line" v-if="v$.form.email.$error">Введите корректный адрес</small>
                        </p>
                        <button @click="submitForm" class="form-button">Отправить</button> 
                    </form>
                </div>
            </div>
        </div>
    </div>
    <vue-basic-alert 
       :duration="300"
       :closeIn="3000"
       ref="alert" />
       <vue-basic-alert 
       :duration="300"
       ref="alert_succ" />
</template>

<script>
import axios from 'axios'
import useValidate from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { computed, reactive } from 'vue'
import LogoBlock from '@/components/UI/LogoBlock.vue'

export default {
    name: 'RecoverPage', 
    components: {
        LogoBlock
    },
    setup() {
        const state = reactive({
            form: {
                email: ''
            }
        })
        const rules = computed(() => {
            return {
                form: {
                    email: {required, email},
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
        showError(errMsg) {
            this.$refs.alert.showAlert(
                'error', // There are 4 types of alert: success, info, warning, error
                errMsg, // Message of the alert
                'Ошибка', // Header of the alert
                { iconSize: 35, // Size of the icon (px)
                iconType: 'solid', // Icon styles: now only 2 styles 'solid' and 'regular'
                position: 'top right' } // Position of the alert 'top right', 'top left', 'bottom left', 'bottom right'
          )
        },
        clearEmail() {
            this.state.form.email = '';
        },
        showSucc() {
            this.$refs.alert_succ.showAlert(
                'success', // There are 4 types of alert: success, info, warning, error
                'Письмо выслано, ожидайте', // Message of the alert
                'Ура', // Header of the alert
                { iconSize: 35, // Size of the icon (px)
                iconType: 'solid', // Icon styles: now only 2 styles 'solid' and 'regular'
                position: 'top right' } // Position of the alert 'top right', 'top left', 'bottom left', 'bottom right'
          )
        },
        async submitForm() {
            const isFormCorrect = await this.v$.$validate()
            if(isFormCorrect) {
                
                await axios.post('auth/recover/' + this.state.form.email)
                //eslint-disable-next-line
                .then(async (res) => {
                    this.showSucc();
                    await new Promise(r => setTimeout(r, 2000));
                    this.$router.push('/login')
                })
                .catch((e)=> {
                    this.showError(e.response.data.message)
                });
            }
        }
    }
}
</script>

<style>
.auth-form {
    padding-top: 20px;
    padding-bottom: 20px;
    width: 100%;
    text-align: center;
    background-color: #F1F1F1;
    border-radius: 10px;
}

.form-button {
    width: 50%;
    border: none;
    background-color: #D9D9D9;
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
    border: none;
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