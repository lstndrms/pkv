<template>

<div id="content" class="w-12 mt-4 mx-auto" style="margin-bottom: 100px;">
    <div id="my-tds" class="flex align-items-center justify-content-between" style="margin-bottom: 20px;margin-top: 30px;">
      <span class="text-xl font-bold ml-6">Персональные данные</span>
    </div>
    <DataTable :value="tdData" show-gridlines responsiveLayout="scroll" :row-class="rowClass">
      <Column class="w-50" field="column1"></Column>
      <Column class="w-50" field="column2" ></Column>
    </DataTable>

    <div v-if="this.$store.getters.USER.role !== 'admin'">

        <div id="my-tds" class="flex align-items-center justify-content-between" style="margin-bottom: 20px;margin-top: 30px;">
            <span class="text-xl font-bold ml-6">Поступление</span>
        </div>
        
        <div class="flex flex-column">
            <div class="flex">
      <div class="col-6 p-2 custom-border">{{ asData[0].column1 }}</div>
      <div class="col-6 p-2 custom-border">{{ asData[0].column2 }}</div>
    </div>
    <!-- Row 2 -->
    <div class="flex">
      <div class="col-6 p-2 custom-border">{{ asData[1].column1 }}</div>
      <div class="col-6 p-2 custom-border">{{ asData[1].column2 }}</div>
    </div>
      <!-- Row 1 -->
      <div class="flex">
        <div class="col-6 p-2 custom-border">{{ asData[2].column1 }}</div>
        <div class="col-6 p-2 custom-border">
          <PrimeSelect
            v-model="asData[2].column2"
            :options="profileOptionsList"
            optionLabel="label"
            optionValue="value"
            placeholder="Выберите первый профиль"
            @change="handleFirstPrimaryChange();editing = true"
            style="max-width: 100%;"
          />
        </div>
      </div>
      <!-- Row 2 -->
      <div class="flex">
        <div class="col-6 p-2 custom-border">{{ asData[3].column1 }}</div>
        <div class="col-6 p-2 custom-border">
          <PrimeSelect
            v-model="asData[3].column2"
            :options="subject1OptionsList"
            :disabled="isPrimaryEmpty(1)"
            optionLabel="label"
            optionValue="value"
            placeholder="Выберите профильный предмет"
            @change="editing = true"
            style="max-width: 100%;"
          />
        </div>
      </div>
      <!-- Row 3 -->
      <div class="flex">
        <div class="col-6 p-2 custom-border">{{ asData[4].column1 }}</div>
        <div class="col-6 p-2 custom-border">
          <PrimeSelect
            v-model="asData[4].column2"
            :options="profileOptionsList.filter((e) => (e.value !== asData[2].column2))"
            :disabled="isPrimaryEmpty(1) || isSubjectEmpty(1)"
            optionLabel="label"
            optionValue="value"
            placeholder="Выберите второй профиль"
            @change="updateSubjectList(2);editing = true"
            style="max-width: 100%;"
          />
        </div>
      </div>
      <!-- Row 4 -->
      <div class="flex">
        <div class="col-6 p-2 custom-border">{{ asData[5].column1 }}</div>
        <div class="col-6 p-2 custom-border">
          <PrimeSelect
            v-model="asData[5].column2"
            :options="subject2OptionsList.filter((e) => (e.name !== asData[3].column2))"
            :disabled="isPrimaryEmpty(2)"
            optionLabel="label"
            optionValue="value"
            placeholder="Выберите профильный предмет"
            @change="editing = true"
            style="max-width: 100%;"
          />
        </div>
      </div>
      <!-- Row 5 -->
      <div class="flex">
        <div class="col-6 p-2 custom-border">{{ asData[6].column1 }}</div>
        <div class="col-6 p-2 custom-border">
          <PrimeSelect
            v-model="asData[6].column2"
            :options="languageOptions"
            optionLabel="label"
            optionValue="value"
            placeholder="Выберите иностранный язык"
            @change="editing = true"
            style="max-width: 100%;"
          />
        </div>
      </div>
    </div>
  
        
        <!--
        <DataTable :row-class="rowClass" :value="asData"  show-gridlines editMode="cell" @cell-edit-complete="onCellEditComplete" class="editable-cells-table" responsiveLayout="scroll">
            <Column class="w-50" field="column1"></Column>
            <Column class="w-50" field="column2">
                <template #body="{data, field}">
                    {{ data[field] }}
                </template>
                <template v-if="editing" #editor="{ data, field, index }">

                    <span v-if="data['column1'] === 'Год обучения'">
                        {{ data[field] }}
                    </span>
                    <span v-else-if="data['column1'] === 'Статус'" style="max-width: 100%;">
                        {{ data[field] }}
                    </span>
                
                    <InputText v-else v-model="data[field]" autofocus fluid/>
                
                
                    <PrimeSelect v-else-if="data['column1'] === 'Профиль 1'" v-model="asData[index].column2" :options="profileOptionsList" optionLabel="label" optionValue="value" placeholder="Выберите первый профиль" style="max-width: 100%;" fluid />
                    <PrimeSelect v-else-if="data['column1'] === 'Профильный предмет 1'" v-model="data[field]" :options="subject1OptionsList" :disabled="isPrimaryEmpty(1)" optionLabel="label" optionValue="value" placeholder="Выберите профильный предмет" style="max-width: 100%;"/>
                    <PrimeSelect v-else-if="data['column1'] === 'Профиль 2'" v-model="data[field]" :options="profileOptionsList" :disabled="isPrimaryEmpty(1) || isSubjectEmpty(1)" optionLabel="label" optionValue="value" placeholder="Выберите второй профиль" style="max-width: 100%;"/>
                    <PrimeSelect v-else-if="data['column1'] === 'Профильный предмет 2'" v-model="data[field]" :options="subject2OptionsList" :disabled="isPrimaryEmpty(2)" optionLabel="label" optionValue="value" placeholder="Выберите профильный предмет" style="max-width: 100%;"/>
                    
                <PrimeSelect v-else v-model="data[field]" :options="langList" optionLabel="label" optionValue="value" placeholder="Выберите иностранный язык" style="max-width: 100%;"/>
                </template>

            </Column>
        </DataTable>
        -->
    </div>
    

    <div v-if="editing" id="my-tds" class="flex align-items-center justify-content-end" style="margin-bottom: 20px;margin-top: 50px;">
        <my-button @click="submitChanges">Сохранить</my-button>
    </div>
    <!--<div v-else id="my-tds" class="flex align-items-center justify-content-end" style="margin-bottom: 20px;margin-top: 50px;">
        <my-button @click="editMode">Редактировать</my-button>
    </div>-->
