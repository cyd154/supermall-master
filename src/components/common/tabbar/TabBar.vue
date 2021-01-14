<template>
	<div id="taba-bar">
		<slot></slot>
	</div>
</template>

<script>
  export default{
    name:"Tabbar"
  }
</script>

<style scoped>
	#taba-bar{
		display: flex;
		background-color: #f3f3f3;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		
	}
	
</style>
