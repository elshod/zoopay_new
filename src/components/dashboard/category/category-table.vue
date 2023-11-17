<template>
    <q-table
        :rows="list"
        :columns="columns"
        flat
        bordered
    >
        <template v-slot:body="props">            
            <q-tr :props="props">
                <q-td key="index" :props="props">
                    {{ props.row.index + 1 }}
                </q-td>
                <q-td key="categories_uz" :props="props">
                    {{ props.row.categories.find(item => item.language == 'uz').title || '' }}
                </q-td>
                <q-td key="categories_ru" :props="props">
                    {{ props.row.categories.find(item => item.language == 'ru').title || '' }}
                </q-td>
                <q-td key="categories_en" :props="props">
                    {{ props.row.categories.find(item => item.language == 'en').title || '' }}
                </q-td>
                <q-td key="createdAt" :props="props">
                    {{ convertDate(props.row.createdAt) }}
                </q-td>
                <q-td key="createdAt" :props="props">
                    <q-btn 
                        @click="changeStatus(props.row._id)"
                        size="10px"
                        :icon="props.row.status == 1 ? 'done' : 'close'"
                        unelevated
                        :color="props.row.status == 1 ? 'green-10' : 'yellow-10'"
                        /> 
                </q-td>
                <q-td key="btns" :props="props">
                    <q-btn 
                        @click="openDialog(props.row._id)"
                        size="10px"
                        icon="delete"
                        unelevated
                        color="red-5"
                        /> 
                </q-td>
            </q-tr>
            
        </template>
    </q-table>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="help_outline" color="red-5" text-color="white" />
          <span class="q-ml-sm">Ma'lumotni o'chirmoqchisiz! Qaroringiz qat'iymi?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Bekor qilish" color="primary" v-close-popup />
          <q-btn  label="O`chirish" unelevated @click="remove()" color="red-5" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
import {computed, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {categoryStore} from '@/stores/data/category'
import {convertDate} from '@/stores/utils/func'
const store = categoryStore()
const {categorys} = storeToRefs(store)

const changeStatus = (_id) => {
    store.change_status(_id)
}

const confirm = ref(false)
const id = ref('')

const openDialog = (_id) => {
    id.value = _id
    confirm.value = true
}

const remove = () => {
    store.delete_category(id.value)
}




const list = computed(()=>{
    
    return categorys.value.map((val,index) => {
        val.index = index
        return val
    })
})

const columns = [
    {
        name:'index',
        label:'№',
        align:'left',
        headerStyle: 'width:100px'
    },
    {
        name:'categories_uz',
        label:'Kategoriy nomi',
        align:'left',
    },
    {
        name:'categories_ru',
        label:'Название категории',
        align:'left',
    },
    {
        name:'categories_en',
        label:'Category name',
        align:'left',
    },
    {
        name:'createdAt',
        label:'Yaratilgan vaqti',
        field:'createdAt',
        align:'left',
        headerStyle: 'width: 200px',
    },
    {
        name:'status',
        label:'Holati',
        field:'status',
        align:'left',
        headerStyle: 'width: 200px',
    },
    {
        name:'btns',
        label:'',
        field:'btns',
        align:'left',
        headerStyle: 'width: 200px',
    }
]




</script>

<style>

</style>