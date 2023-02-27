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
                    <div class="tools-block">
                        <router-link to="/profile/data" class="tool-button">Личные данные</router-link>
                        <router-link to="/profile/results" class="tool-button">Тестирования и результаты</router-link>
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