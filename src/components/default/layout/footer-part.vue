<template>
    <footer>
        <div class="container">
            <div class="row d-flex">
                <div class="col-12 col-md-3">
                    <div class="logo">Zoopay</div>
                    <div class="info">{{ t('footer.text') }}</div>
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
                        <router-link to='/' class="category">{{ t('footer.about') }}</router-link>
                        <router-link to='/' class="subcategory">
                            {{ t('footer.faq') }}
                        </router-link>
                        <router-link to='/' class="subcategory">
                            {{ t('footer.news') }}
                        </router-link>
                        <router-link to='/' class="subcategory">
                            {{ t('footer.contact') }}
                        </router-link>
                    </div>
                </div>
                <div class="col-12 col-md-9">
                    <div class="row q-col-gutter-lg">
                        <div class="col-md-4 col-6" 
                        v-for="menu of footer_menu" 
                        :key="menu._id">
                            <div class="links">
                                <router-link 
                                    :to="{
                                        name:'notices',
                                        query: {
                                            category: menu._id
                                        }
                                    }" 
                                class="category">{{menu.title}}</router-link>
                                <router-link 
                                    :to="{
                                        name:'notices',
                                        query: {
                                            category: menu._id,
                                            subcategory:sub._id
                                        }
                                    }" 
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
import { onMounted, ref, watch } from 'vue'
const api = apiStore()

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

watch(locale,
    () => {
        get_footer_menu()
    }
)

const get_footer_menu = async () => {
    let res = await api.get({
        url:'category/footer',
        params: {
            language: locale.value
        }
    })
    footer_menu.value = [...res.data]
}


const footer_menu = ref([])

onMounted(async()=>{
    get_footer_menu()
})

</script>

<style lang="scss" scoped>@import '@/styles/components/default/footer.scss';</style>