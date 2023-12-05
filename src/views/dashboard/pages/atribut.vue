<template>
  <div class="row wrap justify-between items-center content-start q-mb-md">
    <div>
      <q-btn icon="add" unelevated color="green-10" @click="data.toggle = true" label="Yangi xususiyat" />
    </div>
  </div>
  <atribut-table @edit="handleEdit" />
  <atribut-dialog :toggle="data.toggle" :id="data.id" :edit="data.edit" @close="close" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import atributTable from '@/components/dashboard/atribut/atribut-table.vue'
import atributDialog from '@/components/dashboard/atribut/atribut-dialog.vue'
import { atributStore } from '@/stores/data/atribut'

import { subcategoryStore } from '@/stores/data/subcategory'
const subcategory_store = subcategoryStore()

import { storeToRefs } from 'pinia'

import { pageStore } from '@/stores/utils/page'
const page_store = pageStore()
const title = ref('Xususiyatlar ro`yhati')


const store = atributStore()
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
  store.get_all_atributs()
  subcategory_store.get_all_subcategorys({ limit: 0 })
})

</script>

<style></style>