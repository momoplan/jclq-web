<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Temp Html</title>
<link rel="stylesheet" type="text/css" href="/jclq/css/competing.css" />
<link rel="stylesheet" type="text/css" href="/jclq/css/util.css" />
<link rel="stylesheet" type="text/css" href="/jclq/css/touzhuAll.css" />
<script type="text/javascript" src="/jclq/js/jquery-1.6.2.js" ><!--jquery-1.6.2.js--></script>
<script type="text/javascript" src="/jclq/js/base.js" ><!--常用横切js--></script>
<script type="text/javascript" src="/jclq/js/util.js" ></script>

</head>
<body>
<div class="body">
<jsp:include page="/common/ruyicai_include_common_top_nav.jsp" />
<span class="space10">&nbsp;</span>
<div class="competing">
	<div class="competingtop">
		<div class="competingtopLeft"></div>
		<div class="competingtopCon">
			<div class="competingtopConLogo jclqLogo">
				<div  class="competingtopConZi jclqZi">
				　　<span class="strong">反奖率高达69%，过关固定奖金</span>　　<span>销售时间：周一至周五 09:00～22:45  周六至周日 09:00～00:45</span></div>
				<dl>
					<a href="shengfu.jsp"> <dd class="holdout" >胜负</dd></a>
					<a href="rfshengfu.jsp"> <dd class="holdup" >让分胜负</dd></a>
					<a href="shengfucha.jsp"><dd class="holdout">胜负差</dd></a>
					<a href="daxiaofen.jsp"><dd class="holdout" >大小分</dd></a>
					<dt><a href="#" title="玩法介绍">玩法介绍</a></dt>	
				</dl>
				
		</div>
		</div>
		<div class="competingtopRight"></div>
	</div>
	<div class="competingChange">
		<ul>
			<li>单关投注</li>
			<li class="selected">过关投注</li>
			<li>参与合买</li>
		</ul>
	</div>
	<div class="competingEvent">
		<div class="competingEventLeft" id="daxiaofen">
		<script> $(function(){
			$.ajax({
				url:"/jclq/SelectDZ.do?loton=rfshengfu",//后台处理程序
				type:"POST",//数据发送方式
				dataType:'html',//接受数据格式
				success:function(data){
					//alert(data);
					$("#daxiaofen").html(data);
					}
				
				
			});
			
		})</script>
	  </div>
		<div class="competingEventRight">
		<span class="space10">&nbsp;</span>
			<form method="post" action="/chlw/user/bet!bettingByDipin" id="BettingForm" name="BettingForm">		
				<div class="ChannelBuyPannel ChannelBuyCheck">
					<div class="ChannelBuyPannelHead"><h3>1.确认投注信息</h3></div>
					<div class="ChannelBuyPannelBody CheckContent">
						<table id="choose_list">
							<tbody><tr><th>序号</th><th>主队</th><th>投注</th>
							<th>胆</th>
							</tr>
						<tr id="choose_20120302_1"><td><dl onclick="CheckBox($(this));removeThisResult($(this),20120302,1,3,1);" class="CheckBox light Switch"><dt></dt><dd id="no-20120302-1">周一001</dd></dl></td><td id="homeTeam-20120302-1">
						布里斯
				  </td>
						<td><span onclick="removeThisResult($(this),20120302,1,3,0);" class="CheckWin selected" id="CheckWin-20120302-1">主胜</span><span onclick="removeThisResult($(this),20120302,1,0,0)" class="CheckLoss selected" id="CheckLoss-20120302-1">主负</span></td>
						<td><input name="" type="checkbox" value="" /></td>
						</tr><tr id="choose_20120302_2"><td><dl onclick="CheckBox($(this));removeThisResult($(this),20120302,2,3,1);" class="CheckBox light Switch"><dt></dt><dd id="no-20120302-2">周一001</dd></dl></td><td id="homeTeam-20120302-2">
						因戈尔
				  </td><td><span class="CheckWin selected">主胜</span><span class="CheckLoss selected">主负</span></td>
				  <td><input name="" type="checkbox" value="" /></td>
						</tr><tr id="choose_20120302_3"><td><dl onclick="CheckBox($(this));removeThisResult($(this),20120302,3,3,1);" class="CheckBox light Switch"><dt></dt><dd id="no-20120302-3">周一001</dd></dl></td><td id="homeTeam-20120302-3">
						杜伊斯
				  </td><td><span class="CheckWin selected">主胜</span><span class="CheckLoss selected">主负</span></td>
				  <td><input name="" type="checkbox" value="" /></td>
						</tr></tbody></table>
					</div>
					<div class="ChannelBuyPannelHead"><h3>2.选择过关方式</h3></div>
					<div class="ChannelBuyPannelBody CheckStyle">
						<table class="TabM"><tbody><tr><th controltarget=".PassFreedom" onclick="BaseTab($(this));removeSelectWays('PassFreedom');" class="selected">自由过关</th><td controltarget=".PassSeries" onclick="BaseTab($(this));removeSelectWays('PassSeries');" class="">多串过关</td></tr></tbody></table>
						<div class="PassFreedom none selected" id="PassFreedom">
							<dl style="display:none;" onclick="CheckBox($(this));guoGuanWays('');" class="CheckBox light" id="r1c1"><dt></dt><dd>单关</dd></dl>
							<dl style="" onclick="CheckBox($(this));guoGuanWays('|2串1',1);" class="CheckBox light" id="r2c1"><dt></dt><dd>2串1</dd></dl>
							<dl style="" onclick="CheckBox($(this));guoGuanWays('|3串1',1);" class="CheckBox light" id="r3c1"><dt></dt><dd>3串1</dd></dl>
							<dl style="display:none;" onclick="CheckBox($(this));guoGuanWays('|4串1',1);" class="CheckBox light" id="r4c1"><dt></dt><dd>4串1</dd></dl>
							<dl style="display:none;" onclick="CheckBox($(this));guoGuanWays('|5串1',1);" class="CheckBox light" id="r5c1"><dt></dt><dd>5串1</dd></dl>
							<dl style="display:none;" onclick="CheckBox($(this));guoGuanWays('|6串1',1);" class="CheckBox light" id="r6c1"><dt></dt><dd>6串1</dd></dl>
							<dl style="display:none;" onclick="CheckBox($(this));guoGuanWays('|7串1',1);" class="CheckBox light" id="r7c1"><dt></dt><dd>7串1</dd></dl>
							<dl style="display:none;" onclick="CheckBox($(this));guoGuanWays('|8串1',1);" class="CheckBox light" id="r8c1"><dt></dt><dd>8串1</dd></dl>
						</div>
						<div class="PassSeries none" id="PassSeries">
							<dl style="" onclick="RadioButton($(this));guoGuanWays('|3串3',1);" class="RadioButton light" id="r3c3"><dt></dt><dd>3串3</dd></dl>
							<dl style="" onclick="RadioButton($(this));guoGuanWays('|3串4',1);" class="RadioButton light" id="r3c4"><dt></dt><dd>3串4</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|4串4',1);" class="RadioButton light" id="r4c4"><dt></dt><dd>4串4</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|4串5',1);" class="RadioButton light" id="r4c5"><dt></dt><dd>4串5</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|4串6',1);" class="RadioButton light" id="r4c6"><dt></dt><dd>4串6</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|4串11',1);" class="RadioButton light" id="r4c11"><dt></dt><dd>4串11</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|5串5',1);" class="RadioButton light" id="r5c5"><dt></dt><dd>5串5</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|5串6',1);" class="RadioButton light" id="r5c6"><dt></dt><dd>5串6</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|5串10',1);" class="RadioButton light" id="r5c10"><dt></dt><dd>5串10</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|5串16',1);" class="RadioButton light" id="r5c16"><dt></dt><dd>5串16</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|5串20',1);" class="RadioButton light" id="r5c20"><dt></dt><dd>5串20</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|5串26',1);" class="RadioButton light" id="r5c26"><dt></dt><dd>5串26</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|6串6',1);" class="RadioButton light" id="r6c6"><dt></dt><dd>6串6</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|6串7',1);" class="RadioButton light" id="r6c7"><dt></dt><dd>6串7</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|6串15',1);" class="RadioButton light" id="r6c15"><dt></dt><dd>6串15</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|6串20',1);" class="RadioButton light" id="r6c20"><dt></dt><dd>6串20</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|6串22',1);" class="RadioButton light" id="r6c22"><dt></dt><dd>6串22</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|6串35',1);" class="RadioButton light" id="r6c35"><dt></dt><dd>6串35</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|6串42',1);" class="RadioButton light" id="r6c42"><dt></dt><dd>6串42</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|6串50',1);" class="RadioButton light" id="r6c50"><dt></dt><dd>6串50</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|6串57',1);" class="RadioButton light" id="r6c57"><dt></dt><dd>6串57</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|7串7',1);" class="RadioButton light" id="r7c7"><dt></dt><dd>7串7</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|7串8',1);" class="RadioButton light" id="r7c8"><dt></dt><dd>7串8</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|7串21',1);" class="RadioButton light" id="r7c21"><dt></dt><dd>7串21</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|7串35',1);" class="RadioButton light" id="r7c35"><dt></dt><dd>7串35</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|7串120',1);" class="RadioButton light" id="r7c120"><dt></dt><dd>7串120</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|8串8',1);" class="RadioButton light" id="r8c8"><dt></dt><dd>8串8</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|8串9',1);" class="RadioButton light" id="r8c9"><dt></dt><dd>8串9</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|8串28',1);" class="RadioButton light" id="r8c28"><dt></dt><dd>8串28</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|8串56',1);" class="RadioButton light" id="r8c56"><dt></dt><dd>8串56</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|8串70',1);" class="RadioButton light" id="r8c70"><dt></dt><dd>8串70</dd></dl>
							<dl style="display:none;" onclick="RadioButton($(this));guoGuanWays('|8串247',1);" class="RadioButton light" id="r8c247"><dt></dt><dd>8串247</dd></dl>
						</div>
					</div>
					<div class="ChannelBuyPannelHead"><h3>3.确认投注金额</h3></div>
					<div class="ChannelBuyPannelBody CheckSum">
						投注<input type="text" value="1" class="Narrow" onkeyup="value=value.replace('０','0').replace('１','1').replace('２','2').replace('３', '3').replace('４','4').replace('５','5').replace('６','6').replace('７', '7').replace('８','8').replace('９','9');multipleValidateJC();updateMultipleTotalMoney();" id="tb_Multiple_standrad">倍（最高9999倍），
						<br>您选择了<b id="matchNum">3</b>场比赛，共<em id="lab_Num_standrad">0</em>注，
						<br>总金额<b id="investField_standrad">0</b><span id="current_money" style="display:none;">0</span>元，
						<br><a target="_blank" href="/rules/betProtocol.html" class="light">查看奖金预算明细</a>
						<br><input type="checkbox" id="xieyi" checked="checked">我已阅读并同意<a target="_blank" href="/rules/betProtocol.html" class="light">《用户代购协议》</a>。
						<br><input name="" type="button" value="确认代购" class="CastBtn"/><input name="" type="button" value="发起合买" class="CastBtn"/>
					</div>
				</div>
				<!-- 选号框-->
				<div style="display: none;" id="xuanhaokuang">
            <div style="display: none;" class="add_cont"> 
				<select size="10" id="list_LotteryNumber" name="list_LotteryNumber"><option value="20120302|5|001|013^20120302|5|002|013^20120302|5|003|013^" wangfang="">20120302|5|001|013^20120302|5|002|013^20120302|5|003|013^</option></select> 
			</div> 
			<div class="numberbox">
              <ul id="codes"><li class="numberlan" onmouseout="mouseOut()" onmouseover="add_css($(this)),initMouseMove(),addMouseOver($(this));"><div onclick="getZhumaView(&quot;20120302|5|001|013^20120302|5|002|013^20120302|5|003|013^&quot;);" class="numberhao">20120302|5|001|013^20120302|5|002|013^20120302|5|003|013^ </div> <span class="numberdel"><a title="删除" id="btn_ClearSelect" href="javascript:btn_ClearSelectClick()">删除</a></span> </li></ul>
            </div>
