<template>
  <TopBar/>
  <Toast/>
  <div class="container">
    <div class="row" style="height: calc(100vh - 105px)">
      <DataTable :value="usersData" data-key="id" v-model:filters="filters"
                 filter-display="row" :loading="isLoading"
                 :global-filter-fields="['id', 'info']" :scrollable="true" scroll-height="flex" scrollDirection="both" show-gridlines responsive-layout="scroll">
        <template #header>
          <div class="flex justify-content-between">
            <div style="text-align:left">
              <MultiSelect v-model="selectedColumns" :options="columns" @update:modelValue="onToggle"
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
        <Column v-if="this.checkColumnChosen('ID')" :show-filter-menu="false" field="id" header="ID" :sortable="true" class="w-2">
          <template #body="{data}">
            {{data.id}}
          </template>
          <template #filter="{filterModel, filterCallback}">
            <InputText @input="filterCallback" type="text" v-model="filterModel.value" :placeholder="`Поиск по ID- `"/>
          </template>
        </Column>
        <Column v-if="this.checkColumnChosen('Информация о пользователе')" :show-filter-menu="false" field="info" header="Информация о пользователе" :sortable="true" class="w-3">
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
        <Column v-if="this.checkColumnChosen('Статус')" class="w-3" header="Статус" :sortable="true" field="status" filter-field="status" :show-filter-menu="false">
          <template #body="{data}">
            {{data.status}}
          </template>
          <template #filter="{filterModel, filterCallback}">
            <MultiSelect v-model="filterModel.value" @change="filterCallback"
                         :options="statuses" option-label="name" option-value="name" class="p-column-filter" placeholder="Any">
              <template #option="slotProps">
                <div class="p-multiselect-representative-option"></div>
                {{slotProps.option.name}}
              </template>
            </MultiSelect>
          </template>
        </Column>
        <Column v-if="this.checkColumnChosen('Роль')" class="w-2" header="Роль" :sortable="true" filter-field="role" :show-filter-menu="false">
          <template #body="{data}">
            {{data.role}}
          </template>
          <template #filter="{filterModel, filterCallback}">
            <MultiSelect v-model="filterModel.value" @change="filterCallback"
                         :options="roles" class="p-column-filter" placeholder="Any">
              <template #option="slotProps">
                <div class="p-multiselect-representative-option"></div>
                {{slotProps.option}}
              </template>
            </MultiSelect>
          </template>
        </Column>
        <Column v-if="this.checkColumnChosen('Пол')" class="w-2" header="Пол" :sortable="true" filter-field="gender" :show-filter-menu="false">
          <template #body="{data}">
            {{data.gender}}
          </template>
          <template #filter="{filterModel, filterCallback}">
            <MultiSelect v-model="filterModel.value" @change="filterCallback"
                         :options="genders" class="p-column-filter" placeholder="Any">
              <template #option="slotProps">
                <div class="p-multiselect-representative-option"></div>
                {{slotProps.option}}
              </template>
            </MultiSelect>
          </template>
        </Column>
        <Column v-if="this.checkColumnChosen('Класс поступления')" class="w-2" header="Класс поступления" :sortable="true" filter-field="education_year" :show-filter-menu="false">
          <template #body="{data}">
            {{data.education_year}}
          </template>
          <template #filter="{filterModel, filterCallback}">
            <MultiSelect v-model="filterModel.value" @change="filterCallback"
                         :options="education_years" class="p-column-filter" placeholder="Any">
              <template #option="slotProps">
                <div class="p-multiselect-representative-option"></div>
                {{slotProps.option}}
              </template>
            </MultiSelect>
          </template>
        </Column>
        <Column v-if="this.checkColumnChosen('Профиль 1')" class="w-2" header="Профиль 1" :sortable="true" field="first_profile" filter-field="first_profile" :show-filter-menu="false">
          <template #body="{data}">
            {{data.first_profile}}
          </template>
          <template #filter="{filterModel, filterCallback}">
            <MultiSelect v-model="filterModel.value" @change="filterCallback"
                         :options="profiles" option-label="name" option-value="name" class="p-column-filter" placeholder="Any">
              <template #option="slotProps">
                <div class="p-multiselect-representative-option"></div>
                {{slotProps.option.name}}
              </template>
            </MultiSelect>
          </template>
        </Column>
        <Column v-if="this.checkColumnChosen('Предмет профиля 1')" class="w-2" header="Предмет профиля 1" :sortable="true" field="first_subject" filter-field="first_subject" :show-filter-menu="false">
          <template #body="{data}">
            {{data.first_subject}}
          </template>
          <template #filter="{filterModel, filterCallback}">
            <MultiSelect v-model="filterModel.value" @change="filterCallback"
                         :options="subjects" option-label="name" option-value="name" class="p-column-filter" placeholder="Any">
              <template #option="slotProps">
                <div class="p-multiselect-representative-option"></div>
                {{slotProps.option.name}}
              </template>
            </MultiSelect>
          </template>
        </Column>
        <Column v-if="this.checkColumnChosen('Профиль 2')" class="w-2" header="Профиль 2" :sortable="true" field="second_profile" filter-field="second_profile" :show-filter-menu="false">
          <template #body="{data}">
            {{data.second_profile}}
          </template>
          <template #filter="{filterModel, filterCallback}">
            <MultiSelect v-model="filterModel.value" @change="filterCallback"
                         :options="profiles" option-label="name" option-value="name" class="p-column-filter" placeholder="Any">
              <template #option="slotProps">
                <div class="p-multiselect-representative-option"></div>
                {{slotProps.option.name}}
              </template>
            </MultiSelect>
          </template>
        </Column>
        <Column v-if="this.checkColumnChosen('Предмет профиля 2')" class="w-2" header="Предмет профиля 2" :sortable="true" field="second_subject" filter-field="second_subject" :show-filter-menu="false">
          <template #body="{data}">
            {{data.second_subject}}
          </template>
          <template #filter="{filterModel, filterCallback}">
            <MultiSelect v-model="filterModel.value" @change="filterCallback"
                         :options="subjects" option-label="name" option-value="name" class="p-column-filter" placeholder="Any">
              <template #option="slotProps">
                <div class="p-multiselect-representative-option"></div>
                {{slotProps.option.name}}
              </template>
            </MultiSelect>
          </template>
        </Column>
        <Column v-if="this.checkColumnChosen('Иностранный язык')" class="w-2" header="Иностранный язык" :sortable="true" field="foreign_language" filter-field="foreign_language" :show-filter-menu="false">
          <template #body="{data}">
            {{data.foreign_language}}
          </template>
          <template #filter="{filterModel, filterCallback}">
            <MultiSelect v-model="filterModel.value" @change="filterCallback"
                         :options="foreign_languages" option-label="name" option-value="name" class="p-column-filter" placeholder="Any">
              <template #option="slotProps">
                <div class="p-multiselect-representative-option"></div>
                {{slotProps.option.name}}
              </template>
            </MultiSelect>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <BottomBar/>
