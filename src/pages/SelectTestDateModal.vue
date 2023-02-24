<template>
  <div>
    <ConfirmPopup/>

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
export default {
  name: "SelectTestDateModal",
  inject: ['dialogRef'],
  components: [
      DataTable,
      Column,
      Button,
      ConfirmPopup
  ],
  data() {
    return {
      isLoading: false,
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
        acceptLabel: 'Да',
        rejectLabel: 'Нет',
        accept: async () => {
          data.isChosen = true
          this.isLoading = true
          await new Promise(r => setTimeout(r, 2000));
          this.dialogRef.close(data)
        },
      })
    }
  }
}
</script>

<style scoped>

</style>