<template>
  <div class="input-padding">
    <input :type="Type" :placeholder="Placeholder" />
  </div>
</template>

<script>
export default {
  props: ["Type", "Placeholder"]
};
</script>

<style lang="less" scoped>
.input-padding {
  padding: 6.389vw;
  input {
    width: 100%;
    height: 10.556vw;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid black;
    background-color: #fff;
    outline: none;
  }
}
</style>
