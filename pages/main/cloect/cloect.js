//logs.js
Page({
	data:{
		list:"",
		empty:true
	},
	onLoad:function(){
		var that =this;
		if (!wx.getStorageSync("userMessage"))  return;
		wx.request({
			url:"http://datainfo.duapp.com/shopdata/getCar.php",
			data:{userID:wx.getStorageSync("userMessage").userID},
			dataType:"JSONP",
			success:function(res){
				if (res.data == "callback(0)") return;
				that.render(res)
			}
		})
	},
	goshop:function(){
		wx.switchTab({
		  url: '../index/index',
		  success: function(res){
			// success
			console.log(1)
		  },
		  fail: function() {
			// fail
			console.log(2)
		  },
		  complete: function() {
			// complete
		  }
		})
	},
	render:function(res){

	}
})
