var totalMoney = 0.00;
var totalLotteryInvest = 0;
var click = 0;
var betcode = "";

//选中的li添加样式
function add_css(li) {
	li.siblings().removeClass("numberlan");
	li.addClass("numberlan");
	$("#codes li").click(function() {
		var index = $("#codes li").index(this);
		$("#list_LotteryNumber > option").eq(index).attr("selected", true);
	});

}
//获取注码 并拼接提示层需要的号码样式
function addMouseOver(obj) {
	var index = $("#codes li").index(obj);
	var view = $("#list_LotteryNumber > option").eq(index).text();
	splitZhuma(view);

}
function splitZhuma(zhuma) {
	var zhumaStr = zhuma.split("|");
	var str;

	if ($("#caiZhong").val() == "dlt" && zhumaStr.length == 5) {
		str = '<span><font class="red1">[' + decodeURI(EncodeUtf8('前区|胆')) + ']</font><font>' + zhumaStr[0] + '</font></span><span class="tuolist"><font class="red2tuo">[' + decodeURI(EncodeUtf8('前区|拖')) + ']</font><font class="tuoma">' + zhumaStr[1] + ' </font></span><span><font class="blue">[' + decodeURI(EncodeUtf8('后区|胆')) + ']</font><font>' + zhumaStr[2] + '</font></span><span><font class="blue">[' + decodeURI(EncodeUtf8('后区|拖')) + ']</font><font>' + zhumaStr[3] + '</font></span><span>' + zhumaStr[4] + '</span>';
		if ((zhumaStr[0] + "," + zhumaStr[1] + "," + zhumaStr[2]).length > 26) {
			$(".touzhutk_nr").html(str);
			$(".touzhutk").css("display", "block");
		}

	} else if ($("#caiZhong").val() == "ssq" && zhumaStr.length == 4) {
		str = '<span><font class="red1">[' + decodeURI(EncodeUtf8('胆')) + ']</font><font>' + zhumaStr[0] + '</font></span><span><font class="red1">[' + decodeURI(EncodeUtf8('拖')) + ']</font><font>' + zhumaStr[1] + ' </font></span><span><font class="blue">[' + decodeURI(EncodeUtf8('蓝')) + ']</font><font>' + zhumaStr[2] + '</font></span><span>' + zhumaStr[3] + '</span>';

		if ((zhumaStr[0] + "," + zhumaStr[1] + "," + zhumaStr[2]).length > 53) {
			$(".touzhutk_nr").html(str);
			$(".touzhutk").css("display", "block");
		}

	} else if ($("#caiZhong").val() == "qlc" && zhumaStr.length == 3) {
		str = '<span><font class="red1">[' + decodeURI(EncodeUtf8('胆')) + ']</font><font>' + zhumaStr[0] + '</font></span><span><font class="red1">[' + decodeURI(EncodeUtf8('拖')) + ']</font><font>' + zhumaStr[1] + ' </font></span><span>' + zhumaStr[2] + '</span>';

		if ((zhumaStr[0] + "," + zhumaStr[1]).length > 51) {
			$(".touzhutk_nr").html(str);
			$(".touzhutk").css("display", "block");
		}

	} else if ($("#caiZhong").val() == "ssq" || $("#caiZhong").val() == "dlt" && zhumaStr.length == 3) {
		str = '<span class="tuolist"><font class="red2tuo">[' + decodeURI(EncodeUtf8('复式')) + ']</font><font class="tuoma">' + zhumaStr[0] + '|' + zhumaStr[1] + '</font></span><span>' + zhumaStr[2] + '</span>	';

		if ((zhumaStr[0] + "," + zhumaStr[1]).length > 60) {
			$(".touzhutk_nr").html(str);
			$(".touzhutk").css("display", "block");
		}

	} else if (zhumaStr.length == 4 && ($("#caiZhong").val() == "11xuan5" || $("#caiZhong").val() == "syydj")) {

		str = '<span class="tuolist"><font class="red2tuo">[' + zhumaStr[0] + ']</font><font class="tuoma">' + zhumaStr[1] + '|' + zhumaStr[2] + '</font></span><span>' + zhumaStr[3] + '</span>	';
		if ((zhumaStr[0] + zhumaStr[1] + zhumaStr[2]).length > 60) {
			$(".touzhutk_nr").html(str);
			$(".touzhutk").css("display", "block");
		}

	} else if (($("#caiZhong").val() == "11xuan5" || $("#caiZhong").val() == "syydj") && zhumaStr.length == 5) {
		str = '<span class="tuolist"><font class="red2tuo">[' + zhumaStr[0] + ']</font><font class="tuoma">' + zhumaStr[1] + '|' + zhumaStr[2] + '|' + zhumaStr[3] + '</font></span><span>' + zhumaStr[4] + '</span>	';
		if ((zhumaStr[0] + zhumaStr[1] + zhumaStr[2] + zhumaStr[3]).length > 60) {
			$(".touzhutk_nr").html(str);
			$(".touzhutk").css("display", "block");
		}

	} else if ($("#caiZhong").val() == "3D" || $("#caiZhong").val() == "pls") {

		str = '<span class="tuolist"><font class="red2tuo">[' + zhumaStr[0] + ']</font><font class="tuoma">' + zhumaStr[1] + '</font></span><span>' + zhumaStr[2] + '</span>	';
		if (zhuma.indexOf(decodeURI(EncodeUtf8('复式'))) < 0) {
			if ((zhumaStr[0] + zhumaStr[1]).length > 65 && zhumaStr.length == 3) {
				$(".touzhutk_nr").html(str);
				$(".touzhutk").css("display", "block");

			}
		}

	} else if ($("#caiZhong").val() == "ssc") {
		str = '<span class="tuolist"><font class="red2tuo">' + zhumaStr[0] + '</font></span><span>' + zhumaStr[1] + '</font></span><span>' + zhumaStr[2] + '</span>	';
		if ((zhumaStr[0] + zhumaStr[1]).length > 70 && zhumaStr.length == 3) {
			$(".touzhutk_nr").html(str);
			$(".touzhutk").css("display", "block");

		}

	} else {
		str = '<span class="tuolist"><font class="red2tuo">[' + decodeURI(EncodeUtf8('复式')) + ']</font><font class="tuoma">' + zhumaStr[0] + '</font></span><span>' + zhumaStr[1] + '</span>	';
		if (zhumaStr[0].length > 60) {
			$(".touzhutk_nr").html(str);
			$(".touzhutk").css("display", "block");

		}
	}

}
//鼠标移除li时 隐藏提示层
function mouseOut() {
	$(".touzhutk").css("display", "none");
}
//层随鼠标移动的事件
function initMouseMove() {
	if (!document.all) {
		document.captureEvents(Event.MOUSEMOVE);
	}
	document.onmousemove = mouseMove;
}
function mouseMove(e) {
	var x, y;
	if (!document.all) {
		x = e.pageX;
		y = e.pageY;
	} else {
		x = document.body.scrollLeft + event.clientX + document.documentElement.scrollLeft;
		y = document.body.scrollTop + event.clientY + document.documentElement.scrollTop;
	}
	$(".touzhutk").css("left", x);
	$(".touzhutk").css("top", y);
}
//添加号码到新的选择器中
function add_codes(lotteryView, lotteryNumber) {
	var $li = $('<li onmouseover="add_css($(this)),initMouseMove(),addMouseOver($(this));" onmouseout="mouseOut()" class="numberlan"><div class="numberhao" onclick=getZhumaView("' + lotteryNumber + '");' + '>' + lotteryView + ' </div> <span class="numberdel"><a href="javascript:btn_ClearSelectClick()" id="btn_ClearSelect" title="' + decodeURI(EncodeUtf8('删除')) + '">' + decodeURI(EncodeUtf8('删除')) + '</a></span> </li>');
	$("#codes").append($li);
}


