/*2012年5月3号注释掉，原因：搜索到没有用着
 * //请求后台获取对阵的方法
function getDuiZhen(loton){
	$.ajax({
		url:"/jclq/SelectDZ.do?loton="+loton,//后台处理程序
		type:"POST",//数据发送方式
		dataType:'html',//接受数据格式
		success:function(data){
			alert(data);
			$("#daxiaofen").html(data);
			}
		
		
	});
	
}
//切换标签的选中状态
//selected:选中时对象使用的class
//nonselect：没有选中时对象使用的class
function changStatue(obj,selected,nonselect){
	objsiblings().removeClass(nonselect).end().addClass(selected);
	obj.siblings().removeClass(selected).end().addClass(nonselect);
	
}*/
//加载页面时的清空操作
function cleanReady() {
	$("option", $("#list_LotteryNumber")).remove();
	$("#codes li.numberlan").remove();
	$("#choose_list tr").remove();
	$("#choose_list").append("<tr><th>序号</th><th>主队</th><th>投注</th><!-- <th>胆</th> --></tr>");
	$("input[name='checkbox']").attr("checked", false);
	$("#matchNum").html(0);
	$("#lab_Num_standrad").text(0);
	$("#investField_standrad").text(0);
	$("#current_money").html(0);
}


//倍数验证
function multipleValidate() {
	// 如用户倍数框留空，光标离开倍数输入框，则倍数输入框默认为1.
	if ($('#tb_Multiple_standrad').val() == '' || $('#tb_Multiple_standrad').val() == undefined || $('#tb_Multiple_standrad').val() == null || Number($('#tb_Multiple_standrad').val()) <= 0) {
		$('#tb_Multiple_standrad').val(1);
		$("#tb_Multiple").val(1);
		$('#tb_Multiple_standrad').focus();
		$('#tb_Multiple_standrad').select();
	}

	//判断倍数是否在1-9999倍之间
	if (Number($('#tb_Multiple_standrad').val()) > 9999) {
		$('#tb_Multiple_standrad').val(9999);
		$("#tb_Multiple").val(9999);
		$('#tb_Multiple_standrad').focus();
		$('#tb_Multiple_standrad').select();
	}

	//自动转换为半角，不支持标点、小数点以及英文字母等其他输入。
	var pattern = /^-?\d+$/;
	if (isNaN($('#tb_Multiple_standrad').val()) || $('#tb_Multiple_standrad').val().search(pattern) != 0) {
		$('#tb_Multiple_standrad').val(1);
		$("#tb_Multiple").val(1);
		$('#tb_Multiple_standrad').focus();
		$('#tb_Multiple_standrad').select();
		return false;
	}
	return true;
}

//修改总金额
function updateMultipleTotalMoney() {
	var zhuShu = Number($("#lab_Num_standrad").html());
	var beishu = $("#tb_Multiple_standrad").attr("value");
	$("#tb_Multiple").val(beishu);
	totalMoney = parseInt(2 * beishu * zhuShu);
	$("#investField_standrad").html(totalMoney);
	$("#current_money").html(totalMoney);
	if (parseInt(($("#touzhu_money").html()) - ($("#current_money").html())) < 0) {
		$("#final_money").html("0");
	} else {
		$("#final_money").html(parseInt(($("#touzhu_money").html()) - ($("#current_money").html())));
	}
}

//基本计算

//阶乘
function multiplyByStep(m, n) {
	if (m < 0 || n < 0) {
		return - 1;
	}
	var result = 1;

	if (m >= n) {
		for (var i = n; i <= m; i++) {
			result = result * i;
		}
	} else {
		for (var i = m; i <= n; i++) {
			result = result * i;
		}
	}
	return result;
}

//幂运算
function exp(d, z) {
	var result = 1;
	for (var i = 0; i < z; i++) {
		result = result * d;
	}
	return result;
}

//组合公式
function nchoosek(n, k) {
	if (n <= 0 || k < 0 || n < k) {
		return - 1;
	}
	if (k == 0 || n == k) {
		return 1;
	}
	if (k > n / 2) {
		k = n - k;
	}
	var result = multiplyByStep(n, n - k + 1) / multiplyByStep(k, 1);
	return result;
}

/* var a = [1, 2, 3];
 	document.write('<h1>'+a.join()+'里选3个进行排列组合的实例如下：</h1>');
 	document.write('<h1>排列</h1><ol><li>' + combAndArrange(a, 3, 'p').join('</li><li>') + '</li></ol>');
 	document.write('<h1>组合</h1><ol><li>' + combAndArrange(a, 3, 'c').join('</li><li>') + '</li></ol>');
 */
