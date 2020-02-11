<template>
  <!-- <div>这里是登录页</div> -->
  <div>
    <div class="closeBtn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <authinput></authinput>
    <authinput></authinput>
  </div>
</template>

<script>
// 可以使用 @ 符号直接代表 src 所在目录
import authInput from "@/components/authInput.vue";
export default {
  components: {
    authinput: authInput
  }
};
</script>

<style lang="less" scoped>
.closeBtn {
  padding: 6.667vw;
  span {
    // fontsize: 27px;
    // 这里应该使用 vw 单位
    // 有了插件以后只需要 alt + z
    // 就可以转换为 vw 单位
    font-size: 7.5vw;
  }
}
.logo {
  text-align: center;
  span {
    font-size: 35vw;
    color: #d81e06;
  }
}
</style>
