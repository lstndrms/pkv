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
            <div class="col-lg-4 offset-lg-4 col-sm-8 offset-sm-2">
                <AuthForm/>
            </div>
        </div>
    </div>
    
</template>

<script>
import AuthForm from '@/components/AuthForm.vue';
import LogoBlock from '@/components/UI/LogoBlock.vue';

export default {
    name: 'AuthPage', 
    components: {
        AuthForm,
        LogoBlock
    }
}
</script>

<style scoped>
</style>