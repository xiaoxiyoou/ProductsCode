<template>
  <div class="container" v-if="show" v-wechat-title="title">
    <van-swipe class="banner" :autoplay="3000" indicator-color="#b93662">
      <van-swipe-item v-for="(image, index) in imglist" :key="index">
        <img :src="image" v-if="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="toptitle">{{goodDetail.title}}</div>
    <div class="des">{{goodDetail.describe}}</div>
    <div class="valueColum row  a-c j-b" ref="top">
      <div class="valueNum"><span class="price">￥</span>{{goodDetail.price}}</div>
      <div class="row a-c">
        <img class="share" src="./share.png" alt="" @click="maskShow(true)">
      </div>
    </div>
    <div class="bar"></div>
    <div class="searchtab row j-b a-c" :class="searchBarFixed == true ? 'isFixed' :''">
      <div v-for="(item,index) in items" :class="index==indexdefault?'hoverItem':''" :key="index" @click="switchItem(item,index)">{{item.MemorialTemplateTitle}}</div>
    </div>
    <div id="searchBar"></div>
    <!-- 视频 -->
    <div class="videoCon row j-c a-c" v-if="video">
      <video id="video" :src="video" webkit-playsinline="true" x-webkit-airplay="true" playsinline="true" x5-video-orientation="h5" x5-video-player-fullscreen="true" x5-playsinline preload="auto" controlslist="nodownload" style="object-fit: fill" controls="false" poster="./cp022.jpg"></video>
    </div>
    <!-- 音频 -->
    <div class="audioCon" v-if="audio">
      <div class="text">语音介绍</div>
      <audio id="audio" :src="audio" controls="controls"></audio>
    </div>
    <!-- 详情 -->
    <div class="introText" v-html="contents"></div>
    <!-- 寓意 -->
    <img class="" src="./cp025.png" alt="" v-if="yuyi.length">
    <div style="position:relative">
      <swiper :options="swiperOption" class="swiper-wrapper" v-if="yuyi.length">
        <div class="swiper-slide" v-for="(item,index) in yuyi" :key="index"> <img class="swiper-picture" :src="item.imgurl" alt="" />
        </div>
      </swiper>
      <div v-if="yuyi.length" class="swiper-button-next leftOne" slot="button-next"></div>
      <div v-if="yuyi.length" class="swiper-button-prev rightOne" slot="button-prev"></div>
    </div>
    <!-- 资质 -->
    <img class="" src="./cp026.png" alt="" v-if="length">
    <div style="position:relative">
      <swiper :options="swiperOptionTwo" class="swiper-wrapperTwo" v-if="length">
        <div class="swiper-slide" v-for="(el,eq) in length" :key="eq">
          <img v-for="(item,index) in jiance[eq]" :key="index" class="swiper2-img white1" :src="item.imgurl" />
        </div>

      </swiper>
      <div v-if="length" class="swiper-button-prev leftTwo" slot="button-prev"></div>
      <div v-if="length" class="swiper-button-next rightTwo" slot="button-next"></div>
    </div>
    <!-- 外观专利 -->
    <div class="mlook-part" v-if="zhuanli">
      <img src="./cp049.jpg" alt="" class="mlook-title">
      <div class="mlook-list row j-b f-w">
        <div class="mlook-box" v-for="(item,index) in zhuanli" :key="index"><img :src="item.imgurl" alt="" @click="previewImage($event)"></div>
      </div>
    </div>
    <!-- 分享 -->
    <div class="mask" v-if="mask" @click="maskShow(false)"></div>
    <img v-if="mask" class="maskImg" @click="maskShow(false)" src="./shareTip.png" alt="">
    <!-- 规格 -->
    <div ref="mid"  :class="searchBarFixed2 == true ? 'ismargin' :''"></div>
    <div class="bar" v-show="goodDetail.specific"></div>
    <div class="introTitleCon  row a-c van-hairline--bottom" v-if="goodDetail.specific">
      <img class="introTitle" src="./specs.png" alt="">
    </div>
    <img class="" :src="goodDetail.specific" alt="" style="padding-bottom:20px;padding-top:20px" v-if="goodDetail.specific">
    <!-- 相关推荐 -->
    <div ref="introTitle" :class="searchBarFixed3 == true ? 'ismargin' :''"></div>
    <div class="bar" v-if="newList.length"></div>
    <div class="introTitleCon row a-c" v-show="newList.length">
      <img class="introTitle" src="./look.png" alt="">
    </div>
    <div class="proWrapper row f-w j-b van-hairline--top" v-if="newList.length">
      <div class="item" v-for="(item,index) in newList" :key="index" @click="Detail(item.code)">
        <img class="proImg" v-if="item.imgurl" :src="item.imgurl" alt="">
        <img class="proImg" v-else src="./../../assets/img/noMsg.png" alt="">
        <div class="title">{{item.title}}</div>
        <div class="des" v-if="item.describe">{{item.describe}}</div>
        <div class="des" v-else>{{item.title}}</div>
        <div class="value"><span class="price">￥</span>{{item.price}}</div>
      </div>
    </div>
    <div class="btmBar" v-if="newList.length"></div>
    <div class="buy row a-c j-c" v-if="goodDetail.buy_method != 0" @click="buyDetail">立即购买</div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Toast } from 'vant';
