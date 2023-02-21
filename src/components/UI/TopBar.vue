<template>
    <div class="top-bar">TOPBAR
        <my-button @click="$router.push('/')">title</my-button>
    </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
export default {
    components: {
        MyButton
    }
}
</script>

<style scoped>
.top-bar {
    align-items: right;
}
</style>