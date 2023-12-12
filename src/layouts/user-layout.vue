<template>            
    <div class="main">
        <header-part/>
        <nav-list />
        <div class="profile">
            <router-view/>
        </div>
    </div>
</template>
<script setup>
import headerPart from "../components/default/layout/header-part.vue"
import navList from "../components/user/nav-list.vue"

import { onMounted } from "vue";
import {userStore} from '@/stores/auth/user'
const user_store = userStore()


onMounted(()=>{
    user_store.checkUser('user')
})
</script>
<style lang="scss" scoped>
    
</style>