<template>
  <div>
    <ConfirmPopup/>
<!--    <Toast position="top-right" group="tr"/>-->

    <DataTable :lazy="true" :loading="isLoading" :value="testDates" responsive-layout="scroll">
      <Column field="date" header="Дата"/>
      <Column field="time" header="Время"/>
      <Column field="location" header="Место проведения"/>
      <Column field="available" header="Мест осталось"/>
      <Column field="available">
        <template #body="slotProps">
          <Button @click="selectTestDate(slotProps.data, $event)" label="Выбрать" class="p-button-rounded p-button-secondary p-button-text text-0 surface-600" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import ConfirmPopup from "primevue/confirmpopup";
import Toast from "primevue/toast";
import axios from "axios";
export default {
  name: "SelectTestDateModal",
  inject: ['dialogRef'],
  components: [
      DataTable,
      Column,
      Button,
      ConfirmPopup,
      Toast
  ],
  data() {
    return {
      isLoading: false,
      testDates: [
        {
          id: 228,
          date: "23.02.2023",
          time: "10:30",
          location: "г.Москва ул. Академика Волгина 13",
          registered_persons: 0,
          max_persons: 100,
          education_year: 10,
          pub_status: "shown"
        }
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
          await axios.post('http://localhost:5000/td/signUpMe/'+data.id, {}, config)
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

    await axios.get('http://localhost:5000/td/listAvailable', config)
        .then((res) => {
          if(res.status === 200) {
            this.$store.dispatch('setAvailableTestDates', res.data)
          }
        })
        .catch((e)=> {
          console.log('serverError: '+e.error)
        })

    this.fetchData()
    this.isLoading = false
  }
}
</script>

<style scoped>

</style>