<template>
    <TopBar/>
    <div class="container">
        <div class="row">
            <TestDates/>
        </div>
    </div>
    <BottomBar/>
</template>
<script>
import TopBar from '@/components/UI/TopBar.vue'
import TestDates from '@/pages/TestDates.vue'
import BottomBar from '@/components/UI/BottomBar.vue'

export default {
    components: {
        TopBar,
        TestDates,
        BottomBar
    }
}
</script>
<style scoped></style>