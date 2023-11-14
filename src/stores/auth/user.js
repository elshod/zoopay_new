import { defineStore } from "pinia";
import {ref} from 'vue'

import { apiStore } from "../utils/api";
import { tokenStore } from "./token";

import router from '../../router'
import { useQuasar } from 'quasar'
import cookies from "vue-cookies"


export const userStore = defineStore('userStore',()=>{
    const api = apiStore()
    const token_store = tokenStore()
    const user = ref({})
    const $q = useQuasar()
    const checkUser = async () => {
        if (cookies.isKey('zoopay-token')){
            token_store.setToken(cookies.get('zoopay-token'))
            let res = await api.get({
                url: 'auth/checkuser'
            })
            user.value = {...res.data}
        } else {
            router.push({name:'login'})
        }
    }

    const login = async data => {
        let res = await api.post({
            url: 'auth/login',
            data
        })

        if (res.status == 200){
            user.value = {...res.data.user}
            cookies.set('zoopay-user',{...res.data.user})
            token_store.setToken(res.data.token.slice())
            $q.notify({
                message: 'Xush kelibsiz',
                color: 'green-8',
                icon:'info'
            })
            router.push('/dashboard')
        }
    }

    const reg = async data => {
        let res = await api.post({
            url: 'auth/reg',
            data
        })
        console.log(res.data)
        if (res.data == 'success'){
            $q.notify({
                message: 'Ro`yhatdan o`tdingiz. Endi tizimga kiring',
                color: 'green-8',
                icon: 'check_circle'
            })
            router.push('/auth/')
        }          
        
    }




    return {
        user,

        checkUser,
        reg,
        login
    }
})