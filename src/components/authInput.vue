<template>
  <div class="input-padding">
    <input
      :class="{ err: !isValid, success: isValid }"
      :type="itype"
      :placeholder="iplaceholder"
      @input="checkValue"
      @blur="showAlert"
    />
    <!-- 监控失去焦点事件
    如果失去焦点(输入完毕)
    这个input的数据还是不合法
    需要弹窗提醒-->
  </div>
  <!-- 根据合法性判断添加动态class -->
</template>

<script>
export default {
  data() {
    return {
      isValid: false //一开始就false
    };
  },
  props: ["itype", "iplaceholder", "irule", "errMsg"],
  methods: {
    checkValue(event) {
      // console.log("输入框的值发生了变化");
      // console.log(event);
      // console.log(event.target);
      // console.log(event.target.value); //获取到输入框的值
      const regExp = new RegExp(this.irule); //代表任意字符3-10以内都是合法
      // console.log(this.irule);

      this.isValid = regExp.test(event.target.value); //test检索正则表达式与输入的字符是否匹配
      // console.log(this.isValid);
      this.$emit("valueChange", event.target.value);
    },
    showAlert() {
      //这里是失去焦点时触发的函数
      //需要判断，如果this.isValid 为false
      //证明不合法，需要弹窗
      //如果合法，什么都不做
      if (!this.isValid) {
        //这里的处理可以根据自己的喜好，贴近用户即可
        //正常这里的提醒方式，是产品或设计共同决定的
        // alert(this.errMsg); //因为输入框需求不一样，需要传值
        this.$toast(this.errMsg);
        this.$emit("sendTrue", this.isValid); //这里的值为false
      }
    }
  }
};
</script>

<style lang="less" scoped>
.input-padding {
  padding: 6.389vw;
  padding-top: 0;
  input {
    width: 100%;
    height: 10.556vw;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid black;
    background-color: #fff;
    outline: none;
    font-size: 5.556vw;
  }
  .err {
    border-color: red;
  }
  .success {
    border-color: #666;
  }
}
</style>
