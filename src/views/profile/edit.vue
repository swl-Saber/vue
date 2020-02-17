<template>
  <div>
    <topnav title="编辑资料"></topnav>
    <div class="topImg">
      <img v-if="userdata.head_img" :src="$axios.defaults.baseURL+userdata.head_img" alt />
      <img v-else src="@/assets/timg.jpg" alt />
      <!-- 上传图片文件 -->
      <div class="uploader">
        <van-uploader :after-read="afterRead" />
      </div>
    </div>
    <tabbar tableft="昵称" :tabright="userdata.nickname" @handleClick="isShownickname=true"></tabbar>
    <tabbar tableft="密码" tabright="******" @handleClick="isShowpassword=true"></tabbar>
    <tabbar v-if="userdata.gender==1" tableft="性别" tabright="男" @handleClick="isShowgender=true"></tabbar>
    <tabbar v-else tableft="性别" tabright="女" @handleClick="isShowgender=true"></tabbar>
    <!-- 昵称弹窗提示 -->
    <van-dialog
      v-model="isShownickname"
      title="修改昵称"
      show-cancel-button
      @confirm="confirmData({nickname:nickname})"
    >
      <van-field v-model="nickname" placeholder="请输入昵称" />
    </van-dialog>
    <!-- 密码弹窗提示 -->
    <van-dialog
      v-model="isShowpassword"
      title="修改密码"
      show-cancel-button
      @confirm="confirmData({password:password})"
    >
      <van-field v-model="password" type="password" placeholder="请输入密码" />
    </van-dialog>
    <!-- 下拉菜单 -->
    <!-- v-model 控制是否显示
    :actions 是选项数组, 里面每一个元素都是选项的对象
    @select 是选择后的回调函数-->
    <van-action-sheet
      v-model="isShowgender"
      :actions="listGender"
      cancel-text="取消"
      @select="onSelect"
    ></van-action-sheet>
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
      isShowgender: false,
      nickname: "",
      password: "",
      listGender: [
        {
          name: "男"
        },
        {
          name: "女"
        }
      ]
    };
  },

  mounted() {
    // this.$axios({
    //   url: "/user/" + localStorage.getItem("user_id"),
    //   method: "get",
    //   headers: {
    //     Authorization: localStorage.getItem("token")
    //   }
    // }).then(res => {
    //   console.log(res.data);
    //   const { data } = res.data;
    //   this.userdata = data;
    // });
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
    //封装修改用户信息函数
    confirmData(newData) {
      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "post",
        data: newData,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        // console.log(res);
        this.loadPage();
      });
    },
    onSelect(item) {
      console.log(item);
      this.confirmData({
        gender: item.name == "男" ? 1 : 0
      });
      this.isShowgender = false;
    },
    afterRead(fileObj) {
      //1. 将图片转换成二进制
      const formData = new FormData();
      formData.append("file", fileObj.file);
      //2. 发送上传ajax请求
      this.$axios({
        url: "/upload",
        method: "post",
        data: formData,
        
      }).then(res => {
        console.log(res.data);
        const { data } = res.data;
        this.confirmData({ head_img: data.url });
        this.loadPage();
      });
    }
    // confirmNickname() {
    //   console.log("点击了确认" + this.nickname);
    //   this.$axios({
    //     url: "/user_update/" + localStorage.getItem("user_id"),
    //     method: "post",
    //     data: {
    //       nickname: this.nickname
    //     },
    //     headers: {
    //       Authorization: localStorage.getItem("token")
    //     }
    //   }).then(res => {
    //     console.log(res);
    //     //自动刷新数据
    //     this.loadPage();
    //   });
    // },
    // confirmPassword() {
    //   console.log("点击了确认");
    //   this.$axios({
    //     url: "/user_update/" + localStorage.getItem("user_id"),
    //     method: "post",
    //     data: {
    //       password: this.password
    //     },
    //     headers: {
    //       Authorization: localStorage.getItem("token")
    //     }
    //   }).then(res => {
    //     console.log(res);
    //     //自动刷新数据
    //     this.loadPage();
    //   });
    // }
  }
};
</script>

<style lang="less" scoped>
.topImg {
  text-align: center;
  position: relative;
  img {
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
  }
  .uploader {
    position: absolute;
    top: 15%;
    left: 45%;
    opacity: 0;
  }
}
</style>