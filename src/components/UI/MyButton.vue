<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'my-button'
    }
</script>

<style scoped>
.btn {
    border: none;
    background-color: #D9D9D9;
    border-radius: 10px;
}
</style>

