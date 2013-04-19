<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
 <span id="common">
<jsp:include page="/common/ruyicai_include_common_top_daohang.jsp"/>
<!-- 头部中 网站logo和客服链接 start -->
<div class="HeadMiddleLogo">
	<a class="HomeLogo" href="/index.html">
		<img src="/jclq/images/HomeLogo.gif" width="138" height="64"  />
	</a>
	<a class="HomeActivityBanner" href="http://www.ruyicai.com/index.html"><img src="/jclq/images/HomeActivityBanner.jpg" /></a>
	<a class="HomeServiceQQ" href="http://wpa.qq.com/msgrd?v=3&uin=1427872305&site=qq&menu=yes"><img src="/jclq/images/HomeServiceQQ.gif" width="83" height="25" /></a>
	<a class="HomeServiceTel" href="javascript:;"><img src="/jclq/images/HomeServiceTel.gif" width="169" height="19" /></a>
</div>
 <div class="HeadBottomMenu">
	<div class="box">
		<div class="SelectLotteryBox">
			<div class="SelectLotteryButton" onmouseover="HoverOver($(this));" onmouseout="HoverOut($(this));">
				<!--  SelectLottery  start  -->
				<div class="Pannel SelectLottery" style="width:212px;">
					  <jsp:include page="/common/goucaiSelect.jsp"></jsp:include>
				</div>
				<!--  SelectLottery  end  -->
			</div>
		</div>
		<ul>
			<li class="ButtonHomePage"  ><a href="http://www.ruyicai.com/index.html">首页</a></li>
			<li class="ButtonChannelBuy"><a href="http://www.ruyicai.com/include/goucaidating.html">购彩大厅</a></li>
			<li class="ButtonCaseCenter relative"><a href="http://www.ruyicai.com/hemai/hemaiCenter.html">合买中心</a><!-- <span class="HomePageBGBox ListAwardClass" style="position:absolute; top:3px; left:80px; z-index:110;">合买中心 返奖 </span>--></li>
			<li class="ButtonNumberShow"><a href="http://www.ruyicai.com/include/kaijianggonggao.html">开奖号码</a></li>
			<li class="ButtonDataChart" ><a href="http://tbzs.ruyicai.com">分布走势</a></li>
			<li class="ButtonHotInfo"   ><a href="http://www.ruyicai.com/xinwenzixun.html">彩票资讯</a></li>
			<li class="relative" onmouseover="HoverOver($(this));" onmouseout="HoverOut($(this));">
				足球中心
				<dl>
					<dt><a href="http://live.ruyicai.com"><img src="/jclq/images/Football_score.gif" width="12" height="12" /> 即时比分</a></dt>
					<dd><a href="http://odds.ruyicai.com"><img src="/jclq/images/Football_ratio.gif" width="12" height="12" /> 即时赔率</a></dd>
					<dd><a href="http://info.ruyicai.com"><img src="/jclq/images/Football_data.gif" width="12" height="12" /> 足彩资料</a></dd>
					<dd><a href="http://www.ruyicai.com/zucai/zucai__1.html"><img src="/jclq/images/Football_forecast.gif" width="12" height="12" /> 专家预测</a></dd>
				</dl>
			</li>
		</ul>
	</div>
</div>
 </span>