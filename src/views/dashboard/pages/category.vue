<template>
    <div class="row wrap justify-between items-center content-start q-mb-md">
        <div>
            <q-btn 
                icon="add" 
                unelevated 
                color="green-10" 
                @click="data.toggle = true" 
                label="Yangi kategoriya"/>
        </div>
    </div>
    <category-table 
        @edit="handleEdit"
        />
    <category-dialog 
        :toggle="data.toggle" 
        :id="data.id"
        :edit="data.edit"
        @close="close"
    />
</template>

<script setup>
import {ref, onMounted } from 'vue'
import categoryTable from '@/components/dashboard/category/category-table.vue'
import categoryDialog from '@/components/dashboard/category/category-dialog.vue'
import {categoryStore} from '@/stores/data/category'

import { pageStore } from '@/stores/utils/page'
const page_store = pageStore()
const title = ref('Kategoriyalar ro`yhati')

const store = categoryStore()

const data = ref({
    toggle: false,
    edit: false,
    id: ''
})

const handleEdit = (val) => {
    data.value = {
        toggle:true,
        edit: true,
        id: val
    }
}

const close = () => {
    console.log('ku');
    data.value = {
        toggle: false,
        edit: false
    }
}

onMounted(()=>{
    page_store.set_page_title(title.value)
    store.get_all_categorys()
})

</script>

<style>

</style>