import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "components/Index";
import Login from "components/Login";
import Register from "components/Register";
import Welcome from "common/Welcome";
import ProductList from "components/ProductList";
import ProductDetail from "components/ProductDetail";
import Cart from "components/Cart";
import ca from "element-ui/src/locale/lang/ca";
import Cart2 from "components/Cart2";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/welcome',
    component: Welcome
  },
  {
    path: '/productList',
    component: ProductList
  },
  {
    path: '/productDetail',
    component: ProductDetail
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/cart2',
    component: Cart2
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
