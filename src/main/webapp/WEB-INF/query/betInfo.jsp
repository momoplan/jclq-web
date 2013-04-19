<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="TogetherPlanContentBody">
<div class="ChannelBuyBanner">
		<!--  SSQ  -->
			<!--  Banner start  -->
				<ol style="background:url(/jclq/images/JclqLogo.gif) no-repeat 15px 15px;">
				  <li>
						<img src="/jclq/images/JclqZi.gif">
						<b>
						<c:if test="!(#request.torder.memo.equals('null'))">
							${torder.memo }
						</c:if></b>					
					</li>
					<li>方案编号：${torder.id}　
						<c:if test="${torder.lotno=='J00005' }"><a href="http://jcweb.ruyicai.com/jclq/touzhu/shengfu.jsp" title="返回购买竞彩篮球胜负">返回购买竞彩篮球胜负</a></c:if> 
						<c:if test="${torder.lotno=='J00008' }"><a href="http://jcweb.ruyicai.com/jclq/touzhu/daxiaofen.jsp" title="返回购买竞彩篮球大小分">返回购买竞彩篮球大小分</a></c:if>
						<c:if test="${torder.lotno=='J00007' }"><a href="http://jcweb.ruyicai.com/jclq/touzhu/shengfencha.jsp" title="返回购买竞彩篮球胜分差">返回购买竞彩篮球胜分差</a></c:if> 
						<c:if test="${torder.lotno=='J00006' }"><a href="http://jcweb.ruyicai.com/jclq/touzhu/rfshengfu.jsp" title="返回购买竞彩篮球让分胜负">返回购买竞彩篮球让分胜负</a></c:if>
					</li>
				</ol>
				<!--  Banner end  -->
				
		<!--  SSQ END -->
	</div><!--  ChannelBuyBanner  -->
<table class="TogetherPlanTable2">
		<tbody>
		<tr class="CreatorInfo">
			<th width="120" height="80">发起人信息</th>
			<td>${username}</td>
		</tr>
		
		<tr class="PlanInfo" >
			<th>方案详情</th>
			<td><!--方案详情内容 start-->
			<table >
				<thead>
				<tr>
					<th>方案注数</th>
					<th>倍数</th>
					<th>总金额</th>
					<th>出票状态</th>
					<th>购买时间</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>${torder.betnum }</td>
						<td>${torder.lotmulti}倍</td>
						<td><i>¥${torder.amt/100 }</i>元</td>
						<td>${torder.orderstate}</td>
						<td>${torder.createtime }</td>
				</tr>
			</tbody></table>
			<!--方案详情内容 end--></td>
		</tr>
		<tr class="PlanBuyContent">
			<th>方案内容</th>
			<td><!--认购详情内容 start-->
			<ol>
				<li>过关方式：${pastMethod.pastMethod}</li>
				<li class="PlanBuyCon">
					<table border="0" cellpadding="0" cellspacing="0" width="70%">

			  <thead>
			  <tr>
				<th>赛事编号</th>
				<th>客队 VS 主队</th>
				<th>全场比分</th>
				 <th>赛果</th>
				<th>您的选择</th>
			  </tr>
			  </thead>
			  <tbody>
			  <c:forEach items="${lastArray}" var="info">
				<tr>
					<td>${info.matches.newweek} ${info.matches.teamid}</td>
					<td><em>${info.matches.team1 }</em>
					　<em>
						<c:choose>
							<c:when test="${info.matches.letpoint!=null ||info.matches.letpoint=='' }">
							${info.matches.letpoint}
							</c:when>
							<c:otherwise>
							VS
							</c:otherwise>
						</c:choose>
					</em>　
					<em>${info.matches.team2 }</em></td>
					<td>
						<c:choose>
							<c:when test="${info.result.basepoint!=null && info.result.basepoint!='null' && info.result.basepoint!='' }">
							${info.result.basepoint}
							</c:when>
							<c:otherwise>
							--
							</c:otherwise>
						</c:choose>
					</td>
					<td>
						<c:choose>
							<c:when test="${info.result.newResult!=null && info.result.newResult!='null' && info.result.newResult!='' }">
							${info.result.newResult}
							</c:when>
							<c:otherwise>
							--
							</c:otherwise>
						</c:choose>
					</td>
					<td>${info.selectInfo}</td>
				</tr>
			</c:forEach>
			   </tbody>
			</table>
				</li>
			</ol>
		  <!--认购详情内容 end--></td>
		</tr>
		</tbody>
		<tfoot>
		<tr class="PlanDrumbeating">
			<th height="80">中奖详情</th>
			<td>
			未中奖
			</td>
		</tr>
	</tfoot>
</table>
</div>