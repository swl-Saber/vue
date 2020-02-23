<template>
  <div class="commentInput">
    <!-- 这里是未激活的状态 -->
    <div class="disable" v-show="isShow">
      <input type="text" @focus="isShowEnable" v-model="content" />
      <div class="commentnum">
        <span class="iconfont iconpinglun-"></span>
        <div class="num">102</div>
      </div>
      <span class="iconfont iconshoucang"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
    <!-- 这里是已激活的状态 -->
    <div class="enable" v-show="!isShow">
      <textarea rows="5" @blur="isShowDisable" ref="textareaDom" v-model="content"></textarea>
      <div class="btnSend" @click="sendMessage">发送</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
      content: ""
    };
  },
  props: ["postId", "commentId"],
  methods: {
    // 获取焦点切换已激活状态
    isShowEnable() {
      this.isShow = false;
      //延迟执行,两个焦点冲突所以延迟获焦
      this.$nextTick(() => {
        this.$refs.textareaDom.focus();
      });
    },
    //失去焦点切换未激活状态
    isShowDisable() {
      setTimeout(() => {
        this.isShow = true;
      }, 100);
    },
    // 发送评论
    sendMessage() {
      //这里点击发送，textarea会失去焦点，触发隐藏事件,导致执行不了函数
      //所以需要在失去焦点后，设置个定时器，延迟触发切换
      console.log(this.content);
      this.$axios({
        url: "/post_comment/" + this.postId,
        method: "post",
        data: {
          content: this.content,
          parent_id: this.commentId
        }
      }).then(res => {
        console.log(res.message);
        //这里传事件给父组件用来调用函数刷新页面
        this.$emit("sendMessage");
        this.content = "";
      });
    }
  }
};
</script>

<style lang="less" scoped>
.commentInput {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
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
    display: flex;
    margin: 0 2.778vw;
    padding-bottom: 2.778vw;
    justify-content: space-around;
    align-items: flex-end;
    textarea {
      flex: 1;
      background-color: pink;
      border: none;
      outline: none;
      border-radius: 2.778vw;
      padding: 2.778vw 4.723vw;
      resize: none;
    }
    .btnSend {
      color: #fff;
      background-color: red;
      border-radius: 2.778vw;
      padding: 1.389vw 4.167vw;
      margin-left: 2.778vw;
    }
  }
}
</style>