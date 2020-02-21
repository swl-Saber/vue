<template>
  <div>
    <Parent :parent="parent.parent" v-if="parent.parent">{{parent.parent}}</Parent>
    <div class="parentWrapper">{{parent.content}}</div>
  </div>
</template>

<script>
export default {
  name: "Parent",
  props: ["parent"]
};
</script>

<style lang="less" scoped>
.parentWrapper {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #eee;
}
</style>