import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

const app = new Vue({
  el: "#app",
  router,
  render(createElement) {
    return createElement(App)

  }
  //附加：
  //为啥这个可以替换掉版本的渲染内容
  //将render当成一个过滤器来看
  //接受一个默认的渲染函数
  //返回一个我们需要的带上单文件组件的渲染函数
})