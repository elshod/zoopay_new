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

    const chat_room = async () => {
        let res = await api.get({
            url: 'message/chatroom'
        })
        // console.log(res.data)
        chats.value = [...res.data]
    }

    const get_chat = async (id) => {
        let res = await api.get({url:`message/one`,params: {chatroom:id}})
        console.log(res.data)
        messages.value = [...res.data]
    }

    const get_last_massage = async id => {
        let res = await api.get({url:`message/last/${id}`})
        console.log('last',res.data)
        messages.value = [...messages.value,res.data]
    }

    return {
        message,
        messages,
        chats,
        get_last_massage,
        get_chat,
        chat_room,
        send_message
    }

})