<template>
  <div class="home">
    <homeheader></homeheader>
    <!-- 引入vant-ui组件库的Tab标签页 -->
    <van-tabs v-model="active">
      <!-- 栏目渲染 -->
      <van-tab v-for="(item,index) of categoryList" :key="index" :title="item.name">
        <!-- 文章列表数据渲染 -->
        <!-- <div v-for="(item,index) of posts" :key="index">{{item.title}}</div> -->
        <post :post="item" v-for="(item,index) of posts" :key="index"></post>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import homeHeader from "@/components/homeHeader.vue";
import Post from "@/components/post.vue";
export default {
  data() {
    return {
      active: 0,
      categoryList: [],
      posts: []
    };
  },

  components: {
    homeheader: homeHeader,
    post: Post
  },
  watch: {
    active(newVal) {
      console.log("切换了栏目");
      // const currentCategory = this.categoryList[newVal];
      // console.log(currentCategory);
      this.getTabPost();
    }
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    //获取栏目
    getCategory() {
      this.$axios({
        url: "/category",
        method: "get"
      }).then(res => {
        console.log(res.data);
        const { data } = res.data;
        this.categoryList = data;
        // 加载完栏目数据的时候
        //马上加载第一批文章数据
        this.getTabPost();
      });
    },
    //封装文章列表数据
    getTabPost() {
      const activeCategory = this.categoryList[this.active];
      this.$axios({
        url: "/post",
        method: "get",
        params: {
          category: activeCategory.id
        }
      }).then(res => {
        const { data } = res.data;
        console.log(data);
        this.posts = data;
      });
    }
  }
};
</script>

<style></style>
