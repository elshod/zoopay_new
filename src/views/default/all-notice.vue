<template>
  <div class="notices">
    <div class="container q-mb-lg">
      <h4 class="title text-center q-mt-lg">{{ title }}</h4>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <div class="filters" v-if="subcategories.length > 0">
            <div class="item">
              <div class="name">Turkumlar</div>
              <div class="row q-gutter-sm">
                  <q-btn 
                  v-for="sub of subcategories"
                  :key="sub._id"
                  :label="sub.title"
                  unelevated
                  :class="{
                    'bg-green': query_list?.subcategory == sub._id
                  }"
                  @click="()=>{
                    query_list.subcategory = sub._id
                    get_data()
                  }"
                  :outline="query_list?.subcategory !== sub._id"
                  :color="`${query_list.subcategory == sub._id ? 'white' : 'black'}`"
                  size="12px"
                />
              </div>
            </div>
          </div>
          <q-btn label="Filterlarni tozalash" @click="clear_filter()" unelevated class="bg-orange q-mt-lg"/>
        </div>
        <div class="col-12 col-md-8">
          <card-list :list="adds" :limit_class="'col-md-4'"/>
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

import { addStore } from "@/stores/data/add";
const store = addStore()
const {adds,adds_count} = storeToRefs(store)

const route = useRoute()
const router = useRouter()

watch(locale,
  () => {
    get_data()
  }
)

const clear_filter = () => {
  query_list.value = {
    category: route.query.category
  }
  router.push({name:'notices', query: {...query_list.value}})
  store.all_notice({
      search: {...query_list.value},
      limit: 12,
      page: page.value
  })
}

const get_data = () => {
  if (route.query){
    query_list.value = {...route.query, ...query_list.value}
    router.push({name:'notices', query: query_list.value})
    get_category(route.query?.category)
    store.all_notice({
      search: {...route.query, ...query_list.value},
      limit: 12,
      page: page.value
    })
  }
}

onMounted(()=>{
  get_data()
})

</script>
<style lang="scss">
@import '@/styles/views/notices.scss';
</style>