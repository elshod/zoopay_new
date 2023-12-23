<template>
    <search-panel />
    <div class="notice">
        <div class="container">

            <div class="head">
                <div class="title">
                    {{card.title}}
                </div>

                <div class="price">
                    {{card.price?.toLocaleString() || 0}}

                    {{card.priceType == 1 ? 'so`m' : '$'}}
                </div>
            </div>
            <div class="info row q-col-gutter-md">
                <div class="col-12 col-md-8">
                    <img v-if="card.images" :src="`${url}/${card.images?.at(0)}`" alt="">

                    <div class="box">
                        <h6>E'lon tasnifi</h6>
                        <div class="text" v-html="card.text">

                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="author">
                        E'lon muallifi
                        <div class="name">{{card.user?.name}}</div>
                    </div>
                </div>
            </div>
                

        </div>
    </div>
</template>

<script setup>
import searchPanel from '@/components/default/layout/search-panel.vue'
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import {addStore} from '@/stores/data/add'
import {url} from '@/stores/utils/env'
const store = addStore()


const id = ref('')
const card = ref({})
const route = useRoute()

const getData = async () => {
    console.log(route.params)
    if (route.params?.id){
        id.value = route.params.id
        let res = await store.view_add(id.value)
        console.log(res.data)
        card.value = {...res.data}
    }
}

watch(
    () => route.params,
    () => {
        getData()
    }
)

onMounted(()=>{
    getData()
})

</script>

<style lang="scss" scoped>
@import '@/styles/views/notice.scss';
</style>