// axios http 请求
import axios from 'axios'
// http 请求插件
export default{
	install(Vue){
		//const time = (new Date()).valueOf().toString(); 	// 现在的时间
		// ===================================================== 公共函数
		// 错误提法信息
		const logError = (msg)=>{
			console.log('%cj+2 错误提示：' + msg,'color:red');
		}
		// 友情提示
		const logPromp = (msg)=>{
	        console.log('%cj+2 友情提示：' + msg,'color:#ce6007');
	    }
		// 配置头信息
		const config = ()=>{
			return {
				baseURL:Config.api,	// api 线上地址
				//baseURL:'http://10.1.22.112:8080/genius/api/',	// api 本地地址
				// headers 配置
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
					//'authorization' : localStorage.token
				},
				timeout: 30000,			// 超时配置
				withCredentials : true	// true 异步请求， false 同步请求
			}
		}
		// 接口错误处理
		const error = (err, url) =>{
			if(err.status === 404){
				vue.$router.push({ path:'/404', query:{ api:url } });
				logError('你访问的 api 不存在，请检查: '+  err.url);
			}else if(err.status === 500){
	            logError('服务器内部错误: '+  url);
	        }else if(err.status === 0){
	            logError('可能存在服务器拒绝 cors 跨域请求 || 访问的服务器不存在 || 访问的 api 没有返回数据 || 访问的 api 返回数据格式错误：' + url);
	        }else{
	        	logError('服务器出错：' + url);
	        }
		}
		// 处理请求参数
		const manageBody = (body,param,promise) => {
			let mbody = body;
			if(F.isFunction(mbody)){
				mbody = body.call(promise, param);
				if(!F.isObject(mbody)){
					logError('请求参数是 函数时，必须返回一个对象参数 {}');
					return {}
				}
				return mbody;
			}else if(F.hasObject(body)){
				return body;
			}else{
				//logPromp('请求参数格式有 {} 与 函数返回 {} 或不传三种, 如请求数据不正确，请确认是否需要传参');
				return {}
			}
		}
		// 初始化请求
		const requestInit = (url, body, action = 'get')=>{
			let mbody = body;
			return new Promise((resolve,reject) => {
				// 如果是初次请求
				if(!LS.get('init')){
					httpRequest(Config.init,{},'post').then(data=>{
						if(data.code == 0){
							LS.set('init',data.data);
							let mbody = manageBody(body,data.data,this);	// 函数返回带公参
							httpRequest(url,mbody,action).then(result=>{
								resolve(result.data);
							},data => {
								reject(data);
							})
						}
					})
				}else{
					let mbody = manageBody(body,LS.get('init'),this);	// 函数返回带公参
					httpRequest(url,mbody,action).then(result=>{
						resolve(result.data);
					},data=>{
						reject(data);
					})
				}
			})
		}
		// 封装公参
		const publicParam = (data, action) => {
			let param = LS.get('login');
			let str='';
			for(let i in param){
				str += i + '=' + param[i] + '&' 
			}
			
			str = F.hasObject(data) && action == 'get' ? ( str + 'data=' + JSON.stringify(data) ) : str;
			
			return encodeURI( '?' + str);	// encodeURI 不对 [:, /, ;,?] 进行编码
		}
		// post 与 get 合在一起处理
		const httpRequest = (url, body, action = 'get') => {
			let param = publicParam(body,action);
			return new Promise((resolve, reject) => {
				let promise;
				if(action == 'get'){
					let uri = body ? url + param : url;
					promise = axios.get(uri, config());
					console.log('%c' + action + ' === ' + Config.api + url + param, 'color:blue')		// 输出 api
				}else{
					// 初始化重调 post
					if(url == Config.init){
						promise = axios.post(url, {}, config());
						console.log('%c' + '初始化请求：' + action + ' === ' + Config.api + url, 'color:blue')		// 输出 api
					}else{
						promise = axios.post(url + param, { data: body }, config());
						console.log('%c' + action + ' === ' + Config.api + url + param, 'color:blue')		// 输出 api
					}
				}
				promise.then(res => {	// 接口正确接收数据处理
					let data = res.data;
					let code = data['code'];
					
					//console.log(data);	// 测试输出
					
					if(code == 0){
						if(!F.isValid(data.data)){
							logError(' 接口未返回数据 data，请检查参数是否传正确，或是请求方式不正确，本站统一用 get 请求！');
							resolve({data:{'j+2提示': '接口未返回数据 data'}});
							return false;
						}
						resolve(data);
					} else if(code == 1919 || code == 1909){	// 未登录处理
						LS.set('loginReturnPage',this.$router.currentRoute.path);
						this.$router.push('/login');
					}else {
						reject(data);
						logError('ajax请求畅通，返回后台程序容错信息：' + data['msg'])
					}
				}, (err) => { 					// 接口错误处理
					error(err, Config.api + url)
				})
			})
		}
		// ===================================================== ajax 请求组件
		// post 请求
		Vue.prototype.$post = (url,body) => {
			return requestInit(url,body,'post');
		}
		// get 请求
		Vue.prototype.$get = (url,param) => {
			return requestInit(url,param);
		}
		// 判断是否有参数选择 get 或 post 
		Vue.prototype.$ajax = (url,body) => {
			return F.isObject(body) || F.isFunction(body) ?  requestInit(url,'post',body) : requestInit(url);
		}
		// 请求多个接口
		Vue.prototype.$ajaxs = (res,callback) => {
			axios.all(res).then(axios.spread(callback)).catch(e=>{
				error(e)
			})
		}
		// 获取文本数据
		Vue.prototype.$getTxt = (url) => {
			//let api = 'http://10.1.22.15/vue/src/';
			let api = 'http://localhost:8020/my-template/vue/src/';
			return new Promise((resolve, reject) => {
				axios.get(api + url).then(res => {
					let data = res.data
					if(data){
						resolve(data);
					} else {
						reject(data);
					}
				})
			})
		}
		// ===================================================== 暴露方法
		//  暴露 axios 原码
		//Vue.prototype.$http = axios;
		// 暴露 ajax 请求 配置
		//Vue.prototype.config = config();
		// ===================================================== 测试
		//LS.clear();
	}
}