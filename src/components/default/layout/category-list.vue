<template>
    <div :class="`category ${type ? 'notice_page' : ''}`">
        <div :class="`${type ? 'category__swipe' : 'container'}`">
            <div class="title" v-if="!type">{{  t('home.category.title') }}</div>
            <div class="category__list">
                <div 
                    :class="`category__col ${current_category == cat._id ? 'active' : ''}`" 
                    v-for="cat of categorys" :key="cat._id">
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
const props = defineProps({
    type: {
        type: Boolean,
        default: false
    }
})
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
const {t,locale} = useI18n()

const store = categoryStore()
const current_category = ref('')
const { categorys } = storeToRefs(store)

const subcats = ref([])
const cat_id = ref('')

const getSubcategory = async (id) => {
    cat_id.value = id
    let res = await store.subcategories_by_cat({id,params:{language:locale.value}})    
    console.log(res.data)
    subcats.value = [...res.data]
}

const route = useRoute()

watch(route, 
    () => {
        if (route.query?.category){
            current_category.value = route.query.category
        }
    }
)

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
    if (route.query?.category){
        current_category.value = route.query.category
    }
})

</script>

<style lang="scss" scoped>
@import '@/styles/components/default/category.scss';
</style>