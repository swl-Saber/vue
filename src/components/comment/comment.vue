<template>
  <div class="commentWrapper">
    <div class="infoWrapper">
      <img
        v-if="comment.user.head_img"
        :src="$axios.defaults.baseURL+comment.user.head_img"
        alt
        class="pic"
      />
      <img v-else src="@/assets/timg.jpg" alt class="pic" />
      <div class="info">
        <div class="name">{{comment.user.nickname}}</div>
        <div class="time">2小时前</div>
      </div>
      <div class="btnReply" @click="showTextarea">回复</div>
    </div>

    <parent :parent="comment.parent" v-if="comment.parent"></parent>

    <div class="mainComment">{{comment.content}}</div>
  </div>
</template>

<script>
import Parent from "./parent.vue";
export default {
  props: ["comment"],
  components: {
    parent: Parent
  },
  methods:{
    showTextarea(){
      this.$emit('showTextarea')
    }
  }
};
</script>

<style lang="less" scoped>
.commentWrapper {
  border-bottom: 1px solid #888;
  padding: 5.556vw 4.167vw;
  .infoWrapper {
    display: flex;
    // padding: 5.556vw 4.167vw;
    .pic {
      width: 10vw;
      height: 10vw;
      object-fit: cover;
      border-radius: 50%;
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 2.778vw;
      .name {
        font-size: 3.611vw;
      }
      .time {
        font-size: 2.778vw;
        color: rgb(122, 122, 122);
      }
    }
    .btnReply {
      font-size: 3.889vw;
      color: #888;
    }
  }

  .mainComment {
    margin-top: 4.167vw;
    font-size: 3.611vw;
  }
}
</style>