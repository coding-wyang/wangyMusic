<template>
<!-- 登录页 -->
  <div class="contain">
		<!-- 网易云logo -->
		<img class="logo" src="@/assets/musicLogo.png" alt="logo">
		<div class="buttonCon">
		<el-button  class="button" @click="showLoginDialog()">登录</el-button>
		<!-- 子组件：登录页具体信息 -->
		<login-dialog :dialogFlag="dialogVisible" @closeDia="closeDia"></login-dialog>
		</div>
	</div>
</template>

<script>
import LoginDialog from '@/components/LoginDialog.vue';

export default {
	name:'Login',
	components: {
		LoginDialog
		},
	data() {
		return {
			dialogVisible: false,//控制窗口显示
			/* 登陆表单 */
			loginForm: {
				userName: '',
				number: ''
			}
		}
	},
	methods: {
		showLoginDialog(value){
			this.dialogVisible = true;
		},
		closeDia(){
			this.dialogVisible = false;
		}
	},
}
</script>

<style scoped>


.contain{
	width: 100%;
	height: 900px;
	overflow: hidden;
	margin: 0px;
	padding: 0px;
	background: rgb(177, 31, 14);
}
/* .buttonCon{
	position: fixed; 
	left: 14%;
	bottom: 50%;
} */
.button{
		width:280px;
		height:40px;
		line-height: 30rpx;
		text-align: center;
		border-radius: 63px;
		border: 1px solid;
		color: #c2463a;
		display: block;
		text-decoration: none;
		margin: 200px auto;
	}
.logo{
	height: 80px;
	width: 80px;
	display: block;
	margin: 80px auto 40px;
}


</style>
