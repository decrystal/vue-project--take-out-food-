<template>
<<<<<<< HEAD
  <div id="app">
=======
  <div>
>>>>>>> 4732f3785a0a26f6fc5728f627eeb56b6827fdbb
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import FooterGuide from "./components/FooterGuide/FooterGuide.vue";
  import {mapActions} from 'vuex'
    export default {
      mounted () {
        // this.$store.dispatch('getAddress')
        this.getAddress()
<<<<<<< HEAD
        this.getuserInfo()
      },

      methods: {
        ...mapActions(['getAddress','getuserInfo'])
=======

      },

      methods: {
        ...mapActions(['getAddress'])
>>>>>>> 4732f3785a0a26f6fc5728f627eeb56b6827fdbb
      },
        components: {
            FooterGuide
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    color: read
</style>
