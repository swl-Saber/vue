<template>
  <div>
    <!-- 视频文章 -->
    <div class="videoPost" v-if="postDetail.type&&postDetail.type==2">
      <div class="topnav">
        <div class="left">
          <span class="iconfont iconjiantou2" @click="gobackpage"></span>
          <span class="iconfont iconnew"></span>
        </div>
      </div>
      <!-- 这个 video 标签接受一些属性, 其中控制是否显示播放按钮的属性是:controls -->
      <!-- poster可以添加图片在视频封面 -->
      <video
        src="https://video.pearvideo.com/mp4/adshort/20200219/cont-1632418-14924288_adpkg-ad_hd.mp4"
        poster="https://timgmb04.bdimg.com/timg?searchbox_feed&quality=100&wh_rate=0&size=b576_324&ref=http%3A%2F%2Fwww.baidu.com&sec=1568739067&di=612dd27cae470b93b01a4b32ef72fbac&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2Fe18c6ffa079441431f8988ca4c3ac106.jpeg"
        controls
      ></video>
      <div class="info">
        <div class="left">
          <img class="pic" :src="$axios.defaults.baseURL+postDetail.user.head_img" alt />
          <div class="name">{{postDetail.user.nickname}}</div>
        </div>
        <div
          class="btnfollow"
          :class="{hasFollow:postDetail.has_follow}"
          @click="clickFollow"
        >{{postDetail.has_follow? " ✔ 已关注":"＋ 关注"}}</div>
      </div>
      <div class="title">{{postDetail.title}}</div>
    </div>
    <!-- 普通文章 -->
    <div class="normalPost" v-else-if="postDetail.type&&postDetail.type==1">
      <div class="topnav">
        <div class="left">
          <span class="iconfont iconjiantou2" @click="gobackpage"></span>
          <span class="iconfont iconnew"></span>
        </div>
        <div
          class="right"
          :class="{hasFollow:postDetail.has_follow}"
          @click="clickFollow"
        >{{postDetail.has_follow?" ✔ 已关注":"＋ 关注"}}</div>
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
      <div class="btnLike" @click="clickLike">
        <span class="iconfont icondianzan"></span>
        {{postDetail.like_length}}
      </div>
      <div class="btnWx">
        <span class="iconfont iconweixin"></span>微信
      </div>
    </div>
    <div class="commentList">
      <!-- 水平线 -->
      <div class="line">精彩跟帖</div>
      <!-- 这里写评论 -->
      <div v-if="comments">
        <comment
          :comment="item"
          v-for="(item,index) of comments"
          :key="index"
          @showTextarea="callReply"
        ></comment>
      </div>
      <div class="unComment" v-else>暂无跟帖，请抢占沙发</div>
      <!-- 更多跟帖 -->
      <div class="btnWrapper">
        <div class="btnMore" @click="$router.push({path:'/morecomment?id='+$route.query.id})">更多跟帖</div>
      </div>
      <!-- 这里插入回帖组件 -->
      <commentinput :postId="$route.query.id" @sendMessage="refreshComment" ref="textarea"></commentinput>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/comment/comment.vue";
import CommentInput from "@/components/commentInput.vue";
export default {
  data() {
    return {
      postDetail: {},
      comments: []
    };
  },
  mounted() {
    this.loadPage();
    this.loadComment();
  },
  components: {
    comment: Comment,
    commentinput: CommentInput
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
    },
    loadComment() {
      this.$axios({
        url: "/post_comment/" + this.$route.query.id,
        method: "get"
      }).then(res => {
        console.log(res.data);
        const { data } = res.data;
        //这里设置返回的评论只显示3条
        if (data.length > 3) {
          data.length = 3;
        }
        this.comments = data;
      });
    },
    clickFollow() {
      // 如果为true就执行，ajax发送取消关注的请求
      if (this.postDetail.has_follow) {
        this.$axios({
          url: "/user_unfollow/" + this.postDetail.user.id,
          method: "get"
        }).then(res => {
          console.log(res);
          const { message } = res.data;
          if (message == "取消关注成功") {
            this.postDetail.has_follow = false;
          }
        });
      } else {
        this.$axios({
          url: "/user_follows/" + this.postDetail.user.id,
          method: "get"
        }).then(res => {
          console.log(res);
          const { message } = res.data;
          if (message == "关注成功") {
            this.postDetail.has_follow = true;
          }
        });
      }
    },
    clickLike() {
      this.$axios({
        url: "/post_like/" + this.$route.query.id,
        method: "get"
      }).then(res => {
        console.log(res);
        const { message } = res.data;
        if (message == "点赞成功") {
          this.postDetail.like_length++;
        } else {
          this.postDetail.like_length--;
        }
      });
    },
    gobackpage() {
      this.$router.back();
    },
    //点击回复弹出已激活状态输入评论框
    callReply() {
      //这里给子组件一个ref可以直接调用子组件的函数
      this.$refs.textarea.isShowEnable();
    },
    refreshComment() {
      this.loadComment();
    }
  }
};
</script>

<style lang="less" scoped>
.videoPost {
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
  }
  video {
    max-width: 100%;
    padding: 0 0 4.167vw;
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      .pic {
        width: 6.944vw;
        height: 6.944vw;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 1.389vw;
      }
      .name {
        font-size: 3.611vw;
        color: rgb(122, 122, 122);
      }
    }
    .btnfollow {
      border: 1px solid rgb(255, 81, 0);
      color: rgb(255, 81, 0);
      padding: 0.833vw 5vw;
      border-radius: 4.167vw;
      font-size: 3.889vw;
      &.hasFollow {
        color: rgb(53, 53, 53);
        border: 1px solid rgb(141, 141, 141);
      }
    }
  }
  .title {
    font-size: 5.556vw;
    font-weight: bold;
    margin-bottom: 1.389vw;
    margin-top: 4.167vw;
  }
}
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
      border: 1px solid rgb(255, 81, 0);
      color: rgb(255, 81, 0);
      padding: 0.833vw 5vw;
      border-radius: 4.167vw;
      font-size: 3.889vw;
      &.hasFollow {
        color: rgb(53, 53, 53);
        border: 1px solid rgb(141, 141, 141);
      }
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
.commentList {
  padding-bottom: 16.667vw;
  .line {
    text-align: center;
    font-size: 4.444vw;
    border-top: 5px solid #ccc;
    padding-top: 6.944vw;
  }
  .unComment {
    text-align: center;
    font-size: 3.611vw;
    margin-top: 5.556vw;
    margin-bottom: 11.111vw;
    color: rgb(83, 83, 83);
  }
  .btnWrapper {
    padding: 6.944vw 0;
    margin-top: 0;
    .btnMore {
      text-align: center;
      font-size: 3.611vw;
      border: 1px solid rgb(110, 110, 110);
      padding: 1.389vw 8.333vw;
      border-radius: 4.167vw;
    }
  }
}
</style>