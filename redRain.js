	
(function(){

	var pageUtils = function(){
		return {
			time: null,//时间定时器
			rainLen: 0,// 当前红包雨下的时长 秒
			num: 0,
			redRuleId:"",//当前红包雨的id
			rangeType:"",//当前红包雨的页面类型
			win: {
				width: document.body.clientWidth || document.documentElement.clientWidth,
				height: window.screen.availHeight
			},
			divWrapWid:0,//获取容器的当前宽带
			wrapperObj: null,//总容器缓存
			createWinsObj:null,//弹窗容器
			flag: true,
			imgSrc: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABRCAMAAABCH8AbAAAC+lBMVEUAAADxQC/8RzX9STf9STf+RTP9SDb+TTr+SDj/Pyz9RDL+QjDaNyb+Sjj+RjT+Sjj8STf9STf8Sjj/PyywIRLtOSj/PCn/PSr/QS/9STf9STf+RDH/QzH/TTr/Oyj9STf9Szn+RjTrQzH9STfYOCf/PCn/QC39Szn+Sjf+RjT/RTP+RzX/Oyj7PSv/Oyj0Szr/Oyj/PCn3SDb/QS7/Piv9STfWNyb/PSr+QS7DLR75QzHALR3+RTPtPCr+VEL2STf/OyndNifrRDP9STfSNCTbPCrHLR7CKxzCLBz+RzX3PCm4JBXzQS/qPS3wRjTePi3/OyjUOCfONCPxSDb6wxj9STf9Sjj8YVH/zAD9TDr9Szn/Oyj+UkH/Tz38X0/+UT/+VUT9YFD/Tjv/UD79WUj9XU3/TTz/PSr+RzT9XEv/VEL+QjH9V0b8SDb9W0r9WEf/wAD/zwD+RTP+Py79Xk3/V0b/Qi//Tzz/Pyz/3QD8XlL/WEf+SDr/ywD+RDH/VkX/xAH9YlL/2gD/0QD8W1T+V0X/0wH9Qzz/TDnuPi/pOSnyQTH+hh7/3wD8ZE/+VTX6RzX/xwD/wQD8bkn/RjjrPCznMyL/1gP/wgL+ZFX8XVH7X07+SDbpNiX7Sz7xRzb/QDb/RDX9XTLnMB7/jRf/nRX+ow//4gD8aEz9QD74RTT+PTL+ezD+WDD7rCX/rAr/vQf9akn/Wkn8dEX9az/8hDz0TTz/Sjn+Yi//Oif/Zib/qBP/sQv/tgb5WUn/VUP8eUH+Vz39UDb/RjX/7TL/TjL1QzL9kS/7qSj/dR7/lRj/wQX/5gD8V1X6XEz3VEP/UkD9YT/+RTv1RjbwQC/xPSz+SCv9cSj9gSf+Wib+eSX9oCT+fiD8uBz+yw7/mw3/xQr8S1H9V039Ukr5V0b9S0b8VET8ekP/PDr8jjj/NDj+ZTX9Ni38mSz9jCn/rxz/5xr/wwz/2wP/6QD9ckL/UD/9LzD1Py/7oSr+oCH7syD7wRvwTRf0hQv9aqKPAAAAVXRSTlMAAwb8JxH42KydQx4I8iLs5d+RfBgM/fiIe3VbVfvyz8W9s5VybWZjST0zF+zl3NfSybuypG9jTjo0MCgb++zkxLqqn49+b1BBOi0h9t7Kk5BZU1FOPe5lLwAACf9JREFUWMOc1HdME1EcB3BAFKISR/QPV5xxxphoNHHHvTWO16OXK12UCGlpMJrayxltgdIWSjEEFJraBJRhEEFwxK0xQhT3jHsb4x5xm/h77/X1qFVj/N4xkrv79Pt7r21UMDHDl48bNGvQuHHjl42f2617t6huUR2j/iux8V7JCVHpz6vXpxnXT1kzasqouFFxUwcMWDJ95qDZ4+dMnPhv+Pw46XrNXqdTZ1HpBUHQaDRH0tIEQa1W6yEqveW87ryuc9ri0QNmDZoLlf+c6AHOvTWv9jpTdBa1WkgDKTvbqNFgjXIqlcVi0aXo8GnRTx09femEiX+wJuucXq+kIxJ0MhrNRgjTwIMEPUgKgM6Ezp26DmkfHRUTLi1YqHPi67RTttGcjGM2m7FGPMYRT6UjInh9LH369es6NLZtiJozWa/SHdProRJIGEqHA2uMC+8HUUGgY7BlXPyKIDXbJahTbh8TyHBmgNLTU1NT0yG0HnDZzGMgBItwYPH5zaGUmuk+IgivagDKNsKj4BhwUg3gUY1NSz2ITOrxMtY8T6BDTnMbNUeEC7BvZgqtXm1YnQS/sIeDPdaPNqSowMQUfcoILHWcVvzImA0HhkDCDgvz0nGYB8GiPPQxtbrPcExFL3Lv2WU2NjViCSoxKMKDMI9tCZn6yM1jQp9YQrVxB1KTkxtrH+BFok9r6aGVPQN4cJl4pCTx4DQ+aax9LCiiydtqZJFbC3N9MLBG2taJ7EcrsqGhXKNG3bkDprq1cxX7yA2tIY7jIkXm4ZMtIrY0KW3o14Lpsv8w3HFmdymDODkRnkwmEavxK1CKLmTA9m1y3QEuKam09ihIMvR3jxV88LnpYbLa1C+GtELbi4ptcOHobjFMigC5SA9WJTXZqERxZMDeqMBVfA5uKxVLZecvHidzpfX1sFyCAsUTajAy5bov26CO2MD9ewjWUFsI61WA0AxC9URkQrgq1u7mwpPFZeX7qs6Itt9aovZoQ5bB8GQlQgMJFY9QQa4/QC43Z4VBVU2vHQ7P27ovF+6XRmqlVdok2PR0HiHUg1HoZFGxj4Pkc3LEM02O9x6P1WqttL5vOXDhvhguiYW3G2C9fFsQCraK7o+glsvvIi/7NDSimH+78s2JN/Z3VjscHmvLvZokWxjV/CxLq7WdM6FQq3aI1jpMbvhWFRzu6KYW+6YTJzIST2xal5iRabdWeg4YQ5aY1QALCVvl245wxmKpbReE8Gq5/SVkxEIq1b/zZCQmwkl+8B+7x/p2S6hy7Usyr2+LiVBDMNU9gfy/3VXsAgtSWIjFO3ZKyFmXabXe2aLFr5PPVT3jILazIJHMw1RH+r/pZFH5Hhuh7hRyVa83JUYmw+q5B73ydzeLnIgl3yVE024Y+QjitaIjlu8pIdbTrJvs6UxaiFmeyusPufzmQpF0OpxrUgStWEIh9IslivVspoo8Cu7cSMeFGa+JXD6Vzl1BLG2i6UeQZftld3mArPlLB6UOenO24TJ1yuoD1LZX5j3mCFSyR5ZQ50mYGotkC3oVneW4+kNsICXvBTXzWk51BYyKg1cLUuILXNmLQkmIwVQvFIxCoSjILSr2PyqpgbWh2SZJFYnrtuVI12AbaC2rxWArORvwF/CoVasonB4hCmK65PKXu67T+cA4cFyxb8NBL1+2OYPtQ0uZ+XDAdRJuR3L6klZdW1G0WPmPDDpehVTN8/xxScEfv3iK7UTlDpc/l+fxvTLVibSaESbBPZdcFcEKp8tyvBclXlLmKKr3sVqO75/wXeFUf7KDceESr1QqgKLZ4Dhdd0Pat+1U3o2DDtbqxSolUOHWGCzF9P1VUlbvZBt4OnOz9ZZin9WeaA+9TTdfNQH1S6148rmhrahEKekubeXIK8sp2+Hlj9/Yn7d1A+Pr1q5kFLPYd0xEKeXFrRvpU7f4HDh4hSRJ1Xls6LqPSImtSCo2QaaopFPt38jeDKe25vHST7brmLVtIIoDeINpWmiT4E6hS9utpVvnfo7imDskJLhBWSSCBiMLHTbYi0uQENijHNwuwrh4aXHjyXgw3QOGQtYQsmbP85PvDp/8Fi/Wj/97ejqkP5eXV82/W8obPWz+pWKpM+a4ovoTVObG8mnujLsjr8M7IlRrnSO1G+sTptL7Y5Q2e1zu++DqW69dU8UvzpmgpFX5iM+NTFWXFL1xB/KM6nZhO1WNLhb0rBTrFVJaf8yi1EhvEy5S1Ls/VKq4dpOf WSWqgtTbPZRt53NXWJPePwkl/PZ+QS2mU0fHG+pUpyikMupr7rpx2wvlQdrw4oHrXq9zRi2rNKxn8rjaWQVqGwbJVmDxVqPveTXP67fjEKDEXZ0PCaVIQUnp5CseDFoqpAgh2f8Erg37rUbje6sfulA8BokatOhwZ+yvJbUzKhs/moxsNgcMkiTwAzVIJrMcJKT0VM/FG4M+dfzYIcPxz5CDgY7L56ssTw1i2Nig2ndFvS/tOsVUpumkd8vehM/DX7XryWi2HA6b+OlgiwZVqkM8Y77sWStMZUYBaabZ3TgdL5f3iyxlxHSITIUNCusdzqqKlDZ2jBX5QeA8sjRNh78ZdaLINEEqKG3s1YNNqhfaMrAt5RTWNJhO/WkQBL5GyVCYChus7llRSYFVlO/7Jkib/oBiOvXyQJ185VtITLT8AsJMzpayStSHjfS5Wj6uMBZapi/K3IYyaNGfotTr4+GeWDbGQiuK/AgjYSicFBWSot7gO9+RRol7WIxLlWpPDwV1iqlOShQT+wCYIxyAxO1jZeqpD7tpTSQIwjg+7m4WxgFZGDIjGxH2oGxeUSIoYQ8572kvyWHrFsEeGPoyQuPJT+IXyTlfLFVPT0+lI8lfSZDAj+rK+II/8R/EAd+NBStgrMGBJFR8Pt3V5Q+lcGnFloaVc5tYClNJ1lrF/qslu+eCwkF6+pgafK+qCly0LrY4AKG1QJ2km9K3Qds0goWxYmvN4UuJdQup5Cn7AA4ftbOa2zcdBksxSRSEy0ClqjZExtT28WtfqLvSOVfXYgELFhbWad1IKln3TG314wAXw86Y3dbpYBws1eQHHECt1JD2XPiv7u6JBOPBMJkO1rbZ8KrZiaWK3nadgRoS5wdjLJwTmHYkmYga90CdEQKGY7KmL4XHDv6CPWmzBH0Zeworw2jM+XPyXYMTrkuKW/S8NSFOtbo96MF2TwG5BQU1FPcvaUupw7ht0IQ7gJM7EOt7qOPzlaMktLwhikaDtofnxYOVW1W9VMjF1M1pot0NjzUnnhexP/zaS82OoiZJVO9kMhtfRRp7Mh+TmsPjbSTNdShtkC1vr66DJp609YH2jx1pxf3f5KOyP6s8nRNPWJAhE1dQYUpTUkm+8Sw/ST7vNLm8WE2m+TBP03l6u/iVLtI0z5ej1ejb+eA8u+j/nvan/bM3zitkG0vJTCJYUQAAAABJRU5ErkJggg==",
			porHbImg:"data:image/png;base64,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",
			init: function(time){
				this.rainLen = time || 0;
				this.bind();
			},
			
			//创建红包容器
			createWrapper: function(){
				var _self = this;
				var divWrap = document.createElement("div");
				divWrap.setAttribute('style','width:100%;position:fixed;overflow:hidden;z-index:9999;display:block;top:0;bottom:0;left:0;');
				
				divWrap.addEventListener("click", function(){
					if(_self.flag){
						_self.flag = false;
						clearTimeout(_self.time);//清除定时器 不给红包再下
						_self.wrapperObj.remove();//删除容器
						
						/* 领取红包 */
						_self.axiosRequest({
							url:"https://m.maimaiti.cn/sit/mmt-wallet-user/wallet/redPacket/addRedPacket.do",
							type: "get",
							data: {redId: _self.redRuleId},
							dataType: "json",
							success: function (res) {
								var datas = JSON.parse(res);
								if(datas.status == 0){
									document.body.appendChild(_self.createWinsObj);//弹窗
								}else if(datas.status == 9999){
									try{
										location.href = 'wallet://gotoView?viewName=3'
									}catch(e){
										//TODO handle the exception
									}
								}
							},
							error: function (reserror) {
							
							}
						})
						
					}
				});
				
				return divWrap
			},
			
			//创建红包
			createRed: function(){
				var _self = this;
				var widths = this.wrapperObj.clientWidth || this.win.width;
				var rand = Math.random(),//随机数
					Wh = parseInt(rand * (70 - 30) + 20),//红包随机大小 宽高(如果想要一大一小的红包效果就把这个付给红包的宽度,现在默认50px)
					Left = parseInt(rand * ((widths - 60) - 0) + 0),//随机下的方向
					rot = (parseInt(rand * (45 - (-45)) - 45)) + "deg";//红包旋转度数
	
				var img = document.createElement("img");
				img.src = this.imgSrc;//红包图
				img.setAttribute('style','width:50px;position: absolute;margin:10px;left:' + Left + 'px;transition: all 3s ease-in;top: -100px;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);display:inline-block;transform: rotate(' + rot + ');-webkit-transform: rotate(' + rot + ')');
				// img.className = "items" + this.num++;
				
				//红包点击事件
// 				img.addEventListener("click", function(){
// 					if(_self.flag){
// 						_self.flag = false;
// 						clearTimeout(_self.time);//清除定时器 不给红包再下
// 						_self.wrapperObj.remove();//删除容器
// 						
// 						/* 领取红包 */
// 						_self.axiosRequest({
// 							url:"https://m.maimaiti.cn/sit/mmt-wallet-user/wallet/redPacket/addRedPacket.do",
// 							type: "get",
// 							data: {redId: _self.redRuleId},
// 							dataType: "json",
// 							success: function (res) {
// 								var datas = JSON.parse(res);
// 								if(datas.status == 0){
// 									document.body.appendChild(_self.createWinsObj);//弹窗
// 								}else if(datas.status == 9999){
// 									try{
// 										location.href = 'wallet://gotoView?viewName=3'
// 									}catch(e){
// 										//TODO handle the exception
// 									}
// 								}
// 							},
// 							error: function (reserror) {
// 							
// 							}
// 						})
// 						
// 					}
// 				});
				
				//把红包添加到容器
				_self.wrapperObj.appendChild(img);
	
				return img
			},
			
			//创建弹窗
			createWins:function(){
				var _self = this;
				
				var popWrap = document.createElement("div");
					popWrap.className = "pop";
				var popBg = document.createElement("div");
					popBg.setAttribute('style','width: 100%; height: 100%; background-color: #000; filter: alpha(opacity=50); opacity: 0.5; position: fixed; top: 0; left: 0; z-index: 9990;');
					popWrap.appendChild(popBg);
				var promptBox = document.createElement("div");	
					promptBox.setAttribute('style','width: 5.2rem; height: 5.6rem;background-color: #FFF;position: fixed;top: 50%;left: 50%;margin: -2.8rem 0 0 -2.6rem;z-index: 9999;padding:0.2rem;border-radius: 0.1rem;');
					popWrap.appendChild(promptBox);
				var proImg = document.createElement("img");
					proImg.setAttribute('style','width: 2.85rem; height: 2.45rem;border-radius: 0.03rem;margin: 0 auto;display:block;margin-top:0.6rem;');
					proImg.src = this.porHbImg;
					promptBox.appendChild(proImg);
				var proP = document.createElement("p");
					proP.setAttribute('style','text-align: center; font-size: 0.26rem;margin: 0 auto;color: #7d6b5d;line-height: 0.42rem;margin-top:0.6rem;');
					proP.innerText = "恭喜你抢到一个红包";
					promptBox.appendChild(proP);	
				var promptA	= document.createElement("div");
					promptA.setAttribute('style','height: 0.88rem;position: relative; margin-top: 0.28rem;');
				var promptSpan1	= document.createElement("span");	
				var promptSpan2	= document.createElement("span");
					promptSpan1.setAttribute('style','width: 2.8rem; height: 0.71rem;display:inline-block;line-height: 0.71rem;text-align: center;font-size: 0.32rem; color: #ffffff;float: left;background-color: #fe6b2b;border-radius: 0.1rem; ');
					promptSpan1.innerText = "去拆红包";
					promptSpan2.setAttribute('style','width: 1.86rem; height: 0.71rem;display:inline-block;line-height: 0.71rem;text-align: center;font-size: 0.26rem; color: #505050;float: left; margin-left:0.1rem;border-radius: 0.1rem;background-color: #e5e3da;');
					promptSpan2.innerText = "稍后再拆";
					promptA.appendChild(promptSpan1);
					promptA.appendChild(promptSpan2);
					promptBox.appendChild(promptA);
					
					//去拆红包
					promptSpan1.addEventListener("click", function(){
						_self.createWinsObj.remove();//删除弹窗容器
						location.href = "https://static.maimaiti.cn/sit/wallet/web/myRed.html"
					});
					//稍后再拆
					promptSpan2.addEventListener("click", function(){
						_self.createWinsObj.remove();//删除弹窗容器
					});
				return popWrap;	
			},
			
			//生产红包
			addRed(imgObj){
				var _self = this;
				this.animate(imgObj,{'top': this.win.height + 20 +'px'},3000,function(){
					imgObj.remove();
				})
				
				this.time = setTimeout(function(){
					_self.addRed(_self.createRed())
				}, 300)
			},
			
			//动画事件
			animate:function(obj,styleObj,times,func){
				setTimeout(function(){
					for(var k in styleObj){
						obj.style[k] = styleObj[k];
					}
					setTimeout(function(){
						func()//回调
					}, times)
				}, 100)
				
			},
			
			//事件绑定
			bind: function(){
				var _self = this;
				
				_self.wrapperObj = _self.createWrapper();//红包容器
				_self.createWinsObj = _self.createWins();//弹窗
				document.body.appendChild(_self.wrapperObj);//添加红包雨
				
				this.time = setTimeout(function(){
					_self.addRed(_self.createRed());//创建红包
				}, 300)
				
				//红包雨下雨时长
				if(this.rainLen > 0){
					setTimeout(function(){
						clearTimeout(_self.time);//清除定时器 不给红包再下
						_self.wrapperObj.remove();//删除容器
						_self.createWinsObj.remove();//删除弹窗
					}, this.rainLen)
				}
				
			},
			
			//初始请求获取红包雨
			RequestGo:function(type){
				var self = this;
				self.axiosRequest({
					url:"https://m.maimaiti.cn/sit/mmt-wallet-user/wallet/redRain/rule/queryRedRainInfo.do",
					type: "get",
					data: {rangeType:type},
					dataType: "json",
					success: function (res) {
						var datas = JSON.parse(res);
						console.log(datas);
						if(datas.status == 0 && datas.data){
							//有红包雨
							if(datas.data.raining){
								self.redRuleId = datas.data.redRuleId;//红包雨id
								self.init(datas.data.rainLen*1000);
							}
							//下一个红包雨
							if(datas.data.nextRainSeconds){
								setTimeout(function(){
									self.RequestGo(self.rangeType);
								}, datas.data.nextRainSeconds*1000)
							}
						}
					},
					error: function (reserror) {
					
					}
				})
			},
			
			//jajax  封装
			axiosRequest:function(options) {
				options = options || {};
				options.type = (options.type || "GET").toUpperCase();
				options.dataType = options.dataType || "json";
				var params = this.formatParams(options.data);
				//创建xhr对象 - 非IE6
				if (window.XMLHttpRequest) {
					var xhr = new XMLHttpRequest();
				} else { //IE6及其以下版本浏览器
					var xhr = new ActiveXObject('Microsoft.XMLHTTP');
				}
				//GET POST 两种请求方式
				if (options.type == "GET") {
					xhr.open("GET", options.url + "?" + params, true);
					params = null;
				} else if (options.type == "POST") {
					xhr.open("POST", options.url, true);
					//设置表单提交时的内容类型   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				}
				xhr.setRequestHeader("token", sessionStorage.getItem("token") ||this.getCookie("token") || '');
				xhr.setRequestHeader("channelcode", sessionStorage.getItem("channelcode") || '');
				xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
				xhr.send(params);
				
				//接收
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
						var status = xhr.status;
						if (status >= 200 && status < 300) {
							options.success && options.success(xhr.responseText);
						} else {
							options.error && options.error(status);
						}
					}
				}
			},
			
			//格式化参数
			formatParams:function(data) {
				var arr = [];
				for (var name in data) {
					arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
				}
				arr.push(("v=" + Math.random()).replace(".",""));
				return arr.join("&");
			},
			
			//获取cookie值 
			getCookie:function(objName) { 
			    var arrStr = document.cookie.split("; ");
			    for (var i = 0; i < arrStr.length; i++) {
			        var temp = arrStr[i].split("=");
			        if (temp[0] == objName) {
			            return decodeURI(temp[1]);
			        }
			    }
			}
			
			
		}
	}
	document.addEventListener("DOMContentLoaded",function(){
		var rangeTypeDom = document.getElementById("rangeType");
			if(rangeTypeDom!=null || rangeTypeDom!=undefined){
				pageUtils().rangeType = rangeTypeDom.value;
			}else{
				pageUtils().rangeType = "";
			}	
		//请求是否有红包雨
		pageUtils().RequestGo(pageUtils().rangeType);
		
	})

})();