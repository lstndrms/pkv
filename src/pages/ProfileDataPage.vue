<template>
    <TopBar/>
    <div class="container">
        <div class="row">
            <ProfileTable/>
        </div>
    </div>
    <UploadScreenshot/>
    <BottomBar/>
</template>
<script>
import TopBar from '@/components/UI/TopBar.vue'
import ProfileTable from '@/pages/ProfileTable.vue'
import BottomBar from '@/components/UI/BottomBar.vue'
import UploadScreenshot from '@/components/UploadScreenshot.vue'
export default {
    components: {
        TopBar,
        ProfileTable,
        BottomBar,
        UploadScreenshot
    }
}

</script>
<style scoped></style>