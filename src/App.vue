<script setup>
import { onMounted, watch } from 'vue';
import { pageStore } from './stores/utils/page';
import cookies from "vue-cookies"
import { useRoute } from 'vue-router';
const page_store = pageStore()

import {useI18n} from 'vue-i18n'
const {t} = useI18n()


onMounted(()=>{
  if (cookies.isKey('zoopay-theme')){
    page_store.set_theme(cookies.get('zoopay-theme'))
  }
})


const route = useRoute()


watch(route,
  ()=>{
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  })


</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import url('@/styles/main.scss');
</style>
