import { ref } from 'vue';
import { defineStore } from 'pinia';

import { apiStore } from '../utils/api';
import { useQuasar } from 'quasar';
import { loadingStore } from '../utils/loading';

export const atributStore = defineStore('atributStore', () => {
  const atributs = ref([]);
  const atributs_count = ref(0);
  const loading_store = loadingStore();

  const $q = useQuasar();
  const api = apiStore();

  const get_atributs = (params) => {
    atributs.value = [];
    loading_store.setLoading(true);
    api
      .get({
        url: 'atribut/',
        params,
      })
      .then((res) => {
        atributs.value = [...res.data.atributs];
        atributs_count.value = res.data.count;
      })
      .finally(() => {
        loading_store.setLoading(false);
      });
  };

  const get_all_atributs = (params) => {
    atributs.value = [];
    loading_store.setLoading(true);
    api
      .get({
        url: 'atribut/all',
        params,
      })
      .then((res) => {
        console.log(res.data)
        atributs.value = [...res.data.atributs];
        atributs_count.value = res.data.count;
      })
      .finally(() => {
        loading_store.setLoading(false);
      });
  };

  const new_atribut = async (data) => {
    let res = await api.post({
      url: 'atribut',
      data,
    });

    console.log(res.data)

    atributs.value = [{ ...res.data }, ...atributs.value];
    atributs_count.value += 1;

    if (atributs.value.length > 10) {
      atributs.value.pop();
    }

    $q.notify({
      message: 'Yangi ma`lumot qo`shildi',
      color: 'green-10',
    });
  };

  const get_atribut = async (id) => {
    return await api.get({
      url: `atribut/${id}`,
    });
  };

  const save_atribut = async (data) => {
    let res = await api.put({
      url: 'atribut',
      data,
    });
    atributs.value = [
      ...atributs.value.map((atribut) => {
        if (atribut._id == res.data._id) return { ...res.data };
        return atribut;
      }),
    ];

    $q.notify({
      message: 'Ma`lumot yangilandi',
      color: 'green-10',
    });
  };

  const change_status = async (id) => {
    await api.get({ url: `atribut/change/${id}` });
    atributs.value = [
      ...atributs.value.map((atribut) => {
        if (atribut._id == id)
          return {
            ...atribut,
            status: atribut.status == 1 ? 0 : 1,
          };
        return atribut;
      }),
    ];

    $q.notify({
      message: 'Ma`lumot holati o`zgartirildi',
      color: 'green-10',
    });
  };

  const delete_atribut = async (id) => {
    await api.del({ url: `atribut/${id}` });
    atributs.value = [
      ...atributs.value.filter((atribut) => atribut._id != id),
    ];
    $q.notify({
      message: 'Ma`lumot o`chirildi',
      color: 'yellow-10',
    });
    atributs_count.value -= 1;
  };

  return {
    atributs,
    atributs_count,

    get_atributs,
    get_all_atributs,
    new_atribut,
    get_atribut,
    save_atribut,
    change_status,
    delete_atribut,
  };
});
