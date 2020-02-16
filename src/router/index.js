import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/profile/index.vue"
import Edit from "../views/profile/edit.vue"
import Test from "../views/test.vue"
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
    path: "/profile",
    component: Profile
  },
  {
    //编辑页面
    path: '/edit',
    component: Edit
  },
  {
    path: "/test",
    component: Test
  },
];

const router = new VueRouter({
  routes
});

export default router;