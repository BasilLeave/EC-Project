<template>
  <div id="app" :style="{height: minHeight + 'px'}">
<!--    <h2 class="red">欢迎来到HOME界面</h2>-->
<!--    <h3 class="green">欢迎进入HOME界面</h3>-->
    <router-view>
    </router-view>
<!--    回到顶部的组件-->
    <go-top></go-top>
  </div>
</template>

<script>
import GoTop from "./components/GoTop";
export default {
  name: 'App',
  components: {
    "go-top": GoTop
  },
  data() {
    return {
      minHeight: 100
    }
  },
  mounted() {
    this.minHeight = document.body.scrollHeight + 140;
    // var that = this;
    // window.onresize = function () {
    //   that.minHeight = document.body.scrollHeight;
    // }
  }
}
</script>

<style lang="scss">
#app {
  z-index: -1;
  display: block;
  background-color: #f0f3f4;
}
</style>
