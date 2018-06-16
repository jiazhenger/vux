<template>
	<div>
		<transition data-type=""@after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')" :name="viewTransition" :css="!!direction">
			<router-view class="router-view"></router-view>
        </transition>
        <div v-transfer-dom>
			<loading v-model="$store.state.my.loading" :text="$store.state.my.loadingText"></loading>
		</div>
	</div>
</template>

<script>
	import { TransferDom, Loading } from 'vux'
	import { mapState } from 'vuex'
	export default {
		name: 'app',
		directives: { TransferDom },
		components: { Loading },
		created(){
			this.$bootstrap();
		},
		computed: {
			...mapState({
      			direction: state => state.vux.direction
    		}),
			viewTransition () {
				if (!this.direction) return ''
				return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
		    }
		},
		data(){
			return {
				loading:false
			}
		}
	}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
// 路由动画一
html,body{height:100%;width:100%;overflow-x:hidden;-webkit-overflow-scrolling: touch;}
.router-view{width:100%;top:0;}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active{will-change: transform;transition:all 500ms;height:100%;top:0;position:absolute;backface-visibility:hidden;perspective:1000;}
.vux-pop-out-enter {opacity: 0;transform: translate3d(-100%, 0, 0);}
.vux-pop-out-leave-active {opacity: 0;transform: translate3d(100%, 0, 0);}
.vux-pop-in-enter{opacity:0;transform:translate3d(100%, 0, 0);}
.vux-pop-in-leave-active {opacity:0;transform:translate3d(-100%, 0, 0);}

.router-view .weui-cells__title{color:red}
</style>
