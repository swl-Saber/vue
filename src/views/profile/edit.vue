<template>
  <div>
    <topnav title="编辑资料"></topnav>
    <div class="topImg">
      <img src="@/assets/timg.jpg" alt />
    </div>
  </div>
</template>

<script>
import topNav from "@/components/topNav.vue";
export default {
  components: {
    topnav: topNav
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