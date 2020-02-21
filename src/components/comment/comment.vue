<template>
  <div class="commentWrapper">
    <parent :parent="comment.parent" v-if="comment.parent"></parent>
    {{comment.content}}
  </div>
</template>

<script>
import Parent from "./parent.vue";
export default {
  props: ["comment"],
  components: {
    parent: Parent
  }
};
</script>

<style lang="less" scoped>
.commentWrapper {
  padding: 5.556vw 2.778vw;
  border-bottom: 1px solid #888;
}
</style>