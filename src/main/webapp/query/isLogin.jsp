<%@ page language="java" contentType="text/html; charset=UTF-8"   pageEncoding="UTF-8"%><%@page 
import=" com.ruyicai.util.JSONReslutUtil,net.sf.json.JSONObject"%>
<% 
JSONObject isObj =  JSONReslutUtil.getUserNo(request);
if(isObj!=null&&isObj.getString("errorCode").equals("0")){ 
%>{false}<%}else{ 
%>{true}<%} %>