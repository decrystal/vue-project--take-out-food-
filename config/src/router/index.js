/*路由文件*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Msite from '../pages/MSite/Msite'
import Test from '../pages/test/Test'
import Login from '../pages/Login/Login'
import Shop from "../pages/Shop/Shop"
import ShopFoods from "../pages/Shop/ShopFoods/ShopFoods";
import ShopInfo from "../pages/Shop/ShopInfo/ShopInfo";
import ShopRatings from "../pages/Shop/ShopRatings/ShopRatings";


//声明使用组件
Vue.use(VueRouter)

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
}
export default new VueRouter({
  //所有路由
  routes: [
    {
      path: '/login',
      component: Login,
      meta:{
        showFooter:false
      }
    },
    {
      path: '/msite',
      component: Msite,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/search',
      component: Search,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/order',
      component: Order,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/test',
      component: Test
    },
    {
      path: '/',
      redirect: '/msite',
      meta:{
        showFooter:true
      }
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/ratings',
          component: ShopRatings,
        },
        {
          path: '/shop/info',
          component: ShopInfo,
        },
        {
          path: '/shop/foods',
          component: ShopFoods,
        },
        {
          path: '',
          redirect:'/shop/foods',
        },
      ]
    },
  ]
})
