Page({
	data:{
		goodsID:"",
		detailList:{
			price:100,
			discount:"1",
			buynumber:"100"

		},
		footerData:[{
			text:"介绍",
			active: 1
		},{
			text:"详情",
			active: 0 
		},{
			text:"实拍",
			active: 0
		}],
		indicatorDots: true,
		autoplay: true,
		interval: 1500,
		duration: 1000,
		circular:false
	},
	onLoad:function(option){

    	this.setData({
    		"goodsID":option.goodsID
    	})
    	this.render();
 	},
	tabChang:function(e){
		var that = this;
		var index = e.target.dataset.key;
		[].forEach.call(that.data.footerData,function(item){
			item.active = 0;
			}
		)
		that.data.footerData[index].active =1;
		that.setData({
			"footerData":that.data.footerData
		})
		console.log(that.data.footerData)

	},
	
 	render:function(){
 		var that = this;
 		wx.request({
 			url:"http://datainfo.duapp.com/shopdata/getGoods.php",
 			data:{goodsID:that.data.goodsID},
 			method: 'GET', 
 			success:function(res){
 				if (res.data == "callback(0)") return;
 				
 				var index = res.data.indexOf('[');
           		var strData = JSON.parse(res.data.substring(index,res.data.length-1));
           		[].forEach.call(strData,function(item){
           			item.goodsBenUrl = JSON.parse(item.goodsBenUrl);
           			item.imgsUrl = JSON.parse(item.imgsUrl); 
           			
           		})
           		strData = strData[0];
           		that.setData({
           			"detailList":strData
           		})
           		console.log(strData)

 			},
 			fail:function(){

 			}
 		})
 	}   
})