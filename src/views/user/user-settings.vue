<template>
    <div class="user">
        <div class="container">
            <div class="row justify-center">
                <div class="col-sm-6 col-12">
                    <h4 class="q-mb-lg text-center">{{t('user.settings')}}</h4>
                    <div class="info text-center">
                        <img src="https://i.pinimg.com/564x/c9/f2/31/c9f2319cc39de0b9385b21e15b65ee4e.jpg" alt="">
                        <div class="phone q-mb-lg">{{user.login}}</div>
                        <q-input
                            outlined 
                            v-model="user.name"
                            :label="t('user.name')"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || t('msg.required')]"
                        />
                        <q-input 
                        v-model="user.password" outlined 
                        :type="isPwd ? 'password' : 'text'" 
                        :label="t('user.password')"
                        class="q-mb-lg"
                        :lazy-rules="true"
                        >
                            <template v-slot:append>
                                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
                            </template>
                        </q-input>

                        <q-input 
                        v-model="user.repassword" outlined 
                        :type="isPwd1 ? 'password' : 'text'" 
                        :label="t('user.repassword')"
                        :lazy-rules="true"
                        >
                            <template v-slot:append>
                                <q-icon :name="isPwd1 ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd1 = !isPwd1" />
                            </template>
                        </q-input>


                        <q-btn 
                            @click="save()"
                            :label="t('add.save')" 
                            class="bg-green q-mt-lg" text-color="white" unelevated />

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const {t} = useI18n()

import {userStore} from '@/stores/auth/user'
const store = userStore()
const $q = useQuasar()
const user = ref({
    name:'Red Panda'
})


const isPwd = ref(true)
const isPwd1 = ref(true)

const save = () => {
    if ((user.value.password || user.value.repassword) && user.value.repassword != user.value.password 
    ){
        return $q.notify({ message: t('msg.newpassword'),color: 'red-5'})
    }

    if (user.value.password && user.value.password.length < 5){
        return $q.notify({ message: t('msg.minpassword'),color: 'red-5'})
    }

    store.user_update({...user.value})
    .then(res => {
        user.value = {...res.data}
        $q.notify({ message: t('msg.updated'),color: 'green-5'})
    })


}

onMounted(()=>{
    store.about_me()
    .then(res => {
        user.value = {...res.data}
    })
})



</script>

<style lang="scss">
@import '@/styles/views/user.scss';
</style>