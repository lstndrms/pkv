<template>
    <div class="auth-form-container">
        <form @submit.prevent class="auth-form">
            <h5 style="align-self: center;">Регистрация</h5>
            <p class="input-container">
                <span class="input-title">ФИО (полностью)</span>
                <input type="text" class="input-field" placeholder="Иванов Иван Иванович" v-model="state.form.fio">
                <small class="error-line" v-if="v$.form.fio.$error">Введите ФИО</small>
            </p>
            <p class="input-container">
                <span class="input-title">Дата рождения</span>
                <input type="date" class="input-field" v-model="state.form.date_of_birth_unformatted">
                <small class="error-line" v-if="v$.form.date_of_birth_unformatted.$error">Введите дату</small>
            </p>
            <p class="input-container">
                <span class="input-title">Адрес эл.почты</span>
                <input type="text" class="input-field" placeholder="example@example.com" v-model="state.form.email">
                <small class="error-line" v-if="v$.form.email.$error">Введите корректный адрес</small>
            </p>
            <p class="input-container">
                <span class="input-title">Пол</span>
                <span class="radio"><input type="radio" v-model="state.form.gender" v-bind:value="'male'">Мужской</span>
                <span class="radio"><input type="radio" v-model="state.form.gender" v-bind:value="'female'">Женский</span>
                <small class="error-line" v-if="v$.form.gender.$error">Введите корректный адрес</small>
            </p>
            <p class="input-container">
                <span class="input-title">Контактный телефон</span>
                <input type="text" class="input-field" placeholder="89161234567" v-model="state.form.phone_number" maxlength="11">
                <small class="error-line" v-if="v$.form.phone_number.$error">Введите номер</small>
            </p>
            <p class="input-container">
                <span class="input-title">Моб. телефон законного представителя</span>
                <input type="text" class="input-field" placeholder="89161234567" v-model="state.form.parent_phone_number" maxlength="11">
                <small class="error-line" v-if="v$.form.parent_phone_number.$error">Введите номер</small>
            </p>
            <p>
                <span class="input-title">Номер и/или название нынешней школы</span>
                <input type="text" class="input-field" placeholder="Школа №1" v-model="state.form.current_school">
                <small class="error-line" v-if="v$.form.current_school.$error">Введите номер</small>
            </p>
            <p class="input-container">
                <span class="input-title">Класс, в который поступаете</span>
                <span class="radio"><input type="radio" v-model="state.form.education_year" v-bind:value="9">9</span>
                <span class="radio"><input type="radio" v-model="state.form.education_year" v-bind:value="10">10</span>
                <small class="error-line" v-if="v$.form.education_year.$error">Введите корректный адрес</small>
            </p>
            <p>
                <span class="input-title">Пароль</span>
                <input type="password" class="input-field" v-model="state.form.password">
                <small class="error-line" v-if="v$.form.password.$error">Пароль не менее 6 символов</small>
            </p>
            <p class="input-container">
                <span class="input-title">Повторите пароль</span>
                <input type="password" class="input-field" v-model="state.form.confirm">
                <small class="error-line" v-if="v$.form.confirm.$error">Пароли не совпадают</small>
            </p>
            <button @click="submitForm" class="form-button">Зарегистрироваться</button> 
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import useValidate from '@vuelidate/core'
import { email, required, minLength, sameAs} from '@vuelidate/validators'
import { computed, reactive } from 'vue'


export default {
    setup() {
        const state = reactive({
            form: {
                email: '',
                password: '',
                fio: '',
                date_of_birth_unformatted: '',
                date_of_birth: '',
                gender: '1',
                phone_number: '',
                parent_phone_number: '',
                current_school: '',
                education_year: 10,
                confirm: ''
            }
        })
        const rules = computed(() => {
            return {
                form: {
                    email: {required, email},
                    password: {required, minLength: minLength(6)},
                    fio: {required},
                    date_of_birth_unformatted: {required},
                    gender: {required},
                    phone_number: {required},
                    current_school: {required},
                    education_year: {required},
                    parent_phone_number: {required},
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
        clearPassword() {
            this.state.form.password = ''
        },
        parseDate() {
            const dob = new Date(this.state.form.date_of_birth_unformatted)
            const RuDate = Intl.DateTimeFormat('ru')

            return RuDate.format(dob)
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
            this.state.form.date_of_birth = this.parseDate()
            if(isFormCorrect) {
                await axios.post('http://localhost:5000/auth/sign-up', this.state.form)
                .then((res) => {
                    console.log(res)
                    this.$router.push('/profile')
                })
                .catch((e)=> {
                    this.showError(e.response.data.message)
                });
            }else {
                 console.log(this.v$.$errors)
            }
        }
    },

}
</script>

<style scoped>
.auth-form-container {
    padding-top: 20px;
    padding-bottom: 20px;
    width: 100%;
    background-color: #F1F1F1;
    border-radius: 10px;
    padding-left: 10%;
    padding-right: 10%;
}

.auth-form {
    display: flex;
    flex-direction: column;
}

.form-button {
    width: 50%;
    border: none;
    background-color: #D9D9D9;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 20px;
    align-self: center;
}
.error-line {
    padding: 0;
    margin: 0;
}
.input-field {
    width: 100%;
    border: none;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    border-radius: 7px;
}
.radio {
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    border-radius: 7px;
}

.input-title {
    display: block;
    width: 100%;
    padding-left: 5%;
}

</style>