<template>
  <div>
    <button @click="show=true">上拉菜单</button>
    <!-- v-model 控制是否显示
    :actions 是选项数组, 里面每一个元素都是选项的对象
    @select 是选择后的回调函数-->
    <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect"></van-action-sheet>
    <!-- 测试文件上传组件 -->
    <van-uploader :after-read="afterRead" />
    <!-- 测试关注功能 -->
    <button @click="clickFollow(1)">用户1</button>
    <button @click="clickFollow(2)">用户2</button>
    <button @click="clickFollow(3)">用户3</button>
    <button @click="clickFollow(4)">用户4</button>
    <button @click="clickFollow(5)">用户5</button>
    <button @click="clickFollow(6)">用户6</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      value: "",
      actions: [
        {
          name: "男"
        },
        {
          name: "女"
        }
      ]
    };
  },
  methods: {
    onSelect(item) {
      console.log(item);
    },
    afterRead(fileObj) {
      // 我们的文件就在 fileObj.file 当中
      //FormData对象用来把文件转换为二进制数据才能读取
      const formData = new FormData();
      formData.append("file", fileObj.file);
      this.$axios({
        url: "/upload",
        method: "post",
        data: formData,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res.data);
        const { data } = res.data;
        console.log(this.$axios.defaults.baseURL + data.url);
      });
    },
    clickFollow(id) {
      this.$axios({
        url: "/user_follows/" + id,
        method: "get"
      }).then(res => {
        console.log(res.data);
        console.log(res.data.message);
      });
    }
  }
};
</script>

<style>
</style>