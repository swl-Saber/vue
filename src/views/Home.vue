<template>
  <div class="home">
    这里是首页
    <br />
    <router-link to="./login">登录页</router-link>
    <br />
    <router-link to="./register">注册页</router-link>
    <br />
    <router-link to="./profile">个人中心</router-link>
    <br />
    <router-link to="./profile">编辑资料</router-link>
    <br />
    <div @click="editlogin">退出登录</div>
    <br />
  </div>
</template>

<script>
export default {
  methods: {
    //退出登录
    editlogin() {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      console.log("退出成功");
    }
  }
};
</script>

<style></style>
