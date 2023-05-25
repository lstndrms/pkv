<template>
    <TopBar/>
    <Toast/>
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-lg-6">
          <div class="profile">
            <p>
              <span class="text-xl font-bold">Создать рассылку</span>
            </p>
            <p>
              <span class="font-bold">Выбрать получателей</span>
            </p>
            <MultiSelect v-model="this.selectedUsers" :options="this.usersData" filter optionLabel="fio" placeholder="Выбрать получателей" class="multi"/>
            <p>
              <span class="font-bold">Тема рассылки</span>
            </p>
            <InputText type="text" v-model="title" />
            <p>
              <span class="font-bold">Текст рассылки</span>
            </p>
            <Textarea v-model="message" autoResize rows="5" cols="30"/>
            <MyButton class="send-btn" @click="sendEmail">Отправить</MyButton>
          </div>  
        </div>
      </div>
    </div>
    <BottomBar/>
  </template>
  
  <script>
  import TopBar from "@/components/UI/TopBar.vue";
  import BottomBar from "@/components/UI/BottomBar.vue";
  import {FilterMatchMode} from 'primevue/api';
  import axios from "axios";
  import MultiSelect from 'primevue/multiselect';
  import Textarea from 'primevue/textarea';
  import InputText from 'primevue/inputtext';
  import MyButton from "@/components/UI/MyButton.vue"
  export default {
    name: "UserList",
    components: {
      TopBar,
      BottomBar,
      MultiSelect,
      Textarea,
      InputText,
      MyButton
    },
    data() {
      return {
        headerConfig: {},
        usersData: [],
        selectedUsers: [],
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
        },
        message: "",
        title: ""
      }
    },
    methods: {
      async sendEmail() {
        let uids = []
        this.selectedUsers.forEach((element) => uids.push(element.id))
        let body = {
          user_ids: uids,
          topic: this.title,
          message: this.message
        }
        await axios.post('notifications/create', body, this.headerConfig)
          .then((res) => {
            if (res.status === 200) {
              this.$toast.add({severity:'success', summary: 'Письма успешно высланы', detail:'', life: 5000});
            }
          })
          .catch((e) => {
            if(e.response.status === 401) {
                this.$router.push('/login')
              } else {
                this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
              }
          })
          this.$router.go()
      },
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
        await axios.get('user/me', this.headerConfig)
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
        await axios.post('user/list', {}, this.headerConfig)
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
                  foreign_language: (elem.foreign_language.name) ? elem.foreign_language.name : 'Не выбран'
                })
              })
            })
            .catch((e)=> {
              this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
            });
            
      },
      async fetchStatuses() {
        await axios.post('user/listStatuses', {}, this.headerConfig)
            .then((res) => {
              this.statuses = res.data
            })
            .catch((e)=> {
              this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
            });
      },
      async fetchProfiles() {
        await axios.get('profiles/list', this.headerConfig)
            .then((res) => {
              this.profiles = res.data
              this.profiles.unshift({id: 0, name: 'Не выбран'})
            })
            .catch((e)=> {
              this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
            });
      },
      async fetchSubjects() {
        await axios.post('subjects/list', {}, this.headerConfig)
            .then((res) => {
              this.subjects = res.data
              this.subjects.unshift({id: 0, name: 'Не выбран'})
            })
            .catch((e)=> {
              this.$toast.add({severity:'error', summary: 'Error '+e.response.status, detail:e.response.data.message, life: 5000});
            });
      },
      async fetchForeignLanguages() {
        await axios.get('fl/list', this.headerConfig)
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
  ::v-deep(.grey) {
      background-color: #f5f5f5!important;
  }
  ::v-deep(thead) {
      display: none;
  }
  .p-multiselect {
      max-width: 100%;
    }
    .container {
      margin-top: 30px;
    }
  .profile {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-bottom: 40px;
    background-color: rgba(255, 255, 255, 1);
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, .2));
    border-radius: 20px;
    padding: 50px;
}
.multi {
  margin-top: 20px;
  margin-bottom: 30px;
}
.p-inputtextarea {
  width: 100%;
}
.send-btn {
  width: 100px;
  margin-top: 30px;
}
</style>