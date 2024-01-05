<template>
    <div class="container q-pb-lg">
        <h3 class="text-center q-mt-lg q-mb-lg">{{ t('add.pagetitle') }}</h3>
        <div :class="`linear ${data.category ? 'active' : ''} `" v-if="categorys.length > 0">
            <div class="row q-col-gutter-lg">
                <div class="col-12 col-md-4">
                    <h4 class="q-mb-lg">{{ t('add.category_title') }}</h4>
                    <p>{{ t('add.category_text') }}</p>
                    
                </div>
                <div class="col-12 col-md-8">
                    <div class="row q-col-gutter-lg category__list">
                        <div 
                            class="col-6 col-md-3" 
                            v-for="category of categorys"
                            :key="category._id">
                            <div :class="` box ${data.category == category._id ? 'active' : ''}`"  @click="getSubcategory(category._id)">
                                <q-img :src="`${url}/${category.img}`" spinner-color="white"
                                    style="aspect-ratio:1/1;max-width: 100%; border-radius: 10px;" />
                                {{ category.title }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="`linear ${data.subcategory ? 'active' : ''} `" v-if="subcategory_list.length > 0">
            <div class="row q-col-gutter-lg">
                <div class="col-12 col-md-4">
                    <h4 class="q-mb-lg">{{ t('add.subcategory_title') }}</h4>
                    <p>{{ t('add.subcategory_text') }}</p>
                </div>
                <div class="col-12 col-md-8">
                    <div class="row q-col-gutter-lg category__list">
                        <div class="col-6 col-md-3" v-for="subcat of subcategory_list" :key="subcat._id">
                            <div :class="`box ${data.subcategory == subcat._id ? 'active' : ''} align-center`"
                                 @click="getChildsubcat(subcat._id)">
                                {{ subcat.title }}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div :class="`linear ${data.childsubcat ? 'active' : ''} `" v-if="childsubcat_list.length > 0">
            <div class="row q-col-gutter-lg">
                <div class="col-12 col-md-4">
                    <h4 class="q-mb-lg">{{ t('add.childsubcat_title') }}</h4>
                    <p>{{ t('add.childsubcat_text') }}</p>
                </div>
                <div class="col-12 col-md-8">
                    <div class="row q-col-gutter-lg category__list">
                        <div class="col-6 col-md-3" v-for="subcat of childsubcat_list" :key="subcat._id">
                            <div :class="`box ${data.childsubcat == subcat._id ? 'active' : ''} align-center`"
                                 @click="getChildsubcatValue(subcat._id)">
                                {{ subcat.title }}
                            </div>
        
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="linear q-mb-lg" v-if="data.subcategory">
                <div class="row q-col-gutter-lg">
                    <div class="col-12 col-md-4">
                        <h4 class="q-mb-lg">{{ t('add.text') }}</h4>
                        <p>{{ t('add.info') }}</p>
                    </div>
                    <div class="col-12 col-md-8">
                        <q-input 
                            v-model="data.title" 
                            outlined 
                            :label="t('add.title')" 
                            clearable counter />

                        <q-editor 
                            @paste="onPaste"
                            v-model="data.text" 
                            ref="editorRef"
                            min-height="10rem" 
                            :placeholder="t('add.editor')" />
                    </div>

                    <div class="col-12 col-md-4">
                        <h4 class="q-mb-lg">{{ t('add.price_title') }}</h4>
                        <p>{{ t('add.price_text') }}</p>
                    </div>
                    <div class="col-12 col-md-8">
                        <div class="row q-col-gutter-lg items-center justify-between">
                            <div class="col-12 col-md">
                                <h5 class="q-mb-sm">{{ t('add.priceType') }}</h5>
                                <q-btn-toggle v-model="data.priceType" unelevated toggle-color="primary" color="grey-3"
                                    text-color="black" :options="priceTypes" />
                            </div>
                            <div class="col-12 col-md">
                                <h5 class="q-mb-sm">{{ t('add.addType') }}</h5>
                                <q-btn-toggle v-model="data.addType" unelevated toggle-color="primary" color="grey-3"
                                    text-color="black" :options="addTypes" />
                            </div>
                            <div class="col-12 col-md">
                                <h5 class="q-mb-sm">{{ t('add.statusType') }}</h5>
                                <q-btn-toggle v-model="data.statusType" unelevated toggle-color="primary" color="grey-3"
                                    text-color="black" :options="statusTypes" />
                            </div>
                        </div>
                        <div class="row q-col-gutter-lg items-center q-mt-xs">
                            <div class="col-md-10 col-7" v-if="data.priceType == 1">
                                <q-input outlined v-model="data.price" mask="### ### ### ### ###" reverse-fill-mask :label="t('add.price')"
                                    lazy-rules />
                            </div>
                            <div class="col-md-2 col-5" v-if="data.priceType == 1">
                                <q-btn-toggle v-model="data.priceName" unelevated toggle-color="primary" color="grey-3"
                                    text-color="black" :options="prices" />
                            </div>
                        </div>
                        <q-input 
                            v-model="data.address" 
                            outlined :label="t('add.address')" 
                            class="q-mt-lg" 
                            clearable counter 
                        />

                    </div>

                    <div class="col-12 col-md-4">
                        <h4 class="q-mb-lg">{{ t('add.images_title') }}</h4>
                        <p>{{ t('add.images_text') }}</p>
                    </div>
                    <div class="col-12 col-md-8">
                        <q-uploader 
                            style="max-width: 100%; width:100%" 
                            :url="`${url}/files/addimg`" 
                            field-name="file" 
                            auto-upload
                            max-files="6"
                            no-thumbnails
                            hide-upload-btn :label="t('add.max_file_size')" 
                            multiple
                            flat
                            bordered
                            :max-file-size="1024 * 500"
                            @rejected="onRejected" 
                            @uploaded="handleUpload" 
                            accept=".jpg, .png, image/*" 
                            :headers="[{
                                name: 'authorization',
                                value: `Bearer ${cookies.get('zoopay-token')}`
                            }]" >
                            <template v-slot:list="scope">
                                <q-list separator>

                                <q-item v-for="file,index in scope.files" :key="file.__key">
                                    <q-item-section>
                                    <q-item-label class="full-width ellipsis">
                                        {{ file.name }}
                                    </q-item-label>

                                    <q-item-label caption>
                                        Status: {{ file.__status }}
                                    </q-item-label>

                                    <q-item-label caption>
                                        {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                                    </q-item-label>
                                    </q-item-section>

                                    <q-item-section
                                    v-if="file.__img"
                                    thumbnail
                                    class="gt-xs"
                                    >
                                    <img :src="file.__img.src">
                                    </q-item-section>

                                    <q-item-section top side>
                                    <q-btn
                                        class="gt-xs"
                                        size="12px"
                                        flat
                                        dense
                                        round
                                        icon="delete"
                                        @click="(file) => {
                                            scope.removeFile(file)
                                            remove_file(index)
                                        }"
                                    />
                                    </q-item-section>
                                </q-item>

                                </q-list>
                            </template>
                        </q-uploader>
                    </div>


                    <div class="col-12 col-md-4">
                        <h4 class="q-mb-lg">{{ t('add.atributs_title') }}</h4>
                        <p>{{ t('add.atributs_text') }}</p>
                    </div>
                    <div class="col-12 col-md-8">
                        <div class="row q-col-gutter-lg" v-if="data?.atributs?.length > 0">
                            <div class="col-md-6 col-12" v-for="atribut of data.atributs" :key="atribut._id">
                                <q-select outlined v-model="atribut.value" :options="atribut.values" :label="atribut.title"
                                    v-if="atribut.type == 'select'" />
                                <q-input outlined v-model="atribut.value" :label="atribut.title"
                                    v-if="atribut.type == 'input'" />
                            </div>
                        </div>
                    </div>
                </div>
            <div class="q-mt-lg">
                <q-btn flat :label="t('add.cancel')" color="yellow-10" to="/" />
                <q-btn unelevated :label="t('add.save')" @click="save()" color="green-10" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
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
import { useRoute, useRouter } from 'vue-router'
const subcategory_store = subcategoryStore()

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

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
    if (id){
        category_store.subcategories_by_cat({id,params:{language:locale.value}})
            .then(res => {
                console.log(res.data)
                subcategory_list.value = [...res.data]
            })
    }
}

