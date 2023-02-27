<template>
    <div class="top-bgc">
        <div class="container">
            <div class="row">
                <div class="top-bar">
                    <div class="top-block left" @click="this.$router.push('/profile')">
                        <img src="@/assets/logo2.svg" alt="" class="top-logo">
                    </div>
                    <div class="top-block right">
                        <div style="display: flex;align-items: center;">
                            <i class="pi pi-user md:text-2xl sm:text-xl"></i>
                            <span style="text-decoration: underline;margin-left: 0.5rem;font-size: 1.2rem;margin-right: 3rem"><router-link to="/profile" style="color: black">{{ this.$store.getters.USER.short_fio }}</router-link></span>
                        </div>
                        <my-button style="background-color: #fff;" @click="logout">Выйти из системы</my-button>
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
    max-height: 57px;
}
.top-block {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.left {
    width: 66%;
    justify-content: flex-start;
    cursor: pointer;
}
.right {
    width: 33%;
    justify-content: flex-end;
}
.top-bgc {
    background-color: #D2DBE8;
    padding-bottom: 1rem;
    padding-top: 1rem;
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .2));
}
</style>