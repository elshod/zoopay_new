<template>
    <q-dialog 
        v-model="confirm" 
        persistent
        @hide="close()"
        >
      <q-card style="width: 400px; max-width:100%">
        <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">{{ edit ? 'Subkategoriyani tahrirlash' : 'Yangi subkategoriya' }}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
            <q-form
                ref="qform"
                class="q-gutter-md"
                >
                <q-select
                    outlined
                    label="Kategoriyani ro'yhatdan tanlang"
                    v-model="val.category"
                    :options="categorys"
                    option-value="_id"
                    option-label="title"
                    emit-value
                    map-options
                    :rules="[ val => val && val.length > 0 || 'Maydon bo`sh bo`lmasin']"
                />
                <q-input
                outlined 
                    v-for="item,index of val.subcategories"
                    :key="index"
                    v-model="item.title"
                    :label="`${item.label}`"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Maydon bo`sh bo`lmasin']"
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
import {useQuasar} from 'quasar'
import cookies from 'vue-cookies'
const $q = useQuasar()

const props = defineProps(['toggle','edit','id'])
const emits = defineEmits(['close'])
import {language} from '@/stores/utils/func'
import {subcategoryStore} from '@/stores/data/subcategory'
import {url} from '@/stores/utils/env'
import {categoryStore} from '@/stores/data/category'
import { storeToRefs } from 'pinia'

const category_store = categoryStore()
const store = subcategoryStore()

const {categorys} = storeToRefs(category_store)


const confirm = ref(false)
const val = ref({
    subcategories: [...language.map(item => {
        return {
            ...item,
            title: ''
        }
    })]
})

const qform = ref()

const close = () => {
    val.value = {
        subcategories: [...language.map(item => {
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
                store.save_subcategory({...val.value})
            } else {
                store.new_subcategory({...val.value})
            }
            close()
        }
        else {
            // oh no, user has filled in
            // at least one invalid value
        }
    })
}



watch(
    () => props.toggle,
    ()=> {        

        if (props.edit){
            store.get_subcategory(props.id)
            .then(res => {
                console.log({...res.data})
                val.value = {...res.data, subcategories: [...res.data.subcategories.map(subcategory => {
                    subcategory.label = language.find(lang => lang.language == subcategory.language)?.label || ''
                    return subcategory
                })]}
            })
        }
        confirm.value = props.toggle
    }
)


</script>

<style>

</style>