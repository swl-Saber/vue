<template>
  <div class="home">
    <homeheader></homeheader>
    <!-- 引入vant-ui组件库的Tab标签页 -->
    <van-tabs v-model="active">
      <!-- 栏目渲染 -->
      <van-tab v-for="(item,index) of categoryList" :key="index" :title="item.name">
        <!-- 插入vant的list列表 -->
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          finished-text="没有更多了"
          @load="loadMorePost"
          :immediate-check="false"
        >
          <!-- :immediate-check="false用来进行第一次自动获取数据，只有真正拉到底才执行加载 -->
          <!-- 文章列表数据渲染 -->
          <!-- <div v-for="(item,index) of posts" :key="index">{{item.title}}</div> -->
          <post :post="item" v-for="(item,index) of item.posts" :key="index"></post>
        </van-list>
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
        //需要分页
        element.pageSize = 5;
        element.pageIndex = 1;
        //是否正在加载,拉到底的时候会触发loading事件自动变为true
        element.loading = false;
        //是否已经加载到底了,若数据加载完毕，要手动设置finished为false
        element.finished = false;
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
          category: activeCategory.id,
          pageSize: activeCategory.pageSize,
          pageIndex: activeCategory.pageIndex
        }
      }).then(res => {
        const { data } = res.data;
        console.log(data);
        // this.posts = data;

        //以前是放在公共的this.posts
        //现在应该放在当前激活的栏目下的posts当中
        // activeCategory.posts = data;
        // 上面这种是旧数据替换新数据，翻页不能这么做
        //新数据要和旧数据进行拼接，用扩展运算符
        activeCategory.posts = [...activeCategory.posts, ...data];
        //加载完毕，因为是异步获取数据，组件不知道什么时候才算加载完
        //所以会一直显示加载中，需要手动设置当前的栏目的loading为false
        activeCategory.loading = false;
        //当底部数据加载完毕
        //当拿到的data长度已经比设定的页面数据程度小的时候，就知道数据拿光了
        if (data.length < activeCategory.pageSize) {
          activeCategory.finished = true;
        }
      });
    },
    loadMorePost() {
      //每次拉到底的时候，触发函数
      //需要将当前的栏目页面+1
      //调用this.getTabPost()发送ajax获取下一页数据
      console.log("触发加载更多");
      // 1. 当前页面加1
      const activeCategory = this.categoryList[this.active];
      activeCategory.pageIndex++;
      //2. 发送请求
      //人工延迟，方便看效果
      setTimeout(() => {
        this.getTabPost();
      }, 2000);
    }
  }
};
</script>

<style></style>
