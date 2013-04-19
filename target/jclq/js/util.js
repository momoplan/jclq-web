// 合并了 user.js 、 login.js  一些工具方法

//------------------ user.js 开始------------------------------
var basepath = "/jclq";//项目地址
var pageArrayNum = 0; 
var urlArray=new Array();
function reHtml(key,parameters,loading,divId,bloean){
	if(bloean==null||bloean==""){
	  bloean =true;
	}else{
	  bloean =false;
	}
	var str = "";
	if(key=='' || key=='0'){//从URL中获取参数
		var keyP = GetQueryString("key");
		//if(key=='0'){keyP='0';key='0';}
		if(keyP!=null && keyP!="undefined"){
			key = keyP;
		}else{
			key = 23;
		}
	}
	if(divId==null || divId==""){
		divId = "right_text";
	}
	//alert(urlArray[key]+"?"+parameters);
	pageArrayNum = key;//将当前页面的数组值更新为当前页面的值
	for(b in $.browser) if(b=='msie'){parameters=encodeURI(parameters)+"&msie=1";}
	if(key==39){	
		notRepeat('emailsubmitid','yanzhengbtn','yanzhengbtnzhong');
	}
	if(key==51){
		notRepeat('phoneBand','fasongyzh','yanzhengbtnzhong');
	}
	if(key==52){
		notRepeat('renzheng_submit','xiabu','xiabuzhong');
	}
		$.ajax({
			url:urlArray[key],//后台处理程序
			type:"POST",//数据发送方式
			data:parameters,//参数
			dataType:'html',//接受数据格式
			async:bloean,//同步执行还是异步执行
			error:function(){
				if(key==39){
					repeat('emailsubmitid','yanzhengbtnzhong','fasongyzh');
				}
				if(key==51){
					repeat('phoneBand','yanzhengbtnzhong','fasongyzh');
				}
				if(key==52){
					repeat('renzheng_submit','xiabuzhong','xiabu');
				}
			},
			beforeSend:function(){if(loading!=false){$("#"+divId).html('<img src="/images/loading.gif"  />');}},
			
			success:function(data){
					
				        if(divId == "right_text"){
							$("#right_text").html(data.replace("{success}", ""));
						}else{  
							$("#"+divId).html(data);
							$("#right_text").html(data.replace("{success}", ""));
						}
				}
			
			
		});
		
	return false;
}
var endTimeMap = new Map();//存储期号 和 官方截至时间的map 
function get100QiHao(key,parameters,loading,divId){
	endTimeMap = new Map();//重设一下map 
	for(b in $.browser) if(b=='msie'){parameters=encodeURI(parameters)+"&msie=1";}
		$.ajax({
			url:urlArray[key],//后台处理程序
			type:"POST",//数据发送方式
			data:parameters,//参数
			dataType:'json',//接受数据格式
			beforeSend:function(){if(loading!=false){$("#"+divId).html('<img src="/images/loading.gif"  />');}},
			success:function(json){
				$("#"+divId).html('');
				for(var j = 0 ; j < json.length ; j++){
					  	if(j==0){
					  		
					  		$("#"+divId).append("<option style='color:#F00;' value='"+json[j].batchcode+"_"+j+"'>"+json[j].batchcode+decodeURI(EncodeUtf8("[当前期]"))+"</option>"); 
					  	}else if(j<20){
					  		$("#"+divId).append("<option  value='"+json[j].batchcode+"_"+j+"'>"+json[j].batchcode+"</option>");
					  	}
					  	endTimeMap.put(json[j].batchcode, json[j].endTime);
					}
				}		
		});
	return false;
}
function getOmission(key,parameters,loading,divId){
	var divStr = "";
	if(divId.indexOf(",")>-1){
		divStr = divId.split(",");
		for(b in $.browser) if(b=='msie'){parameters=encodeURI(parameters)+"&msie=1";}
		$.ajax({
			url:urlArray[key],//后台处理程序
			type:"POST",//数据发送方式
			data:parameters,//参数
			dataType:'json',//接受数据格式
			beforeSend:function(){if(loading!=false){$("#"+divStr[0]).html('<img src="/images/loading.gif"  />');}},
			success:function(json){
				for ( var i = 0; i < divStr.length; i++) {
					if(divStr[i].indexOf("_wan")>-1){
						var str = json[0].wan;
						var Max = getMax(str);
						var wanStr = "";
						if(str.length>0){
							for ( var j = 0; j < str.length; j++) {
								if(Number(Max) == Number(str[j])){
									wanStr += "<dd class='red'>"+str[j]+"</dd>";
								}else{
									wanStr += "<dd>"+str[j]+"</dd>";
								}
							}
						}else{
							wanStr = "";
						}
						$("#"+divStr[i]).html(wanStr); 
					}
					else if(divStr[i].indexOf("_qian")>-1){
						var str = json[0].qian;
						var Max = getMax(str);
						var qianStr = "";
						if(str.length>0){
							for ( var j = 0; j < str.length; j++) {
								if(Number(Max) == Number(str[j])){
									qianStr += "<dd class='red'>"+str[j]+"</dd>";
								}else{
									qianStr += "<dd>"+str[j]+"</dd>";
								}
							}
						}else{
							qianStr = "";
						}
						$("#"+divStr[i]).html(qianStr); 
					}
					else if(divStr[i].indexOf("_bai")>-1){
						var str = json[0].bai;
						var Max = getMax(str);
						var baiStr = "";
						if(str.length>0){
							for ( var j = 0; j < str.length; j++) {
								if(Number(Max) == Number(str[j])){
									baiStr += "<dd class='red'>"+str[j]+"</dd>";
								}else{
									baiStr += "<dd>"+str[j]+"</dd>";
								}
							}
						}else{
							baiStr = "";
						}
						$("#"+divStr[i]).html(baiStr); 
					}
					else if(divStr[i].indexOf("_shi")>-1 && divStr[i].indexOf("_shiDX")<0){
						var str = json[0].shi;
						var Max = getMax(str);
						var shiStr = "";
						if(str.length>0){
							for ( var j = 0; j < str.length; j++) {
								if(Number(Max) == Number(str[j])){
									shiStr += "<dd class='red'>"+str[j]+"</dd>";
								}else{
									shiStr += "<dd>"+str[j]+"</dd>";
								}
							}
						}else{
							shiStr = "";
						}
						$("#"+divStr[i]).html(shiStr); 
					}
					else if(divStr[i].indexOf("_ge")>-1 && divStr[i].indexOf("_geDX")<0){
						var str = json[0].ge;
						var Max = getMax(str);
						var geStr = "";
						if(str.length>0){
							for ( var j = 0; j < str.length; j++) {
								if(Number(Max) == Number(str[j])){
									geStr += "<dd class='red'>"+str[j]+"</dd>";
								}else{
									geStr += "<dd>"+str[j]+"</dd>";
								}
							}
						}else{
							geStr = "";
						}
						$("#"+divStr[i]).html(geStr); 
					}
					else if(divStr[i].indexOf("_geDX")>-1){
						var str = json[0].geDX;
						var Max = getMax(str);
						var geDXStr = "";
						if(str.length>0){
							for ( var j = 0; j < str.length; j++) {
								if(Number(Max) == Number(str[j])){
									geDXStr += "<dd class='red'>"+str[j]+"</dd>";
								}else{
									geDXStr += "<dd>"+str[j]+"</dd>";
								}
							}
						}else{
							geDXStr = "";
						}
						$("#"+divStr[i]).html(geDXStr); 
					}
					else if(divStr[i].indexOf("_shiDX")>-1){
						var str = json[0].shiDX;
						var Max = getMax(str);
						var shiDXStr = "";
						if(str.length>0){
							for ( var j = 0; j < str.length; j++) {
								if(Number(Max) == Number(str[j])){
									shiDXStr += "<dd class='red'>"+str[j]+"</dd>";
								}else{
									shiDXStr += "<dd>"+str[j]+"</dd>";
								}
							}
						}else{
							shiDXStr = "";
						}
						$("#"+divStr[i]).html(shiDXStr); 
					}
					
				}
				
			}		
		});
	}else{
		for(b in $.browser) if(b=='msie'){parameters=encodeURI(parameters)+"&msie=1";}
		$.ajax({
			url:urlArray[key],//后台处理程序
			type:"POST",//数据发送方式
			data:parameters,//参数
			dataType:'json',//接受数据格式
			beforeSend:function(){if(loading!=false){$("#"+divId).html('<img src="/images/loading.gif"  />');}},
			success:function(json){
				$("#"+divId).html('');
				var str ="";
				for(var j = 0 ; j < json.length ; j++){
						str += json[j].bai;
				}
				$("#"+divId).html(str); 
			}		
		});
	}
	return false;
}
//做数组排序的参数
function compareInt(int1, int2){
    var iNum1 = parseInt(int1);//强制转换成int 型;
    var iNum2 = parseInt(int2);
    if(iNum1 < iNum2){
        return -1;
    }else if(iNum1 > iNum2){
        return 1;
    }else{
        return 0;
    }
}
//获取数组中最大值
function getMax(arry){
	 var max = 0;
	 if(arry != null && arry.length > 0){
		 max = Number(arry[0]);  
		 var len = arry.length;  
		 for (var i = 1; i < len; i++){  
			 if (Number(arry[i]) > max) {  
				 max = arry[i];  
			 }
		 }   
	 }
	 return max;
}
function getQiHaoArray(key,parameters,loading){
	var qiHaoArray=new Array();
	for(b in $.browser) if(b=='msie'){parameters=encodeURI(parameters)+"&msie=1";}
	$.ajax({
		url:urlArray[key],//后台处理程序
		type:"POST",//数据发送方式
		data:parameters,//参数
		//async:false,//同步执行还是异步执行
		dataType:'json',//接受数据格式
		beforeSend:function(){if(loading!=false){}},
		success:function(json){
			for(var j = 0 ; j < json.length ; j++){
				qiHaoArray[j]=json[j].batchcode;
				
			}
		}		
	});
	return qiHaoArray;
}

