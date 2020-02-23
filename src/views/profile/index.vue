<template>
  <div v-if="userdata">
    <router-link to="/edit">
      <div class="profile">
        <img v-if="userdata.head_img" :src="$axios.defaults.baseURL+userdata.head_img" class="pic" />
        <!-- 数据库里的图片地址 -->
        <img v-else src="@/assets/timg.jpg" class="pic" />
        <div class="profilemid">
          <div class="name">
            <span v-if="userdata.gender==1" class="iconfont iconxingbienan"></span>
            <span v-else class="iconfont iconxingbienv"></span>
            {{userdata.nickname}}
          </div>
          <div class="time">{{(userdata.create_date||'').split('T')[0]}}</div>
        </div>
        <div class="arrow">
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </router-link>
    <div class="btnlist">
      <tabbar tableft="我的关注" tabright="关注的用户" @handleClick="goMyfollow"></tabbar>
      <tabbar tableft="我的跟帖" tabright="跟帖/回复"></tabbar>
      <tabbar tableft="我的收藏" tabright="文章/视频" @handleClick="goCollections"></tabbar>
      <tabbar tableft="设置"></tabbar>
      <button class="esc" @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script>
import tabBar from "@/components/tabBar.vue";
export default {
  components: {
    tabbar: tabBar
  },
  methods: {
    logout() {
      console.log("退出登录成功");

      localStorage.removeItem("token");
      localStorage.removeItem("user_id");

      this.$router.replace({
        path: "/login"
      });
    },
    goCollections() {
      this.$router.push({
        path: "/collections"
      });
    },
    goMyfollow() {
      this.$router.push({
        path: "/myfollow"
      });
    }
  },
  data() {
    return {
      userdata: {}
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
.profile {
  display: flex;
  padding-top: 8.333vw;
  padding-bottom: 8.333vw;

  border-bottom: 5px solid #eee;
  .pic {
    width: 20vw;
    object-fit: cover;
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
      .iconxingbienan {
        font-size: 5vw;
        color: blue;
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
      color: #aaaaaa;
      font-size: 3.889vw;

      // flex-direction:row;
    }
  }
}
.btnlist {
  .esc {
    font-size: 3.889vw;
    background-color: #ff74a7;
    color: white;
    outline: none;
    border: none;
    border-radius: 5.556vw;
    margin-top: 2.778vw;
    margin-left: 2.778vw;
    padding: 2.778vw 5.556vw;
  }
}
</style>
