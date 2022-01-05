<template>
  <div class="contain">
		<img class="logo" src="@/assets/musicLogo.png" alt="logo">
		<el-button class="button" @click="showLoginDialog()">登录</el-button>
		<!-- <el-dialog title="登录" :visible.sync="dialogVisible" width=30%>
			<el-form ref="loginForm" :model="loginForm" label-width="250px">
				<el-form-item label="用户名">
					<el-input v-model="loginForm.userName"></el-input>
				</el-form-item>
			</el-form>
		</el-dialog> -->
		<login-dialog :dialogFlag="dialogVisible" @closeDia="closeDia"></login-dialog>
	</div>
</template>

<script>
import LoginDialog from '@/components/LoginDialog.vue';

export default {
	name:'Login',
	components: {LoginDialog},
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
.button{
		display: block;
		margin:0 auto;
}

.logo{
	display: block;
	height: 280px;
	width: 280px;
	margin:0 auto;
}
</style>