function combAndArrange(a, r, t) {

	function arrangeFirst(arr) {
		var len = arr.length;
		if (len == 2) {
			var a = arr[0],
			b = arr[1];
			return [a + b, b + a];
		} else if (len == 1) {
			return arr;
		} else {
			var strRtn = "";
			for (var i = 0; i < len; i++) {
				strRtn += merge(arr[i], arguments.callee(arr.slice(0, i).concat(arr.slice(i + 1, len)))).join(" , ") + " , ";
			}
			return strRtn.replace(/ \,$ /, "").split(" , ");
		}

		function merge(head, arr) {
			for (var i = 0; i < arr.length; i++) {
				arr[i] = head + arr[i];
			}
			return arr;
		}
	}

	function arrange(o, r) {
		var result = [];
		while (o.length) {
			var tmp = o.pop();
			if (tmp.length == r) result.push(tmp);
		}
		return result;
	}

	function combination(a, r, s) {
		var ret = [];
		s = s || [];

		if (r == 0) {
			return [s];
		}

		for (var i = 0; i <= a.length - r; i++) {
			ret = ret.concat(arguments.callee(a.slice(i + 1), r - 1, s.slice(0).concat(a[i])));
		}
		return ret;
	}
	var la = combination(a, r);

	if (t == "c") {
		return la;
	} else if (t == "p") {
		var pret = [];
		for (var j = 0,
		l = la.length; j < l; j++) {
			Array.prototype.push.apply(pret, arrange(arrangeFirst(la[j].join("-").split("-")), r));
		}
		return pret;
	}
}
function chuan1_1(a) {
	/*var chuan1_1 = combAndArrange(a, 1, 'c');*/
	var ji = 0;
	for (var m = 0; m < a.length; m++) {
		ji+=a[m];
	}
	return ji;
}
function chuan2_1(a) {
	var chuan2_1 = combAndArrange(a, 2, 'c');
	var k = [];
	var ji = 0;
	for (var m = 0; m < chuan2_1.length; m++) {
		k = chuan2_1[m].toString().replace(',', '*').split("*");
		var keke = 0;
		for (var n = 0; n < k.length - 1; n += 2) {
			keke = Number(k[n]) * Number(k[n + 1]);
		}
		ji += keke;
	}
	return ji;
}
function chuan3_1(a) {
	var chuan3_1 = combAndArrange(a, 3, 'c');
	var k = [];
	var ji = 0;
	for (var m = 0; m < chuan3_1.length; m++) {
		k = chuan3_1[m].toString().replace(/\,/g, '*').split("*");
		var keke = 0;
		for (var n = 0; n < k.length - 1; n += 3) {
			keke = Number(k[n]) * Number(k[n + 1]) * Number(k[n + 2]);
		}
		ji += keke;
	}
	return ji;
}
function chuan4_1(a) {
	var chuan4_1 = combAndArrange(a, 4, 'c');
	var k = [];
	var ji = 0;
	for (var m = 0; m < chuan4_1.length; m++) {
		k = chuan4_1[m].toString().replace(/\,/g, '*').split("*");
		var keke = 0;
		for (var n = 0; n < k.length - 1; n += 4) {
			keke = Number(k[n]) * Number(k[n + 1]) * Number(k[n + 2]) * Number(k[n + 3]);
		}
		ji += keke;
	}
	return ji;
}
function chuan5_1(a) {
	var chuan5_1 = combAndArrange(a, 5, 'c');
	var k = [];
	var ji = 0;
	for (var m = 0; m < chuan5_1.length; m++) {
		k = chuan5_1[m].toString().replace(/\,/g, '*').split("*");
		var keke = 0;
		for (var n = 0; n < k.length - 1; n += 5) {
			keke = Number(k[n]) * Number(k[n + 1]) * Number(k[n + 2]) * Number(k[n + 3]) * Number(k[n + 4]);
		}
		ji += keke;
	}
	return ji;
}
function chuan6_1(a) {
	var chuan6_1 = combAndArrange(a, 6, 'c');
	var k = [];
	var ji = 0;
	for (var m = 0; m < chuan6_1.length; m++) {
		k = chuan6_1[m].toString().replace(/\,/g, '*').split("*");
		var keke = 0;
		for (var n = 0; n < k.length - 1; n += 6) {
			keke = Number(k[n]) * Number(k[n + 1]) * Number(k[n + 2]) * Number(k[n + 3]) * Number(k[n + 4]) * Number(k[n + 5]);
		}
		ji += keke;
	}
	return ji;
}
function chuan7_1(a) {
	var chuan7_1 = combAndArrange(a, 7, 'c');
	var k = [];
	var ji = 0;
	for (var m = 0; m < chuan7_1.length; m++) {
		k = chuan7_1[m].toString().replace(/\,/g, '*').split("*");
		var keke = 0;
		for (var n = 0; n < k.length - 1; n += 7) {
			keke = Number(k[n]) * Number(k[n + 1]) * Number(k[n + 2]) * Number(k[n + 3]) * Number(k[n + 4]) * Number(k[n + 5]) * Number(k[n + 6]);
		}
		ji += keke;
	}
	return ji;
}
function chuan8_1(a) {
	var chuan8_1 = combAndArrange(a, 8, 'c');
	var k = [];
	var ji = 0;
	for (var m = 0; m < chuan8_1.length; m++) {
		k = chuan8_1[m].toString().replace(/\,/g, '*').split("*");
		var keke = 0;
		for (var n = 0; n < k.length - 1; n += 8) {
			keke = Number(k[n]) * Number(k[n + 1]) * Number(k[n + 2]) * Number(k[n + 3]) * Number(k[n + 4]) * Number(k[n + 5]) * Number(k[n + 6]) * Number(k[n + 7]);
		}
		ji += keke;
	}
	return ji;
}

