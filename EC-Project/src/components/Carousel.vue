<!--动态轮播图组件-->
<template>
  <div>
    <el-carousel height="400px">
      <el-carousel-item v-for="item in imgSource" :key="item.url">
        <img :src="item.image" class="cimg"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    imgSource: {
      type: Array,
      default() {
        return []
      }
    }
  },
}
</script>
<style scoped>
.cimg {
  width: 100%;
}
</style>
