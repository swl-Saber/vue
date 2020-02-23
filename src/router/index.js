import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Index from "../views/profile/index.vue"
import Edit from "../views/profile/edit.vue"
import Test from "../views/test.vue"
import Myfollow from "../views/profile/myfollow.vue"
import Collections from "../views/profile/collections.vue"
import PostDetail from "../views/PostDetail.vue"
import MoreComment from "../views/MoreComment.vue"
import Search from "../views/Search.vue"
Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    //个人中心页
    path: "/index",
    component: Index
  },
  {
    //编辑页面
    path: '/edit',
    component: Edit
  },
  {
    //测试页面
    path: "/test",
    component: Test
  },
  {
    //我的关注页面
    path: "/myfollow",
    component: Myfollow
  },
  {
    //我的收藏页面
    path: "/collections",
    component: Collections
  },
  {
    //文章详情页
    path: "/postdetail",
    component: PostDetail
  },
  {
    //精彩跟帖
    path: "/morecomment",
    component: MoreComment
  },
  {
    //搜索页面
    path: "/search",
    components: Search
  }
];

const router = new VueRouter({
  routes
});

export default router;