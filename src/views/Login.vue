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
      irule="^.{3,11}$"
      errMsg="请正确输入用户名"
      @valueChange="setUsername"
    ></authinput>
    <authinput
      itype="password"
      iplaceholder="密码"
      irule="^.{6}$"
      errMsg="请正确输入密码"
      @valueChange="setPassword"
    ></authinput>
    <authbutton text="登录" @clickbtn="login"></authbutton>
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
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    setUsername(username) {
      this.username = username;
    },
    setPassword(password) {
      this.password = password;
    },
    login() {
      // console.log("父组件接收到了");
      //尝试获取数据
      // this.$axios({
      //   url: "http://liangwei.tech:3000/post",
      //   method: "get",
      //   params: {
      //     id: 1
      //   }
      // })
      //   .then(res => {
      //     console.log("获取成功");
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.log("获取失败");
      //     console.log(err);
      //   });
      this.$axios({
        url: "/login",
        method: "post",
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(res => {
          const { message, statusCode } = res.data;
          // console.log(message);
          console.log(res.data);
          // if (statusCode == 200 && message) {
          //   this.$toast.success(message);
          // }
          //新版服务器的判断
          //无论成功还是失败，都先响应200状态码
          // 所以全都会进来then里面
          // if (statusCode) {
          //   this.$toast.fail(message); //登录失败
          // } else {
          if (!statusCode) {
            this.$toast.success(message); //登录成功
            //接下来进行本地存储和跳转页面
            const { data } = res.data;
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user.id);
            this.$router.push({
              path: "/"
            });
          }
        })
        .catch(err => {
          console.log("登录失败");
          console.dir(err);
          // 防御性编程, 万一后台连 message 都没有传出来怎么办?
          this.$toast.fail(err.response.data.message || "系统错误");
        });
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
    color: rgb(252, 98, 124);
  }
}
</style>
