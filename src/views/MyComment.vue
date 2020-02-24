<template>
  <div>
    <topnav title="我的跟帖"></topnav>

    <div class="commentList">
      <div class="item">
        <div class="date">2019-10-10</div>
        <div class="parent">
          <div class="name">回复:火星彩票研究员</div>
          <div class="parentComment">阿信是张信哲吗？张信哲是不是张学友弟弟</div>
        </div>
        <div class="content">阿信是张信哲吗？张信哲是不是张学友弟弟</div>
        <div class="post">原文：阿信分享xxxxxxxxxxxxxx</div>
      </div>
    </div>
  </div>
</template>

<script>
import topNav from "@/components/topNav.vue";
export default {
  components: {
    topnav: topNav
  }
};
</script>

<style lang="less" scoped>
.item {
  padding: 5.556vw;
  border-bottom: 1px solid #ccc;
  .date {
    font-size: 4.444vw;
    color: #888;
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
  .post {
    font-size: 3.889vw;
    color: #888;
  }
}
</style>