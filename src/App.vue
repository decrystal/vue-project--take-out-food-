<template>
  <div id="app">
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
        this.getuserInfo()
      },

      methods: {
        ...mapActions(['getAddress','getuserInfo'])
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
