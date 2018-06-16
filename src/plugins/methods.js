/* ====================================== 方法插件  ====================================== */
export default{
	install(Vue){
		// ===================================================== 关闭启动动画
		Vue.prototype.$bootstrap = (delay) => {
			const body = document.querySelector('body');
			body.style.overflow = 'hidden';
		    setTimeout(()=>{
		    	let preloader = document.querySelector('.preloader');
				if (!preloader) return;
				preloader.className += ' preloader-hidden-add preloader-hidden-add-active';
				preloader.addEventListener('transitionend', function (){	// 监听动画是否结束
					preloader.className = 'preloader-hidden';
				});
		    	body.style.overflow = '';
		    },delay || 1000)
		}
		// ===================================================== 判断数据有效性
		Vue.prototype.$isData = (v)=>{
			return F.isData(v);
		}
	}
}