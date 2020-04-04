import Vue from 'vue'
import Router from 'vue-router'
//引入一级路由
const Login = () => import('@/components/pages/login')
const Index = () => import('@/components/pages/index')
//引入二级路由
const Manger = () => import('@/components/view/manger')
const User = () => import('@/components/view/user')
const Notice = () => import('@/components/view/notice')
const Device = () => import('@/components/view/device')
const Welcome = () => import('@/components/view/welcome')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: '',
          component: Welcome
        },
        {
          path: 'manger',
          component: Manger,
          name:'管理员页面'
        },
        {
          path: 'user',
          component: User,
          name:'用户页面'
        }, 
        {
          path: 'notice',
          component: Notice,
          name:'通知页面'
        }, 
        {
          path: 'device',
          component: Device,
          name:'购买设备页面'
        }
      ]
    },
    {//重定向
      path: '*',
      redirect: '/login'
    }
  ]
})
