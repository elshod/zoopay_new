<template>
    <div class="row">
        <div class="col-6 col-md-3 q-pa-sm" v-for="item of data" :key="item._id">
            <cardBox 
                :card="item"
                @changeList="handleChange"
                />
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['list'])
const emits = defineEmits(['changeList'])
import { computed } from "vue";
import cardBox from "./card-box.vue";

import {convertDate} from '@/stores/utils/func'

const data = computed(() => {
    return props.list.map(item => {
        item.createdAt = convertDate(item.createdAt)
        return item
    })
})

const handleChange = id => {
    emits('changeList',id)
}

</script>

<style>

</style>