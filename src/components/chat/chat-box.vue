<template>
    <div style="width: 100%;" class="chat">
      <div class="chat__list">
        <q-chat-message
            name="me"
            avatar="https://cdn.quasar.dev/img/avatar3.jpg"
            :text="['hey, how are you?']"
            stamp="7 minutes ago"
            sent
            bg-color="amber-7"
        />
        <q-chat-message
            v-for="item of 15"
            :key="item"
            name="Jane1111"
            avatar="https://cdn.quasar.dev/img/avatar5.jpg"
            :text="[
            'doing fine, how r you?',
            'I just feel like typing a really, really, REALLY long message to annoy you...'
            ]"
            size="6"
            stamp="4 minutes ago"
            text-color="white"
            bg-color="primary"
        />
      </div>
      <div class="chat__input row">
        <div class="col q-pr-md">
        <q-input 
            outlined 
            v-model="message"                 
            @keypress.enter="sendMessage"
            />
        </div>

        <q-btn 
            icon="send"
            color="green-10"
        />
      </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'

const message = ref('')

const sendMessage = () => {

}


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
    }
    &__input {
        margin-top: 20px;
    }
}
</style>