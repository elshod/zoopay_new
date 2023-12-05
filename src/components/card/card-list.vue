<template>
    <div class="row">
        <div class="col-6 col-md-3 q-pa-sm" v-for="item of 16" :key="item">
            <cardBox />
        </div>
    </div>
</template>

<script setup>
import cardBox from "./card-box.vue";

</script>

<style>

</style>