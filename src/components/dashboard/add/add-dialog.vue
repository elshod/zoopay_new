<template>
  <q-dialog v-model="confirm" persistent @hide="close()" full-height full-width>
    <q-card style="width: 90%; max-width:100%">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ edit ? 'E`lonni tahrirlash' : 'Yangi e`lon' }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form ref="qform">
          <div class="row q-col-gutter-lg">
            <div :class="`${childsubcats.length > 0 ? 'col-4' : 'col-6'}`">
              <q-select outlined label="Bo`lim ro'yhatdan tanlang" v-model="val.category" :options="categorys"
                option-value="_id" option-label="title" @update:model-value="get_subcategory" emit-value map-options
                :rules="[val => val && val.length > 0 || 'Maydon bo`sh bo`lmasin']" />
            </div>
            <div :class="`${childsubcats.length > 0 ? 'col-4' : 'col-6'}`">
              <q-select ref="subref" v-if="subcategorys.length > 0" outlined label="Turkumni ro'yhatdan tanlang" v-model="val.subcategory"
                :options="subcategorys" option-value="_id" option-label="title" emit-value map-options
                @update:model-value="get_childsubcat"
                :rules="[val => val && val.length > 0 || 'Maydon bo`sh bo`lmasin']" />
            </div>
            <div v-if="childsubcats.length > 0" class="col-4">
              <q-select ref="subref" v-if="childsubcats.length > 0" outlined label="Toifani ro'yhatdan tanlang" v-model="val.childSubcat"
                :options="childsubcats" option-value="_id" option-label="title" emit-value map-options
                :rules="[val => val && val.length > 0 || 'Maydon bo`sh bo`lmasin']" />
            </div>
          </div>
            <div :class="`${atributs.length > 0 ? 'col-6' : 'col-8'} q-mb-lg`">
              <div class="row q-col-gutter-lg">
                <div class="col-4">
                  <q-input outlined v-model="val.title" label="E`lon sarlavhasi" lazy-rules
                :rules="[val => val && val.length > 0 || 'Maydon bo`sh bo`lmasin']" />                
                </div>
                <div class="col-2" v-if="val.priceType == 1">
                  <q-input outlined v-model="val.price" type="number" label="Narhi" lazy-rules />                
                </div>
                <div class="col-2" v-if="val.priceType == 1">
                  <q-select 
                    outlined
                    emit-value map-options
                    option-value="value" option-label="label"
                    v-model="val.priceName"
                    :options="[{label: 'so`m',value: 1},
                    {label: 'dollar',value: 2}]"
                    label="Valyuta turi"                    
                  />
                </div>
                <div class="col-2">
                  <q-select 
                    outlined
                    emit-value map-options
                    option-value="value" option-label="label"
                    v-model="val.priceType"
                    :options="priceTypeList"
                    label="Sotuv turi"                
                  />
                </div>
                <div class="col-2">
                  <q-select 
                    outlined
                    emit-value map-options
                    option-value="value" option-label="label"
                    v-model="val.addType"
                    :options="addTypeList"
                    label="E`lon xususiy yoki biznes"
                  />
                </div>
              </div>
              <q-editor 
              @paste="onPaste"
              v-model="val.text" 
              paragraph-tag="p"
              min-height="25rem" 
              ref="editorRef"
              />
            </div> 
            <h6 class="q-mb-md">Qo'shimcha ma'lumotlar</h6>
            <div class="row q-col-gutter-md q-mb-lg ">
              <div class="col-6">
                <q-input outlined v-model="val.address" label="Manzil" lazy-rules />     
              </div>
              <div class="col-3">
                <q-input outlined 
                  v-model="val.phone" 
                  label="Telefon raqam" 
                  mask="+### (##) ###-##-##"
                  lazy-rules />     
              </div>
              <div class="col-3">
                <q-select 
                    outlined
                    emit-value map-options
                    option-value="value" option-label="label"
                    v-model="val.statusType"
                    :options="statusTypeList"
                    label="Mahsulot xolati"
                  />
              </div>
            </div> 
            <div class="row q-col-gutter-md" >
              <div class="col-3">
                <h6 class="q-mb-md">E'lon rasmi</h6>
                <q-uploader
                    style="max-width: 100%; width:100%"
                    :url="`${url}/files/addimg`"
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
              </div>
              <div class="col-9">
                <h6 class="q-mb-md" v-if="atributs.length > 0">Atributlar</h6>
                <div class="row q-col-gutter-lg" v-if="atributs.length > 0">
                  <div class="col-3" v-for="atribut of atributs" :key="atribut._id">                
                    <q-select 
                      outlined
                        v-model="atribut.value"
                      :options="atribut.values"
                      :label="atribut.title"
                      v-if="atribut.type == 'select'"
                    />
                    <q-input 
                      outlined
                      v-model="atribut.value"
                      :label="atribut.title"
                      v-if="atribut.type == 'input'"
                    />
                  </div>
                </div>
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
import cookies from "vue-cookies"
import {url} from '@/stores/utils/env'

