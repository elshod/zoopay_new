import {defineStore} from 'pinia'
import {ref} from 'vue'
import { apiStore } from '../utils/api'

export const useMessageStore = defineStore('messageStore',()=>{
    const api = apiStore()

    const message = ref({})
    const messages = ref([]) // 
    const chats = ref([]) //

    const send_message = async (data) => {
        return api.post({
            url:'message',
            data
        })
    }

    return {
        message,
        messages,
        chats,


        send_message
    }

})