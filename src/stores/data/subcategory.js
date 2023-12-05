import {ref} from 'vue'
import { defineStore } from 'pinia'

import { apiStore } from '../utils/api'
import { useQuasar } from 'quasar'
import { loadingStore } from '../utils/loading'

export const subcategoryStore = defineStore('subcategoryStore',()=>{
    const subcategorys = ref([])
    const subcategorys_count = ref(0)
    const loading_store = loadingStore()
    
    const $q = useQuasar()
    const api = apiStore()

    const get_all_subcategorys = params => {
        subcategorys.value = []
        loading_store.setLoading(true)
        api.get({
            url: 'subcategory/all',
            params
        }).then(res => {
            console.log(res.data)
            subcategorys.value = [...res.data.subCategories]
            subcategorys_count.value = res.data.count
        }).finally(()=>{
            loading_store.setLoading(false)
        })
        
    }

    const new_subcategory = async data => {
        console.log(data)
        let res = await api.post({
            url: 'subcategory',
            data
        })

        subcategorys.value = [{...res.data},...subcategorys.value]
        subcategorys_count.value += 1

        if (subcategorys.value.length > 10){
            subcategorys.value.pop()
        }

        $q.notify({
            message: 'Yangi ma`lumot qo`shildi',
            color: 'green-10'
        })
        
    }

    const get_subcategory = async id => {
        return await api.get({
            url: `subcategory/${id}`
        })
    }

    const save_subcategory = async data => {
        api.put({
            url : 'subcategory',
            data
        }).then(res => {
            console.log({...res.data})
    
            subcategorys.value = [...subcategorys.value.map(subcategory => {
                if (subcategory._id == res.data._id) return {...res.data}
                return subcategory
            })]
    
            $q.notify({
                message: 'Ma`lumot yangilandi',
                color: 'green-10'
            })
        })

    }

    const change_status = async id => {
        await api.get({url: `subcategory/change/${id}`})
        subcategorys.value = [...subcategorys.value.map(subcategory => {
            if (subcategory._id == id) return {
                ...subcategory,
                status: subcategory.status == 1 ? 0 : 1
            }
            return subcategory
        })]

        $q.notify({
            message: 'Ma`lumot holati o`zgartirildi',
            color: 'green-10'
        })
    }

    const delete_subcategory = async id => {
        await api.del({url:`subcategory/${id}`})
        subcategorys.value = [...subcategorys.value.filter(subcategory => subcategory._id != id)]        
        $q.notify({
            message: 'Ma`lumot o`chirildi',
            color: 'yellow-10'
        })
        subcategorys_count.value -= 1
    }

    const childsubcat_by_subcat = async (id) => {
      return api.get({ url: `subcategory/bysubcat/${id}` });
    };

    return {
      subcategorys,
      subcategorys_count,

      get_all_subcategorys,
      new_subcategory,
      get_subcategory,
      save_subcategory,
      change_status,
      delete_subcategory,
      childsubcat_by_subcat,
    };
})