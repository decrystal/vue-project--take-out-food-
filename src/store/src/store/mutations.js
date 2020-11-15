import Vue from 'Vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS, RECEIVE_SHOPS
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
  }
}
