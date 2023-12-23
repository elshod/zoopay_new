<template>
    <div class="user">
        <div class="container">
            <div class="row justify-center">
                <div class="col-sm-6 col-12">
                    <h4 class="q-mb-lg text-center">Sozlamalar</h4>
                    <div class="info text-center">
                        <img src="https://i.pinimg.com/564x/c9/f2/31/c9f2319cc39de0b9385b21e15b65ee4e.jpg" alt="">
                        <div class="phone q-mb-lg">+998 91 914-11-16</div>
                        <q-input
                            outlined 
                            v-model="user.name"
                            label="Foydalanuvchi ism-familiyasi"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Maydon bo`sh bo`lmasin']"
                        />
                        <q-input
                            outlined 
                            v-model="user.other"
                            label="Foydalanuvchi propertylari"
                            :rules="[ val => val && val.length > 0 || 'Maydon bo`sh bo`lmasin']"
                            lazy-rules
                        />
                        <q-input
                            outlined 
                            v-model="user.other"
                            label="Foydalanuvchi propertylari"
                            :rules="[ val => val && val.length > 0 || 'Maydon bo`sh bo`lmasin']"
                            lazy-rules
                        />


                        <q-btn label="Saqlash" class="bg-green q-mt-lg" text-color="white" unelevated />

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const user = ref({
    name:'Red Panda'
})

</script>

<style lang="scss">
@import '@/styles/views/user.scss';
</style>