</div>
    <vue-basic-alert
       :duration="300"
       :closeIn="3000"
       ref="alert" />
</template>

<script>

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import MyButton from '@/components/UI/MyButton.vue'
import axios from 'axios'
export default {
name: "ProfileTable",
components: {
    DataTable,
    Column,
    MyButton
},
data() {
    return {
        editing: false,
        tdData: [
        {'column1': 'Код участника', 'column2': 'Не выбрано'},
        {'column1': 'Роль', 'column2': 'Не выбрано'},
        {'column1': 'ФИО', 'column2': 'Не выбрано'},
        {'column1': 'Дата рождения', 'column2': 'Не выбрано'},
        {'column1': 'Пол', 'column2': 'Не выбрано'},
        {'column1': 'Адрес эл.почты', 'column2': 'Не выбрано'},
        {'column1': 'Контакный телефон', 'column2': 'Не выбрано'},
        {'column1': 'Номер законного представителя', 'column2': 'Не выбрано'},
        {'column1': 'Номер и/или название нынешней школы', 'column2': 'Не выбрано'}
        ],
        asData: [
            {'column1': 'Год обучения', 'column2': 'Не выбрано'},          //0
            {'column1': 'Статус', 'column2': 'Не выбрано'},                //1
            {'column1': 'Профиль 1', 'column2': 'Не выбрано'},             //2
            {'column1': 'Профильный предмет 1', 'column2': 'Не выбрано'},  //3
            {'column1': 'Профиль 2', 'column2': 'Не выбрано'},             //4
            {'column1': 'Профильный предмет 2', 'column2': 'Не выбрано'},  //5
            {'column1': 'Иностранный язык', 'column2': 'Не выбрано'}       //6
        ],
        getListProfileResponse: [],
        profileOptionsList: [],
        subjectsSet: [],
        subject1OptionsList: [],
        subject2OptionsList: [],
        subjectMap: new Map([]),
        languagesList: [],
        languageOptions: []
    }
},
methods: {
    rowClass() {
      return 'grey'
    },
    onCellEditComplete(event) {
        let { data, newValue, field } = event;
        data[field] = newValue
        console.log(data, data[field], newValue)
    },
    isPrimaryEmpty(profileIndex) {
        if(profileIndex === 1) {
            if (this.asData[2].column2 === 'Не выбрано') { return true }
            else { return false }
        } else {
            if (this.asData[4].column2 === 'Не выбрано') { return true }
            else { return false }
        }
    },
    isSubjectEmpty(profileIndex){
        if (profileIndex === 1) {
            if (this.asData[3].column2 === 'Не выбрано') { return true }
            else { return false }
        }
    },
    async getListProfile() {
        let config = {
            headers: {
                authorization: 'Bearer ' + this.$store.getters.TOKEN
            }
        }
        let ans = {}
        await axios.get('profiles/list', config)
        .then((res) => {
            if (res.status === 200) {
                ans = res.data
            } else {
                console.log('serverError')
            }
        })
        .catch((e) => {
            this.showError(e.response.data.message)
        })
        return ans
    },
    async getListSubject(p_id) {
        let config = {
            headers: {
                authorization: 'Bearer ' + this.$store.getters.TOKEN
            }
        }
        let body = {
            "profile_id": p_id
        }
        let ans = {}
        await axios.post('subjects/list', body, config)
        .then((res) => {
            if (res.status === 200) {
                ans = res.data
            } else {
                console.log('serverError')
            }
        })
        .catch((e) => {
            this.showError(e.response.data.message)
        })
        return ans
    },
    async getListLang() {
        let config = {
            headers: {
                authorization: 'Bearer ' + this.$store.getters.TOKEN
            }
        }
        let ans = {}
        await axios.get('fl/list', config)
        .then((res) => {
            if (res.status === 200) {
                ans = res.data
            } else {
                console.log('serverError')
            }
        })
        .catch((e) => {
            this.showError(e.response.data.message)
        })
        return ans
    },
    async createSubjectMap() {
        let response = await this.getListProfile()
        response.forEach(element => {
            if (element.education_year === this.asData[0].column2) {//education year
                let _ = []
                element.subjects.forEach(e => {
                    _.push({label: e.name, value: e.name})
                    this.subjectsSet.push(e)
                })
                this.subjectMap.set(element.name, _)
                this.profileOptionsList.push({label: element.name, value: element.name})
            }
        });
        this.getListProfileResponse = response
    },
    async getLanguageOptions() {
        this.languagesList = await this.getListLang()
        this.languagesList.forEach((e) => {
            this.languageOptions.push({label: e.name, value: e.name})
        })
    },
    getFirstProfile() {
        return this.asData[2].column2
    },
    getSecondProfile() {
        return this.asData[4].column2
    },
    preloadSubjectLists() {
        if (this.getFirstProfile() !== 'Не выбрано') {
            console.log(this.subjectMap.get(this.getFirstProfile()))
            this.subject1OptionsList = this.subjectMap.get(this.getFirstProfile())
        }
        if (this.getSecondProfile() !== 'Не выбрано') {
            console.log(this.subjectMap.get(this.getSecondProfile()))
            this.subject2OptionsList = this.subjectMap.get(this.getSecondProfile())
        }
    },
    async fetchData() {
        const u_id = this.$store.getters.USER.id
        const u_role = this.$store.getters.USER.role
        const u_fio = this.$store.getters.USER.fio
        const u_bday = this.$store.getters.USER.date_of_birth
        const u_gender = this.$store.getters.USER.gender
        const u_email = this.$store.getters.USER.email
        const u_phone_1 = this.$store.getters.USER.phone_number
        const u_phone_2 = this.$store.getters.USER.parent_phone_number
        const u_current_school = this.$store.getters.USER.current_school

        const u_yod = this.$store.getters.USER.education_year
        const u_status = this.$store.getters.USER_STATUS.name
        const u_profile1 = this.$store.getters.USER_FIRST_PROFILE
        const u_profile2 = this.$store.getters.USER_SECOND_PROFILE
        const u_subject1 = this.$store.getters.USER_FIRST_SUBJECT
        const u_subject2 = this.$store.getters.USER_SECOND_SUBJECT
        const u_lang = this.$store.getters.USER_FOREIGN_LANGUAGE

        if (u_id !== 0) {
            this.tdData[0].column2 = u_id
        }
        if (u_role !== '') {
            this.tdData[1].column2 = (u_role === 'admin' ? 'Администратор' : 'Абитуриент')
        }
        if (u_fio !== '') {
            this.tdData[2].column2 = u_fio
        }
        if (u_bday !== '') {
            this.tdData[3].column2 = u_bday
        }
        if (u_gender !== '') {
            this.tdData[4].column2 = (u_gender === 'male' ? 'Мужской' : 'Женский')
        }
        if (u_email !== '') {
            this.tdData[5].column2 = u_email
        }
        if (u_phone_1 !== '') {
            this.tdData[6].column2 = u_phone_1
        }
        if (u_phone_2 !== '') {
            this.tdData[7].column2 = u_phone_2
        }
        if (u_current_school !== '') {
            this.tdData[8].column2 = u_current_school
        }
        if (u_yod !== 0) {
            this.asData[0].column2 = u_yod
        }
        if (u_status.id !== '') {
            this.asData[1].column2 = u_status
        }
        if (u_profile1.id !== 0) {
            this.asData[2].column2 = u_profile1.name
        }
        if (u_subject1.id !== 0) {
            this.asData[3].column2 = u_subject1.name
        }
        if (u_profile2.id !== 0) {
            this.asData[4].column2 = u_profile2.name
        }
        if (u_subject2.id !== 0) {
            this.asData[5].column2 = u_subject2.name
        }
        if (u_lang.id !== 0) {
            this.asData[6].column2 = u_lang.name
        }
    },
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
    handleFirstPrimaryChange() {
        if (this.getSecondProfile() === this.getFirstProfile()) {
            this.asData[3].column2 = 'Не выбрано'
            this.asData[4].column2 = 'Не выбрано'
            this.asData[5].column2 = 'Не выбрано'
        }
        this.updateSubjectList(1)
    },
    updateSubjectList(index) {
        if (index === 1) this.subject1OptionsList = this.subjectMap.get(this.getFirstProfile())
        else this.subject2OptionsList = this.subjectMap.get(this.getSecondProfile())
    },
    editMode() {
        this.editing = true
    },
    async submitChanges() {
        let no_err = true

        let config = {
            headers: {
                authorization: 'Bearer ' + this.$store.getters.TOKEN
            }
        }
        
        if (this.asData[2].column2 === this.asData[4].column2 && this.asData[2].column2 !== 'Не выбрано') {
            this.showError("Пожалуйста, выберите 2 разных профиля!")
            
        } else if ((this.asData[3].column2 === 'Не выбрано' && this.asData[5].column2 === 'Не выбрано') && 
                    (this.asData[2].column2 === this.asData[4].column2 === 'Не выбрано')) {
            this.showError("Пожалуйста, заполните хотя бы 1 профиль!")
        } else if((this.asData[2].column2 !== 'Не выбрано' && this.asData[3].column2 === 'Не выбрано') ||
                (this.asData[4].column2 !== 'Не выбрано' && this.asData[5].column2 === 'Не выбрано')) {
            this.showError("Пожалуйста, выберите профильный предмет!")
        } else {
            let new_lang_id = 0

            let body1 = {
                "first_profile_id": 0,
                "second_profile_id": 0
            }
            let body2 = {
                "first_subject_id": 0,
                "second_subject_id": 0,
            }

            if(this.asData[2].column2 !== 'Не выбрано') {
                body1.first_profile_id = this.getListProfileResponse.filter((e) => (e.name === this.asData[2].column2))[0].id
            if(this.asData[4].column2 !== 'Не выбрано') {
                body1.second_profile_id = this.getListProfileResponse.filter((e) => (e.name === this.asData[4].column2))[0].id
            }
            if(this.asData[3].column2 !== 'Не выбрано') {
                body2.first_subject_id = this.subjectsSet.filter((e) => (e.name === this.asData[3].column2))[0].id
            }
            if(this.asData[5].column2 !== 'Не выбрано') {
                body2.second_subject_id = this.subjectsSet.filter((e) => (e.name === this.asData[5].column2))[0].id
            }
            if (this.asData[6].column2 !== 'Не выбрано') {
                new_lang_id = this.languagesList.filter((e) => (e.name === this.asData[6].column2))[0].id
            }

            await axios.post('profiles/setToMe', body1, config)
            .then(() => {
            })
            .catch((e) => {
                this.showError(e.response.data.message);
                no_err = false
            })
            await axios.post('subjects/setToMe', body2, config)
            .then(() => {
            })
            .catch((e) => {
                this.showError(e.response.data.message);
                no_err = false
            })
            await axios.post('fl/setToMe/' + new_lang_id, {}, config)
            .then(() => {
                })
                .catch((e) => {
                    this.showError(e.response.data.message);
                    no_err = false
                })
            }
        }
        if (no_err) {
            this.$router.go()
        }
    }
},
async mounted() {
    const l_t = localStorage.getItem("token")
    if (l_t === null) {
        this.$router.push('/login')
    } else {
        await this.$store.dispatch('setToken', l_t)
    }

    let config = {
        headers: {
            authorization: 'Bearer ' + this.$store.getters.TOKEN
    }
    }

    await axios.get('user/me', config)
        .then((res) => {
        if(res.status === 200) {
            this.$store.dispatch('setUser', res.data)
        }
        })
        .catch((e)=> {
        if(e.response.status == 401) {
            this.$router.push('/login')
        } else {
            console.log('serverError')
        }
    });
    await this.fetchData()
    await this.createSubjectMap()
    await this.getLanguageOptions()
    this.preloadSubjectLists()
    console.log(this.asData)
},
}
</script>

<style scoped>
::v-deep(.grey) {
    background-color: #F8F9FA !important;
}
::v-deep(thead) {
    display: none;
}

.custom-border {
    border: 1px solid #e2e8f0;
    background-color: #F8F9FA;
}

</style>