<template>
    <q-table
        :rows="list"
        :columns="columns"
        flat
        bordered
        hide-pagination
        :pagination="{
            rowsPerPage: 20,
            page,
            rowsNumber: subcategorys_count
        }"
        :loading="loading"
    >
        <template v-slot:body="props">            
            <q-tr :props="props">
                <q-td key="index" :props="props">
                    {{ props.row.index + 1 }}
                </q-td>
                <q-td :auto-width="true" key="subcategories_uz" :props="props">
                    {{ props.row.subcategories?.find(item => item.language == 'uz').title || '' }}
                </q-td>
                <q-td :auto-width="true" key="subcategories_ru" :props="props">
                    {{ props.row.subcategories?.find(item => item.language == 'ru').title || '' }}
                </q-td>
                <q-td :auto-width="true" key="subcategories_en" :props="props">
                    {{ props.row.subcategories?.find(item => item.language == 'en').title || '' }}
                </q-td>
                <q-td key="category" :props="props">
                    {{ props.row.category }}
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
                    <q-btn color="primary" icon="menu" size="10px" unelevated>
                        <q-menu>
                            <q-list style="min-width: 100px">
                                <q-item 
                                    @click="edit(props.row._id)"
                                    clickable 
                                    v-close-popup>
                                    <q-item-section>Tahrirlash</q-item-section>
                                </q-item>
                                <q-separator />
                                <q-item 
                                    @click="openDialog(props.row._id)" 
                                    clickable 
                                    v-close-popup>
                                    <q-item-section>O'chirish</q-item-section>
                                </q-item>
                                
                            </q-list>
                        </q-menu>
                    </q-btn>
                </q-td>
            </q-tr>            
        </template>
    </q-table>


    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="page"
        color="grey-8"
        :max="Math.ceil(subcategorys_count / 20)"
        :min="1"
        size="sm"
        @update:model-value="handlePagination"
      />
    </div>

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
import {subcategoryStore} from '@/stores/data/subcategory'
import {convertDate} from '@/stores/utils/func'
import {url} from '@/stores/utils/env'
import {loadingStore} from '@/stores/utils/loading'

const loading_store = loadingStore()
const {loading} = storeToRefs(loading_store)

const emits = defineEmits(['edit'])

const store = subcategoryStore()
const {subcategorys,subcategorys_count} = storeToRefs(store)
const changeStatus = (_id) => {
    store.change_status(_id)
}

const confirm = ref(false)
const id = ref('')

const openDialog = (_id) => {
    id.value = _id
    confirm.value = true
}

const page = ref(1)

const remove = () => {
    store.delete_subcategory(id.value)
}

const edit = (id) => {
    emits('edit',id)
}

const handlePagination = (val) => {
    page.value = val
    store.get_all_subcategorys({page: page.value})
}


const list = computed(()=>{
    
    return subcategorys.value.map((val,index) => {
        val.index = index  + ((page.value - 1) * 20)
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
        name:'subcategories_uz',
        label:'Subkategoriy nomi',
        align:'left',
    },
    {
        name:'subcategories_ru',
        label:'Название подкатегории',
        align:'left',
    },
    {
        name:'subcategories_en',
        label:'Subcategory name',
        align:'left',
    },
    {
        name:'category',
        label:'Kategoriya nomi',
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