//n 为过关方式 比如：2串1,getNum为选的结果数的数组
function guoGuanWays(wanfa, key) {
	//注数
	var zhushu;
	//设置三级玩法,key为0时不设置，为1时设置
	if (key == 0) {
		zhushu = 0;
	} else if (key == 1) {
		if (wanfa == "|2串1" || wanfa == "|3串1" || wanfa == "|4串1" || wanfa == "|5串1" || wanfa == "|6串1" || wanfa == "|7串1" || wanfa == "|8串1") {
			var setWanfa = $("#allWanfa").val();
			if ($("#r" + wanfa.substring(1, 2) + "c" + wanfa.substring(wanfa.indexOf('串') + 1)).hasClass("Switch")) {
				if ($("#allWanfa").val().indexOf(wanfa.substring(1)) != -1) {
					$("#allWanfa").val(setWanfa);
				} else {
					setWanfa = setWanfa + "|" + wanfa.substring(1);
					$("#allWanfa").val(setWanfa);
				}
			} else {
				setWanfa = setWanfa.substring(0, setWanfa.indexOf(wanfa.substring(1)) - 1) + setWanfa.substring(setWanfa.indexOf(wanfa.substring(1)) + wanfa.substring(1).length);
				$("#allWanfa").val(setWanfa);
			}

			zhushu = Number($("#lab_Num_standrad").html());
		} else if (wanfa == "") {
			$("#allWanfa").val();
			zhushu = 0;
		} else {
			var setWanfa = wanfa;
			$("#allWanfa").val(setWanfa);
			zhushu = 0;
		}
	}

	//得到注码
	var view = $("#list_LotteryNumber > option").text();
	var singleMatch = view.split("^");
	var getNum = [];
	for (var i = 0; i < singleMatch.length - 1; i++) {
		var num = singleMatch[i].split("|")[3].length;
		if($("#lotNo").val() == "J00007"){
			getNum[i] = num/2;
		}else{
			getNum[i] = num;
		}
	}

	var beishu = $("#tb_Multiple_standrad").attr("value");
	$("#tb_Multiple").val(beishu);

	//自由过关的变量
	var zhushu2_1 = 0,
	zhushu1_1 = 0,
	zhushu3_1 = 0,
	zhushu4_1 = 0,
	zhushu5_1 = 0,
	zhushu6_1 = 0,
	zhushu7_1 = 0,
	zhushu8_1 = 0;
	//多串过关的变量
	var zhushu3_3 = 0,
	zhushu3_4 = 0,
	zhushu4_4 = 0,
	zhushu4_5 = 0,
	zhushu4_6 = 0,
	zhushu4_11 = 0,
	zhushu5_5 = 0,
	zhushu5_6 = 0,
	zhushu5_10 = 0,
	zhushu5_16 = 0,
	zhushu5_20 = 0,
	zhushu5_26 = 0,
	zhushu6_6 = 0,
	zhushu6_7 = 0,
	zhushu6_15 = 0,
	zhushu6_20 = 0,
	zhushu6_22 = 0,
	zhushu6_35 = 0,
	zhushu6_42 = 0,
	zhushu6_50 = 0,
	zhushu6_57 = 0,
	zhushu7_7 = 0,
	zhushu7_8 = 0,
	zhushu7_21 = 0,
	zhushu7_35 = 0,
	zhushu7_120 = 0,
	zhushu8_8 = 0,
	zhushu8_9 = 0,
	zhushu8_28 = 0,
	zhushu8_56 = 0,
	zhushu8_70 = 0,
	zhushu8_247 = 0;
	for (var i = 1; i < wanfa.split("|").length; i++) {
		n = wanfa.split("|")[i];
		if (n == "单关") {
			if ($("#r1c1").hasClass("Switch")) {
				zhushu1_1 = chuan1_1(getNum);
			}else{
				zhushu1_1 = 0;
			}
		} else if (n == "2串1") {
			if ($("#r2c1").hasClass("Switch")) {
				zhushu2_1 = chuan2_1(getNum);
			} else {
				zhushu2_1 = -chuan2_1(getNum);
			}
		} else if (n == "3串1") {
			if ($("#r3c1").hasClass("Switch")) {
				zhushu3_1 = chuan3_1(getNum);
			} else {
				zhushu3_1 = -chuan3_1(getNum);
			}
		} else if (n == "4串1") {
			if ($("#r4c1").hasClass("Switch")) {
				zhushu4_1 = chuan4_1(getNum);
			} else {
				zhushu4_1 = -chuan4_1(getNum);
			}
		} else if (n == "5串1") {
			if ($("#r5c1").hasClass("Switch")) {
				zhushu5_1 = chuan5_1(getNum);
			} else {
				zhushu5_1 = -chuan5_1(getNum);
			}
		} else if (n == "6串1") {
			if ($("#r6c1").hasClass("Switch")) {
				zhushu6_1 = chuan6_1(getNum);
			} else {
				zhushu6_1 = -chuan6_1(getNum);
			}
		} else if (n == "7串1") {
			if ($("#r7c1").hasClass("Switch")) {
				zhushu7_1 = chuan7_1(getNum);
			} else {
				zhushu7_1 = -chuan7_1(getNum);
			}
		} else if (n == "8串1") {
			if ($("#r8c1").hasClass("Switch")) {
				zhushu8_1 = chuan8_1(getNum);
			} else {
				zhushu8_1 = -chuan8_1(getNum);
			}
		} else if (n == "3串3") {
			var zhumaArr = combAndArrange(getNum, 3, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu3_3 += chuan2_1(zhumaArr[k]);
			}
		} else if (n == "3串4") {
			var zhumaArr = combAndArrange(getNum, 3, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu3_4 += chuan2_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu3_4 += chuan3_1(zhumaArr[k]);
			}
		} else if (n == "4串4") {
			var zhumaArr = combAndArrange(getNum, 4, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu4_4 += chuan3_1(zhumaArr[k]);
			}
		} else if (n == "4串5") {
			var zhumaArr = combAndArrange(getNum, 4, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu4_5 += chuan3_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu4_5 += chuan4_1(zhumaArr[k]);
			}
		} else if (n == "4串6") {
			var zhumaArr = combAndArrange(getNum, 4, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu4_6 += chuan2_1(zhumaArr[k]);
			}
		} else if (n == "4串11") {
			var zhumaArr = combAndArrange(getNum, 4, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu4_11 += chuan2_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu4_11 += chuan3_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu4_11 += chuan4_1(zhumaArr[k]);
			}
		} else if (n == "5串5") {
			var zhumaArr = combAndArrange(getNum, 5, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu5_5 += chuan4_1(zhumaArr[k]);
			}
		} else if (n == "5串6") {
			var zhumaArr = combAndArrange(getNum, 5, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu5_6 += chuan4_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu5_6 += chuan5_1(zhumaArr[k]);
			}
		} else if (n == "5串10") {
			var zhumaArr = combAndArrange(getNum, 5, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu5_10 += chuan2_1(zhumaArr[k]);
			}
		} else if (n == "5串16") {
			var zhumaArr = combAndArrange(getNum, 5, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu5_16 += chuan3_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu5_16 += chuan4_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu5_16 += chuan5_1(zhumaArr[k]);
			}
		} else if (n == "5串20") {
			var zhumaArr = combAndArrange(getNum, 5, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu5_20 += chuan2_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu5_20 += chuan3_1(zhumaArr[k]);
			}
		} else if (n == "5串26") {
			var zhumaArr = combAndArrange(getNum, 5, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu5_26 += chuan2_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu5_26 += chuan3_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu5_26 += chuan4_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu5_26 += chuan5_1(zhumaArr[k]);
			}
		} else if (n == "6串6") {
			var zhumaArr = combAndArrange(getNum, 6, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_6 += chuan5_1(zhumaArr[k]);
			}
		} else if (n == "6串7") {
			var zhumaArr = combAndArrange(getNum, 6, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_7 += chuan5_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_7 += chuan6_1(zhumaArr[k]);
			}
		} else if (n == "6串15") {
			var zhumaArr = combAndArrange(getNum, 6, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_15 += chuan2_1(zhumaArr[k]);
			}
		} else if (n == "6串20") {
			var zhumaArr = combAndArrange(getNum, 6, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_20 += chuan3_1(zhumaArr[k]);
			}
		} else if (n == "6串22") {
			var zhumaArr = combAndArrange(getNum, 6, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_22 += chuan4_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_22 += chuan5_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_22 += chuan6_1(zhumaArr[k]);
			}
		} else if (n == "6串35") {
			var zhumaArr = combAndArrange(getNum, 6, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_35 += chuan2_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_35 += chuan3_1(zhumaArr[k]);
			}
		} else if (n == "6串42") {
			var zhumaArr = combAndArrange(getNum, 6, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_42 += chuan3_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_42 += chuan4_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_42 += chuan5_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_42 += chuan6_1(zhumaArr[k]);
			}
		} else if (n == "6串50") {
			var zhumaArr = combAndArrange(getNum, 6, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_50 += chuan2_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_50 += chuan3_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_50 += chuan4_1(zhumaArr[k]);
			}
		} else if (n == "6串57") {
			var zhumaArr = combAndArrange(getNum, 6, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_57 += chuan2_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_57 += chuan3_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_57 += chuan4_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_57 += chuan5_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu6_57 += chuan6_1(zhumaArr[k]);
			}
		} else if (n == "7串7") {
			var zhumaArr = combAndArrange(getNum, 7, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu7_7 += chuan6_1(zhumaArr[k]);
			}
		} else if (n == "7串8") {
			var zhumaArr = combAndArrange(getNum, 7, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu7_8 += chuan6_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu7_8 += chuan7_1(zhumaArr[k]);
			}
		} else if (n == "7串21") {
			var zhumaArr = combAndArrange(getNum, 7, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu7_21 += chuan5_1(zhumaArr[k]);
			}
		} else if (n == "7串35") {
			var zhumaArr = combAndArrange(getNum, 7, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu7_35 += chuan4_1(zhumaArr[k]);
			}
		} else if (n == "7串120") {
			var zhumaArr = combAndArrange(getNum, 7, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu7_120 += chuan2_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu7_120 += chuan3_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu7_120 += chuan4_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu7_120 += chuan5_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu7_120 += chuan6_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu7_120 += chuan7_1(zhumaArr[k]);
			}
		} else if (n == "8串8") {
			var zhumaArr = combAndArrange(getNum, 8, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu8_8 += chuan7_1(zhumaArr[k]);
			}
		} else if (n == "8串9") {
			var zhumaArr = combAndArrange(getNum, 8, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu8_9 += chuan7_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu8_9 += chuan8_1(zhumaArr[k]);
			}
		} else if (n == "8串28") {
			var zhumaArr = combAndArrange(getNum, 8, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu8_28 += chuan6_1(zhumaArr[k]);
			}
		} else if (n == "8串56") {
			var zhumaArr = combAndArrange(getNum, 8, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu8_56 += chuan5_1(zhumaArr[k]);
			}
		} else if (n == "8串70") {
			var zhumaArr = combAndArrange(getNum, 8, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu8_70 += chuan4_1(zhumaArr[k]);
			}
		} else if (n == "8串247") {
			var zhumaArr = combAndArrange(getNum, 8, 'c');
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu8_247 += chuan2_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu8_247 += chuan3_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu8_247 += chuan4_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu8_247 += chuan5_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu8_247 += chuan6_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu8_247 += chuan7_1(zhumaArr[k]);
			}
			for (var k = 0; k < zhumaArr.length; k++) {
				zhushu8_247 += chuan8_1(zhumaArr[k]);
			}
		}
	}

	zhushu = zhushu +zhushu1_1+ zhushu2_1 + zhushu3_1 + zhushu4_1 + zhushu5_1 + zhushu6_1 + zhushu7_1 + zhushu8_1 + zhushu3_3 + zhushu3_4 + zhushu4_4 + zhushu4_5 + zhushu4_6 + zhushu4_11 + zhushu5_5 + zhushu5_6 + zhushu5_10 + zhushu5_16 + zhushu5_20 + zhushu5_26 + zhushu6_6 + zhushu6_7 + zhushu6_15 + zhushu6_20 + zhushu6_22 + zhushu6_35 + zhushu6_42 + zhushu6_50 + zhushu6_57 + zhushu7_7 + zhushu7_8 + zhushu7_21 + zhushu7_35 + zhushu7_120 + zhushu8_8 + zhushu8_9 + zhushu8_28 + zhushu8_56 + zhushu8_70 + zhushu8_247;
	$("#lab_Num_standrad").html(zhushu);
	$("#investField_standrad").html(zhushu * beishu * 2);
	$("#current_money").html(zhushu * beishu * 2);
}
function removeSelectWays(key) {
	if (key == "PassFreedom") {
		$("#PassFreedom dl").removeClass("CheckBox light Switch").addClass("CheckBox light");
	} else if (key == "PassSeries") {
		$("#PassSeries dl").children().removeClass("selected");
	}
	$("#lab_Num_standrad").html(0);
	$("#investField_standrad").html(0);
	$("#current_money").html(0);
	$("#allWanfa").val("");
}



