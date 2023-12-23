<template>
    <nav>
        <div class="container">
            <router-link to="/user/" exact>
                <span class="title" v-if="!mobile">Profilim</span>
                <q-icon name="person" size="18px" v-else class="icon"/>
            </router-link>
            <router-link to="/user/adds">
                <span class="title" v-if="!mobile">E'lonlarim</span>
                <q-icon name="toc" size="18px" v-else class="icon"/>                
            </router-link>
            <router-link to="/user/fav">
                <span class="title" v-if="!mobile">Tanlaganlar</span>
                <q-icon name="star" size="18px" v-else class="icon"/>
            </router-link>
            <router-link to="/user/settings">
                <span class="title" v-if="!mobile">Sozlamalar</span>
                <q-icon name="settings" size="18px" v-else class="icon"/>                
            </router-link>
            <q-btn 
                :label="!mobile ? 'Tizimdan chiqish' : ''" 
                @click="handleOpen" 
                :icon="mobile ? 'logout' : ''"
                unelevated class="logout" text-color="red"/>
        </div>
    </nav>
    <confirm-action 
        :toggle="option.toggle"
        title="Tizimdan chiqmoqchimisiz?"
        @confirm="handleConfirm"
        />
</template>

<script setup>
import {onMounted, ref} from 'vue'
import cookies from 'vue-cookies'
import { useRouter } from 'vue-router'

const option = ref({
    toggle: false
})
const router = useRouter()
const mobile = ref(false)

const handleConfirm = (val) => {
    if (val){
        cookies.remove('zoopay-token')
        cookies.remove('zoopay-user')
        router.push('/')
    }
    option.value.toggle = false
}

const handleOpen = () => {
    option.value = {
        toggle: true
    }
}

onMounted(()=>{
    if (document.body.clientWidth < 600){
        mobile.value = true
    }
    window.addEventListener('resize',()=>{
        if (document.body.clientWidth < 600){
            mobile.value = true
        } else {
            mobile.value = false
        }
    })
})

</script>

<style lang="scss" scoped>
@import '@/styles/layouts/user/nav.scss';
</style>