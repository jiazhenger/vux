/* ====================================== 全局配置  ====================================== */
window.Config = {
	api : 'http://10.13.31.112:8181/b2c1919/',
//	api : 'http://10.1.22.27:8080/',
	init : 'sys/init.do'
}
/* ====================================== 全局方法  ====================================== */
window.F = {
	// ========================================================================  判断数据类型
	// 判断数据是否是对象 {}
	isObject(obj){
		return {}.toString.call(obj) == '[object Object]';
	},
	// 判断数据是否是对象{}，且对象长度 >0
	hasObject(obj){
		return this.isObject(obj) && Object.keys(obj).length > 0;
	},
	// 判断数据是否是函数 function
	isFunction(obj){
		return {}.toString.call(obj) === '[object Function]';
	},
	// 判断数据是否是数组 []
	isArray(obj){
		return {}.toString.call(obj) === '[object Array]';
	},
	// 判断数据是否是数级 []，且长度>0
	hasArray(obj){
		return this.isArray(obj) && obj.length > 0;
	},
	// 判断数据是否是字符串
	isString(obj){
		return {}.toString.call(obj) === '[object String]';
	},
	// 判断数据是否是数字
	isNumber(obj){
		return {}.toString.call(obj) === '[object Number]';
	},
	// 判断数据是否有效
	isValid(obj){
		return obj != undefined && obj !='' && obj != null && obj != NaN;
	},
	// 判断数据的有效性
	isData(obj){
		return this.hasArray(obj) || this.hasObject(obj) || this.isValid(obj);
	},
	// ======================================================================== 登录返回跳转到来时路由
	saveReturnPage(_this){
		let retunLink = LS.get('returnLink');
		if(returnLink){
			_this.$router.push(returnLink);
		}else{
			_this.$router.back();
		}
	}
}
/* ====================================== localStorage 存储  ====================================== */
window.LS = {
	// ====================================== 设置存储
	set(key,value){
		let v = this.get(key);
		let mv = value;
		
		// 如果 v 存在，先取再存
		if(v){
			if(F.isObject(v)){ // 如果是对象，则合并对象
				mv = Object.assign({},v,mv);
			}else if(F.isArray(v)){
				v.push(mv);
				mv = v;
			}else{
				mv = value;
			}
		}
		// 如果 v 不存在，直接存
		if(F.isObject(mv) || F.isArray(mv)){
			mv = JSON.stringify(mv);
		}
		localStorage.setItem(key,mv);
	},
	// ====================================== 获取存储
	get(key){
		let k = localStorage.getItem(key);
		if(F.isValid(k)){
			if( (k.substr(0,1) === '{' && k.substr(-1,1)==='}') || (k.substr(0,1) === '[' && k.substr(-1,1)===']')){
				return JSON.parse(k);
			}else{
				return k
			}
		}else{
			return false
		}
	},
	// 输出全部信息
	output(){
		console.log(localStorage)
	},
	// ====================================== 列出指定 key
	remove(key){
		if(F.hasArray(key)){
			key.map((v,i)=>{
				localStorage.removeItem(v);
			})
		}else{
			localStorage.removeItem(key);
		}
	},
	// ====================================== 清除全部
	clear(){
		localStorage.clear()
	}
}
/* ====================================== sessionStorage 存储  ====================================== */
window.SS = {
	// ====================================== 设置存储
	set(key,value){
		let v = this.get(key);
		let mv = value;
		
		// 如果 v 存在，先取再存
		if(v){
			if(F.isObject(v)){ // 如果是对象，则合并对象
				mv = Object.assign({},v,mv);
			}else if(F.isArray(v)){
				v.push(mv);
				mv = v;
			}else{
				mv = value;
			}
		}
		// 如果 v 不存在，直接存
		if(F.isObject(mv) || F.isArray(mv)){
			mv = JSON.stringify(mv);
		}
		sessionStorage.setItem(key,mv);
	},
	// ====================================== 获取存储
	get(key){
		let k = sessionStorage.getItem(key);
		if(F.isValid(k)){
			if( (k.substr(0,1) === '{' && k.substr(-1,1)==='}') || (k.substr(0,1) === '[' && k.substr(-1,1)===']')){
				return JSON.parse(k);
			}else{
				return k
			}
		}else{
			return false
		}
	},
	// 输出全部信息
	output(){
		console.log(sessionStorage)
	},
	// ====================================== 列出指定 key
	remove(key){
		if(F.hasArray(key)){
			key.map((v,i)=>{
				sessionStorage.removeItem(v);
			})
		}else{
			sessionStorage.removeItem(key);
		}
	},
	// ====================================== 清除全部
	clear(){
		sessionStorage.clear()
	}
}