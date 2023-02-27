<template>
  <div>
    <ConfirmPopup message="Подтвердить"/>
<!--    <Toast position="top-right" group="tr"/>-->
    <DataTable :lazy="true" :loading="isLoading" :value="testDates" responsive-layout="scroll">
      <Column field="date" header="Дата"/>
      <Column field="time" header="Время"/>
      <Column field="location" header="Место проведения"/>
      <Column field="available" header="Мест осталось"/>
      <Column field="available">
        <template #body="slotProps">
          <my-button class="popup-sub-btn" @click="{if(this.dialogRef.data.is_admin) {selectTestDateAdmin(slotProps.data, $event);} else {selectTestDate(slotProps.data, $event)}}">Выбрать</my-button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import MyButton from '@/components/UI/MyButton.vue'
import ConfirmPopup from "primevue/confirmpopup";
import axios from "axios";
export default {
  name: "SelectTestDateModal",
  inject: ['dialogRef'],
  components: {
      DataTable,
      Column,
      MyButton,
      ConfirmPopup,
  },
  data() {
    return {
      isLoading: false,
      testDates: [
      ]
    }
  },
  methods: {
    async selectTestDate(data, event) {
      let config = {
        headers: {
          authorization: 'Bearer ' + await this.$store.getters.TOKEN
        }
      }

      this.$confirm.require({
        target: event.currentTarget,
        message: 'Вы хотите записаться на выбранное тестирование?',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Да',
        rejectLabel: 'Нет',
        accept: async () => {
          data.isChosen = true
          this.isLoading = true
          await axios.post('td/signUpMe/'+data.id, {}, config)
              .then(() => {
                this.isLoading = false
                this.dialogRef.close(data)
              })
              .catch((e)=> {
                data.isError = true
                data.error = e.response.data
                this.dialogRef.close(data)
              })
        },
      })
    },
    async selectTestDateAdmin(data, event) {
      let config = {
        headers: {
          authorization: 'Bearer ' + await this.$store.getters.TOKEN
        }
      }

      this.$confirm.require({
        target: event.currentTarget,
        message: 'Записать на выбранное тестирование?',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Да',
        rejectLabel: 'Нет',
        accept: async () => {
          data.isChosen = true
          this.isLoading = true
          await axios.post('td/signUpUser/' + this.dialogRef.data.user_id +'/' +data.id, {}, config)//user_id, td_id
              .then(() => {
                this.isLoading = false
                this.dialogRef.close(data)
              })
              .catch((e)=> {
                data.isError = true
                data.error = e.response.data
                this.dialogRef.close(data)
              })
        },
      })
    },
    fetchData() {
      const atds = this.$store.getters.USER_AVAILABLE_TEST_DATES
      if (atds.length) {
        this.testDates = atds
      }
      for (let i = 0; i < this.testDates.length; i++) {
        this.testDates[i].available = this.testDates[i].max_persons - this.testDates[i].registered_persons
      }
    },
    // async chooseDate(id) {
    //
    // }
  },
  async mounted() {
    this.isLoading = true
    let config = {
      headers: {
        authorization: 'Bearer ' + await this.$store.getters.TOKEN
      }
    }

    if(this.dialogRef.data.is_admin){
      await axios.post('td/list',{education_year: this.dialogRef.data.user_yod}, config)
        .then((res) => {
          if(res.status === 200) {
            this.$store.dispatch('setAvailableTestDates', res.data)
          }
        })
        .catch((e)=> {
          console.log('serverError: '+e.error)
        })
    } else {
        await axios.get('td/listAvailable', config)
          .then((res) => {
            if(res.status === 200) {
              this.$store.dispatch('setAvailableTestDates', res.data)
            }
          })
          .catch((e)=> {
            console.log('serverError: '+e.error)
          })
    }

    this.fetchData()
    this.isLoading = false
  }
}
</script>

<style scoped>
.popup-sub-btn {
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .2));
}
</style>