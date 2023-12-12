<template>
    <div class="container">
        <h3 class="text-center q-mt-lg q-mb-lg">Yangi e'lon qo'shish</h3>
        <div 
            :class="`linear ${data.category ? 'active' : ''} `" v-if="categorys.length > 0">
            <h4 class="q-mb-lg">Bo'limni tanlang</h4>
            <div class="category__list">
                <div 
                    :class="`box ${data.category == category._id ? 'active':''}`"
                    v-for="category of categorys"
                    :key="category._id"
                    @click="getSubcategory(category._id)"
                    
                    >
                    <q-img
                        :src="`${url}/${category.img}`"
                        spinner-color="white"
                        style="height: 120px; max-width: 120px; border-radius: 10px;"
                        />
                    {{ category.title }}
                </div>
            </div>
        </div>
        <div 
            :class="`linear ${data.subcategory ? 'active' : ''} `" 
            v-if="subcategory_list.length > 0">
            <h4 class="q-mb-lg">Turkumni tanlang</h4>
            <div class="category__list">
                <div 
                    :class="`box ${data.subcategory == subcat._id ? 'active':''} align-center`"
                    v-for="subcat of subcategory_list" 
                    :key="subcat._id"
                    @click="getChildsubcat(subcat._id)"
                    >
                    {{ subcat.title }}                    
                </div>
            </div>
        </div>
        <div 
            :class="`linear ${data.childsubcat ? 'active' : ''} `" 
            v-if="childsubcat_list.length > 0">
            <h4 class="q-mb-lg">Toifani tanlang</h4>
            <div class="category__list">
                <div 
                    :class="`box ${data.childsubcat == subcat._id ? 'active':''} align-center`"
                    v-for="subcat of childsubcat_list" 
                    :key="subcat._id"
                    @click="getChildsubcatValue(subcat._id)"
                    >
                    {{ subcat.title }}                    
                </div>
            </div>
        </div>
        <div class="linear" v-if="data.subcategory">
            <div class="linear__container">
                <q-input 
                v-model="data.title" 
                outlined label="E`lon sarlavhasi" 
                clearable counter/>
                <q-editor v-model="data.text" min-height="10rem" placeholder="E`lon matni"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import {url} from '@/stores/utils/env'

import {categoryStore} from '@/stores/data/category'
const category_store = categoryStore()
const {categorys} = storeToRefs(category_store)

import {subcategoryStore} from '@/stores/data/subcategory'
const subcategory_store = subcategoryStore()

const data = ref({
    text:''
})
const subcategory_list = ref([])
const childsubcat_list = ref([])

const getSubcategory = id => {
    data.value = {
        category: id,
        text:'',
        title:''
    }
    subcategory_list.value = []
    childsubcat_list.value = []
    category_store.subcategories_by_cat(id)
    .then(res => {
        subcategory_list.value = [...res.data]
    })
}

const getChildsubcat = id => {
    data.value = {
        category: data.value.category,
        subcategory: id,
        text:'',
        title:''
    }
    childsubcat_list.value = []
    subcategory_store.childsubcat_by_subcat(id)
    .then(res => {
        console.log(res.data)
        childsubcat_list.value = [...res.data.childsubcat]
    })
}

const getChildsubcatValue = id => {
    data.value = {
        category: data.value.category,
        subcategory: data.value.subcategory,
        childsubcat: id,
        text:'',
        title:''
    }
}



onMounted(()=>{
    category_store.get_categorys({
        limit:0
    })
})


</script>

<style lang="scss" scoped>
@import '@/styles/layouts/user/add.scss';
</style>