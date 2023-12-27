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
                        <div class="attrs">
                            <div class="att">
                                {{card.category}}
                            </div>
                            <div class="att" 
                                v-for="attr of card.atributs"
                                :key="attr._id"
                            >   
                                {{attr.id?.title}}:
                                <b>{{attr.value}}</b>                                
                            </div>
                        </div>
                        <h6>E'lon tasnifi</h6>
                        <div class="text" v-html="card.text">

                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="author">
                        <div class="stat">
                            <span>
                                <q-icon name="visibility"/>
                                {{card.view || 0}}
                            </span>
                            <span>
                                <q-icon name="event"/>
                                {{card.createdAt}}
                            </span>
                        </div>
                        E'lon muallifi
                        <div class="name q-mb-sm">{{card.user?.name}}</div>
                        <hr>
                        <p class="q-mt-sm">
                            <b>Murojat uchun</b>
                        </p>
                        <q-btn 
                        :label="card.user?.login" 
                        class="bg-green" 
                        unelevated
                        @click="callMe()"
                        text-color="white"/>
                        <p class="q-mt-sm">
                            <b>Manzil</b>
                        </p>
                        {{card.address}}
                    </div>
                    <div class="author q-mt-lg" v-if="card.userAdds?.length > 0">
                        <div class="q-mb-md"><b>Muallifning boshqa e'lonlari</b></div>
                        <Splide :options="{ 
                            type:'loop',
                            rewind: true,
                            perPage:1,
                        }">
                            <SplideSlide v-for="item of card.userAdds" :key="item._id">
                                <card-box :card="item"/>
                            </SplideSlide>
                        </Splide>
                    </div>
                </div>
            </div>
                
            <div class="others" v-if="card.sameCatAdds?.length > 0">
                <h6 class="q-mb-md">Boshqa e'lonlar</h6>
                <Splide :options="{ 
                    type:'loop',
                    rewind: true,
                    perPage:4,
                    gap:10,
                    breakpoints: {
                        768: {
                            perPage:2,
                        },
                        600: {
                            perPage:1,
                        }
                    }
                }">
                    <SplideSlide v-for="item of card.sameCatAdds" :key="item._id">
                        <card-box :card="item"/>
                    </SplideSlide>
                </Splide>
            </div>
        </div>
    </div>
</template>

<script setup>
import cardBox from '@/components/card/card-box.vue'
import {convertDate} from '@/stores/utils/func'
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import searchPanel from '@/components/default/layout/search-panel.vue'
import cardSlider from '@/components/card/card-slider.vue'
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
        card.value.sameCatAdds = card.value.sameCatAdds.map(adds => {
            adds.createdAt = convertDate(adds.createdAt)
            return adds
        }) 
        card.value.userAdds = card.value.userAdds.map(adds => {
            adds.createdAt = convertDate(adds.createdAt)
            return adds
        }) 
        card.value.createdAt = convertDate(card.value.createdAt)
        card.value.phone = res.data.user.login.split(' ').join('').split('(').join('').split(')').join('').split('-').join('')
        
    }
}

const callMe = () => {
    window.open(`tel:${card.value.phone}`);
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