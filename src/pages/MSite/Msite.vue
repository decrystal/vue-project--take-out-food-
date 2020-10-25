<template>
    <section class="msite">
          <HeadTop :title="address.name">
            <span class="header_login" slot="right">
              <span class="header_login_text" >登录|注册</span>
            </span>
            <span class="header_search" slot="left">
            <i class="iconfont icon-sousuo"></i>
          </span>
          </HeadTop>
      <!--首页导航-->
      <nav class="msite_nav">
        <swiper class="swiper-container" v-if="categorys.length" :options="swiperOptions">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl+category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <img src="./images/msite_back.svg" alt="back" v-else>
      </nav>
      <!--首页附近商家-->
      <Shoplist></Shoplist>
    </section>
</template>


<script>

  import HeadTop from "../../components/HeadTop/HeadTop.vue"
  import Shoplist from "../../components/Shoplist/Shoplist.vue"
  import {mapState} from 'vuex'

  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
  import VueAwesomeSwiper from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'
  export default {


      components: {
          HeadTop,
          Swiper,
          SwiperSlide,
          Shoplist
      },
      data() {
          return {
            swiperOptions: {

                  autoplay: true,
                  // 环路播放
                  loop: true,
                  // 切换效果

                  effect: "cube",
                  cubeEffect: {
                      slideShadows: true,
                      shadow: true,
                      shadowOffset: 100,
                      shadowScale: 0.6
                  },
                  pagination: {
                      el: '.swiper-pagination'
                  },
                  // Some Swiper option/callback...

              },
            baseImageUrl: 'https://fuss10.elemecdn.com'
          }
      },
    mounted() {
        this.$store.dispatch('getCategorys')
        this.$store.dispatch('getShops')

    },

    computed: {
      ...mapState(['address', 'categorys']),

        categorysArr() {
          const arr = []
          let minarr = []
          this.categorys.forEach(c => {
            if (minarr.length === 8) {
              minarr = []
            }
            if (minarr.length === 0) {
              arr.push(minarr)
            }
            minarr.push(c)
          })
          return arr
        }
      }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>