</template>

<script>
import TopBar from "@/components/UI/TopBar.vue";
import BottomBar from "@/components/UI/BottomBar.vue";
import {FilterMatchMode} from 'primevue/api';
import axios from "axios";

export default {
  name: "UserList",
  components: {
    TopBar,
    BottomBar
  },
  data() {
    return {
      headerConfig: {},
      usersData: [],
      statuses: [],
      roles: ['Администратор', 'Абитуриент'],
      genders: ['Мужской', 'Женский'],
      education_years: [9, 10],
      profiles: [],
      subjects: [],
      foreign_languages: [],
      selectedColumns: ['ID', 'Информация о пользователе', 'Статус', 'Роль', 'Пол', 'Класс поступления',
        'Профиль 1', 'Предмет профиля 1', 'Профиль 2', 'Предмет профиля 2', 'Иностранный язык'],
      columns: ['ID', 'Информация о пользователе', 'Статус', 'Роль', 'Пол', 'Класс поступления',
        'Профиль 1', 'Предмет профиля 1', 'Профиль 2', 'Предмет профиля 2', 'Иностранный язык'],
      isLoading: false,
      filters: {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'id': {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        'info': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'status': {value: null, matchMode: FilterMatchMode.IN},
        'role': {value: null, matchMode: FilterMatchMode.IN},
        'gender': {value: null, matchMode: FilterMatchMode.IN},
        'education_year': {value: null, matchMode: FilterMatchMode.IN},
        'first_profile': {value: null, matchMode: FilterMatchMode.IN},
        'first_subject': {value: null, matchMode: FilterMatchMode.IN},
        'second_profile': {value: null, matchMode: FilterMatchMode.IN},
        'second_subject': {value: null, matchMode: FilterMatchMode.IN},
        'foreign_language': {value: null, matchMode: FilterMatchMode.IN},
      }
    }
  },
  methods: {
    async setToken() {
      const token = localStorage.getItem("token")
      if (token === null) {
        this.$router.push('/login')
      } else {
        await this.$store.dispatch('setToken', token)
        this.headerConfig = {headers: {authorization: 'Bearer ' + token}}
      }
    },
    async checkUser() {
      await axios.get('http://localhost:5000/user/me', this.headerConfig)
          .then((res) => {
            if(res.status === 200) {
              this.$store.dispatch('setUser', res.data)
            }
            if (res.data.role !== 'admin') {
              this.$router.push('/profile')
            }
          })
          .catch((e)=> {
            if(e.response.status === 401) {
              this.$router.push('/login')
            } else {
              this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
            }
          });
    },
    async fetchUsersData() {
      await axios.post('http://localhost:5000/user/list', {}, this.headerConfig)
          .then((res) => {
            res.data.forEach((elem) => {
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
                gender: (elem.gender === 'male') ? 'Мужской' : 'Женский',
                education_year: elem.education_year,
                first_profile: (elem.first_profile.name) ? elem.first_profile.name : 'Не выбран',
                first_subject: (elem.first_profile_subject.name) ? elem.first_profile_subject.name : 'Не выбран',
                second_profile: (elem.second_profile.name) ? elem.second_profile.name : 'Не выбран',
                second_subject: (elem.second_profile_subject.name) ? elem.second_profile_subject.name : 'Не выбран',
                foreign_language: (elem.second_profile_subject.name) ? elem.second_profile_subject.name : 'Не выбран'
              })
            })
          })
          .catch((e)=> {
            this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
          });
    },
    async fetchStatuses() {
      await axios.post('http://localhost:5000/user/listStatuses', {}, this.headerConfig)
          .then((res) => {
            this.statuses = res.data
          })
          .catch((e)=> {
            this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
          });
    },
    async fetchProfiles() {
      await axios.get('http://localhost:5000/profiles/list', this.headerConfig)
          .then((res) => {
            this.profiles = res.data
            this.profiles.unshift({id: 0, name: 'Не выбран'})
          })
          .catch((e)=> {
            this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
          });
    },
    async fetchSubjects() {
      await axios.post('http://localhost:5000/subjects/list', {}, this.headerConfig)
          .then((res) => {
            this.subjects = res.data
            this.subjects.unshift({id: 0, name: 'Не выбран'})
          })
          .catch((e)=> {
            this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
          });
    },
    async fetchForeignLanguages() {
      await axios.get('http://localhost:5000/fl/list', this.headerConfig)
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
    }
  },
  async mounted() {
    await this.setToken()
    await this.checkUser()
    await this.fetchUsersData()
    await this.fetchStatuses()
    await this.fetchProfiles()
    await this.fetchSubjects()
    await this.fetchForeignLanguages()
  }
}
</script>

<style scoped>
  .p-multiselect {
    max-width: 15rem;
  }
</style>