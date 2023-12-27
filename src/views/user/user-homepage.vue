<template>
    <div class="user">
        <div class="container">
            <div class="row q-col-gutter-md">
                <div class="col-12 col-md-4 text-center">
                    <div class="info">
                        <img src="https://i.pinimg.com/564x/c9/f2/31/c9f2319cc39de0b9385b21e15b65ee4e.jpg" alt="">
                        <div class="name">{{person.name}}</div>
                        <div class="phone">{{person.login}}</div>
                    </div>

                </div>
                <div class="col-12 col-md-8">
                    <userStatistic :person="person"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import userStatistic from '../../components/user/user-statistic.vue';
import {userStore} from '@/stores/auth/user'
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
const store = userStore()
const {person} = storeToRefs(store)

onMounted(()=>{
    store.info_me()
})

</script>

<style lang="scss">
@import '@/styles/views/user.scss';
</style>