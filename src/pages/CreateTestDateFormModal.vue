<template>
  <div v-if="loadingContent">
    <ProgressSpinner aria-label="Basic ProgressSpinner" />
  </div>
  <div v-else id="ctd-container">
    <div class="w-80">
      <span class="ml-4">Класс тестирования</span>
      <div class="flex align-items-center justify-content-around w-25 mt-1">
        <div class="field-radiobutton">
          <RadioButton input-id="class9" name="9" value=9 v-model="education_year"/>
          <label for="class9">9</label>
        </div>
        <div class="field-radiobutton">
          <RadioButton input-id="class10" name="10" value=10 v-model="education_year"/>
          <label for="class10">10</label>
        </div>
      </div>
      <span class="ml-4 mt-3">Дата тестирования</span>
      <div class="field col-12 md:col-4 ml-3">
        <Calendar inputId="tdDate" v-model="dateString" :min-date="new Date()" autocomplete="off" date-format="dd.mm.yy" placeholder="ДД.ММ.ГГГГ"/>
      </div>
      <span class="ml-4 mt-3">Время начала</span>
      <div class="field col-12 md:col-4 ml-3">
        <Calendar inputId="tdTime" v-model="timeString" autocomplete="off" :time-only="true" hour-format="24" time-separator=":" placeholder="00:00" />
      </div>
      <span class="ml-4 mt-3">Место проведения</span>
      <div class="ml-4 mt-1 mb-3">
        <div v-for="loc in commonTdLocations" :key="loc.id" class="field-radiobutton">
          <RadioButton :input-id="'locrb'+loc.id" :name="loc.id.toString()" :value=loc.name v-model="location"/>
          <label :for="'locrb'+loc.id">{{loc.name}}</label>
        </div>
        <div class="field-radiobutton">
          <RadioButton input-id="locrbother" name="other" :value="locationOther" v-model="location" />
          <label for="locrbother">Другое</label>
        </div>
        <InputText type="text" v-model="locationOther" placeholder="Другой адрес"/>
      </div>
      <span class="ml-4">Максимальное число сдающих</span>
      <div class="ml-4 mt-1">
        <InputNumber inputId="maxPersons" v-model="maxPersons" mode="decimal" :useGrouping="false" min="0" placeholder="200"/>
      </div>
      <div class="w-100 flex align-items-center justify-content-end">
        <Button @click="createTestDate" label="Submit" icon="pi pi-check" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CreateTestDateFormModal",
  inject: ['dialogRef'],
  data() {
    return {
      loadingContent: true,
      education_year: 9,
      dateString: '',
      timeString: '',
      location: 'Not selected',
      locationOther: '',
      maxPersons: 200,
      commonTdLocations: [
        {id: 1, name: 'Большой Трехсвятительский пер. д. 4'},
        {id: 2, name: 'Большой Казенный пер. д. 9'},
      ],
    }
  },
  methods: {
    async createTestDate() {
      this.loadingContent = true
      await new Promise(r => setTimeout(r, 2000));
      const config = {
        headers: {
          authorization: 'Bearer ' + this.$store.getters.TOKEN
        }
      }
      const RuDate = Intl.DateTimeFormat('ru')
      await axios.post('td/create', {
        date: RuDate.format(new Date(this.dateString)),
        time: this.timeString.getHours()+":"+(this.timeString.getMinutes() < 10 ? '0'+this.timeString.getMinutes() : this.timeString.getMinutes()),
        location: this.location,
        max_persons: Number(this.maxPersons),
        education_year: Number(this.education_year)
      }, config)
          .catch((e) => {
            this.dialogRef.close({err: e.response})
          })
      this.dialogRef.close()
      this.loadingContent = false
    },
    async loadCommonTdLocations() {
      const config = {
        headers: {
          authorization: 'Bearer ' + this.$store.getters.TOKEN
        }
      }
      await axios.get('td/listCommonLocations', config)
          .then((res) => {
            this.commonTdLocations = res.data
          })
          .catch((e) => {
            this.dialogRef.close({err: e.response})
          })
      this.loadingContent = false
    }

  },
  async mounted() {
    await this.loadCommonTdLocations()
  }
}
</script>

<style scoped>

</style>