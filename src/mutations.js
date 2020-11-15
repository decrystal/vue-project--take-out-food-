import Vue from 'Vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USERS,
  RESET_USERS,
  RECIEVE_SHOPSFOODS,
  RECIEVE_SHOPSRATINGS,
  RECIEVE_SHOPSINFO
} from './mutation-types'
/*直接更新state的多个方法对象*/
export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}){
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USERS] (state, {users}) {
    state.userInfo = users
  },
  [RESET_USERS](state){
    state.userInfo = {}
  },
  [RECIEVE_SHOPSFOODS](state,{foods}){
    state.foods = foods
  },
  [RECIEVE_SHOPSRATINGS](state,{ratings}){
    state.ratings = ratings
  },
  [RECIEVE_SHOPSINFO](state,{info}){
    state.info = info
  },
}
