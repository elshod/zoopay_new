<template>
  <q-header reveal class="bg-dark text-white q-pa-sm">
    <q-toolbar>
      <q-toolbar-title>
        {{ page_title }}
      </q-toolbar-title>
      <q-btn 
        flat
        round class="q-ml-md"
        color="white"
        icon="notifications">
          <q-badge floating color="red">2</q-badge>
        </q-btn>
      <q-btn round class="q-ml-md" icon="dark_mode" @click="change_theme()" />
      <q-btn round class="q-ml-md" icon="logout" @click="confirmExit()" />
    </q-toolbar>
  </q-header>
  <q-dialog position="top" v-model="toggle" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="help_outline" color="red-5" text-color="white" />
        <span class="q-ml-sm">Tizimdan chiqmoqchimisiz?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Yo`q" color="primary" v-close-popup />
        <q-btn label="Ha" unelevated @click="exit()" color="red-5" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import cookies from "vue-cookies"
import { useRouter } from "vue-router"
import { pageStore } from '@/stores/utils/page'
import { storeToRefs } from 'pinia';

const page_store = pageStore()
const { page_title, theme } = storeToRefs(page_store)

const router = useRouter()
const toggle = ref(false)
const confirmExit = () => {
  toggle.value = true
}

const change_theme = () => {
  page_store.set_theme(theme.value == 0 ? 1 : 0)
}


const exit = () => {
  cookies.remove('zoopay-token')
  router.push('/')
}
</script>

<style></style>