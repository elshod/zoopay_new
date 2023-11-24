<template>
  <div class="category">
    <div class="container">
        <div class="title">Bo'limlar</div>
        <div class="category__list">
            <div 
                class="category__col"
                v-for="cat of categorys"
                :key="cat._id"
                >
                <router-link 
                    to="/" 
                    class="box"                    
                    >
                    <span class="img">
                        <img :src="`${url}/${cat.img}`" alt="">
                    </span>
                    <span>{{cat.title}}</span>
                </router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import {categoryStore} from '@/stores/data/category'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import {url} from '@/stores/utils/env'

const store = categoryStore()

const {categorys} = storeToRefs(store)

onMounted(()=>{
    store.get_categorys()
})

</script>

<style lang="scss" scoped>
@import '@/styles/components/default/category.scss';
</style>