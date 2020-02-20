<template>
  <div class="nav">
    <div class="arrow" @click="backPage">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    backPage() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less" scoped>
.nav {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  padding: 4.167vw;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 1;
  .arrow {
    width: 20px;
    height: 20px;

    .iconjiantou2 {
      color: #979494;
      font-size: 3.889vw;
    }
  }
  .title {
    flex: 1;
    text-align: center;
    font-size: 4.444vw;
    padding-right: 6.944vw;
  }
}
</style>