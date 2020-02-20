<template>
  <div>
    <div class="videoPost" v-if="postDetail.type&&postDetail.type==2">这里是视频文章</div>
    <div class="normalPost" v-else-if="postDetail.type&&postDetail.type==1">
      <div class="topnav">
        <div class="left">
          <span class="iconfont iconjiantou2"></span>
          <span class="iconfont iconnew"></span>
        </div>
        <div class="right">已关注</div>
      </div>
      <div class="title">{{postDetail.title}}</div>
      <div class="info">
        <div class="name">{{postDetail.user.nickname}}</div>
        <div class="time">{{postDetail.user.create_date.split("T")[0]}}</div>
      </div>
      <div class="maincontent" v-html="postDetail.content"></div>
    </div>
    <!-- 这里写公共的部件，比如按钮 -->
    <div class="btnWrapper">
      <div class="btnLike">
        <span class="iconfont icondianzan"></span>112
      </div>
      <div class="btnWx">
        <span class="iconfont iconweixin"></span>微信
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postDetail: {}
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      this.$axios({
        url: "/post/" + this.$route.query.id,
        method: "get"
      }).then(res => {
        console.log(res.data);
        const { data } = res.data;
        this.postDetail = data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.normalPost {
  margin-left: 5.556vw;
  margin-right: 5.556vw;
  .topnav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      .iconjiantou2 {
        font-size: 4.167vw;
      }
      .iconnew {
        font-size: 15vw;
        color: rgb(252, 98, 124);
      }
    }
    .right {
      border: 1px solid rgb(161, 161, 161);
      padding: 0.833vw 3.333vw;
      border-radius: 4.167vw;
      font-size: 3.889vw;
    }
  }
  .title {
    font-size: 5.556vw;
    font-weight: bold;
    margin-bottom: 1.389vw;
  }
  .info {
    display: flex;
    margin-bottom: 5.556vw;
    .name {
      font-size: 3.611vw;
      color: rgb(122, 122, 122);
    }
    .time {
      margin-left: 2.778vw;
      font-size: 3.611vw;
      color: rgb(122, 122, 122);
    }
  }
  .maincontent {
    /deep/ .content {
      .photo {
        margin-right: 4.167vw;
        a {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          span {
            font-size: 2.778vw;
            margin: 2.778vw 0;
          }
        }
      }
      p {
        font-size: 3.611vw;
        padding: 2.778vw 0;
      }
      .otitle_editor {
        color: rgb(122, 122, 122);
        p {
          font-size: 2.778vw;
        }
      }
    }
  }
}
.btnWrapper {
  display: flex;
  justify-content: space-around;
  padding-bottom: 5.556vw;
  margin-top: 5.556vw;
  .btnLike {
    border: 1px solid rgb(161, 161, 161);
    border-radius: 4.167vw;
    padding: 0.833vw 3.889vw;
    font-size: 3.333vw;
    height: 5.556vw;
    line-height: 5.556vw;
    .icondianzan {
      margin-right: 1.389vw;
      font-size: 3.333vw;
    }
  }
  .btnWx {
    border: 1px solid rgb(161, 161, 161);
    border-radius: 4.167vw;
    padding: 0.833vw 3.889vw;
    font-size: 3.333vw;
    height: 5.556vw;
    line-height: 5.556vw;
    .iconweixin {
      color: #00c000;
      margin-right: 1.389vw;
      font-size: 3.333vw;
    }
  }
}
</style>