var touzhu_balance=0;


var pageLotNo=pageStartDate=pageStopDate=pageOrder="";


//投注查询key为数组对应的数组编号，lotNo 为彩种编号 startDate stopDate 为开始和结束时间 order 为其他条件，注意order需要写“参数名=值”
function TZSelectreHtmlInParameters(lotno,beginTime,endTime,order,i){
	pageLotNo=lotno;
	pageStartDate=beginTime;
	pageStopDate=endTime;
	pageOrder=order;
	var now = new Date();
	var year=now.getFullYear();
	var month=now.getMonth()+1<10?("0"+(now.getMonth()+1)):((now.getMonth()+1)+"");
	var day=now.getDate()<10?("0"+now.getDate()):(now.getDate()+"");
	var nowdate = year+""+month+""+day;
	var nowdateshow = year + "-" + month + "-" + day;
	var zuijin3yue = Number(nowdate) - 300;
	
	if(beginTime != "" && beginTime != null && beginTime != undefined && endTime != "" && endTime != null && endTime != undefined){
		if(Number(pageStopDate.replace("-","").replace("-","")) - Number(pageStartDate.replace("-","").replace("-","")) < 0){
			openAlert(decodeURI(EncodeUtf8("对不起，您的查询时间设置不对，请重新查询！")));
		}
		
	}
	var param = "";
	if(lotno!=""){param=param+"lotno="+lotno+"&";}
	if(beginTime!=""){param=param+"beginTime="+beginTime+"&";}
	if(endTime!=""){param=param+"endTime="+endTime+"&";}
	param=param+order;
	if(i!=null){param=param+"&pageIndex="+i;};
	if(param.substring(param.length-1, param.length)=="&"){param = param.substring(0, param.length-1);}
	reHtml(pageArrayNum , param);
	return false;
	
}

//key为数组对应的数组编号，lotNo 为彩种编号 startDate stopDate 为开始和结束时间 order 为其他条件，注意order需要写“参数名=值”
//与此同时记录用的搜索条件，以便分页使用

function reHtmlInParameters(lotNo,startDate,stopDate,order,i){
	pageLotNo=lotNo;
	pageStartDate=startDate;
	pageStopDate=stopDate;
	pageOrder=order;
	
	
	var now = new Date();
	var year=now.getFullYear();
	var month=now.getMonth()+1<10?("0"+(now.getMonth()+1)):((now.getMonth()+1)+"");
	var day=now.getDate()<10?("0"+now.getDate()):(now.getDate()+"");
	var nowdate = year+""+month+""+day;
	var nowdateshow = year + "-" + month + "-" + day;
	var zuijin3yue = Number(nowdate) - 300;
	
	if(startDate != "" && startDate != null && startDate != undefined && stopDate != "" && stopDate != null && stopDate != undefined){
		if(Number(pageStopDate.replace("-","").replace("-","")) - Number(pageStartDate.replace("-","").replace("-","")) < 0){
			openAlert(decodeURI(EncodeUtf8("对不起，您的查询时间设置不对，请重新查询！")));
		}
	}
	
	var param = "";
	if(lotNo!=""){param=param+"lotNo="+lotNo+"&";}
	if(startDate!=""){param=param+"startDate="+startDate+"&";}
	if(stopDate!=""){param=param+"stopDate="+stopDate+"&";}
	param=param+order;
	if(i!=null){param=param+"&pageIndex="+i;};

	if(param.substring(param.length-1, param.length)=="&"){param = param.substring(0, param.length-1);}
	//alert(param);
	reHtml(pageArrayNum , param);
	return false;
	
}




function isLoginReHtmlInParameters(lotNo,startDate,stopDate,order,i,divId){
   if(isLogin()){
	   if("48"==GetQueryString("key")){
		   var subscribeFlowno = GetQueryString("subscribeFlowno");
		   var lotno = GetQueryString("lotNo");
		   var orderId=GetQueryString("orderId");
			reHtml(48,"lotNo="+lotno+"&subscribeFlowno="+subscribeFlowno+"&orderId="+orderId,false,"right_text");
	   }else{
			reHtmlInParameters(lotNo,startDate,stopDate,order,i);
	   }
	 }else{
		   if(divId==null){
				divId = "right_text";
			}
			$("#"+divId).html("<div class='zhzx_noligin'>"+decodeURI(EncodeUtf8(" 您尚未登录，请您先"))+"<span class='red2'><a href='/rules/login.html'  >"+decodeURI(EncodeUtf8("登录"))+"</a></span><br />"+decodeURI(EncodeUtf8("如果您还没注册，请您先"))+"<span class='blue'><a href='/rules/register.html'>"+decodeURI(EncodeUtf8("注册"))+"</a></span>"+"</div>");
		}
}

//查询余额1.deposit可用余额 2.freeze冻结金额
function balanceAdtil(deposit,freeze){
	 $.ajax({   
			url:basepath+'ajaxFindAccount.do',  
			type:'post', //数据发送方式   
			async:false,
			dataType:'json',
			success: function(msg){
		    	touzhu_balance = msg.valid_amount;
		    	if(deposit!=""){
		    		$('#'+deposit).html((msg.deposit_amount).toFixed(2));//deposit_amount
		    		touzhu_balance=(msg.deposit_amount).toFixed(2);//设置用户当前可投注金额，用于投注时计算投注后余额
		    	}
				if(freeze!=""){
					$('#'+freeze).html((msg.freeze_amout).toFixed(2));//freeze_amout
				}
			}
		}); 	 
}
	
//查询余额1.deposit可用余额 2.Valid可提现金额3.freeze冻结金额 如果不获取，设为""
function balanceDivDis(deposit,valid,freeze){
	 $.ajax({   
		 	url:basepath+'ajaxFindAccount.do',   
			type:'post', //数据发送方式   
			async:false,
			dataType:'json',
			success: function(msg){
		    	touzhu_balance = msg.valid_amount;
		    	if(valid!=""){
					$('#'+valid).html((msg.valid_amount).toFixed(2));//valid_amount
	 			}
		    	if(deposit!=""){
		    		$('#'+deposit).html((msg.deposit_amount).toFixed(2));//deposit_amount
		    		touzhu_balance=(msg.deposit_amount).toFixed(2);//设置用户当前可投注金额，用于投注时计算投注后余额
		    	}
				if(freeze!=""){
					$('#'+freeze).html((msg.freeze_amout).toFixed(2));//freeze_amout
				}
				$("#this_username").html(msg.nickName);
				if(msg.nickName=="null"||msg.nickName==undefined||msg.nickName==""){
					window.location.href="/chlw/function/user/ruyicai_setNickName.jsp";
				}
			}
		}); 	 
}
	


//选择彩种时动态查询用户用户数据
function toLotNo(lotNo){
	reHtml(pageArrayNum, "lotNo="+lotNo.value);
}
//分页调用
function toPageList(i){
	reHtmlInParameters(pageLotNo,pageStartDate,pageStopDate,pageOrder,i);
}


//投注查询分页调用
function toTZPageList(i){
	TZSelectreHtmlInParameters(pageLotNo,pageStartDate,pageStopDate,pageOrder,i);
}

//将彩种作为参数获取的js包装
function forLotNo(key,loading,divId,defautId){
	var lotno = GetQueryString("lotno");
	var batchcode = GetQueryString("batchcode"); 
	if(lotno!=null && lotno!="undefined"){
		lotno = "lotno="+lotno;
	}else{
		lotno = "";
	}
	if(batchcode != null && batchcode !="undefined"){
		lotno=lotno+"&batchcode="+batchcode;
	}
	//reHtml(key,lotno,loading,divId);
	reHtml_common(key,lotno,loading,divId,urlArray,defautId);
}

//获取URL地址中的参数
function GetQueryString(name){ 
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
var r = window.location.search.substr(1).match(reg); 
if (r!=null) return unescape(r[2]); return null; 
}


//统一提示方法
function openAlert(msg){
	//$("#tishi").val(msg);
	ymPrompt.alert({title:decodeURI(EncodeUtf8("温馨提示")),message:msg,width:450,height:200});
}
function connPath(){
	$("#path").val("");
	$("#errorCode").val("");
	$("input[name=hidpath]").each(function(){
		var pe=$(this).attr("value");
		var arr=pe.split("@");
		$("#path").val($("#path").val()+arr[1]);
		$("#errorCode").val($("#errorCode").val()+arr[0]);
	});

	
}
//统一使用的投注弹出框
function openTouzhu(){
	if(!touzhuPublic()){	
		return false;
	}
	
	//判断用户余额是否充足  (投注金额是否大于余额) 
	 var current_money = $("#investField").text();
	 var goumaifangshi=$("#goumaifangshi").val();//获取购买方式，如：代购  追号
		var isZhuihao=0;//获取购买方式，如：代购  追号
		if($("#isZhuihao") != null){
			isZhuihao = $("#isZhuihao").val();
			}
	 var zhuihaoqishu=1;
	    if(goumaifangshi=='追号' || isZhuihao == 1){
	 	   zhuihaoqishu = $("#betchNum").val();
	    }
	if(parseInt(current_money*zhuihaoqishu) > parseInt($("#touzhu_money").html())){         
				
		
		openAjaxPopup("openTishi",1000,"/rules/tishi.html?key=2&num=3");
		
		return false;      
	}
	
	htmlMsg();//给 弹出层设置相关数据
	connPath();
	openStaticPopup("openTouzhu",1000,"touzhuOpen1");
}