import { deatailList, goodsList } from 'api/index'
export default {
  data() {
    return {
      searchBarFixed3: false,
      searchBarFixed2: false,
      searchBarFixed: false,
      mask: false,
      show: false,
      title: '家族宝',
      length: 0,
      audio: '',
      jiance: '',
      zhuanli: '',
      contents: '',
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true // 允许点击小圆点跳转
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false // 手动切换之后继续自动轮播
        },
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionTwo: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true // 允许点击小圆点跳转
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false // 手动切换之后继续自动轮播
        },
        // loop: true,
        slidesPerView: 2,
        slidesPerColumn: 1,
        // spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      selectedId: 0, // 默认选中分类
      items: [
        {
          MemorialTemplateCateId: 0,
          MemorialTemplateTitle: "商品详情"
        },
        {
          MemorialTemplateCateId: 1,
          MemorialTemplateTitle: "用品规格"
        },
        {
          MemorialTemplateCateId: 2,
          MemorialTemplateTitle: "相关推荐"
        },
      ], // 分类数组列表
      options: { // lytab 参数
        activeColor: '#b93662',
        labelKey: 'MemorialTemplateTitle'
      },
      goodDetail: [],
      imglist: [],
      newList: [],
      yuyi: [],
      id: '',
      indexdefault: 0

    }
  },
  created() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true
    })
  },
  mounted() {

    this.id = this.getPath()
    this._deatailList(this.id)
    // let catId = localStorage.getItem('catId')
    document.body.scrollTop = document.documentElement.scrollTop = 0
    console.log('this.id ', this.id)
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('scroll', this.handleScroll2)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    window.addEventListener('scroll', this.handleScroll2)
  },
  destroy() {
    window.removeEventListener('scroll', this.handleScroll)
    window.addEventListener('scroll', this.handleScroll2)
  },
  methods: {
    buyDetail() {
      window.location.href = this.goodDetail.buy_url
    },
    // 滑动定位
    handleScroll() {
      this.$nextTick(() => {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var offsetTop = document.querySelector('#searchBar').offsetTop - 90
        if (scrollTop > offsetTop) {
          this.searchBarFixed = true
        } else {
          this.searchBarFixed = false
        }

      })
    },
    // 滑动定位
    handleScroll2() {
      this.$nextTick(() => {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var offsetTop = this.$refs.mid.offsetTop - 20
        if (scrollTop > offsetTop) {
          this.searchBarFixed2 = true
        } else {
          this.searchBarFixed2 = false
        }

      })
    },
    // 滑动定位
    handleScroll3() {
      this.$nextTick(() => {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var offsetTop = this.$refs.introTitle.offsetTop - 20
        if (scrollTop > offsetTop) {
          this.searchBarFixed3 = true
        } else {
          this.searchBarFixed3 = false
        }

      })
    },
    // 分享显示
    maskShow(flag) {
      this.mask = flag

    },
    getPath() {
      var pathname = window.location.pathname;
      console.log(pathname);
      var params = pathname.split("/");
      console.log(params[params.length - 1]);
      return params[params.length - 1];
    },


    // 切换顶部分类
    switchItem(item, index) {
      // console.log(item)
      this.indexdefault = index
      // 推荐
      if (item.MemorialTemplateCateId == 2 && this.newList.length) {
        this.$refs.introTitle.scrollIntoView({
          behavior: "smooth",
          block: "start"  // 上边框与视窗顶部平齐。默认值
        });
      }
      if (item.MemorialTemplateCateId == 2 && !this.newList.length) {
        Toast('暂无相关推荐')
      }
      // 详情
      if (item.MemorialTemplateCateId == 0) {
        this.$refs.top.scrollIntoView({
          behavior: "smooth",
          block: "start"  // 上边框与视窗顶部平齐。默认值
        });

      }
      // 规格
      if (item.MemorialTemplateCateId == 1 && this.goodDetail.specific) {
        this.$refs.mid.scrollIntoView({
          behavior: "smooth",
          block: "start"  // 上边框与视窗顶部平齐。默认值
        });
      }
      if (item.MemorialTemplateCateId == 1 && !this.goodDetail.specific) {
        Toast('暂无用品规格')
      }
    },
    _deatailList(id) {
      deatailList({
        code: id
      }).then(res => {
        console.log('产品详情', res)
        this.goodDetail = res.data.info
        this.imglist = this.goodDetail.imglist.split("|")
        this.imglist = this.imglist.filter(function (s) {
          return s && s.trim();
        });
        this._goodsList3(this.goodDetail.cat_id, this.id)

        this.contents = this.goodDetail.contents
        if (this.goodDetail.yuyi) {
          this.yuyi = this.goodDetail.yuyi
        }
        if (this.goodDetail.zhuanli) {
          this.zhuanli = this.goodDetail.zhuanli
        }
        if (this.goodDetail.jiance) {

          var result = [];
          for (var i = 0; i < this.goodDetail.jiance.length; i += 2) {
            result.push(this.goodDetail.jiance.slice(i, i + 2));
          }
          this.jiance = result
          this.length = this.jiance.length
          console.log(this.jiance)


        }
        this.show = true
        Toast.clear();
        this.video = this.goodDetail.video
        this.audio = this.goodDetail.audio
      })
    },
    _goodsList3(catid, code) {

      goodsList({
        page: 1,
        size: 4,
        catid: catid,
        goodsid: code
      }).then(res => {
        console.log('推荐', res)
        this.newList = res.data.list


      })
    },
    Detail(id) {

      //  window.location.href ="http://192.168.8.151:8081/dist/" + id +"#/detail"
      window.location.href = "http://product.jzb768.com/item/detail/" + id + "#/detail"
    },
    previewImage(e) {
      var wx = require('weixin-js-sdk')
      var current = e.target.dataset.src;
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: this.imgalist // 需要预览的图片http链接列表
      });
    }



  }
}
</script>

