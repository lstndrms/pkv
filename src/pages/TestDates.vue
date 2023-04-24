<template>
  <Toast />
  <DynamicDialog />
  <div v-if="userRole === 'admin'" id="content-admin" class="w-12 mt-4 mx-auto" style="height: calc(100vh - 195px)">
    <div id="my-tds" class="flex align-items-center justify-content-between mb-3">
      <span class="text-xl font-bold ml-6">Тестирования</span>
      <my-button class="tool-button" @click="showTestCreateForm">Создать тестирование</my-button>
      <!--<Button @click="showTestCreateForm" label="Создать тестирование" class="p-button-rounded p-button-secondary p-button-text text-0 surface-600" />-->
    </div>
    <DataTable :value="adminTdData" :scrollable="true" scroll-height="flex" scrollDirection="both" show-gridlines responsive-layout="scroll" @row-dblclick="rowClick($event)">
      <template #empty>
          Тестирования не найдены
      </template>
      <Column class="w-1" header="ID" field="id"/>
      <Column class="w-1" header="Дата" field="date"/>
      <Column class="w-1" header="Время" field="time"/>
      <Column class="w-2" header="Место проведения" field="location"/>
      <Column class="w-1" header="Записано" field="registered_persons"/>
      <Column class="w-1" header="Мест всего" field="max_persons"/>
      <Column class="w-1" header="Класс" field="education_year"/>
      <Column class="w-1 flex align-items-center flex-column" header="Публикация" field="pub_status">
        <template #body="slotProps">
          <ProgressSpinner v-if="slotProps.data.isLoading" class="w-25 h-25 " :aria-label="'td'+slotProps.data.id"/>
          <my-button v-if="!slotProps.data.isLoading" @click="changePubStatus(slotProps.data)">{{ this.mapPubStatusButtonLabel(slotProps.data.pub_status) }}</my-button>
          <!--<Button v-if="!slotProps.data.isLoading" @click="changePubStatus(slotProps.data)" :label=this.mapPubStatusButtonLabel(slotProps.data.pub_status) class="p-button-rounded p-button-secondary p-button-text text-0 surface-600" />-->
        </template>
      </Column>
    </DataTable>
  </div>
  <div v-if="userRole === 'user'" id="content-user" class="w-12 mt-4 mx-auto">
    <div id="my-tds" class="flex align-items-center justify-content-between mb-3">
      <span class="text-xl font-bold ml-6">Мои тестирования</span>
      <my-button class="tool-button" @click="showTestDateSelection">Записаться на тестирование</my-button>
    </div>
    <div class="test-dates-container" v-for="test of this.tests" :key="test">
        <!---->
        <DataTable :value="test" show-gridlines responsiveLayout="scroll" :row-class="rowClass">
        <Column class="w-50" field="column1"></Column>
        <Column class="w-50" field="column2" ></Column>
        </DataTable><!---->
    </div>
  </div>
  <div v-if="(userRole === 'user') && (this.showResults === true)" id="content-user" class="w-12 mt-4 mx-auto res-history">
    <div id="my-tds" class="flex align-items-center justify-content-between mb-3">
      <span class="text-xl font-bold ml-6">Мои результаты</span>
    </div>
    <DataTable :value="this.grades" show-gridlines responsiveLayout="scroll" :row-class="rowClass">
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
</template>

<script>
import { h } from 'vue';