function btn_ClearClick() {
	$("option", $("#list_LotteryNumber")).remove();
	$("#codes li").remove();
	totalMoney = 0;
	totalLotteryInvest = 0;
	$("#lab_Num").html(0);
	$("#investField").html("0");
	$("#current_money").html("0");
	$("#tb_Multiple").val(1);
	//调用公共方法让购彩以后的金额得到并将其转换为两位小数
	getFinalMoney();
	clearDIV();
	if ($("#daiGouHemai") != null && $("#qishuList") != null && ($("#daiGouHemai").val() == "zhuihao" || $("#daiGouHemai").val() == "ziyouZhuihao")) {
		setQishuList(55, $('#betchZhuihaoNum').val(), false, 'qishuList', $('#lotNo').val());
	}
	chooseBallToMoney();
}

// 倍数验证
function multipleValidate() {
	// 如用户倍数框留空，光标离开倍数输入框，则倍数输入框默认为1.
	if ($("#codes li").length == 0) {
		$("#tb_Multiple").val("1");
		openAlert(decodeURI(EncodeUtf8("您还没有输入投注内容。")));
		return false;
	}
	if ($('#tb_Multiple').val() == '' || $('#tb_Multiple').val() == undefined || $('#tb_Multiple').val() == null || Number($('#tb_Multiple').val()) <= 0) {
		$('#tb_Multiple').val(1);
		$('#tb_Multiple').focus();
		$('#tb_Multiple').select();
	}

	//判断倍数是否在1-99倍之间(体彩99倍，福彩50倍)
	if (Number($('#tb_Multiple').val()) > 99) {
		$('#tb_Multiple').val(99);
		$('#tb_Multiple').focus();
		$('#tb_Multiple').select();
	}

	//自动转换为半角，不支持标点、小数点以及英文字母等其他输入。
	var pattern = /^-?\d+$/;
	if (isNaN($('#tb_Multiple').val()) || $('#tb_Multiple').val().search(pattern) != 0) {
		$('#tb_Multiple').val(1);
		$('#tb_Multiple').focus();
		$('#tb_Multiple').select();
		return false;
	}
	if ($("#daiGouHemai") != null && $("#qishuList") != null && ($("#daiGouHemai").val() == "zhuihao" || $("#daiGouHemai").val() == "ziyouZhuihao")) {
		setQishuList(55, $('#betchZhuihaoNum').val(), false, 'qishuList', $('#lotNo').val());
	}
	return true;
}

