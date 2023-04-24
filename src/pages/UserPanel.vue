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

                <DataTable :row-class="rowClass" :value="utData"  show-gridlines editMode="cell" @cell-edit-complete="onCellEditComplete" class="editable-cells-table" responsiveLayout="scroll">
                    <Column class="w-50" field="column1"></Column>
                    <Column class="w-50" field="column2">
                        
                        <template #editor="{ data, field }">
                            <InputText v-model="data[field]" autofocus />
                        </template>

                    </Column>
                </DataTable>
                

                <div v-if="this.userData.role !== 'admin'">
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

                    

                </div>
                <div v-if="changed" id="my-tds" class="flex align-items-center justify-content-end" style="margin-bottom: 20px;margin-top: 50px;">
                    <my-button @click="submitChanges">Сохранить</my-button>
                </div>
                <div v-else id="my-tds" class="flex align-items-center justify-content-end" style="margin-bottom: 20px;margin-top: 50px;">
                    <my-button @click="editMode">Редактировать</my-button>
                </div>
                <div class="attached-docs" v-if="this.screenshot.file_name !== ''">
                    <div class="flex align-items-center justify-content-between" style="margin-bottom: 20px;margin-top: 30px;" v-if="this.userData.role !== 'admin'">
                        <span class="text-xl font-bold ml-6">Прикрепленные документы</span>
                    </div>
                    <p style="margin-left: 1rem;"  v-if="this.userData.role !== 'admin'">
                        <span>{{ this.screenshot_type_mapped[this.screenshot.screenshot_type] }}</span>
                    </p>
                    <p class="sh-title" v-if="this.userData.role !== 'admin'">
                        <span @click="downloadScreenshot">{{ (this.screenshot.file_name !== '' ? this.screenshot.file_name : 'Файлы не найдены')}}</span>
                    </p>
                </div>

                <div class="flex align-items-center justify-content-between" style="margin-top: 30px;" v-if="this.userData.role !== 'admin'">
                    <span class="text-xl font-bold ml-6">Тестирования</span>
                </div>

                <Toast />
                <DynamicDialog />
                <div id="content-user" class="w-12 mt-4 mx-auto" v-if="this.userData.role !== 'admin'">
                    <div id="my-tds" class="flex align-items-center justify-content-end mb-3" v-if="this.tests.length < 2">
                    <my-button @click="showTestDateSelection">Записать на тестирование</my-button>
                    </div>
                    <div class="test-dates-container" v-for="test of this.tests" :key="test">
                        <!---->
                        <DataTable :value="test" show-gridlines responsiveLayout="scroll" :row-class="rowClass">
                        <Column class="w-50" field="column1"></Column>
                        <Column class="w-50" field="column2" ></Column>
                        </DataTable><!---->
                    </div>
                </div>


                <div class="flex align-items-center justify-content-between" style="margin-top: 30px;" v-if="(this.userData.role !== 'admin') && (this.showResults === true)">
                    <span class="text-xl font-bold ml-6">Результаты</span>
                </div>
                <div id="content-user" class="w-12 mt-4 mx-auto" v-if="(this.userData.role !== 'admin') && (this.showResults === true)">
                    <div class="test-grades-container">
                        <DataTable :value="this.grades" show-gridlines responsiveLayout="scroll" :row-class="rowClass"><!--editMode="cell">-->
                        <Column class="w-25" field="column1">
                        </Column>
                        <Column class="w-25" field="column2" >
                        </Column>
                        <Column class="w-25" field="column3">
                            <template #editor="{ data, field }">
                                <InputText v-model="data[field]" autofocus />
                            </template>
                        </Column>
                        <Column class="w-25" field="column4" >
                        </Column>
                        </DataTable>
                    </div>
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
import { h } from 'vue';
import Button from "primevue/button";
import DynamicDialog from "primevue/dynamicdialog";
import SelectTestDateModal from "@/pages/SelectTestDateModal.vue";