<style scoped lang="stylus">
>>>.ly-tabbar
  height 90px
  width 750px
  box-shadow none !important
  border-bottom 1px solid #f5f5f5
>>>.ly-tab-item
  width 130px
  font-size 28px
  color rgb(102, 102, 102)
>>>.ly-tab-active-bar
  height 0 !important
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  background-color #ffffff
.banner
  width 100%
  height auto
  img
    width 100%
    height 445px
.toptitle
  font-size 32px
  color #111111
  padding 15px 32px
  background-color #ffffff
.des
  color #919191
  font-size 25px
  padding 0 32px
  background-color #ffffff
.valueColum
  background-color #ffffff
  .valueNum
    color #b93662
    font-size 37px
    padding 20px 32px
    .price
      font-size 20px
  .row
    .heart
      width 39px
      height 37px
    .share
      width 106px
      height 44px
      margin-left 30px
  .price
    font-size 20px
.bar
  background-color #f5f5f5
  width 100%
  height 21px
.ismargin
  margin-top 90px
.isFixed
  position fixed
  background-color #ffffff
  top 0
  z-index 999
.intro
  width 100%
  height auto
  vertical-align bottom
  display block
.introText
  width 100%
  >>>p
    margin 0
  >>>img
    max-width 100%
    vertical-align bottom
