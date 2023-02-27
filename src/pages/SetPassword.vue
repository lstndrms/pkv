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
                        <h6>Введите новый пароль</h6>
                        <p>
                            <input type="password" class="input" placeholder="" v-model="state.form.password"><br>
                            <small class="error-line" v-if="v$.form.password.$error">Пароль не менее 6 символов</small>
                        </p>
                        <h6>Повторите пароль</h6>
                        <p>
                            <input type="password" class="input" placeholder="" v-model="state.form.confirm"><br>
                            <small class="error-line" v-if="v$.form.confirm.$error">Пароли не совпадают</small>
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
import { required, minLength, sameAs } from '@vuelidate/validators'
import { computed, reactive } from 'vue'
import LogoBlock from '@/components/UI/LogoBlock.vue'

export default {
    name: 'SetPassword', 
    components: {
        LogoBlock
    },
    setup() {
        const state = reactive({
            form: {
                password: '',
                confirm: ''
            }
        })
        const rules = computed(() => {
            return {
                form: {
                    password: {required, minLength: minLength(6)},
                    confirm: {required, sameAs: sameAs(state.form.password)}
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
        showSucc() {
            this.$refs.alert_succ.showAlert(
                'success', // There are 4 types of alert: success, info, warning, error
                'Пароль изменен', // Message of the alert
                'Ура', // Header of the alert
                { iconSize: 35, // Size of the icon (px)
                iconType: 'solid', // Icon styles: now only 2 styles 'solid' and 'regular'
                position: 'top right' } // Position of the alert 'top right', 'top left', 'bottom left', 'bottom right'
          )
        },
        async submitForm() {
            const isFormCorrect = await this.v$.$validate()
            if(isFormCorrect) {
                let body = {
                    password: this.state.form.password
                }
                let token = this.$route.params.token
                
                await axios.post('auth/confirmRecover/' + token, body)
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
<style scoped>
.form-button {
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .2));
}
</style>