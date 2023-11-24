<template>
  <main>
    <search-panel />
    <category-list/>
    <div class="last">
      <div class="container">
        <h4 class="text-center q-mb-xl">Ohirgi e'lonlar</h4>
        <card-list />
      </div>
    </div>
  </main>
</template>


<script setup>
import searchPanel from '@/components/default/layout/search-panel.vue'
import categoryList from '@/components/default/layout/category-list.vue'
import cardList from '@/components/card/card-list.vue'
</script>

