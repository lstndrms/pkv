<template>
    <div class="top-bgc">
        <div class="container">
            <div class="row">
                <div class="top-bar">
                    <div class="top-block left">
                        <img src="@/assets/logo.png" alt="" class="top-logo">
                        <strong>ГБОУ Школа "Покровский квартал"</strong>
                    </div>
                    <div class="top-block right">
                        <div>
                            <i class="pi pi-user md:text-2xl sm:text-xl"></i>
                            <span style="text-decoration: underline;margin-left: 1rem;">{{ this.$store.getters.USER.short_fio }}</span>
                        </div>
                        <my-button @click="logout">Выйти из системы</my-button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
export default {
    components: {
        MyButton
    },
    methods: {
        logout() {
            this.$store.dispatch('removeToken')
            localStorage.removeItem('token');
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
.top-bar {
    
    display: flex;
    justify-content: space-between;
    
}
.top-logo {
    
    height: auto;
    width: auto;
    max-width: 50px;
}
.top-block {
    font-size: 1.5em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.left {
    width: 66%;
    justify-content: flex-start;
}
.right {
    width: 33%;
    justify-content: space-between;
}
.top-bgc {
    background-color: #F1F1F1;
    padding-bottom: 1%;
    padding-top: 1%;
}
</style>