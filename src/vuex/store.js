import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 匹配路由参数判断设置是否使用动画
const shouldUseTransition = !/transition=none/.test(location.href)
const my = {
	state:{
		loading: false,
		loadingText: '正在加载中...'
	},
	mutations:{
		loading(state,payload){
			state.loading = payload.show;
			state.loadingText = payload.text || state.loadingText;
		}
	}
}
const vux = {
	state: {
		direction: shouldUseTransition ? 'forward' : ''
	},
	mutations:{
		updateDirection (state, payload) {
			if (!shouldUseTransition) return
			state.direction = payload.direction
	    }
	}
}

export default new Vuex.Store({ modules:{ my, vux } })

/*
 *
const store = new Vuex.Store({ modules:{ my, vux } })
store.registerModule('vux',{
	state: {
		direction: shouldUseTransition ? 'forward' : ''
	},
	mutations:{
		updateDirection (state, payload) {
			if (!shouldUseTransition) return
			state.direction = payload.direction
	    }
	}
})
*/
