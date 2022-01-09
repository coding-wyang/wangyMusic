import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "../src/assets/icon/iconfont.css"
import store from "./store/index.js";

const Vue = createApp(App)

Vue.use(router).use(store).mount('#app')
