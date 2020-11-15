<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
    import Vue from 'vue'
    import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
    import VueAwesomeSwiper from 'vue-awesome-swiper'
    import 'swiper/swiper-bundle.css'
    export default {
        components: {
            Swiper,
            SwiperSlide
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
                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper
            }
        },
        mounted() {
            console.log('Current Swiper instance object', this.swiper)
            this.swiper.slideTo(3, 1000, false)
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
</style>