// 所有投注的公共方法

function touzhuPublic() {

	//清空投注登录框
	$("#mobilePOP").val("");
	$("#passwordPOP").val("");
	$("#validatePOP").val("");
	//得到下拉列表的值
	if ($("#list_LotteryNumber option").length == 0) {
		openAlert(decodeURI(EncodeUtf8("请您至少选择一注号码后再购买！")));
		return false;
	}
	if ($("#lotNo").val() == "J00001" || $("#lotNo").val() == "J00005"|| $("#lotNo").val() == "J00006"|| $("#lotNo").val() == "J00007"|| $("#lotNo").val() == "J00008") {
		if ($("#matchNum").html() < 2) {
			openAlert(decodeURI(EncodeUtf8("您好，请至少选择2场比赛！")));
			return false;
		}
		if ($("#allWanfa").val() == "" || $("#allWanfa").val() == "|") {
			openAlert(decodeURI(EncodeUtf8("您好，请选择过关方式！")));
			return false;
		}
	}

	//判断协议是否选中
	if ($("#xieyi") != null || $("#xieyi") != undefined) {
		if ($("#xieyi").attr('checked') == false) {
			openAlert(decodeURI(EncodeUtf8("请您同意用户代购合买协议！")));
			return false;
		}
	}
	//判断单个方案不能超过2万元
	if ($("#current_money").html() != null || $("#current_money").html() != undefined) {
		if ($("#current_money").html() > 20000 && $("#lotNo").val() != "T01007") {
			openAlert(decodeURI(EncodeUtf8("您好，单个方案金额不能超过2万元！")));
			return false;
		}
	}

	//判断用户是否登录       
	if (!isLogin()) {

		$("#touzhu_money").html(0);
		$("#final_money").html(0);
		//弹出层
		loginRequrl();
		return false;
	}

	return true;
}

