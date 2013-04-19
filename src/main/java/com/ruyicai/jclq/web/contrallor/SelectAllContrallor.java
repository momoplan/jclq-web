package com.ruyicai.jclq.web.contrallor;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ruyicai.jclq.web.util.CodeUtil;
import com.ruyicai.jclq.web.util.Constant;
import com.ruyicai.jclq.web.util.ResourceBundleUtil;
import com.ruyicai.util.JSONReslutUtil;
import com.ruyicai.util.NameUtil;
import com.ruyicai.util.TorderState;




@Controller

public class SelectAllContrallor {
	
	/**
	 * 
	 * 查询账号余额 原findBalance方法 
	 * 
	 */
	@RequestMapping("/ajaxFindAccount.do")
	public String ajaxFindAccount(HttpServletRequest request,
			HttpServletResponse response){
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		try {
			JSONObject user = JSONReslutUtil.getUserInfo(request);
			if(user!=null){
			 user =user.getJSONObject("value");
			 JSONObject obj =JSONObject.fromObject(
						JSONReslutUtil.getResultMessage(
								ResourceBundleUtil.LINKURL + "select/getAccount?","userno="+user.getString("userno"),"POST"))
								.getJSONObject("value");
				double deposit_amount = obj.getDouble("balance")-obj.getDouble("freezebalance");
				double valid_amount = obj.getDouble("balance")-obj.getDouble("freezebalance")>=obj.getDouble("drawbalance")?obj.getDouble("drawbalance"):obj.getDouble("balance")-obj.getDouble("freezebalance");
				JSONObject reobj  = new JSONObject();
				reobj.put("deposit_amount", deposit_amount/100);
				reobj.put("valid_amount", valid_amount/100);
				reobj.put("freeze_amout", obj.getDouble("freezebalance")/100);
				reobj.put("userName", user.getString("userName"));
				reobj.put("nickName",NameUtil.getNameUtilJson(user));
				response.getWriter().print(reobj.toString());
				return null; 
			}else{
				return "error";
			}
		
		} catch (Exception e) {
			return "error";
		}
		
	}
    /**根据orderid 查询五条投注记录的信息,     投注记录详情查询
     * @return
     */
	@RequestMapping("/getBetSelect.do")
   public String getBetSelect(HttpServletRequest request,
			HttpServletResponse response){
	   String type="";
    	try{
    		//界面获取参数
	    	SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	    	String orderid = request.getParameter("flowno")==null?"":request.getParameter("flowno");
	    	 type = request.getParameter("type")==null||"null".equals(request.getParameter("type"))?"-1":request.getParameter("type");
	    	//判断是否是当前登录用户
	    	String checkNo = "1";
	    	//根据orderid得到票的信息
	    	//参数userno=用户编号&beginTime=开始时间&endTime=结束时间&startLine=开始记录数（默认为0）&endLine=结束记录数（默认为10）
			
			JSONObject torderObj=JSONObject.fromObject(JSONReslutUtil.getResultMessage(ResourceBundleUtil.LINKURL 
					+ "/select/getTorder?" + "&orderid=" + orderid)).getJSONObject("value");
			String bettype = torderObj.getString("bettype");
			if(bettype != null && !"".equals(bettype)){
				if(Integer.parseInt(bettype) != 3){//不是合买 需要判断是否是发起人的订单
					String userno = torderObj.getString("userno");
					if(!userno.equals( JSONReslutUtil.getUserNo(request))){
						checkNo = "0";
					} 
				}
			}
			String lotno = torderObj.getString("lotno");
			String startTime = format.format(new Date(torderObj.getLong("createtime"))).substring(0,10).replace("-", "");
			String batchcode = torderObj.getString("batchcode");
			String betcode = torderObj.getString("betcode");
			String betcodeCopy="";
			if(betcode.indexOf("$")>-1){
				String[] str=betcode.split("\\$");
				String[] s1=str[0].split(",");
				String[] s2=str[1].split(",");
				for(int i=0;i<s1.length;i++){
					if(s1[i].equals("#")){
						betcodeCopy=betcodeCopy+s2[i]+",";
					}else{
						betcodeCopy=betcodeCopy+s1[i]+",";
					}
				}
			}
			torderObj.put("createtime", format.format(new Date(torderObj.getLong("createtime"))));
			if(torderObj.getInt("orderstate")==TorderState.orderState_Null.value()){
				torderObj.put("orderstate", TorderState.orderState_Null.memo());
			}else if(torderObj.getInt("orderstate")==TorderState.orderState_ok.value()){
				torderObj.put("orderstate", TorderState.orderState_ok.memo());
			}else if(torderObj.getInt("orderstate")==TorderState.orderState_wait.value()){
				torderObj.put("orderstate", TorderState.orderState_wait.memo());
			}
			request.setAttribute("torder", torderObj);
			
			JSONObject tlotObj=JSONObject.fromObject(JSONReslutUtil.getResultMessage(ResourceBundleUtil.LINKURL 
					+ "/select/getTorderDetail?" ,  "orderid=" + orderid+"&flag="+type,"POST")).getJSONObject("value");
			
			//betcodeFormat(tlotObj.getJSONObject("torder"), true, 0 ,request,null);

		    /*	//获取指定play_name(彩种)和batchcode（期号）查询当前这张彩票的开奖信息
		    	JSONObject twinInfoJsonObj = JSONObject.fromObject(
					JSONReslutUtil.getResultMessage(
						ResourceBundleUtil.LINKURL + "/select/getTwininfo?",
						"lotno="+lotno+"&issue="+batchcode
						,"POST"));
		    	
		    	//如果这张彩票还未开奖，则隐藏开奖部分的信息
		    	if(SimpleDateUtil.getBackValue("errorCode", twinInfoJsonObj).equals(ErrorCode.OK.value)){
		    		twinInfoJsonObj = twinInfoJsonObj.getJSONObject("value");
		    		
		    		twinInfoJsonObj = getDrawLotteryContent(lotno,twinInfoJsonObj);
		    		String changeWinCode = twinInfoJsonObj.getString("winbasecode");
		    		if(Constant.SSQ.equals(lotno)||Constant.QLC.equals(lotno)||Constant.SD.equals(lotno)){
		    			String newChangeWincode ="";
		    			for(int k=0;k<twinInfoJsonObj.getString("winbasecode").length()-1;k+=2){
		    				newChangeWincode += twinInfoJsonObj.getString("winbasecode").substring(k, k+2)+",";
		    			}
		    			changeWinCode = newChangeWincode.substring(0, newChangeWincode.length()-1);
		    			betcodeFormat(tlotObj.getJSONObject("torder"),true,0 ,request,changeWinCode+"＋"+twinInfoJsonObj.getString("winspecialcode"));
		    		}else if(Constant.DLT.equals(lotno)){
		    			String red = "";
		    			String blue = "";
		    			for(int k=0;k<twinInfoJsonObj.getString("winbasecode").substring(0,10).length()-1;k+=2){
		    				red+=twinInfoJsonObj.getString("winbasecode").substring(k, k+2)+",";
		    			}
		    			if(twinInfoJsonObj.getString("winbasecode").length()>14){
		    			for(int k=0;k<twinInfoJsonObj.getString("winbasecode").substring(11).length()-1;k+=2){
		    				blue+=twinInfoJsonObj.getString("winbasecode").substring(11).substring(k, k+2)+",";
		    			}}else{
		    				for(int k=0;k<twinInfoJsonObj.getString("winspecialcode").length()-1;k+=2){
			    				blue+=twinInfoJsonObj.getString("winspecialcode").substring(k, k+2)+",";
			    			}
		    			}
		    			changeWinCode = red.substring(0, red.length()-1)+"＋"+blue.substring(0, blue.length()-1);
		    			betcodeFormat(tlotObj.getJSONObject("torder"),true,0 ,request,changeWinCode);
		    		}else{
		    			betcodeFormat(tlotObj.getJSONObject("torder"),true,0 ,request,changeWinCode+"＋"+twinInfoJsonObj.getString("winspecialcode"));
		    		}
		    		logger.info("本期彩票开奖后，所有的信息：twinInfoJsonObj===>"+twinInfoJsonObj);
		    		//betcodeFormat(tlotObj.getJSONObject("torder"), true, 5 ,request,twinInfoJsonObj.getString("winbasecode"));
		    		request.setAttribute("winInfo", twinInfoJsonObj);
		    		
		    	}*/
		    	
		    	/*//获取当前票对应的期信息
		    	JSONObject tlotctrlJsonObj = JSONObject.fromObject(
						JSONReslutUtil.getResultMessage(
							ResourceBundleUtil.LINKURL + "/select/getTlotctrl?" +
							"lotno="+lotno+"&batchcode="+batchcode
							)).getJSONObject("value");
		    	*/
		    	//存储页面所需要的内容
		    	//保留 5组注码
		    /*	if(tlotctrlJsonObj!=null&&tlotObj.getJSONArray("tlots").size()>5){
		    		for (int i = tlotObj.getJSONObject("torder").getJSONArray("tlots").size()-1; i > 4; i--) {
		    			tlotObj.getJSONObject("torder").getJSONArray("tlots").remove(tlotObj.getJSONObject("torder").getJSONArray("tlots").size()-1);
					}
		    	}*/
		    /*	request.setAttribute("lot", tlotObj.getJSONObject("torder").getJSONArray("tlots"));//票信息
		    	request.setAttribute("lotSize", tlotObj.getJSONObject("torder").getJSONArray("tlots").size());//票信息
*/		    	/*if("2".equals(type)||"1".equals(type)){
		    		String name = tlotObj.getJSONObject("tuserinfo").getString("nickname");
			    	String phone = (tlotObj.getJSONObject("tuserinfo").getString("mobileid")!=null
							&&tlotObj.getJSONObject("tuserinfo").getString("mobileid").length()>6
							?tlotObj.getJSONObject("tuserinfo").getString("mobileid").substring(0,4)+"***"
							:"-"); 
			    	request.setAttribute("zengcaiName", name.equals(" ")||name=="null"?phone:name);//票信息
		    	}*/
		    	/*if(!(tlotctrlJsonObj==null||tlotctrlJsonObj.equals("null")||tlotctrlJsonObj.isNullObject())){
		    		tlotctrlJsonObj.put("endtime", format.format(new Date(tlotctrlJsonObj.getLong("endtime"))));
		    	}
		    	
		    	request.setAttribute("lotctrl", tlotctrlJsonObj);//票对应的期信息
*/		    	request.setAttribute("checkNo", checkNo);
		    	request.setAttribute("betcodeCopy", betcodeCopy);
		    	JSONObject tusers = JSONReslutUtil.getUserInfo(request).getJSONObject("value");
				//String nickName = arrList.getJSONObject(i).getJSONObject("starter").getString("nickname").trim()==""||arrList.getJSONObject(i).getJSONObject("starter").getString("nickname")=="null"?NameUtil.getNameUtilJson(tusers):arrList.getJSONObject(i).getJSONObject("starter").getString("nickname");
		    	request.setAttribute("username", NameUtil.getNameUtilJson(tusers));
		    		
	    		//调用 查询对阵信息的方法(分竞彩、其它足彩)
		    	if(Constant.JCZQ_SPF.equals(lotno)||Constant.JCLQ_SFC.equals(lotno)||Constant.JCLQ_SF.equals(lotno)||Constant.JCLQ_RFSF.equals(lotno)||Constant.JCLQ_DXF.equals(lotno)){
		    		if(tlotObj.has("torder")){
		    			//获取时间、周次、场次、
		    			JSONArray lastArray = new JSONArray();
		    			JSONObject pastMethod = new JSONObject();
		    			String allmethod="";
		    			JSONObject torder = tlotObj.getJSONObject("torder");
		    			String []everylot = torder.getString("betcode").split("\\!");
		    			for(int s= 0;s<everylot.length;s++){
		    				String [] torstring = everylot[s].split("\\^");
		    				String time="";
			    			for(int i=0;i<torstring.length;i++){
			    				String [] stringl = (torstring[i]).split("\\|");
			    				if(i==0){
			    					String[] gettime=(stringl[0]).split("@");
			    					time = gettime[1];
			    					String pmethod = gettime[0];
			    					String method = CodeUtil.getLotnoBetType(pmethod, lotno, "").getString("memo")+"、";
			    					allmethod=allmethod+method;
			    					/*JSONObject evermethod = new JSONObject();
			    					evermethod.put("pastMethod",method);
			    					pastMethod.add(evermethod);*/
			    				}else{
			    					time=stringl[0];
			    				}
			    				
					    		String weekid = stringl[1];
					    		String teamid = stringl[2];
					    		if(Constant.JCLQ_SFC.equals(lotno)||Constant.JCLQ_SF.equals(lotno)||Constant.JCLQ_RFSF.equals(lotno)||Constant.JCLQ_DXF.equals(lotno)){
					    			stringl[3]= CodeUtil.getLQTouzhu(stringl[3], lotno);
					    		}
					    		//获取到选项数据
					    		//JSONObject selectInfo = new JSONObject();
					    		JSONObject returnarray = this.getJingCaiAgainstInfo(lotno, time, weekid, teamid);
					    		//selectInfo.put("selectInfo",stringl[3]);
					    		if(Constant.JCLQ_SFC.equals(lotno)||Constant.JCLQ_SF.equals(lotno)||Constant.JCLQ_RFSF.equals(lotno)||Constant.JCLQ_DXF.equals(lotno)){
					    			JSONObject result = returnarray.getJSONObject("result");
					    			String strArr[] = ((String) (returnarray.getJSONObject("matches").get("team"))).split("\\:");
					    			returnarray.getJSONObject("matches").put("team1", strArr[0]);
					    			returnarray.getJSONObject("matches").put("team2", strArr[1]);
					    			
					    			returnarray.getJSONObject("matches").put("newweek",
										SelectDZContrallor.getWeekStr(String.valueOf(returnarray.getJSONObject("matches").get("weekid"))));
					    			if(result.getString("result")!="null"){
					    				String[]  resultArr = (result.getString("result")).split("\\:");
					    				result.put("result",resultArr[1]+ ":"+resultArr[0]);
					    				if(Integer.valueOf(resultArr[0])>Integer.valueOf(resultArr[1])){
					    					result.put("newResult", "主胜");
					    					result.put("newResult1", "小分");
					    				}else{
					    					result.put("newResult", "主负");
					    					result.put("newResult1", "大分");
					    				}
					    				}else{
					    					result.put("newResult", "");
					    				}
					    		}
					    		returnarray.put("selectInfo",stringl[3]+" ");
					    		lastArray.add(returnarray);
			    			}
		    			}
		    			String lastmethod = allmethod.substring(0,allmethod.length()-1);
		    			pastMethod.put("pastMethod",lastmethod);
		    			request.setAttribute("pastMethod", pastMethod);
			    		request.setAttribute("lastArray",lastArray);
			    		System.out.println("-----------------"+lastArray);
		    		}
		    		
		    	}/*else{
		    		if(!(tlotctrlJsonObj==null||tlotctrlJsonObj.equals("null")||tlotctrlJsonObj.isNullObject())){
		    			this.getAgainstInfo(lotno, batchcode,JSONObject.fromObject(JSONArray.fromObject(tlotObj.getJSONArray("tlots")).get(0)).getString("currentbetcode"));
		    		}
		    	}*/
    	}catch (Exception e) {
		}
    	/*if("2".equals(type)||"1".equals(type)){
    		request.setAttribute("type", type);
    		return "giftBetInfo";
    	}{*/
	    	return "query/betInfo";
    	//}
    }
   /** 查询竞彩的对阵数据信息
	 * 
	 * @param lotno  竞彩lotno
	 * @param time   时间
	 * @param weekid   周数
	 * @param teamid    场次
	 */
	public JSONObject getJingCaiAgainstInfo (String lotno,String time,String weekid,String teamid) throws Exception{
		
		JSONObject returnObject = JSONObject.fromObject(
				JSONReslutUtil.getResultMessage(ResourceBundleUtil.LINKURL +
						"/select/getjingcaimatches?lotno="+lotno+"&day="+time+"&weekid="+weekid+"&teamid="+teamid));
		
		if(!returnObject.isNullObject()&& returnObject.getString("errorCode").equals("0")){
			JSONObject againstValue =JSONObject.fromObject(JSONObject.fromObject(returnObject.get("value")));
			//request.setAttribute("againstValue", againstValue);
			return againstValue;
		}
		return null;
	}
}