//根据制定的参数获取相应接口的数据 (下标，属性名称，属性值，其他参数条件)
function getObjForNameAndValueToKey(key){
	if(isLogin()){//判断session是否失效 如果失效跳转到登陆页面
		var flowno = "flowno=" + GetQueryString("flowno");
		var play_name = "play_name=" +GetQueryString("play_name");
		var batchcode = "batchcode=" +GetQueryString("batchcode");
		reHtml(key,flowno+"&"+play_name+"&"+batchcode,false,'');
	}else{
		window.location.href="/rules/login.html";
		
	}
}

//根据制定的参数获取相应接口的数据 (下标，属性名称，属性值，其他参数条件)
function getMoreObjForNameAndValueToKey(key){
	var orderid = "orderid=" + GetQueryString("orderid");
	reHtml(key,orderid,false,'');
}

//----------------user.js 结束-----------------------

//----------------- login.js 开始--------------------------

//加入收藏
function addCookie(){
	 var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd': 'CTRL';
    try{
        if (document.all) { //IE类浏览器
            try {
                window.external.toString(); //360浏览器不支持window.external，无法收藏
                window.alert(decodeURI(EncodeUtf8("国内开发的360浏览器等不支持主动加入收藏。\n您可以尝试通过浏览器菜单栏 或快捷键 ctrl+D 试试。")));
            }
            catch (e){
                try{
                    window.external.addFavorite(window.location, document.title);
                }
                catch (e){
                    window.external.addToFavoritesBar(window.location, document.title);  //IE8
                }
            }
        }
        else if (window.sidebar) { //firfox等浏览器
            window.sidebar.addPanel(document.title, window.location, "");
        }
        else {
            alert(decodeURI(EncodeUtf8('您可以尝试通过快捷键' + ctrl + ' + D 加入到收藏夹~')));
        }
    }
    catch (e){
        window.alert(decodeURI(EncodeUtf8("因为IE浏览器存在bug，添加收藏失败！\n解决办法：在注册表中查找\n HKEY_CLASSES_ROOT\\TypeLib\\{EAB22AC0-30C1-11CF-A7EB-0000C05BAE0B}\\1.1\\0\\win32 \n将 C:\\WINDOWS\\system32\\shdocvw.dll 改为 C:\\WINDOWS\\system32\\ieframe.dll ")));
    }
}
//设为首页
function setHomepage(){
	if (document.all){
		document.body.style.behavior='url(#default#homepage)';
		document.body.setHomePage('http://www.ruyicai.com');
		}
	else if (window.sidebar){
		if(window.netscape){
			try{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
			}catch (e){ 
			   alert(decodeURI(EncodeUtf8("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about：config，然后将项 signed.applets.codebase_principal_support 值该为true"))); 
			 }
		   } 
		    var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			if(confirm(decodeURI(EncodeUtf8("是否要将"))+"'http://www.ruyicai.com'"+decodeURI(EncodeUtf8("设置为首页")))){
		    prefs.setCharPref('browser.startup.homepage','http://www.ruyicai.com');
			}
		 }
	}


//更改验证码头部验证码加载
function change(mag){
	var d=new Date();
	var imageUrl = "/chlw/function/common/image.jsp?id="+d.getDate()+Math.random();
	$("#"+mag).attr('src',imageUrl);
}

//验证手机号码
function checkTelephone(){
	var tele = $("#mobileId").val();
	var mno = $("#mno");
	if(tele==null || tele==""){
		mno.html(decodeURI(EncodeUtf8("请您输入手机号码！")));
		return false;
	}
	var telePattern=/^(13[0-9]|15[0-9]|18[0-9])\d{8}$/;
	if(!telePattern.test(tele)){
		mno.html(decodeURI(EncodeUtf8("手机号码格式错误！")));
		return false;
	}
	mno.innerHTML=""; 
	return true;
}

//验证用户名
function checkUserName(){
	var tele = $("#userName").val();
	var mno = $("#mno");
	if(tele==null || tele==""){
		mno.html(decodeURI(EncodeUtf8("请您输入用户名！")));
		return false;
	}
	var telePattern=/^[a-z]{1}[a-z0-9_]{3,15}$/;
	if(!telePattern.test(tele)){
		mno.html(decodeURI(EncodeUtf8("请正确输入用户名！")));
		return false;
	}
	mno.innerHTML=""; 
	return true;
}
// 验证密码
function checkPass(){
	var pass = $("#password").val();
	var upass = $("#upass");
	if(pass==null || pass==""){
		upass.html(decodeURI(EncodeUtf8("请正确输入密码！")));
		return false;
	}
	upass.innerHTML=""; 
	return true;
}
// 表单提交验证手机号码和密码
function checkformsub(){
	var teleOk = checkTelephone();
	var passOk = checkPass();
	if(teleOk && passOk){
		return true;
	}else{
		return false;
	}
}
//点击首页头部登录让登录层显示
function loginShow(name,isPage){
	// change('mag');
	var PopUpWindow=$("#login_pop");
	if(name){PopUpWindow=$("#"+name);}
	var PopUpBG=$(".BodyBG");
	
	if(!isPage){
		WindowCenter();
	}
	$(PopUpBG).toggle();
	$(PopUpWindow).toggle();
	if(!isPage){
		focuns();
	}
}
//参与合买弹出框
function canyuHemaiShow(name,isPage){
	// change('mag');
	var PopUpWindow=$("#canyuHemaiDiv");
	if(name){PopUpWindow=$("#"+name);}
	var PopUpBG=$(".BodyBG");
	
	if(!isPage){
		WindowCenter();
	}
	$(PopUpBG).toggle();
	$(PopUpWindow).toggle();
	if(!isPage){
		focuns();
	}
}

//初始化首页头部
function topLogin(){
	$.ajax({
	    type: "get",
	    url: basepath+"/users/user_top.jsp?"+Math.random(),
	    dataType: "html",
	    success: function(msg){
	     $('#top_user').html(msg);}
	});
}
//初始化首页头部 div--- 要将内容写进的层的id  ， id---要改变样式的的对象的id
function toplogo(div,id){
	$.ajax({
	    type: "get",
	    url: "/chlw/function/cooperation/coop_top.jsp?"+Math.random(),
	    dataType: "html",
	    async:false, 
	    success: function(msg){
		 $('#'+div).html(msg);
	     $("#"+id).attr("class","navbjhover");
	}
	});
}
//初始化走势图表头部 div--- 要将内容写进的层的id
function tubiaologo(div){
	$.ajax({
	    type: "get",
	    url: "/chlw/function/cooperation/coop_top_tubaiao.jsp?"+Math.random(),
	    dataType: "html",
	    success: function(msg){
	     $('#'+div).html(msg);}
	});
}
//判断登录后执行查询的操作
function isLogin(){
 var check="";
	$.ajax({
		url:basepath+"/function/query/isLogin.jsp",//后台处理程序
		type:"POST",//数据发送方式
		async:false, 
		dataType:'html',//接受数据格式
		success:function(data){
			if(data.indexOf("{true}")==-1){
			     check="true";
				}else{
			check="false";
				}
		}		
	});
if(check == "true"){
	  return true;
	}
	else{
	 return false;
	}
}
//判断是否绑定手机
function isBindPhone(){
	var check="";
	$.ajax({
		url:basepath+"/function/query/isBindPhone.jsp",//后台处理程序
		type:"POST",//数据发送方式
		async:false, 
		dataType:'html',//接受数据格式
		success:function(data){
		if(data.indexOf("{true}")==-1){
			check="true";
		}else{
			check="false";
		}
	}		
	});
	if(check == "true"){
		return true;
	}
	else{
		return false;
	}
}

function refresh(){
	if(!isLogin()){//如果用户失效 ，刷新页面
		window.location.reload();
	}
	//setTimeout('refresh()',3000); //指定30分钟刷新一次
}
setTimeout('refresh()',1810000);//31分钟调一次
// 用户退出
//
function ajaxLoginOut(){
	$.ajax({
	    type: "POST",
	    url: "/chlw/function/tuserinfoAction!loginOut",
	    success: function(msg){
		window.location.href="/rules/login.html";
		topLogin();
		  indexRight();
	     }
	   });
}
//用户退出
//
function zucaiLoginOut(){
	$.ajax({
	    type: "POST",
	    async:false, 
	    url: "/chlw/function/tuserinfoAction!loginOut",
	    success: function(msg){
		window.close();
		window.open ("/rules/login.html");	
		  topLogin();
		  indexRight();
	     }
	   });
}


//----------- login.js 结束---------------------------------------



//----------------------- public.js 开始-----------------------
function GetRandNumber(Number) {
    return Math.ceil(Math.random() * Number);
}
String.prototype.ltrim = function() { return ltrim(this); };
String.prototype.rtrim = function() { return rtrim(this); };
String.prototype.rtrimWithReturn = function() { return rtrimWithReturn(this); };
String.prototype.trim = function() { return trim(this); };

