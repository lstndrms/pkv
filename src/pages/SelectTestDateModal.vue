<template>
  <div>
    <ConfirmPopup/>

    <DataTable :value="testDates" responsive-layout="scroll">
      <Column field="date" header="Дата"/>
      <Column field="time" header="Время"/>
      <Column field="location" header="Место проведения"/>
      <Column field="available" header="Мест осталось"/>
      <Column field="available" header="Мест осталось">
        <template #body="slotProps">
          <Button @click="selectTestDate(slotProps.data, $event)" label="Записаться на тестирование" class="p-button-rounded p-button-secondary p-button-text text-0 surface-600" />
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
export default {
  name: "SelectTestDateModal",
  components: [
      DataTable,
      Column,
      Button,
      ConfirmPopup
  ],
  data() {
    return {
      testDates: [
        {id: 1, date: '01.02.2023', time: '10:00', location: 'Большой Трехсвятительский переулок, д.4', available: 14}
      ]
    }
  },
  methods: {
    selectTestDate(data, event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Вы хотите записаться на выбранное тестирование?',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: () => {
          // this.$toast.add({severity:'info', summary:'Confirmed', detail:'Record deleted', life: 3000});
        },
      })
    }
  }
}
</script>

<style scoped>

</style>