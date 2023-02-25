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


    <DataTable :row-class="rowClass" show-gridlines :value="yData" editMode="row" dataKey="id" v-model:editingRows="editingRowsYear" @row-edit-save="onRowEditSaveYear" responsiveLayout="scroll">
        <Column field="column1" style="width:50%">
        </Column>
        <Column field="eduYear" :style="{width: (this.$store.getters.USER.role === 'admin' ? ('40%') : ('50%'))}">
            <template #editor="{ data, field }">
                <DropDown v-model="data[field]" :options="eduYears" optionLabel="label" optionValue="value" placeholder="Выберите класс">
                </DropDown>
            </template>
        </Column>
        <Column v-if="this.$store.getters.USER.role === 'admin'" :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
    </DataTable>

    <DataTable :row-class="rowClass" show-gridlines :value="stData" editMode="row" dataKey="id" v-model:editingRows="editingRowsStatus" @row-edit-save="onRowEditSaveStatus" responsiveLayout="scroll">
        <Column field="column1" style="width:50%">
        </Column>
        <Column field="eduYear" :style="{width: (this.$store.getters.USER.role === 'admin' ? ('40%') : ('50%'))}">
            <template #editor="{ data, field }">
                <DropDown v-model="data[field]" :options="statusList" optionLabel="label" optionValue="value" placeholder="Выберите класс">
                </DropDown>
            </template>
        </Column>
        <Column v-if="this.$store.getters.USER.role === 'admin'" :rowEditor="true" style="width:10%; min-width:8rem" bodyStyle="text-align:center"></Column>
    </DataTable>

    <div v-if="changed" id="my-tds" class="flex align-items-center justify-content-end" style="margin-bottom: 20px;margin-top: 100px;">
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
            {label: 'status', value: ''}
        ],
    }
},
methods: {
    onRowEditSaveYear(event) {
        this.changed = true
        let { newData, index } = event;
        this.yData[index] = newData;
    },
    onRowEditSaveStatus(event) {
        this.changed = true
        let { newData, index } = event;
        this.stData[index] = newData;
    },
    rowClass() {
      return 'grey'
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
        if (u_status !== 0) {
            this.stData[0].status = u_status
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
    async submitChanges() {
        let config = {
            headers: {
                authorization: 'Bearer ' + this.$store.getters.TOKEN
            }
        }
        const new_year = this.yData[0].eduYear

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
        await axios.put('http://localhost:5000/user/byId/' + u_id, data, config)
            .then(() => {
                this.changed = false
            })
            .catch((e) => {
                this.showError(e)
            })
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