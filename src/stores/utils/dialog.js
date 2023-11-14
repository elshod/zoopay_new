import {ref} from 'vue'
import { defineStore } from 'pinia'

export const dialogStore = defineStore('dialogStore',()=>{
    const toggle = ref(false)
    const setToggle = value => {
        toggle.value = value
    }

    const editToggle = ref(false)
    const setEditToggle = value => {
        console.log(value)
        editToggle.value = value
    }

    

    return {
        toggle,
        editToggle,

        setToggle,
        setEditToggle
    }

})