export default {
    components: {
        TopBar,
        BottomBar,
        DataTable,
        Column,
        MyButton,
        DynamicDialog,
    },
    data() {
        return {
            showResults: false,
            userData: {},
            screenshot: {},
            screenshot_type_mapped: {
                'lyceum': 'По результатам вступительных в лицей НИУ ВШЭ',
                'olympiad': 'По результатам олимпиад и конкурсов',
                'MCKO': 'По результатам написания работ МЦКО',
                'quota': 'По результатам конкурса на квотное место для учеников ПК'
            },
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
            utData: [
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
            profileList: [{label: 'Не выбрано', value: 'Не выбрано'}],
            sub1List: [{label: 'Не выбрано', value: 'Не выбрано'}],
            sub2List: [{label: 'Не выбрано', value: 'Не выбрано'}],
            langList: [],

            tests: [
                [
                    {'column1': 'Дата', 'column2': 'Не выбрано'},
                    {'column1': 'Время', 'column2': 'Не выбрано'},
                    {'column1': 'Место проведения', 'column2': 'Не выбрано'},
                    {'column1': 'Сумма по 1 профилю', 'column2': '-'},
                    {'column1': 'Сумма по 2 профилю', 'column2': '-'}
                ]
            ],
            grades: [
                {'column1': 'Дата', 'column2': 'Предмет', 'column3': 'Оценка', 'column4': 'Максимальный балл'}
            ]
        }
    },
    methods: {
        rowClass() {
            return 'grey'
        },
        showTestDateSelection() {
        const dialogRef = this.$dialog.open(SelectTestDateModal, {
            props: {
            header: 'Список доступных дат тестирования',
            style: {
                width: '65vw',
            },
            breakpoints:{
                '960px': '75vw',
                '640px': '90vw'
            },
            modal: true,
            },
            templates: {
            footer: () => {
                return [
                h(Button, { label: "Отмена", icon: "pi pi-times", onClick: () => dialogRef.close({ is_chosen: true }), autofocus: true })
                ]
            }
            },
            onClose: (options) => {
            const data = options.data;
            if (data) {
                if (data.isError) {
                this.$toast.add({severity:'error', summary: 'Error Message', detail:data.error.message, life: 5000});
                console.log(1)
                } else {
                    this.$router.go()
                }
            }
            },
            data: {
                is_admin: true, 
                user_yod: this.userData.education_year,
                user_id: this.userData.id,
                admin_token: this.$store.getters.TOKEN
            }
        })
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
                await this.$store.dispatch('setToken', token)
                this.config = {headers: {authorization: 'Bearer ' + token}}
            }
        },
        async getUser(id) {
            let ans = {}
            await axios.get('user/byId/' + id, this.config)
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
            await axios.get('user/me', this.config)
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
            if (newData.profile1 === 'Не выбрано') {
                this.sub1List = [{label: 'Не выбрано', value: 'Не выбрано'}]
            } else {
                let p = prList.find((element) => element.name === newData.profile1)
                let new_list = await this.getListSubject(p.id)
                this.sub1List = [{label: 'Не выбрано', value: 'Не выбрано'}]
                new_list.forEach((elem) => {this.sub1List.push({label: elem.name, value: elem.name})})
            }
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
            if (newData.profile2 === 'Не выбрано') {
                this.sub2List = [{label: 'Не выбрано', value: 'Не выбрано'}]
            } else {
                let p = prList.find((element) => element.name === newData.profile2)
                let new_list = await this.getListSubject(p.id)
                this.sub2List = [{label: 'Не выбрано', value: 'Не выбрано'}]
                new_list.forEach((elem) => {this.sub2List.push({label: elem.name, value: elem.name})})
            }
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
            await axios.post('user/listStatuses', body, this.config)
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
            await axios.get('profiles/list', this.config)
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
            await axios.post('subjects/list', body, this.config)
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
            await axios.get('fl/list', this.config)
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
            this.screenshot = this.userData.screenshot

            const u_yod = uData.education_year
            const u_profile1 = uData.first_profile
            const u_profile2 = uData.second_profile
            const u_td = uData.test_dates
            if(uData.id !== 0) {
                this.staticData[0].column2 = uData.id
            }
            if(uData.role !== '') {
                this.roleData[0].role = (uData.role === 'admin' ? 'Администратор' : 'Абитуриент')
            }
            if (uData.fio !== '') {
                this.utData[0].column2 = uData.fio
            }
            if (uData.date_of_birth !== '') {
                this.utData[1].column2 = uData.date_of_birth
            }
            if (uData.gender !== '') {
                this.utData[2].column2 = (uData.gender === 'male' ? 'Мужской' : 'Женский')
            }
            if (uData.email !== '') {
                this.utData[3].column2 = uData.email
            }
            if (uData.phone_number !== '') {
                this.utData[4].column2 = uData.phone_number
            }
            if (uData.parent_phone_number !== '') {
                this.utData[5].column2 = uData.parent_phone_number
            }
            if (uData.current_school !== '') {
                this.utData[6].column2 = uData.current_school
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
            if (u_td.length !== 0) {
                this.tests.pop()
                u_td.forEach((val) => {

                        this.tests.push(
                            [
                                {'column1': 'Дата', 'column2': val.date},
                                {'column1': 'Время', 'column2': val.time},
                                {'column1': 'Место проведения', 'column2': val.location},
                            ]
                        )
                        //console.log(val)
                        if (val.has_results) {
                            const sumFirstProfile = (val.russian_language_grade.is_valid && val.math_grade.is_valid && val.foreign_language_grade.is_valid && (u_yod === 10 ? val.first_profile_grade.is_valid : 1))
                            const sumSecondProfile = (val.russian_language_grade.is_valid && val.math_grade.is_valid && val.foreign_language_grade.is_valid && (u_yod === 10 ? val.second_profile_grade.is_valid : 1))
                            this.grades.push(
                                {'column1': val.date, 'column2': 'Русский язык', 'column3': (val.russian_language_grade.is_valid) ? val.russian_language_grade.val : '-', 'column4': (u_yod === 9 ? 100 : 10)},
                                {'column1': val.date, 'column2': 'Математика', 'column3': (val.math_grade.is_valid) ? val.math_grade.val : '-', 'column4': (u_yod === 9 ? 100 : 10)},
                                {'column1': val.date, 'column2': 'Иностранный язык', 'column3': (val.foreign_language_grade.is_valid) ? val.foreign_language_grade.val : '-', 'column4': (u_yod === 9 ? 100 : 10)},
                                {'column1': val.date, 'column2': uData.first_profile_subject.name, 'column3': (val.first_profile_grade.is_valid) ? val.first_profile_grade.val : '-', 'column4': (u_yod === 9 ? '-' : 20)},
                                {'column1': val.date, 'column2': uData.second_profile_subject.name, 'column3': (val.second_profile_grade.is_valid) ? val.second_profile_grade.val : '-', 'column4': (u_yod === 9 ? '-' : 20)},
                            )
                            if (sumFirstProfile) {
                            this.tests[this.tests.length - 1].push(
                                {'column1': 'Сумма по 1 профилю', 'column2': val.russian_language_grade.val + val.math_grade.val + val.foreign_language_grade.val + (u_yod === 10 ? val.first_profile_grade.val : 0)},
                            )
                            } else {
                            this.tests[this.tests.length - 1].push(
                                {'column1': 'Сумма по 1 профилю', 'column2': '-'},
                            )
                            }
                            if (sumSecondProfile) {
                            this.tests[this.tests.length - 1].push(
                                {'column1': 'Сумма по 2 профилю', 'column2': val.russian_language_grade.val + val.math_grade.val + val.foreign_language_grade.val + (u_yod === 10 ? val.second_profile_grade.val : 0)},
                            )
                            } else {
                            this.tests[this.tests.length - 1].push(
                                {'column1': 'Сумма по 2 профилю', 'column2': '-'},
                            )
                            }
                            this.showResults = true
                        }
                })

                //console.log(this.tests)
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
        clearChanges() {
            this.changed = false
            this.changedFields.language = false
            this.changedFields.year = false
            this.changedFields.status = false
            this.changedFields.profile1 = false
            this.changedFields.profile2 = false
        },
        editMode() {
            this.editing = true
        },
        async submitChanges() {
            let no_err = true

            const new_year = this.yData[0].eduYear
            const new_status = this.stData[0].status
            const new_lang = this.langData[0].lang
            const new_role = (this.roleData[0].role === 'Администратор') ? 'admin' : 'user'

            const u_id = this.staticData[0].column2
            const u_fio = this.utData[0].column2
            const u_bday = this.utData[1].column2
            let u_gender = this.utData[2].column2
            u_gender.toLocaleLowerCase()
            switch(u_gender.toLocaleLowerCase()) {
                case 'мужской':
                    u_gender = 'male'
                    this.utData[2].column2 = 'Мужской'
                    break;
                case 'женский':
                    u_gender = 'female'
                    this.utData[2].column2 = 'Женский'
                    break;
                default:
                    this.showError("Неверный формат пола; возможные значения: 'Мужской', 'Женский'")
                    no_err = false
                    break;
            }

            const u_email = this.utData[3].column2
            const u_phone_1 = this.utData[4].column2
            const u_phone_2 = this.utData[5].column2
            const u_current_school = this.utData[6].column2

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
            if (this.changed && no_err) {
                await axios.put('user/byId/' + u_id, data, this.config)
                .then(() => {
                })
                .catch((e) => {
                    this.showError(e.response.data.message)
                    no_err = false
                })
                await axios.post('user/setUserRole/' + u_id + '/' + new_role, {}, this.config)
                .catch((e) => {
                    this.showError(e.response.data.message)
                    no_err = false
                })
            }

            if (this.changedFields.status) {
                let s_list = await this.getListService()
                let new_st_id = s_list.find((element) => element.name === new_status)
                await axios.post('user/setStatus/' + u_id + '/' + new_st_id.id, {}, this.config)
                .then(() => {
                })
                .catch((e) => {
                    this.showError(e.response.data.message);
                    no_err = false
                })
            }
            
            if(this.changedFields.profile1 || this.changedFields.profile2 || this.changedFields.subject1 || this.changedFields.subject2) {
                if (this.pf1Data[0].profile1 === this.pf2Data[0].profile2 && this.pf1Data[0].profile1 !== 'Не выбрано') {
                    this.showError("Пожалуйста, выберите 2 разных профиля!")
                    
                } else if ((this.sub1Data[0].subject1 === 'Не выбрано' && this.sub2Data[0].subject2 === 'Не выбрано') && 
                            (this.pf1Data[0].profile1 === this.pf2Data[0].profile2 === 'Не выбрано')) {
                    this.showError("Пожалуйста, заполните хотя бы 1 профиль!")
                } else if((this.pf1Data[0].profile1 !== 'Не выбрано' && this.sub1Data[0].subject1 === 'Не выбрано') ||
                        (this.pf2Data[0].profile2 !== 'Не выбрано' && this.sub2Data[0].subject2 === 'Не выбрано')) {
                    this.showError("Пожалуйста, выберите профильный предмет!")
                }else {
                    let prList = await this.getListProfile();
                    let sbList = await this.getListSubject(0);

                    

                    let new_pf1 = {}, new_pf2 = {}, new_sb1 = {}, new_sb2 = {}
                    if(this.pf1Data[0].profile1 === 'Не выбрано') {
                        new_pf1 = {id: 0, name: ''}
                    } else {
                        new_pf1 = prList.find((element) => element.name === this.pf1Data[0].profile1)
                    }
                    if(this.pf2Data[0].profile2 === 'Не выбрано') {
                        new_pf2 = {id: 0, name: ''}
                    } else {
                        new_pf2 = prList.find((element) => element.name === this.pf2Data[0].profile2)
                    }
                    if(this.sub1Data[0].subject1 === 'Не выбрано') {
                        new_sb1 = {id: 0, name: ''}
                    } else {
                        new_sb1 = sbList.find((element) => element.name === this.sub1Data[0].subject1)
                    }
                    if(this.sub2Data[0].subject2 === 'Не выбрано') {
                        new_sb2 = {id: 0, name: ''}
                    } else {
                        new_sb2 = sbList.find((element) => element.name === this.sub2Data[0].subject2)
                    }
                    console.log(this.sub2Data[0].subject2)
                    console.log(new_pf1, new_sb1, new_pf2, new_sb2)
                    let body1 = {
                        "first_profile_id": new_pf1.id,
                        "second_profile_id": new_pf2.id
                    }
                    let body2 = {
                        "first_subject_id": new_sb1.id,
                        "second_subject_id": new_sb2.id
                    }
                    await axios.post('profiles/setToUser/' + this.userData.id, body1, this.config)
                    .then(() => {
                    })
                    .catch((e) => {
                        this.showError(e.response.data.message);
                        no_err = false
                    })
                    await axios.post('subjects/setToUser/' + this.userData.id, body2, this.config)
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
                await axios.post('fl/setToUser/'+ this.userData.id + '/' + new_lang_id.id, {}, this.config)
                .catch((e) => {
                    this.showError(e.response.data.message);
                    no_err = false
                })
            }

            if (no_err) {
                this.clearChanges()
                this.$router.go()
            }
        },
        async downloadScreenshot() {
            await axios.get('user/downloadScreenshot/' + this.userData.id, this.config)
            .then((response) => {
                var a = document.createElement("a"); //Create <a>
                a.href = "data:" + response.data.content_type + ";base64," + response.data.file_content; //Image Base64 Goes here
                a.download = response.data.file_name; //File name Here
                a.click();
            })
            .catch((e) => {
                this.showError(e.response.data.message)
            })
        },
    },
    
    async mounted() {
        await this.setToken()
        await this.checkUser()
        this.userData = await this.getUser(this.$route.params.id)
        await this.fetchData()
        
    },
}
</script>

<style scoped>
::v-deep(.grey) {
    background-color: #f5f5f5!important;
}
::v-deep(thead) {
    display: none;
}
.sh-title {
    text-decoration: underline;
    color: blue;
    margin-left: 1rem
}
.sh-title:hover {
    cursor: pointer;
}
.attached-docs {
    margin-top: 20px;
    background-color: rgba(255, 255, 255, 1);
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .2));
    border-radius: 20px;
    padding-top: 1px;
    padding-bottom: 30px;
}
.test-dates-container {
    margin-bottom: 30px;
}
</style>