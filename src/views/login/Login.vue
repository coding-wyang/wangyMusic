<template>
  <div class="contain">
		<img class="logo" src="@/assets/musicLogo.png" alt="logo">
		<div class="buttonCon">
		<el-button  class="button" @click="showLoginDialog()">登录</el-button>
		<!-- <el-dialog title="登录" :visible.sync="dialogVisible" width=30%>
			<el-form ref="loginForm" :model="loginForm" label-width="250px">
				<el-form-item label="用户名">
					<el-input v-model="loginForm.userName"></el-input>
				</el-form-item>
			</el-form>
		</el-dialog> -->
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
			dialogVisible: false,
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
	width: 375px;
	height: 812px;
	overflow: hidden;
	margin-top: -2px;
	background: rgb(177, 31, 14);
}
.buttonCon{
	position: fixed; 
	left: 14%;
	bottom: 50%;
}
.button{
		width:280px;
		height:40px;
		line-height: 200rpx;
		text-align: center;
		border-radius: 63px;
		border: 1px solid;
		color: #c2463a;
		display: block;
		text-decoration: none;
		margin: 0 auto;
	}
.logo{
	height: 80px;
	width: 80px;
	display: block;
	margin: 80px auto 40px;
}


</style>
