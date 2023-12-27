<template>
  <div class="card">
    <div class="img">
        <q-btn 
          
          icon="favorite_border"
          round
          class="favorite"
          :color="toggle ? 'green' : 'white'"
          :text-color="toggle ? 'white' : 'black'"
          @click="add_fav(card._id)"
        /> 
        <router-link :to="`/notice/${card._id}`">
          <img 
          v-if="card.images.at(0)"
          :src="`${url}/${card.images.at(0)}`" 
          :alt="card.title">
        </router-link>
    </div>
    <div class="info">
        <router-link :to="`/notice/${card._id}`" class="title">
          {{card.title}}
        </router-link>
        <div class="price">{{card.price?.toLocaleString() || 0}} {{card.priceType == 1 ? 'so`m' : '$'}}</div>
        <div class="location">{{card.address}}</div>
        <div class="date">{{card.createdAt}}</div>
    </div>
  </div>
</template>

<script setup>
import {url} from '@/stores/utils/env'
import cookies from 'vue-cookies'
import {onMounted, ref} from 'vue'
import {pageStore} from '@/stores/utils/page'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
const page_store = pageStore()
const $q = useQuasar()
const {favs} = storeToRefs(page_store)


const props = defineProps(['card'])
const emits = defineEmits('changeList')
const toggle = ref(false)

const add_fav = id => {    
  page_store.set_favs(id)
  
  if (cookies.isKey('zoopay-fav')){   
    toggle.value = favs.value.includes(id)
  } else {
    toggle.value = true    
  }  

  if (!toggle.value){
    emits('changeList',id)
  }
  
  $q.notify({
    message: toggle.value ? 'Tanlanganlar ro`yhatiga qo`shildi' : 'Tanlanganlar ro`yhatidan o`chirildi',
    color: toggle.value ? 'green' : 'red-5'
  })


}

onMounted(()=>{
  if (cookies.isKey('zoopay-fav')){
    let list = cookies.get('zoopay-fav')
    if (list.includes(props.card._id)){
      toggle.value = true
    }
  }
})

</script>

<style lang="scss">
@import '@/styles/components/card/card-box.scss';
</style>