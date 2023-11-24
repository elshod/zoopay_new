<template>
  <q-header reveal elevated class="bg-dark text-white q-pa-sm">
    <q-toolbar>        
      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        Zoopay
      </q-toolbar-title>

      <q-btn icon="logout" @click="confirmExit()"/>
    </q-toolbar>
  </q-header>
  <q-dialog 
    position="top"
    v-model="toggle" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="help_outline" color="red-5" text-color="white" />
          <span class="q-ml-sm">Tizimdan chiqmoqchimisiz?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Yo`q" color="primary" v-close-popup />
          <q-btn  label="Ha" unelevated @click="exit()" color="red-5" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
import {ref} from 'vue'
import cookies from "vue-cookies"
import { useRouter } from "vue-router"

const router = useRouter()
const toggle = ref(false)
const confirmExit = () => {
  toggle.value = true
}

const exit = () => {
  cookies.remove('zoopay-token')
  router.push('/')
}
</script>

<style>

</style>