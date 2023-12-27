<template>
    <footer>
        <div class="container">
            <div class="row d-flex">
                <div class="col-12 col-md-3">
                    <div class="logo">Zoopay</div>
                    <div class="info">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint quaerat ab placeat
                        vitae tempora pariatur, minus soluta quos quas, iusto nobis enim iste commodi dolores, quasi dolorem
                        rem debitis? Laborum?</div>
                    <div class="social q-mb-md">
                        <a href="#" target="_blank">
                            <q-icon color="white" size="24px" class="q-mr-md" name="bi-facebook" />
                        </a>
                        <a href="#" target="_blank">
                            <q-icon color="white" size="24px" class="q-mr-md" name="bi-instagram" />
                        </a>
                        <a href="#" target="_blank">
                            <q-icon color="white" size="24px" name="bi-telegram" />
                        </a>
                    </div>
                    <div class="links">
                        <router-link to='/' class="category">Biz haqimizda</router-link>
                        <router-link to='/' class="subcategory">
                            Savol-javoblar
                        </router-link>
                        <router-link to='/' class="subcategory">
                            Yangiliklar
                        </router-link>
                        <router-link to='/' class="subcategory">
                            Aloqa
                        </router-link>
                    </div>
                </div>
                <div class="col-12 col-md-9">
                    <div class="row q-col-gutter-lg">
                        <div class="col-md-4 col-6" 
                        v-for="menu of footer_menu" 
                        :key="menu._id">
                            <div class="links">
                                <router-link to='/' class="category">{{menu.title}}</router-link>
                                <router-link 
                                    to='/' 
                                    class="subcategory"
                                    v-for="sub of menu.subCategories"
                                    :key="sub._id"
                                    >
                                    {{sub.title}}
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import {apiStore} from '@/stores/utils/api'
import { onMounted, ref } from 'vue'
const api = apiStore()

const footer_menu = ref([])

onMounted(async()=>{
    let res = await api.get({
        url:'category/footer'
    })
    footer_menu.value = [...res.data]
})

</script>

<style lang="scss" scoped>@import '@/styles/components/default/footer.scss';</style>