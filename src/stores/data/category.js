import {ref} from 'vue'
import { defineStore } from 'pinia'

import { apiStore } from '../utils/api'
import { useQuasar } from 'quasar'
import { loadingStore } from '../utils/loading'

export const categoryStore = defineStore('categoryStore',()=>{
    const categorys = ref([])
    const categorys_count = ref(0)
    const loading_store = loadingStore()
    
    const $q = useQuasar()
    const api = apiStore()

    const get_categorys = params => {
        categorys.value = []
        loading_store.setLoading(true)
        api.get({
            url: 'category/',
            params
        }).then(res => {  
            console.log(res.data);
            categorys.value = [...res.data.categories]
            categorys_count.value = res.data.count
        }).finally(()=>{
            loading_store.setLoading(false)
        })
        
    }

    const get_all_categorys = params => {
        categorys.value = []
        loading_store.setLoading(true)
        api.get({
            url: 'category/all',
            params
        }).then(res => {  
            categorys.value = [...res.data.categories]
            categorys_count.value = res.data.count
        }).finally(()=>{
            loading_store.setLoading(false)
        })
        
    }

    const new_category = async data => {
        console.log(data)
        let res = await api.post({
            url: 'category',
            data
        })

        categorys.value = [{...res.data},...categorys.value]
        categorys_count.value += 1

        if (categorys.value.length > 10){
            categorys.value.pop()
        }

        $q.notify({
            message: 'Yangi ma`lumot qo`shildi',
            color: 'green-10'
        })
        
    }

    const get_category = async id => {
        return await api.get({
            url: `category/${id}`
        })
    }

    const save_category = async data => {
        let res = await api.put({
            url : 'category',
            data
        })
        categorys.value = [...categorys.value.map(category => {
            if (category._id == res.data._id) return {...res.data}
            return category
        })]

        $q.notify({
            message: 'Ma`lumot yangilandi',
            color: 'green-10'
        })
    }

    const change_status = async id => {
        await api.get({url: `category/change/${id}`})
        categorys.value = [...categorys.value.map(category => {
            if (category._id == id) return {
                ...category,
                status: category.status == 1 ? 0 : 1
            }
            return category
        })]

        $q.notify({
            message: 'Ma`lumot holati o`zgartirildi',
            color: 'green-10'
        })
    }

    const delete_category = async id => {
        await api.del({url:`category/${id}`})
        categorys.value = [...categorys.value.filter(category => category._id != id)]        
        $q.notify({
            message: 'Ma`lumot o`chirildi',
            color: 'yellow-10'
        })
        categorys_count.value -= 1
    }

    const subcategories_by_cat = async ({id,params}) => {
        
        return api.get({
            url:`category/bycat/${id}`,
            params
        })
    }

    return {
        categorys,
        categorys_count,

        get_categorys,
        get_all_categorys,
        new_category,
        get_category,
        save_category,
        change_status,
        delete_category,
        subcategories_by_cat,
    };
})