const $q = useQuasar()

const props = defineProps(['toggle', 'edit', 'id'])
const emits = defineEmits(['close'])

import { addStore } from '@/stores/data/add'
import { storeToRefs } from 'pinia'

import { categoryStore } from '@/stores/data/category'
const category_store = categoryStore()
const { categorys } = storeToRefs(category_store)

const store = addStore()

const editorRef = ref()

const priceTypeList = [
  {label: 'narh',value: 1},
  {label: 'tekin',value: 2},
  {label: 'almashish',value: 3}
]
const addTypeList = [
  {label: 'Xususiy',value: 1},
  {label: 'Biznes',value: 2},  
]
const statusTypeList = [
  {label: 'yangi',value: 1},
  {label: 'b/u',value: 2},  
]
// const priceTypeList = ['narh','tekin','almashish']



const subref = ref()
const subcategorys = ref([])
const get_subcategory = async id => {
  console.log(id)
  subcategorys.value = []
  if (!id) return false
  let res = await category_store.subcategories_by_cat(id)
  subcategorys.value = [...res.data]
  val.value.subcategory = subcategorys.value.at(0)._id
  if (res.data.length > 0)
    get_childsubcat(val.value.subcategory)
}

import { subcategoryStore } from '@/stores/data/subcategory'
const subcategory_store = subcategoryStore()
const childsubcats = ref([])
const atributs = ref([])

const get_childsubcat = async id => {
  childsubcats.value = []
  if (!id) return false
  let res = await subcategory_store.childsubcat_by_subcat(id)
  console.log(res.data)
  childsubcats.value = [...res.data.childsubcat]
  atributs.value = [...res.data.atributs]
  if (childsubcats.value.length > 0){
    val.value.childSubcat = childsubcats.value.at(0)._id
  } else {
    val.value.childSubcat = []
  }
}

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


const confirm = ref(false)
const val = ref({
  text: '',
  priceType: '',
  images:[]
})

const qform = ref()

const close = () => {
  val.value = {
    text: '',
    priceType: '',
    images:[]
  }
  emits('close')
}

const save = () => {
  qform.value.validate()
    .then(success => {
      if (success) {
        let atrs = [...atributs.value.map(atr => {
            return {
              id: atr._id,
              value: atr.value
            }
          })]
        let data = { 
          ...val.value,
          atributs: atrs.filter(atr => atr.value)
        }
        if (props.edit) {
          store.save_add({ ...data })
        } else {
          store.new_add({ ...data })
        }
        console.log(data);
        close()
      }
      else {
        // oh no, user has filled in
        // at least one invalid value
      }
    })
}


const handleUpload = (info) => {
    val.value.images = [info.xhr?.response,...val.value.images]
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
}



watch(
  () => props.toggle,
  () => {

    if (props.edit) {
      store.get_add(props.id)
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
    } else {
      let user = cookies.get('zoopay-user')
      val.value.phone = user.login
    }
    confirm.value = props.toggle
  }
)


</script>

<style></style>