/**竞彩篮球-胜负的功能**/
var  sfmatchNum=0;
/***
**selected 1:大分/主负  0:xiaofen/主胜
**
*/
function checkColor(obj,day,week,selected,teamid){
	if($("#result_"+selected+"_"+day+"_"+teamid).hasClass("result_3")){
		$("#result_"+selected+"_"+day+"_"+teamid).removeClass("result_3").addClass("result_1");
	}else{
		$("#result_"+selected+"_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
	}
	checkZhuma();
	addRighTZInfo(obj,day,week,selected,teamid);
	$("#matchNum").html(sfmatchNum);
}
//显示自由过关咯多串过关的选项
function addRighBWInfo(obj,day,week,selected,teamid){
	 if($("#allWanfa").val()=="|单关"){
		  return ;
	  }
	if (sfmatchNum < 9) {
		for (var i = 2; i <= sfmatchNum; i++) {
			$("#r" + sfmatchNum + "c1").css("display", "");
		}
		//定义数组存放多串投注方式时的id编号
		if (sfmatchNum == 3) {
			var more = ["3", "4"];
		} else if (sfmatchNum == 4) {
			var more = ["4", "5", "6", "11"];
		} else if (sfmatchNum == 5) {
			var more = ["5", "6", "10", "16", "20", "26"];
		} else if (sfmatchNum == 6) {
			var more = ["6", "7", "15", "20", "22", "35", "42", "50", "57"];
		} else if (sfmatchNum == 7) {
			var more = ["7", "8", "21", "35", "120"];
		} else if (sfmatchNum == 8) {
			var more = ["8", "9", "28", "56", "70", "247"];
		}
	
		for (var j = 3; j <= sfmatchNum; j++) {
			for (var m = 0; m < more.length; m++) {
				var id = "r" + sfmatchNum + "c" + more[m];
				$("#" + id).css("display", "");
				$("#" + id).children().removeClass();
				if ($("#allWanfa").val().indexOf(id.substring(id.indexOf("r") + 1, id.indexOf("c")) + "串" + id.substring(id.indexOf("c") + 1)) != -1) {
					$("#allWanfa").val($("#allWanfa").val().substring(0, $("#allWanfa").val().indexOf(id.substring(id.indexOf("r") + 1, id.indexOf("c")) + "串" + id.substring(id.indexOf("c") + 1)) - 1) + $("#allWanfa").val().substring($("#allWanfa").val().indexOf(id.substring(id.indexOf("r") + 1, id.indexOf("c")) + "串" + id.substring(id.indexOf("c") + 1)) + (id.substring(id.indexOf("r") + 1, id.indexOf("c")) + "串" + id.substring(id.indexOf("c") + 1)).length));
				}
			}
		}
	}
 }
//显示自由过关咯多串过关的选项
function removeRighBWInfo(sfmatchNum){
	 if($("#allWanfa").val()=="|单关"){
		  return ;
	  }
	if (sfmatchNum < 8) {
		for (var i = sfmatchNum; i < 9; i++) {
			$("#r" + (sfmatchNum + 1) + "c1").css("display", "none");
			$("#r" + (sfmatchNum + 1) + "c1").removeClass("CheckBox light Switch").addClass("CheckBox light");
			if ($("#allWanfa").val().indexOf((sfmatchNum + 1) + "串1") != -1) {
				$("#allWanfa").val($("#allWanfa").val().substring(0, $("#allWanfa").val().indexOf((sfmatchNum + 1) + "串1") - 1) + $("#allWanfa").val().substring($("#allWanfa").val().indexOf((sfmatchNum + 1) + "串1") + ((sfmatchNum + 1) + "串1").length));
				$("#list_LotteryNumber option:eq(0)").attr("wangFang", $("#list_LotteryNumber option:eq(0)").attr("wangFang").substring(0, $("#list_LotteryNumber option:eq(0)").attr("wangFang").indexOf("50" + (sfmatchNum + 1)) - 1) + $("#list_LotteryNumber option:eq(0)").attr("wangFang").substring($("#list_LotteryNumber option:eq(0)").attr("wangFang").indexOf("50" + (sfmatchNum + 1)) + 3));
			};
		}

		//定义数组存放多串投注方式时的id编号
		var more = ["r3c3,r3c4", "r4c4,r4c5,r4c6,r4c11", "r5c5,r5c6,r5c10,r5c16,r5c20,r5c26", "r6c6,r6c7,r6c15,r6c20,r6c22,r6c35,r6c42,r6c50,r6c57", "r7c7,r7c8,r7c21,r7c35,r7c120", "r8c8,r8c9,r8c28,r8c56,r8c70,r8c247"];
		if (sfmatchNum > 1) {
			for (var j = sfmatchNum; j < 8; j++) {
				for (var m = 0; m < more[sfmatchNum - 2].split(",").length; m++) {
					var id = more[sfmatchNum - 2].split(",")[m];
					$("#" + id).css("display", "none");
					$("#" + id).children().removeClass();
					if ($("#allWanfa").val().indexOf(id.substring(id.indexOf("r") + 1, id.indexOf("c")) + "串" + id.substring(id.indexOf("c") + 1)) != -1) {
						$("#allWanfa").val($("#allWanfa").val().substring(0, $("#allWanfa").val().indexOf(id.substring(id.indexOf("r") + 1, id.indexOf("c")) + "串" + id.substring(id.indexOf("c") + 1)) - 1) + $("#allWanfa").val().substring($("#allWanfa").val().indexOf(id.substring(id.indexOf("r") + 1, id.indexOf("c")) + "串" + id.substring(id.indexOf("c") + 1)) + (id.substring(id.indexOf("r") + 1, id.indexOf("c")) + "串" + id.substring(id.indexOf("c") + 1)).length));
					};
				};
			};
		};
	};
}
//显示选择的赛事信息
function addRighTZInfo(obj,day,week,selected,teamid){
	//如果是按钮式选不中状态，则删除 对应的投注信息
	if(obj.hasClass("result_3")){
		if($("#result_0"+"_"+day+"_"+teamid).hasClass("result_3")||$("#result_1"+"_"+day+"_"+teamid).hasClass("result_3")){
			if(selected==0){
				$("#xiao-"+day+"-"+teamid).removeClass("selected");
			}else if(selected==1){
				$("#da-"+day+"-"+teamid).removeClass("selected");
			}
		}
		if($("#result_0"+"_"+day+"_"+teamid).hasClass("result_3")&&$("#result_1"+"_"+day+"_"+teamid).hasClass("result_3")){
			sfmatchNum-=1;  
			$("#choose_"+day+"_"+teamid).remove();
		};
		removeRighBWInfo(sfmatchNum);
	}else{
		//如果大小分全部选中，则不再重复加入
		if($("#result_0"+"_"+day+"_"+teamid).hasClass("result_1")&&$("#result_1"+"_"+day+"_"+teamid).hasClass("result_1")){
			if(selected==0){
				$("#xiao-"+day+"-"+teamid).addClass("selected");
			}else if(selected==1){
				$("#da-"+day+"-"+teamid).addClass("selected");
			}
		}else{
			sfmatchNum+=1;
			//获取主队名称 并判断大小分
			var hTeam =$("#h_"+day+"_"+teamid).html();
			
			var info ="<tr id='choose_"+day+"_"+teamid+"'><td><dl onclick='removeInfo($(this),"+day+","+selected+","+teamid+",1)' class='CheckBox light Switch'><dt></dt><dd id='no-"+day+"-"+teamid+"'>"+week+teamid+"</dd></dl></td><td id='homeTeam-"+day+"-"+teamid+"'>"+hTeam+"</td><td><span onclick='removeInfo($(this),"+day+",1,"+teamid+",0)' class='CheckWin' id='da-"+day+"-"+teamid+"'>主负</span><span onclick='removeInfo($(this),"+day+",0,"+teamid+",0)'class='CheckLoss' id='xiao-"+day+"-"+teamid+"'>主胜</span></td></tr>";
			$("#choose_list").append(info);
			if(selected==0){
				$("#xiao-"+day+"-"+teamid).addClass("selected");
			}else if(selected==1){
				$("#da-"+day+"-"+teamid).addClass("selected");
			};
		}
		if (sfmatchNum > 10) {
			alert("您好，单个方案最多只能选择10场比赛进行投注！");
			$("#choose_" + day + "_" + teamid).remove();
			sfmatchNum -= 1;
			$("#result_" + selected + "_" + day + "_" + teamid).removeClass("result_1").addClass("result_3");
			if(selected==0){
				$("#xiao-"+day+"-"+teamid).addClass("selected");
			}else if(selected==1){
				$("#da-"+day+"-"+teamid).addClass("selected");
			}
			checkZhuma();
		} else {
			addRighBWInfo(obj,day,week,selected,teamid);
		};
	}
	$("#matchNum").html(sfmatchNum);
	var wanfa = $("#allWanfa").val();
	guoGuanWays(wanfa, 0);
}
//flag 1:表示删除整场赛  0:删除半场比赛
function removeInfo(obj,day,selected,teamid,flag){
	if(flag==1){
		$("#result_1_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		$("#result_0_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		$("#choose_"+day+"_"+teamid).remove();
		sfmatchNum-=1; 
		//移除自由过关咯多串过关的选项
	}else if(flag==0){
		if(selected==0){
			$("#xiao-"+day+"-"+teamid).removeClass("selected");
			$("#result_0_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		}else if(selected==1){
			$("#da-"+day+"-"+teamid).removeClass("selected");
			$("#result_1_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		}
		if(!$("#xiao-"+day+"-"+teamid).hasClass("selected")&&!$("#da-"+day+"-"+teamid).hasClass("selected")){
			$("#result_1_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			$("#result_0_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			$("#choose_"+day+"_"+teamid).remove();
			sfmatchNum-=1;  
		}
	}
	$("#matchNum").html(sfmatchNum);
	checkZhuma();
	var wanfa = $("#allWanfa").val();
	if(wanfa!="|单关"){
	removeRighBWInfo(sfmatchNum);	
	}
	guoGuanWays(wanfa, 0);
	
}
function checkZhuma(){
	$("option", $("#list_LotteryNumber")).remove();
	$("#codes li").remove();
	var zhuma="";
	//获取比赛的teamid组合
	var teamidArr = [];
	$("input[name='teamid']").each(function(i) {
		if(teamidArr.indexOf($(this).val())==-1){
			teamidArr[i] =$(this).val();
		}
	});
	//获取日期和周的组合
	var dayweekArr = [];
	$("input[name='day']").each(function(i) {
		dayweekArr[i] = $(this).val();
	});
	
	for(var j=0;j<dayweekArr.length;j++){
		for(var i=0;i<teamidArr.length;i++){
			var day =dayweekArr[j].split("|")[0];
			
			if($("#lotNo").val()=="J00005"||$("#lotNo").val()=="J00006"){
				if($("#result_1_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_0_"+day+"_"+teamidArr[i]).hasClass("result_1")){
					zhuma=zhuma+dayweekArr[j]+"|"+teamidArr[i]+"|";
				}
				if($("#result_1_"+day+"_"+teamidArr[i]).hasClass("result_1")){
					zhuma=zhuma+"0";
				}
				if($("#result_0_"+day+"_"+teamidArr[i]).hasClass("result_1")){
					zhuma=zhuma+"3";
				}
				if($("#result_1_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_0_"+day+"_"+teamidArr[i]).hasClass("result_1")){
					zhuma=zhuma+"^";
				}else{
					zhuma=zhuma;
				}
			}else if($("#lotNo").val()=="J00008"){
				if($("#result_1_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_0_"+day+"_"+teamidArr[i]).hasClass("result_1")){
					zhuma=zhuma+dayweekArr[j]+"|"+teamidArr[i]+"|";
				}
				if($("#result_1_"+day+"_"+teamidArr[i]).hasClass("result_1")){
					zhuma=zhuma+"1";
				}
				if($("#result_0_"+day+"_"+teamidArr[i]).hasClass("result_1")){
					zhuma=zhuma+"2";
				}
				if($("#result_1_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_0_"+day+"_"+teamidArr[i]).hasClass("result_1")){
					zhuma=zhuma+"^";
				}else{
					zhuma=zhuma;
				}
			}
		}
	}
	

	var lotteryListSelect = $("#list_LotteryNumber");
	var opt;
	var wanfa = saleMa();
	if (wanfa.indexOf("|") != -1) {
		for (var k = 0; k < wanfa.split("|").length; k++) {
			opt = new Option(zhuma, zhuma);
			opt.setAttribute('wangFang', wanfa.split("|")[k]);
			add_codes(zhuma, zhuma);
			lotteryListSelect[k].options.add(opt);
		}
	} else {
		opt = new Option(zhuma, zhuma);
		opt.setAttribute('wangFang', wanfa);
		add_codes(zhuma, zhuma);
		lotteryListSelect[0].options.add(opt);
	}

	//添加到弹出框的注码
	$("#alert_zhuma").text(zhuma);
}
function saleMa() {
	var allWanfa = "";
	if ($("#allWanfa").val().indexOf("|") != -1) {
		var wanfaArr = $("#allWanfa").val().split("|");
		for (var m = 1; m < wanfaArr.length; m++) {
			if (wanfaArr[m] == "2串1") {
				wanfaArr[m] = "502";
			} else if (wanfaArr[m] == "3串1") {
				wanfaArr[m] = "503";
			} else if (wanfaArr[m] == "4串1") {
				wanfaArr[m] = "504";
			} else if (wanfaArr[m] == "5串1") {
				wanfaArr[m] = "505";
			} else if (wanfaArr[m] == "6串1") {
				wanfaArr[m] = "506";
			} else if (wanfaArr[m] == "7串1") {
				wanfaArr[m] = "507";
			} else if (wanfaArr[m] == "8串1") {
				wanfaArr[m] = "508";
			} else if (wanfaArr[m] == "3串3") {
				wanfaArr[m] = "526";
			} else if (wanfaArr[m] == "3串4") {
				wanfaArr[m] = "527";
			} else if (wanfaArr[m] == "4串6") {
				wanfaArr[m] = "528";
			} else if (wanfaArr[m] == "4串11") {
				wanfaArr[m] = "529";
			} else if (wanfaArr[m] == "5串10") {
				wanfaArr[m] = "530";
			} else if (wanfaArr[m] == "5串20") {
				wanfaArr[m] = "531";
			} else if (wanfaArr[m] == "5串26") {
				wanfaArr[m] = "532";
			} else if (wanfaArr[m] == "6串15") {
				wanfaArr[m] = "533";
			} else if (wanfaArr[m] == "6串35") {
				wanfaArr[m] = "534";
			} else if (wanfaArr[m] == "6串50") {
				wanfaArr[m] = "535";
			} else if (wanfaArr[m] == "6串57") {
				wanfaArr[m] = "536";
			} else if (wanfaArr[m] == "7串120") {
				wanfaArr[m] = "537";
			} else if (wanfaArr[m] == "8串247") {
				wanfaArr[m] = "538";
			} else if (wanfaArr[m] == "4串4") {
				wanfaArr[m] = "539";
			} else if (wanfaArr[m] == "4串5") {
				wanfaArr[m] = "540";
			} else if (wanfaArr[m] == "5串16") {
				wanfaArr[m] = "541";
			} else if (wanfaArr[m] == "6串20") {
				wanfaArr[m] = "542";
			} else if (wanfaArr[m] == "6串42") {
				wanfaArr[m] = "543";
			} else if (wanfaArr[m] == "5串5") {
				wanfaArr[m] = "544";
			} else if (wanfaArr[m] == "5串6") {
				wanfaArr[m] = "545";
			} else if (wanfaArr[m] == "6串22") {
				wanfaArr[m] = "546";
			} else if (wanfaArr[m] == "7串35") {
				wanfaArr[m] = "547";
			} else if (wanfaArr[m] == "8串70") {
				wanfaArr[m] = "548";
			} else if (wanfaArr[m] == "6串6") {
				wanfaArr[m] = "549";
			} else if (wanfaArr[m] == "6串7") {
				wanfaArr[m] = "550";
			} else if (wanfaArr[m] == "7串21") {
				wanfaArr[m] = "551";
			} else if (wanfaArr[m] == "8串56") {
				wanfaArr[m] = "552";
			} else if (wanfaArr[m] == "7串7") {
				wanfaArr[m] = "553";
			} else if (wanfaArr[m] == "7串8") {
				wanfaArr[m] = "554";
			} else if (wanfaArr[m] == "8串28") {
				wanfaArr[m] = "555";
			} else if (wanfaArr[m] == "8串8") {
				wanfaArr[m] = "556";
			} else if (wanfaArr[m] == "8串9") {
				wanfaArr[m] = "557";
			}else if (wanfaArr[m] == "单关") {
				wanfaArr[m] = "500";
			}
			allWanfa += wanfaArr[m] + "-";
		}
		allWanfa = allWanfa.substring(0, allWanfa.length - 1);
	} else {
		allWanfa = $("#allWanfa").val();
	}
	return allWanfa;
}

/**竞彩篮球-胜分差**/
/***
**selected 1:1-5 2:6-10 3:11-15 4:16-20 5:21-26 6:26+
**
*/
function checkColorSFC(obj,day,week,selected,teamid){
	if($("#result_"+selected+"_"+day+"_"+teamid).hasClass("result_3")){
		$("#result_"+selected+"_"+day+"_"+teamid).removeClass("result_3").addClass("result_1");
	}else{
		$("#result_"+selected+"_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
	}
	checkZhumaSFC();
	addRighTZInfoSFC(obj,day,week,selected,teamid);
	$("#matchNum").html(sfmatchNum);
}
//显示选择的赛事信息
function addRighTZInfoSFC(obj,day,week,selected,teamid){
	//如果是按钮式选不中状态，则删除 对应的投注信息
	if(obj.hasClass("result_3")){
		//二次点击时移除赛事信息
		if($("#choose_"+day+"_"+teamid).html().length>0){
			$("#"+selected+"-"+day+"-"+teamid).removeClass("selected");
		}
	  if( $("#result_k1_"+day+"_"+teamid).hasClass("result_3")&& $("#result_k2_"+day+"_"+teamid).hasClass("result_3")&& $("#result_k3_"+day+"_"+teamid).hasClass("result_3")&&$("#result_k4_"+day+"_"+teamid).hasClass("result_3")&&$("#result_k5_"+day+"_"+teamid).hasClass("result_3")&&
		 $("#result_k5_"+day+"_"+teamid).hasClass("result_3")&&$("#result_k6_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z1_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z2_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z3_"+day+"_"+teamid).hasClass("result_3")&&
		 $("#result_z4_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z5_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z6_"+day+"_"+teamid).hasClass("result_3")){
		  sfmatchNum-=1;  
		  $("#choose_"+day+"_"+teamid).remove();
		  $("#choose2_"+day+"_"+teamid).remove();
	  } 
	  if($("#allWanfa")!="|单关"){
		  removeRighBWInfo(sfmatchNum);  
	  }
	 
  }else{
	  var str =$("#choose_"+day+"_"+teamid).html();
		if(str!=null){
			$("#"+selected+"-"+day+"-"+teamid).addClass("selected");
	  	}else{
			sfmatchNum+=1;
			//获取主队名称 并判断大小分
			var hTeam =$("#h_"+day+"_"+teamid).html();
			var vTeam =$("#v_"+day+"_"+teamid).html();
	  		
			var str ='"'+selected+'"';
			var aa ='"';
			var info =
				"<tr id='choose_"+day+"_"+teamid+"'><td><dl onclick='removeInfoSFC($(this),"+day+","+str+","+teamid+
				",1)' class='CheckBox light Switch' ><dt></dt><dd id='no-"+day+"-"+teamid+"'>"+week+teamid+"</dd></dl></td><td colspan='2' id='homeTeam-"+day+"-"+teamid+
				"'>"+vTeam+"v"+hTeam+"</td></tr><tr  id='choose2_"+day+"_"+teamid+
				"'><td colspan='4' align='left'><span class='CheckWin' id='k1"+"-"+day+"-"+teamid+"' onclick='removeInfoSFC($(this),"+day+","+aa+"k1"+aa+","+teamid+
				",0)'>客胜1-5</span><span class='CheckLoss' id='k2"+"-"+day+"-"+teamid+ "' onclick='removeInfoSFC($(this),"+day+","+aa+"k2"+aa+","+teamid+
				",0)'>客胜6-10</span><span class='CheckLoss' id='k3"+"-"+day+"-"+teamid+"' onclick='removeInfoSFC($(this),"+day+","+aa+"k3"+aa+","+teamid+
				",0)'>客胜11-15</span><span class='CheckLoss' id='k4"+"-"+day+"-"+teamid+ "' onclick='removeInfoSFC($(this),"+day+","+aa+"k4"+aa+","+teamid+
				",0)'>客胜16-20</span><span class='CheckWin'id='k5"+"-"+day+"-"+teamid +"' onclick='removeInfoSFC($(this),"+day+","+aa+"k5"+aa+","+teamid+
				",0)'>客胜21-25</span><span class='CheckLoss' id='k6"+"-"+day+"-"+teamid+"'onclick='removeInfoSFC($(this),"+day+","+aa+"k6"+aa+","+teamid+
				",0)'>客胜26+</span><span class='CheckLoss' id='z1"+"-"+day+"-"+teamid+ "'onclick='removeInfoSFC($(this),"+day+","+aa+"z1"+aa+","+teamid+
				",0)'>主胜1-5</span><span class='CheckLoss' id='z2"+"-"+day+"-"+teamid+"'onclick='removeInfoSFC($(this),"+day+","+aa+"z2"+aa+","+teamid+
				",0)'>主胜6-10</span><span class='CheckWin' id='z3"+"-"+day+"-"+teamid+ "'onclick='removeInfoSFC($(this),"+day+","+aa+"z3"+aa+","+teamid+
				",0)'>主胜11-15</span><span class='CheckLoss' id='z4"+"-"+day+"-"+teamid+"'onclick='removeInfoSFC($(this),"+day+","+aa+"z4"+aa+","+teamid+
				",0)'>主胜16-20</span><span class='CheckLoss' id='z5"+"-"+day+"-"+teamid+"'onclick='removeInfoSFC($(this),"+day+","+aa+"z5"+aa+","+teamid+
				",0)'>主胜21-25</span><span class='CheckLoss' id='z6"+"-"+day+"-"+teamid+"'onclick='removeInfoSFC($(this),"+day+","+aa+"z6"+aa+","+teamid+
				",0)'>主胜26+</span></td></tr>";
				$("#choose_list").append(info);
				$("#"+selected+"-"+day+"-"+teamid).addClass("selected");
		}
		if (sfmatchNum > 10) {
			alert("您好，单个方案最多只能选择10场比赛进行投注！");
			$("#choose_"+day+"_"+teamid).remove();
			$("#choose2_"+day+"_"+teamid).remove();
			sfmatchNum -= 1;
			$("#"+selected+"-"+day+"-"+teamid).addClass("selected");
			checkZhumaSFC();
		} else {
				  addRighBWInfo(obj,day,week,selected,teamid);
		}
	}
	$("#matchNum").html(sfmatchNum);
	var wanfa = $("#allWanfa").val();
	guoGuanWays(wanfa, 0);
}
  //flag 1:表示删除整场赛  0:删除半场比赛
  function removeInfoSFC(obj,day,selected,teamid,flag){
	  if(flag==1){
		  $("#result_k1_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		  $("#result_k2_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		  $("#result_k3_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		  $("#result_k4_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		  $("#result_k5_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		  $("#result_k6_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		  $("#result_z1_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		  $("#result_z2_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		  $("#result_z3_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		  $("#result_z4_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		  $("#result_z5_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		  $("#result_z6_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		  $("#choose_"+day+"_"+teamid).remove();
		  $("#choose2_"+day+"_"+teamid).remove();
		  sfmatchNum-=1; 
		  //移除自由过关咯多串过关的选项
	  }else if(flag==0){
		  $("#"+selected+"-"+day+"-"+teamid).removeClass("selected");
		  $("#result_"+selected+"_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		  if( $("#result_k1_"+day+"_"+teamid).hasClass("result_3")&& $("#result_k2_"+day+"_"+teamid).hasClass("result_3")&& $("#result_k3_"+day+"_"+teamid).hasClass("result_3")&&$("#result_k4_"+day+"_"+teamid).hasClass("result_3")&&$("#result_k5_"+day+"_"+teamid).hasClass("result_3")&&
					 $("#result_k5_"+day+"_"+teamid).hasClass("result_3")&&$("#result_k6_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z1_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z2_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z3_"+day+"_"+teamid).hasClass("result_3")&&
					 $("#result_z4_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z5_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z6_"+day+"_"+teamid).hasClass("result_3")){
			  $("#result_1_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			  $("#result_0_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			  $("#choose_"+day+"_"+teamid).remove();
			  $("#choose2_"+day+"_"+teamid).remove();
			  sfmatchNum-=1; 
		  }
	  }
		$("#matchNum").html(sfmatchNum);
		checkZhumaSFC();
		removeRighBWInfo(sfmatchNum);
		var wanfa = $("#allWanfa").val();
		guoGuanWays(wanfa, 0);
  }
function checkZhumaSFC(){
	$("option", $("#list_LotteryNumber")).remove();
	$("#codes li").remove();
	var zhuma="";
	//获取比赛的teamid组合
	var teamidArr = [];
	$("input[name='teamid']").each(function(i) {
		if(teamidArr.indexOf($(this).val())==-1){
			teamidArr[i] =$(this).val();
		}
	});
	//获取日期和周的组合
	var dayweekArr = [];
	$("input[name='day']").each(function(i) {
		dayweekArr[i] = $(this).val();
	});
	
	//循环遍历取得总的赛事的值
	var count = 0;
	$("input[name='count']").each(function(i) {
		count += Number($(this).val());
	});
	
	for(var j=0;j<dayweekArr.length;j++){
		for(var i=0;i<teamidArr.length;i++){
			var day =dayweekArr[j].split("|")[0];
			if( $("#result_k1_"+day+"_"+teamidArr[i]).hasClass("result_1")|| $("#result_k2_"+day+"_"+teamidArr[i]).hasClass("result_1")|| $("#result_k3_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_k4_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_k5_"+day+"_"+teamidArr[i]).hasClass("result_1")||
					 $("#result_k5_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_k6_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z1_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z2_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z3_"+day+"_"+teamidArr[i]).hasClass("result_1")||
					 $("#result_z4_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z5_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z6_"+day+"_"+teamidArr[i]).hasClass("result_1")){
				zhuma=zhuma+dayweekArr[j]+"|"+teamidArr[i]+"|";
			}
			for(var k=1;k<7;k++){
			if($("#result_k"+k+"_"+day+"_"+teamidArr[i]).hasClass("result_1")){
				zhuma=zhuma+"1"+k;
			}
			if($("#result_z"+k+"_"+day+"_"+teamidArr[i]).hasClass("result_1")){
				zhuma=zhuma+"0"+k;
			}
			}
			if( $("#result_k1_"+day+"_"+teamidArr[i]).hasClass("result_1")|| $("#result_k2_"+day+"_"+teamidArr[i]).hasClass("result_1")|| $("#result_k3_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_k4_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_k5_"+day+"_"+teamidArr[i]).hasClass("result_1")||
					 $("#result_k5_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_k6_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z1_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z2_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z3_"+day+"_"+teamidArr[i]).hasClass("result_1")||
					 $("#result_z4_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z5_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z6_"+day+"_"+teamidArr[i]).hasClass("result_1")){
				zhuma=zhuma+"^";
			}else{
				zhuma=zhuma;
			}
		}
	}
	var lotteryListSelect = $("#list_LotteryNumber");
	var opt;
	var wanfa = saleMa();
	if (wanfa.indexOf("|") != -1) {
		for (var k = 0; k < wanfa.split("|").length; k++) {
			opt = new Option(zhuma, zhuma);
			opt.setAttribute('wangFang', wanfa.split("|")[k]);
			add_codes(zhuma, zhuma);
			lotteryListSelect[k].options.add(opt);
		}
	} else {
		opt = new Option(zhuma, zhuma);
		opt.setAttribute('wangFang', wanfa);
		add_codes(zhuma, zhuma);
		lotteryListSelect[0].options.add(opt);
	}
	//添加到弹出框的注码
	$("#alert_zhuma").text(zhuma);
}
/**竞彩篮球大小分 和胜负的用同样的js，只有checkzhuma有变化**/
