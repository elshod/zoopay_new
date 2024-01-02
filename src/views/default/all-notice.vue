<template>
  <div class="notices">
    <div class="container q-mb-lg">
      <h4 class="title text-center q-mt-lg">{{ title }}</h4>
      <div class="row q-col-gutter-md" >
        <div class="col-12 col-md-4">
          <div class="filters" >
            <div class="head">
              <div class="name">{{ t('filter.title') }}</div>
              <q-btn 
                :label="t('filter.reset')" 
                :to="{
                  name:'notices', 
                    query: {
                      category:query_list.category,
                    }
                }"
                unelevated 
                icon="close"
                class="bg-grey-3"
                size="10px"
                />
            </div>
            <div class="item" v-if="subcategories.length > 0">
              <div class="name">{{ t('filter.category') }}</div>
              <div class="row q-gutter-sm">
                  <q-btn 
                  v-for="sub of subcategories"
                  :key="sub._id"
                  :label="sub.title"
                  unelevated
                  :class="{
                    'bg-green': query_list?.subcategory == sub._id
                  }"
                  :to="{
                    name:'notices', 
                    query: {
                      ...query_list,
                      subcategory: sub._id
                    }
                  }"
                  :outline="query_list?.subcategory !== sub._id"
                  :color="`${query_list.subcategory == sub._id ? 'white' : 'black'}`"
                  size="12px"
                />
              </div>
            </div>
            <div class="item" v-if="childsubcats.length > 0">
              <div class="name">{{ t('filter.childsubcats') }}</div>
              <div class="row q-gutter-sm">
                  <q-btn 
                  v-for="child of childsubcats"
                  :key="child._id"
                  :label="child.title"
                  unelevated
                  :class="{
                    'bg-green': query_list?.childsubcat == child._id
                  }"
                  :to="{
                    name:'notices', 
                    query: {
                      ...query_list,
                      childsubcat: child._id
                    }
                  }"
                  :outline="query_list?.childsubcat !== child._id"
                  :color="`${query_list.childsubcat == child._id ? 'white' : 'black'}`"
                  size="12px"
                />
              </div>
            </div>

            <div class="item" v-if="atributs.length > 0">
              <div class="name">{{ t('filter.atributs') }}</div>
              <div class="q-mb-md" v-for="atribut of atributs" :key="atribut._id">
                  <q-select 
                    outlined 
                    v-model="atribut.value" 
                    :options="atribut.values" 
                    :label="atribut.title"
                    v-if="atribut.type == 'select'" />
                  
                    <q-input 
                    outlined 
                    v-model="atribut.value" 
                    :label="atribut.title"                        
                    v-if="atribut.type == 'input'" 
                  />
              </div>
            </div>
          </div>
          
        </div>
        <div class="col-12 col-md-8" >
          <card-list :list="adds" v-if="adds.length > 0" :limit_class="'col-md-4'"/>
          <div class="row text-center" v-if="adds.length == 0 && no_notice">
            <h3>Xozircha bu bo'limda e'lonlar yo'q</h3>
          </div>
        </div>
        
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import cardList from '@/components/card/card-list.vue'

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const no_notice = ref(false)
const title = ref('')
const page = ref(1)

import {categoryStore} from '@/stores/data/category'
const category_store = categoryStore()
const category = ref({})
const subcategories = ref([])
const query_list = ref({})

const get_category = async id => {
  if (id){
    let res_cat = await category_store.get_category(id)
    let cat = res_cat.data?.categories?.find(c => c.language == locale.value)
    title.value = cat.title

    let res_subcat = await category_store.subcategories_by_cat({id,params: {language:locale.value}})
    subcategories.value = [...res_subcat.data]
  }
}


import {subcategoryStore} from '@/stores/data/subcategory'
const subcategory_store = subcategoryStore()
const atributs = ref([])
const childsubcats = ref([])

const get_sub_filter  = async subcategory_id => {
  query_list.value.subcategory = subcategory_id
  let res = await subcategory_store.childsubcat_by_subcat(subcategory_id,{language: locale.value})
  atributs.value = [...res.data.atributs]
  childsubcats.value = [...res.data.childsubcat]  
  console.log(res.data)
}

import { addStore } from "@/stores/data/add";
const store = addStore()
const {adds,adds_count} = storeToRefs(store)

const route = useRoute()
const router = useRouter()

watch(locale,
  () => {
    if (route.query?.subcategory){
      get_sub_filter(route.query?.subcategory)
    }    
  }
)

watch(route,()=>{
  if (route.query?.subcategory){
    console.log(route.query)
    get_sub_filter(route.query?.subcategory)
  } else {
    childsubcats.value = []
    atributs.value = []
  }



  console.log(subcategories.value,route.query)
  query_list.value = {...route.query}
  get_data()
})

const get_data = async () => {
  if (route.query?.category){    
    get_category(route.query?.category)
  }
  await store.all_notice({
    search: {...query_list.value},
    limit: 12,
    page: page.value
  })
  no_notice.value = true  
}


onMounted(()=>{
  query_list.value = {...route.query}
  if (route.query?.subcategory){
    get_sub_filter(route.query?.subcategory)
  }
  get_data()
})

</script>
<style lang="scss">
@import '@/styles/views/notices.scss';
</style>