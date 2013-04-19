<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
  <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
	<table class="account_day rechargeWizard selected none " cellspacing="0" cellpadding="0">
		<tbody>
			<tr>
				<th>赛事编号</th>
				<th>联赛</th>
				<th>比赛时间</th>
				<th>客队</th>
				<th>&nbsp;</th>
				<th>主队</th>
				<th>终场比分</th>
				<th>彩果</th>
				<th>奖金</th>
				<!-- <th>主胜</th> -->
			</tr>
			<c:forEach items="${saiguoInfo }" varStatus="s" var="info">
			<c:if test="${info.result.cancel=='0'}">
			<c:choose>
			  <c:when test="${s.index%2!=0}">
			  <tr class="accountDay_whiteBg">
			  </c:when>
			  <c:otherwise>
			  <tr class="accountDay_greyBg">
			  </c:otherwise>
			</c:choose>
				<td>${info.matches.newweek}${info.matches.teamid} </td>
			<c:choose>
			  <c:when test="${s.index%2!=0}">
			 <td bgcolor="#FF0000" style="color:#FFF">${info.matches.league}</td>
			  </c:when>
			  <c:otherwise>
			  <td style="color:#FFF; background:#F60">${info.matches.league}</td>
			  </c:otherwise>
			</c:choose>
				<td>${info.matches.gameTime}</td>
				<td>${info.matches.team1}</td>
				<td> VS</td>
				<td> ${info.matches.team2}</td>
				<td> <c:choose><c:when test="${info.result.result=='null'}"></c:when><c:otherwise>${info.result.result} </c:otherwise></c:choose></td>
				<td> ${info.result.newResult} </td>
				 <td><c:choose><c:when test="${info.result.b0=='null'}">-</c:when><c:otherwise>${info.result.b0}</c:otherwise></c:choose></td>
				<!--<td>3.11</td> -->
			</tr>
			</c:if>
			</c:forEach>
		</tbody>
	</table>
	<table class="account_day netCharge none" cellspacing="0" cellpadding="0">
		<tbody>
			<tr>
				<th>赛事编号</th>
				<th>联赛</th>
				<th>比赛时间</th>
				<th>客队</th>
				<th>&nbsp;</th>
				<th>主队</th>
				<th>终场比分</th>
				<th>让分</th>
				<th>彩果</th>
				<th>奖金</th>
				<!-- <th>主胜</th> -->
			</tr>
			<c:forEach items="${saiguoInfo }" varStatus="s" var="info">
			<c:if test="${info.result.cancel=='0'}">
			<c:choose>
			  <c:when test="${s.index%2!=0}">
			  <tr class="accountDay_whiteBg">
			  </c:when>
			  <c:otherwise>
			  <tr class="accountDay_greyBg">
			  </c:otherwise>
			</c:choose>
				<td>${info.matches.newweek}${info.matches.teamid} </td>
			<c:choose>
			  <c:when test="${s.index%2!=0}">
			 <td bgcolor="#FF0000" style="color:#FFF">${info.matches.league}</td>
			  </c:when>
			  <c:otherwise>
			  <td style="color:#FFF; background:#F60">${info.matches.league}</td>
			  </c:otherwise>
			</c:choose>
				<td>${info.matches.gameTime}</td>
				<td>${info.matches.team1}</td>
				<td> VS</td>
				<td> ${info.matches.team2}</td>
				<td> <c:choose><c:when test="${info.result.result=='null'}"></c:when><c:otherwise>${info.result.result} </c:otherwise></c:choose></td>
				<td><c:choose><c:when test="${info.result.letpoint=='null'}"></c:when><c:otherwise>${info.result.letpoint} </c:otherwise></c:choose></td>
				<td> ${info.result.newResult} </td>
				 <td><c:choose><c:when test="${info.result.b1=='null'}">-</c:when><c:otherwise>${info.result.b1}</c:otherwise></c:choose></td>
				<!--<td>3.11</td> -->
			</tr>
			</c:if>
			</c:forEach>
		</tbody>
	</table>
	<table class="account_day bankCardPhone none" cellspacing="0" cellpadding="0">
		<tbody>
			<tr>
				<th>赛事编号</th>
				<th>联赛</th>
				<th>比赛时间</th>
				<th>客队</th>
				<th>&nbsp;</th>
				<th>主队</th>
				<th>终场比分</th>
				<th>彩果</th>
				<th>奖金</th>
				<!-- <th>主胜</th> -->
			</tr>
			<c:forEach items="${saiguoInfo }" varStatus="s" var="info">
			<c:if test="${info.result.cancel=='0'}">
			<c:choose>
			  <c:when test="${s.index%2!=0}">
			  <tr class="accountDay_whiteBg">
			  </c:when>
			  <c:otherwise>
			  <tr class="accountDay_greyBg">
			  </c:otherwise>
			</c:choose>
				<td>${info.matches.newweek}${info.matches.teamid} </td>
			<c:choose>
			  <c:when test="${s.index%2!=0}">
			 <td bgcolor="#FF0000" style="color:#FFF">${info.matches.league}</td>
			  </c:when>
			  <c:otherwise>
			  <td style="color:#FFF; background:#F60">${info.matches.league}</td>
			  </c:otherwise>
			</c:choose>
				<td>${info.matches.gameTime}</td>
				<td>${info.matches.team1}</td>
				<td> VS</td>
				<td> ${info.matches.team2}</td>
				<td> <c:choose><c:when test="${info.result.result=='null'}"></c:when><c:otherwise>${info.result.result} </c:otherwise></c:choose></td>
				<td> ${info.result.newResult} </td>
				 <td><c:choose><c:when test="${info.result.b2=='null'}">-</c:when><c:otherwise>${info.result.b2}</c:otherwise></c:choose></td>
				<!--<td>3.11</td> -->
			</tr>
			</c:if>
			</c:forEach>
		</tbody>
	</table>
		<table class="account_day mobileRechargeCard none" cellspacing="0" cellpadding="0">
		<tbody>
			<tr>
				<th>赛事编号</th>
				<th>联赛</th>
				<th>比赛时间</th>
				<th>客队</th>
				<th>&nbsp;</th>
				<th>主队</th>
				<th>终场比分</th>
				<th>预设总分</th>
				<th>彩果</th>
				<th>奖金</th>
				<!-- <th>主胜</th> -->
			</tr>
			<c:forEach items="${saiguoInfo }" varStatus="s" var="info">
			<c:if test="${info.result.cancel=='0'}">
			<c:choose>
			  <c:when test="${s.index%2!=0}">
			  <tr class="accountDay_whiteBg">
			  </c:when>
			  <c:otherwise>
			  <tr class="accountDay_greyBg">
			  </c:otherwise>
			</c:choose>
				<td>${info.matches.newweek}${info.matches.teamid} </td>
			<c:choose>
			  <c:when test="${s.index%2!=0}">
			 <td bgcolor="#FF0000" style="color:#FFF">${info.matches.league}</td>
			  </c:when>
			  <c:otherwise>
			  <td style="color:#FFF; background:#F60">${info.matches.league}</td>
			  </c:otherwise>
			</c:choose>
				<td>${info.matches.gameTime}</td>
				<td>${info.matches.team1}</td>
				<td> VS</td>
				<td> ${info.matches.team2}</td>
				<td> <c:choose><c:when test="${info.result.result=='null'}"></c:when><c:otherwise>${info.result.result} </c:otherwise></c:choose></td>
				<td><c:choose><c:when test="${info.result.basepoint=='null'}">-</c:when><c:otherwise>${info.result.basepoint}</c:otherwise></c:choose></td>
				<td> ${info.result.newResult1} </td>
				 <td><c:choose><c:when test="${info.result.b3=='null'}">-</c:when><c:otherwise>${info.result.b3}</c:otherwise></c:choose></td>
				<!--<td>3.11</td> -->
			</tr>
			</c:if>
			</c:forEach>
		</tbody>
	</table>
	