import DataTable from "primevue/datatable";
import Button from "primevue/button";
import Column from "primevue/column";
import DynamicDialog from "primevue/dynamicdialog";
import SelectTestDateModal from "@/pages/SelectTestDateModal.vue";
import CreateTestDateFormModal from "@/pages/CreateTestDateFormModal.vue";
import axios from "axios";
import MyButton from '@/components/UI/MyButton.vue'
export default {
  name: "TestDates",
  components: {
    DataTable,
    Column,
    DynamicDialog,
    MyButton
  },
  data() {
    return {
      showResults: false,
      userRole: '',
      config: {
          headers: {
              authorization: 'Bearer ' + this.$store.getters.TOKEN
          }
      },
      tdData: [
        {'column1': 'Дата', 'column2': 'Не выбрано'},
        {'column1': 'Время', 'column2': 'Не выбрано'},
        {'column1': 'Место проведения', 'column2': 'Не выбрано'}
      ],
      adminTdData: [
      ],
      profileData : [
        {'column1': 'Профиль 1', 'column2': 'Не выбрано'},
        {'column1': 'Предмет профиля', 'column2': 'Не выбрано'},
        {'column1': 'Профиль 2', 'column2': 'Не выбрано'},
        {'column1': 'Предмет профиля', 'column2': 'Не выбрано'},
        {'column1': 'Иностранный язык', 'column2': 'Не выбрано'},
      ],
      userData: {},
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
            is_admin: false, 
            user_yod: 0,
            user_id: 0
        }
      })
    },
    showTestCreateForm() {
      this.$dialog.open(CreateTestDateFormModal, {
        props: {
          header: 'Создать тестирование',
          style: {
            width: '65vw',
          },
          breakpoints:{
            '960px': '75vw',
            '640px': '90vw'
          },
          modal: true,
        },
        onClose: (options) => {
          const data = options.data;
          if (data.err) {
            this.$toast.add({severity:'error', summary: 'Error '+data.err.status, detail:data.err.message, life: 5000});
          } else {
            this.$router.go()
          }
        }
      })
    },
    rowClass() {
      return 'grey'
    },
    async fetchData() {
      let uData = this.userData
      const ufp = this.$store.getters.USER_FIRST_PROFILE
      const usp = this.$store.getters.USER_SECOND_PROFILE
      const ufl = this.$store.getters.USER_FOREIGN_LANGUAGE
      const ufs = this.$store.getters.USER_FIRST_SUBJECT
      const uss = this.$store.getters.USER_SECOND_SUBJECT
      const utd = this.$store.getters.USER_TEST_DATE
      const u_td = uData.test_dates
      if (ufp.id !== 0) {
        this.profileData[0].column2 = ufp.name
      }
      if (ufs.id !== 0) {
        this.profileData[1].column2 = ufs.name
      }
      if (usp.id !== 0) {
        this.profileData[2].column2 = usp.name
      }
      if (uss.id !== 0) {
        this.profileData[3].column2 = uss.name
      }
      if (ufl.id !== 0) {
        this.profileData[4].column2 = ufl.name
      }
      if (utd.id !== 0) {
        this.tdData[0].column2 = utd.date
        this.tdData[1].column2 = utd.time
        this.tdData[2].column2 = utd.location
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
                if (val.has_results) {
                    const sumFirstProfile = (val.russian_language_grade.is_valid && val.math_grade.is_valid && val.foreign_language_grade.is_valid && val.first_profile_grade.is_valid)
                    const sumSecondProfile = (val.russian_language_grade.is_valid && val.math_grade.is_valid && val.foreign_language_grade.is_valid && val.second_profile_grade.is_valid)
                    this.grades.push(
                        {'column1': val.date, 'column2': 'Русский язык', 'column3': (val.russian_language_grade.is_valid) ? val.russian_language_grade.val : '-', 'column4': '10'},
                        {'column1': val.date, 'column2': 'Математика', 'column3': (val.math_grade.is_valid) ? val.math_grade.val : '-', 'column4': '10'},
                        {'column1': val.date, 'column2': 'Иностранный язык', 'column3': (val.foreign_language_grade.is_valid) ? val.foreign_language_grade.val : '-', 'column4': '10'},
                        {'column1': val.date, 'column2': uData.first_profile_subject.name, 'column3': (val.first_profile_grade.is_valid) ? val.first_profile_grade.val : '-', 'column4': '20'},
                        {'column1': val.date, 'column2': uData.second_profile_subject.name, 'column3': (val.second_profile_grade.is_valid) ? val.second_profile_grade.val : '-', 'column4': '20'},
                    )
                    if (sumFirstProfile) {
                      this.tests[this.tests.length - 1].push(
                        {'column1': 'Сумма по 1 профилю', 'column2': val.russian_language_grade.val + val.math_grade.val + val.foreign_language_grade.val + val.first_profile_grade.val},
                      )
                    } else {
                      this.tests[this.tests.length - 1].push(
                        {'column1': 'Сумма по 1 профилю', 'column2': '-'},
                      )
                    }
                    if (sumSecondProfile) {
                      this.tests[this.tests.length - 1].push(
                        {'column1': 'Сумма по 2 профилю', 'column2': val.russian_language_grade.val + val.math_grade.val + val.foreign_language_grade.val + val.second_profile_grade.val},
                      )
                    } else {
                      this.tests[this.tests.length - 1].push(
                        {'column1': 'Сумма по 2 профилю', 'column2': '-'},
                      )
                    }
                    this.showResults = true
                }
        })
      }
      console.log(this.tests)
    },
    checkUserRole() {
      this.userRole = this.$store.getters.USER.role
    },
    mapPubStatusButtonLabel(status) {
      if (status === 'hidden') {
        return 'Скрыто'
      } else {
        return 'Открыто'
      }
    },
    async changePubStatus(data) {
      const config = {
        headers: {
          authorization: 'Bearer ' + this.$store.getters.TOKEN
        }
      }
      data.isLoading = true
      let newStatus = ''
      if (data.pub_status === 'hidden') {
        newStatus = 'shown'
      } else {
        newStatus = 'hidden'
      }
      await axios.post('td/setStatus/'+data.id+'/'+newStatus, {}, config)
          .then(() => {
            data.pub_status = newStatus
          })
          .catch((e) => {
            this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
          })
      data.isLoading = false
    },
    rowClick(event) {
      this.$router.push('/tds/'+ event.data.id)
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
        let ans = {}
        await axios.get('user/me', this.config)
            .then((res) => {
            if(res.status === 200) {
                ans = res.data
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
        return ans
    },
  },
  async mounted() {
    await this.setToken()
    this.userData = await this.checkUser()

    this.checkUserRole()
    if (this.userRole === 'admin') {
      await axios.post('td/list',{}, this.config)
          .then((res) => {
            this.adminTdData = res.data
          })
          .catch((e) => {
            this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
          })
    }
    await this.fetchData()
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
  ::v-deep(.p-button) {
      background-color: #EFBFBE;
  }
  ::v-deep(.p-button:hover) {
      background-color: #F59797;
  }
  .tool-button {
    background-color: #B7C4D9;filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .2));
  }
  .res-history {
    margin-bottom: 100px;
  }
  .test-dates-container {
    margin-bottom: 30px;
}
</style>
