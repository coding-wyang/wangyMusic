import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "../src/assets/icon/iconfont.css"
import store from "./store/index.js";
import VTouch from 'vue3-touch';

const Vue = createApp(App)

Vue.use(router).use(store).use(VTouch).mount('#app')
