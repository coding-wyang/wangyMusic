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
  },
	{
		path:'/home',
		component: () => import("@/views/home/Home.vue"),
	}
]

const router =createRouter({
	history:createWebHistory(),
	routes,
});

export default router;