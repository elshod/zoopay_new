<template>
  <q-table :rows="list" :columns="columns" flat bordered hide-pagination :pagination="{
    rowsPerPage: 20,
    page,
    rowsNumber: adds_count
  }" :loading="loading" :dark="theme == 1">
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="index" :props="props">
          {{ props.row.index }}
        </q-td>
        <q-td key="img" :props="props">
          <q-img
              v-if="props.row.images?.at(0)"
              :src="`${url}/${props.row.images?.at(0)}`"
              spinner-color="white"
              style="height: 60px; width:60px; object-fit:cover"
          />
        </q-td>
        <q-td :auto-width="true" key="title" :props="props">
          <div><b>{{ props.row.title }}</b></div>
          <q-chip square color="primary" size="10px" text-color="white">
            {{ props.row.category }}
          </q-chip>
        </q-td>
        <q-td :auto-width="true" key="price" :props="props">
          {{ props.row.price?.toLocaleString()  || ''}}
          {{props.row.priceType == 1 ? 'so`m' : 'dollar'}}
        </q-td>
        <q-td :auto-width="true" key="user" :props="props">
          <div><b>{{ props.row.user?.name}}</b></div>
          <div><b>{{ props.row.phone}}</b></div>
          <div><b>{{ props.row.address}}</b></div>
          
        </q-td>
        <q-td key="values" :props="props">
          {{ props.row.values?.toString() }}
        </q-td>
        <q-td key="createdAt" :props="props">
          {{ convertDate(props.row.createdAt) }}
        </q-td>
        <q-td key="createdAt" :props="props">
          <q-btn @click="changeStatus(props.row._id,props.row.status == 1 ? 0 : 1)" size="10px" :icon="props.row.status == 1 ? 'done' : 'close'"
            unelevated :color="props.row.status == 1 ? 'green-10' : 'yellow-10'" />
        </q-td>
        <q-td key="btns" :props="props">
          <q-btn color="primary" icon="menu" size="10px" unelevated>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item @click="edit(props.row._id)" clickable v-close-popup>
                  <q-item-section>Tahrirlash</q-item-section>
                </q-item>
                <q-separator />
                <q-item @click="openDialog(props.row._id)" clickable v-close-popup>
                  <q-item-section>O'chirish</q-item-section>
                </q-item>

              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </q-tr>
    </template>
  </q-table>


  <div class="row justify-center q-mt-md" v-if="adds_count > 20">
    <q-pagination v-model="page" color="grey-8" :max="Math.ceil(adds_count / 20)" :min="1" size="sm"
      @update:model-value="handlePagination" />
  </div>

  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="help_outline" color="red-5" text-color="white" />
        <span class="q-ml-sm">Ma'lumotni o'chirmoqchisiz! Qaroringiz qat'iymi?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Bekor qilish" color="primary" v-close-popup />
        <q-btn label="O`chirish" unelevated @click="remove()" color="red-5" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { addStore } from '@/stores/data/add'
import { convertDate } from '@/stores/utils/func'
import {url} from '@/stores/utils/env'

import { loadingStore } from '@/stores/utils/loading'

import { pageStore } from '../../../stores/utils/page'
const page_store = pageStore()
const { theme } = storeToRefs(page_store)

const loading_store = loadingStore()
const { loading } = storeToRefs(loading_store)

const emits = defineEmits(['edit'])

const store = addStore()
const { adds, adds_count } = storeToRefs(store)
const changeStatus = (id,status) => {
  store.change_status({id,status})
}

const confirm = ref(false)
const id = ref('')

const openDialog = (_id) => {
  id.value = _id
  confirm.value = true
}

const page = ref(1)

const remove = () => {
  store.delete_add(id.value)
}

const edit = (id) => {
  emits('edit', id)
}

const handlePagination = (val = 1) => {
  if (val >= 1) {

    page.value = val
    store.get_all_adds({ page: page.value })
  }
}


const list = computed(() => {
  return adds.value.map((val, index) => {
    val.index = index + 1 + ((parseInt(page.value) * 1 - 1) * 20)
    return val
  })
})

const columns = [
  {
    name: 'index',
    label: '№',
    align: 'left',
    headerStyle: 'width:60px'
  },
  {
    name: 'img',
    label: '',
    align: 'left',
    headerStyle: 'width:70px'
  },
  {
    name: 'title',
    label: 'Sarlavha',
    align: 'left',
  },
  {
    name: 'price',
    label: 'Narh',
    align: 'left',
  },
  {
    name: 'user',
    label: 'Foydalanuvchi',
    align: 'left',
  },
  {
    name: 'values',
    label: 'Tanlov variantlari',
    align: 'left',
  },
  {
    name: 'createdAt',
    label: 'Yaratilgan vaqti',
    field: 'createdAt',
    align: 'left',
    headerStyle: 'width: 200px',
  },
  {
    name: 'status',
    label: 'Holati',
    field: 'status',
    align: 'left',
    headerStyle: 'width: 200px',
  },
  {
    name: 'btns',
    label: '',
    field: 'btns',
    align: 'left',
    headerStyle: 'width: 200px',
  }
]




</script>

<style></style>