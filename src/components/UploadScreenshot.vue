<template>
    <div class="w-12 mt-4 mx-auto blck-cont" style="margin-bottom: 50px;" v-if="this.$store.getters.USER.role !== 'admin'">
        <div class="flex align-items-center justify-content-between ">
            <span class="text-xl font-bold ml-6">Поступление без тестирования</span>
        </div>
        <p class="flex align-items-center justify-content-between">
            Для поступления по результатам олимпиад, по результатам вступительных в лицей НИУ ВШЭ (прикрепляются после публикации проходного балла на сайте Лицея и Школы),
             по результатам написания работ МЦКО, прикрепите подтверждащий документ ниже.
        </p>
        <form @sumbit.prevent class="screen-form">
            <p><input type="radio" v-model="way" v-bind:value="'lyceum'" class="radio-input">По результатам вступительных в лицей НИУ ВШЭ</p>
            <p><input type="radio" v-model="way" v-bind:value="'olympiad'" class="radio-input">По результатам олимпиад и конкурсов</p>
            <p><input type="radio" v-model="way" v-bind:value="'MCKO'" class="radio-input">По результатам конкурса на квотное место для учеников ПК</p>
            <p><input type="radio" v-model="way" v-bind:value="'quota'" class="radio-input">По результатам написания работ МЦКО</p>
        </form>
        <FileUpload v-if="this.way !== ''" chooseLabel="Выбрать" uploadLabel='Загрузить' 
        cancelLabel='Отмена' name="demo[]" :customUpload="true" 
        @uploader="myUploader" :multiple="false" :fileLimit="1" accept="image/*, application/pdf" :maxFileSize="5000000"
        invalidFileSizeMessage="{0}: Размер файла не должен превышать {1}."
        invalidFileLimitMessage="Можно загрузить не более {0} файла."
        invalidFileTypeMessage="{0}: Неверный формат файла, допустимые расширения: {1}">
            <template #empty>
                <p>Прикрепите документ</p>
            </template>
        </FileUpload>
        
    </div>
    <div class="w-12 mt-4 mx-auto blck-cont" style="margin-bottom: 100px;" v-if="this.$store.getters.USER_SCREENSHOT.file_name !== ''">
        <div class="flex align-items-center justify-content-between" style="margin-bottom: 10px;">
            <span class="text-xl font-bold ml-6">Вы успешно прикрепили документ</span>
        </div>
        <div class="flex align-items-center justify-flex-start" style="margin-bottom: 10px;margin-left: 40px;">
            {{ this.screenshot_type_mapped[this.$store.getters.USER_SCREENSHOT.screenshot_type] }}
            <span class="sh-title" @click="downloadScreenshot">
                 {{ this.$store.getters.USER_SCREENSHOT.file_name}}
            </span>
        </div>
        
    </div>
    <vue-basic-alert
       :duration="300"
       :closeIn="3000"
       ref="alert" />
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
            way: '',
            screenshot_type_mapped: {
                'lyceum': 'По результатам вступительных в лицей НИУ ВШЭ',
                'olympiad': 'По результатам олимпиад и конкурсов',
                'MCKO': 'По результатам написания работ МЦКО',
                'quota': 'По результатам конкурса на квотное место для учеников ПК'
            },
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
            formData.append("type", this.way)
            await axios.post('user/uploadScreenshot', formData ,config)
            .catch((e) => {
                this.showError(e.response.data.message)
            })
            this.$router.go()
        },
        async downloadScreenshot() {
            let config = {
                headers: {
                    authorization: 'Bearer ' + this.$store.getters.TOKEN
                }
            }
            await axios.get('user/downloadMyScreenshot', config)
            .then((response) => {
                var a = document.createElement("a"); //Create <a>
                a.href = "data:" + response.data.content_type + ";base64," + response.data.file_content; //Image Base64 Goes here
                a.download = response.data.file_name; //File name Here
                a.click();
            })
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

.sh-title {
    text-decoration: underline;
    color: blue;
    margin-left: 1rem
}
.sh-title:hover {
    cursor: pointer;
}
.blck-cont {
    background-color: rgba(255, 255, 255, 1);
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .2));
    border-radius: 20px;
    padding: 20px;
}
::v-deep(.p-button) {
    background-color: #EFBFBE;
}
::v-deep(.p-button:hover) {
    background-color: #F59797;
}
</style>