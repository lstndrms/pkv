<template>
  <TopBar/>
  <DynamicDialog />
  <Toast />
  <div id="content" class="w-10 mt-4 mx-auto">
    <div id="my-tds" class="flex align-items-center justify-content-between mb-3">
      <span class="text-xl font-bold ml-6">Мои тестирования</span>
      <Button @click="showTestDateSelection" label="Записаться на тестирование" class="p-button-rounded p-button-secondary p-button-text text-0 surface-600" />
    </div>
    <DataTable :value="tdData" show-gridlines responsiveLayout="scroll" :row-class="rowClass">
      <Column class="w-50" field="column1"></Column>
      <Column class="w-50" field="column2" ></Column>
    </DataTable>
    <DataTable :value="profileData" show-gridlines responsiveLayout="scroll">
      <Column class="w-50" field="column1"></Column>
      <Column class="w-50" field="column2" ></Column>
    </DataTable>
  </div>
</template>

<script>
import { h } from 'vue';

import TopBar from "@/components/UI/TopBar.vue";
import DataTable from "primevue/datatable";
import Button from "primevue/button";
import Column from "primevue/column";
import DynamicDialog from "primevue/dynamicdialog";
import SelectTestDateModal from "@/pages/SelectTestDateModal.vue";
import axios from "axios";
export default {
  name: "TestDates",
  components: {
    TopBar,
    DataTable,
    Column,
    DynamicDialog
  },
  data() {
    return {
      tdData: [
        {'column1': 'Дата', 'column2': 'Не выбрано'},
        {'column1': 'Время', 'column2': 'Не выбрано'},
        {'column1': 'Место проведения', 'column2': 'Не выбрано'}
      ],
      profileData : [
        {'column1': 'Профиль 1', 'column2': 'Не выбрано'},
        {'column1': 'Предмет профиля', 'column2': 'Не выбрано'},
        {'column1': 'Профиль 2', 'column2': 'Не выбрано'},
        {'column1': 'Предмет профиля', 'column2': 'Не выбрано'},
        {'column1': 'Иностранный язык', 'column2': 'Не выбрано'},
      ],
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
            }
          }
        }
      })
    },
    rowClass() {
      return 'grey'
    },
    async fetchData() {
      const ufp = this.$store.getters.USER_FIRST_PROFILE
      const usp = this.$store.getters.USER_SECOND_PROFILE
      const ufl = this.$store.getters.USER_FOREIGN_LANGUAGE
      const ufs = this.$store.getters.USER_FIRST_SUBJECT
      const uss = this.$store.getters.USER_SECOND_SUBJECT
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
</style>