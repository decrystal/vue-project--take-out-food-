<template>
  <div>
    <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item "
            :class="{current: index===currentIndex}"
            @click="toggleList(index)" v-for="(food,index) in foods" :key="index">
          <span class="text bottom-border-1px">
            <img class="icon" v-if="food.icon" :src="food.icon">
            {{food.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul ref="foodsList">
        <li class="food-list-hook"
            v-for="(food,index) in foods" :key="index">
          <h1 class="title">折扣</h1>
          <ul>
            <li class="food-item bottom-border-1px"
                v-for="(foodDetail,index) in food.foods" :key="index">
              <div class="icon">
                <img width="57" height="57" :src="foodDetail.icon">
              </div>
              <div class="content">
                <h2 class="name">{{foodDetail.name}}</h2>
                <p class="desc">{{foodDetail.description}}</p>
                <div class="extra">
                  <span class="count">月售 {{foodDetail.sellCount}} 份</span>
                  <span>好评率 {{foodDetail.rating}}%</span></div>
                <div class="price">
                  <span class="now">￥{{foodDetail.price}}</span>
                </div>
                <div class="cartcontrol-wrapper"> CartControl </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
  import {mapState} from 'vuex'
  import BScroll from '@better-scroll/core'
  export default {
    data (){
      return{
        daltaY:0,
        daltaYEnd:0,
        tops:[],
      }
    },
    mounted() {

      this.$store.dispatch('getShopsFoods',() => {
        this.$nextTick(() => {
          this._shopListScroll()
          this._foodListScroll()
        })
      })
    },
    computed:{
      ...mapState(['foods']),

      //计算得到当前下标
      currentIndex(){
        const {tops,daltaYEnd} = this
        const index = tops.findIndex((top,index) => {
          return daltaYEnd >= top && daltaYEnd < tops[index +1]
        })
        //返回结果
        console.log(index)
        return index

      }
    },
    methods:{
      //获取实时y轴方向实时滚动距离
      _shopListScroll(){
        this.foodListScroll = new BScroll('.foods-wrapper',{
          probeType: 2,//设置滚动类型
          click:true,//为true才能设置click点击事件，默认为false，click触发不了
        })
        this.foodListScroll.on('scroll',({x,y}) => {
          console.log('SCROLL',x,y)
          this.daltaYEnd = Math.abs(y)
        })
        this.foodListScroll.on('scrollEnd',({x,y}) => {
          this.daltaYEnd = Math.abs(y)
          console.log('END',x,this.daltaYEnd)
          //这个可以覆盖上面实时产生的坐标
        })
      },
      //获取每一foodlist的top
      _foodListScroll(){
        let top = 0
        this.tops.push(top)
        const list = this.$refs.foodsList.getElementsByClassName('food-list-hook')
        Array.prototype.slice.call(list).forEach(li=>{
          top += li.clientHeight
          this.tops.push(top)
        })
        console.log(this.tops)
      },
      toggleList(index){
        const daltaY = this.tops[index]
        //让点击分类时，立刻变为current， 而不是srollTo的时候才变为currnet
        this.daltaYEnd = daltaY
        //滚动到相应食品显示界面
        this.foodListScroll.scrollTo(0,-daltaY,300)
      }
    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixins.styl"
.goods
  display: flex
  position: absolute
  top: 195px
  bottom: 46px
  width: 100%
  background: #fff;
  overflow hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    .menu-item
      display: table
      height: 54px
      width: 56px
      padding: 0 12px
      line-height: 14px
      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background: #fff
        color: $green
        font-weight: 700
        .text
          border-none()
      .icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        font-size: 12px
  .foods-wrapper
    flex: 1
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 12px
</style>
