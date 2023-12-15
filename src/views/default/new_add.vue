<template>
    <div class="container">
        <h3 class="text-center q-mt-lg q-mb-lg">Yangi e'lon qo'shish</h3>
        <div :class="`linear ${data.category ? 'active' : ''} `" v-if="categorys.length > 0">
            <h4 class="q-mb-lg">Bo'limni tanlang</h4>
            <div class="category__list">
                <div :class="`box ${data.category == category._id ? 'active' : ''}`" v-for="category of categorys"
                    :key="category._id" @click="getSubcategory(category._id)">
                    <q-img :src="`${url}/${category.img}`" spinner-color="white"
                        style="height: 120px; max-width: 120px; border-radius: 10px;" />
                    {{ category.title }}
                </div>
            </div>
        </div>
        <div :class="`linear ${data.subcategory ? 'active' : ''} `" v-if="subcategory_list.length > 0">
            <h4 class="q-mb-lg">Turkumni tanlang</h4>
            <div class="category__list">
                <div :class="`box ${data.subcategory == subcat._id ? 'active' : ''} align-center`"
                    v-for="subcat of subcategory_list" :key="subcat._id" @click="getChildsubcat(subcat._id)">
                    {{ subcat.title }}
                </div>
            </div>
        </div>
        <div :class="`linear ${data.childsubcat ? 'active' : ''} `" v-if="childsubcat_list.length > 0">
            <h4 class="q-mb-lg">Toifani tanlang</h4>
            <div class="category__list">
                <div :class="`box ${data.childsubcat == subcat._id ? 'active' : ''} align-center`"
                    v-for="subcat of childsubcat_list" :key="subcat._id" @click="getChildsubcatValue(subcat._id)">
                    {{ subcat.title }}
                </div>
            </div>
        </div>
        <div class="linear" v-if="data.subcategory">
            <div class="linear__container">
                <q-input v-model="data.title" outlined label="E`lon sarlavhasi" clearable counter />
                <q-editor v-model="data.text" min-height="10rem" placeholder="E`lon matni" />
                <div class="row q-col-gutter-lg items-center q-mt-lg justify-between">
                    <div class="col">
                        <h5 class="q-mb-sm">Sotuv turi</h5>
                        <q-btn-toggle v-model="data.priceType" unelevated toggle-color="primary" color="grey-3"
                            text-color="black" :options="priceTypeList" />
                    </div>
                    <div class="col">
                        <h5 class="q-mb-sm">E'lon turi</h5>
                        <q-btn-toggle v-model="data.addType" unelevated toggle-color="primary" color="grey-3"
                            text-color="black" :options="addTypeList" />
                    </div>
                    <div class="col">
                        <h5 class="q-mb-sm">Mahsulot holati</h5>
                        <q-btn-toggle v-model="data.statusType" unelevated toggle-color="primary" color="grey-3"
                            text-color="black" :options="statusTypeList" />
                    </div>
                </div>


                <div class="row q-col-gutter-lg items-center q-mt-xs">
                    <div class="col-10" v-if="data.priceType == 1">
                        <q-input outlined v-model="data.price" mask="### ### ### ### ###" reverse-fill-mask label="Narhi"
                            lazy-rules />
                    </div>
                    <div class="col-2" v-if="data.priceType == 1">
                        <q-btn-toggle v-model="data.priceName" unelevated toggle-color="primary" color="grey-3"
                            text-color="black" :options="priceList" />
                    </div>
                </div>

                <q-input v-model="data.address" outlined label="Manzil" class="q-mt-lg" clearable counter />

                <div class="q-mt-lg q-mb-lg">
                    <h6 class="q-mb-md" v-if="data?.atributs?.length > 0">Atributlar</h6>
                    <div class="row q-col-gutter-lg" v-if="data?.atributs?.length > 0">
                        <div class="col-4" v-for="atribut of data.atributs" :key="atribut._id">
                            <q-select outlined v-model="atribut.value" :options="atribut.values" :label="atribut.title"
                                v-if="atribut.type == 'select'" />
                            <q-input outlined v-model="atribut.value" :label="atribut.title"
                                v-if="atribut.type == 'input'" />
                        </div>
                    </div>
                </div>
                <q-uploader style="max-width: 100%; width:100%" :url="`${url}/files/addimg`" field-name="file" auto-upload
                    hide-upload-btn label="Maksimal fayl hajmi (500kb)" max-files="1" :max-file-size="1024 * 500"
                    @rejected="onRejected" @uploaded="handleUpload" accept=".jpg, .png, image/*" :headers="[{
                        name: 'authorization',
                        value: `Bearer ${cookies.get('zoopay-token')}`
                    }]" />
            </div>


            <q-btn flat label="Bekor qilish" color="yellow-10" to="/" />
            <q-btn unelevated label="Saqlash" @click="save()" color="green-10" />
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import cookies from "vue-cookies"
import { url } from '@/stores/utils/env'
import { useQuasar } from 'quasar';

