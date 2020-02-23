<template>
  <div>
    <Parent
      :parent="parent.parent"
      v-if="parent.parent"
      @parentCallReply="diguiCallReply"
    >{{parent.parent}}</Parent>

    <div class="parentWrapper">
      <div class="infoWrapper">
        <div class="name">{{parent.user.nickname}}</div>
        <div class="time">2小时前</div>
        <div class="btnReply" @click="parentCallReply">回复</div>
      </div>
      <div class="mainContent">{{parent.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Parent",
  props: ["parent"],
  methods: {
    parentCallReply() {
      this.$emit("parentCallReply", this.parent.id);
    },
    diguiCallReply(id) {
      this.$emit("parentCallReply", id);
    }
  }
};
</script>

<style lang="less" scoped>
.parentWrapper {
  padding: 2.778vw;
  border: 1px solid #ccc;
  background-color: #eee;

  .infoWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    .name {
      font-size: 3.611vw;
      margin-right: 1.389vw;
    }
    .time {
      flex: 1;
      font-size: 2.778vw;
      color: rgb(122, 122, 122);
    }
    .btnReply {
      font-size: 3.889vw;
      color: #888;
    }
  }
  .mainContent {
    margin-top: 2.778vw;
    font-size: 3.611vw;
  }
}
</style>