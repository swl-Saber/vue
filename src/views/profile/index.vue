<template>
  <div class="bgi">
    <div class="profile">
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581674911940&di=173affc623e7096b3c38656870f841a4&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn20117%2F560%2Fw1080h1080%2F20190424%2F1ee9-hvvuiyn8653738.jpg"
        alt
        class="pic"
      />
      <div class="profilemid">
        <div class="name">
          <span class="iconfont iconxingbienv"></span>
          火星网友
        </div>
        <div class="time">2019-10-10</div>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <div class="btnlist">
      <tabbar tableft="我的关注" tabright="关注的用户"></tabbar>
      <tabbar tableft="我的跟帖" tabright="跟帖/回复"></tabbar>
      <tabbar tableft="我的收藏" tabright="文章/视频"></tabbar>
      <tabbar tableft="设置"></tabbar>
    </div>
  </div>
</template>

<script>
import tabBar from "@/components/tabBar.vue";
export default {
  components: {
    tabbar: tabBar
  },
  data() {
    return {
      userdata: null
    };
  },
  mounted() {
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res.data);
      const { data } = res.data;
      if (data) {
        this.userdata = data;
      }
    });
  }
};
</script>

<style lang="less" scoped>
.bgi {
  .profile {
    display: flex;
    padding-top: 8.333vw;
    padding-bottom: 8.333vw;

    border-bottom: 5px solid #eee;
    .pic {
      width: 20vw;
      border-radius: 50%;
      margin-left: 6.944vw;
    }
    .profilemid {
      display: flex;
      flex: 1;
      flex-direction: column;
      // justify-content: center;
      margin-top: 5vw;
      margin-left: 4.167vw;
      .name {
        font-size: 4.444vw;
        .iconxingbienv {
          font-size: 5vw;
          color: #ff468a;
        }
      }
      .time {
        font-size: 3.889vw;
        color: #ccc;
        margin-top: 2.222vw;
      }
    }
    .arrow {
      display: flex;
      align-items: center;
      margin-right: 2.778vw;
      .iconjiantou1 {
        color: #e4e4e4;
        font-size: 3.889vw;

        // flex-direction:row;
      }
    }
  }
}
</style>
