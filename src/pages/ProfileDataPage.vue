<template>
    <TopBar/>
    <div class="container">
        <div class="row">
            <ProfileTable/>
        </div>
    </div>
    <BottomBar/>
</template>
<script>
import TopBar from '@/components/UI/TopBar.vue'
import ProfileTable from '@/pages/ProfileTable.vue'
import BottomBar from '@/components/UI/BottomBar.vue'

export default {
    components: {
        TopBar,
        ProfileTable,
        BottomBar
    }
}

</script>
<style scoped></style>