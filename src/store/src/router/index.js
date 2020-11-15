/*路由文件*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Msite from '../pages/MSite/Msite'
import Test from '../pages/test/Test'
import Login from '../pages/Login/Login'
//声明使用组件
Vue.use(VueRouter)

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
    }
  ]
})