function ltrim(str) {
    var i;
    for (i = 0; i < str.length; i++) {
        if ((str.charAt(i) != " ") && (str.charAt(i) != " ") && (str.charAt(i).charCodeAt() != 13) && (str.charAt(i).charCodeAt() != 10) && (str.charAt(i).charCodeAt() != 32))
            break;
    }
    str = str.substring(i, str.length);
    return str;
}

function rtrim(str) {
    var i;
    for (i = str.length - 1; i >= 0; i--) {
        if ((str.charAt(i) != " ") && (str.charAt(i) != " ") && (str.charAt(i).charCodeAt() != 13) && (str.charAt(i).charCodeAt() != 10) && (str.charAt(i).charCodeAt() != 32))
            break;
    }
    str = str.substring(0, i + 1);
    return str;
}

function rtrimWithReturn(str) {
    var i;
    for (i = str.length - 1; i >= 0; i--) {
        if (str.charAt(i) != " " && str.charAt(i) != " " && str.charAt(i) != "\n")
            break;
    }
    str = str.substring(0, i + 1);
    return str;
}

function trim(str) {
    return ltrim(rtrim(str));
}

function Round(Num, Len) {
    var temp = 1;
    for (var i = 0; i < Len; i++)
        temp *= 10;

    return Math.round(Num * temp) / 100;
}
//----------------------- public.js 结束-----------------------
//----------------------- 其他辅助js 开始-----------------------
//让购彩以后的金额得到并将其转换为两位小数
function getFinalMoney(){
	var a = Number(touzhu_balance -Number($("#current_money").html()));
	if(a<0){
		$("#final_money").html("0.00");
	}else{
	   $("#final_money").html(a.toFixed(2));
	}
}
//公用的ajax调用
//key  当前key 如 25
//parameters  参数 如from表单值  
//loading 是否加载  如 true 或者 false
//divId  写入的div的id
//arry  传如的数组 对象 如 urlArray
//defualtKey 该数组的默认key 如  0
//调用的例子 reHtml_common('2',$('#Form').serialize(),true,'container',pwdArray,'0');
function reHtml_common(key,parameters,loading,divId,arry,defualtKey){
	var defaultArray = new Array(); //定义默认的数组
	var defaultkey = '23'; //定义默认的key 
	if(arry == '' || arry == null){
		defaultArray = urlArray; //给默认数组赋值
	}
	else{
		defaultArray = arry; //使用传入的数组
	}
	if(defualtKey != ''){
		
		defaultkey = defualtKey; //使用传入的默认key
	}
	
	var str = "";
	if(key=='' || key=='0'){//从URL中获取参数
		var keyP = GetQueryString("key");
		if(key=='0'){keyP=defaultkey;key=defaultkey;}
		if(keyP==''){keyP=defaultkey;key=defaultkey;}
		if(keyP!=null && keyP!="undefined"){
			key = keyP;
		}else{
			key =defaultkey;
		}
	}
	var j=0;
	for(var i=0;i<defaultArray.length;i++){
		
		if(key != i){
			j++;
		}
	}
	
	if(j==defaultArray.length){
		key=defaultkey;
	}
	if(divId==null||divId==''){
		divId = "right_text";
	}
	//alert(urlArray[key]+"?"+parameters);
	pageArrayNum = key;//将当前页面的数组值更新为当前页面的值

	for(b in $.browser) if(b=='msie'){parameters=encodeURI(parameters)+"&msie=1";}
	$.ajax({
		url:defaultArray[key],//后台处理程序
		type:"POST",//数据发送方式
		
		data:parameters,//参数
		dataType:'html',//接受数据格式
		beforeSend:function(){if(loading!=false){$("#"+divId).html('<img src="/images/loading.gif"  />');}},
		success:function(data){
			$("#"+divId).html(data);
			//findBalance();
			//if(key==5||key==11||key==12||key==17){//仅对提现页面替换
			$("#right_text").html(data.replace("{success}", ""));
			//};
				}	
		});	
	return false;
	}

//根据彩种获取截止时间
function getEndTime(lotNo,view){
	  $.ajax({
		   type: "POST",
		   url: "/chlw/function/selectAll!batchCodeSelect",
		   data: "lotNo="+lotNo,
		   async: false, 
		   dataType:'json',//接受数据格式
		   success: function(msg){
		     $("#"+view).html(msg.end_time);
		     initTime();//倒计时使用
		   }
		});
}

	//初始化页面的今日开奖
	function zxkj_init(){
	        getEndTime('F47104','endTime1');
			getEndTime('F47103','endTime2');
			getEndTime('F47102',"endTime3");
			getEndTime('T01001','endTime4');
			getEndTime('T01009',"endTime5");
			getEndTime('T01002','endTime6');
			getEndTime('T01011','endTime7');
			var time="";
		var myDate = new Date();
		if((myDate.getMonth()+1)<10){
		time1=myDate.getFullYear()+"-0"+(myDate.getMonth()+1);
		if(myDate.getDate()<10){
		time1+="-0"+myDate.getDate();
		}}
		else{
		time1=myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();};
		if($('#kaijianggonggao').length>0){
		for(var i=1;i<8;i++){
			var currtTime=$("#endTime"+i).text();
			//2011-6-8 
			var date= currtTime.substring(0,10);
			//alert(time1+"---"+date);
			if(date==time1){
				$("#endTimek"+i).attr("class","kaijiang");
			}else{
				$("#endTimek"+i).attr("class","");
			}
		}
		}else{
		for(var i=1;i<8;i++){
			var currtTime=$("#endTime"+i).text();
			//2011-6-8 
			var date= currtTime.substring(0,10);
			//alert(time1+"---"+date);
			if(date==time1){
				$("#play_"+i).css("display","block");
			}
		}
		}
	}
//获取用户的昵称	
function  check_nickName(){
    $.ajax({
		   type: "POST",
		   url: "/chlw/function/user/userIndex.jsp",
		   async: false, 
		   dataType:'html',//接受数据格式
		   success: function(msg){
		    $("#nick_name").html(msg);
		   }
		});
	
	
	
}
//----------------------用户登录---------------------------------
//pageType目前分为0首页、1投注页、2其他页3种，根据三种情况可能对当前页面进行用户数据的初始化
function loginAjax(pageType){
	//登录表单验证插件
	//loginFormValidator();
	// 验证输入的用户名、密码是否正确
		
	
	var params=$('#userLoginForm').serialize(); //这里直接就序列化了表单里面的值；直接获取到表单元素的值   
	// 发送请求
	$.ajax({
		url	: '/chlw/function/tuserinfoAction!loginForm',
		type:"POST",//数据发送方式
		data:params,//参数
		dataType:'html',//接受数据格式
		success:function(data){
				//此处判断跳转的的jsp中显示的数据是否有{success}字样，如果有的话，则认为是成功的
				if(data.indexOf("{success}")==-1){
					$("#msg").html(data);
					$("#msg").css("display","");
					$("#rank_id").css("display","");
					$("#rank_value").val("1");
					change("magLogin");
					$("#pwd").unbind("onKeyDown");
				}else{
					if(pageType==0){
						//首页类型的页面登录进行初始化
						
					}else if(pageType==1){
						if(data.indexOf("{success}")!=-1 && data.indexOf("{nickname}") != -1){
							window.location.href="/chlw/function/user/ruyicai_setNickName.jsp";
						}
						
						totalLotteryInvest=parseInt($("#lab_Num").html());
						totalMoney = Number($("#current_money").html());//记录当前选号后的投注所需金额
						if($("#lotNo").length>0){
						touzhuInitStatic();//对页面做用户登录状态初始化
						}
						//还原初始化之前用户的投注金额，并计算当前用户余额减去投注金额的剩余金额
						var a = parseFloat(touzhu_balance - totalMoney);
						$("#current_money").html(totalMoney.toFixed());
						if(a<0){
							$("#final_money").html("0");
						}else{
						  $("#final_money").html(a.toFixed());
						}
						//初始化最新开奖页面
						if($("#zuijingc").length>0){
							reHtml(46,'','false','zuijingc');
						}
					}else if(pageType==2){
						//其他类型的页面登录进行初始化
					}
					$("#userDivDis").css("diplay","block");
					$("#userDivNone").css("diplay","none");
					topLogin();
					indexRight();
					loginShow();
					//获取当前请求的地址若为频道页面时不请求
					if($("#lotNo").length<=0){
						window.location.reload(decodeURIComponent($("#reqUrl").val()));
					}
					
				}
			}		
	});

}

var left =1;
var right =2;

