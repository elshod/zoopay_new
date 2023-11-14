import { defineStore, storeToRefs } from "pinia";
import { url } from "./env";
import axios from "axios";

import { tokenStore } from "../auth/token";
import { useQuasar } from 'quasar'

import cookies from "vue-cookies"
import router from "../../router";

export const apiStore = defineStore('apiStore',() =>{

    const $q = useQuasar()

    const token_store = tokenStore()
    const {token} = storeToRefs(token_store)
    
    const get = async payload => {
        return await axios.get(`${url}/${payload.url}`,{
            params: payload.params,
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        }).catch(e => {
            console.log(e)
            if (e.response.status == 401){
                $q.notify({
                    message: 'Tizimga ruxsat yo`q',
                    color: 'red-5'
                })
                cookies.remove('zoopay-token')
                cookies.remove('zoopay-user')
                router.push({name:'login'})
            }
        })
    }

    const post = async payload => {
        return await axios.post(`${url}/${payload.url}`,payload.data,{
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        }).catch(e => {
            console.log(e)
            $q.notify({
                message: e.response.data,
                color: 'red-5',
                icon: 'announcement'
            })
            if (e.response.status == 401){
                $q.notify({
                    message: e.response.data,
                    color: 'red-5',
                    icon: 'announcement'
                })
                cookies.remove('zoopay-token')
                cookies.remove('zoopay-user')
                router.push({name:'login'})
            }
        })
    }
    
    const put = async payload => {
        return await axios.put(`${url}/${payload.url}`,payload.data,{
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        }).catch(e => {
            console.log(e.response.data)
            if (e.response.status == 401){
                $q.notify({
                    message: e.response.data,
                    color: 'red-5',
                    icon: 'announcement'
                })
                cookies.remove('zoopay-token')
                cookies.remove('zoopay-user')
                router.push({name:'login'})
            }
        })
    }

    const del = async payload => {
        return await axios.delete(`${url}/${payload.url}`,{
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        }).catch(e => {
            console.log(e)
            if (e.response.status == 401){
                $q.notify({
                    message: e.response.data,
                    color: 'red-5',
                    icon: 'announcement'
                })
                cookies.remove('zoopay-token')
                cookies.remove('zoopay-user')
                router.push({name:'login'})
            }
        })
    }

    return {
        get,
        post,
        put,
        del
    }
})