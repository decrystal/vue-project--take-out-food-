import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
<<<<<<< HEAD
  RECEIVE_SHOPS,
  RECEIVE_USERS, RECIEVE_SHOPSFOODS, RECIEVE_SHOPSINFO, RECIEVE_SHOPSRATINGS,
  RESET_USERS,

=======
  RECEIVE_SHOPS
>>>>>>> 4732f3785a0a26f6fc5728f627eeb56b6827fdbb
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
<<<<<<< HEAD
  reqUserInfo,
  reqLogout,
  reqShopFoods,
  reqShopRatings,
  reqShopInfo
} from '../api'
/*通过mutations间接更新state的多个方法对象*/
export default {
    //将获取的手机号码保存进vuex
  recordUser({commit}, users) {
      commit(RECEIVE_USERS, {users})
  },

  async getuserInfo({commit}){
    const result = await reqUserInfo()
    if(result.code === 0){
      const users = result.data
      commit(RECEIVE_USERS, {users})
    }
  },
  async logout(context){
    const result = await reqLogout()
    if(result.code === 0){
      context.commit(RESET_USERS)
    }
  },

=======
} from '../api'
/*通过mutations间接更新state的多个方法对象*/
export default {
>>>>>>> 4732f3785a0a26f6fc5728f627eeb56b6827fdbb
  async getAddress({commit, state}) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交一个mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  async getCategorys({commit}) {
    //发布异步请求
    const result = await reqFoodCategorys()
    if (result.code === 0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  async getShops({commit,state}){
    //发布异步请求
    const result = await reqShops()
    if (result.code === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  },
<<<<<<< HEAD
  async getShopsFoods({commit},callback){
    const result = await reqShopFoods()
    if(result.code === 0){
      const foods = result.data
      commit(RECIEVE_SHOPSFOODS,{foods})
      callback && callback()
    }
  },
  async getShopsRatings({commit}){
    const result = await reqShopRatings()
    if(result.code === 0){
      const ratings = result.data
      commit(RECIEVE_SHOPSRATINGS,{ratings})
    }
  },
  async getShopsInfo({commit}){
    const result = await reqShopInfo()
    if(result.code === 0){
      const info = result.data
      commit(RECIEVE_SHOPSINFO,{info})
    }
  },
=======
>>>>>>> 4732f3785a0a26f6fc5728f627eeb56b6827fdbb
}
