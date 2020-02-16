<template>
  <div>
    <button @click="show=true">上拉菜单</button>
    <!-- v-model 控制是否显示
    :actions 是选项数组, 里面每一个元素都是选项的对象
    @select 是选择后的回调函数-->
    <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect"></van-action-sheet>
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
    }
  }
};
</script>

<style>
</style>