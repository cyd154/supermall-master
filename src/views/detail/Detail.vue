<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommendInfo" ref="recommend"/>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import Scroll from 'components/common/scroll/Scrooll.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'

  import {getDetail, Goods, Shop, Param, getRecommend} from 'network/detail'
  export default{
    name:"Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop
    },
    data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop: {},
        detailInfo:{},
        paramInfo:{},
        commentInfo:[],
        recommendInfo:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
        isShowBackTop:false,
      }
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid
      //根据iid请求数据
      getDetail(this.iid).then(res => {
        //获取顶部的图片轮播数据
        const data = res.result
        this.topImages = data.itemInfo.topImages
        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo)
        //创建店铺信息
        this.shop = new Shop(data.shopInfo)
        //保存商品的详情数据
        this.detailInfo = data.detailInfo
        //获取参数信息
        this.paramInfo = new Param(data.itemParams.info, data.itemParams.rule)
        //获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list
        }

        this.$nextTick(() => {
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 48)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 48)
          this.themeTopYs.push(Number.MAX_VALUE)
          // console.log(this.themeTopYs)
        })
      })

      //请求推荐数据
      getRecommend().then(res => {
        this.recommendInfo = res.data.list
      })


    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
      },
      titleClick(index){
        this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },
      contentScroll(position){
        const positionY = -position.y
        let length = this.themeTopYs.length
        for(let i = 0;i < length - 1; i++){
         if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
           this.currentIndex = i
           this.$refs.nav.currentIndex = this.currentIndex
         }
        }
      },
        // // 0, 7206, 7998, 8183
        // for(let i = 0;i < this.themeTopYs.length; i++){
        //   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i == length -1 && positionY >= this.themeTopYs[i]))){
        //     this.currentIndex = i
        //     console.log(this.currentIndex)
        //     this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }
      backClick(){
        this.$refs.scroll.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        //判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1300
      },
    },

  }
</script>

<style scoped>
  .detail-nav{
    position: relative;
    z-index: 3;
    background-color: #fff;
  }
  #detail{
    position: relative;
    z-index: 3;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 93px);
  }
</style>
