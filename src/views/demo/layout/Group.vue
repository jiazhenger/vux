<template>
	<div>
		<group title="group 标题">
	   		<cell title="cell 列表" ></cell>
	   		<cell title="cell 列表" >vux</cell>
	   		<cell is-link>
	   			<div slot="title">
	   				<span style="vertical-align:middle;">消息</span>
	   				<badge text="1"></badge>
	   			</div>
	   		</cell>
		</group>
	</div>
</template>

<script>
	import { Group, Cell, Badge } from 'vux'
	export default {
		name: 'myGroup',
		components: { Group, Cell, Badge }
	}
</script>
