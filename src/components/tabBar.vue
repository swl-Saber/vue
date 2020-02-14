<template>
  <div class="tab">
    <div class="left">我的关注</div>
    <div class="right">关注的用户</div>
    <div class="arrow">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.tab {
  display: flex;
  padding: 5.556vw;
  border-bottom: 1px solid #eee;
  font-size: 3.889vw;
  .left {
    flex: 1;
  }
  .right {
    color: rgb(173, 170, 170);
    padding-right: 1.389vw;
  }
  .arrow {
    font-size: 3.889vw;
  }
}
</style>