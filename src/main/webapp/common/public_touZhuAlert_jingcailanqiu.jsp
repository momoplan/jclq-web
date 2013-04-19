<%@ page contentType="text/html; charset=utf-8"%>

<!-- 弹出框 开始 -->

<div style="display: none;" id="touzhuOpen1" class="WindowCenter">
<div class="AlertWindow PlanBuyWindow " id="standrad_alert">
	<div class="WindowTittle">
		<h3 id="qihaofanan"></h3>
		<span class="Alertclose" onclick="loginShow('touzhuOpen1', false);" onmouseover="BtnOver($(this));" onmouseout="BtnOut($(this));" onmousedown="BtnDown($(this));" onmouseup="BtnUp($(this));">&#160;</span>
	</div>
	<div class="InsideBorder">
		<table class="PlanCon" cellpadding="0" cellspacing="0" width="100%">
			<tbody>
			<tr>
				<th>认购信息</th><td>您本次购买需消费<b><span id="xiaofei"></span></b>元，购买后您的账户余额为<b><span id="zhanghujine"></span></b>元</td>
			</tr>
			</tbody>
			<tfoot>
			<tr>
				<td colspan="7" class="AscertainBuy"><input class="BtnDisable" id="norepeat" type="button" onclick="norepeat(this);touzhu();" onmouseover="BtnOver($(this));" onmouseout="BtnOut($(this));" onmousedown="BtnDown($(this));" onmouseup="BtnUp($(this));" /><span><a onclick="loginShow('touzhuOpen1', false);" title="返回修改">返回修改</a></span></td>
			</tr>
			</tfoot>
		</table>
	</div>
</div>


<!-- <div class="AlertWindow PlanBuyWindow"  id="danshi_alert" style="display: none;">
		<div class="WindowTittle">
		<h3 id="qihaofanan_danshi"></h3>
		<span class="Alertclose" onclick="loginShow('touzhuOpen1', false);" onmouseover="BtnOver($(this));" onmouseout="BtnOut($(this));" onmousedown="BtnDown($(this));" onmouseup="BtnUp($(this));">&#160;</span>
	</div>
			<div class="InsideBorder">
				<table class="PlanCon" cellpadding="0" cellspacing="0" width="100%">
					<thead>
					
						<tr>
							<th rowspan="2">方案信息</th><th>玩法</th><th>注数</th><th>倍数</th><th>总金额</th>
						</tr>
						<tr>
							<th id="touzhufangshi_danshi"></th><th id="zhushu_danshi"></th><th id="beishu_danshi"></th><th id="zongJine_danshi"></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>认购信息</th><td colspan="4"> 您本次购买需要消费<b><span id="xiaofei_danshi"></span></b>元，购买后您的账户余额为<b><span id="zhanghujine_danshi"></span></b>元。 </td>
						</tr>
						<tr>
							<th colspan="5" class="AscertainBuy"><input class="BaseBtn" type="button" id="norepeat" onclick="norepeat(this);touzhu();" value="确认购买" onmouseover="BtnOver($(this));" onmouseout="BtnOut($(this));" onmousedown="BtnDown($(this));" onmouseup="BtnUp($(this));"><span class="light" onclick="loginShow('touzhuOpen1', false);">返回修改</span></th>
						</tr>
					</tbody>
				</table>
			</div>
	</div> -->
</div>


