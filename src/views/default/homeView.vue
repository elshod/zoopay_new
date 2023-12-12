<template>
  <main>
    <search-panel />
    <category-list/>
    <div class="last">
      <div class="container">
        <h4 class="text-center q-mb-xl">Ohirgi e'lonlar</h4>
        <card-list :list="list"/>
      </div>
    </div>
  </main>
</template>


<script setup>
import searchPanel from '@/components/default/layout/search-panel.vue'
import categoryList from '@/components/default/layout/category-list.vue'
import cardList from '@/components/card/card-list.vue'
import { onMounted, ref } from 'vue'

const list = ref([])

import {addStore} from '@/stores/data/add'

const store = addStore()

onMounted(async ()=>{
  let res = await store.get_adds({
    limit:16
  })
  list.value = [...res.data]
})


</script>

