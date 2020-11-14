/*配置mock*/
import Mock from 'mockjs'
import data from './data.json'
/*使用Mock.mock()拦截ajax请求，模拟后台接口*/
Mock.mock('/foods' , {code:0,data: data.goods})
Mock.mock('/info' , {code:0,data: data.info})
Mock.mock('/ratings' , {data: data.ratings})
