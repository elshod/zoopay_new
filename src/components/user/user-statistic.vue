<template>
    <div class="row q-col-gutter-lg">
        <div class="col-md-4 col-6" v-for="item,index of list" :key="index">
            <box-statistic :box="item"/>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import boxStatistic from './box-statistic.vue'

const list = ref([
    {
        title:'E`lonlar',
        value: 25,
        icon: 'checklist'
    },
    {
        title:'Xabarlar',
        value: 225,
        icon: 'message'
    },
    {
        title:'Ko`rilgan soni',
        value: 5225,
        icon: 'checklist'
    },
    {
        title:'E`lonlar',
        value: 25,
        icon: 'checklist'
    },
    {
        title:'E`lonlar',
        value: 25,
        icon: 'checklist'
    },
    {
        title:'E`lonlar',
        value: 25,
        icon: 'checklist'
    },
])

</script>

<style>

</style>