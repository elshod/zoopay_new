<template>
    <div class="row wrap justify-between items-center content-start q-mb-md">
        <h5>Kategoriyalar ro'yhati</h5>
        <div>
            <q-btn 
                icon="add" 
                unelevated 
                color="green-10" 
                @click="data.toggle = true" 
                label="Yangi kategoriya"/>
        </div>
    </div>
    <category-table />
    <category-dialog :toggle="data.toggle" @close="close"/>
</template>

<script setup>
import {ref, onMounted } from 'vue'
import categoryTable from '@/components/dashboard/category/category-table.vue'
import categoryDialog from '@/components/dashboard/category/category-dialog.vue'
import {categoryStore} from '@/stores/data/category'

const store = categoryStore()

const data = ref({
    toggle: false,
    edit: false
})

const close = () => {
    console.log('ku');
    data.value = {
        toggle: false,
        edit: false
    }
}

onMounted(()=>{
    store.get_all_categorys()
})

</script>

<style>

</style>