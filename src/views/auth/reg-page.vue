<template>
  <h5>Xush kelibsiz!</h5>
  <h2 class="">Ro’yhatdan o’tish</h2>
  <q-form 
    @submit="onSubmit"  
    class="q-mt-xl q-gutter-md"
    ref="regform"
    >
    <q-input 
        outlined 
        v-model="name" 
        label="Ism-familiyangiz" 
        :rules="[ val => val.length >= 5 || 'Ism familiya kamida 5 ta simvol bo`lsin' ]"
        />
    <q-input 
        outlined 
        v-model="phone" 
        label="Telefon raqamingiz" 
        mask="+### (##) ###-##-##"
        :rules="[ val => val.length == 19 || 'Telefon raqam +998 (99) 123-45-67 misolida bo`lishi lozim' ]"
        />
    <q-input 
        v-model="password" 
        outlined 
        :type="isPwd ? 'password' : 'text'" 
        label="Mahfiy kalitingiz"
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
    <q-toggle v-model="accept" label="Zoopay tizimidan foydalanish shartlariga roziman" />
    <q-btn 
    style="background: #1fab89; color: white"
    icon="how_to_reg"
    label="Ro’yhatdan o’tish" @click="onSubmit"/>
  </q-form>
</template>

<script setup>
import {ref} from 'vue'
import { useQuasar } from 'quasar'
import {userStore} from '@/stores/auth/user'
const store = userStore()

const $q = useQuasar()

const regform = ref()
const name = ref('')
const phone = ref('')
const password = ref('')
const isPwd = ref(true)
const accept = ref(false)


const onSubmit = () => {
    regform.value.validate().then(success => {
      if (success) {
        if (accept.value){
            store.reg({
                name: name.value,
                login: phone.value,
                password: password.value 
            })
        } else {
            $q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: 'Ro`yhatdan o`tish uchun tizim shartlariga rozi bo`lishingiz kerak bo`ladi'
            })
        }
      }
      else {
        
      }
    })
}


</script>

<style></style>
