<template>
    <TopBar/>
    <div class="container">
        <div class="row">
            <div id="content" class="w-12 mt-4 mx-auto" style="margin-bottom: 100px;">
                <div id="my-tds" class="flex align-items-center justify-content-between" style="margin-bottom: 20px;margin-top: 30px;">
                    <span class="text-xl font-bold ml-6">Персональные данные</span>
                </div>

                <DataTable :value="staticData" show-gridlines responsiveLayout="scroll" :row-class="rowClass">
                    <Column class="w-50" field="column1"></Column>
                    <Column class="w-50" field="column2" ></Column>
                </DataTable>

                <DataTable :value="roleData" show-gridlines responsiveLayout="scroll" :row-class="rowClass" editMode="cell" @cell-edit-complete="onCellEditComplete"> 
                    <Column class="w-50" field="column1"></Column>
                    <Column class="w-50" field="role" >
                        <template #editor="{ data, field }">
                            <DropDown v-model="data[field]" :options="rolesList" optionLabel="label" optionValue="value" placeholder="Выберите роль" style="max-width: 100%;">
                            </DropDown>
                        </template>
                    </Column>
                </DataTable>

                <DataTable :row-class="rowClass" :value="tdData"  show-gridlines editMode="cell" @cell-edit-complete="onCellEditComplete" class="editable-cells-table" responsiveLayout="scroll">
                    <Column class="w-50" field="column1"></Column>
                    <Column class="w-50" field="column2">
                        <template #editor="{ data, field }">
                            <InputText v-model="data[field]" autofocus />
                        </template>
                    </Column>
                </DataTable>
                

                <div class="flex align-items-center justify-content-between" style="margin-bottom: 20px;margin-top: 30px;">
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
        </div>
    </div>
    <BottomBar/>
    <vue-basic-alert
       :duration="300"
       :closeIn="3000"
       ref="alert" />
</template>

<script>
import TopBar from '@/components/UI/TopBar.vue'
import BottomBar from '@/components/UI/BottomBar.vue'
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import MyButton from '@/components/UI/MyButton.vue'
import axios from 'axios';

export default {
    components: {
        TopBar,
        BottomBar,
        DataTable,
        Column,
        MyButton
    },
    data() {
        return {
            userData: {},
            config: {
                headers: {
                    authorization: 'Bearer ' + this.$store.getters.TOKEN
                }
            },
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
            staticData: [
                {'column1': 'Код участника', 'column2': 'Не выбрано'},
            ],
            roleData: [
                {'column1': 'Роль', 'role': 'Не выбрано'}
            ],
            tdData: [
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

            rolesList: [
                {label: 'Администратор', value: 'Администратор'},
                {label: 'Абитуриент', value: 'Абитуриент'},
            ],
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
        rowClass() {
            return 'grey'
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
        async setToken() {
            const token = localStorage.getItem("token")
            if (token === null) {
                this.$router.push('/login')
            } else {
                this.config = {headers: {authorization: 'Bearer ' + token}}
            }
        },
        async getUser(id) {
            let ans = {}
            await axios.get('http://localhost:5000/user/byId/' + id, this.config)
            .then((res) => {
                if (res.status === 200) {
                    ans = res.data
                } else {
                    console.log('severError')
                }
            })
            .catch((e) => {
                if(e.response.status === 401) {
                    this.$router.push('/login')
                } else {
                    this.showError(e.response.data.message)
                }
            })
            return ans
        },
        async checkUser() {
            await axios.get('http://localhost:5000/user/me', this.config)
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
        },
        onCellEditComplete(event) {
            let { data, newValue, field } = event;
            data[field] = newValue
            this.changed = true
        },
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
        async getListService(yod) {
            let body = {
                "available_for_10_th_class": (yod === 10),
                "available_for_9_th_class": (yod === 9)
            }
            let ans = {}
            await axios.post('http://localhost:5000/user/listStatuses', body, this.config)
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
            let ans = {}
            await axios.get('http://localhost:5000/profiles/list', this.config)
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
            let body = {
                "profile_id": p_id
            }
            let ans = {}
            await axios.post('http://localhost:5000/subjects/list', body, this.config)
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
            let ans = {}
            await axios.get('http://localhost:5000/fl/list', this.config)
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
            let uData = this.userData
            const u_yod = uData.education_year
            const u_profile1 = uData.first_profile
            const u_profile2 = uData.second_profile
            
            if(uData.id !== 0) {
                this.staticData[0].column2 = uData.id
            }
            if(uData.role !== '') {
                this.roleData[0].role = (uData.role === 'admin' ? 'Администратор' : 'Абитуриент')
            }
            if (uData.fio !== '') {
                this.tdData[0].column2 = uData.fio
            }
            if (uData.date_of_birth !== '') {
                this.tdData[1].column2 = uData.date_of_birth
            }
            if (uData.gender !== '') {
                this.tdData[2].column2 = (uData.gender === 'male' ? 'Мужской' : 'Женский')
            }
            if (uData.email !== '') {
                this.tdData[3].column2 = uData.email
            }
            if (uData.phone_number !== '') {
                this.tdData[4].column2 = uData.phone_number
            }
            if (uData.parent_phone_number !== '') {
                this.tdData[5].column2 = uData.parent_phone_number
            }
            if (uData.current_school !== '') {
                this.tdData[6].column2 = uData.current_school
            }
            if (uData.education_year !== 0) {
                this.yData[0].eduYear = uData.education_year
            }
            if (uData.status.id !== '') {
                this.stData[0].status = uData.status.name
            }
            if (uData.first_profile.id !== 0) {
                this.pf1Data[0].profile1 = uData.first_profile.name
            }
            if (uData.first_profile_subject.id !== 0) {
                this.sub1Data[0].subject1 = uData.first_profile_subject.name
            }
            if (uData.second_profile.id !== 0) {
                this.pf2Data[0].profile2 = uData.second_profile.name
            }
            if (uData.second_profile_subject.id !== 0) {
                this.sub2Data[0].subject2 = uData.second_profile_subject.name
            }
            if (uData.foreign_language.id !== 0) {
                this.langData[0].lang = uData.foreign_language.name
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

    },
    async mounted() {
        await this.setToken()
        await this.checkUser()
        this.userData = await this.getUser(this.$route.params.id)
        console.log(this.userData)
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