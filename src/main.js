/*
* 入口js
*/
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store' //输入配置好的store
import VueAwesomeSwiper from 'vue-awesome-swiper'
import {Button} from "mint-ui";
import './mocks/mockServer'//加载mock模块

Vue.component(Button.name, Button);
new Vue({
  el: '#app',
  render: h => h(App),
  router, //使用上vue-router
  store, // 将store导入app.vue
})
