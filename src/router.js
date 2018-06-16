import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import store from '@vuex/store'
// =====================================================  异步加载路由
const loadAsync = (name) => {
	// 同步加载，不起作用
	//return require('@views/'+ name)
	// 按需加载，一个组件一个js文件
	return () => import('@views/'+ name).then(m => m.default)
	// 按需加载，所有按需组件全部打包到一个js文件
	//return resolve => require(['@views/'+ name], resolve)
	//return resolve => require.ensure([], () => resolve(require('@views/'+ name)), '')
}
// =====================================================  同步加载路由
import Index from '@views/index'
// =====================================================  路由分配
const routes = [
	// =====================================================
	{ path: '/', name:'index', component: Index},
	// =====================================================
	{ path: '/cell', 			component: loadAsync('demo/layout/Cell')},
	{ path: '/group', 			component: loadAsync('demo/layout/Group')},
	{ path: '/calendar', 		component: loadAsync('demo/calendar/Calendar')},
	{ path: '/inline-calendar', component: loadAsync('demo/calendar/InlineCalendar')},
	
	// =====================================================  
	{ path: '', 	redirect: '/index' },					// 重定向
	//{ path: '*',	component: loadAsync('404') },	// 404
]
// =====================================================  路由配置
const router =  new Router({
	//base: __dirname,	// 根路由
	mode: 'hash',	// 路由三种模式：hash(#) | history(无#) | abstract(支持所有 JavaScript 运行环境)
	hash: '?',
  	routes,
  	//设置切换路由滚动行为
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	}
})
// =====================================================  路由监听
// 进入路由之前
router.beforeEach((to, from, next) => {
	//console.log('form',from.path)
	//console.log('to',to.path)
	// ====================================  改变 store
	//Vue.$store.commit('loading',true)
	store.commit('loading',{show:true});
	// ====================================  匹配路由参数判断设置背景颜色
	if (to.query['white-bgcolor']){
		document.body.style['background-color'] = 'yellow'
	}else{
		document.body.style['background-color'] = '#fff'
	}
	next();
})
// 进入路由之前后
router.afterEach((to, from, next) => {
	//console.log('form',from.path)
	//console.log('to',to.path)
	//next();
	// ====================================  改变 store
	store.commit('loading',{show:false});
})

export default router;

