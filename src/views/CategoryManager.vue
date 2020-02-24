<template>
  <div>
    <topnav title="栏目管理"></topnav>
    <div class="activeTab">
      <div class="tips">点击删除一下频道</div>
      <div class="list">
        <div
          class="item"
          v-for="(item,index) of activeTab"
          :key="index"
          @click="delTab(index)"
        >{{item.name}}</div>
      </div>
    </div>

    <div class="deactiveTab">
      <div class="tips">点击添加一下频道</div>
      <div class="list">
        <div
          class="item"
          v-for="(item,index) of deactiveTab"
          :key="index"
          @click="addTab(index)"
        >{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import topNav from "@/components/topNav.vue";
export default {
  data() {
    return {
      activeTab: [],
      deactiveTab: []
    };
  },
  components: {
    topnav: topNav
  },
  mounted() {
    this.$axios({
      url: "/category",
      method: "get"
    }).then(res => {
      console.log(res.data);
      const { data } = res.data;
      this.activeTab = data;
    });
  },
  methods: {
    delTab(index) {
      this.deactiveTab.push(this.activeTab[index]);
      this.activeTab.splice(index, 1);
    },
    addTab(index) {
      this.activeTab.push(this.deactiveTab[index]);
      this.deactiveTab.splice(index, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.tips {
  padding-left: 5.556vw;
  padding-right: 5.556vw;
  font-size: 3.889vw;
  color: #666;
  margin: 5.556vw 0;
}
.list {
  display: flex;
  flex-wrap: wrap;
  .item {
    border: 1px solid rgb(73, 73, 73);
    padding: 2.222vw 1.389vw;
    margin: 2.778vw 4.167vw;
    font-size: 3.889vw;
  }
}
</style>