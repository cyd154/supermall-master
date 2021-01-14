<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default{
    name:"Scrooll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        Type:Boolean,
        default:false
      }
    },
    data(){
      return{
        scroll:null
      }
    },
    mounted(){
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      })
       //监听滚动位置
       this.scroll.on('scroll',(position) => {
         // console.log(position)
         this.$emit('scroll',position)
       })
       //监听上拉事件
       this.scroll.on('pullingUp',() => {
         // console.log('上拉')
         this.$emit('pullingUp')
       })
    },

  }
</script>

<style scoped>
</style>