const getChildsubcat = id => {
    data.value = {
        category: data.value.category,
        subcategory: id,
        text: '',
        title: '',
        images: [],
        priceType: 1,
        addType:1,
        statusType:1,
        priceName:1
    }
    childsubcat_list.value = []
    subcategory_store.childsubcat_by_subcat(id,{language:locale.value})
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
    data.value.images.push(info.xhr?.response)
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

const remove_file = async index => {

    console.log(data.value.images,index)
    // await store.remove_file(list.at(0).xhr?.response)
    // $q.notify({
    //     message:'Rasm o`chilrildi',
    //     type:'warning'
    // })
}

const editorRef = ref()
const onPaste = (evt) => {
  // Let inputs do their thing, so we don't break pasting of links.
    if (evt.target.nodeName === 'INPUT') return
    let text, onPasteStripFormattingIEPaste
    evt.preventDefault()
    evt.stopPropagation()
    if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        text = evt.originalEvent.clipboardData.getData('text/plain')
        editorRef.value.runCmd('insertText', text)
    }
    else if (evt.clipboardData && evt.clipboardData.getData) {
        text = evt.clipboardData.getData('text/plain')
        editorRef.value.runCmd('insertText', text)
    }
    else if (window.clipboardData && window.clipboardData.getData) {
        if (!onPasteStripFormattingIEPaste) {
        onPasteStripFormattingIEPaste = true
        editorRef.value.runCmd('ms-pasteTextOnly', text)
        }
        onPasteStripFormattingIEPaste = false
    }
}

const priceTypes = ref([])
const addTypes = ref([])
const statusTypes = ref([])
const prices = ref([])

const type_list = () => {
    
    priceTypes.value = [...priceTypeList.value.map(t => {
        t.label = locale.value == 'ru' ? t.ru : t.uz
        return t
    })]
    
    addTypes.value = [...addTypeList.value.map(t => {
        t.label = locale.value == 'ru' ? t.ru : t.uz
        return t
    })]

    statusTypes.value = [...statusTypeList.value.map(t => {
        t.label = locale.value == 'ru' ? t.ru : t.uz
        return t
    })]

    prices.value = priceList.value.map(t => {
        t.label = locale.value == 'ru' ? t.ru : t.uz
        return t
    })

    console.log(priceList.value,locale.value,prices.value)
}




watch(locale,
    () => {
        data.value = {
            category: '',
            text: '',
            title: '',
            images: []
        }
        category_store.get_categorys({
            limit:0,
            language:locale.value
        })
        subcategory_list.value = []
        childsubcat_list.value = []
        type_list()
    }
)


onMounted(() => {
    category_store.get_categorys({
        limit: 0
    })
    type_list()
})


</script>

<style lang="scss" scoped>
@import '@/styles/layouts/user/add.scss';
</style>