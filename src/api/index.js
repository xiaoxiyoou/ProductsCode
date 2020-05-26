import ajax from './ajax'

// 1. 定义基础路径

const BASE_URL = 'http://product.jzb768.com/'


// 登录
export const getOpenId = (params) => ajax('http://b.fuyulove.com/Action/CacheData.aspx?action=jssdk',params)
// 获取sdkdata
export const getSdkData = (params) => ajax(BASE_URL + '/FuneralService/JsSdk',params)
// 分类
export const cateList = (params) => ajax(BASE_URL + 'api/goods/cate',params)
// 产品列表
export const goodsList = (params) => ajax(BASE_URL + 'api/items/list',params)
// 产品详情
export const deatailList = (params) => ajax(BASE_URL + 'api/items/detail',params)
