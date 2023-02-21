<template>
    <div class="container">
        <div class="row">
            <TopBar/>
        </div>
    </div>
</template>

<script>
import TopBar from '@/components/UI/TopBar.vue'
//import axios from 'axios'
export default {
    components: {
        TopBar,

    },
    /*
    async mounted() {
        
        await axios.get('http://localhost:5000/user/me')
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