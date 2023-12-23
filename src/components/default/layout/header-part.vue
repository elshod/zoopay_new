<template>
  <header>
    <div class="container row items-center">
      <router-link to="/" class="logo">
        Zoopay
      </router-link>
      <div class="q-ml-auto row">
        <div class="languages">
          <q-btn flat color="white" label="Uz" @click="changeLang('uz')" :class="`${l == 'uz' ? 'bg-red' : ''}`" />
          <q-btn flat color="white" label="Ru" @click="changeLang('ru')" :class="`${l == 'ru' ? 'bg-red' : ''}`" />
        </div>
        <div class="btns">
          <q-btn class="home" flat to="/" color="white" icon="home" />
          <q-btn class="favorite" flat color="white" to="/fav" icon="favorite_border">
            <q-badge v-if="favs.length > 0" floating color="red">{{ favs.length }}</q-badge>
          </q-btn>

          <q-btn flat class="message" color="white" icon="message">
            <q-badge floating color="red">22</q-badge>
          </q-btn>

          <q-btn flat to="/user" class="person" color="white" icon="person" />

          <q-btn unelevated class="add" color="white" text-color="black" icon="add" :label="t('header.new_add')"
            to="/user/newadd" />

          <q-btn unelevated round class="add_mobile" color="white" text-color="black" icon="add" />


        </div>




      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import cookies from 'vue-cookies'
import { pageStore } from '@/stores/utils/page'
import { storeToRefs } from 'pinia'
const page_store = pageStore()
const { favs } = storeToRefs(page_store)

import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const language = useI18n()
const l = ref('')
const changeLang = lang => {
  cookies.set('zoopay-lang', lang)
  language.locale.value = lang
  l.value = lang
}



const fav_count = ref(0)

onMounted(() => {
  if (cookies.isKey('zoopay-lang')) {
    changeLang(cookies.get('zoopay-lang'))
  } else {
    l.value = language.locale.value
  }
  if (cookies.isKey('zoopay-fav')) {
    page_store.set_favs()
  }
})



</script>

<style lang="scss" scoped>
@import '@/styles/components/default/header.scss';
</style>