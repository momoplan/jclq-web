<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
      <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
		<div class="competingEventLeft">
			<p><span class="Eventselect">联赛选择</span><span class="EventJzh"><input type="checkbox" class="input" name="checkbox" value="checkbox" />
			  已截止（<font id="JZTemNum">0</font>场） 已隐藏<font id="hidTemNum">0</font>场赛事　<font onclick="recoveryTem();" class="hand">恢复</font></span><!-- <span class="EventQuery">赛事回查
			<select name="">
			<option>3131313123</option>
			</select></span> --></p>
			<table class="competingEventTable" >
			  <thead>
			  <tr>
				<td width="94" rowspan="2">赛事编号</td>
				<td width="93" rowspan="2">赛事类型</td>
				<td width="102" rowspan="2"><select id="changTime" onchange="changtime()">
			<option value="0" selected>比赛时间</option>
			<option value="1">截止时间</option>
			</select></td> 
				<td width="177" rowspan="2">客队  VS  主队</td>
				<!-- <td width="106" rowspan="2"><select name="">
				<select name="">
			<option>比赛时间</option>
			</select></td> -->
				<td colspan="2">投注</td>
				</tr>
			  <tr>
			    <td width="48">主负</td>
			    <td width="46">主胜</td>
			  </tr>
			  </thead>
			  <tbody>
			  <c:forEach items="${duizhenInfo}" var="duizhens"  >
			   <c:forEach items="${duizhens}" var="duizhen" varStatus="s" >
			    <input type="hidden" name="teamid" value="${duizhen.teamid}">
			    <c:if test="${s.last }"><input type="hidden" id="count" name="count" value="${s.count }"/></c:if>
			   <c:if test="${s.index==0 }">
			   <input type="hidden" name="day" value="${duizhen.day}|${duizhen.weekid}">
			   <tr class="show${duizhen.day}" style="display:none">
				<th colspan="7" class="week">${duizhen.newday}${duizhen.newweek}　<font onclick='change("${duizhen.day}")' class="hand">显示</font></th>
			  </tr>
			   <tr class="hide${duizhen.day}">
				<th colspan="7" class="week">${duizhen.newday}${duizhen.newweek}　<font onclick='change("${duizhen.day}")' class="hand">隐藏</font></th>
			  </tr>
			   </c:if>
			   <tr <c:if test="${s.index%2!=0}">class="gray day${duizhen.day}"</c:if>  class="day${duizhen.day}" id="${duizhen.teamid}">
				<td><input type="checkbox" id="check_${duizhen.teamid}" class="input" checked="checked" onclick='hideTeam("${duizhen.teamid}")'/>${duizhen.newweek}${duizhen.teamid}</td>
				<td class="red">${duizhen.league}</td>
				<td class="game_Times">${duizhen.gameTime}</td>
				<td class="end_Times" style="display:none">${duizhen.endTime}</td>
				<td><font id="v_${duizhen.day}_${duizhen.teamid}">${duizhen.team1}</font>  VS  <font id="h_${duizhen.day}_${duizhen.teamid}">${duizhen.team2}</font></td>
				<!-- <td>1.49　3.75</td> -->
				<c:choose>
					<c:when test="${duizhen.peilv!='null'}">
						<th><span class="result_3 result_${duizhen.teamid}" id="result_1_${duizhen.day}_${duizhen.teamid}" onclick='checkColor($(this),"${duizhen.day}","${duizhen.newweek}",1,"${duizhen.teamid}")'>${duizhen.peilv.vs.v0 }</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_0_${duizhen.day}_${duizhen.teamid}" onclick='checkColor($(this),"${duizhen.day}","${duizhen.newweek}",0,"${duizhen.teamid}")'>${duizhen.peilv.vs.v3 }</span></th>
					</c:when>
					<c:otherwise>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_1_${duizhen.day}_${duizhen.teamid}" onclick='checkColor($(this),"${duizhen.day}","${duizhen.newweek}",1,"${duizhen.teamid}")'>0.00</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_0_${duizhen.day}_${duizhen.teamid}" onclick='checkColor($(this),"${duizhen.day}","${duizhen.newweek}",0,"${duizhen.teamid}")'>0.00</span></th>
					</c:otherwise>
				
				</c:choose>
				
			  </tr>
			  </c:forEach>
			  </c:forEach>
			 </tbody>
			</table>
		</div>
<input type="hidden" id="hidTemId" value="">
<script type="text/javascript">cleanReady();</script>
