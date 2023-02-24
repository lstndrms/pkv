<template>
    <TopBar/>
    <div class="container">
        <div class="row">
            
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
        await axios.get('http://localhost:5000/user/me', config)
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
    background-color: #D9D9D9;
    border-radius: 10px;
    max-width: 300px; 
    padding: 10px;
    text-align: center;
    margin-top: 20px;
    color: black;
    text-decoration: none;
}
.tool-button:hover {
    text-decoration: underline;
}
</style>