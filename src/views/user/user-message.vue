<template>
  <div class="messages">
    <div class="container">
        <div class="row q-col-gutter-md">
            <div class="col-md-4 col-12">
                <chatList/>
            </div>
            <div class="col-md-8 col-12">
                <chatBox/>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import chatList from '@/components/chat/chat-list.vue'
import chatBox from '@/components/chat/chat-box.vue'
</script>

<style lang="scss">
.messages {
    padding-top: 30px;
}
</style>