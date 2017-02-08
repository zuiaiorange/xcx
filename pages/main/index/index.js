//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    list:[],
    pageCode:"0",
     imgUrls: [
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 1500,
    duration: 1000,
    circular:false,
    toView:"top"
  },
  //事件处理函数
 scroll:function(e){
 },
 scrollower:function(){
   //接口暂时没有数据pageCode先不递增；
  // var pageCode =  +this.data.pageCode + 1;
  var pageCode =  +this.data.pageCode;
   this.setData({
     "pageCode": pageCode
   })
   this.render();
 },
  onLoad: function () {
    var that = this;
    that.render();
    that.getBanner();
  },
  getBanner:function(){
    var that = this;
    wx.request({
      url: 'http://datainfo.duapp.com/shopdata/getBanner.php',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
         if (res.data == "callback(0)") return;
        
          var index = res.data.indexOf('[');
          var strData = JSON.parse(res.data.substring(index,res.data.length-1));
         
          [].forEach.call(strData,function(item){
           			item.goodsBenUrl = JSON.parse(item.goodsBenUrl);
           			         			
          })
           that.setData({
            "imgUrls":strData
          })
           
      },
      fail: function() {
        // fail
      }
    })
  },
  render:function(){
    var that = this;
     wx.request({
      url: 'http://datainfo.duapp.com/shopdata/getGoods.php',
      data: {pageCode:that.data.pageCode},
      method: 'GET', 
      success: function(res){
        // success
        if (res.data == "callback(0)") return;
          var index = res.data.indexOf('[');
          var strData = JSON.parse(res.data.substring(index,res.data.length-1));
          [].forEach.call(strData,function(item){
            if (item.discount == "0"){
              item.discuntprice = item.price
            } else{
              item.discuntprice = (item.price/item.discount*10).toFixed(2);
              
            }
          })
          var goodList = that.data.list.length == 1 ? strstrData :that.data.list.concat(strData)
          that.setData({
            "list":goodList
          })
          
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  addcar:function(e){
    console.log(e)
    return false;
  }

})