function channel_right(){
if(left==7&&right==8){
return ;
}else{
right +=1;
$("#channel"+left).toggle();
$("#channel"+right).toggle();
left+=1;
}
}
function channel_left(){
if(left==1&right==2){
return ;
}else{
left =left-1;
$("#channel"+right).toggle();
$("#channel"+left).toggle();
right-=1;
}
}
//成功页面显示相应的彩种以及图片
  function getCaiZhong(divname1,divname2){

	  	var key = GetQueryString("cai");
	  	var div1 = $("#"+divname1);
	  	var div2 = $("#"+divname2);
		  switch(key){
		  case "F47103":
			  div1.html('<span class="ssq_logo"><img src="/images/3D_tu.gif" alt="'+decodeURI(EncodeUtf8('福彩 3D'))+'" /></span><span class="bet_head_zi">'+decodeURI(EncodeUtf8('福彩 3D投注'))+'</span>');
			  div2.html('<a href="/fucai3D.html"  title="'+decodeURI(EncodeUtf8('继续投注'))+'" >'+decodeURI(EncodeUtf8('继续投注')+'</a>'));
			  break;
		  case "T01001":
			  div1.html('<span class="ssq_logo"><img src="/images/dlt_tu.gif" alt="'+decodeURI(EncodeUtf8('大乐透'))+'" /></span><span class="bet_head_zi">'+decodeURI(EncodeUtf8('大乐透投注'))+'</span>');
			  div2.html('<a href="/daletou.html"  title="'+decodeURI(EncodeUtf8('继续投注'))+'" >'+decodeURI(EncodeUtf8('继续投注')+'</a>'));
			  break;
		  case "F47102":
			  div1.html('<span class="ssq_logo"><img src="/images/qlc_tu.gif" alt="'+decodeURI(EncodeUtf8('七乐彩'))+'" /></span><span class="bet_head_zi">'+decodeURI(EncodeUtf8('七乐彩投注'))+'</span>');
			  div2.html('<a href="/qilecai.html"  title="'+decodeURI(EncodeUtf8('继续投注'))+'" >'+decodeURI(EncodeUtf8('继续投注')+'</a>'));
			  break;
		  case "T01002":
			  div1.html('<span class="ssq_logo"><img src="/images/pls_tu.gif" alt="'+decodeURI(EncodeUtf8('排列三'))+'" /></span><span class="bet_head_zi">'+decodeURI(EncodeUtf8('排列三投注'))+'</span>');
			  div2.html('<a href="/pailie3.html"  title="'+decodeURI(EncodeUtf8('继续投注'))+'" >'+decodeURI(EncodeUtf8('继续投注')+'</a>'));
			  break;
         case "T01011":
			  div1.html('<span class="ssq_logo"><img src="/images/plw_tu.gif" alt="'+decodeURI(EncodeUtf8('排列五'))+'" /></span><span class="bet_head_zi">'+decodeURI(EncodeUtf8('排列五投注'))+'</span>');
			  div2.html('<a href="/pailie5.html"  title="'+decodeURI(EncodeUtf8('继续投注'))+'" >'+decodeURI(EncodeUtf8('继续投注')+'</a>'));
			  break;
		 case "T01009":
			  div1.html('<span class="ssq_logo"><img src="/images/qxc_tu.gif" alt="'+decodeURI(EncodeUtf8('七星彩'))+'" /></span><span class="bet_head_zi">'+decodeURI(EncodeUtf8('七星彩投注'))+'</span>');
			  div2.html('<a href="/qixingcai.html"  title="'+decodeURI(EncodeUtf8('继续投注'))+'" >'+decodeURI(EncodeUtf8('继续投注')+'</a>'));
			  break;
		case "T01007":
			  div1.html('<span class="ssq_logo"><img src="/images/ssc_tu.gif" alt="'+decodeURI(EncodeUtf8('时时彩'))+'" /></span><span class="bet_head_zi">'+decodeURI(EncodeUtf8('时时彩投注'))+'</span>');
			  div2.html('<a href="/shishicai.html"  title="'+decodeURI(EncodeUtf8('继续投注'))+'" >'+decodeURI(EncodeUtf8('继续投注')+'</a>'));
			  break;
		case "T01010":
			  div1.html('<span class="ssq_logo"><img src="/images/11xuan5logo54.gif" alt="'+decodeURI(EncodeUtf8('11选5'))+'" /></span><span class="bet_head_zi">'+decodeURI(EncodeUtf8('11选5投注'))+'</span>');
			  div2.html('<a href="/11xuan5.html"  title="'+decodeURI(EncodeUtf8('继续投注'))+'" >'+decodeURI(EncodeUtf8('继续投注')+'</a>'));
			  break;
		case "T01012":
			  div1.html('<span class="ssq_logo"><img src="/images/syydjlogo54.gif" alt="'+decodeURI(EncodeUtf8('十一运夺金'))+'" /></span><span class="bet_head_zi">'+decodeURI(EncodeUtf8('十一运夺金投注'))+'</span>');
			  div2.html('<a href="/shiyiyunduojin.html"  title="'+decodeURI(EncodeUtf8('继续投注'))+'" >'+decodeURI(EncodeUtf8('继续投注')+'</a>'));
			  break;
		case "T01003":
			  div2.html('<a href="/zucaishengfu.html"  title="'+decodeURI(EncodeUtf8('继续投注'))+'" >'+decodeURI(EncodeUtf8('继续投注')+'</a>'));
			  break;
		case "T01004":
			  div2.html('<a href="/renxuan9chang.html"  title="'+decodeURI(EncodeUtf8('继续投注'))+'" >'+decodeURI(EncodeUtf8('继续投注')+'</a>'));
			  break;
		case "T01005":
			  div2.html('<a href="/4changjinqiu.html"  title="'+decodeURI(EncodeUtf8('继续投注'))+'" >'+decodeURI(EncodeUtf8('继续投注')+'</a>'));
			  break;
		case "T01006":
			  div2.html('<a href="/6changbanquan.html"  title="'+decodeURI(EncodeUtf8('继续投注'))+'" >'+decodeURI(EncodeUtf8('继续投注')+'</a>'));
			  break;
		  default:
			  div1.html('<span class="ssq_logo"><img src="/images/ssq_tu.gif" alt="'+decodeURI(EncodeUtf8('双色球'))+'" /></span><span class="bet_head_zi">'+decodeURI(EncodeUtf8('双色球投注'))+'</span>');
		  	  div2.html('<a href="/shuangseqiu.html" title="'+decodeURI(EncodeUtf8('继续投注'))+'" >'+decodeURI(EncodeUtf8('继续投注')+'</a>'));  
		  	  break;
		  }
		  

  }
  function goXiangqing(divname){
	  var key = GetQueryString("goUrl");
	  if(key.indexOf("_")>-1){
		 key =  key.replace(/\_/g,"&");
	  }
	  $("#"+divname).html("<a href="+key+" >"+decodeURI(EncodeUtf8("查看方案详情"))+"</a>");
	  
  }

  //当前时间格式化

// splitStr 是间隔符 如- / 2011-02-03 或者 2011/02/03 不传的话，就是20110203
  
  function getNowFormatDate(splitStr)
  {
	  
     var day = new Date();

     var Year = 0;
     var Month = 0;
     var Day = 0;
  var CurrentDate = "";
     //初始化时间
     //Year       = day.getYear();//有火狐下2008年显示108的bug
     Year       = day.getFullYear();//ie火狐下都可以
     Month      = day.getMonth()+1;
     Day        = day.getDate();
     CurrentDate += Year + splitStr;
     if (Month >= 10 )
     {
      CurrentDate += Month + splitStr;
     }
     else
     {
      CurrentDate += "0" + Month + splitStr;
     }
     if (Day >= 10 )
     {
      CurrentDate += Day ;
     }
     else
     {
      CurrentDate += "0" + Day ;
     }
     return CurrentDate;
  }	
  
//-----------offen.js--------------------------------
//***********************************************************************************//
//横切全部引用该js的html 
//使所有class为light的tag在mouseover的时候增加名为over的class
//并且在mouseout的时候移除名为over的class
//***********************************************************************************//

function HoverOver(n){n.addClass("over");}
function HoverOut(n) {n.removeClass("over");}

$(function() {
	$(".light").hover(function(){
		$(this).addClass("over");
	},
	function(){
		$(this).removeClass("over");
	});
});

//***********************************************************************************//
//横切全部引用该js的html 
//使所有class为lightTable的表格内 所有td在mouseover的时候增加名为over的class
//并且在mouseout的时候移除名为over的class
//***********************************************************************************//

$(function() {
	$(".lightTable td").hover(function(){
		$(this).addClass("over");
	},
	function(){
		$(this).removeClass("over");
	});
});
//***********************************************************************************//
//获取叫做ChannelBuyTab的dl下的dt 
//当某个dt被点击的时候清除所有同级dt的selected样式并且为当前点击tag增加selected样式 
//并获取该tag的ControlTarget属性 将ControlTarget的属性作为目标 
//获取和该值相同的class为其所有同级tag去掉selected样式之后 
//再为其增加名为selected的属性
//如果目标也拥有ControlTarget属性 则对其再循环上面的操作
//该js最多适用于2层tab
//***********************************************************************************//
$(function(){
	$(".ChannelBuyTab dt").click(function(){
		var ControlTarget = $(this).attr("ControlTarget");
		$(this).parent().children().removeClass("selected");
		$(this).addClass("selected");
		$("." + ControlTarget).parent().children().removeClass("selected");
		$("." + ControlTarget).addClass("selected");
		if( $("." + ControlTarget).attr("ControlTarget") ){
			var SecondControlTarget = $("." + ControlTarget).attr("ControlTarget");
			$("." + SecondControlTarget).parent().children().removeClass("selected");
			$("." + SecondControlTarget).addClass("selected");
			var ThirdControlTarget = $("." + SecondControlTarget).attr("ControlTarget");
			$("." + ThirdControlTarget).parent().children().removeClass("selected");
			$("." + ThirdControlTarget).addClass("selected");
			var LastControlTarget = $("." + ThirdControlTarget).attr("ControlTarget");
			$("." + LastControlTarget).parent().children().removeClass("selected");
			$("." + LastControlTarget).addClass("selected");
		}
		judgeCaizhong();
	});
}); 

