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
<script type="text/javascript" src="/jclq/js/jquery-1.6.2.js" ></script>
<script type="text/javascript" src="/jclq/js/jqueryJS/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="/jclq/js/base.js" ></script>
<script type="text/javascript" src="/jclq/js/util.js" ></script>
<script type="text/javascript" src="/jclq/js/public_touZhu.js" ></script>
</head>
<body>
<div class="body">
<jsp:include page="/common/ruyicai_include_common_top_nav.jsp" />
<span class="space10">&nbsp;</span>
<div id="main"> 
	<!--开奖中心左边--> 
	<!--开奖中心左边-->
	<div class="account_left Account">
		<div class="account_title"><img src="/jclq/images/lottery_announcement.gif" width="96" height="22"></div>
		<div class="Account">
			<dl class="Account">
				<dt class="account_secondTitle">福利彩票</dt>
				<dd class="light a_shuangseqiu" onclick="window.location.href='http://www.ruyicai.com/kaijiang/shuangseqiukaijiang.html'"><font><span></span>双色球</font></dd>
				<dd class="light a_fucai3D" onclick="window.location.href='http://www.ruyicai.com/kaijiang/fucai3Dkaijiang.html'"><font><span></span>福彩3D</font></dd>
				<dd class="light a_qilecai" onclick="window.location.href='http://www.ruyicai.com/kaijiang/qilecaikaijiang.html'"><font><span></span>七乐彩</font></dd>
				<dt class="account_secondTitle">体育彩票</dt>
				<dd class="light a_daletou" onclick="window.location.href='http://www.ruyicai.com/kaijiang/daletoukaijiang.html'"><font><span></span>大乐透</font></dd>
				<dd class="light a_pailiesan" onclick="window.location.href='http://www.ruyicai.com/kaijiang/shuangseqiukaijiang.htmlkaijiang/pailiesankaijiang.html'"><font><span></span>排列三</font></dd>
				<dd class="light a_pailiewu" onclick="window.location.href='http://www.ruyicai.com/kaijiang/shuangseqiukaijiang.htmlkaijiang/pailiewukaijiang.html'"><font><span></span>排列五</font></dd>
				<dd class="light a_qixingcai" onclick="window.location.href='http://www.ruyicai.com/kaijiang/shuangseqiukaijiang.htmlkaijiang/qixingcaikaijiang.html'"><font><span></span>七星彩</font></dd>
				<dd class="light a_22xuan5" onclick="window.location.href='http://www.ruyicai.com/kaijiang/shuangseqiukaijiang.htmlkaijiang/22xuan5.html'"><font><span></span>22选5</font></dd>
				<dt class="account_secondTitle">高频彩票</dt>
				<dd class="light a_shishicai" onclick="window.location.href='http://www.ruyicai.com/kaijiang/shuangseqiukaijiang.htmlkaijiang/shishicaikaijiang.html'"><font><span></span>重庆时时彩</font></dd>
				<dd class="light a_11xuan5" onclick="window.location.href='http://www.ruyicai.com/kaijiang/shuangseqiukaijiang.htmlkaijiang/11xuan5kaijiang.html'"><font><span></span>江西11选5</font></dd>
				<dd class="light a_shiyiyunduojin " onclick="window.location.href='http://www.ruyicai.com/kaijiang/shuangseqiukaijiang.htmlkaijiang/shiyiyunduojinkaijiang.html'"><font><span></span>十一运夺金</font></dd>
				<dt class="account_secondTitle">竞彩</dt>
				<dd class="light a_jclq selected" onclick="/jclq/query/drawlottery.jsp"><font><span></span>竞彩篮球</font></dd>
			</dl>
		</div>
		<div class="space10">&nbsp;</div>
		<div class="space10">&nbsp;</div>
	</div>
	<!--开奖中心右边--> 
	<!--开奖中心右边-->
	<div class="lotteryAnnouncement">
		<div class="announcement_border">
		<form action="#" method="post" id="lotteryInfo" name="lotteryInfo">
			<h2><div style="float:right; font-size:12px; font-weight:normal">日期选择：<input style="float:right; margin-top:6px; border:1px solid #E1E1E1" class="account_time"  type="text" id="date" name="date" onclick="WdatePicker({alwaysUseStartDate:true})" onchange='getLottery()'/></div>竞彩篮球开奖信息</h2>
			<div class="account_recharge">
				<ul class="account_rechargeTab">
					<li onclick="newBaseTab($(this));" controltarget=".rechargeWizard" class="light selected">胜负</li>
					<li onclick="newBaseTab($(this))" controltarget=".netCharge" class="light">让分胜负</li>
					<li onclick="newBaseTab($(this));" controltarget=".bankCardPhone" class="light">胜分差</li>
					<li onclick="newBaseTab($(this));" controltarget=".mobileRechargeCard" class="light">大小分</li>
				</ul>
			</div>
			
			<br clear="all" />
			 <div class="announcement_time"><span>
				<input name=valueType  type="radio" value="0" >
				单关</span> <span>
				<input name="valueType" type="radio" value="1"  checked="checked">
				过关</span> <span class="none">
				<input name="valueType" type="radio" value="">
				显示全部</span> </div> 
			<div class="shiShi_table" id="info">
			<script> $(function(){getLottery();})</script>
			</div>
			<input  type="hidden" name="type" value="0"/>
			</form>
			<input  type="hidden" id="showClass" value=""/>
		</div>

	</div>
	
	
</div>
<span class="space10">&nbsp;</span>
<jsp:include page="/common/ruyicai_include_common_footer_noindex.jsp" />
</div>
</body>
</html>
