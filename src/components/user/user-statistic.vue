<template>
    <div class="row q-col-gutter-lg">
        <div class="col-md-6 col-6">
            <box-statistic :box="{
                title:'E`lonlar',
                value: person?.addCount || 0,
                icon: 'checklist'
            }"/>
        </div>
        <div class="col-md-6 col-6">
            <box-statistic :box="{
                title:'Ko`rilgan soni',
                value: person?.addWiewCount || 0,
                icon: 'visibility'
            }"/>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import boxStatistic from './box-statistic.vue'
const props = defineProps(['person'])

console.log(props.person)

const list = ref([
    {
        title:'Xabarlar',
        value: 225,
        icon: 'message'
    },
])

</script>

<style>

</style>