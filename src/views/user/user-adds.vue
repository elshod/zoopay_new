<template>
    <div class="container">
        <h3 class="text-center q-mt-lg q-mb-lg">{{t('user.notices')}}</h3>
        <cardList :list="adds"/>
    </div>
</template>

<script setup>
import {addStore} from '@/stores/data/add'
import { onMounted } from 'vue'
const store = addStore()
const {adds} = storeToRefs(store)

import cardList from '@/components/card/card-list.vue';
import { storeToRefs } from 'pinia';

import { useI18n } from 'vue-i18n'
const {t} = useI18n()

const get_data = async () => {
    store.get_mine_adds()
}

onMounted(()=>{
    get_data()
})


</script>

<style>

</style>