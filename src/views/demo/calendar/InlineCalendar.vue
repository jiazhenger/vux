<template>
	<div>
		<inline-calendar 
			v-model="calendarA"
			highlight-weekend
			:render-function="buildSlotFn"
		></inline-calendar>
		
		<div v-transfer-dom>
		  	<x-dialog v-model="show" :hide-on-blur="true">
		  		<header>标题</header>
		  		<div class="pop-calendar">
		  			<inline-calendar v-model="calendarB"></inline-calendar>
		  		</div>
		  		<footer>
		  			<p>自定义内容</p>
		  			<p>自定义内容</p>
		  			<p>自定义内容</p></footer>
		  	</x-dialog>
		</div>
		
		<div style="margin:20px"><x-button type="primary" @click.native="show=!show">弹窗</x-button></div>
	</div>
</template>

<script>
	import { InlineCalendar, XDialog, XButton, TransferDom } from 'vux'
	export default {
		name: 'myGroup',
		directives: { TransferDom },
		components: { InlineCalendar, XDialog, XButton },
		data(){
			return {
				calendarA: 'TODAY',
				calendarB: '',
				show:false,
				// 给日期添加 html
				buildSlotFn:(line, index, data) => {
			        return /8/.test(data.date) ? `
				        <div style="height:6px;margin-top:3px;font-size:12px;text-align:center;)">
				        	<span style="display:block;margin:0 auto;width:6px;height:6px;background-color:red;border-radius:50%;"></span>
				        </div>
			        `: '<div style="height:6px;"></div>'
			    }
			}
		},
		methods:{
			log(v){
				if(v==='show'){
					
				}else{
					
				}
			},
			onChange(v){
				console.log(v)
			},
			del(i){
				this.calendarM.splice(i,1);
			}
		}
	}
</script>
<style>
	.vux-x-dialog .weui-dialog{max-width:98%;border-radius:10px;overflow:hidden;padding-bottom:10px;}
	.pop-calendar{padding:5px 10px 0 10px;}
	.weui-dialog header{text-align:center;background:red;line-height:40px;color:#fff;}
	.weui-dialog footer{line-height:200%;text-align:left;margin-top:10px;padding:0 20px;}
</style>
