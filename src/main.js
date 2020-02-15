import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//引入vant库
import Vant from "vant";
//引入axios
import axios from "axios";
// 设置基准路径
axios.defaults.baseURL = "http://liangwei.tech:3000"
//如果是本地路径
// axios.defaults.baseURL = "http://127.0.0.0.1:3000"

//axios 全局拦截器
//axios.intercetors 这是拦截器的设置
//分成两种，一个是请求拦截，一个是响应拦截
//现在先用响应拦截
//叫 axios.intercetors.response.use(),带一个回调函数用来处理接受到的响应
axios.intercetors.response.use(res => {
  console.log('拦截了响应');
  //既然在这里拦截了就可以先同意处理错误
  //这里可以获取到响应
  console.log(res.data);
  //判断错误处理
const {statusCode}=res.data;
const errorRegExp=/^4\d\d$/
  //最终必须return 你的res这样整个请求才能继续处理下去
  return res;

})
//绑定到原型
Vue.prototype.$axios = axios;

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