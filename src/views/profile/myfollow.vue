<template>
  <div>
    <topnav title="我的关注"></topnav>
    <!-- 判断没有数据的时候 -->
    <div v-if="followList.length>0" class="list">
      <div v-for="(item,index) of followList" :key="index" class="item">
        <!-- 判断数据库里是否有头像 -->
        <img v-if="item.head_img" :src="$axios.defaults.baseURL+item.head_img" alt />
        <img v-else src="@/assets/timg.jpg" alt />
        <div class="mid">
          <div class="name">{{item.nickname}}</div>
          <div class="time">{{item.create_date.split('T')[0]}}</div>
        </div>
        <div class="follow" @click="cancelFollow(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
import topNav from "@/components/topNav.vue";
export default {
  data() {
    return {
      followList: []
    };
  },
  components: {
    topnav: topNav
  },
  mounted() {
    // this.$axios({
    //   url: "/user_follows",
    //   method: "get"
    // }).then(res => {
    //   console.log(res.data);
    //   const { data } = res.data;
    //   this.followList = data;
    // });

    this.loadPage(); // 进入页面直接刷新获取数据
  },
  methods: {
    loadPage() {
      this.$axios({
        url: "/user_follows",
        method: "get"
      }).then(res => {
        console.log(res.data);
        const { data } = res.data;
        this.followList = data;
      });
    },
    cancelFollow(id) {
      this.$axios({
        url: "/user_unfollow/" + id,
        method: "get"
      }).then(res => {
        console.log(res.data);
        this.loadPage();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  border-bottom: 1px #ccc solid;
  padding: 2.778vw 0;
  img {
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
    margin: 2.778vw;
  }
  .mid {
    flex: 1;
    margin-top: 5.556vw;
    .name {
      font-size: 4.444vw;
    }
    .time {
      font-size: 3.889vw;
      color: rgb(155, 155, 155);
      margin-top: 1.389vw;
    }
  }
  .follow {
    font-size: 3.889vw;
    display: flex;
    border-radius: 6.944vw;
    background-color: #fd93ba;
    align-items: center;
    padding-left: 2.778vw;
    padding-right: 2.778vw;
    margin: 7.5vw 2.778vw;
  }
}
</style>