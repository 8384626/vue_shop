<template>
  <div class="login_from">
    <el-form ref="loginFormRef" :model="loginFrom" :rules="loginFromRules">
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input
          v-model="loginFrom.username"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          v-model="loginFrom.password"
          prefix-icon="el-icon-lock"
          type="password"
        ></el-input>
      </el-form-item>
      <!-- 按钮区域 -->
      <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="resetLoginForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getLoginDate } from "network/login";

export default {
  data() {
    return {
      loginFrom: {
        username: "admin",
        password: "123456",
      },
      // 表单的验证规则对象
      loginFromRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入管理员账户", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入管理员密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //登录操作
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return;
        this.getLoginDate(this.loginFrom);
      });
    },
    //点击重置按钮 重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },

    // 发送具体的网络数据
    getLoginDate(user) {
      getLoginDate(user).then(res => {
        console.log(res);
        if(res.meta.status == 200){
          this.$message.success('登陆成功')
          window.sessionStorage.setItem('token',res.data.token)
          this.$router.replace('/home')
        }else{
          this.$message.error('登陆失败')
        }
      });
    }
  }

};
</script>

<style scoped>
.login_from {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>