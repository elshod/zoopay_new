<template>
  <div class="row wrap justify-between items-center content-start q-mb-md">
    <div>
      <q-btn icon="add" unelevated color="green-10" @click="data.toggle = true" label="Yangi e`lon" />
    </div>
  </div>
  <add-table @edit="handleEdit" />
  <add-dialog :toggle="data.toggle" :id="data.id" :edit="data.edit" @close="close" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import addTable from '@/components/dashboard/add/add-table.vue'
import addDialog from '@/components/dashboard/add/add-dialog.vue'
import { addStore } from '@/stores/data/add'

import { categoryStore } from '@/stores/data/category'
const category_store = categoryStore()

import { pageStore } from '@/stores/utils/page'
const page_store = pageStore()
const title = ref('E`lonlar ro`yhati')

const store = addStore()

const data = ref({
  toggle: false,
  edit: false,
  id: ''
})

const handleEdit = (val) => {
  data.value = {
    toggle: true,
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

onMounted(() => {
  page_store.set_page_title(title.value)
  store.get_all_adds()
  category_store.get_categorys({
    limit:0
  })
})

</script>

<style></style>