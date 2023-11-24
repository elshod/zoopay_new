<template>            
    <div class="main">
        <header-part/>
        <div class="wrapper">
            <router-view/>
        </div>
        <footer-part/>
    </div>
</template>
<script setup>
import headerPart from "../components/default/layout/header-part.vue";
import footerPart from "../components/default/layout/footer-part.vue";


</script>
<style lang="scss" scoped>
    
</style>