<dl class="ChannelBuyRedouble">
	<dt id="hiddenBeishu" style="width:170px;">
		<i>投注倍数：</i>
		<span id="lessonMultiple" class="light">-</span>
		<input type="text" onkeyup="value=value.replace('０','0').replace('１','1').replace('２','2').replace('３', '3').replace('４','4').replace('５','5').replace('６','6').replace('７', '7').replace('８','8').replace('９','9');multipleValidate();updateMultipleTotalMoney();" value="1" name="tb_Multiple" id="tb_Multiple"> 
		<span id="add_Multiple" class="light">+</span>
	</dt>
	<dd style="width:90px;">
		<div style="display: none;" id="zhuijia">
			<input type="checkbox" onclick="setGoumaifangshi('追加');updateMultipleTotalMoney();jisuanZhuihao();" value="3" id="oneMoney" name="oneMoney"><span>追加投注</span>
		</div>
	</dd>
	<dd style="width:250px;">
	<i>投注金额：<b id="investField">0</b>元</i>
	</dd>
	<dd style="width:75px; float:right;">
		<span style="display:none" id="lab_Num">0</span>
		<img src="/images/qkhml.gif" onclick="btn_ClearClick()">
	</dd>
</dl>
  <script>
  $("#lessonMultiple").click(function(){
	  if ($("#codes li").length ==0 ) {
			 openAlert(decodeURI(EncodeUtf8("您还没有输入投注内容。")));
			 $("#tb_Multiple").val("1");
			 $("#investField").val("0");
			//alert(decodeURI(EncodeUtf8("您还没有输入投注内容。")));
			return false;
		}
   var  multiple=Number($("#tb_Multiple").val());
  if(multiple==1){
	  openAlert(decodeURI(EncodeUtf8("最少为一倍！")));
  }else{
	  multiple-=1;
	   $("#tb_Multiple").val(multiple);
	   multipleValidate();updateMultipleTotalMoney();
	  }
  if($("#daiGouHemai") != null &amp;&amp; $("#qishuList") != null  &amp;&amp; ($("#daiGouHemai").val()=="zhuihao" || $("#daiGouHemai").val()=="ziyouZhuihao")){
		setQishuList(55,$('#betchZhuihaoNum').val(),false,'qishuList',$('#lotNo').val());
	}
	  });
	  $("#add_Multiple").click(function(){
		  if ($("#codes li").length ==0 ) {
			      $("#tb_Multiple").val("1");
			      $("#investField").val("0");
				 openAlert(decodeURI(EncodeUtf8("您还没有输入投注内容。")));
				//alert(decodeURI(EncodeUtf8("您还没有输入投注内容。")));
				return false;
			}
   var  multiple= Number( $("#tb_Multiple").val());
	  multiple+=1;
	   $("#tb_Multiple").val(multiple);
	   multipleValidate();updateMultipleTotalMoney();
	   if($("#daiGouHemai") != null &amp;&amp; $("#qishuList") != null  &amp;&amp; ($("#daiGouHemai").val()=="zhuihao" || $("#daiGouHemai").val()=="ziyouZhuihao")){
			setQishuList(55,$('#betchZhuihaoNum').val(),false,'qishuList',$('#lotNo').val());
		}
	  });
  </script>    
				</div>
				<input type="hidden" name="allWanfa" value="" id="allWanfa">
				<input type="hidden" name="lotNo" value="J00001" id="lotNo">
				<input type="hidden" value="" name="jsonString" id="jsonString"> 
				<input type="hidden" value="jingcaizuqiu" id="caiZhong"> 
				<input type="hidden" value="" name="path" id="path"> 
				<input type="hidden" value="" name="errorCode" id="errorCode">
				<input type="hidden" value="胜平负" id="dangqianwanfa">
				<input type="hidden" value="普通投注" id="erjiwanfa">
				<input type="hidden" value="代购" id="goumaifangshi">
				<input type="hidden" value="daigou" name="daiGou" id="daiGouHemai">
				<input type="hidden" value="" name="jsonStringCLR" id="jsonStringCLR">
		  </form>
		</div>
	</div>
