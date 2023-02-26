<template>
    <TopBar/>
    <div class="container">
        <div class="row">
            <div id="content" class="w-12 mt-4 mx-auto" style="margin-bottom: 100px;">
                <div id="my-tds" class="flex align-items-center justify-content-between" style="margin-bottom: 20px;margin-top: 30px;">
                    <span class="text-xl font-bold ml-6">Персональные данные</span>
                </div>
                <DataTable :value="tdData" editMode="cell" @cell-edit-complete="onCellEditComplete" class="editable-cells-table" responsiveLayout="scroll">
                    <Column class="w-50" field="column1"></Column>
                    <Column class="w-50" field="column2">
                        <template #editor="{ data, field }">
                            <InputText v-model="data[field]" autofocus />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
    <BottomBar/>
</template>

<script>
import TopBar from '@/components/UI/TopBar.vue'
import BottomBar from '@/components/UI/BottomBar.vue'
import DataTable from "primevue/datatable";
import Column from "primevue/column";
//import axios from 'axios'

export default {
    components: {
        TopBar,
        BottomBar,
        DataTable,
        Column,
    },
    data() {
        return {
            changed: false,
            changedFields: {
                'year': false,
                'status': false,
                'profile1': false,
                'subject1': false,
                'profile2': false,
                'subject2': false,
                'language': false,
            },
            tdData: [
            {'column1': 'Код участника', 'column2': 'Не выбрано'},
            {'column1': 'Роль', 'column2': 'Не выбрано'},
            {'column1': 'ФИО', 'column2': 'Не выбрано'},
            {'column1': 'Дата рождения', 'column2': 'Не выбрано'},
            {'column1': 'Пол', 'column2': 'Не выбрано'},
            {'column1': 'Адрес эл.почты', 'column2': 'Не выбрано'},
            {'column1': 'Контакный телефон', 'column2': 'Не выбрано'},
            {'column1': 'Номер законного представителя', 'column2': 'Не выбрано'},
            {'column1': 'Номер и/или название нынешней школы', 'column2': 'Не выбрано'}
            ],
        }
    }
}
</script>

<style scoped>

</style>