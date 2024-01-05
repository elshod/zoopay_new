import { defineStore } from "pinia";
import { ref } from "vue";

export const useAddlibStore = defineStore('addlibStore',()=>{
    const priceTypeList = ref([
        {label: 'narh',value: 1, ru:'цена',uz:'narh'},
        {label: 'tekin',value: 2, ru:'бесп.',uz:'tekin'},
        {label: 'almashish',value: 3, ru:'обмен',uz:'almashish'}
    ])
    const addTypeList = ref([
        {label: 'Xususiy',value: 1,ru:'частный',uz:'Xususiy'},
        {label: 'Biznes',value: 2,ru:'бизнес',uz:'Biznes'},  
    ])
    const statusTypeList = ref([
        {label: 'yangi',value: 1,ru:'новый',uz:'yangi'},
        {label: 'b/u',value: 2,ru:'б/у',uz:'b/u'},
    ])

    const priceList = ref([
        {label: 'so`m',value: 1,ru:'сум',uz:'so`m'},
        {label: '$',value: 2,ru:'$',uz:'$'}
    ])

    return {
        priceTypeList,
        addTypeList,
        statusTypeList,
        priceList
    }
})