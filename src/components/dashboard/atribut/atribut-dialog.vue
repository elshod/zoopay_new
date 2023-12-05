<template>
  <q-dialog v-model="confirm" persistent @hide="close()">
    <q-card style="width: 600px; max-width:100%">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ edit ? 'Xususiyatni tahrirlash' : 'Yangi xususiyat' }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form ref="qform" class="q-gutter-md">

              <q-select 
                outlined 
                label="Subcategoriyani ro'yhatdan tanlang" 
                v-model="val.subcategory" 
                :options="subcategorys"
                option-value="_id" 
                option-label="title" 
                emit-value 
                map-options
                :rules="[val => val && val.length > 0 || 'Maydon bo`sh bo`lmasin']" 
                />

              <q-select 
                outlined 
                label="Maydon turini ro'yhatdan tanlang" 
                v-model="val.type" 
                :options="atributTypes"
                option-value="value" 
                option-label="title" 
                emit-value 
                map-options
                :rules="[val => val && val.length > 0 || 'Maydon bo`sh bo`lmasin']" 
                />

              <q-input 
              outlined 
              v-model="val.title" 
              label="Atribut nomi"
              lazy-rules 
              :rules="[val => val && val.length > 0 || 'Maydon bo`sh bo`lmasin']" />

          <div  v-if="['select','range'].includes(val.type)">
            <div class="title">Maydon qiymat variantlari</div>
            <div class="q-mb-md"  v-for="item,index in val.values" :key="index">
              <q-input 
                outlined 
                v-model="item.value" 
                label="Tanlov variantlari"
                lazy-rules>
                <template v-slot:after>
                  <q-btn :disable="val.values.length == 1" round dense flat icon="clear" @click="val.values.splice(index,1)" />
                </template>
              </q-input>
            </div>
            <div>
              <q-btn icon="add" @click="val.values.push({value:''})" unelevated color="green"/>
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Bekor qilish" color="yellow-10" v-close-popup />
        <q-btn unelevated label="Saqlash" @click="save()" color="green-10" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
const $q = useQuasar()

const props = defineProps(['toggle', 'edit', 'id'])
const emits = defineEmits(['close'])

import { atributStore } from '@/stores/data/atribut'
import { subcategoryStore } from '@/stores/data/subcategory'
import { storeToRefs } from 'pinia'
import { atributTypes } from '@/stores/utils/env'

const subcategory_store = subcategoryStore()
const store = atributStore()

const { subcategorys } = storeToRefs(subcategory_store)


const confirm = ref(false)
const val = ref({
  values: [{value:''}]
})

const qform = ref()

const close = () => {
  val.value = {  
    values:[{value:''}]  
  }
  emits('close')
}

const save = () => {
  qform.value.validate()
    .then(success => {
      if (success) {

        let data = {...val.value}
        data.values = data.values.map(item => {
          return item.value
        })
        // console.log(data);
        if (props.edit) {
          store.save_atribut({ ...data })
        } else {
          store.new_atribut({ ...data })
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
  () => {

    if (props.edit) {
      store.get_atribut(props.id)
        .then(res => {
          console.log({ ...res.data })
          val.value = { 
            ...res.data, 
            subcategory: res.data.subcategory._id,
            values: res.data.values.map(val => {
              return {
                value: val
              }
            })
          }
        })
    }
    confirm.value = props.toggle
  }
)


</script>

<style></style>