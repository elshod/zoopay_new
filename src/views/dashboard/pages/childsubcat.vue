<template>
    <div class="row wrap justify-between items-center content-start q-mb-md">
        <div>
            <q-btn 
                icon="add" 
                unelevated 
                color="green-10" 
                @click="data.toggle = true" 
                label="Yangi toifa"/>
        </div>
    </div>
    <childsubcat-table 
        @edit="handleEdit"
        />
    <childsubcat-dialog 
        :toggle="data.toggle" 
        :id="data.id"
        :edit="data.edit"
        @close="close"
    />
</template>

<script setup>
import {ref, onMounted } from 'vue'
import childsubcatTable from '@/components/dashboard/childsubcat/childsubcat-table.vue'
import childsubcatDialog from '@/components/dashboard/childsubcat/childsubcat-dialog.vue'
import {childsubcatStore} from '@/stores/data/childsubcat'

import {subcategoryStore} from '@/stores/data/subcategory'
const subcategory_store = subcategoryStore()

import { pageStore } from '@/stores/utils/page'
const page_store = pageStore()
const title = ref('Toifalar ro`yhati')

const store = childsubcatStore()

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
    store.get_all_childsubcats()
    subcategory_store.get_all_subcategorys({limit:0})
})

</script>

<style>

</style>