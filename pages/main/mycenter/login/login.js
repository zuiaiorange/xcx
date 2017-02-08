Page({
	data:{
		list:[
		{
			name:"账号",
			vial:"1",
			id:"0",
			tip:"请输入6-12位字母数字账号",
			typ:"text",
			flag:false

		},{
			name:"密码",
			vial:"1",
			id:"1",
			tip:"请输入8-16位字母数字密码",
			typ:"password",
			flag:false
		}],
		userID:"",
		passWord:"",
		login:{
			id : "0",
			text:"登录",
			status:"login",
			zero:"用户名不存在",
			twoTip:"用户名密码不符",
			sucText:"登录成功"

		},
		userValidata:"^[0-9a-zA-Z]{6,12}$",
		passWordValidata:"^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$"
	},
	onLoad :function(option){
		if (option.id == "login"){
			this.setData({
				"login":{id:"0",text:"登录",status:"login",zero:"用户名不存在",twoTip:"用户名密码不符",sucText:"登录成功"}
			})
		}else{
			this.setData({
				"login":{id:"1",text:"注册",status:"register",zero:"用户名重名",twoTip:"数据库报错",sucText:"注册成功"}
			})
		}
	},
	loginEvent:function(){
		var that = this;
		if (!new RegExp(that.data.userValidata).test(that.data.userID)){
			this.setData({
				"list[0].flag":true
			})
			return;
		} else if (!new RegExp(that.data.passWordValidata).test(that.data.passWord)){
			this.setData({
				"list[1].flag":true
			})
			return;
		}
		//登录或者注册
		that.loginOrResiger();
	},
	bindInput:function(e){
		var index = e.target.id;
		if (index == "0"){
			this.setData({
			userID:e.detail.value
			})
		} else {
			this.setData({
				passWord:e.detail.value
			})
		}
		this.setData({
			"list[0].flag":false,
			"list[1].flag":false
		})
		
	},
	loginOrResiger:function(){
		var that = this;
		wx.request({
			url: 'https://datainfo.duapp.com/shopdata/userinfo.php',
			data: {status:that.data.login.status,userID: that.data.userID,password:that.data.passWord},
			method: 'GET',
			success: function(res){
				switch(res.data){
					case 0:
						wx.showToast({
							  title: that.data.login.zero,
							  icon: 'loading',
							  duration: 1000
						})
						break;
					case 2:
						wx.showToast({
							  title: that.data.login.twoTip,
							  icon: 'loading',
							  duration: 1000
						})
						break;
					default:
					//存储缓存并进行跳转
						
						wx.showToast({
							title:that.data.login.sucText,
							icon:"success",
							duration:500,
							mask:true,
							success:function(){
								wx.setStorageSync(
									"userMessage",{'userID':that.data.userID,'passWord':that.data.passWord}	
								);
								if (res.data.userimg_url){
									wx.setStorageSync(
									"userimg_url",res.data.userimg_url
									);
								}
								// wx.switchTab({
								// 	url:"../mycenter"
								// })
								wx.navigateBack({
  delta: 1
})
							}
						})
					break;
					
				}
				
			},
			fail: function() {
				alert("网络繁忙；请稍后重试")
			}
		})

	}
})