<template>
	<div id="home">
    <nav-bar class="home-nav"><div slot="center">购物</div></nav-bar>
    <tab-control
    @tabClick="tabClick"
    :title="['流行','新款','精选']"
    ref="tabControl1" class="tab-control" v-show="isTabFixed"
    />
      <scroll class="content"
        ref="scroll"
        :probe-type="3"
        @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp="loadMore"
        >
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommends="recommends"/>
        <feature-view />
        <tab-control
        @tabClick="tabClick"
        :title="['流行','新款','精选']"
        ref="tabControl2"
        />
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scrooll.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'
  import {getHomeMultidata} from 'network/home'
  import {getHomeGoods} from 'network/home'
  export default{
    name:"Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page: 0, list:[]},
          'new':{page: 0, list:[]},
          'sell':{page: 0, list:[]},
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop: 0,
        isTabFixed:false,
        saveY:0
      }
    },
    methods:{
      //时间监听相关方法
      tabClick(index){
        switch(index){
          case 0:
          this.currentType = 'pop'
          break
          case 1:
          this.currentType = 'new'
          break
          case 2:
          this.currentType = 'sell'
          break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      //网络请求相关方法
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.scroll.finishPullUp()
        })
      },
      backClick(){
        this.$refs.scroll.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        //判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1300
        //决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)

        this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.scroll.refresh()
      this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y
    }
  }
</script>

<style scoped>
  #home{
    /* margin-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background: #d81e06;
    color: #fff;
  }
  .content{
    /* height: calc(100% - 93px); */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .tab-control{
    position: relative;
    z-index: 2;
  }
</style>
