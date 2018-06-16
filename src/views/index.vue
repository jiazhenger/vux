<template>
	<div>
		<group title="基础布局">
			<cell title="Group" link="/group">分组</cell>
			<cell title="Cell" link="/cell">列表</cell>
    	</group>
    	<group title="日期插件">
			<cell title="Calendar" link="/calendar"></cell>
			<cell title="InlineCalendar" link="/inline-calendar"></cell>
    	</group>
	</div>
</template>

<script>
	import { Group, Cell } from 'vux'
	export default {
		name: 'index',
		components: { Group, Cell }
	}
</script>
