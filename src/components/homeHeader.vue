<template>
  <div class="head">
    <div class="new">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="mid" @click="$router.push({path:'/search'})">
      <span class="iconfont iconsearch"></span>
      搜索新闻
    </div>
    <div class="right">
      <router-link to="/index">
        <span class="iconfont iconwode"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.head {
  display: flex;
  background-color: #fd93ba;
  .new {
    padding: 0 2.222vw;
    .iconnew {
      color: #fff;
      font-size: 11.111vw;
    }
  }
  .mid {
    flex: 1;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 4.167vw;
    text-align: center;
    margin: 1.667vw 0;
    font-size: 4.167vw;
    color: #fff;
    padding-top: 0.833vw;
    .iconsearch {
      color: #fff;
      font-size: 5.556vw;
    }
  }
  .right {
    display: flex;
    align-items: center;
    padding: 0 5vw;
    .iconwode {
      color: #fff;
      font-size: 6.944vw;
    }
  }
}
</style>