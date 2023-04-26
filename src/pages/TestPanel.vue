<template>
    <TopBar/>
    <div class="container">
        <div class="row" style="min-height: calc(100vh - 200px);">
            <div id="content" class="w-12 mt-4 mx-auto" style="margin-bottom: 100px;">
                <div class="flex align-items-center justify-content-between flex-wrap" style="margin-bottom: 20px;margin-top: 30px;">
                    <span class="text-xl font-bold ml-6">Тестирование #{{ this.testData.id }}</span>
                    <div class="flex w-6 align-items-center justify-content-end flex-wrap">
                        <my-button class="tool-button" @click="changePubStatus">{{(this.testData.pub_status === 'shown' ? 'Скрыть' : 'Открыть')}}</my-button>
                        <my-button style="background-color: #EFBFBE;" class="tool-button" @click="downloadReg">Скачать лист регистрации</my-button>
                        <my-button style="background-color: #CBEFBE;" class="tool-button" @click="downloadExcel">Выгрузить в Excel</my-button>
                    </div>
                </div>

                <DataTable :row-class="rowClass" :value="tdData" show-gridlines responsiveLayout="scroll" >
                    <Column class="w-50" field="column1"></Column>
                    <Column class="w-50" field="column2" ></Column>
                </DataTable>
                <div style="margin-top: 40px;"></div>
                <div class="flex align-items-center justify-content-end mb-3">
                    <my-button @click="updateGrades">Сохранить изменения</my-button>
                </div>
                <DataTable :value="usersData" data-key="id" v-model:filters="filters" rowStyle=""
                 filter-display="row" :loading="isLoading"
                 :global-filter-fields="['id', 'info']" :scrollable="true" scroll-height="flex" scrollDirection="both" show-gridlines responsive-layout="scroll"
                 @row-dblclick="rowClick($event)"
                 class="uData"
                 editMode="cell">
                    <template #header>
                    <div class="flex justify-content-between">
                        <div style="text-align:left">
                        <MultiSelect v-model="selectedColumns" :options="columns" 
                                    placeholder="Select Columns" style="width: 20em"/>
                        </div>
                        <span class="p-input-icon-left">
                        <i class="pi pi-search"/>
                        <InputText v-model="filters['global'].value" placeholder="Поиск"/>
                        </span>
                    </div>
                    </template>
                    <template #empty>
                    Пользователи не найдены
                    </template>
                    <template #loading>
                    Загрузка пользователей...
                    </template>
                    <Column v-if="this.checkColumnChosen('ID')" :show-filter-menu="false" field="id" header="ID" :sortable="true" class="w-1" >
                    <template #body="{data}" >
                        {{data.id}}
                    </template>
                    <template #filter="{filterModel, filterCallback}">
                        <InputText @input="filterCallback" type="text" v-model="filterModel.value" :placeholder="`Поиск по ID- `"/>
                    </template>
                    </Column>
                    <Column v-if="this.checkColumnChosen('Информация о пользователе')" :show-filter-menu="false" field="info" header="Информация о пользователе" :sortable="true" class="w-2">
                    <template #body="{data}">
                        <div class="flex align-items-start flex-column">
                        <span class="text-decoration-underline font-semibold">{{data.fio}}</span>
                        <span>{{data.date_of_birth}}</span>
                        <span>{{data.email}}</span>
                        <span>{{data.phone_number}}</span>
                        <span>{{data.current_school}}</span>
                        </div>
                    </template>
                    <template #filter="{filterModel, filterCallback}">
                        <InputText @input="filterCallback" type="text" v-model="filterModel.value" :placeholder="`Поиск по информации - `"/>
                    </template>
                    </Column>

                    <Column v-if="this.checkColumnChosen('Присутствие')" class="w-2" header="Присутствие" filter-field="attendance" :show-filter-menu="false">
                    <template #body="{data}">
                        <div style="width: 100%;text-align: center;"><my-button @click="changeAttendance(data)">{{data.attendance}}</my-button></div>
                    </template>
                    <template #filter="{filterModel, filterCallback}">
                        <MultiSelect v-model="filterModel.value" @change="filterCallback"
                                    :options="attendanceStatuses" class="p-column-filter" placeholder="Выбор">
                            <template #option="slotProps">
                                <div class="p-multiselect-representative-option"></div>
                                {{slotProps.option}}
                            </template>
                        </MultiSelect>
                    </template>
                    </Column>

                    <Column v-if="this.checkColumnChosen('Статус')" class="w-2" header="Статус" :sortable="true" field="status" filter-field="status" :show-filter-menu="false">
                    <template #body="{data}">
                        {{data.status}}
                    </template>
                    <template #filter="{filterModel, filterCallback}">
                        <MultiSelect v-model="filterModel.value" @change="filterCallback"
                                    :options="statuses" option-label="name" option-value="name" class="p-column-filter" placeholder="Выбор">
                        <template #option="slotProps">
                            <div class="p-multiselect-representative-option"></div>
                            {{slotProps.option.name}}
                        </template>
                        </MultiSelect>
                    </template>
                    </Column>
                    <Column v-if="this.checkColumnChosen('Роль')" class="w-2" header="Роль" filter-field="role" :show-filter-menu="false">
                    <template #body="{data}">
                        {{data.role}}
                    </template>
                    <template #filter="{filterModel, filterCallback}">
                        <MultiSelect v-model="filterModel.value" @change="filterCallback"
                                    :options="roles" class="p-column-filter" placeholder="Выбор">
                        <template #option="slotProps">
                            <div class="p-multiselect-representative-option"></div>
                            {{slotProps.option}}
                        </template>
                        </MultiSelect>
                    </template>
                    </Column>
                    <Column v-if="this.checkColumnChosen('Пол')" class="w-2" header="Пол" filter-field="gender" :show-filter-menu="false">
                    <template #body="{data}">
                        {{data.gender}}
                    </template>
                    <template #filter="{filterModel, filterCallback}">
                        <MultiSelect v-model="filterModel.value" @change="filterCallback"
                                    :options="genders" class="p-column-filter" placeholder="Выбор">
                        <template #option="slotProps">
                            <div class="p-multiselect-representative-option"></div>
                            {{slotProps.option}}
                        </template>
                        </MultiSelect>
                    </template>
                    </Column>
                    <Column v-if="this.checkColumnChosen('Класс поступления')" class="w-2" header="Класс поступления" filter-field="education_year" :show-filter-menu="false">
                    <template #body="{data}">
                        {{data.education_year}}
                    </template>
                    <template #filter="{filterModel, filterCallback}">
                        <MultiSelect v-model="filterModel.value" @change="filterCallback"
                                    :options="education_years" class="p-column-filter" placeholder="Выбор">
                        <template #option="slotProps">
                            <div class="p-multiselect-representative-option"></div>
                            {{slotProps.option}}
                        </template>
                        </MultiSelect>
                    </template>
                    </Column>

                    <Column v-if="this.checkColumnChosen('Русский язык')" class="w-2" header="Русский язык" :sortable="false" field="russian_language" filter-field="russian_language.grade.val" :show-filter-menu="false">
                    <template #body="{data}">
                        <div v-if="data.russian_language.grade.is_valid">
                            <p>
                                {{data.russian_language.grade.val}}/{{ (this.testData.education_year === 9) ? 100 : 10}}
                            </p>
                        </div>
                        <div v-else>
                            <p>
                                -   
                            </p>
                        </div>
                    </template>
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field].grade.val" autofocus @change='addChanges(data, field)'/>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Поиск" />
                    </template>
                    </Column>

                    <Column v-if="this.checkColumnChosen('Математика')" class="w-2" header="Математика" :sortable="false" field="math" filter-field="math.grade.val" :show-filter-menu="false">
                    <template #body="{data}">
                        <div v-if="data.math.grade.is_valid">
                            <p>
                                {{data.math.grade.val}}/{{ (this.testData.education_year === 9) ? 100 : 10}}
                            </p>
                        </div>
                        <div v-else>
                            <p>
                                -   
                            </p>
                        </div>
                    </template>
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field].grade.val" autofocus @change='addChanges(data, field)'/>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Поиск" />
                    </template>
                    </Column>

                    <Column v-if="this.checkColumnChosen('Иностранный язык')" class="w-2" header="Иностранный язык" :sortable="false" field="foreign_language" filter-field="foreign_language.name" :show-filter-menu="false">
                    <template #body="{data}">
                        <div v-if="data.foreign_language.grade.is_valid">
                            <p>
                                {{data.foreign_language.name}}<br/>
                                {{ data.foreign_language.grade.val }}/{{ (this.testData.education_year === 9) ? 100 : 10}}
                            </p>
                        </div>
                        <div v-else>
                            <p>
                                -   
                            </p>
                        </div>
                        
                    </template>
                    <template #editor="{ data, field }">
                        <InputText v-model="data[field].grade.val" autofocus @change='addChanges(data, field)'/>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Поиск" />
                    </template>
                    </Column>

                    <Column v-if="this.checkColumnChosen('Профиль 1')" class="w-2" header="Профиль 1" :sortable="true" field="first_profile" filter-field="first_profile" :show-filter-menu="false">
                    <template #body="{data}">
                        <div>
                            <p>
                                {{data.first_profile}}
                            </p>
                        </div>
                    </template>
                    <template #filter="{filterModel, filterCallback}">
                        <MultiSelect v-model="filterModel.value" @change="filterCallback"
                                    :options="profiles" option-label="name" option-value="name" class="p-column-filter" placeholder="Выбор">
                        <template #option="slotProps">
                            <div class="p-multiselect-representative-option"></div>
                            {{slotProps.option.name}}
                        </template>
                        </MultiSelect>
                    </template>
                    </Column>
                    <Column v-if="this.checkColumnChosen('Предмет профиля 1')" class="w-2" header="Предмет профиля 1" :sortable="true" field="first_subject" filter-field="first_subject.name" :show-filter-menu="false">
                    <template #body="{data}">
                        <div v-if="data.first_subject.grade.is_valid">
                            <div>
                                <p>{{data.first_subject.name}}</p>
                                <p v-if="this.testData.education_year !== 9">{{ data.first_subject.grade.val }}/20</p>
                                
                            </div>
                        </div>
                        <div v-else>
                            <p>
                                -   
                            </p>
                        </div>


                    </template>
                    <template #editor="{ data, field }" v-if="(this.testData.education_year !== 9)">
                        <InputText v-if="data.first_subject.name !== ''" v-model="data[field].grade.val" autofocus @change='addChanges(data, field)'/>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Поиск" />
                    </template>
                    </Column>
                    <Column v-if="this.checkColumnChosen('Профиль 2')" class="w-2" header="Профиль 2" :sortable="true" field="second_profile" filter-field="second_profile" :show-filter-menu="false">
                    <template #body="{data}">
                        <div>
                            <p>
                                {{data.second_profile}}
                            </p>
                        </div>
                    </template>
                    <template #filter="{filterModel, filterCallback}">
                        <MultiSelect v-model="filterModel.value" @change="filterCallback"
                                    :options="profiles" option-label="name" option-value="name" class="p-column-filter" placeholder="Выбор">
                        <template #option="slotProps">
                            <div class="p-multiselect-representative-option"></div>
                            {{slotProps.option.name}}
                        </template>
                        </MultiSelect>
                    </template>
                    </Column>
                    <Column v-if="this.checkColumnChosen('Предмет профиля 2')" class="w-2" header="Предмет профиля 2" :sortable="true" field="second_subject" filter-field="second_subject.name" :show-filter-menu="false">
                    <template #body="{data}">
                        <div v-if="data.second_subject.grade.is_valid">
                            <div>
                                <p>{{data.second_subject.name}}</p>
                                <p v-if="this.testData.education_year !== 9">{{ data.second_subject.grade.val }}/20</p>
                                
                            </div>
                        </div>
                        <div v-else>
                            <p>
                                -   
                            </p>
                        </div>
                    </template>
                    <template #editor="{ data, field }" v-if="this.testData.education_year !== 9">
                        <InputText v-if="data.second_subject.name !== ''" v-model="data[field].grade.val" autofocus @change='addChanges(data, field)'/>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Поиск" />
                    </template>
                    </Column>
                    
                </DataTable>
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
import MyButton from '@/components/UI/MyButton.vue';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {FilterMatchMode} from 'primevue/api';
import axios from 'axios'
export default {
    components: {
        TopBar,
        BottomBar,
        MyButton,
        DataTable,
        Column
    },
    data() {
        return {
            gradeChanged: false,
            usersToUpdate: new Map(),
            testData: {},
            tdData: [
                {'column1': 'Класс тестирования', 'column2': ''},
                {'column1': 'Дата', 'column2': ''},
                {'column1': 'Время', 'column2': ''},
                {'column1': 'Место проведения', 'column2': ''},
                {'column1': 'Записано', 'column2': ''},
                {'column1': 'Присутствовало', 'column2': ''},
                {'column1': 'Мест всего', 'column2': ''},
                {'column1': 'Статус', 'column2': ''}
            ],
            config: {},
            usersData: [],
            statuses: [],
            roles: ['Администратор', 'Абитуриент'],
            attendanceStatuses: ['Присутствовал', 'Не присутствовал'],
            genders: ['Мужской', 'Женский'],
            education_years: [9, 10],
            profiles: [],
            subjects: [],
            foreign_languages: [],
            selectedColumns: ['ID', 'Информация о пользователе', 'Присутствие', 'Статус', 'Роль', 'Пол', 'Класс поступления',
                'Русский язык', 'Математика','Иностранный язык',
                'Профиль 1', 'Предмет профиля 1', 'Профиль 2', 'Предмет профиля 2'],
            columns: ['ID', 'Информация о пользователе', 'Присутствие','Статус', 'Роль', 'Пол', 'Класс поступления',
                'Русский язык', 'Математика','Иностранный язык',
                'Профиль 1', 'Предмет профиля 1', 'Профиль 2', 'Предмет профиля 2', 'Иностранный язык'],
            isLoading: false,
            filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'id': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
                'info': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'status': {value: null, matchMode: FilterMatchMode.IN},
                'role': {value: null, matchMode: FilterMatchMode.IN},
                'attendance': {value: null, matchMode: FilterMatchMode.IN},
                'gender': {value: null, matchMode: FilterMatchMode.IN},
                'education_year': {value: null, matchMode: FilterMatchMode.IN},
                'first_profile': {value: null, matchMode: FilterMatchMode.IN},
                'first_subject.name': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'second_profile': {value: null, matchMode: FilterMatchMode.IN},
                'second_subject.name': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'russian_language.grade.val': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
                'math.grade.val': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
                'foreign_language.name': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        }
    },
    
    methods: {
        addChanges(newData, field) {
            this.gradeChanged = true
            console.log(newData)
            let newDataVal = {
                'russian_language': newData.russian_language.grade,
                'math': newData.math.grade,
                'foreign_language': newData.foreign_language.grade,
                'first_subject': newData.first_subject.grade,
                'second_subject': newData.second_subject.grade,
            }
            newDataVal.russian_language.val = Number(newDataVal.russian_language.val)
            newDataVal.math.val = Number(newDataVal.math.val)
            newDataVal.foreign_language.val = Number(newDataVal.foreign_language.val)
            newDataVal.first_subject.val = Number(newDataVal.first_subject.val)
            newDataVal.second_subject.val = Number(newDataVal.second_subject.val)

            newDataVal[field].is_valid = true
            this.usersToUpdate.set(newData.id, newDataVal)
        },
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
                await this.$store.dispatch('setToken', token)
                this.config = {headers: {authorization: 'Bearer ' + token}}
            }
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
        async getTestDate(id) {
            let ans = {}
            await axios.get('td/byId/' + id, this.config)
            .then((res) => {
                ans = res.data
            })
            .catch((e) => {
                this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
            })
            return ans
        },
        async changeAttendance(data) {
            let res = (data.attendance === 'Присутствовал')
            await axios.post('td/setAttendance/' + data.id + '/' + this.testData.id + '/' + !res, {}, this.config)
            .then(() => {
                data.attendance = (!res) ? 'Присутствовал' : 'Не присутствовал';
            })
            .catch((e) => {
                this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
            })
        },
        async fetchData() {
            if (this.testData.education_year !== '') {
                this.tdData[0].column2 = this.testData.education_year
            }
            if (this.testData.date !== '') {
                this.tdData[1].column2 = this.testData.date
            }
            if (this.testData.time !== '') {
                this.tdData[2].column2 = this.testData.time
            }
            if (this.testData.location !== '') {
                this.tdData[3].column2 = this.testData.location
            }
            if (this.testData.registered_persons !== '') {
                this.tdData[4].column2 = this.testData.registered_persons
            }
            if (this.testData.attended_persons !== '') {
                this.tdData[5].column2 = this.testData.attended_persons
            }
            if (this.testData.max_persons !== '') {
                this.tdData[6].column2 = this.testData.max_persons
            }
            
            if (this.testData.pub_status !== '') {
                this.tdData[7].column2 = (this.testData.pub_status === 'shown') ? 'Открыто' : 'Скрыто'
            }
        },

        async fetchUsersData() {
            let body = {
                "test_date_ids": [this.testData.id]
            }
            await axios.post('user/list', body, this.config)
                .then((res) => {
                    console.log(res.data)
                    res.data.forEach((elem) => {
                    let tdindex = elem.test_dates.findIndex((val) => val.id === this.testData.id)
                    
                    this.usersData.push({
                        id: elem.id,
                        info: elem.fio+'\n'+elem.date_of_birth+'\n'+elem.email+'\n'+elem.phone_number+'\n'+elem.current_school,
                        fio: elem.fio,
                        date_of_birth: elem.date_of_birth,
                        email: elem.email,
                        phone_number: elem.phone_number,
                        current_school: elem.current_school,
                        status: elem.status.name,
                        role: (elem.role === 'admin') ? 'Администратор' : 'Абитуриент',
                        attendance: (elem.test_dates[tdindex].is_attended) ? 'Присутствовал' : 'Не присутствовал',
                        gender: (elem.gender === 'male') ? 'Мужской' : 'Женский',
                        education_year: elem.education_year,
                        first_profile: (elem.first_profile.name) ? elem.first_profile.name : 'Не выбран',
                        first_subject: (elem.first_profile_subject.name) ? {'name': elem.first_profile_subject.name, 'grade': elem.test_dates[tdindex].first_profile_grade} : {name: '', grade: {val: 0, is_valid: false}},
                        second_profile: (elem.second_profile.name) ? elem.second_profile.name : 'Не выбран',
                        second_subject: (elem.second_profile_subject.name) ? {'name': elem.second_profile_subject.name, 'grade': elem.test_dates[tdindex].second_profile_grade} : {name: '', grade: {val: 0, is_valid: false}},
                        russian_language: {'name': 'Русский язык', 'grade': elem.test_dates[tdindex].russian_language_grade},
                        math: {'name': 'Математика', 'grade': elem.test_dates[tdindex].math_grade},
                        foreign_language: (elem.foreign_language.name) ? {'name': elem.foreign_language.name, 'grade': elem.test_dates[tdindex].foreign_language_grade} : {name: '', grade: {val: 0, is_valid: false}}
                    })
                    })
                    console.log(this.usersData)
                })
                .catch((e)=> {
                    console.log(e)
                    this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
                });
        },
        async fetchStatuses() {
            await axios.post('user/listStatuses', {}, this.config)
                .then((res) => {
                    this.statuses = res.data
                })
                .catch((e)=> {
                    this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
                });
            },
        async fetchProfiles() {
            await axios.get('profiles/list', this.config)
                .then((res) => {
                    this.profiles = res.data
                    this.profiles.unshift({id: 0, name: 'Не выбран'})
                })
                .catch((e)=> {
                    this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
                });
            },
        async fetchSubjects() {
            await axios.post('subjects/list', {}, this.config)
                .then((res) => {
                    this.subjects = res.data
                    this.subjects.unshift({id: 0, name: 'Не выбран'})
                })
                .catch((e)=> {
                    this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
                });
            },
        async fetchForeignLanguages() {
            await axios.get('fl/list', this.config)
                .then((res) => {
                    this.foreign_languages = res.data
                    this.foreign_languages.unshift({id: 0, name: 'Не выбран'})
                })
                .catch((e)=> {
                    this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
                });
            },
        checkColumnChosen(name) {
            return this.selectedColumns.includes(name)
        },
        rowClick(event) {
            this.$router.push('/profile/users/'+ event.data.id)
        },
        async changePubStatus() {
            let newStatus = ''
            if (this.testData.pub_status === 'hidden') {
                newStatus = 'shown'
            } else {
                newStatus = 'hidden'
            }
            await axios.post('td/setStatus/'+this.testData.id+'/'+newStatus, {}, this.config)
            .then(() => {
                this.testData.pub_status = newStatus
                this.tdData[7].column2 = (this.testData.pub_status === 'shown') ? 'Открыто' : 'Скрыто'
            })
            .catch((e) => {
                this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
            })
        },
        async updatingProcess() {
            let hasErrors = false
            for (const [key, value] of this.usersToUpdate) {
                
                let reqBody = {
                    "user_id": key,
                    "test_date_id": this.testData.id,
                    "russian_language_grade": value.russian_language,
                    "math_grade": value.math,
                    "foreign_language_grade": value.foreign_language,
                    "first_profile_grade": value.first_subject,
                    "second_profile_grade": value.second_subject
                }
                //console.log(reqBody)
                await axios.post('exams/setGrades', reqBody,this.config)
                .then(() => {
                    
                })
                .catch((e) => {
                    hasErrors = true
                    this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
                })
            }
            return hasErrors
        },
        async updateGrades() {
            const hasErrors = await this.updatingProcess()
            
            if (!hasErrors) {
               this.$router.go()
            }
        },
        async downloadReg() {
            await axios.get('td/regList/' + this.testData.id, this.config)
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
        async downloadExcel() {
            await axios.get('td/export/' + this.testData.id, this.config)
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
        this.testData = await this.getTestDate(this.$route.params.id)
        await this.fetchData()
        await this.fetchUsersData()
        await this.fetchStatuses()
        await this.fetchProfiles()
        await this.fetchSubjects()
        await this.fetchForeignLanguages()
    }
}
</script>

<style scoped> 
::v-deep(.grey) {
    background-color: #F8F9FA !important;
}
::v-deep(thead) {
    display: none;
}
::v-deep(.uData) {
    height: auto;
    background-color: #fff;
}

.tool-button {
    margin: 1rem
}
</style>