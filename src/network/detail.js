import {request} from './request'
//请求详情
export function  getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}
//请求商品基本信息
export class Goods {
  constructor(itemInfo, columns, shopInfo) {
    this.title = itemInfo.title
    this.Price = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.lowNowPrice = itemInfo.lowNowPrice
    this.discountDesc = itemInfo.discountDesc
    this.columns = columns
    this.services = shopInfo.services
  }
}
//请求店铺信息
export class Shop {
	constructor(shopInfo) {
	  this.shopLogo = shopInfo.shopLogo;
		this.name = shopInfo.name;
		this.score = shopInfo.score;
		this.cSells = shopInfo.cSells;
		this.cGoods = shopInfo.cGoods;
	}
}
//请求参数信息
export class Param {
	constructor(info, rule) {
    this.image = info.images ? info.images[0] : ''
	  this.info = info.set;
		this.rule = rule.tables;
	}
}
//请求推荐信息
export function getRecommend(){
	return request({
		url:'/recommend'
	})
}
