<template>
  <el-dialog 
    title="登录"
		custom-class="dialog"
    v-model="dialogFlag"
    :close-on-click-model="false"
    :before-close="loginDiaClose"
    :destroy-on-close="true"
    width="90%"
  >
    <!-- 登录表单区域 -->
    <el-form :model="loginForm" status-icon :rules="loginFormRules" ref="loginFormRef" >
      <el-form-item label="账号" prop="userName" label-width="60px">
        <el-input v-model="loginForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword" label-width="60px">
        <el-input v-model="loginForm.userPassword"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="danger" class="buttonDia" @click="userInfGet()"
      >确认</el-button>
			<el-button class="buttonReset" @click="resetForm()">重置</el-button>
  </el-dialog>
</template>

<script>
import { loginGet } from "@/http/api.js";
export default {
  name: "LoginDialog",
  props: {
    dialogFlag: Boolean,
  },
  emits: ["closeDia"],
  data() {
    return {
      loginForm: {
        userName: "15877532644",
        userPassword: "sB250...",
      },
			loginFormRules:{
            //用户名和密码表单验证
          userName:[ 
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
					userPassword: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
            ],
        }
    };
  },
  methods: {
    loginDiaClose() {
      this.$emit("closeDia");
			this.$refs.loginFormRef.resetFields();//重置表单数据
    },
		resetForm() {
			this.$refs.loginFormRef.resetFields();
		},
    userInfGet() {
        loginGet({ phone: this.loginForm.userName, password: this.loginForm.userPassword }).then((res) => {
          console.log(res);
					if (res.code !== 200){
						ElMessage.error('登录失败')
					}else {
						this.$router.push('discovery')
					}
        }).catch((error) => {
					console.log(error);
				});
    },
  },
};
</script>

<style>
.buttonDia{
}
.dialog{
		line-height: 30rpx;
		position:relative;
		width:330px;
		height:30rpx;
		text-align: center;
		border-radius: 70px;
		border: 1px solid;
		background: rgb(211, 45, 27);
		border-color: rgb(211, 45, 27);
		margin: 200px auto;
}
</style>
