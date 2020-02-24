<template>
  <div>
    <topnav title="精彩跟帖"></topnav>
    <div class="commentList">
      <comment
        :comment="item"
        v-for="(item,index) of comments"
        :key="index"
        @showTextarea="callReply"
      ></comment>
      <commentinput
        :postId="$route.query.id"
        @sendMessage="refreshComment"
        ref="textarea"
        :commentId="commentId"
        @deleteId="delId"
      ></commentinput>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/topNav.vue";
import Comment from "@/components/comment/comment.vue";
import CommentInput from "@/components/commentInput.vue";
export default {
  data() {
    return {
      comments: [],
      commentId: ""
    };
  },
  components: {
    topnav: TopNav,
    comment: Comment,
    commentinput: CommentInput
  },
  mounted() {
    this.loadComment();
  },
  methods: {
    loadComment() {
      this.$axios({
        url: "/post_comment/" + this.$route.query.id,
        method: "get"
      }).then(res => {
        console.log(res.data);
        const { data } = res.data;
        this.comments = data;
      });
    },
    callReply(id) {
      //这里给子组件一个ref可以直接调用子组件的函数
      this.$refs.textarea.isShowEnable();
      // 接收子组件传来的一个评论id,这里的id用来传给输入框发送ajax
      this.commentId = id;
    },
    refreshComment() {
      this.loadComment();
    },
    //解决失去焦点后，评论id无法清除问题
    delId() {
      this.commentId = "";
    }
  }
};
</script>

<style>
</style>