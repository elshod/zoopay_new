<template>
    <q-dialog 
        v-model="confirm" 
        persistent
        @hide="close()"
        >
      <q-card style="width: 400px; max-width:100%">
        <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">{{ edit ? 'Kategoriyani tahrirlash' : 'Yangi kategoriya' }}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
            <q-form
                ref="qform"
                class="q-gutter-md"
                >
                <q-input
                outlined 
                    v-for="item,index of val.categories"
                    :key="index"
                    v-model="item.title"
                    :label="`${item.label}`"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Maydon bo`sh bo`lmasin']"
                />
                <div v-if="edit">
                    <q-img
                        v-if="val.img"
                        :src="`${url}/${val.img}`"
                        spinner-color="white"
                        style="height: 120px; width:120px; object-fit:cover"
                    />
                </div>
                <q-uploader
                    style="max-width: 300px"
                    :url="`${url}/files/catimg`"
                    field-name="file"
                    auto-upload
                    hide-upload-btn
                    label="Maksimal fayl hajmi (500kb)"
                    max-files="1"
                    :max-file-size="1024 * 500"
                    @rejected="onRejected"
                    @uploaded="handleUpload"
                    accept=".jpg, .png, image/*"
                    
                    :headers="[{
                        name: 'authorization',
                        value: `Bearer ${cookies.get('zoopay-token')}`
                    }]"
                />
            </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Bekor qilish" color="yellow-10" v-close-popup />
          <q-btn unelevated  label="Saqlash" @click="save()" color="green-10" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script setup>
import {ref,watch} from 'vue'
const props = defineProps(['toggle','edit','id'])
const emits = defineEmits(['close'])
import {language} from '@/stores/utils/func'
import {categoryStore} from '@/stores/data/category'
import {url} from '@/stores/utils/env'
import {useQuasar} from 'quasar'
import cookies from 'vue-cookies'
const $q = useQuasar()
const store = categoryStore()



const confirm = ref(false)
const val = ref({
    categories: [...language.map(item => {
        return {
            ...item,
            title: ''
        }
    })]
})

const qform = ref()

const close = () => {
    val.value = {
        categories: [...language.map(item => {
            return {
                ...item,
                title: ''
            }
        })]
    }
    emits('close')
}

const save = () => {
    qform.value.validate()
    .then(success => {
        if (success) {
            if (props.edit){
                store.save_category({...val.value})
            } else {
                store.new_category({...val.value})
            }
            close()
        }
        else {
            // oh no, user has filled in
            // at least one invalid value
        }
    })
}

const handleUpload = (info) => {
    val.value.img = info.xhr?.response
}

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
    console.log(err)
}

watch(
    () => props.toggle,
    ()=> {        

        if (props.edit){
            store.get_category(props.id)
            .then(res => {
                console.log(res.data)
                val.value = {...res.data, categories: [...res.data.categories.map(category => {
                    category.label = language.find(lang => lang.language == category.language).label || ''
                    return category
                })]}
            })
        }
        confirm.value = props.toggle
    }
)


</script>

<style>

</style>