import { ref } from 'vue';
import { defineStore } from 'pinia';

import { apiStore } from '../utils/api';

export const placeStore = defineStore('placeStore', () => {
  const regions = ref([]);
  const districts = ref([]);
  const api = apiStore();

  const get_regions = async () => {
    let res = await api.get({
      url: 'place'
    })
    regions.value = [...res.data]    
  }

  const get_districts = async params => {
    let res = await api.get({
        url: 'place/district',
        params,
    })      
    districts.value = [...res.data]
  }

  
  return {
    regions,
    districts,

    get_regions,
    get_districts
  };
});
