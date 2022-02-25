import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import BaiduMap from 'vue-baidu-map'
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css'
//引入axios依赖
import axios from 'axios'
//让请求携带上浏览器的cookie
axios.defaults.withCredentials=true
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(BaiduMap, {
  ak: 'N090C5fm0ZXjWIKu2cGFxU26H76YAAWu'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

