<template>

<div id="content" class="w-12 mt-4 mx-auto" style="margin-bottom: 100px;">
    <div id="my-tds" class="flex align-items-center justify-content-between" style="margin-bottom: 20px;margin-top: 100px;">
      <span class="text-xl font-bold ml-6">Персональные данные</span>
    </div>
    <DataTable :value="tdData" show-gridlines responsiveLayout="scroll" :row-class="rowClass">
      <Column class="w-50" field="column1"></Column>
      <Column class="w-50" field="column2" ></Column>
    </DataTable>
    <div id="my-tds" class="flex align-items-center justify-content-between" style="margin-bottom: 20px;margin-top: 100px;">
      <span class="text-xl font-bold ml-6">Поступление</span>
    </div>


    <DataTable :row-class="rowClass" show-gridlines :value="yData" editMode="row" dataKey="id" v-model:editingRows="editingRowsYear" @row-edit-save="onRowEditSaveYear" responsiveLayout="scroll" scroll-direction="horizontal">
        <Column field="column1" style="width: 30%">
        </Column>
        <Column field="eduYear" :style="{width: (this.$store.getters.USER.role === 'admin' ? ('60%') : ('70%'))}">
            <template #editor="{ data, field }">
                <DropDown v-model="data[field]" :options="eduYears" optionLabel="label" optionValue="value" placeholder="Выберите класс">
                </DropDown>
            </template>
        </Column>
        <Column v-if="this.$store.getters.USER.role === 'admin'" :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
    </DataTable>

    <DataTable :row-class="rowClass" show-gridlines :value="stData" editMode="row" dataKey="id" v-model:editingRows="editingRowsStatus" @row-edit-save="onRowEditSaveStatus" responsiveLayout="scroll" scroll-direction="horizontal">
        <Column field="column1" style="width: 30%">
        </Column>
        <Column field="status" :style="{width: (this.$store.getters.USER.role === 'admin' ? ('60%') : ('70%'))}">
            <template #editor="{ data, field }">
                <DropDown v-model="data[field]" :options="statusList" optionLabel="label" optionValue="value" placeholder="Выберите статус" style="max-width: 100%;">
                </DropDown>
            </template>
        </Column>
        <Column v-if="this.$store.getters.USER.role === 'admin'" :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
    </DataTable>

    <DataTable :row-class="rowClass" show-gridlines :value="pf1Data" editMode="row" dataKey="id" v-model:editingRows="editingRowsProfile1" @row-edit-save="onRowEditSaveProfile1" responsiveLayout="scroll" scroll-direction="horizontal">
        <Column field="column1" style="width: 30%">
        </Column>
        <Column field="profile1" :style="{width: '60%'}">
            <template #editor="{ data, field }">
                <DropDown v-model="data[field]" :options="profileList" optionLabel="label" optionValue="value" placeholder="Выберите первый профиль" style="max-width: 100%;">
                </DropDown>
            </template>
        </Column>
        <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
    </DataTable>
    

    <DataTable :row-class="rowClass" show-gridlines :value="sub1Data" editMode="row" dataKey="id" v-model:editingRows="editingRowsSubject1" @row-edit-save="onRowEditSaveSubject1" responsiveLayout="scroll" scroll-direction="horizontal">
        <Column field="column1" style="width: 30%">
        </Column>
        <Column field="subject1" :style="{width: '60%'}">
            <template #editor="{ data, field }">
                <DropDown v-model="data[field]" :options="sub1List" optionLabel="label" optionValue="value" placeholder="Выберите профильный предмет" style="max-width: 100%;">
                </DropDown>
            </template>
        </Column>
        <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
    </DataTable>


    <DataTable :row-class="rowClass" show-gridlines :value="pf2Data" editMode="row" dataKey="id" v-model:editingRows="editingRowsProfile2" @row-edit-save="onRowEditSaveProfile2" responsiveLayout="scroll" scroll-direction="horizontal">
        <Column field="column1" style="width: 30%">
        </Column>
        <Column field="profile2" :style="{width: '60%'}">
            <template #editor="{ data, field }">
                <DropDown v-model="data[field]" :options="profileList" optionLabel="label" optionValue="value" placeholder="Выберите второй профиль" style="max-width: 100%;">
                </DropDown>
            </template>
        </Column>
        <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
    </DataTable>

    <DataTable :row-class="rowClass" show-gridlines :value="sub2Data" editMode="row" dataKey="id" v-model:editingRows="editingRowsSubject2" @row-edit-save="onRowEditSaveSubject2" responsiveLayout="scroll" scroll-direction="horizontal">
        <Column field="column1" style="width: 30%">
        </Column>
        <Column field="subject2" :style="{width: '60%'}">
            <template #editor="{ data, field }">
                <DropDown v-model="data[field]" :options="sub2List" optionLabel="label" optionValue="value" placeholder="Выберите профильный предмет" style="max-width: 100%;">
                </DropDown>
            </template>
        </Column>
        <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
    </DataTable>

    <DataTable :row-class="rowClass" show-gridlines :value="langData" editMode="row" dataKey="id" v-model:editingRows="editingRowsLang" @row-edit-save="onRowEditSaveLang" responsiveLayout="scroll" scroll-direction="horizontal">
        <Column field="column1" style="width: 30%">
        </Column>
        <Column field="lang" :style="{width: '60%'}">
            <template #editor="{ data, field }">
                <DropDown v-model="data[field]" :options="langList" optionLabel="label" optionValue="value" placeholder="Выберите иностранный язык" style="max-width: 100%;">
                </DropDown>
            </template>
        </Column>
        <Column :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
    </DataTable>

    <div v-if="changed" id="my-tds" class="flex align-items-center justify-content-end" style="margin-bottom: 20px;margin-top: 50px;">
        <my-button @click="submitChanges">Сохранить</my-button>
    </div>
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
        changed: false,
        changedFields: {
            'year': false,
            'status': false,
            'profile1': false,
            'subject1': false,
            'profile2': false,
            'subject2': false,
            'language': false,
        },
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
        editingRowsYear: [],
        editingRowsStatus: [],
        editingRowsProfile1: [],
        editingRowsProfile2: [],
        editingRowsSubject1: [],
        editingRowsSubject2: [],
        editingRowsLang: [],
        yData: [
            {'column1': 'Год обучения', 'eduYear': 0}
        ],
        eduYears: [
            {label: '9', value: 9},
            {label: '10', value: 10}
        ],
        stData: [
            {'column1': 'Статус', 'status': ''}
        ],
        statusList: [
            
        ],
        pf1Data: [
            {'column1': 'Профиль 1', 'profile1': 'Не выбрано'}
        ],
        sub1Data: [
            {'column1': 'Профильный предмет', 'subject1': 'Не выбрано'}
        ],
        pf2Data: [
            {'column1': 'Профиль 2', 'profile2': 'Не выбрано'}
        ],
        sub2Data: [
            {'column1': 'Профильный предмет', 'subject2': 'Не выбрано'}
        ],
        langData: [
            {'column1': 'Иностранный язык', 'lang': 'Не выбрано'}
        ],
        profileList: [],
        sub1List: [],
        sub2List: [],
        langList: []
    }
},
methods: {
    onRowEditSaveYear(event) {
        this.changed = true
        this.changedFields.year = true
        let { newData, index } = event;
        this.yData[index] = newData;
    },
    onRowEditSaveStatus(event) {
        this.changed = true
        this.changedFields.status = true
        let { newData, index } = event;
        this.stData[index] = newData;
    },
    async onRowEditSaveProfile1(event) {
        this.changed = true
        this.changedFields.profile1 = true
        let { newData, index } = event;
        this.pf1Data[index] = newData;
        this.sub1Data[index] = {'column1': 'Профильный предмет', 'subject1': 'Не выбрано'}
        let prList = await this.getListProfile();
        let p = prList.find((element) => element.name === newData.profile1)
        let new_list = await this.getListSubject(p.id)
        this.sub1List = []
        new_list.forEach((elem) => {this.sub1List.push({label: elem.name, value: elem.name})})
        console.log('newList, id', new_list, p.id)
    },
    onRowEditSaveSubject1(event) {
        this.changed = true
        this.changedFields.subject1 = true
        let { newData, index } = event;
        this.sub1Data[index] = newData;
    },
    async onRowEditSaveProfile2(event) {
        this.changed = true
        this.changedFields.profile2 = true
        let { newData, index } = event;
        this.pf2Data[index] = newData;
        this.sub2Data[index] = {'column1': 'Профильный предмет', 'subject2': 'Не выбрано'}
        let prList = await this.getListProfile();
        let p = prList.find((element) => element.name === newData.profile2)
        let new_list = await this.getListSubject(p.id)
        this.sub2List = []
        new_list.forEach((elem) => {this.sub2List.push({label: elem.name, value: elem.name})})
        console.log('newList, id', new_list, p.id)
    },
    onRowEditSaveSubject2(event) {
        this.changed = true
        this.changedFields.subject2 = true
        let { newData, index } = event;
        this.sub2Data[index] = newData;
    },
    onRowEditSaveLang(event) {
        this.changed = true
        this.changedFields.language = true
        let { newData, index } = event;
        this.langData[index] = newData;
    },
    rowClass() {
      return 'grey'
    },
    async getListService(yod) {
        let config = {
            headers: {
                authorization: 'Bearer ' + this.$store.getters.TOKEN
            }
        }
        let body = {
            "available_for_10_th_class": (yod === 10),
            "available_for_9_th_class": (yod === 9)
        }
        let ans = {}
        await axios.post('http://localhost:5000/user/listStatuses', body, config)
        .then((res) => {
            if (res.status === 200) {
                ans = res.data
            } else {
                console.log('serverError')
            }
        })
        .catch((e) => {
            this.showError(e)
        })
        return ans
    },
    async getListProfile() {
        let config = {
            headers: {
                authorization: 'Bearer ' + this.$store.getters.TOKEN
            }
        }
        let ans = {}
        await axios.get('http://localhost:5000/profiles/list', config)
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
        await axios.post('http://localhost:5000/subjects/list', body, config)
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
        await axios.get('http://localhost:5000/fl/list', config)
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
            this.tdData[1].column2 = u_role
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
            this.yData[0].eduYear = u_yod
        }
        if (u_status !== '') {
            this.stData[0].status = u_status
        }
        if (u_profile1.id !== 0) {
            this.pf1Data[0].profile1 = u_profile1.name
        }
        if (u_subject1.id !== 0) {
            this.sub1Data[0].subject1 = u_subject1.name
        }
        if (u_profile2.id !== 0) {
            this.pf2Data[0].profile2 = u_profile2.name
        }
        if (u_subject2.id !== 0) {
            this.sub2Data[0].subject2 = u_subject2.name
        }
        if (u_lang.id !== 0) {
            this.langData[0].lang = u_lang.name
        }
        let stList = await this.getListService();
        stList.forEach((elem) => {this.statusList.push({label: elem.name, value: elem.name})})

        let prList = await this.getListProfile();
        prList.forEach((elem) => {
            if(elem.education_year === u_yod) {
                this.profileList.push({label: elem.name, value: elem.name})
            }
        })

        let sub1List = await this.getListSubject(u_profile1.id);
        sub1List.forEach((elem) => {this.sub1List.push({label: elem.name, value: elem.name})})
        let sub2List = await this.getListSubject(u_profile2.id);
        sub2List.forEach((elem) => {this.sub2List.push({label: elem.name, value: elem.name})})

        let langList = await this.getListLang();
        langList.forEach((elem) => {this.langList.push({label: elem.name, value: elem.name})})
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
    clearChanges() {
        this.changed = false
        this.changedFields.language = false
        this.changedFields.year = false
        this.changedFields.status = false
        this.changedFields.profile1 = false
        this.changedFields.profile2 = false
    },
    async submitChanges() {
        let no_err = true

        let config = {
            headers: {
                authorization: 'Bearer ' + this.$store.getters.TOKEN
            }
        }
        const new_year = this.yData[0].eduYear
        const new_status = this.stData[0].status
        const new_lang = this.langData[0].lang

        const u_id = this.$store.getters.USER.id
        const u_fio = this.$store.getters.USER.fio
        const u_bday = this.$store.getters.USER.date_of_birth
        const u_gender = this.$store.getters.USER.gender
        const u_email = this.$store.getters.USER.email
        const u_phone_1 = this.$store.getters.USER.phone_number
        const u_phone_2 = this.$store.getters.USER.parent_phone_number
        const u_current_school = this.$store.getters.USER.current_school

        let data = {
            "email": u_email,
            "fio": u_fio,
            "date_of_birth": u_bday,
            "gender": u_gender,
            "phone_number": u_phone_1,
            "parent_phone_number": u_phone_2,
            "current_school": u_current_school,
            "education_year": new_year
        }
        if (this.changedFields.year) {
            await axios.put('http://localhost:5000/user/byId/' + u_id, data, config)
            .then(() => {
            })
            .catch((e) => {
                this.showError(e.response.data.message)
                no_err = false
            })
        }

        if (this.changedFields.status) {
            let s_list = await this.getListService()
            let new_st_id = s_list.find((element) => element.name === new_status)
            await axios.post('http://localhost:5000/user/setStatus/' + u_id + '/' + new_st_id.id, {}, config)
            .then(() => {
            })
            .catch((e) => {
                this.showError(e.response.data.message);
                no_err = false
            })
        }
        
        if(this.changedFields.profile1 || this.changedFields.profile2 || this.changedFields.subject1 || this.changedFields.subject2) {
            if (this.pf1Data[0].profile1 === this.pf2Data[0].profile2) {
                this.showError("Пожалуйста, выберите 2 разных профиля!")
                
            } else if (this.sub1Data[0].subject1 === 'Не выбрано' || this.sub2Data[0].subject2 === 'Не выбрано') {
                this.showError("Пожалуйста, заполните все поля!")
            } else {
                let prList = await this.getListProfile();
                let sbList = await this.getListSubject(0);
                let new_pf1 = prList.find((element) => element.name === this.pf1Data[0].profile1)
                let new_pf2 = prList.find((element) => element.name === this.pf2Data[0].profile2)
                let new_sb1 = sbList.find((element) => element.name === this.sub1Data[0].subject1)
                let new_sb2 = sbList.find((element) => element.name === this.sub2Data[0].subject2)
                let body1 = {
                    "first_profile_id": new_pf1.id,
                    "second_profile_id": new_pf2.id
                }
                let body2 = {
                    "first_subject_id": new_sb1.id,
                    "second_subject_id": new_sb2.id
                }
                await axios.post('http://localhost:5000/profiles/setToMe', body1, config)
                .then(() => {
                })
                .catch((e) => {
                    this.showError(e.response.data.message);
                    no_err = false
                })
                await axios.post('http://localhost:5000/subjects/setToMe', body2, config)
                .then(() => {
                })
                .catch((e) => {
                    this.showError(e.response.data.message);
                    no_err = false
                })
            }
        }
        if (this.changedFields.language) {
            let l_list = await this.getListLang();
            let new_lang_id = l_list.find((element) => element.name === new_lang)
            await axios.post('http://localhost:5000/fl/setToMe/' + new_lang_id.id, {}, config)
            .then(() => {
            })
            .catch((e) => {
                this.showError(e.response.data.message);
                no_err = false
            })
        }

        if (no_err) {
            this.clearChanges()
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

    await axios.get('http://localhost:5000/user/me', config)
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
},
}
</script>

<style scoped>
::v-deep(.grey) {
    background-color: #F5F5F5 !important;
}
::v-deep(thead) {
    display: none;
}
</style>