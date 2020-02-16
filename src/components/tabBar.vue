<template>
  <div class="tab" @click="clickDialog">
    <div class="left">{{tableft}}</div>
    <div class="right">{{tabright}}</div>
    <div class="arrow">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tableft", "tabright"],
  methods: {
    clickDialog() {
      this.$emit("handleClick");
    }
  }
};
</script>

<style lang="less" scoped>
.tab {
  display: flex;
  padding: 5.556vw;
  border-bottom: 1px solid rgb(158, 157, 157);
  font-size: 3.889vw;
  padding-left: 0;
  margin-left: 5.556vw;
  .left {
    flex: 1;
  }
  .right {
    color: rgb(173, 170, 170);
    padding-right: 1.389vw;
  }
  .arrow {
    .iconjiantou1 {
      font-size: 3.889vw;
      color: #aaaaaa;
    }
  }
}
</style>