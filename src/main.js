import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//引入vant库
import Vant from "vant";
Vue.config.productionTip = false;
//注册组件库
Vue.use(Vant);

//引入组件样式
import "vant/lib/index.css";
const app = new Vue({
  el: "#app",
  router,
  render(createElement) {
    return createElement(App);
  }
  //附加：
  //为啥这个可以替换掉版本的渲染内容
  //将render当成一个过滤器来看
  //接受一个默认的渲染函数
  //返回一个我们需要的带上单文件组件的渲染函数
});
