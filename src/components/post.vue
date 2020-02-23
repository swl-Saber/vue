<template>
  <!-- 我们可以通过post.id获取当前文章id，传给详情页 -->
  <div @click="$router.push({path:'/postdetail?id='+post.id})">
    <!-- 显示一张图片的普通文章 -->
    <div class="OneImg" v-if="post.type==1&&post.cover.length<3">
      <div class="left">
        <div class="title">{{post.title}}</div>
        <div class="info">{{post.user.nickname}} {{post.comment_length}}跟帖</div>
      </div>
      <div class="pic">
        <img :src="post.cover[0].url" alt />
      </div>
    </div>
    <!-- 显示三张图片的普通文章 -->
    <div class="ThreeImg" v-else-if="post.type==1&&post.cover.length>=3">
      <div class="title">{{post.title}}</div>
      <div class="pic">
        <img :src="post.cover[0].url" alt />
        <img :src="post.cover[1].url" alt />
        <img :src="post.cover[2].url" alt />
      </div>
      <div class="info">{{post.user.nickname}} {{post.comment_length}}跟帖</div>
    </div>
    <!-- 显示一个视频的文章 -->
    <div class="OneVideo" v-else-if="post.type==2">
      <div class="title">{{post.title}}</div>

      <div class="pic">
        <img :src="post.cover[0].url" alt />
        <div class="btnVideo">
          <span class="iconfont iconshipin"></span>
        </div>
      </div>
      <div class="info">{{post.user.nickname}} {{post.comment_length}}跟帖</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"]
};
</script>

<style lang="less" scoped>
//一张图片的css样式
.OneImg {
  display: flex;
  justify-content: space-between;
  padding: 2.778vw 2.778vw;
  border-bottom: 1px solid #ccc;
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .title {
      font-size: 4.444vw;
      padding-bottom: 5.556vw;
    }
    .info {
      font-size: 3.889vw;
      color: rgb(136, 136, 136);
    }
  }
  .pic {
    img {
      width: 33.333vw;
      height: 20.556vw;
    }
  }
}
//三张图片的css样式
.ThreeImg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.778vw 2.778vw;
  border-bottom: 1px solid #ccc;
  .title {
    font-size: 4.444vw;
  }
  .pic {
    display: flex;
    justify-content: space-between;
    padding: 2.778vw 0 2.778vw;
    img {
      width: 31.111vw;
      height: 20.556vw;
    }
  }
  .info {
    font-size: 3.889vw;
    color: rgb(136, 136, 136);
  }
}
//视频css样式
.OneVideo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.778vw 2.778vw;
  border-bottom: 1px solid #ccc;
  .title {
    font-size: 4.444vw;
  }
  .pic {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 2.778vw 0 2.778vw;
    img {
      width: 100%;
      height: 47.222vw;
    }
    .btnVideo {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.1);
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      .iconshipin {
        width: 12.778vw;
        height: 12.778vw;
        line-height: 12.778vw;
        text-align: center;
        color: #fff;
        background-color: #ccc;
        border-radius: 50%;
        font-size: 12.778vw;
      }
    }
  }
  .info {
    font-size: 3.889vw;
    color: rgb(136, 136, 136);
  }
}
</style>