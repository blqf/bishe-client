<template>
  <div class="about-me-container">
    <div class="login-register" v-if="!this.$store.state.userInfo.userId">
      <div class="card to-login" @click="handleLogin">去登录</div>
    </div>
    <div class="login-register" v-else>
      <div class="card logout" @click="handleLogout">退出登录</div>
    </div>
  </div>
</template>

<script>
import JsCookie from "js-cookie";
export default {
  methods: {
    handleLogin() {
      this.$router.push("/login");
    },
    handleLogout() {
      JsCookie.remove("authorization");
      this.$store.commit("userInfo/resetUserInfo");
    },
  },
};
</script>

<style lang="less" scoped>
.about-me-container {
  .login-register {
    display: flex;
    justify-content: center;
    align-items: center;
    .card {
      width: 100px;
      height: 100px;
      background-color: #0af;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-weight: 700;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 200px;
      box-shadow: 0 0 20px #0af;
    }
    .to-register {
      margin-left: 100px;
    }
  }
}
</style>
