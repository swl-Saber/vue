<template>
  <div class="home">
    <!-- <router-link to="./login">登录页</router-link>
    <br />
    <router-link to="./register">注册页</router-link>
    <br />
    <router-link to="./profile">个人中心</router-link>
    <br />
    <router-link to="./edit">编辑资料</router-link>
    <br />
    <router-link to="./myfollow">我的关注</router-link>
    <br />
    <div @click="editlogin">退出登录</div>
    <br />-->
    <homeheader></homeheader>
    <!-- 引入vant-ui组件库的Tab标签页 -->
    <van-tabs v-model="active">
      <van-tab v-for="(item,index) of categoryList" :key="index" :title="item.name">内容 1</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import homeHeader from "@/components/homeHeader.vue";
export default {
  data() {
    return {
      active: 0,
      categoryList: []
    };
  },
  components: {
    homeheader: homeHeader
  },
  methods: {
    //退出登录
    editlogin() {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      console.log("退出成功");
    }
  },
  mounted() {
    this.$axios({
      url: "/category",
      method: "get"
    }).then(res => {
      console.log(res.data);
      const { data } = res.data;
      this.categoryList = data;
    });
  }
};
</script>

<style></style>
