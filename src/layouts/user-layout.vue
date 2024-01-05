<template>            
    <div class="main">
        <header-part/>
        <nav-list />
        <div class="profile">
            <router-view/>
        </div>
        <footer-part/>
    </div>
</template>
<script setup>
import headerPart from "../components/default/layout/header-part.vue"
import footerPart from "../components/default/layout/footer-part.vue";
 
import navList from "../components/user/nav-list.vue"

import { onMounted } from "vue";
import {userStore} from '@/stores/auth/user'
const user_store = userStore()


onMounted(()=>{
    user_store.checkUser('user')
})
</script>
<style lang="scss" scoped>

    .profile {
        padding-bottom: 100px;
        // background-color: rgba($green,0.2);
    }
</style>