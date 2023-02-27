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
            <div class="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
                <RegisterForm/>
            </div>
        </div>
    </div>
    
</template>

<script>
import LogoBlock from '@/components/UI/LogoBlock.vue';
import RegisterForm from '@/components/RegisterForm.vue';
export default {
    name: 'RegisterPage',
    components: {
        LogoBlock,
        RegisterForm
    }
}
</script>

<style scoped>

</style>