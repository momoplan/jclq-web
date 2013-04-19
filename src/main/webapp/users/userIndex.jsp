<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="com.ruyicai.jclq.bean.Tuserinfo,net.sf.json.JSONObject,com.ruyicai.util.JSONReslutUtil,com.ruyicai.util.NameUtil" 
%><% JSONObject user = JSONReslutUtil.getUserInfo(request);if(user!=null){
user.put("t_name",NameUtil.getNameUtilJson(user.getJSONObject("value"))) ;%><%=user.get("t_name")%><%}else{ %><%} %>
