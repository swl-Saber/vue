<template>
  <!-- <div>这里是登录页</div> -->
  <div>
    <div class="closeBtn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <!-- rule用来验证输入合法性的正则表达式 (我们这里IDE传值，传一个字符串进去，子组件在转换成正则对象) -->
    <authinput
      itype="text"
      iplaceholder="用户名 / 手机号码"
      irule="^.{3,10}$"
      errMsg="请正确输入用户名"
    ></authinput>
    <authinput
      itype="password"
      iplaceholder="密码"
      irule="^.{6}$"
      errMsg="请正确输入密码"
    ></authinput>
    <authbutton text="登录" @sendmsg="msg"></authbutton>
  </div>
</template>

<script>
// 可以使用 @ 符号直接代表 src 所在目录
//引入封装组件
import authInput from "@/components/authInput.vue";
import authButton from "@/components/authButton.vue";
export default {
  components: {
    authinput: authInput,
    authbutton: authButton
  },
  methods: {
    msg() {
      console.log("父组件接收到了");
    }
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
