<template>
  <div>
    <topnav title="编辑资料"></topnav>
    <div class="topImg">
      <img v-if="userdata.head_img" :src="$axios.defaults.baseURL+userdata.head_img" alt />
      <img v-else src="@/assets/timg.jpg" alt />
    </div>
    <tabbar tableft="昵称" :tabright="userdata.nickname"></tabbar>
    <tabbar tableft="密码" tabright="******"></tabbar>
    <tabbar v-if="userdata.gender==1" tableft="性别" tabright="男"></tabbar>
    <tabbar v-else tableft="性别" tabright="女"></tabbar>
  </div>
</template>

<script>
import topNav from "@/components/topNav.vue";
import tabBar from "@/components/tabBar.vue";
export default {
  components: {
    topnav: topNav,
    tabbar: tabBar
  },
  data() {
    return {
      userdata: {}
    };
  },
  mounted() {
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data);
      const { data } = res.data;
      this.userdata = data;
    });
  }
};
</script>

<style lang="less" scoped>
.topImg {
  text-align: center;
  img {
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
  }
}
</style>