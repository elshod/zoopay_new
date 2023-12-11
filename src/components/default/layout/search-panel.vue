<template>
  <div class="search">
    <div class="container">
      <div class="search__box">
        <q-input
          borderless
          v-model="title"
          placeholder="Nima qidiryapsiz"
          :dense="false"
          clearable
          @update:model-value="searching"
          @clear="clearList"
        />
        <q-btn unelevated icon="search" color="green-9" />
        <div :class="`search__result ${list.length > 0 ? 'active' : ''}`">
          <q-list bordered>
            <q-item 
              @click="toLink(item._id)"
              v-for="item of list"
              :key="item._id"
              clickable v-ripple>
              <q-item-section avatar>
                <q-avatar>
                  <img :src="`${url}/${item.images.at(0)}`" />
                </q-avatar>
              </q-item-section>
              <q-item-section>{{item.title}}</q-item-section>
            </q-item>           
          </q-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { addStore } from "@/stores/data/add";
import {url} from '@/stores/utils/env'
import { useRouter } from "vue-router";
const store = addStore();

const title = ref("");
const list = ref([])

const searching = async (title = '') => {
  if (title?.length >= 3) {
    let res = await store.get_adds({
      limit: 10,
      title,
    });
    list.value = [...res.data]
  }
  if (title?.length == 0){
    list.value = []
  }
}

const clearList = () => {
  list.value = []
  title.value = ''
}

const router = useRouter()

const toLink = id => {
  list.value = []
  title.value = ''
  router.push(`/notice/${id}`)
}

</script>

<style lang="scss" scoped>
@import "@/styles/components/default/search.scss";
</style>
