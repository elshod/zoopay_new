<template>
    <div class="row">
        <div class="col-6 col-md-3 q-pa-sm" v-for="item of list" :key="item._id">
            <cardBox 
                :card="item"
                @changeList="handleChange"
                />
        </div>
    </div>
</template>

<script setup>
defineProps(['list'])
const emits = defineEmits(['changeList'])
import cardBox from "./card-box.vue";

const handleChange = id => {
    emits('changeList',id)
}

</script>

<style>

</style>