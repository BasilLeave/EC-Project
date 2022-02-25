<!--百度地图-->
<template>
  <div class="app-container">
    <el-autocomplete
        v-model="mapLocation.address"
        :fetch-suggestions="querySearch"
        style="width: 430px"
        placeholder="请输入详细地址"
        :trigger-on-focus="false"
        @select="handleSelect"
        @input="handleInput(mapLocation.address)"
        clearable
    />
    <div style="margin: 5px">
      <baidu-map :center="mapCenter" :zoom="mapZoom" :scroll-wheel-zoom="true" ak="baidu-ak" @ready="handlerBMap" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mapCenter: {lng: 0, lat: 0}, //经纬度
      mapZoom: 15,  //缩放等级
      mapLocation: {
        address: undefined, //地址
        coordinate: undefined //坐标
      }
    }
  },
  methods: {
    //queryString是我们文本框里输入的内容 cb是一个函数
    querySearch(queryString, cb) {
      var that = this
      var myGeo = new this.BMap.Geocoder()
      myGeo.getPoint(queryString, function(point) {
        if (point) {
          that.mapLocation.coordinate = point
          that.makerCenter(point)
        } else {
          that.mapLocation.coordinate = null
        }
      }, this.locationCity)
      var options = {
        onSearchComplete: function(results) {
          if (local.getStatus() === 0) {
            // 判断状态是否正确
            var s = []
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
              var x = results.getPoi(i)
              var item = { value: x.address + x.title, point: x.point }
              s.push(item)
              cb(s)
            }
          } else {
            cb()
          }
        }
      }
      var local = new this.BMap.LocalSearch(this.map, options)
      local.search(queryString)
    },
    handleSelect(item) {
      var { point } = item
      this.mapLocation.coordinate = point
      this.makerCenter(point)
    },
    handleInput(address) {
      this.$emit('input', address)
    },
    makerCenter(point)
    {
      if (this.map) {
        this.map.clearOverlays()
        this.map.addOverlay(new this.BMap.Marker(point))
        this.mapCenter.lng = point.lng
        this.mapCenter.lat = point.lat
        this.mapZoom = 15
      }
    },
    handlerBMap({BMap, map}) {
      console.log(BMap, map)
      this.BMap = BMap
      this.map = map
      if (this.mapLocation.coordinate && this.mapLocation.coordinate.lng) {
        this.mapCenter.lng = this.mapLocation.coordinate.lng
        this.mapCenter.lat = this.mapLocation.coordinate.lat
        this.mapZoom = 15
        map.addOverlay(new this.BMap.Marker(this.mapLocation.coordinate))
      } else {
        this.mapCenter.lng = 113.271429
        this.mapCenter.lat = 23.135336
        this.mapZoom = 10
      }
    },
  }
}
</script>
<style scoped>
.app-container {
  width: 100px;
  height: 40px;
}
</style>

