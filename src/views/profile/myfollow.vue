<template>
  <div>
    <topnav title="我的关注"></topnav>
    <div class="item">
      <img src="@/assets/timg.jpg" alt />
      <div class="mid">
        <div class="name">火星新闻播报</div>
        <div class="time">2019-10-10</div>
      </div>
      <div class="follow">取消关注</div>
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
.item {
  display: flex;
  border-bottom: 1px #ccc solid;
  padding: 2.778vw 0;
  img {
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
    margin: 2.778vw;
  }
  .mid {
    flex: 1;
    margin-top: 5.556vw;
    .name {
      font-size: 4.444vw;
    }
    .time {
      font-size: 3.889vw;
      color: rgb(155, 155, 155);
      margin-top: 1.389vw;
    }
  }
  .follow {
    font-size: 3.889vw;
    display: flex;
    border-radius: 6.944vw;
    background-color: #fd93ba;
    align-items: center;
    padding-left: 2.778vw;
    padding-right: 2.778vw;
    margin: 7.5vw 2.778vw;
  }
}
</style>