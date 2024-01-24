<template>
  <q-list bordered class="rounded-borders">
      <q-item-label header>Chatlar</q-item-label>

      <div v-for="chat of chats" :key="chat._id">
        <q-item 
          clickable v-ripple @click="showChat(chat._id)" 
          :class="{'active':current_chat == chat._id}">
          <q-item-section avatar>
            <q-avatar v-if="chat?.lastMessage?.add?.images?.at(0)">
              <img :src="`${url}/${chat?.lastMessage?.add?.images?.at(0)}`" >
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{chat?.lastMessage?.add?.title}}</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">{{chat?.lastMessage?.from?.name}}</span>
              {{chat?.lastMessage?.message}}
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            {{convertDate(chat?.lastMessage?.createdAt)}}
          </q-item-section>
        </q-item>

      <q-separator inset="item" />
      </div>

    </q-list>
</template>

<script setup>
import {convertDate} from '@/stores/utils/func'
import {useMessageStore} from '@/stores/data/message'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import {url} from '@/stores/utils/env'
import { useRoute, useRouter } from 'vue-router'
const store = useMessageStore()
const {chats} = storeToRefs(store)
const current_chat = ref('')

onMounted(async ()=>{
  await store.chat_room()
})


const router = useRouter()
const route = useRoute()
const showChat = async id => {
  router.push({name:'msg', query: {id}})
  await store.get_chat(id)
  current_chat.value = id
}

onMounted(()=>{
  if (route.query?.id){
    showChat(route.query?.id)
  }
})

</script>

<style>

</style>