<template>
	<tab-bar>
		<tab-bar-item path="/home" activeColor="#d81e06">
			<img slot="item-icon" src="~assets/img/tabbar/sy.png" />
			<img slot="item-icon-active" src="~assets/img/tabbar/sy2.png" />
			<div slot="item-text">首页</div>
		</tab-bar-item>
		<tab-bar-item path="/category" activeColor="#d81e06">
			<img slot="item-icon" src="~assets/img/tabbar/fl.png" />
			<img slot="item-icon-active" src="~assets/img/tabbar/fl2.png" />
			<div slot="item-text">分类</div>
		</tab-bar-item>
		<tab-bar-item path="/cart" activeColor="#d81e06">
			<img slot="item-icon" src="~assets/img/tabbar/gwc.png" />
			<img slot="item-icon-active" src="~assets/img/tabbar/gwc2.png" />
			<div slot="item-text">购物车</div>
		</tab-bar-item>
		<tab-bar-item path="/profile" activeColor="#d81e06">
			<img slot="item-icon" src="~assets/img/tabbar/wd.png" />
			<img slot="item-icon-active" src="~assets/img/tabbar/wd2.png" />
			<div slot="item-text">我的</div>
		</tab-bar-item>
	</tab-bar>
</template>

<script>
	import TabBar from 'components/common/tabbar/TabBar'
	import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default{
    name:"MainTabBar",
		components:{
			TabBar,
			TabBarItem
		}
  }
</script>

<style scoped>
</style>
