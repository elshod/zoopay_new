<template>
    <q-dialog v-model="confirm" @hide="close()" persistent position="top">
        <q-card>
            <q-card-section class="row items-center">
                <q-avatar icon="help_outline" color="red-5" text-color="white" />
                <span class="q-ml-sm">{{ title }}</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn unelevated label="Bekor qilish" color="primary" v-close-popup />
                <q-btn flat label="Ha" unelevated @click="remove()" color="red-5" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
const emit = defineEmits(['confirm','close'])
const props = defineProps(['toggle','title'])
const confirm = ref(false)

const remove = () => {
    emit('confirm',true)
}

const close = () => {
    emit('confirm',false)
}

watch(
    () => props.toggle,
    () => {
        console.log(props.toggle)
        confirm.value = props.toggle
    }
)

</script>
