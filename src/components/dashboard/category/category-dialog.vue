<template>
    {{props.data}}
    <q-dialog 
        v-model="confirm" 
        persistent
        @hide="close()"
        >
      <q-card style="width: 400px; max-width:100%">
        <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Yangi kategoriya</div>
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
const props = defineProps(['toggle'])
const emits = defineEmits(['close'])
import {language} from '@/stores/utils/func'
import {categoryStore} from '@/stores/data/category'
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
            store.new_category({...val.value})
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
        confirm.value = props.toggle
    }
)


</script>

<style>

</style>