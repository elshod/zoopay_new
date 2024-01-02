<template>
    <div class="category">
        <div class="container">
            <div class="title">{{  t('home.category.title') }}</div>
            <div class="category__list">
                <div class="category__col" v-for="cat of categorys" :key="cat._id">
                    <router-link 
                    :to="{name:'notices', query: { category: cat._id }}"  
                    :class="`box ${cat_id == cat._id ? 'active' : ''}`">
                        <span class="img">
                            <img :src="`${url}/${cat.img}`" alt="">
                        </span>
                        <span>{{ cat.title }}</span>
                    </router-link>
                </div>
            </div>
            <subcategoryList :data="subcats"/>
        </div>
    </div>
</template>

<script setup>
import { categoryStore } from '@/stores/data/category'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { url } from '@/stores/utils/env'
import subcategoryList from './subcategory-list.vue'

import { useI18n } from 'vue-i18n'
const {t,locale} = useI18n()

const store = categoryStore()

const { categorys } = storeToRefs(store)

const subcats = ref([])
const cat_id = ref('')

const getSubcategory = async (id) => {
    cat_id.value = id
    let res = await store.subcategories_by_cat({id,params:{language:locale.value}})    
    console.log(res.data)
    subcats.value = [...res.data]
}

watch(locale,
    () => {
        get_data()
        if (cat_id.value){
            getSubcategory(cat_id.value)
        }
    }
)

const get_data = () => {
    store.get_categorys({language: locale.value})
}

onMounted(() => {
    get_data()
    
})

</script>

<style lang="scss" scoped>
@import '@/styles/components/default/category.scss';
</style>