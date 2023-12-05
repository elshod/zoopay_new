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
    console.log(value);
    theme.value = value;
    document.body.classList.remove('body--dark')
    document.body.classList.remove('body--light')
    document.body.classList.add(theme_list.value[value]);
    cookies.set('zoopay-theme', value);
  };

  return {
    page_title,
    set_page_title,
    theme,
    set_theme,
  };
});
