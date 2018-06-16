<template>
	<div>
		<group title="无链接">
			<cell title="无箭头" @click.native="onClick"></cell>
			<cell title="无箭头带值" value="value 值"></cell>
			<cell title="带加载效果" :is-loading="!money" value="value 值"></cell>
			<cell title="禁用带点击效果" disabled>value 值</cell>
			<cell title="有箭头无链接" is-link></cell>
   		</group>
   		
   		<group title="有链接">
	   		<cell title="内链" link="/group">到 /group</cell>
	   		<cell title="外链" link="https://doc.vux.li/zh-CN/"><span style="color:green">vux 官网</span></cell>
   		</group>
   		
   		<group title="伸缩">
	   		<cell 
	   			title="无动画" 
	   			is-link
	   			:border-intent="false"
	   			:arrow-direction="show1 ? 'down' : 'right'"
	   			@click.native="show1=!show1">
	   		</cell>
	   		
	   		<template v-if="show1">
	   			<cell-box :border-intent="false" class="sub-item" is-link>content 001</cell-box>
		        <cell-box class="sub-item" is-link>content 001</cell-box>
		        <cell-box class="sub-item" is-link>content 001</cell-box>
	   		</template>
	   		
	   		<cell 
	   			title="自定义动画" 
	   			is-link
	   			:border-intent="false"
	   			:arrow-direction="show2 ? 'down' : 'up'"
	   			@click.native="show2=!show2">
	   		</cell>
	   		
	   		<div class="slide" :class="{animate:show2}">
	   			css3动画<br/>css3动画<br/>css3动画<br/>css3动画
	   		</div>
   		</group>
   		
   		<group title="flexbox" label-width="200px">
			<cell primary="content" title="default" value="flexbox flexbox flexbox flexbox flexbox flexbox flexbox flexbox flexbox"></cell>
			<cell title="flex-start" align-items="flex-start" value="flexbox flexbox flexbox flexbox flexbox flexbox flexbox flexbox flexbox"></cell>
   		</group>
   		
   		<group title="两排">
			<cell title="一级标题" value="右边内容" inline-desc="二级标题"></cell>
			<cell title="一级标题" inline-desc="二级标题"><span style="color:cornflowerblue">自定义 slot</span></cell>
   		</group>
	</div>
</template>

<script>
	import { Group, Cell, CellBox } from 'vux'
	
	export default {
		name:'myCell',
		components:{ Group, Cell, CellBox },
		data(){
			return{
				money:null,
				show1:false,
				show2:false
			}
		},
		methods:{
			onClick(){
				
			}
		}
	}
</script>
<style scoped>
.slide {
	padding: 0 20px;
	overflow: hidden;
	max-height: 0;
	transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
	max-height: 9999px;
	transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
	transition-delay: 0s;
}
</style>