<template>
  <div class="search">
    <div class="searchNav">
      <span class="iconfont iconjiantou2"></span>
      <div class="searchWrapper">
        <span class="iconfont iconsearch"></span>
        <input type="text" placeholder="请输入搜索内容" />
      </div>
      <div class="btnSearch">搜索</div>
    </div>
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
</template>

<script>
export default {
  data() {
    return {
      history: [
        "美女",
        "美女",
        "美食",
        "关晓彤",
        "美女",
        "美食",
        "关晓彤",
        "美女",
        "美食",
        "关晓彤"
      ],
      hotSearch: ["苹果 iPhone", "小米 11", "华为荣耀"]
    };
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