<template>
  <div class="login_container">
    <div class="login_box">
      <login-avatar></login-avatar>
      <login-from></login-from>
    </div>
  </div>
</template>

<script>
import loginAvatar from './LoginChildren/loginAvatar'
import LoginFrom from './LoginChildren/LoginFrom.vue';


export default {
  components:{
    loginAvatar,
    LoginFrom,
  }
};
</script>

<style scoped>
.login_container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2b4b6b;
  height: 100vh;
}
.login_box {
  position: relative;
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
}

</style>
