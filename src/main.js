import { createApp } from 'vue';
import VTouch from 'vue3-touch';
import App from './App.vue';
import router from './router';
import './assets/icon/iconfont.css';
import store from './store/index';

const Vue = createApp(App);

Vue.use(router).use(store).use(VTouch).mount('#app');
