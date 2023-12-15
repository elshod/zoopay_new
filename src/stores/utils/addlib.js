import { defineStore } from "pinia";
import { ref } from "vue";

export const useAddlibStore = defineStore('addlibStore',()=>{
    const priceTypeList = ref([
        {label: 'narh',value: 1},
        {label: 'tekin',value: 2},
        {label: 'almashish',value: 3}
    ])
    const addTypeList = ref([
        {label: 'Xususiy',value: 1},
        {label: 'Biznes',value: 2},  
    ])
    const statusTypeList = ref([
        {label: 'yangi',value: 1},
        {label: 'b/u',value: 2},  
    ])

    const priceList = ref([
        {label: 'so`m',value: 1},
        {label: '$',value: 2}
    ])

    return {
        priceTypeList,
        addTypeList,
        statusTypeList,
        priceList
    }
})