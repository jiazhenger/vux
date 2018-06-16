// =====================================================  全局 js 
import '@common/common.js'
// =====================================================  全局 css
//import '@css/main.css'
// =====================================================  模块
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
// =====================================================
import App from './App'
import router from '@/router'
import store from '@vuex/store'
// =====================================================  web library
//import $ from 'jquery'
// =====================================================  公共方法 plugins
import Mehtods from '@plugins/methods'
Vue.use(Mehtods)
// =====================================================  ajax plugins 
import Ajax from '@plugins/ajax'
//Vue.use(Ajax)
// ===================================================== 移除移动端页面点击延迟
FastClick.attach(document.body)
Vue.config.productionTip = false
// ===================================================== 将 state 与 router 同步，相互影响
// 通过改变 state 来进行路由的一些操作，直接使用像是 $route.go 之类的也会影响到 state ，会同步的是这几个属性 { path: '', query: null, params: null }
//sync(store, router)
// =================================== 配置公共组件, 避免打包时异步文件重复打包以下组件，使用时每个页面还是需要同时引用
import { Group, Cell, XButton, BusPlugin, DevicePlugin } from 'vux'
//Vue.component('group', Group)
Vue.component('cell', Cell)
//Vue.component('x-button', XButton)
Vue.use(BusPlugin)
//Vue.use(DevicePlugin)
// =====================================================  匹配路由参数判断设置背景颜色
//if (/white-bgcolor=true/.test(location.href)) document.body.style['background-color'] = 'yellow'
// ===================================================== 启动
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app-box')