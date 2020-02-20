<template>
  <div>
    <topnav title="我的收藏"></topnav>
    <post :post="item" v-for="(item,index) of postList" :key="index"></post>
  </div>
</template>

<script>
import topNav from "@/components/topNav.vue";
import Post from "@/components/post.vue";
export default {
  data() {
    return {
      postList: []
    };
  },
  mounted() {
    this.loadPage();
  },
  components: {
    topnav: topNav,
    post: Post
  },
  methods: {
    loadPage() {
      this.$axios({
        url: "/user_star",
        method: "get"
      }).then(res => {
        console.log(res);
        const { data } = res.data;
        this.postList = data;
      });
    }
  }
};
</script>

<style>
</style>