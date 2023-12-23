import { ref } from 'vue';
import { defineStore } from 'pinia';

import { apiStore } from '../utils/api';
import { useQuasar } from 'quasar';
import { loadingStore } from '../utils/loading';

export const addStore = defineStore('addStore', () => {
  const adds = ref([]);
  const adds_count = ref(0);
  const loading_store = loadingStore();

  const $q = useQuasar();
  const api = apiStore();

  const get_adds = async (params) => {
    return await api.get({
        url: 'add',
        params,
    })      
  }

  const get_mine_adds = async (params) => {
    adds.value = []
    await api.get({
      url: 'add/mine',
      params
    })
    .then(res => {
      console.log(res.data)
      adds.value = [...res.data]
    })
  }

  const get_all_adds = (params) => {
    adds.value = [];
    loading_store.setLoading(true);
    api
      .get({
        url: 'add/all',
        params,
      })
      .then((res) => {
        console.log(res.data);
        adds.value = [...res.data.adds];
        adds_count.value = res.data.count;
      })
      .finally(() => {
        loading_store.setLoading(false);
      });
  }

  const create_add = async data => {
    return await api.post({
      url: 'add/create',
      data
    })
  }

  const new_add = async (data) => {
    let res = await api.post({
      url: 'add',
      data,
    });

    console.log(res.data);

    adds.value = [{ ...res.data }, ...adds.value];
    adds_count.value += 1;

    if (adds.value.length > 10) {
      adds.value.pop();
    }

    $q.notify({
      message: 'Yangi ma`lumot qo`shildi',
      color: 'green-10',
    });
  };

  const get_add = async (id) => {
    return await api.get({
      url: `add/${id}`,
    });
  };

  const save_add = async (data) => {
    let res = await api.put({
      url: 'add',
      data,
    });
    adds.value = [
      ...adds.value.map((add) => {
        if (add._id == res.data._id) return { ...res.data };
        return add;
      }),
    ];

    $q.notify({
      message: 'Ma`lumot yangilandi',
      color: 'green-10',
    });
  };

  const change_status = async (id) => {
    await api.get({ url: `add/change/${id}` });
    adds.value = [
      ...adds.value.map((add) => {
        if (add._id == id)
          return {
            ...add,
            status: add.status == 1 ? 0 : 1,
          };
        return add;
      }),
    ];

    $q.notify({
      message: 'Ma`lumot holati o`zgartirildi',
      color: 'green-10',
    });
  };

  const delete_add = async (id) => {
    await api.del({ url: `add/${id}` });
    adds.value = [...adds.value.filter((add) => add._id != id)];
    $q.notify({
      message: 'Ma`lumot o`chirildi',
      color: 'yellow-10',
    });
    adds_count.value -= 1;
  }

  const noref_favs = async data => {
    console.log(data)
    return await api.get({
      url: 'favouite/noreg',
      params: {
        data
      }
    })
  }

  const view_add = async (id) => {
    return await api.get({
      url: `add/view/${id}`
    })
  }

  const remove_file = async (path) => {
    return api.get({
      url:`add/removefile`,
      params: {path}
    })
  }

  return {
    adds,
    adds_count,

    get_mine_adds,
    create_add,
    get_adds,
    get_all_adds,
    new_add,
    get_add,
    save_add,
    change_status,
    delete_add,
    noref_favs,
    view_add,
    remove_file
  };
});
