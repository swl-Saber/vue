<template>
  <div>
    <topnav title="编辑资料"></topnav>
    <div class="topImg">
      <img src="@/assets/timg.jpg" alt />
    </div>
    <tabbar tableft="昵称" tabright="火星网友"></tabbar>
    <tabbar tableft="密码" tabright="******"></tabbar>
    <tabbar tableft="性别" tabright="男"></tabbar>
  </div>
</template>

<script>
import topNav from "@/components/topNav.vue";
import tabBar from "@/components/tabBar.vue";
export default {
  components: {
    topnav: topNav,
    tabbar: tabBar
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