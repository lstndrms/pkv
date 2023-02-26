<template>
    <div class="w-12 mt-4 mx-auto" style="margin-bottom: 100px;" v-if="this.$store.getters.USER_STATUS.id === 1">
        <div class="flex align-items-center justify-content-between">
            <span class="text-xl font-bold ml-6">Поступление без тестирования</span>
        </div>
        <p class="flex align-items-center justify-content-between">
            Для поступления по результатам олимпиад, по результатам вступительных в лицей НИУ ВШЭ (прикрепляются после публикации проходного балла на сайте Лицея и Школы),
             по результатам написания работ МЦКО, прикрепите подтверждащий документ ниже.
        </p>
        <form @sumbit.prevent class="screen-form">
            <p><input type="radio" v-model="way" v-bind:value="1" class="radio-input">По результатам вступительных в лицей НИУ ВШЭ</p>
            <p><input type="radio" v-model="way" v-bind:value="2" class="radio-input">По результатам олимпиад и конкурсов</p>
            <p><input type="radio" v-model="way" v-bind:value="3" class="radio-input">По результатам конкурса на квотное место для учеников ПК</p>
            <p><input type="radio" v-model="way" v-bind:value="4" class="radio-input">По результатам написания работ МЦКО</p>
            <p><input type="radio" v-model="way" v-bind:value="5" class="radio-input">Другое</p>
        </form>
        <FileUpload  name="demo[]" :customUpload="true" @uploader="myUploader" :multiple="false" :fileLimit="1" accept="image/*" :maxFileSize="1000000">
            <template #empty>
                <p>Drag and drop files to here to upload.</p>
            </template>
        </FileUpload>
        
    </div>
    <div class="w-12 mt-4 mx-auto" style="margin-bottom: 100px;" v-else-if="this.$store.getters.USER_STATUS.id === 3">
        <div class="flex align-items-center justify-content-between">
            <span class="text-xl font-bold ml-6">Вы успешно прикрепили скриншот</span>
        </div>
    </div>
</template>

<script>
import FileUpload from 'primevue/fileupload';
import axios from 'axios';
export default {
    name: "UploadScreenshot", 
    components: {
        FileUpload
    },
    data() {
        return {
            way: 0
        }
    },
    methods: {
        showError(errMsg) {
        this.$refs.alert.showAlert(
                'error', // There are 4 types of alert: success, info, warning, error
                errMsg, // Message of the alert
                'Ошибка', // Header of the alert
                { iconSize: 35, // Size of the icon (px)
                iconType: 'solid', // Icon styles: now only 2 styles 'solid' and 'regular'
                position: 'top right' } // Position of the alert 'top right', 'top left', 'bottom left', 'bottom right'
            )
        },
        async myUploader(event) {
            let config = {
                headers: {
                    authorization: 'Bearer ' + this.$store.getters.TOKEN
                }
            }
            //event.files == files to upload
            var formData = new FormData();
            formData.append("file", event.files[0]);
            await axios.post('http://localhost:5000/user/uploadScreenshot', formData ,config)
            .catch((e) => {
                this.showError(e.response.data.message)
            })
        }
    }
}
</script>

<style scoped>
.screen-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 2rem;
}
.screen-form p input {
    margin-right: 1rem;
}
</style>