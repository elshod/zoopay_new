<template>
  <div class="search">
    <div class="container">
        <div class="search__box">
            <q-input 
            borderless 
            v-model="title" 
            placeholder="Nima qidiryapsiz"         
            :dense="false" 
            clearable
            />
            <q-btn 
            unelevated
            icon="search"
            color="green-9"
            />
        </div>

    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const title = ref('')




</script>

<style lang="scss" scoped>
@import '@/styles/components/default/search.scss';
</style>