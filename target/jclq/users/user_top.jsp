<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="/WEB-INF/util.tld" %>
<%@ page import="com.ruyicai.jclq.bean.Tuserinfo,net.sf.json.JSONObject,com.ruyicai.util.JSONReslutUtil,com.ruyicai.util.NameUtil" %>
<script type="text/javascript">
	//增加获取当前地址并登录成功后跳转到这个地址
	$(function() {
		var reqUrl = window.location.href;
		$("#reqUrl").val(encodeURIComponent(reqUrl));
		$("#reqUrlLog").val(encodeURIComponent(reqUrl));
	});
  function loginRequrl(){
	  var check = "";
		$.ajax({
			url: basepath + "/common/getChannel.jsp",
			//后台处理程序
			type: "POST",
			//数据发送方式
			async: false,
			dataType: 'html',
			//接受数据格式
			success: function(data) {
				if (data.indexOf("650") > -1) {
					if (confirm(decodeURI(EncodeUtf8("您未登录，请先登录！")))) {
						window.location.href = "http://s.9666.cn/";
					}
					return false;

				} else if (data.indexOf("660") > -1) {
					if (confirm(decodeURI(EncodeUtf8("您未登录，请先登录！")))) {
						window.location.href = "http://www.55188.com/lottery.php";
					}
					return false;
				}else if (data.indexOf("694") > -1) {
					if (confirm(decodeURI(EncodeUtf8("您未登录，请先登录！")))) {
						window.location.href = "http://test.chplan.net:9090/chplan/login.jsp?service=http://test.chplan.net:9090/chplan/caipiao.do";
					}
					return false;
				}else if (data.indexOf("636") > -1) {
					if (confirm(decodeURI(EncodeUtf8("您未登录，请先登录！")))) {
						window.location.href = "http://www.88967.com";
					}
					return false;
				}else{
					if ($(".ButtonChannelBuy").hasClass("selected")) {
						loginShow();
						var str ="<form action='http://users.ruyicai.com/login.jsp?reqUrl=/login.jsp' id='topjump' method='post' target='_blank'></form>";
						$("body").append(str);
						$("#topjump").submit();
						$("body").remove(str);
					}else{
						 window.location.href = "http://users.ruyicai.com/login.jsp?reqUrl="+$("#reqUrl").val();
						}
					
				}
			}
		});
		
  }
</script>
<%
	JSONObject user = JSONReslutUtil.getUserInfo(request);
System.out.print(user);
%>
<input id="reqUrl" type="hidden" value="" name="reqUrl" class="SelectedAddressInput">
<%if(user!=null&&!user.getJSONObject("value").equals("null")&&!(user.getJSONObject("value").isEmpty())){ %>
<% user.put("t_name",NameUtil.getNameUtilJson(user.getJSONObject("value"))) ;%>
	<%//1.判断用户是登陆？已登录，则获取用户信息 %>
		<input type="hidden" value="<%=user.get("t_name") %>" id="nick">

			<%//1.2有昵称则正常跳转回首页 %>
				<!-- 登陆后 账户信息及账户操作 start -->
				<script>
					balanceDivDis("topLogin_money", "", "freeze_money");
				</script>
				<dl class="LoginLater">
					<dt>
						<font>
							欢迎您，
						</font>
						<a href="/rules/user.html?key=33" target="_blank">
							<%=user.get("t_name") %>
						</a>
					</dt>
					<dd>
						<div class="SelectAccount" onmouseover="HoverOver($(this))" onmouseout="HoverOut($(this))"
						onclick="javaScript:window.location.href='/rules/user.html?key=23'">
							我的账户
							<span class="SelectTriangle">
							</span>
							<span class="line">
							</span>
							<dl>
								<dt><em>可用余额：<i>¥</i><i id="topLogin_money"></i>元</em></dt>
								<dd><em>冻结资金：<i>¥</i><i id="freeze_money"></i>元</em></dd>
							</dl>
						</div>
					</dd>
					<dt>
						|<a href="/rules/user.html?key=4" target="_blank">充值</a>
						|<a href="/rules/user.html?key=11" target="_blank">提款</a>
						|<a href="javascript:ajaxLoginOut();">退出</a>
					</dt>
				</dl>
				<!-- 登陆后 账户信息及账户操作end -->
<%}else{%>
	<%//3. 用户没有登陆 也不是彩多多的用户则 跳回首页 %>
			<dt><em>您好，欢迎来到如意彩！</em></dt>
			<dt><a href="javaScript:loginRequrl();">请登录</a><a href="http://users.ruyicai.com/register/register_new.jsp">免费注册</a></dt>
			<dd>
				<div class="SelectLogin" onmouseover="HoverOver($(this))" onmouseout="HoverOut($(this))">
					免注册登录
					<span class="line">
					</span>
					<dl>
						<dt>
							<a href="http://users.ruyicai.com/function/unitedLogin!qqUnitedHandlyLogin"><img src="/images/login_QQ.gif" />QQ</a>
						</dt>
						<dd><a href="http://users.ruyicai.com/function/unitedLogin!alipayHandyLogin"><img src="/images/login_zhiFuBao.gif" />支付宝</a>
						</dd>
					</dl>
				</div>

			</dd>
			<input id="reqUrlLog" type="hidden" value="" name="reqUrl" class="SelectedAddressInput">
			<input type="hidden" value="0"  name="rank_value" />
<%} %>