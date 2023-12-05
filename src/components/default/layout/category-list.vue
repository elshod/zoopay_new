<template>
    <div class="category">
        <div class="container">
            <div class="title">Bo'limlar</div>
            <div class="category__list">
                <div class="category__col" v-for="cat of categorys" :key="cat._id">
                    <div @click="getSubcategory(cat._id)" :class="`box ${cat_id == cat._id ? 'active' : ''}`">
                        <span class="img">
                            <img :src="`${url}/${cat.img}`" alt="">
                        </span>
                        <span>{{ cat.title }}</span>
                    </div>
                </div>
            </div>
            <subcategoryList :data="subcats"/>
        </div>
    </div>
</template>

<script setup>
import { categoryStore } from '@/stores/data/category'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { url } from '@/stores/utils/env'
import subcategoryList from './subcategory-list.vue'


const store = categoryStore()

const { categorys } = storeToRefs(store)

const subcats = ref([])
const cat_id = ref('')

const getSubcategory = async (_id) => {
    cat_id.value = _id
    let res = await store.subcategories_by_cat(_id)    
    subcats.value = [...res.data]


}

onMounted(() => {
    store.get_categorys()
})

</script>

<style lang="scss" scoped>
@import '@/styles/components/default/category.scss';
</style>