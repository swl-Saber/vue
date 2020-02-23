<template>
  <div class="search">
    <div class="searchNav">
      <span class="iconfont iconjiantou2" @click="gobackPage"></span>
      <div class="searchWrapper">
        <span class="iconfont iconsearch"></span>
        <input type="text" placeholder="请输入搜索内容" v-model="keyword" />
      </div>
      <div class="btnSearch" @click="sendKeyword">搜索</div>
    </div>
    <!-- 历史记录和热门搜索 -->
    <div class="suggestions" v-if="postList.length==0">
      <div class="history">
        <h3>历史记录</h3>
        <div class="list">
          <div v-for="(item,index) of history" :key="index">{{item}}</div>
        </div>
      </div>
      <div class="hotSearch">
        <h3>热门搜索</h3>
        <div class="list">
          <div v-for="(item,index) of hotSearch" :key="index">{{item}}</div>
        </div>
      </div>
    </div>
    <!-- 搜索结果渲染出来的文章 -->
    <div class="result" v-else>
      <post :post="item" v-for="(item,index) of postList" :key="index"></post>
    </div>
  </div>
</template>

<script>
import Post from "@/components/post.vue";
export default {
  data() {
    return {
      keyword: "",
      postList: [],
      history: [],
      hotSearch: ["苹果 iPhone", "小米 11", "华为荣耀"]
    };
  },
  components: {
    post: Post
  },
  //这里挂载将历史记录保存在页面
  mounted() {
    const historyStr = localStorage.getItem("historySearch");
    if (historyStr) {
      this.history = JSON.parse(historyStr);
    }
  },
  watch: {
    keyword(newVal) {
      //如果清空关键字，应该清除搜索结果
      if (newVal == "") {
        this.postList = [];
      }
    },
    history(newVal) {
      //先将histor数组转换为字符串
      const historyStr = JSON.stringify(this.history);
      //把历史记录存进本地存储中
      localStorage.setItem("searchHistory", historyStr);
    }
  },
  methods: {
    sendKeyword() {
      this.$axios({
        url: "/post_search",
        method: "get",
        params: { keyword: this.keyword }
      }).then(res => {
        console.log(res.data);
        const { data } = res.data;
        this.postList = data;
        //判断历史记录里显示的关键词是否重复
        if (this.history.indexOf(this.keyword) == -1) {
          this.history.push(this.keyword);
        }
      });
    },
    //返回上一页的时候清空关键词，清空搜索结果
    gobackPage() {
      if (this.postList.length > 0) {
        this.keyword = "";
        this.postList = [];
      } else {
        this.$router.back();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  padding: 2.778vw 4.167vw;
  .searchNav {
    display: flex;
    justify-content: center;
    align-items: center;
    .iconjiantou2 {
      font-size: 4.167vw;
    }
    .searchWrapper {
      display: flex;
      flex: 1;
      position: relative;
      justify-content: center;
      .iconsearch {
        position: absolute;
        top: 1.944vw;
        left: 5.001vw;
        font-size: 4.167vw;
        color: rgb(112, 112, 112);
      }
      input {
        flex: 1;
        border: 1px solid rgb(112, 112, 112);
        border-radius: 4.167vw;
        outline: none;
        background-color: transparent;
        text-indent: 2em;
        font-size: 3.333vw;
        margin-left: 2.222vw;
        padding: 1.389vw 2.778vw;
      }
    }
    .btnSearch {
      font-size: 3.889vw;
      margin-left: 2.778vw;
    }
  }
  .history {
    h3 {
      font-size: 3.889vw;
      margin: 4.167vw 0;
    }
    .list {
      display: flex;
      margin-bottom: 4.167vw;
      font-size: 2.778vw;
      div {
        padding-right: 2.778vw;
      }
    }
  }
  .hotSearch {
    h3 {
      font-size: 3.889vw;
      padding: 4.167vw 0;
      border-top: 1px solid rgb(112, 112, 112);
    }
    .list {
      display: flex;
      margin-bottom: 4.167vw;
      font-size: 2.778vw;
      div {
        padding-right: 2.778vw;
      }
    }
  }
}
</style>