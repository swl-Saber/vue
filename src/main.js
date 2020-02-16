//脚手架引入vue，根实例组件，路由配置
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//全局引入vant-ui组件库并配置
import Vant from "vant";
//注册组件库
Vue.use(Vant);
//引入组件样式
import "vant/lib/index.css";
//局部引入vant-ui的一个组件
import {
  Toast
} from "vant";
// Vue.use(Toast) 挂载到组件中

//引入axios ajax库并进行配置
import axios from "axios";
//绑定到原型
Vue.prototype.$axios = axios;

// 设置基准路径
axios.defaults.baseURL = "http://liangwei.tech:3000"
//如果是本地路径
// axios.defaults.baseURL = "http://127.0.0.0.1:3000"

//全局前置路由守卫
//这个回调函数，可以接受三个形参to,from,next
//to 指的是目标路由
//from指的是来源路由
//next 是处理完逻辑之后必须调用函数，告诉守卫放行的函数
router.beforeEach((to, from, next) => {
  // console.log('拦截路由跳转');
  // console.log(to);
  // console.log(from);

  //我们要判断localStorage里面是否有token，可能有用户恶意修改token
  const token = localStorage.getItem('token')
  //跳转到个人中心，判断是否有token
  //有才放行,否则跳转到登录页
  // if (to.path == '/profile' || to.path == "/edit") {

  // 路由逻辑优化
  const needPagePath = [
    '/profile',
    "/edit"
  ]
  if (needPagePath.indexOf(to.path) !== -1) {
    if (token) {
      next();
    } else {
      router.push({
        path: '/login'
      })
    }
  }

  next(); //如果漏了，路由跳转过程会卡死
})



//axios 全局拦截器
//axios.intercetors 这是拦截器的设置
//分成两种，一个是请求拦截，一个是响应拦截
//现在先用响应拦截
//叫 axios.interceptors.response.use(),带一个回调函数用来处理接受到的响应
//全局拦截响应
axios.interceptors.response.use(res => {
  // console.log('拦截了响应');
  //既然在这里拦截了就可以先同意处理错误
  //这里可以获取到响应
  // console.log(res.data);
  //判断错误处理
  const {
    statusCode,
    message
  } = res.data;
  const errorRegExp = /^4\d\d$/;
  if (statusCode && errorRegExp.test(statusCode)) {
    //这里是全局错误处理逻辑
    //需要弹窗
    //但是这里是main.js甚至还没有创建vue还没有引入vant-ui
    //所以 以前用的this.$toast.fail()
    // console.log('这里是错误处理');
    Toast.fail(message || '系统错误')

    //前面路由守卫，检测不到token，报401这里要进行逻辑判断进行跳转到登录页面
    if (statusCode == 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');

      router.push({
        path: '/login'
      })
    }
  }
  //最终必须return 你的res这样整个请求才能继续处理下去
  return res;
})


Vue.config.productionTip = false;




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