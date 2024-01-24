<template>
    <div style="width: 100%;" class="chat">
      <div class="chat__list">
        <q-chat-message
            v-for="item of messages"
            :key="item"
            :name="item.from._id == user.id ? t('user.me') : item.to.name" 
            :sent="item.from._id == user.id"
            :bg-color="item.from._id == user.id ? 'amber-7' : 'primary'"
            :text="[item.message]"
            size="6"
            :stamp="convertDate(item.createdAt)"
            :text-color="item.from._id == user.id ? 'black' : 'white'"
        />
      </div>
      <div class="chat__input row">
        <div class="col q-pr-md">
        <q-input 
            outlined 
            v-model="message"                 
            @keypress.enter="send"
            />
        </div>

        <q-btn 
            icon="send"
            @click="send()"
            color="green-10"
        />
      </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import {onMounted, ref} from 'vue'
import {convertDate} from '@/stores/utils/func'
import {wss} from '@/stores/utils/env'
import {useMessageStore} from '@/stores/data/message'
import { useQuasar } from 'quasar'

const store = useMessageStore()
const {messages} = storeToRefs(store)
const message = ref('')

const $q = useQuasar()

const { t } = useI18n()
const route = useRoute()
const send = async () => {
    // console.log({
    //     chatroom:route.query?.id,
    //     message:message.value,
    //     to:messages.value.at(0).to?._id,
    //     add:messages.value.at(0).add?._id
    // });
    let res = await store.send_message({
        chatroom:id.value,
        message:message.value,
        to:messages.value.at(0).to?._id,
        add:messages.value.at(0).add?._id
    })
    socket.value.send(JSON.stringify({chatroom:id.value,action:'get_message'}))
    message.value = ''
    $q.notify({
        message: t('notice.success_message'),
        color: 'green-10',
        icon: 'announcement'
    })
}
const id = ref('')
import { userStore } from "@/stores/auth/user";
import { useRoute } from 'vue-router'
const user_store = userStore();
const user = ref({})
const socket = ref({})

const syncSocket = async () => {

    socket.value = new WebSocket(wss)
    socket.value.onopen = (event)=>{
        console.log(`Websocket is opened ${event}`);
    }

    socket.value.onmessage = async (event) => {
        console.log('77',event)
        const data = JSON.parse(event.data)
        console.log(data)
        await store.get_last_massage(id.value)
    }

    socket.value.onerror = (err) => {
        console.error(err)
        $q.notify({
            message: t('notice.error_message'),
            color: 'red-10',
            icon: 'announcement'
        })
    }

    socket.value.onclose = (event) => {
        console.log('socket is closed',event)
    }

}

onMounted(async ()=>{
    let res = await user_store.check();
    if (res.data !== "false") {
        console.log(res.data)
        user.value = { ...res.data }
    }
    id.value = route?.query?.id
    await syncSocket()
})


</script>

<style lang="scss">
.chat {
    border:1px solid #e4e4e4;
    height: 100%;
    padding: 20px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    overflow: auto;
    max-height: 700px;
    &__list {
        flex:1;
        overflow: auto;
        padding: 0 10px;     
    }
    &__input {
        margin-top: 20px;
    }
}
</style>