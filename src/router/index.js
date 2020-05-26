import Vue from 'vue'
import VueRouter from 'vue-router'

// 同一个路由多次添加不被允许
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
const routes = [
  {
    path: '/',
    redirect: '/detail'
  },
  {
    // path: '/detail/:id/',
    path: '/detail',
    name: 'detail',
    component: resolve => require(['pages/detail/detail'],resolve),
    meta: {
      title: '',
      requireAuth: true,
      depth: 1,
    }
  },



]
Vue.use(VueRouter)
const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  // base: '/dist',
  routes
})
export default router