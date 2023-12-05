<script setup>
import { onMounted } from 'vue';
import { pageStore } from './stores/utils/page';
import cookies from "vue-cookies"
const page_store = pageStore()


onMounted(()=>{
  if (cookies.isKey('zoopay-theme')){
    page_store.set_theme(cookies.get('zoopay-theme'))
  }
})

</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import url('@/styles/main.scss');
</style>