//凡是带有WindowCenter样式的单位都会获得窗口居中并跟随滚动条及窗口大小改变的效果
//如果需要背景失焦层请在页面内添加<div class="BodyBG">&#160;</div>
$(function(){
	$(".BodyBG").css({'display':'none'});
	WindowCenter();
	window.onresize= WindowCenter;
	window.onscroll=WindowCenter;
	
	
});
function WindowCenter(){
	$(function(){
		$(".WindowCenter").each(function(){
			var PopUpWindowTop=(document.documentElement.clientHeight-$(this).height())/2+document.documentElement.scrollTop+document.body.scrollTop;
			var PopUpWindowLeft=(document.documentElement.clientWidth-$(this).width())/2+document.documentElement.scrollLeft;
			$(this).css({ 'position':'absolute','z-index':'999999','margin':'0','padding':'0',top:PopUpWindowTop+"px",left:PopUpWindowLeft+"px"});
		});
		if (window.innerWidth)
		{ winWidth = window.innerWidth; }
		else if ((document.body) && (document.body.clientWidth))
		{ winWidth = document.body.clientWidth; };
									   
		if (window.innerHeight)
		{ winHeight = window.innerHeight; }
		else if ((document.body) && (document.body.clientHeight))
		{ winHeight = document.body.clientHeight; };
		
		if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
		{ winHeight = document.documentElement.clientHeight; winWidth = document.documentElement.clientWidth; };
		
		if( winWidth < 950 )
		{ winWidth = 950; };
		
		if( winHeight < document.body.clientHeight )
		{ winHeight = document.body.clientHeight; };
		
		$(".BodyBG").css({
			'position':'absolute','left':'0px','top':'0px','z-index':'9999','width':'100%','background':'#000',opacity:0.4,
			'width':winWidth+'px','height':winHeight+'px'
		});
		
	});
};



//凡是带有WindowDrag样式的单位都会获得鼠标拖拽效果
$(function(){
	var x, y, i=1;
	$(".WindowDrag")
	.mouseover(function(){							//鼠标悬浮的动作开始↓
		$(this).css("cursor","move");  				//把鼠标的形状换成可移动十字图标
	})
	.mousedown(function(e){							//鼠标按下的动作开始↓
		if($(this).attr("ContorlTarget")){ var target = $(this).attr("ContorlTarget"); }
		else{ var target = $(this); }
		$(target).css({"z-index":"999999",opacity:0.8});				//把当前的模块设置为最前面
		var offset = $(this).offset();				//获取当前模块的坐标
		x = e.pageX - offset.left;					//计算当前模块和当前鼠标的相对位置
		y = e.pageY - offset.top;
		$(target).bind("mousemove",function(ev){	//绑定鼠标移动时的动作    
			var _x = ev.pageX - x;					//让当前模块跟着鼠标移动
			var _y = ev.pageY - y;
			$(this).css({"left":_x, "top":_y});   
		});
	})												
	.mouseup(function(){							//鼠标弹起的动作开始↓
		if($(this).attr("ContorlTarget")){ var target = $(this).attr("ContorlTarget"); }
		else{ var target = $(this); }
		$(target).unbind("mousemove");				//解绑鼠标移动功能
		$(target).css({"z-index":"99999",opacity:1});//还原模块优先级
	})												
	.mouseout(function(){							//鼠标移出的动作开始↓
//		$(target).unbind("mousemove");				//取消当前模块的鼠标移动事件     
//		$(target).css("z-index", 99999);			//还原模块优先级
	});	
});

//凡是引用onmouseover="PopupOn($(this))" onmouseout="PopupOff($(this))"方法的单位在鼠标放上去的时候都会出现悬浮框并且跟随鼠标移动(如果他自己有ControlTarget或者Content的话)
//当鼠标移出的时候消失 注意每个ControlTarget不可相同

function PopupOn(t){
	//初始化用到的变量
	var x,y=1;
	//如果对象有Content属性就把Content的内容加载到基础浮窗中(BasePopup)
	//是否有Content等这些判断只影响获取的被控制目标(target)
	//带有Content属性的对象触发的浮窗为js生成 当然 样式用了style标签内的level1选择器 这样方便修改 只要用更高一级的选择器即可覆盖这些默认效果 方便个性化样式
	if(t.attr("Content")){
		if($(".BasePopup").length<1){
			$("body").append("<style>.BasePopup{padding:5px; border:solid 1px #DEDEDE; background:#F5F5F5; color:#666666;}</style><div class='BasePopup' style='display:none;'>&#160;</div>");
		}
		var con = t.attr("Content");
		var target = $(".BasePopup");
		$(".BasePopup").html(con);
	}
	//如果没有Content属性就需要控制已有的悬浮窗显示和隐藏(ControlTarget内的对象)
	else if(t.attr("ControlTarget")){
		var target = t.attr("ControlTarget");
	}
	//成功根据触发者的属性获得所需的浮窗对象之后开始为触发者绑定事件使浮窗在触发者上时跟随鼠标并且显示
	//如果触发者没有Offset属性则默认浮窗显示在鼠标右上10像素处 如果写错Offset属性也会使用默认方式显示浮窗
	//反之Offset的属性规则是"位置,x轴偏移量,y轴偏移量"例如Offset="tr,10,-100"意思就是窗口再鼠标上方右侧10像素位置的基础上再向右10像素向上100像素
	if( $(target).attr("Offset")){				
		var Offset = $(target).attr("Offset");	//如果悬浮窗上有偏移属性(Offset),就会按照该偏移量来重置悬浮窗的显示和跟随位置
	}else{										
		var Offset = t.attr("Offset");			//如果悬浮窗上没有偏移属性(Offset),就会找触发者身上是否有偏移属性(Offset),如果有就是用它
	}
	
	t.bind("mousemove",function(ev){
		if( Offset && Offset.indexOf(",")!=-1 && Offset.split(",").length>=3 ){
			var tarw = Number($(target).width());
			var tarh = Number($(target).height());
			var offsetAspect = Offset.split(',')[0];
			var offsetX = Number(Offset.split(',')[1]);
			var offsetY = Number(Offset.split(',')[2]);
			if     ( offsetAspect == "tl"){ var x = ev.pageX - 10 - tarw + offsetX; var y = ev.pageY - 20 - tarh + offsetY; }						
			else if( offsetAspect == "tr"){ var x = ev.pageX + 10        + offsetX; var y = ev.pageY - 20 - tarh + offsetY; }	
			else if( offsetAspect == "bl"){ var x = ev.pageX - 10 - tarw + offsetX; var y = ev.pageY + 20        + offsetY; }	
			else                          { var x = ev.pageX + 10        + offsetX; var y = ev.pageY + 20        + offsetY; }	
		}else{
			var x = ev.pageX + 10; 
			var y = ev.pageY - 20 - $(target).height();
		}
		$(target).css({"position":"absolute","z-index":"9999","left":x, "top":y,"display":"block" }); 
	});
};
	
function PopupOff(t){
	if(t.attr("Content")){
		var target = $(".BasePopup");
	}else{
		var target = t.attr("ControlTarget");
	}
	t.unbind("mousemove");
	$(target).css("display","none")
};				


//基础tab样式 给某ul,ol,dl赋予BaseTab样式即可让其内部的li,dt,dd点击时候去掉兄弟姐妹的.selected并给自己加上.selected
$(function() {
	$(".BaseTab").children().click(function(){
		var ControlTarget = $(this).attr("ControlTarget")
		$(this).siblings().removeClass("selected").end().addClass("selected");
		$(ControlTarget).siblings().removeClass("selected").end().addClass("selected");
	});
});
function BaseTab(t) {
		var ControlTarget = t.attr("ControlTarget");
		t.siblings().removeClass("selected").end().addClass("selected");
		$(ControlTarget).siblings().removeClass("selected").end().addClass("selected");
};

//给.CopyToClipboard赋予点击后复制当前网页URL至剪贴板的功能
$(document).ready(function(){
	$(".CopyToClipboard").click(function(){
		var URLcontent = location.href;
		//判断Ie
		if (document.all){
			window.clipboardData.setData('text', URLcontent);
			alert("已成功复制方案链接至剪贴板！");
		}else{
			alert("您的浏览器不支持剪贴板操作，请换用IE或自行复制。");
		}
	});
});

//切换拥有Switcher样式的ControlTarget的class(class名为Switch)
$(function() {
	$(".Switcher").click(function(){
		var ControlTarget = $(this).attr("ControlTarget");
		$(ControlTarget).toggleClass("Switch");
	});
});
function Switch(n){$(n.attr("ControlTarget")).toggleClass("Switch");}

//如果是ie6的话 引用SelectKiller的元素mouseover时会隐藏页面内所有select等待mouseout后再显示
if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) { 
	$(function() {
		$(".SelectKiller").hover(function(){
			$("select").css("display","none");
		},
		function(){
			$("select").css("display","");
		});
	});
} 
//所有命名为MaxHeight的元素设置了MaxHeight值之后,如果高度超过这个值,则会超出隐藏
//例:<div class="MaxHeight" MaxHeight="80">最高80px</div>
$(function() {
	var HeightPX = $(".MaxHeight").attr("MaxHeight");
	if( $(".MaxHeight").lenght > 0 ){
		if( $(".MaxHeight").height() >= HeightPX){
			$(".MaxHeight").css({ height:HeightPX + "px" , overflow:"hidden" });
		}
	}
});

