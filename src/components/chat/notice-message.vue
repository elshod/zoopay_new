<template>
  <div class="box" v-if="owner != user.id">
    <div class="notice__message row" v-if="user?.id">
      <div class="col q-pr-md">
        <q-input
          outlined
          v-model="message"
          :label="t('notice.message')"
          @keypress.enter="sendMessage"
        />
      </div>

      <q-btn icon="send" color="green-10" @click="sendMessage" />
    </div>
    <div v-else class="text-center">
      <h4 class="no_entry">
        {{ t("user.no_entry") }}
      </h4>
      <q-btn :label="t('user.entry_btn')" color="green-10" to="/auth" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["id", "owner"]);
import { wss } from "@/stores/utils/env";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
import { useQuasar } from "quasar";
const $q = useQuasar();
import { useMessageStore } from "@/stores/data/message";
const store = useMessageStore();

const message = ref("");
const socket = ref({});
const user = ref({});
const ownMe = ref(false); // e'lon egasi o'zim

import { userStore } from "@/stores/auth/user";
const user_store = userStore();

const sendMessage = async () => {
  await store.send_message({
    to: props.owner,
    message: message.value,
    add: props.id,
  });

  $q.notify({
    message: t("notice.success_message"),
    color: "green-10",
    icon: "announcement",
  });

  message.value = "";
};

const checkingUser = async () => {
  let res = await user_store.check();
  if (res.data !== "false") {
    console.log(res.data,props)
    user.value = { ...res.data };
    // ownMe.value = user.value._id == props.use;
  }
};



onMounted(async () => {
  await checkingUser()
  
});
</script>

<style lang="scss">
.no_entry {
  text-align: center;
  font-size: 18px;
}
</style>
