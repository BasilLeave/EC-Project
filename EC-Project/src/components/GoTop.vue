<!--返回到顶部组件-->
<template>
  <div @click="toTop" v-show="isShow" class="me-to-top">
    <i class="el-icon-caret-top"></i>
  </div>
</template>

<script>
export default {
  name: "GoTop",
  data() {
    return {
      // 默认为不可见
      isShow: false
    }
  },
  methods: {
    toTop() {
      //  1.将滚动条的位置设置到网页顶部
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      //  2.设置当前组件为不可见
      this.isShow = true;
    },
    // 当页面滚动到一定高度时显示该返回顶部的组件
    needToTop() {
      let curHeight = document.documentElement.scrollTop;
      console.log(curHeight)
      if (curHeight >= 300) {
        this.isShow = true;
        console.log(curHeight)
      } else {
        console.log(curHeight)
        this.isShow = false;
      }
    }
  },
  // 设置监听器 当滑动滚动条时触发needToTop()函数
  mounted() {
    window.addEventListener('scroll', this.needToTop, true)
  },
}
</script>
<style scoped>
.me-to-top {
  background-color: #fff;
  position: fixed;
  right: 100px;
  bottom: 150px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  transition: .3s;
  box-shadow: 0 0 6px rgba(0, 0, 0, .12);
  z-index: 5;
}
.me-to-top i {
  color: #00d1b2;
  display: block;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
}
</style>
