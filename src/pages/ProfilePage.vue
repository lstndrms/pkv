<template>
    <TopBar/>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-lg-6">
                <div class="profile" v-if="this.$store.getters.USER.role === 'user'">
                    <h2>{{ this.$store.getters.USER.fio }}</h2>
                    <div class="status_block">
                        <p style="color: #0043A8">Код участника: {{ this.$store.getters.USER.id }}</p>
                        <p style="color: #00A743">Текущий статус: {{ this.$store.getters.USER_STATUS.name }}</p>
                    </div>
                    <div class="tools-block" v-if="this.$store.getters.USER.is_activated">
                        <router-link to="/profile/data" class="tool-button">Личные данные</router-link>
                        <router-link to="/profile/results" class="tool-button">Тестирования и результаты</router-link>
                    </div>
                    <div class="tools-block" v-else>
                        <span style="color: #F59797">Аккаунт не активирован</span>
                        <button class="tool-button" @click="sendActivation">Отправить письмо активации</button>
                    </div>
                </div>
                <div class="profile" v-else-if="this.$store.getters.USER.role === 'admin'">
                    <h2>{{ this.$store.getters.USER.fio }}</h2>
                    <div class="status_block">
                        <p style="color: #0043A8">Роль: администратор</p>
                    </div>
                    <div class="tools-block">
                        <router-link to="/login" class="tool-button" hidden>Настройки портала</router-link>
                        <router-link to="/profile/users" class="tool-button">Список пользователей</router-link>
                        <router-link to="/tds" class="tool-button">Тестирования</router-link>
                        <router-link to="/register" class="tool-button" hidden>Прием документов</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <BottomBar/>
    <vue-basic-alert 
       :duration="300"
       :closeIn="3000"
       ref="alert" />
       <vue-basic-alert 
       :duration="300"
       ref="alert_succ" />
</template>

<script>
import TopBar from '@/components/UI/TopBar.vue'
import BottomBar from '@/components/UI/BottomBar.vue'
import axios from 'axios'
export default {
    components: {
        TopBar,
        BottomBar,
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
        showSucc(succMsg) {
            this.$refs.alert_succ.showAlert(
                'success', // There are 4 types of alert: success, info, warning, error
                succMsg, // Message of the alert
                'Ура', // Header of the alert
                { iconSize: 35, // Size of the icon (px)
                iconType: 'solid', // Icon styles: now only 2 styles 'solid' and 'regular'
                position: 'top right' } // Position of the alert 'top right', 'top left', 'bottom left', 'bottom right'
          )
        },
        async sendActivation() {
            let config = {
                headers: {
                    authorization: 'Bearer ' + this.$store.getters.TOKEN
                }
            }
            await axios.post('user/resendActivation', {}, config)
            .then((res) => {
                if (res.status) {
                    this.showSucc("Письмо успешно выслано, ожидайте")
                }
            })
            .catch((e) => {
                this.showError(e.response.data.message)
            })
        }
    },
    ///*
    async mounted() {
        const l_t = localStorage.getItem("token")
        if (l_t === null) {
            this.$router.push('/login')
        } else {
            await this.$store.dispatch('setToken', l_t)
        }

        let config = {
            headers: {
                authorization: 'Bearer ' + this.$store.getters.TOKEN
            }
        }
        await axios.get('user/me', config)
        .then((res) => {
            if(res.status === 200) {
                this.$store.dispatch('setUser', res.data)
            }
        })
        .catch((e)=> {
            if(e.response.status == 401) {
                this.$router.push('/login')
            } else {
                console.log('serverError')
            }
        });
    }
    //*/
}



</script>

<style scoped>

.profile {
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    margin-bottom: 100px;
    background-color: rgba(255, 255, 255, 1);
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .2));
    border-radius: 20px;
    padding: 50px;
}

.status_block {
    margin-top: 30px;
}
.tools-block {
    display: flex;
    flex-direction: column;
}
.tool-button {

    border: none;
    background-color: #B7C4D9;
    border-radius: 10px;
    max-width: 300px; 
    padding: 10px;
    text-align: center;
    margin-top: 20px;
    color: black;
    text-decoration: none;
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .2));
}
.tool-button:hover {
    text-decoration: underline;
}
</style>