import { useAddlibStore } from '@/stores/utils/addlib'
const addlib_store = useAddlibStore()
const { priceTypeList, addTypeList, statusTypeList, priceList } = storeToRefs(addlib_store)

import { categoryStore } from '@/stores/data/category'
const category_store = categoryStore()
const { categorys } = storeToRefs(category_store)

import { subcategoryStore } from '@/stores/data/subcategory'
import { useRouter } from 'vue-router'
const subcategory_store = subcategoryStore()

const data = ref({
    text: '',
    images: []
})
const subcategory_list = ref([])
const childsubcat_list = ref([])

const getSubcategory = id => {
    data.value = {
        category: id,
        text: '',
        title: '',
        images: []
    }
    subcategory_list.value = []
    childsubcat_list.value = []
    category_store.subcategories_by_cat(id)
        .then(res => {
            subcategory_list.value = [...res.data]
        })
}

const getChildsubcat = id => {
    data.value = {
        category: data.value.category,
        subcategory: id,
        text: '',
        title: '',
        images: []
    }
    childsubcat_list.value = []
    subcategory_store.childsubcat_by_subcat(id)
        .then(res => {
            console.log(res.data)
            data.value.atributs = [...res.data.atributs]
            childsubcat_list.value = [...res.data.childsubcat]
        })
}

const getChildsubcatValue = id => {
    data.value = {
        ...data.value,
        category: data.value.category,
        subcategory: data.value.subcategory,
        childsubcat: id,
        text: '',
        title: '',
        images: []
    }
}

const handleUpload = (info) => {
    data.value.images = [info.xhr?.response, ...data.value.images]
}

const $q = useQuasar();

const onRejected = (err) => {

    const errMessage = {
        'accept': 'Fayl turi faqat .jpg, .png, .svg, .gif mumkin',
        'max-file-size': 'Fayl hajmi 500 kb dan o`tmasin',
        'max-total-size': 'Maksimum bitta fayl yuklash mumkin'
    }

    $q.notify({
        message: errMessage[err.at(0).failedPropValidation],
        color: 'red-5'
    })
}

const router = useRouter()
import {addStore} from '@/stores/data/add'
const store = addStore()
const save = async () => {
    data.value.atributs = data.value.atributs.map(atr => {
        return {
            id: atr._id,
            value: atr.value
        }
    })
    data.value.price = +data.value.price.split(' ').join('')
    data.value.atributs = data.value.atributs.filter(atr => atr.value)
    // console.log(data.value)
    let res = await store.create_add({ ...data.value })
    if (res.status == 201){
        $q.notify({
            message: 'E`loningiz moderatsiyadan keyin qabul qilinadi. Rahmat',
            color: 'green-5',
            timeout: 2500
        })
        setTimeout(()=>{
            router.push('/user')
        },1000)
    }
                
            
}



onMounted(() => {
    category_store.get_categorys({
        limit: 0
    })
})


</script>

<style lang="scss" scoped>
@import '@/styles/layouts/user/add.scss';
</style>