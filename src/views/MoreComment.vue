<template>
  <div>
    <topnav title="精彩跟帖"></topnav>
    <div class="commentList">
      <comment :comment="item" v-for="(item,index) of comments" :key="index"></comment>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/topNav.vue";
import Comment from "@/components/comment/comment.vue";
export default {
  data() {
    return {
      comments: []
    };
  },
  components: {
    topnav: TopNav,
    comment: Comment
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
    }
  }
};
</script>

<style>
</style>