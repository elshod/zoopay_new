<template>
    <div class="row wrap justify-between items-center content-start q-mb-md">
        <h5>Subkategoriyalar ro'yhati</h5>
        <div>
            <q-btn 
                icon="add" 
                unelevated 
                color="green-10" 
                @click="data.toggle = true" 
                label="Yangi kategoriya"/>
        </div>
    </div>
    <subcategory-table 
        @edit="handleEdit"
        />
    <subcategory-dialog 
        :toggle="data.toggle" 
        :id="data.id"
        :edit="data.edit"
        @close="close"
    />
</template>

<script setup>
import {ref, onMounted } from 'vue'
import subcategoryTable from '@/components/dashboard/subcategory/subcategory-table.vue'
import subcategoryDialog from '@/components/dashboard/subcategory/subcategory-dialog.vue'
import {subcategoryStore} from '@/stores/data/subcategory'

import {categoryStore} from '@/stores/data/category'
const category_store = categoryStore()

const store = subcategoryStore()

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
    store.get_all_subcategorys()
    category_store.get_all_categorys({limit:0})
})

</script>

<style>

</style>