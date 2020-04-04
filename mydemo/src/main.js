// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入状态管理
import store from './store'
//引入elementUI
import ElementUI from 'element-ui'
//引入elementUI 样式
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

//引入重置样式
import './assets/css/reset.css'
Vue.config.productionTip = false

//引入全局组件
import comComponent from './common'
// console.log(comComponent,'共通的组件')
for(let i in comComponent){
  Vue.component(i,comComponent[i])
}

//引入全局过滤器
import comFilter from './filter'
for(let i in comFilter){
  Vue.filter(i,comFilter[i])
}

//前端拦截(全局导航守卫)
router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    next()
    return
  }
  if(!localStorage.getItem('name')){
    next('/login')
    return
  }
  next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
