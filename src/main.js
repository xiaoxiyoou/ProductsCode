import Vue from 'vue'
import App from './App.vue'
import 'assets/js/vant'
import 'assets/js/noScaling'
import share from 'assets/js/share'
import 'assets/css/reset.css'
import 'amfe-flexible'
import store from './store/index'
import axios from 'axios'
import router from './router'
import LyTab from 'ly-tab'
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
Vue.use(LyTab)
import vueSwiper from 'vue-awesome-swiper'
Vue.use(vueSwiper);
import VueCookies from 'vue-cookies'
// import Swiper from "swiper"
import "../node_modules/swiper/css/swiper.css"
// Vue.use(Swiper);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$cookies = VueCookies
share(document.title,document.title)
new Vue({
  // Swiper,
  router,
  store,
  render: h => h(App),
}).$mount('#app')