/*封装接口请求函数*/
import ajax from './ajax'
/*
[1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
[2、获取食品分类列表](#2获取食品分类列表)<br/>
[3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
[4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
[5、获取一次性验证码](#5获取一次性验证码)<br/>
[6、用户名密码登陆](#6用户名密码登陆)<br/>
[7、发送短信验证码](#7发送短信验证码)<br/>
[8、手机号验证码登陆](#8手机号验证码登陆)<br/>
[9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
[10、用户登出](#10用户登出)<br/>
*/
const BASE_URL = '/api'
// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodCategorys = () => ajax(BASE_URL+'/index_category')
// 3、根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(BASE_URL+'/shops', {longitude, latitude})
<<<<<<< HEAD
// 4、获取用户信息
export const reqUserInfo = () => ajax(BASE_URL+'/userinfo')
//5、给用户发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL+'/sendcode', {phone})
//6、获取用户手机号、验证码核对手机登录
export const reqSmsLogin = (phone, code) => ajax(BASE_URL+'/login_sms', {phone, code}, 'POST')
//7、用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URL+'/login_pwd', {name, pwd, captcha}, 'POST')
//8、用户登出
export const reqLogout = () => ajax(BASE_URL+'/logout')
//9、获取点餐信息
export const reqShopFoods = () => ajax('/foods')
//10、获取商家信息
export const reqShopInfo = () => ajax('/info')
//11、获取评价信息
export const reqShopRatings = () => ajax('/ratings')
=======
>>>>>>> 4732f3785a0a26f6fc5728f627eeb56b6827fdbb
