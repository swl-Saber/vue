<template>
  <div>
    <topnav title="编辑资料"></topnav>
    <div class="topImg">
      <img v-if="userdata.head_img" :src="$axios.defaults.baseURL+userdata.head_img" alt />
      <img v-else src="@/assets/timg.jpg" alt />
    </div>
    <tabbar tableft="昵称" :tabright="userdata.nickname" @handleClick="isShownickname=true"></tabbar>
    <tabbar tableft="密码" tabright="******" @handleClick="isShowpassword=true"></tabbar>
    <tabbar v-if="userdata.gender==1" tableft="性别" tabright="男"></tabbar>
    <tabbar v-else tableft="性别" tabright="女"></tabbar>
    <!-- 昵称弹窗提示 -->
    <van-dialog v-model="isShownickname" title="修改昵称" show-cancel-button @confirm="confirmNickname">
      <van-field v-model="nickname" placeholder="请输入昵称" />
    </van-dialog>
    <!-- 密码弹窗提示 -->
    <van-dialog v-model="isShowpassword" title="修改密码" show-cancel-button @confirm="confirmPassword">
      <van-field v-model="password" type="password" placeholder="请输入密码" />
    </van-dialog>
  </div>
</template>

<script>
import topNav from "@/components/topNav.vue";
import tabBar from "@/components/tabBar.vue";
export default {
  components: {
    topnav: topNav,
    tabbar: tabBar
  },

  data() {
    return {
      userdata: {},
      isShownickname: false,
      isShowpassword: false,
      nickname: "",
      password: ""
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
      this.userdata = data;
    });
    this.loadPage();
  },
  methods: {
    loadPage() {
      this.$axios({
        url: "/user/" + localStorage.getItem("user_id"),
        method: "get",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const { data } = res.data;
        this.userdata = data;
      });
    },
    confirmNickname() {
      console.log("点击了确认" + this.nickname);
      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "post",
        data: {
          nickname: this.nickname
        },
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);
        //自动刷新数据
        this.loadPage();
      });
    },
    confirmPassword() {
      console.log("点击了确认");
      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "post",
        data: {
          password: this.password
        },
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);
        //自动刷新数据
        this.loadPage();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.topImg {
  text-align: center;
  img {
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
  }
}
</style>