import { defineStore } from "pinia"
import {ref} from 'vue'

export const loadingStore = defineStore('loadingStore',()=>{
    const loading = ref(false)

    const setLoading = val => {
        loading.value = val
    }

    return {
        loading,

        setLoading
    }
})