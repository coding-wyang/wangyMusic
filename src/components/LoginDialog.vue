<template>
  <el-dialog 
    title="登录"
		custom-class="dialog"
    v-model="dialogFlag"
    :close-on-click-model="false"
    :before-close="loginDiaClose"
    :destroy-on-close="true"
    width="100%"
  >
    <!-- 登录表单区域 -->
    <el-form :model="loginForm" status-icon :rules="loginFormRules" ref="loginFormRef" >
      <el-form-item label="账号" prop="userName" label-width="60px" class="username">
        <el-input v-model="loginForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword" label-width="60px" class="password">
        <el-input v-model="loginForm.userPassword" :type="pwdType" ></el-input>
				<div class="active-eye" @click="changeType()">
					<i :class="src"/>
				</div>
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
				pwdType:"password",
				src:"iconfont  icon-yincang",
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
	watch:{
		pwdType(val){
			if (val === 'password') {
				this.src = "iconfont  icon-yincang"
			} else if(val === 'text') {
				this.src = 'iconfont icon-xianshi'
			}
		}
	},
  methods: {
		/* 控制密码显示隐藏 */
		changeType(){
			this.pwdType = this.pwdType==='password'?'text':'password';
			},
    loginDiaClose() {
      this.$emit("closeDia");
			this.$refs.loginFormRef.resetFields();//重置表单数据
    },
		resetForm() {
			this.$refs.loginFormRef.resetFields();
		},
    userInfGet() {
			/* 用户信息获取 */
        loginGet({ phone: this.loginForm.userName, password: this.loginForm.userPassword }).then((res) => {
          console.log(res);
					if (res.code === 200){
						this.$router.push('discovery')
						this.$store.commit("setIsShowFooter","true")
					}else {
							ElMessage.error({
							message: "登录失败",
							duration: 0,
							offset: 10,
						})
					}
        }).catch((error) => {
						}
				);
    },
  },
};
</script>

<style lang="scss">
.el-message{
	position: absolute;
	padding-inline-start: 50px;
	background: white;
}
.el-message__icon{
	background: #ffff;
}
.el-message__content {
	font-weight: 600;
	position: absolute;
	left: 40%;
}
.el-icon .icon{
	visibility: hidden;
} 
.dialog{
		/* line-height: 30rpx; */
		position: fixed;
		top: -200px;
		width: 100%;
		height: 100%;
		text-align: center;
		background: rgb(253, 253, 253);
		margin: 200px auto;
}
.password{
	position: relative;
}
.active-eye{
	position: relative;
	left: 83%;
	bottom: 32px;
}
</style>