</div>
<div class="competingPrompt">
	<h1>竞彩篮球投注提示：</h1>
	<p>
	1、竞猜全场比赛包含含加时赛。让分只适合“让分胜负”玩法,“+”为客让主，“-”为主让客。<br />
	2、页面中过关投注固定奖金仅供参考，实际奖金以出票时刻奖金为准。投注区显示的中奖金额=每1元对应中奖奖金。<br />
	3、过关投注完场显示的奖金仅指比赛截止投注时最终变化的过关奖金，仅供参考，派奖奖金以方案详情中最终出票时刻的奖金为准。<br />
	4、单关的预设让分数和预设总分数在接受投注后不再变化；过关的预设让分数和预设总分数在销售过程中可能会有所变动，但是之前的投注不受之后预设让分数和预设总
	分数变动的影响。<br />
	5、单关投注，单注最高奖金限额为500万元；2或3场过关投注，单注最高奖金限额为20万元；4或5场过关投注，单注最高奖金限额为50万元；6场过关投注，单注最高奖金限额100万元。<br />
	6、单注彩票保底奖金：如果单注奖金不足2元，则补足至2元。
	</p>
</div>
<span class="space10">&nbsp;</span>
<jsp:include page="/common/ruyicai_include_common_footer_noindex.jsp" />
</div>
</body>
</html>
