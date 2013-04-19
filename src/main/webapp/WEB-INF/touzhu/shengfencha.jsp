<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
      <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
		<div class="competingEventLeft">
		  <p><span class="Eventselect">联赛选择</span><span class="EventJzh">
		    <input type="checkbox" class="input" name="checkbox2" value="checkbox" />
		  	  已截止（<font id="JZTemNum">0</font>场） 已隐藏<font id="hidTemNum">0</font>场赛事　<font onclick="recoveryTem();" class="hand">恢复</font></span>
		    <!-- <span class="EventQuery">赛事回查
			  <select name="select">
			    <option>3131313123</option>
			  </select>
			</span> -->
		</p>
		  <table class="competingEventTable" >
			  <thead>
			  <tr>
				<td width="69" rowspan="2">赛事编号</td>
				<td width="68" rowspan="2">赛事类型</td>
				<td width="84" rowspan="2">
				<select id="changTime" onchange="changtime()">
			<option value="0" selected>比赛时间</option>
			<option value="1">截止时间</option>
			</select></td> 
				<td width="103" rowspan="2">客队/主队</td>
				<td colspan="7">投注</td>
				</tr>
			  <tr>
			    <td width="50">&nbsp;</td>
			    <td width="50">1-5</td>
			    <td width="50">6-10</td>
			    <td width="50">11-15</td>
			    <td width="50">16-20</td>
			    <td width="50">21-25</td>
			    <td width="50">26+</td>
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
				<th colspan="11" class="week">${duizhen.newday}${duizhen.newweek}　<font onclick='change("${duizhen.day}")' class="hand">显示</font></th>
			  </tr>
			   <tr class="hide${duizhen.day}">
				<th colspan="11" class="week">${duizhen.newday}${duizhen.newweek}　<font onclick='change("${duizhen.day}")' class="hand">隐藏</font></th>
			  </tr>
			   </c:if>
			   <tr <c:if test="${s.index%2!=0}">class="gray day${duizhen.day}"</c:if>  class="day${duizhen.day}" id="${duizhen.teamid}">
				<td rowspan="2"><input type="checkbox" id="check_${duizhen.teamid}" class="input" checked="checked" onclick='hideTeam("${duizhen.teamid}")'/>${duizhen.newweek}${duizhen.teamid}</td>
				<td class="red" rowspan="2">${duizhen.league}</td>
				<td class="game_Times" rowspan="2">${duizhen.gameTime}</td>
				<td class="end_Times" style="display:none" rowspan="2">${duizhen.endTime}</td>
				<td ><font id="v_${duizhen.day}_${duizhen.teamid}">${duizhen.team1}</font></td>
				<th>客胜</th>
				<c:choose>
					<c:when test="${duizhen.peilv!='null'}">
						<th><span class="result_3 result_${duizhen.teamid}" id="result_k1_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k1","${duizhen.teamid}")'>${duizhen.peilv.diff.v01 }</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_k2_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k2","${duizhen.teamid}")'>${duizhen.peilv.diff.v02 }</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_k3_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k3","${duizhen.teamid}")'>${duizhen.peilv.diff.v03 }</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_k4_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k4","${duizhen.teamid}")'>${duizhen.peilv.diff.v04 }</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_k5_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k5","${duizhen.teamid}")'>${duizhen.peilv.diff.v05 }</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_k6_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k6","${duizhen.teamid}")'>${duizhen.peilv.diff.v06 }</span></th>
					</c:when>
					<c:otherwise>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_k1_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k1","${duizhen.teamid}")'>0.00</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_k2_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k2","${duizhen.teamid}")'>0.00</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_k3_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k3","${duizhen.teamid}")'>0.00</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_k4_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k4","${duizhen.teamid}")'>0.00</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_k5_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k5","${duizhen.teamid}")'>0.00</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_k6_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k6","${duizhen.teamid}")'>0.00</span></th>
					</c:otherwise>
				</c:choose>
				
			  </tr>
			 <tr <c:if test="${s.index%2!=0}">class="gray day${duizhen.day}"</c:if>  class="day${duizhen.day}" id="${duizhen.teamid}">
			    <td><font id="h_${duizhen.day}_${duizhen.teamid}">${duizhen.team1}</font></td>
				<th>主胜</th>
				<c:choose>
					<c:when test="${duizhen.peilv!='null'}">
						<th><span class="result_3 result_${duizhen.teamid}" id="result_z1_${duizhen.day}_${duizhen.teamid}"  onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z1","${duizhen.teamid}")'>${duizhen.peilv.diff.v11 }</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_z2_${duizhen.day}_${duizhen.teamid}"  onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z2","${duizhen.teamid}")'>${duizhen.peilv.diff.v12 }</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_z3_${duizhen.day}_${duizhen.teamid}"  onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z3","${duizhen.teamid}")'>${duizhen.peilv.diff.v13 }</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_z4_${duizhen.day}_${duizhen.teamid}"  onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z4","${duizhen.teamid}")'>${duizhen.peilv.diff.v14 }</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_z5_${duizhen.day}_${duizhen.teamid}"  onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z5","${duizhen.teamid}")'>${duizhen.peilv.diff.v15 }</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_z6_${duizhen.day}_${duizhen.teamid}"  onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z6","${duizhen.teamid}")'>${duizhen.peilv.diff.v16 }</span></th>
					</c:when>
					<c:otherwise>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_z1_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z1","${duizhen.teamid}")'>0.00</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_z2_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z2","${duizhen.teamid}")'>0.00</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_z3_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z3","${duizhen.teamid}")'>0.00</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_z4_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z4","${duizhen.teamid}")'>0.00</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_z5_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z5","${duizhen.teamid}")'>0.00</span></th>
						<th><span class="result_3 result_${duizhen.teamid}" id="result_z6_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z6","${duizhen.teamid}")'>0.00</span></th>
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