function BtnOver(n) {n.addClass("BtnOver");}
function BtnOut(n)  {n.removeClass("BtnOver").removeClass("BtnDown");}
function BtnDown(n) {n.addClass("BtnDown");}
function BtnUp(n)   {n.removeClass("BtnDown");}

$(function() {
	$(".BaseBtn")
	//拿到.BaseButton,鼠标悬停加ButtonOver,移出后移除ButtonOver,被按下时加ButtonDown,弹起后去掉ButtonDown
	.hover(function(){ $(this).addClass("BtnOver"); }, function(){ $(this).removeClass("BtnOver"); })
	.mousedown(function(){ $(this).addClass("BtnDown"); })
	.mouseup(function(){ $(this).removeClass("BtnDown"); });
});


//id  要改变样式的id   rclass 要替换的样式   aclass要添加的样式
function notRepeat(id,rclass,aclass){
	$("#"+id).removeClass(rclass);
	$("#"+id).addClass(aclass);
	$("#"+id).attr("disabled", true);
}

function repeat(id,rclass,aclass){
	$("#"+id).removeClass(rclass);
	$("#"+id).addClass(aclass);
	$("#"+id).attr("disabled",false);
}

function stopTrack(betCode,key,parameters){
	if(confirm(decodeURI(EncodeUtf8("您确定要终止该追号方案吗？")))){
		$.ajax({
			url: "/chlw/user/tuserinfoAction!cancelTrack?betCode="+betCode,//后台处理程序
			type:"POST",//数据发送方式
			dataType:'json',//接受数据格式
			success:function(data){
					$.ajax({
						url:urlArray[key],
						type:"POST",//数据发送方式
						data:parameters,//参数
						dataType:'json',//接受数据格式
						success:function(){	
								location.reload();
							},
						error:function(){
								location.reload();
							}
					});
				}
		});
	}
}
//自定义 map 类能满足  添加map 删除map元素 判空，取map 长度
function Map() {   
	  var struct = function(key, value) {   
		this.key = key;   
		this.value = value;   
	  };      
	  var put = function(key, value){   
		for (var i = 0; i < this.arr.length; i++) {   
		 if ( this.arr[i].key === key ) {   
		  this.arr[i].value = value;   
		  return;   
		  }   
		 }   
		 this.arr[this.arr.length] = new struct(key, value);   
	  };   
		
	  var get = function(key) {   
		for (var i = 0; i < this.arr.length; i++) {   
		 if ( this.arr[i].key === key ) {   
		   return this.arr[i].value;   
		  }   
		 }   
		return null;   
	  };   
		
	  var remove = function(key) {   
		var v;   
		for (var i = 0; i < this.arr.length; i++) {   
		  v = this.arr.pop();   
		 if ( v.key === key ) {   
		  continue;   
		  }   
		 this.arr.unshift(v);   
		 }   
	  };   
		
	  var size = function() {   
		return this.arr.length;   
	  };   
		
	  var isEmpty = function() {   
		return this.arr.length <= 0;   
	  };   
		
	  this.arr = new Array();   
	  this.get = get;   
	  this.put = put;   
	  this.remove = remove;   
	  this.size = size;   
	  this.isEmpty = isEmpty;   
}

function getMap(){
	
	return endTimeMap;
}
//使页面上有值的文本框的内容选中
function inputSelect (){
	
	$("input[type ='text']").each(function() {
		$(this).focus(function() {
			$(this).select();
			});
});
	
	
}
//四舍五入  v要处理的小数 e为保留位数
function round(v,e){
	var t=1;
	for(;e>0;t*=10,e--);
	for(;e<0;t/=10,e++);
	return Math.round(v*t)/t;
}

//选择追号期数的时候   期数列表自动更新
function setQishuList(key,parameters,loading,divId,lotno){
	if(Number($("#investField").text()) > 0){
		for(b in $.browser) if(b=='msie'){parameters=encodeURI(parameters)+"&msie=1";}
		$.ajax({
			url:urlArray[key],//后台处理程序
			type:"POST",//数据发送方式 'lotno=F47104&num="+
			data:"lotno="+lotno+"&num="+parameters,//参数
			dataType:'json',//接受数据格式
			beforeSend:function(){if(loading!=false){$("#"+divId).html('<img src="/images/loading.gif"  />');}},
			success:function(json){
				$("#"+divId).html('');
				var str ="<tr>";
				for(var j = 0 ; j < json.length ; j++){
					if( j%2 != 0 ){
					  		str += "<td><font class='chasenumber'>"+(j+1)+".</font>" +
					  				"<input name='baishucheckbox' id='c_"+json[j].batchcode+"' onclick='setValue("+json[j].batchcode+");' class='chasenumcheckbox' type='checkbox' value='"+json[j].batchcode+"_"+Number($('#tb_Multiple').val())+"_"+Number($('#investField').text())+"' checked />"
					  		+json[j].batchcode+decodeURI(EncodeUtf8("期"))+"<input name='' id='t_"+json[j].batchcode+"' value='"+Number($('#tb_Multiple').val())+"'" +
					  		"onkeyup=\"value=value.replace('０','0').replace('１','1').replace('２','2').replace('３', '3').replace('４','4').replace('５','5').replace('６','6').replace('７', '7').replace('８','8').replace('９','9');" +
			  				"changBeishu('t_"+json[j].batchcode+"',99,'m_"+json[j].batchcode+"'); \" value='"+Number($('#tb_Multiple').val())+"' class='chasenuminput' type='text' />"
					  		+decodeURI(EncodeUtf8("倍　￥"))+
					  		"<span id='m_"+json[j].batchcode+"'>"+Number($('#investField').text())+"</span>"+decodeURI(EncodeUtf8("元"))+"</td>" +
					  				"</tr><tr>"; 
					  	}else{
					  		str += "<td><font class='chasenumber'>"+(j+1)+".</font>" +
					  				"<input name='baishucheckbox' id='c_"+json[j].batchcode+"' onclick='setValue("+json[j].batchcode+");' class='chasenumcheckbox' type='checkbox' value='"+json[j].batchcode+"_"+Number($('#tb_Multiple').val())+"_"+Number($('#investField').text())+"' checked />"
					  		+json[j].batchcode+decodeURI(EncodeUtf8("期"))+"<input name='' id='t_"+json[j].batchcode+"' " +
					  				"onkeyup=\"value=value.replace('０','0').replace('１','1').replace('２','2').replace('３', '3').replace('４','4').replace('５','5').replace('６','6').replace('７', '7').replace('８','8').replace('９','9');" +
					  				"changBeishu('t_"+json[j].batchcode+"',99,'m_"+json[j].batchcode+"'); \" value='"+Number($('#tb_Multiple').val())+"' class='chasenuminput' type='text' />"
					  		+decodeURI(EncodeUtf8("倍　￥"))+
					  		"<span id='m_"+json[j].batchcode+"'>"+Number($('#investField').text())+"</span>"+decodeURI(EncodeUtf8("元"))+"</td>";
					  	}
					  
					}
				$("#"+divId).html(str);
				}		
		});
	}else{
		for(b in $.browser) if(b=='msie'){parameters=encodeURI(parameters)+"&msie=1";}
		$.ajax({
			url:urlArray[key],//后台处理程序
			type:"POST",//数据发送方式 'lotno=F47104&num="+
			data:"lotno="+lotno+"&num="+parameters,//参数
			dataType:'json',//接受数据格式
			beforeSend:function(){if(loading!=false){$("#"+divId).html('<img src="/images/loading.gif"  />');}},
			success:function(json){
				$("#"+divId).html('');
				var str ="<tr>";
				for(var j = 0 ; j < json.length ; j++){
					if( j%2 != 0 ){
					  		str += "<td><font class='chasenumber'>"+(j+1)+".</font>" +
					  				"<input name='baishucheckbox' id='c_"+json[j].batchcode+"' onclick='setValue("+json[j].batchcode+");' class='chasenumcheckbox' type='checkbox' value='"+json[j].batchcode+"_"+Number($('#tb_Multiple').val())+"_"+Number($('#investField').text())+"' checked />"
					  		+json[j].batchcode+decodeURI(EncodeUtf8("期"))+"<input name='' id='t_"+json[j].batchcode+"' value='"+Number($('#tb_Multiple').val())+"'" +
					  		"onkeyup=\"value=value.replace('０','0').replace('１','1').replace('２','2').replace('３', '3').replace('４','4').replace('５','5').replace('６','6').replace('７', '7').replace('８','8').replace('９','9');" +
			  				"changBeishu('t_"+json[j].batchcode+"',99,'m_"+json[j].batchcode+"'); \" value='"+Number($('#tb_Multiple').val())+"' class='chasenuminput' type='text' />"
					  		+decodeURI(EncodeUtf8("倍　￥"))+
					  		"<span id='m_"+json[j].batchcode+"'>"+Number($('#investField').text())+"</span>"+decodeURI(EncodeUtf8("元"))+"</td>" +
					  				"</tr><tr>"; 
					  	}else{
					  		str += "<td><font class='chasenumber'>"+(j+1)+".</font>" +
					  				"<input name='baishucheckbox' id='c_"+json[j].batchcode+"' onclick='setValue("+json[j].batchcode+");' class='chasenumcheckbox' type='checkbox' value='"+json[j].batchcode+"_"+Number($('#tb_Multiple').val())+"_"+Number($('#investField').text())+"' checked />"
					  		+json[j].batchcode+decodeURI(EncodeUtf8("期"))+"<input name='' id='t_"+json[j].batchcode+"' " +
					  				"onkeyup=\"value=value.replace('０','0').replace('１','1').replace('２','2').replace('３', '3').replace('４','4').replace('５','5').replace('６','6').replace('７', '7').replace('８','8').replace('９','9');" +
					  				"changBeishu('t_"+json[j].batchcode+"',99,'m_"+json[j].batchcode+"'); \" value='"+Number($('#tb_Multiple').val())+"' class='chasenuminput' type='text' />"
					  		+decodeURI(EncodeUtf8("倍　￥"))+
					  		"<span id='m_"+json[j].batchcode+"'>"+Number($('#investField').text())+"</span>"+decodeURI(EncodeUtf8("元"))+"</td>";
					  	}
					  
					}
				$("#"+divId).html(str);
				}		
		});
	}
	
	return false;
}

