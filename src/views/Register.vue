<template>
  <div>
    <div class="closeBtn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <authinput
      itype="text"
      iplaceholder="用户名 / 手机号码"
      irule="^.{3,11}$"
      errMsg="请正确输入用户名"
      @valueChange="setUsername"
      @sendTrue="changeTrue"
    ></authinput>
    <authinput
      itype="text"
      iplaceholder="昵称"
      irule="^.{3,10}$"
      errMsg="请正确输入昵称"
      @valueChange="setNickname"
      @sendTrue="changeTrue"
    ></authinput>
    <authinput
      itype="password"
      iplaceholder="密码"
      irule="^.{6,16}$"
      errMsg="请正确输入密码"
      @valueChange="setPassword"
      @sendTrue="changeTrue"
    ></authinput>
    <authbutton text="注册" @clickbtn="register"></authbutton>
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
      nickname: "",
      password: "",
      isTrue: []
    };
  },
  methods: {
    setUsername(username) {
      this.username = username;
    },
    setNickname(nickname) {
      this.nickname = nickname;
    },
    setPassword(password) {
      this.password = password;
    },
    // 这个函数用来判断不规范注册能成功的问题
    changeTrue(isTrue) {
      this.isTrue.push(isTrue); // 把子组件传过来的this.isValid的false值赋值
    },
    register() {
      //这里优化用户体验，输入各项为空时出现提醒
      if (!this.username || !this.nickname || !this.password) {
        this.$toast("内容不能为空");
      }
      let i = this.isTrue.indexOf(false);
      console.log(i);
      //这里用来判断是否能进行发送请求
      if (i === -1) {
        // 发送axios请求
        this.$axios({
          url: "/register",
          method: "post",
          data: {
            username: this.username,
            nickname: this.nickname,
            password: this.password
          }
        })
          .then(res => {
            console.log(res);

            const { message, statusCode } = res.data;
            // if (statusCode) {
            //   this.$toast.fail(message);
            //   // console.log(message); //注册失败
            // } else {
            if (!statusCode) {
              this.$toast.success(message);
              // console.log(message); // 注册成功

              //跳回主页
              this.$router.push({
                path: "/"
              });
            }
          })
          .catch(err => {
            console.dir(err);
            // console.log("注册失败");
            // 防御性编程, 万一后台连 message 都没有传出来怎么办?
            this.$toast.fail(err.response.data.message || "系统错误");
          });
      }
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
