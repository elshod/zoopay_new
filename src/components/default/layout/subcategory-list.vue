<template>
  <div class="subcats" v-if="data.length > 0">
    <div class="box" v-for="subcat of data" :key="subcat._id">
      <router-link  :to="`/subcat/${subcat._id}`">
        <q-icon name="navigate_next"/>
        <span>{{ subcat.title }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps(['data'])
</script>

<style lang="scss" scoped>
@import '@/styles/components/default/subcat.scss';
</style>