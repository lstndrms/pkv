<template>
    <div class="container">
        <div class="row">
            <TopBar/>
        </div>
    </div>
</template>

<script>
import TopBar from '@/components/UI/TopBar.vue'
import axios from 'axios'
export default {
    components: {
        TopBar,

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
            console.log(res)
        })
        .catch((e)=> {
            if(e.response.status == 401) {
                this.$router.push('/login')
            }
        });
        
    }
    //*/
}



</script>

<style>
</style>