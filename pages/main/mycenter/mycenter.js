Page({
	data:{
		list:[
			{
				id:"1",
				class: "myorder",
				text: "我的购物车",
				id:"a"
			},
			{
				id:"2",
				class: "myhistory",
				text: "我的浏览记录",
				id:"b"
			},
			{
				id:"3",
				class: "mycloect",
				text: "我的收藏",
				id:"c"
			},
		],
		userMessage:"",
		userID:"未知",
		btnText:[{
			text:"登录",
			id:"0",
			className:"login"
		},{
			text:"注册",
			id:"1",
			className:"resiger"
		}],
		noLogin:true,
		userimg_url:'http://datainfo.duapp.com/shopdata/userimgs/userimg.jpg'	
	},
	onReady:function(){
	},
	onShow:function(){
		if ( !!wx.getStorageSync('userMessage')){
			this.setData({
				"userID":wx.getStorageSync('userMessage').userID,
				"userMessage":wx.getStorageSync('userMessage'),
				"noLogin":false,
				"userimg_url":wx.getStorageSync('userimg_url')
			})
		}
	},
	onLoad:function(){
		
	},
	loginOrResiger:function(e){		
		wx.navigateTo({
			url:"login/login?id=" + e.target.dataset.param
		})
	}
	,
	urlTo:function(e){
		var id = e.currentTarget.id;
		wx.navigateTo({
			url:"../../welcome/welcome",
			success:function(e){
			},
			fail:function(e){
			}
		})
	}
})