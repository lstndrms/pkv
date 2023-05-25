<template>
    <TopBar/>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-lg-6">
                <div  v-if="this.$store.getters.USER.role === 'user'">
                    <div class="profile">
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
                    <div class="tests" v-if="this.showTests">
                        <h2>Тестирования</h2>
                        <div class="test-dates-container" v-for="test of this.tests" :key="test">
                            <!---->
                            <DataTable :value="test" show-gridlines responsiveLayout="scroll" :row-class="rowClass">
                            <Column class="w-50" field="column1"></Column>
                            <Column class="w-50" field="column2" ></Column>
                            </DataTable><!---->
                        </div>
                    </div>
                </div>
                <div v-else-if="this.$store.getters.USER.role === 'admin'">
                    <div class="profile" >
                        <h2>{{ this.$store.getters.USER.fio }}</h2>
                        <div class="status_block">
                            <p style="color: #0043A8">Роль: администратор</p>
                        </div>
                        <div class="tools-block">
                            <router-link to="/login" class="tool-button" hidden>Настройки портала</router-link>
                            <router-link to="/profile/users" class="tool-button">Список пользователей</router-link>
                            <router-link to="/tds" class="tool-button">Тестирования</router-link>
                            <router-link to="/notification" class="tool-button">Создать рассылку</router-link>
                            <router-link to="/register" class="tool-button" hidden>Прием документов</router-link>
                        </div>
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
    data() {
        return {
            tests: [
                [
                    {'column1': 'Дата', 'column2': 'Не выбрано'},
                    {'column1': 'Время', 'column2': 'Не выбрано'},
                    {'column1': 'Место проведения', 'column2': 'Не выбрано'},
                ]
            ],
            userData: {},
            showTests: false
        }
    },  
    methods: {
        rowClass() {
        return 'grey'
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
        },
        async setToken() {
            const token = localStorage.getItem("token")
            if (token === null) {
                this.$router.push('/login')
            } else {
                await this.$store.dispatch('setToken', token)
                this.config = {headers: {authorization: 'Bearer ' + token}}
            }
        },
        async checkUser() {
            let ans = {}
            await axios.get('user/me', this.config)
                .then((res) => {
                if(res.status === 200) {
                    ans = res.data
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
            return ans
        },
        async fetchData() {
            let uData = this.userData
            const u_td = uData.test_dates
            if (u_td.length !== 0) {
                this.showTests = true
                this.tests.pop()
                u_td.forEach((val) => {
                    this.tests.push(
                        [
                            {'column1': 'Дата', 'column2': val.date},
                            {'column1': 'Время', 'column2': val.time},
                            {'column1': 'Место проведения', 'column2': val.location},
                        ]
                    )
                })
            }
            console.log(this.userData)
        },
    },
    async mounted() {
        await this.setToken()
        this.userData = await this.checkUser()

        if (this.userRole === 'admin') {
        await axios.post('td/list',{}, this.config)
            .then((res) => {
                this.adminTdData = res.data
            })
            .catch((e) => {
                this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
            })
        }
        await this.fetchData()
        console.log(this.tdData)
    },
    //*/
}



</script>

<style scoped>

.profile {
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    margin-bottom: 40px;
    background-color: rgba(255, 255, 255, 1);
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .2));
    border-radius: 20px;
    padding: 50px;
}
.tests {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
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
::v-deep(.grey) {
    background-color: #F8F9FA !important;
  }
  ::v-deep(thead) {
    display: none;
  }
  .test-dates-container {
    margin-bottom: 30px;
}
</style>