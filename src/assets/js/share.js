import Vue from 'vue'
import $ from 'jquery'

// import { getSdkData  } from 'api/index'
var wx = require('weixin-js-sdk')
export default function wxShare({
  title,
  desc,
} = {}) {
  var data = {
    url: window.location.href,
    t: Math.random()
  };

  var _getWechatSignUrl = 'http://b.fuyulove.com/Action/CacheData.aspx?action=jssdk';
  $.ajax({
    url: _getWechatSignUrl,
    data: data,
    success: function (res) {
      console.log(res)
      config(res.data.data)
    }
  });

  const config = (data) => {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appid, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature, // 必填，签名，见附录1
      jsApiList: [
        'getLocation',
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
        'chooseImage',
        'uploadImage',
        'downloadImage',
        'getLocalImgData'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    wx.ready(() => {
      wx.onMenuShareAppMessage({
        title: title,
        link: window.location.href,
        desc: desc,
        imgUrl: 'http://www.jzb768.com/goods/img/share.jpg'
      })
      wx.onMenuShareTimeline({
        title: title,
        link: window.location.href,
        desc: desc,
        imgUrl: 'http://www.jzb768.com/goods/img/share.jpg'

      })
    })
    wx.error(function () {})
  }


}
// 为Vue的原型对象添加该方法，则所有vue实例都能继承该方法
Vue.prototype.$wxShare = wxShare