//执行普通投注功能
function touzhu() {
	//判断条件是否返回true
	if (!touzhuPublic()) {
		return false;
	}

	var betcode = "";
	var wanfa = "";
	var i = 0;
	var lotno = $("#lotNo").val();
	var qihao = $("#qihao").text();

	while ($("#list_LotteryNumber option:eq(" + i + ")").length > 0) {
		if ($("#list_LotteryNumber option:eq(" + i + ")").attr("wangFang") == "") {
			var wanfa = saleMa();
			if (wanfa.indexOf("|") != -1) {
				for (var k = 0; k < wanfa.split("|").length; k++) {
					wanfa += wanfa.split("|")[k] + "+";
				}
			} else {
				wanfa = wanfa + "+";
			}
		} else {
			wanfa += $("#list_LotteryNumber option:eq(" + i + ")").attr("wangFang") + "+";
		}

		if (lotno == "J00001" || lotno == "J00005"|| $("#lotNo").val() == "J00006"|| $("#lotNo").val() == "J00007"|| $("#lotNo").val() == "J00008") {
			betcode += wanfa + $("#list_LotteryNumber option:eq(" + i + ")").val();
		} else {
			betcode += $("#list_LotteryNumber option:eq(" + i + ")").val();
		}

		i++;
	}
	
	wanfa = wanfa.substring(0, wanfa.length - 1);

	var jsonString = "{betcode:\"" + betcode + "\",lotno:\"" + lotno + "\",wanfa:\"" + wanfa + "\",qihao:\"" + qihao + "\"}";
	$("#jsonString").val(jsonString);
	$("#BettingForm").submit();
}
//初始化投注页面的所有金额以及登录状态
function touzhuInitStatic() {

	//初始化所有彩种
	//initLotno();

	if (isLogin()) { //登录情况下
		//设置第一行

		$("#loginStaticInTouZhu").html('&#8220;<span id="this_username"></span>&#8221;' + decodeURI(EncodeUtf8('，您的账户余额为')) + '<span class="red">¥' + '</span><span id="touzhu_money" class="red">' + touzhu_balance + '</span>' + decodeURI(EncodeUtf8('元 ')) + '<a href="javascript:;" id="refresh_touzhu_money" onclick="refresh_touzhu_panle()" style="display:none;cursor:pointer;">刷新金额</a>' + decodeURI(EncodeUtf8('【')) + '<span class="buy_blue"><a href="javascript:;"  onclick="refresh_touzhu_button();" title="' + decodeURI(EncodeUtf8('立即充值')) + '">' + decodeURI(EncodeUtf8('立即充值')) + '</a></span>' + decodeURI(EncodeUtf8('】')));
		balanceDivDis("touzhu_money", "", "");
		//设置第二行
		$("#loginStaticInMoney").html(decodeURI(EncodeUtf8('本次投注金额为')) + '<span class="buy_red" id="current_money">0</span>' + decodeURI(EncodeUtf8('元，购买后您的账户余额为')) + '<span class="buy_red" id="final_money">' + touzhu_balance + '</span>' + decodeURI(EncodeUtf8('元')));
		$("#loginStaticInMoney").css("display", "none");
		$("#userDivDis").css("display", "block");
		$("#userDivNone").css("display", "none");
	}
}
//添加刷新按钮
function refresh_touzhu_button() {
	$("#refresh_touzhu_money").css('display', '');
	window.open('/rules/user.html?key=4');
}
function refresh_touzhu_panle() {
	$.ajax({
		url: '/chlw/ajax/selectAll!ajaxFindAccount',
		type: 'post',
		//数据发送方式   
		async: false,
		dataType: 'json',
		success: function(msg) {
			$('#touzhu_money').html(msg.deposit_amount); //deposit_amount 底部的可用余额
			$('#topLogin_money').html(msg.deposit_amount); //deposit_amount头部的 可用余额
			$("#refresh_touzhu_money").css('display', 'none');
		}
	});
}
//--------- 原DIV_SHOW.js 文件内容------------------
//导航栏切换  idname id的名字   hout 鼠标离开时的样式  hover 鼠标悬停时或点击是的样式   length 要切换的div的个数 此方法移至util.js

//两层之间显示与隐藏

function divBlock(divXS, divYC, divUp) {
	$(divXS).css('display', 'block');
	$(divYC).css('display', 'none');
	$(divUp).css('display', 'none');
	if ($("#caiZhong").val() == '3D') {
		clear();
	}
}

function daiGou_heMai() {
	//$("#daiGou").attr('checked')==undefined
	if ($("#daiGou").attr('checked') == true) {
		$("#betchNum option").remove();
		$("#betchNum").append('<option value="1">1</option>');
		$("#gmzh_text").text(decodeURI(EncodeUtf8("由购买人自行全额购买彩票")));
		$("#zuiHaoDIV").hide();
	} else if ($("#zuiHao").attr('checked') == true) {
		$("#betchNum option").remove();
		$('#betchNum').append('<option value="5">5</option><option value="10">10</option><option value="20">20</option><option value="30">30</option><option value="50">50</option><option value="99">99</option>');
		$("#gmzh_text").text(decodeURI(EncodeUtf8("连续多期购买同一注（组）号码。")));
		$("#zuiHaoDIV").show();

	}
}

//按clen长度生成随机号码
function RandCode(clen, Number) {
	var rsl = "";
	while (rsl.length < clen) {
		var va = Math.ceil(Math.random() * Number - 1);
		rsl += va;
	}
	return rsl;
}

function init() {
	var view = GetQueryString("view");
	$("#" + view).attr("class", "expanded");

}

//频道页悬停时显示颜色
function getColor(sender, classOver, classOut) {
	if (sender.className == classOver) {
		sender.className = classOut;
	}
}

//重庆时时彩彩种页左侧的开奖公告
function compare() {
	if ($("#date").val() < ($("#qihao").text() - 1)) {
		$("#tremDate").text($("#qihao").text() - 1);
		$("#openDate").text(decodeURI(EncodeUtf8("未开奖")));
		$("#lotteryCode").text(decodeURI(EncodeUtf8("等待开奖")));
		$("#lotteryCode").css("color", "red");
	}
}

