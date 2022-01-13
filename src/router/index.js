import {createRouter, createWebHistory} from 'vue-router';
import Login from "@/views/login/Login.vue";

const routes = [
	{
		//重定向
		path: '/',
		redirect: '/login',
	},
	{
		path: '/login' ,
		component: Login/* () => import("@/views/login/Login.vue") */,
		meta:{
			keepAlive: true,
		}
  },
	{
		path:'/discovery',
		component: () => import("@/views/home/Discovery.vue"),
		meta:{
			keepAlive: true,
		}
	},
	{
		path:'/audio',
		component: () => import("@/views/audio/Audio.vue"),
		meta:{
			keepAlive: true,
		}
	}
]

const router =createRouter({
	history:createWebHistory(),
	routes,
});

export default router;