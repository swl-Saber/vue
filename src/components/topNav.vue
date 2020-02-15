<template>
  <div class="nav">
    <div class="arrow">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style lang="less" scoped>
.nav {
  display: flex;
  padding: 4.167vw;
  .arrow {
    .iconjiantou2 {
      color: #979494;
      font-size: 3.889vw;
    }
  }
  .title {
    flex: 1;
    text-align: center;
    font-size: 4.444vw;
    padding-right: 2.778vw;
  }
}
</style>