//删除---623----
function btn_ClearSelectdanshi(okNum, rmb) {
	$("option:selected", $("#list_LotteryNumber")).remove();
	$("#codes li.numberlan").remove();
	var resNum = parseInt($("#lab_Num").html()) - parseInt(okNum);
	var resField = parseInt($("#investField").html()) - parseInt(rmb);
	$("#lab_Num").text(resNum);
	$("#investField").text(resField);
	$("#current_money").text(resField);
	$.ajax({
		type: "POST",
		url: "/chlw/function/upload!deleteFile?path=" + path
	});

}
//删除---623----
function btn_ClearSelectdanshio(okNum, rmb, path) {
	var multiple = Number($("#tb_Multiple").val());
	$("option:selected", $("#list_LotteryNumber")).remove();
	$("#codes li.numberlan").remove();
	var resNum = Number($("#lab_Num").html()) - Number(okNum);
	var resField = 0;
	if ($("#oneMoney").attr("checked") == true && $("#zhuijia").is(":visible")) {
		resField = Number($("#investField").html()) - Number(rmb) * multiple * 3 / 2;
	} else {
		resField = Number($("#investField").html()) - Number(rmb) * multiple;
	}

	$("#lab_Num").text(resNum);
	$("#investField").text(resField);
	$("#current_money").text(resField);
	if ($("#codes li").length == 0) {
		$("#tb_Multiple").val("1");
	}
	$.ajax({
		type: "POST",
		url: "/chlw/function/upload!deleteFile?path=" + path
	});

}

//初始化注数和投注金额
function init_touzhu() {
	totalLotteryInvest += parseInt($("#lab_Num").html());
	totalMoney += parseInt($("#investField").html());
}

function getCodesSort(arr) {
	//将传入的注码转换为string格式根据“,”拆分并将其放入数组中排序
	var arrCodes = (arr + "").split(",");
	var arrCode = new Array();
	for (var i = 0; i < arrCodes.length; i++) {
		if (arrCodes[i] == "") {
			continue;
		}
		arrCode.push(arrCodes[i]);
	}
	arrCode.sort();
	return arrCode;
}
//根据参数获取号码球
function GetBallNum(i) {
	var BallNum = "" + i;
	if (BallNum.length == 1) BallNum = "0" + BallNum;

	return BallNum;
}

function norepeat(aa) {
	//$(aa).removeClass("queding_btn1");
	$(aa).attr("class","BtnDisableNew");
	$(aa).val("");
	$(aa).attr("disabled", true);
}

function clearDIV() {
	if ($("#zhuihaoDIV") != null) {

		$("#zhuihaoDIV").html("");

		$("#zhuihaoJson").val('');
	}
}
function setdaigouOrzhuihao(a) {
	if ($("#daiGouHemai") != null && $("#daiGouHemai") != "undefinde") {
		$("#daiGouHemai").val(a);
	}
	if ($("#daiGouHemai") != null && $("#qishuList") != null && ($("#daiGouHemai").val() == "zhuihao" || $("#daiGouHemai").val() == "ziyouZhuihao")) {
		setQishuList(55, $('#betchZhuihaoNum').val(), false, 'qishuList', $('#lotNo').val());
	}
}


//获取对阵
function getDuizhen(type,valueType){
	$.ajax({
		url:"/jclq/SelectDZ.do?loton="+$("#lotNo").val()+"&type="+type+"&valueType="+valueType,//后台处理程序
		type:"POST",//数据发送方式
		dataType:'html',//接受数据格式
		success:function(data){
			//alert(data);
			$("#duizhen").html(data);
			}
		
		
	});
	
}
//请求后台获取对阵的方法
function getLottery(){
	var parameters ="loton=&"+ $("#lotteryInfo").serialize();
	var showClass=$("#showClass").val();
	$.ajax({
		url:"/jclq/selectSG.do",//后台处理程序
		type:"POST",//数据发送方式
		data:parameters,
		dataType:'html',//接受数据格式
		success:function(data){
			$("#info").html(data);
			$(showClass).siblings().removeClass("selected").end().addClass("selected");
			}
		
		
	});
	
}
//封装单关多关切换使用的方法
function SwicthWF(type,wanfa){
	getDuizhen("0",type);
	cleanReady();
	if(wanfa='0'){
		$("#allWanfa").val("|单关");
	}else if(wanfa='1'){
		$("#allWanfa").val("");
	}
	
}
