import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "../src/assets/icon/iconfont.css"

const Vue = createApp(App)


Vue.use(router).mount('#app')
