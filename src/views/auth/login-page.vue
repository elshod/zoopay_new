<template>
    <h5>Xush kelibsiz!</h5>
    <h2 class="">Tizimda kirish</h2>
    <q-form 
      @submit="onSubmit"  
      class="q-mt-xl q-gutter-md"
      ref="regform"
      >
      <q-input 
          outlined 
          v-model="phone" 
          label="Telefon raqamingiz" 
          mask="+### (##) ###-##-##"
          :lazy-rules="true"
          :autofocus="true"
          :rules="[ val => val.length == 19 || 'Telefon raqam +998 (99) 123-45-67 misolida bo`lishi lozim' ]"
          />
      <q-input 
          v-model="password" 
          outlined 
          :type="isPwd ? 'password' : 'text'" 
          label="Mahfiy kalitingiz"
          :lazy-rules="true"
          :rules="[ val => val.length >= 5 || 'Mahfiy kalit kamida 5 ta simvol bo`lsin' ]"
          >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
      </q-input>
      <q-btn 
      color="primary" 
      icon="login"
      label="Kirish" 
      @click="onSubmit"/>
    </q-form>
  </template>
  
  <script setup>
  import {ref} from 'vue'
  import { useQuasar } from 'quasar'
  import {userStore} from '@/stores/auth/user'
  const store = userStore()
  
  const $q = useQuasar()
  
  const regform = ref()
  const phone = ref('')
  const password = ref('')
  const isPwd = ref(true)
  
  
  const onSubmit = () => {
      regform.value.validate().then(success => {
        if (success) {
            store.login({
                login: phone.value,
                password: password.value 
            })          
        }
      })
  }
  
  
  </script>
  
  <style></style>
  