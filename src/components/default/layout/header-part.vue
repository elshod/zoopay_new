<template>
  <header>
    <div class="container row items-center">
      <router-link to="/" class="logo">
        Zoopay
      </router-link>
      <div class="q-ml-auto row">
        <div class="languages">
          <q-btn 
          flat
          color="white"
          label="Uz"
          />
          <q-btn 
          flat
          color="white"
          label="Ru"
          />
        </div>
        <div class="btns">
          <q-btn 
          class="home"
          flat
          color="white"
          icon="home"/>
          <q-btn 
          class="favorite"
          flat
          color="white"
          icon="favorite_border">
            <q-badge floating color="red">2</q-badge>
          </q-btn>
          
          <q-btn 
          flat
          class="message"
          color="white"
          icon="message">
            <q-badge floating color="red">22</q-badge>
          </q-btn>

          <q-btn 
          flat
          class="person"
          color="white"
          icon="person"/>

          <q-btn 
            unelevated
            class="add"
            color="white"
            text-color="black"
            icon="add"
            label="Yangi e`lon"
          />

          <q-btn 
              unelevated
              round
              class="add_mobile"
              color="white"
              text-color="black"
              icon="add"
            />


        </div>


        

      </div>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@/styles/components/default/header.scss';
</style>