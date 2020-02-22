<template>
  <div>
    <!-- 这里是未激活的状态 -->
    <div class="disable">
      <input type="text" value="写跟帖" />
      <div class="commentnum">
        <span class="iconfont iconpinglun-"></span>
        <div class="num">102</div>
      </div>
      <span class="iconfont iconshoucang"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
    <!-- 这里是已激活的状态 -->
    <div class="enable"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
// 未激活样式
.disable {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 2.778vw 2.778vw;
  input {
    background-color: pink;
    outline: none;
    border: none;
    padding: 2.778vw 4.723vw;
    border-radius: 5.556vw;
    font-size: 4.167vw;
  }
  .commentnum {
    position: relative;
    .iconpinglun- {
      font-size: 6.944vw;
    }
    .num {
      position: absolute;
      right: -1.389vw;
      top: 0;
      background-color: red;
      color: #fff;
      border-radius: 4.167vw;
      text-align: center;
      padding: 2.999px 1.667vw;
    }
  }
  .iconshoucang {
    font-size: 6.944vw;
  }
  .iconfenxiang {
    font-size: 6.944vw;
  }
}
//已激活样式
.enable {
}
</style>