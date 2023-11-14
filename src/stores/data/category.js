import {ref} from 'vue'
import { defineStore } from 'pinia'

import { apiStore } from '../utils/api'
import { ElMessage } from 'element-plus'
import { loadingStore } from '../utils/loading'

export const productStore = defineStore('productStore',()=>{
    const products = ref([])
    const products_count = ref(0)
    const loading_store = loadingStore()
    
    const api = apiStore()

    const get_all_products = async params => {
        products.value = []
        loading_store.setLoading(true)
        let res = await api.get({
            url: 'product',
            params
        })
        console.log(res.data)
        products.value = [...res.data.products]
        products_count.value = res.data.count
        loading_store.setLoading(false)
    }

    const new_product = async data => {
        let res = await api.post({
            url: 'product',
            data
        })

        products.value = [{...res.data},...products.value]
        products_count.value += 1

        if (products.value.length > 10){
            products.value.pop()
        }

        ElMessage({
            type:'success',
            message: 'Yangi mahsulot qo`shildi!'
        })
    }

    const get_product = async id => {
        return await api.get({
            url: `product/${id}`
        })
    }

    const save_product = async data => {
        let res = await api.put({
            url : 'product',
            data
        })
        products.value = [...products.value.map(product => {
            if (product._id == res.data._id) return {...res.data}
            return product
        })]
        ElMessage({
            type:'success',
            message: 'Mahsulot yangilandi!'
        })
    }

    const change_status = async id => {
        await api.get({url: `product/change/${id}`})
        products.value = [...products.value.map(product => {
            if (product._id == id) return {
                ...product,
                status: product.status == 1 ? 0 : 1
            }
            return product
        })]
        ElMessage({
            type:'success',
            message: 'Mahsulot holati o`zgartirildi!'
        })
    }

    const delete_product = async id => {
        await api.del({url:`product/${id}`})
        products.value = [...products.value.filter(product => product._id != id)]
        ElMessage({
            type:'warning',
            message: 'Mahsulot o`chirildi!'
        })
        products_count.value -= 1
    }

    return {
        products,
        products_count,

        get_all_products,
        new_product,
        get_product,
        save_product,
        change_status,
        delete_product
    }
})