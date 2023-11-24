<template>
    <q-dialog 
        v-model="confirm" 
        persistent
        @hide="close()"
        >
      <q-card style="width: 400px; max-width:100%">
        <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">{{ edit ? 'Toifa tahrirlash' : 'Yangi toifa' }}</div>
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
                    label="Subcategoriyani ro'yhatdan tanlang"
                    v-model="val.subcategory"
                    :options="subcategorys"
                    option-value="_id"
                    option-label="title"
                    emit-value
                    map-options
                    :rules="[ val => val && val.length > 0 || 'Maydon bo`sh bo`lmasin']"
                />
                <q-input
                outlined 
                    v-for="item,index of val.childsubcats"
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
import {childsubcatStore} from '@/stores/data/childsubcat'
import {url} from '@/stores/utils/env'
import {subcategoryStore} from '@/stores/data/subcategory'
import { storeToRefs } from 'pinia'

const subcategory_store = subcategoryStore()
const store = childsubcatStore()

const {subcategorys} = storeToRefs(subcategory_store)


const confirm = ref(false)
const val = ref({
    childsubcats: [...language.map(item => {
        return {
            ...item,
            title: ''
        }
    })]
})

const qform = ref()

const close = () => {
    val.value = {
        childsubcats: [...language.map(item => {
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
                store.save_childsubcat({...val.value})
            } else {
                store.new_childsubcat({...val.value})
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
            store.get_childsubcat(props.id)
            .then(res => {
                console.log({...res.data})
                val.value = {...res.data, childsubcats: [...res.data.childsubcats.map(childsubcat => {
                    childsubcat.label = language.find(lang => lang.language == childsubcat.language).label || ''
                    return childsubcat
                })]}
            })
        }
        confirm.value = props.toggle
    }
)


</script>

<style>

</style>