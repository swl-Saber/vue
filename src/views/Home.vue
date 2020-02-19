<template>
  <div class="home">
    <homeheader></homeheader>
    <!-- 引入vant-ui组件库的Tab标签页 -->
    <van-tabs v-model="active">
      <!-- 栏目渲染 -->
      <van-tab v-for="(item,index) of categoryList" :key="index" :title="item.name">
        <!-- 文章列表数据渲染 -->
        <!-- <div v-for="(item,index) of posts" :key="index">{{item.title}}</div> -->
        <post :post="item" v-for="(item,index) of item.posts" :key="index"></post>
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
      categoryList: []
      //不可能每个栏目创建一个posts放在data不好管理
      // posts: []
      //现在是categoryList里面的栏目自带posts字段进行文章管理
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
      // 获取当前激活的category栏目
      const activeCategory = this.categoryList[this.active];
      //如果当前栏目的posts长度大于零证明有数据不需要获取
      //只有在等于零的时候采取执行获取
      if (activeCategory.posts.length == 0) {
        this.getTabPost();
      }
    }
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    initCategoryData(data) {
      data.forEach(element => {
        //往data里添加一个posts属性
        element.posts = [];
      });
      return data;
    },
    //获取栏目
    getCategory() {
      this.$axios({
        url: "/category",
        method: "get"
      }).then(res => {
        console.log(res.data);
        const { data } = res.data;
        // this.categoryList = data;
        //现在不是直接赋值而是先经过一道函数处理
        this.categoryList = this.initCategoryData(data);
        console.log(this.categoryList);

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
        // this.posts = data;

        //以前是放在公共的this.posts
        //现在应该放在当前激活的栏目下的posts当中
        activeCategory.posts = data;
      });
    }
  }
};
</script>

<style></style>
