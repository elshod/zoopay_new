import {ref} from 'vue'
import { defineStore } from 'pinia'

import { apiStore } from '../utils/api'
import { useQuasar } from 'quasar'
import { loadingStore } from '../utils/loading'

export const childsubcatStore = defineStore('childsubcatStore',()=>{
    const childsubcats = ref([])
    const childsubcats_count = ref(0)
    const loading_store = loadingStore()
    
    const $q = useQuasar()
    const api = apiStore()

    const get_all_childsubcats = params => {
        childsubcats.value = []
        loading_store.setLoading(true)
        api.get({
            url: 'childsubcat/all',
            params
        }).then(res => {
            console.log(res.data)
            childsubcats.value = [...res.data.childsubcats]
            childsubcats_count.value = res.data.count
        }).finally(()=>{
            loading_store.setLoading(false)
        })
        
    }

    const new_childsubcat = async data => {
        console.log(data)
        let res = await api.post({
            url: 'childsubcat',
            data
        })

        childsubcats.value = [{...res.data},...childsubcats.value]
        childsubcats_count.value += 1

        if (childsubcats.value.length > 10){
            childsubcats.value.pop()
        }

        $q.notify({
            message: 'Yangi ma`lumot qo`shildi',
            color: 'green-10'
        })
        
    }

    const get_childsubcat = async id => {
        return await api.get({
            url: `childsubcat/${id}`
        })
    }

    const save_childsubcat = async data => {
        api.put({
            url : 'childsubcat',
            data
        }).then(res => {
            console.log({...res.data})
    
            childsubcats.value = [...childsubcats.value.map(childsubcat => {
                if (childsubcat._id == res.data._id) return {...res.data}
                return childsubcat
            })]
    
            $q.notify({
                message: 'Ma`lumot yangilandi',
                color: 'green-10'
            })
        })

    }

    const change_status = async id => {
        await api.get({url: `childsubcat/change/${id}`})
        childsubcats.value = [...childsubcats.value.map(childsubcat => {
            if (childsubcat._id == id) return {
                ...childsubcat,
                status: childsubcat.status == 1 ? 0 : 1
            }
            return childsubcat
        })]

        $q.notify({
            message: 'Ma`lumot holati o`zgartirildi',
            color: 'green-10'
        })
    }

    const delete_childsubcat = async id => {
        await api.del({url:`childsubcat/${id}`})
        childsubcats.value = [...childsubcats.value.filter(childsubcat => childsubcat._id != id)]        
        $q.notify({
            message: 'Ma`lumot o`chirildi',
            color: 'yellow-10'
        })
        childsubcats_count.value -= 1
    }

    return {
        childsubcats,
        childsubcats_count,

        get_all_childsubcats,
        new_childsubcat,
        get_childsubcat,
        save_childsubcat,
        change_status,
        delete_childsubcat
    }
})