<script>
	//设置 弹出框的显示内容
	function htmlMsg() {
		var lotno = "竞彩篮球";//彩种
		var beishu = $("#tb_Multiple").val();//获取倍数
		var zhushu = $("#lab_Num_standrad").text();//获取注数
		var current_money = $("#investField_standrad").text();//获取投注金额
		var current_money1 = $("#investField_standrad").text();//获取投注金额
		var goumaifangshi = $("#goumaifangshi").val();//获取购买方式，如：代购  追号
		var zhuanghujine = $("#topLogin_money").text();//获取账户余额
		var dangqianwanfa = $("#dangqianwanfa").val();//获取一级玩法，如3D的直选  组六 组三
		var erjiwanfa = $("#erjiwanfa").val();//获取二级玩法，如3D的直选中的 普通投注、和值
		
		var zhuanghuyue = Number(zhuanghujine)-Number(current_money);
		if(zhuanghuyue<=0) {
			zhuanghuyue = 0;
		}
		
		if(erjiwanfa==decodeURI(EncodeUtf8("普通投注"))) {

			//合买部分内容隐藏
			$("#hemai_details").attr("class","none");
			
			$("#standrad_alert").show();
			//$("#danshi_alert").hide();
			$("#qihaofanan").html(lotno + dangqianwanfa + " "+ goumaifangshi + "方案"); //彩种 期号 投注方式 方案 
			$("#touzhufangshi").html(dangqianwanfa + erjiwanfa); //投注方式
			$("#zongJine").html("¥" + parseFloat(current_money).toFixed(2) + "元"); // 投注金额
			$("#beishu").html(beishu); //倍数
			$("#zhushu").html(zhushu); //注数
			$("#xiaofei").html("¥" + parseFloat(current_money1).toFixed(2)); // 本次消费
			$("#zhanghujine").html("¥" + parseFloat(zhuanghuyue).toFixed(2));//账户余额
			
			
			for(var i=1;i<=14;i++) {
				$("#selected_"+(i)).html("");
			}
			
			var zhumaArray = new Array();
			var alert_zhuma = $("#alert_zhuma").text();
			zhumaArray = alert_zhuma.split("^");
			for(var i = 0;i < zhumaArray.length;i++) {
				$("#alert_z"+(i+1)).text(zhumaArray[i]);
			}
		}/* else if(erjiwanfa==decodeURI(EncodeUtf8("单式上传"))) {
			//合买部分内容
			$("#hemai_details").attr("class","none");
			
			$("#standrad_alert").hide();
			$("#danshi_alert").show();
			$("#qihaofanan_danshi").html(lotno + " 第" + qihao + "期 " + dangqianwanfa + erjiwanfa + " "+ goumaifangshi + "方案"); //彩种 期号 投注方式 方案 
			$("#touzhufangshi_danshi").html(dangqianwanfa + erjiwanfa); //投注方式
			$("#zongJine_danshi").html("¥" + parseFloat(current_money).toFixed(2) + "元"); // 投注金额
			$("#beishu_danshi").html(beishu); //倍数
			$("#zhushu_danshi").html(zhushu); //注数
			$("#xiaofei_danshi").html("¥" + parseFloat(current_money1).toFixed(2)); // 本次消费
			$("#zhanghujine_danshi").html("¥" + parseFloat(zhuanghuyue).toFixed(2));//账户余额
			var zhumachuan = $("#codes li").text();//获取投注框里的注码
			var zhumachuanStr="";
			var zhumachuanHtml = "";
			if(zhumachuan.indexOf("删除")>-1){
			     zhumachuanStr = zhumachuan.split("删除"); 
			}
			var zhumachuanHtmlAll="";
	        for(var i=0 ; i< zhumachuanStr.length;i++){
	        	if(zhumachuanStr[i].indexOf("查看详情")==-1) {
	        		zhumachuanHtmlAll += "<p>"+zhumachuanStr[i]+"</p>"; //拼接注码到注码框中
	        	}else {
	        		zhumachuanStr[i] = zhumachuanStr[i].replace("查看详情","");
	        		zhumachuanHtmlAll += "<p>"+zhumachuanStr[i]+"</p>";
	        	}
			}
			$("#codeAll").val(zhumachuanHtmlAll);
			for(var i=0 ; i< zhumachuanStr.length-1;i++){
				
				if(i==3){//如果大于3
			     zhumachuanHtml +="<li id='gengduo'><a title='查看更多注码'  onclick='submitCode();' href='javaScript:;'>查看全部</a></li>"; //拼接注码到注码框中
			     break;
				}
				zhumachuanHtml +="<li>"+zhumachuanStr[i]+"</li>"; //拼接注码到注码框中
			}
			$("#zhumachuan").html(zhumachuanHtml); //注码串
		} */
		
		
	}
	//当前玩法 如：直选、组选六、组选三
	function setDangqianwanfa(name) {
		$("#dangqianwanfa").val(name);
	}
	//当前二级玩法 如：普通投注、和值
	function setErjiwanfa(name) {
		$("#erjiwanfa").val(name);
	}
	//购买方式 如：代购，追号
	function setGoumaifangshi(name) {
		$("#goumaifangshi").val(name);
	}
</script>
<div style="display: none;">
	<span id="alert_zhuma"></span>
</div>
<!-- 弹出框 结束 -->