<template>
  <div class="notice__message row" v-if="user?.id">
    <div class="col q-pr-md">
        <q-input 
            outlined 
            v-model="message" 
            :label="t('notice.message')"
            @keypress.enter="sendMessage"
        />
    </div>

    <q-btn 
        icon="send"
        color="green-10"
        @click="sendMessage"
    />
  </div>
  <div v-else class="text-center">
      <h4 class="no_entry" >
        {{t('user.no_entry')}}
      </h4>
      <q-btn :label="t('user.entry_btn')" color="green-10" to="/auth"/>
  </div>
  
</template>

<script setup>
const props = defineProps(['id','user'])
import {wss} from '@/stores/utils/env'
import {onMounted, ref} from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { useQuasar } from 'quasar'
const $q = useQuasar()
import {useMessageStore} from '@/stores/data/message'
const store = useMessageStore()

const message = ref('')
const socket = ref({})
const user = ref({})


import {userStore} from '@/stores/auth/user'
const user_store = userStore()


const sendMessage = async () => {
    let res = await store.send_message({
        to: props.user,
        message: message.value,
        add: props.id
    })    
    socket.value.send(JSON.stringify({id:res.data._id,action:'new_message'}))

    $q.notify({
        message: t('notice.success_message'),
        color: 'green-10',
        icon: 'announcement'
    })

    message.value = ''

}

const checkingUser = async () => {
    let res = await user_store.check()
    if (res.data !== 'false'){
        user.value = {...res.data}
    }
}

const syncSocket = async () => {
    
    socket.value = new WebSocket(wss)
    socket.value.onopen = (event)=>{
        console.log(`Websocket is opened ${event}`);
    }

    socket.value.onmessage = (event) => {
        console.log(event)
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
    await checkingUser()
    await syncSocket()
})



</script>

<style lang="scss">
.no_entry{
    text-align: center;
    font-size: 18px;
}
</style>