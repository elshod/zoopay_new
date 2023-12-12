<template>
  <q-layout view="lHh lpr lfr">
    <header-part/>

    <q-drawer show-if-above  class="drawer" side="left" bordered>
        <router-link to="/" class="logo"><span>ZOO</span>PAY</router-link>
        
          <q-list>

            <template v-for="(menuItem, index) in dashboard_menu" :key="index">
              <q-item 
                clickable 
                :active="menuItem.name === currentRoute" 
                :to="`/dashboard/${menuItem.path}`"
                v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.title }}
                </q-item-section>
              </q-item>              
            </template>

          </q-list>
        
    </q-drawer>

    <q-page-container >
      <div class="q-pa-md">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import headerPart from '../components/dashboard/header-part.vue'


import {onMounted, ref,watch} from 'vue'
import {useRoute} from 'vue-router'
import {dashboard_menu} from '@/stores/utils/menu'

const route = useRoute()
const currentRoute = ref('')

watch(
  () => route.name,
  () => {
    currentRoute.value = route.name
})

import {userStore} from '@/stores/auth/user'
const user_store = userStore()

onMounted(()=>{
  currentRoute.value = route.name
  user_store.checkUser('admin')
})

</script>
<style lang="scss">
@import '@/styles/layouts/dashboard.scss';

</style>