.searchtab
  height 90px
  padding 0 34px
  width 100%
  font-size 30px
  .hoverItem
    color #b93662
    font-weight 700
.videoCon
  background-image url('./cp021.jpg')
  width 100%
  background-size 100% 100%
  height 450px
  #video
    width 80%
    margin auto
    display block
.audioCon
  background-color #ffffff
  .text
    color #b93662
    padding 20px 30px
  #audio
    margin 10px
    padding-left 30px
.swiper-wrapper
  width 420px
  height 450px
  margin 60px auto
  .swiper-slide
    img
      width 100%
      height 100%
.swiper-wrapperTwo
  margin 60px auto
  width 600px
  .swiper-slide
    // width 277px!important
    text-align center
    img
      width 277px
      height 380px
.mlook-part
  width 100%
  .mlook-title
    width 100%
  .mlook-list
    width 100%
    padding 30px 85px 50px
    .mlook-box
      width 277px
      margin-top 20px
      height 380px
      img
        width 100%
        height 100%
.comment
  width 100%
  height auto
  vertical-align bottom
.introTitleCon
  height 90px
  .introTitle
    display block
    margin 0 auto
    width 200px
.proWrapper
  width 750px
  padding 0 32px
  padding-top 20px
  .item
    box-shadow 1px 1px 10px #eaeaea
    margin-bottom 23px
    width 336px
    border-radius 10px
    background-color #ffffff
    height 100%
    overflow hidden
    .proImg
      width 341px
      height 341px
      border-top-left-radius 10px
      border-top-right-radius 10px
    .title
      color #111111
      font-size 25px
      padding-left 16px
      margin-bottom 15px
      margin-top 15px
      overflow hidden
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 1
      text-overflow ellipsis
    .des
      color #919191
      font-size 22px
      padding-left 16px
      margin-bottom 15px
      overflow hidden
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 1
      text-overflow ellipsis
    .value
      color #b93662
      font-size 33px
      padding-left 16px
      padding-bottom 15px
      .price
        font-size 20px
.btmBar
  width 100%
  height 540px
.buy
  position fixed
  bottom 0
  color #ffffff
  font-size 40px
  background-color #b93662
  width 100%
  height 102px
  z-index 10000
</style>
<style>
body {
  background-color: #f5f5f5;
}
.swiper-button-white {
  outline: none;
}

img {
  max-width: 100%;
  height: auto;
}
.swiper-button-prev {
  left: 50px;
  background-image: url(./grey_left_read_more_icon.png) !important;

  position: absolute;
  z-index: 10;
  cursor: pointer;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  color: #f5f5f5;
  opacity: 1 !important;
  width: 54px !important;
  height: 54px !important;
  top: 49%;
}
.swiper-button-next {
  background-image: url(./grey_right_read_more_icon.png) !important;
  top: 49%;
  position: absolute;
  z-index: 10;
  cursor: pointer;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  color: #f5f5f5;
  opacity: 1 !important;
  width: 54px !important;
  height: 54px !important;
}
.leftOne {
  right: 50px;
}
.rightTwo {
  right: 20px;
}
.leftTwo {
  left: 20px;
}
.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 0;
}
.mask {
  width: 100%;
  height: 100%;
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  opacity: 0.6;
}
.maskImg {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  width: 600px !important;
}
</style>
