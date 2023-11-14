<template>            
    <div class="auth">
        <div class="poster">
            <img src="@/assets/img/auth.svg" alt="">
        </div>
        <div class="auth__content">
            <router-link to="/" class="logo">ZOOPAY</router-link>
            <div class="links ">
                <router-link to="/auth">Tizimga kirish</router-link>
                <router-link to="/auth/reg">Ro'yhatdan o'tish</router-link>
            </div>
            <div class="auth__box">
                <router-view/>
            </div>

        </div>
    </div>
</template>
<script>

</script>
<style lang="scss" scoped>
    @import '@/styles/views/auth.scss';
</style>