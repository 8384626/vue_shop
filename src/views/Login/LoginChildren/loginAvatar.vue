<template>
  <div class="avatar_img">
    <div class="avatar_box">
      <img src="~assets/img/login/login.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.avatar_img {
  display: flex;
  justify-content: center;
  height: 0;
}
.avatar_box {
  padding: 10px;
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  transform: translateY(-50%);
}

.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>