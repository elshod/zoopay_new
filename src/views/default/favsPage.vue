<template>
    <div class="last q-my-xl">
        <div class="container">
            <div v-if="list.length > 0">
                <h4 class="text-center q-mb-xl">Tanlanganlar ro'yhati</h4>
                <card-list :list="list" page='fav' @changeList="handleChange" />
            </div>
            <div v-else class="text-center">
                <h4 class="q-mb-xl">Xozircha tanlanganlar yo'q</h4>
                <h5 class="q-mb-xl">E'lonlar sahifasiga o'tib tanlashingiz mumkin</h5>
                <q-btn icon="home" label="Bosh sahifa" to="/" unelevated color="green" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import cookies from 'vue-cookies'
import { addStore } from '@/stores/data/add'
import cardList from '@/components/card/card-list.vue'
const add_store = addStore()


const list = ref([])

const handleChange = id => {
    list.value = list.value.filter(item => item._id !== id)
}

onMounted(async () => {
    if (cookies.isKey('zoopay-fav')) {
        let res = await add_store.noref_favs(cookies.get('zoopay-fav'))
        list.value = [...res.data.favourites]
    }
})


</script>

<style></style>