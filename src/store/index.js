/*
集中配置store
*/
import Vue from 'vue'//Vue要大写
import Vuex from 'vuex'//Vuex要大写
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'
//声明vue使用vuex插件
Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
