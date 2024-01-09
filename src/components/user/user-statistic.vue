<template>
    <div class="row q-col-gutter-lg">
        <div class="col-md-6 col-6">
            <box-statistic :box="{
                title:t('user.notices'),
                value: person?.addCount || 0,
                icon: 'checklist'
            }"/>
        </div>
        <div class="col-md-6 col-6">
            <box-statistic :box="{
                title:t('user.views'),
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

import { useI18n } from 'vue-i18n'
const {t} = useI18n()

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