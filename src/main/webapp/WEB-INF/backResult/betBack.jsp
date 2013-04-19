<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html>
<head>
<script type="text/javascript" src="/jclq/js/jqueryJS/jquery-1.5.min.js"></script>
<script type="text/javascript" src="/jclq/js/util.js"></script>
<script type="text/javascript" src="/jclq/js/jqueryJS/jquery.jmpopups-0.5.1.js" ></script>
<link rel="stylesheet" type="text/css" href="/jclq/css/util.css" />
<title>投注返回</title>
</head>
<body>
<c:choose>
<c:when test="${ jsonObject.errorCode==0}">
	<script type="text/javascript">
	  	if(self!=top){
			window.parent.document.location.href = '/jclq/backResult/betSuccess.html?cai=${requestScope.cai}&urlAdd=${requestScope.urlAdd}';
		}else{
			location.href = '/jclq/backResult/betSuccess.html?cai=${requestScope.cai}&urlAdd=${requestScope.urlAdd}&goUrl=${requestScope.gourl}';
		}
	</script>
</c:when>
<c:when test="${jsonObject.errorCode==20100710}">
		   <script type="text/javascript">
			if(confirm("您的可投注余额不足，请先充值！")){
				top.location.href="http://www.ruyicai.cm/rules/user.html?key=4";
			}else{
				if(self!=top){
					top.history.back(-1);
				}else{
					history.back(-1);
				}
				
			}
		</script>
</c:when>
<c:otherwise>
	<input type="hidden" name="message" id="message" value='${ jsonObject.message}"/>'></input>
	<input type="hidden" name="url" id="url" value="${url}"></input>
<script type="text/javascript">
function loadWindow(){
	if(document.readyState == "complete") {
		openAlert($("#message").val());
		if(self!=top){
			window.parent.document.location.href = $("#url").val();
		}else{
			location.href = $("#url").val();
		}
	}else{  
		setTimeout("loadWindow()", 500);
	}
}
loadWindow();
</script>
</c:otherwise>
</c:choose>
<!-- 弹出框 开始 -->
<jsp:include page="/common/public_touZhuAlert_dipin.jsp"></jsp:include>
<!-- 弹出框 结束 -->
<!-- 登陆隐藏层 begin-->
<jsp:include page="/common/ruyicai_include_common_login_div.jsp"/>
<jsp:include page="/common/alertTiShi.jsp"></jsp:include>
<!-- 登陆隐藏层end -->
<!-- 使页面上有值的文本框的内容选中 -->
<script>inputSelect();</script>
</body>
</html>