/*
	data = {
		username : '',
		password : ''
	}
	rules = {
		username : {
			required : '用户名不能为空'
		},
		password : {
			required : '密码不能为空'
		}
	}
*/
export default{
	install(Vue){
		let type = (obj, condition) => {
			if (!condition) {
				return {
					msg: obj.constructor === String ? obj : obj.msg,
					valid: false
				}
			} else {
				return { valid: true, msg: 'ok'}
			}
		}
		
		const validator = (data, rule)=>{
			let result = {}
			let stack = {
				msg: 'ok',
				valid: true
			}
			try {
				Object.keys(rule).map(v => {
					let form = data[v];
					let rules = rule[v];
					result[v] = true;
					if (form == undefined || Object.keys(rules).length == 0) {
						return;
					}
					Object.keys(rules).map((name, i) => {
						let last = rules[name];
						//if (name === 'required') { stack = type(last, (form != null && form != '' && form != undefined)) }
						//if (name === 'min') { stack = type(last, (form.length > rules[name].len)); }
						// 表单验证处
						switch (name) {
							// 非空
							case 'required':
								stack = type(last, (form != null && form != '' && form != undefined)); break;
							// 最小长度
							case 'min':
								stack = type(last, (form.length > rules[name].len)); break;
							// 最大长度
							case 'max':
								stack = type(last, (form.length < rules[name].len)); break;
							// 不能有空格
							case 'nospace':
								stack = type(last, (/^[\S]+$/.test(form))); break;
							// 不能有非法字符
							case 'illegal':
							stack = type(last, !(/[#\$%\^`{}\*\\@\[&\]\/\=\-?\s\!]+/g.test(form))); break;
							// 用户名验证
							case 'username':
								stack = type(last, (/^[a-zA-Z]{1}([a-zA-Z0-9]|[._+]){2,17}$/.test(form))); break;
							// 手机号验证
							case 'telphone':
								stack = type(last, (/^1[3|4|5|8][0-9]\d{4,8}$/.test(form))); break;  
							// 密码验证
							case 'password':
								stack = type(last, (/^[a-zA-Z]\w{5,17}$/.test(form))); break;
							default:
							    stack = {
									msg: '插件中暂无此方法',
									valid: false
								};
							break;
						}
						
						if (Object.keys(rule[v]).length - 1 === i && stack.valid) {                            // 验证完一个
							result[v] = false;
						}
						
						if (!stack.valid) { foreachs.break = new Error(); }		                // 随便犯一个错，但不能是语法错误，中断循环
					})
				})
			} catch (e) {
				// console.log(e.message); // 只会输出提示，不会有其它多余的信息
			}
			stack.result = result;
			return stack;
		}
		// 需要声明三个变量：{ model:{}, valid:{}, errmsg:''}
		Vue.prototype.$validator = ($this,rules) => {
			let dator = validator($this.model,rules);
		
			$this.valid = dator.result;
			
			if (!dator.valid) {
				$this.errmsg = dator.msg;
				return false;
			}
			return true;
		}
	}
}