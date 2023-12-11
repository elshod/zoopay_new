import { defineStore } from 'pinia';
import { ref } from 'vue';
import cookies from 'vue-cookies';
export const pageStore = defineStore('pageStore', () => {
  const page_title = ref('');

  const set_page_title = (title) => {
    document.title = `Zoopay | ${title}`;
    page_title.value = title;
  };

  const theme_list = ref(['body--light', 'body--dark']);
  const theme = ref(0);
  const set_theme = (value) => {
    theme.value = value;
    document.body.classList.remove('body--dark')
    document.body.classList.remove('body--light')
    document.body.classList.add(theme_list.value[value]);
    cookies.set('zoopay-theme', value);
  }

  const favs = ref([])
  const set_favs = (id = '') => {
    if (cookies.isKey('zoopay-fav')){
      favs.value = cookies.get('zoopay-fav')
      if (id.length == 0) return false
      let index = favs.value.indexOf(id)    
      if (index == -1){
        favs.value.unshift(id)
      } else {
        favs.value.splice(index,1)
      }
    } else {
      favs.value.push(id)    
    }
    cookies.set('zoopay-fav',favs.value)
  }

  return {
    page_title,
    set_page_title,
    theme,
    set_theme,
    favs,
    set_favs
  };
});
