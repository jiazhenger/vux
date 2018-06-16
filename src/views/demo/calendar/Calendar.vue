<template>
	<div>
		<group title="一般日期设置">
      		<calendar v-model="calendar1" title="通用日期"  placeholder="选择日期" @on-show="log('show')" @on-hide="log('hide')" @on-change="onChange"></calendar>
      		<calendar :readonly="true" v-model="calendar2" title="设置只读日期 :readonly='true'" @change="onChange"></calendar>
      		<calendar v-model="calendarD" title="设置默认选择时间 model:'2018-12-12'"></calendar>
      		<calendar v-model="calendarH" title="日期头部设置 show-popup-header popup-header-title=''" show-popup-header popup-header-title="选择乘车日期"></calendar>
      		<calendar v-model="calendarS" title="隐藏年月 hide-header" hide-header></calendar>
      		<calendar v-model="calendarS" title="设置周末高亮 highlight-weekend" highlight-weekend></calendar>
      		<calendar v-model="calendarS" title="隐藏周末提示 hide-week-list" hide-week-list></calendar>
      		<calendar v-model="calendarS" title="自定义周末提示 :weeksList=['周一']" :weeksList="['周一','周二','周三','周四','周五','周六','周天']"></calendar>
      		<calendar v-model="calendarS" title="显示六行 return-six-rows" return-six-rows></calendar>
      		<calendar v-model="calendarS" title="自定义文字替换日期 :replace-text-list={'TODAY':'今'}" :replace-text-list="{'TODAY':'今','2018-06-18':'抢'}"></calendar>
      		<calendar v-model="calendarS" title="自定义添加html元素:render-function='buildSlotFn'" :render-function="buildSlotFn"></calendar>
		</group>
		
		<group title="条件日期选择">
      		<calendar v-model="calendarNo" title="过去不能选 disable-past" disable-past></calendar>
      		<calendar v-model="calendarNo" title="未来不能选 disable-future" disable-future></calendar>
      		<calendar v-model="calendarNo" title="周末不能选 disable-weekend" disable-weekend></calendar>
      		<calendar v-model="calendarNo" title="限制日期段 start-date='2017-12-12' end-date='2019-12-12'" start-date="2017-12-12" end-date="2019-12-12"></calendar>
      		<calendar v-model="calendarS" title="禁用某些日期 :disable-date-function='disableDateFunction'" :disable-date-function="disableDateFunction"></calendar>
		</group>
		
		<group title="选择多个日期">
			<calendar v-model="calendarN" title="默认选择多个 model:['2015-12-12','2015-12-13']" popup-header-title="选择您上班的时间"></calendar>
			<calendar v-model="calendarN" title="自定义默认选择文字" :replace-text-list="replaceTextList" popup-header-title="选择您上班的时间"></calendar>
      		<calendar v-model="calendarK" title="选择多个日期 model:[]" placeholder="选择您上班的时间" popup-header-title="选择您上班的时间"></calendar>
		</group>
		
		<group title="自定义格式化表单值">
      		<calendar v-model="calendarM" :display-format="displayFormat" title="计算选了几天 :display-format='displayFormat'" placeholder="选择时间" popup-header-title="选择时间"></calendar>
			<cell-box align-items="flex-start" v-if="calendarM.length>0">
		        <div>
					<span style="color:blueviolet;font-size:13px">选择的时间：</span><badge v-for="(day,key) in calendarM" :text="day" :key="day" @click.native="del(key)" style="margin-right:10px;"></badge>
		        </div>
		    </cell-box>
		</group>
	</div>
</template>

<script>
	import { Group, Cell, Calendar, CellBox, Badge } from 'vux'
	export default {
		name: 'myGroup',
		components: { Group, Cell, Calendar, CellBox, Badge },
		data(){
			return {
				calendar1: '',				// 默认无选择
				calendar2: 'TODAY',			// 默认选择今天
				calendarS: 'TODAY',
				calendarH: 'TODAY',
				calendarD: '2030-05-20',	// 自定义默认时间
				calendarNo: 'TODAY',
				calendarK: [],
				calendarM: [],
				calendarN: ['2018-09-09','2018-09-08','2018-09-09','2018-09-10','2018-09-11'],	// 默认选择多个
				replaceTextList:{},
				// 格式化 value
				displayFormat: (value, type)=>{
					if(type === 'string') return value;
					return value.length ? (value.length + ' days') : 0
				},
				// 禁用某些日期
				disableDateFunction:(date)=>{
					if (date.formatedDate === '2018-06-14' || date.formatedDate === '2018-06-15') {
						return true
					}
				},
				// 给日期添加 html
				buildSlotFn:(line, index, data) => {
			        return /8/.test(data.date) ? `
				        <div style="font-size:12px;text-align:center;)">
				        	<span style="display:block;margin:0 auto;width:18px;height:18px;line-height:18px;color:#fff;background-color:red;border-radius:50%;">抢</span>
				        </div>
			        `: '<div style="height:18px;"></div>'
			    }
			}
		},
		created(){
			this.calendarN.forEach(v=>{
				this.replaceTextList[v] = '抢'
			})
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
