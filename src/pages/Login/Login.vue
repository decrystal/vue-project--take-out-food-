<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay = true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit="login">
          <div :class="{on: loginWay}" @click="loginWay = true">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button
                      class="get_verification"
                      :class="{right_phone:right_Phone}" @click.prevent="getCode">
                {{codeGet ? `已发送(${computedTime}s)`: '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}" @click="loginWay = false">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="password" maxlength="8" placeholder="密码" v-if="pwd">
                <input type="text" maxlength="8" placeholder="密码" v-else>
                <div class="switch_button" :class="{on:!pwd,off:pwd}" @click="pwdShow" v-model="password">
                  <div class="switch_circle" :class="{right: !pwd}"></div>
                  <span class="switch_text">{{pwd ? '...' : 'abc'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont icon-jiantou2" @click="$router.back()"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></AlertTip>
  </section>
</template>

<script>
    import AlertTip from "../../components/AlertTip/AlertTip";
    import router from "vue-router"
    import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api'
    export default {
      data (){
        return {
          loginWay: true,//true代表短信登录，false代表密码登录
          codeGet: false,
          switchstate: '',
          computedTime: 0,
          pwd: true,
          alertText:'',
          alertShow:false,
          phone: '',//输入的手机号
          code:'',//手机登陆验证码
          name:'',//账号登陆用户名
          password:'',//账号登陆密码
          captcha:''//验证码
        }
      },
      computed :{
        right_Phone(){
          return /^1\d{10}$/.test(this.phone)
        },
      },
      methods :{
        async getCode(){
          if(this.right_Phone){
            this.codeGet=true
            if(this.computedTime ===0){
              this.computedTime = 30
              this.Intervalid = setInterval(()=>{
                if(this.computedTime>0){
                  this.computedTime--
                }
                if(this.computedTime<=0){
                  clearInterval(this.Intervalid)
                  this.codeGet = false
                }
              },1000)
            }
          }
          // 后端发送ajax请求(向指定手机号发送验证码短信)
          const result = await reqSendCode(this.phone)
          if(result.code===1) {
            // 显示提示
            this.showAlert(result.msg)
            // 停止计时
            if(this.computeTime) {
              this.computeTime = 0
              clearInterval(this.intervalId)
              this.intervalId = undefined
            }
          }
        },
        pwdShow(){
          this.pwd = !this.pwd
        },
        //提示框函数
        showAlert(a){
          this.alertText = a
          this.alertShow = true
        },
        //关闭·提示框函数
        closeTip(){
          this.alertShow = false
        },
        async login(){
          //新建result接收返回用户数据
          let result
          if(this.loginWay){//手机登陆
            const {rightPhone, phone, code} = this
            //前台表单验证
            if(!this.right_Phone){
              this.showAlert('手机格式不正确')
              return
            }
            else if(!/^\d{6}$/.test(this.code)){
              this.showAlert('验证码必须6位数')
              return
            }
            result = await reqSmsLogin(phone, code)
            console.log(result)
          }else{// 密码登陆
            const {name, pwd, captcha} = this
            if(!this.name) {
              // 用户名必须指定
              this.showAlert('用户名必须指定')
              return
            } else if(!this.pwd) {
              // 密码必须指定
              this.showAlert('密码必须指定')
              return
            } else if(!this.captcha) {
              // 验证码必须指定
              this.showAlert('验证码必须指定')
              return
            }
            // 发送ajax请求密码登陆
            result = await reqPwdLogin({name, pwd, captcha})
            console.log(result)
          }

          //根据登陆结果处理
          if(result.code === 0){
            //保存数据
            const user = result.data
            //将数据保存在vuex里面进行管理
            this.$store.dispatch('recordUser', user)
            //切换路由
            this.$router.replace('/profile')
          }else {
            // 显示新的图片验证码
            this.getCaptcha()
            // 显示警告提示
            const msg = result.msg
            this.showAlert(msg)
          }




        },
        getCaptcha(){
          this.$refs.captcha.src = "http://localhost:4000/captcha?time="+Date.now()
        }
      },
      components:{
        AlertTip
      }
    }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px

          >a
            margin-left 40px
            float left
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
