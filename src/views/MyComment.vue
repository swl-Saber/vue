<template>
  <div>
    <topnav title="我的跟帖"></topnav>

    <div class="commentList" v-for="(item,index) of commentList" :key="index">
      <div class="item">
        <div class="date">
          {{item.create_date.split("T")[0]}}
          <div class="time">{{item.create_date.slice(11,16)}}</div>
        </div>
        <div class="parent" v-if="item.parent">
          <div class="name">回复:{{item.parent.user.nickname}}</div>
          <div class="parentComment">{{item.parent.content}}</div>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="postWrapper">
          <div class="post">{{item.post.title}}</div>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topNav from "@/components/topNav.vue";
export default {
  data() {
    return {
      commentList: []
    };
  },
  components: {
    topnav: topNav
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      this.$axios({
        url: "/user_comments",
        method: "get"
      }).then(res => {
        console.log(res.data);
        const { data } = res.data;
        this.commentList = data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.item {
  padding: 5.556vw;
  border-bottom: 1px solid rgb(124, 124, 124);
  .date {
    display: flex;
    font-size: 4.444vw;
    color: #888;
    .time {
      padding-left: 2.778vw;
    }
  }
  .parent {
    padding: 3.889vw;
    background-color: #f2f2f2;
    margin: 10px 0;
    .name {
      font-size: 3.889vw;
      color: #888;
    }
    .parentComment {
      margin-top: 2.778vw;
      font-size: 4.444vw;
      color: #888;
    }
  }
  .content {
    font-size: 4.444vw;
    padding: 2.778vw 0;
  }
  .postWrapper {
    position: relative;
    .post {
      font-size: 3.889vw;
      color: #888;
      padding-right: 8.333vw;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .iconjiantou1 {
      position: absolute;
      right: -2.778vw;
      top: 0.833vw;
      font-size: 4.167vw;
    }
  }
}
</style>