//倍数验证  百分数  并且计算金额
function changBeishu(id,num,divId){
	// 如用户倍数框留空，光标离开倍数输入框，则倍数输入框默认为1.
	var numInt = num;
	if($('#'+id).val()==''||$('#'+id).val()==undefined 
			|| $('#'+id).val()==null||Number($('#'+id).val())<=0){
		$('#'+id).val(1);
		$('#'+id).focus();
		$('#'+id).select();
	}
	//判断倍数是否在num倍之间
	
	if($("#lotNo").val() =='T01010' || $("#lotNo").val() =='T01007' || $("#lotNo").val() =='T01012'){
		numInt = 9999;
	}
	if(Number($('#'+id).val())> numInt){
		   $('#'+id).val(numInt);
		   $('#'+id).focus();
		   $('#'+id).select();
		} 
	//自动转换为半角，不支持标点、小数点以及英文字母等其他输入。
	 var pattern = /^-?\d+$/;
	if(isNaN($('#'+id).val()) || $('#'+id).val().search(pattern)!=0){
	    $('#'+id).val(1);
		$('#'+id).focus();
		$('#'+id).select();
		return false;
	}
	
	var 	money = Number($('#'+id).val())*Number($('#investField').text())/Number($('#tb_Multiple').val());
	$('#'+divId).html(money);
	var idstr = divId.split("_")[1];
	var noList = $("#c_"+idstr).val();
	
	if(noList.indexOf("_")>-1){
		var nolistStr = noList.split("_");
		$("#c_"+idstr).val(nolistStr[0]+"_"+ $('#'+id).val()+"_"+money);
	}
	return true;
}

function openTouzhu_dipin(){
	if(!touzhuPublic()){	
		return false;
	}
	//var koukuan = $("#fenqikoukuan").attr("className");
	
	if($("#fenqikoukuan").hasClass("selected")){
		$("#payType").val("0");
		if($("#zhuihaoDanqi1")!=null||$("#zhuihaoDanqi1")!=undefined){
			if($("#zhuihaoDanqi1").attr('checked')==true){
				$("#payStop").val("1");
			}else{
				$("#payStop").val("0");
			}
		}
		if($("#zhuihaoSms")!=null||$("#zhuihaoSms")!=undefined){
			if($("#zhuihaoSms").attr('checked')==true){
				$("#smsType").val("1");
			}else{
				$("#smsType").val("0");
			}
		}
	}else{
		$("#payType").val("1");
		if($("#zhuihaoDanqi2")!=null||$("#zhuihaoDanqi2")!=undefined){
			if($("#zhuihaoDanqi2").attr('checked')==true){
				$("#payStop").val("1");
			}else{
				$("#payStop").val("0");
			}
		}
		
	}
	//判断用户余额是否充足  (投注金额是否大于余额) 
	 var current_money = $("#investField").text();
	 var goumaifangshi=$("#goumaifangshi").val();//获取购买方式，如：代购  追号
		var isZhuihao=0;//获取购买方式，如：代购  追号
		if($("#isZhuihao") != null){
			isZhuihao = $("#isZhuihao").val();
			}
	 var zhuihaoqishu=1;
	 if(goumaifangshi==decodeURI(EncodeUtf8("追号")) || isZhuihao == 1){
	    	var noList = "";
			if( $('input[name="baishucheckbox"]') != null){
				$('input[name="baishucheckbox"]').each(function () {
					if ($(this).attr('checked')) {
						noList += $(this).val() + "$";
					}
				});
			}else{
				openAlert(decodeURI(EncodeUtf8("您好，您还没设置追号计划，请先进行设置！")));
	    		return false;
			
			}
			if(noList == ''){
				openAlert(decodeURI(EncodeUtf8("您好，您还没设置追号计划，请先进行设置！")));
	    		return false;
			}
			var allMoney = 0;
			var diyiqiMoney = 0;
			var zongqishu = 0;
			var kaishiQihao = "";
			if(noList.indexOf("$")>-1){
				var nolistStr = noList.split("$");
				for ( var i = 0; i < nolistStr.length; i++) {
					
					if(nolistStr[i].split("_")[2] != null && nolistStr[i].split("_")[2] != "undefinde"){
						if(i==0){
							diyiqiMoney = Number(nolistStr[i].split("_")[2]);
							kaishiQihao = nolistStr[i].split("_")[0];
						}
						allMoney += Number(nolistStr[i].split("_")[2]);
						zongqishu++;
					}
				}
			}
			
	    }
	 
    	var payType = $("#payType").val();
    	if(payType == "0"){
    		    current_money = diyiqiMoney;
    		    $("#allqiMoney").val(allMoney);
        	}else if(payType == "1"){
        		current_money = allMoney;
        		$("#allqiMoney").val(allMoney);
            }
    	$("#diyiqiMoney").val(diyiqiMoney);	
    	$("#diyiqiQihao").val(kaishiQihao);	
    	$("#zongQishu").val(zongqishu);	
	if(goumaifangshi==decodeURI(EncodeUtf8("追号")) || isZhuihao == 1){
		if(parseInt(current_money) > parseInt($("#touzhu_money").html())){         
			if(payType == "0"){
			    openAlert(decodeURI(EncodeUtf8("您好，您的余额不足以支付第一笔追号任务！")));
			}else{
				openAlert(decodeURI(EncodeUtf8("您好，您的余额不足以支付整个追号任务！")));	
			}
			return false;      
		}
		htmlMsg();//给 弹出层设置相关数据
		connPath();
		openStaticPopup("openTouzhu2",1000,"touzhuOpen2");
		$("#popupLayer_openTouzhu2").css({'top':800,'left':400}); 
		
	}else{
		current_money = $("#investField").text();
		if(parseInt(current_money) > parseInt($("#touzhu_money").html())){         
			openAjaxPopup("openTishi",1000,"/rules/tishi_gaopin.html?key=2&num=3");
			return false;      
		}
		htmlMsg();//给 弹出层设置相关数据
		connPath();
		openStaticPopup("openTouzhu",1000,"touzhuOpen1");
	}
}
//调用支付宝登录方法
function zfbLogin(){
	$.ajax({
		url:'/chlw/function/unitedLogin!alipayHandyLogin',
		type:"POST",//数据发送方式
		dataType:'html',
		error:function(){alert("error");},
		success:function(data){

			window.location.href=data;
			//window.open(data);
		}
	});

}


//设置 checkbox的值
function setValue(id){
	var noList = $("#c_"+id).val();
	if($("#c_"+id).attr("checked")==true){
		$("#t_"+id).removeAttr("disabled");
		if(noList.indexOf("_")>-1){
			var nolistStr = noList.split("_");
			$("#t_"+id).val(nolistStr[1]);
			$("#m_"+id).html(nolistStr[2]);
		}
		
	}else{
		$("#t_"+id).attr("disabled","true"); 
		$("#t_"+id).val(0);
		$("#m_"+id).html(0);
	}
	
}
//设置文本框的状态
function setTextType(id,mubiaoId){
	if($("#"+id).attr("checked")==true){
		$("#"+mubiaoId).removeAttr("disabled");
		$("#"+mubiaoId).val($("#"+id).val());
		
	}else{
		$("#"+mubiaoId).attr("disabled","true"); 
		$("#"+mubiaoId).val(0);
	}
	
}


//数字的验证
function checkBeishu(id,num){
	// 如用户倍数框留空，光标离开倍数输入框，则倍数输入框默认为1.
	
	if($('#'+id).val()==''||$('#'+id).val()==undefined 
			|| $('#'+id).val()==null||Number($('#'+id).val())<=0){
		$('#'+id).val(1);
		$('#'+id).focus();
		$('#'+id).select();
	}
	//判断倍数是否在num倍之间
	if(Number($('#'+id).val())> num){
		   $('#'+id).val(num);
		   $('#'+id).focus();
		   $('#'+id).select();
		} 
	//自动转换为半角，不支持标点、小数点以及英文字母等其他输入。
	 var pattern = /^-?\d+$/;
	if(isNaN($('#'+id).val()) || $('#'+id).val().search(pattern)!=0){
	    $('#'+id).val(1);
		$('#'+id).focus();
		$('#'+id).select();
		return false;
	}
	return true;
}

function closeImages(divId){
	$("#"+divId).css("display",'none');
}

//获取合买中心的公告
function getCaseNews(divId){
	$.ajax({
		url:'/include/hemaiCenter_gonggao.html',
		type:"POST",//数据发送方式
		dataType:'html',
		success:function(data){
			$("#"+divId).html(data);
		}
	});

}