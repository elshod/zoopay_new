import { defineStore } from "pinia";
import {ref} from 'vue'

import { apiStore } from "../utils/api";

import router from '../../router'
import { useQuasar } from 'quasar'
import cookies from "vue-cookies"


export const userStore = defineStore('userStore',()=>{
    const api = apiStore()
    const user = ref({})
    const $q = useQuasar()
    const person = ref({})

    const checkUser = async (role) => {
        if (cookies.isKey('zoopay-token')){   
            let res = await api.get({
                url: 'auth/checkuser'
            })
            user.value = {...res.data}
            if (res.data.role !== role){
                if (res.data.role == 'user'){
                    router.push('/user')
                }
                if (res.data.role == 'admin'){
                    router.push('/dashboard')
                }
            }
            // console.log(res.data)
        } else {
            router.push({name:'login'})
        }
    }

    const login = async data => {
        let res = await api.post({
            url: 'auth/login',
            data
        })
        console.log(res.data)
        if (res.status == 200){
            user.value = {...res.data.user}
            
            cookies.set('zoopay-user',{...res.data.user})
            cookies.set('zoopay-token',res.data.token)
            setTimeout(()=>{
                $q.notify({
                    message: 'Xush kelibsiz',
                    color: 'green-8',
                    icon:'info'
                })
                if (data.from){
                    return router.push(data.from)
                }
                if (res.data.user.role == 'user'){
                    return router.push('/user')
                } 
                if (res.data.user.role == 'admin'){
                    return router.push('/dashboard')
                }
            },500)
        }
    }

    const reg = async data => {
        let res = await api.post({
            url: 'auth/reg',
            data
        })        
        if (res.data == 'success'){
            $q.notify({
                message: 'Ro`yhatdan o`tdingiz. Endi tizimga kiring',
                color: 'green-8',
                icon: 'check_circle'
            })
            router.push('/auth/')
        }          
        
    }


    const info_me = async () => {
        let res = await api.get({
            url:'add/me'
        })
        person.value = {...res.data}
        console.log(res.data)
    }



    return {
        user,
        person,

        checkUser,
        reg,
        login,
        info_me
    }
})