<template>
  <q-carousel
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="white"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        navigation-icon="radio_button_unchecked"
        navigation
        arrows
        height="400px"
      >
        <q-carousel-slide 
            v-for="item,index of list"
            :key="index"
            :name="index" 
            class="column no-wrap flex-center">
            <card-box :card="item"/>
        </q-carousel-slide>
      </q-carousel>
</template>

<script setup>
import cardBox from '@/components/card/card-box.vue'
import {ref} from 'vue'
defineProps(['list'])

const slide = ref(0)

</script>

<style>

</style>