package com.ruyicai.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import com.jrt.betcodeResolve.service.JCResolveService;
import com.ruyicai.jclq.bean.BetRequest;
import com.ruyicai.jclq.bean.BetcodeBean;
import com.ruyicai.jclq.bean.CaseLotRequest;
import com.ruyicai.jclq.bean.OrderRequest;
import com.ruyicai.jclq.bean.SubscribeRequest;
import com.ruyicai.jclq.bean.Tuserinfo;
import com.ruyicai.jclq.web.util.ResourceBundleUtil;
import com.ruyicai.jclq.web.util.dto_Sales;
import com.ruyicai.util.URLEncoder;


public class BettingUtil {

	private static Logger logger = Logger.getLogger(BettingUtil.class);
	
	/**
	 * 代购订单投注功能
	 * @param lotno 彩种
	 * @param betcode 注码
	 * @param multiple 倍数
	 * @param oneMoney  大乐透投注算金额的方法
	 * @param user 用户
	 * @param batchCode 期号
	 * @param wanfa 页面传入的玩法
	 * @param request 
	 * @return JSONObject 后台返回的内容（包括errorCode及根据errorCode获取的信息）
	 * @throws Exception
	 */
	public static JSONObject getOrderBet(String lotno, String betcode, int multiple,
			String oneMoney, Tuserinfo user,String batchCode,String wanfa,
			HttpServletRequest request) throws Exception{
		JSONObject obj  = null;
		//1.根据彩种、注码、倍数调用算注数和金额的方法获取共有几张票得集合
		List<BetcodeBean> list = getBetcodeBeanList(lotno, betcode, multiple,getSuperaddition(oneMoney));
		logger.info("要投注的注码一共有" + list.size() + "张彩票");
		
		//2.调用查询账户余额获取用户账号的可投注金额
		JSONObject objBalance= CommonUtil.fiandBalance(request);
		double depositMoney = objBalance.getDouble("balance");//可投注金额
		
		int totalMoney = 0;int totalBetnum =0;
		List<BetRequest> betRequests=new ArrayList<BetRequest>();
		BetRequest betRequest = null;
		//获取传入的彩种和玩法算得销售代码值		
		BigDecimal oneamount = new BigDecimal(0);
		
		//3.循环累加用户投注的金额获取投注的总金额及设置BetRequest类投注所需内容
		for(int i=0;i<list.size();i++){
			BetcodeBean betcodeBean = (BetcodeBean)list.get(i);
			//获取订单总投注金额
			totalMoney += Integer.parseInt(betcodeBean.getTotalMoney());
			totalBetnum += Integer.parseInt(betcodeBean.getZhushu());
			//BigDecimal类型的倍数
			BigDecimal bd_multiple = new BigDecimal(multiple);
			
			//获取订单的每注金额及每注注码及追号的期数
			betRequest = new BetRequest();
			betRequest.setAmt(new BigDecimal(betcodeBean.getTotalMoneyFen()).divide(bd_multiple));
			if(i==0){
				oneamount = new BigDecimal(Long.valueOf(betcodeBean.getTotalMoneyFen())/Long.valueOf(betcodeBean.getZhushu())/Long.valueOf(betcodeBean.getMultiple()));
			}
			if(lotno.startsWith("F")){
			betRequest.setBetcode(betcodeBean.getBetcode().substring(0,2)+"01"+betcodeBean.getBetcode().substring(4));
			}else{
				betRequest.setBetcode(betcodeBean.getBetcode());
			}
			betRequests.add(betRequest);
		}
		logger.info("用户要投注金额:"+totalMoney+"元;实际账户可投注余额:"+depositMoney
				+"元;投注的集合betRequests共"+betRequests.size()+"个");
		
		//4.判断用户账户中可投注的金额是否大于当前追号的金额
		if(totalMoney <= depositMoney){
			//设置订单类传给lottery后台
			OrderRequest orderRequest = new OrderRequest();
			orderRequest.setLotno(lotno);
			orderRequest.setBatchcode(batchCode);
			orderRequest.setAmt(new BigDecimal(totalMoney*100));
			orderRequest.setUserno(user.getUSERNO());
			orderRequest.setLotmulti(new BigDecimal(multiple));
			orderRequest.setBuyuserno(user.getUSERNO());
			orderRequest.setChannel((String)request.getSession().getAttribute("CHANNEL"));
			orderRequest.setSubchannel(ResourceBundleUtil.DEFALUT_SUBCHANNEL);
			orderRequest.setPaytype(new BigDecimal(1));
			orderRequest.setMemo(getMemo(wanfa, lotno,betcode));
			orderRequest.setLotsType(new BigDecimal(getMemo2(wanfa, lotno,betcode)));//	投注类型 ，合买使用
			orderRequest.setBetRequests(betRequests);
			orderRequest.setSubscribeRequests(null);
			orderRequest.setOneamount(oneamount);
			orderRequest.setBettype("2");//zhuihao(0), taocan(1), touzhu(2),hemai(3),zengsong(4),zengsong_nosms(5);
			//调用订单投注的方法
			String url =ResourceBundleUtil.LINKURL +"/bet/tobetOrder?body="+JSONObject.fromObject(orderRequest);
			String re=JSONReslutUtil.getResultMessage( ResourceBundleUtil.LINKURL +"/bet/tobetOrder?","body="+JSONObject.fromObject(orderRequest),"POST");
			obj = JSONObject.fromObject(re);
			if(!obj.isNullObject()){
				obj.put("message", ErrorCode.getMemo(obj.getString("errorCode")));
				dto_Sales.recordedSales(user.getUSERNO(), user.getUSERNAME(), totalMoney, lotno, orderRequest.getMemo(), multiple+"倍"+totalBetnum+"注[代购]");
			}else{
				obj.put("message", MessageUtil.ERROR_Message);
			}
		}else{
			obj = new JSONObject();
			obj.put("errorCode", "20100710");
			obj.put("message", "您的可投注余额不足，请先充值！");
		}
		 
		return obj;
	}
	/**
	 * 合买订单投注功能
	 * @param lotno 彩种
	 * @param betcode 注码
	 * @param multiple 倍数
	 * @param oneMoney  大乐透投注算金额的方法
	 * @param user 用户
	 * @param batchCode 期号
	 * @param wanfa 页面传入的玩法
	 * @param request 
	 * @return JSONObject 后台返回的内容（包括errorCode及根据errorCode获取的信息）
	 * @throws Exception
	 */
	public static JSONObject getOrderBetHemai(String lotno, String betcode, int multiple,
			String oneMoney, Tuserinfo user,String batchCode,String wanfa,
			HttpServletRequest request) throws Exception{
		JSONObject obj  = null;
		//1.根据彩种、注码、倍数调用算注数和金额的方法获取共有几张票得集合
		List<BetcodeBean> list = getBetcodeBeanList(lotno, betcode, multiple,getSuperaddition(oneMoney));
		logger.info("要投注的注码一共有" + list.size() + "张彩票");
		
		//2.调用查询账户余额获取用户账号的可投注金额
		JSONObject objBalance = CommonUtil.fiandBalance(request);
		double depositMoney = objBalance.getDouble("balance");//可投注金额
		
		int totalMoney = 0;int totalBetnum =0;
		List<BetRequest> betRequests=new ArrayList<BetRequest>();
		BetRequest betRequest = null;
		//获取传入的彩种和玩法算得销售代码值
		BigDecimal oneamount = new BigDecimal(0);
		
		//3.循环累加用户投注的金额获取投注的总金额及设置BetRequest类投注所需内容
		for(int i=0;i<list.size();i++){
			BetcodeBean betcodeBean = (BetcodeBean)list.get(i);
			//获取订单总投注金额
			totalMoney += Integer.parseInt(betcodeBean.getTotalMoney());
			totalBetnum += Integer.parseInt(betcodeBean.getZhushu());
			//BigDecimal类型的倍数
			BigDecimal bd_multiple = new BigDecimal(multiple);
			
			//获取订单的每注金额及每注注码及追号的期数
			betRequest = new BetRequest();
			betRequest.setAmt(new BigDecimal(betcodeBean.getTotalMoneyFen()).divide(bd_multiple));
			if(i==0){
				oneamount = new BigDecimal(Long.valueOf(betcodeBean.getTotalMoneyFen())/Long.valueOf(betcodeBean.getZhushu())/Long.valueOf(betcodeBean.getMultiple()));
			}
			if(lotno.startsWith("F")){
				betRequest.setBetcode(betcodeBean.getBetcode().substring(0,2)+"01"+betcodeBean.getBetcode().substring(4));
			}else{
				betRequest.setBetcode(betcodeBean.getBetcode());
			}
			betRequests.add(betRequest);
		}
		logger.info("用户要投注金额:"+totalMoney+"元;实际账户可投注余额:"+depositMoney
				+"元;投注的集合betRequests共"+betRequests.size()+"个");
		
		JSONObject clrJson = request.getParameter("jsonStringCLR")==null||"".equals(request.getParameter("jsonStringCLR"))?null:JSONObject.fromObject(request.getParameter("jsonStringCLR"));
		//4.判断用户账户中可投注的金额是否大于当前追号的金额
		if("hemai".equals(request.getParameter("daiGou"))&&clrJson.getLong("buyAmt")+clrJson.getLong("safeAmt")<=depositMoney){
			//设置订单类传给lottery后台
			OrderRequest orderRequest = new OrderRequest();
			orderRequest.setLotno(lotno);
			orderRequest.setBatchcode(batchCode);
			orderRequest.setAmt(new BigDecimal(totalMoney*100));
			orderRequest.setUserno(user.getUSERNO());
			orderRequest.setLotmulti(new BigDecimal(multiple));
			orderRequest.setBuyuserno(user.getUSERNO());
			orderRequest.setChannel((String)request.getSession().getAttribute("CHANNEL"));
			orderRequest.setSubchannel(ResourceBundleUtil.DEFALUT_SUBCHANNEL);
			orderRequest.setPaytype(new BigDecimal(1));
			orderRequest.setMemo(getMemo(wanfa, lotno,betcode));
			orderRequest.setLotsType(new BigDecimal(getMemo2(wanfa, lotno,betcode)));//	投注类型 ，合买使用
			orderRequest.setBetRequests(betRequests);
			orderRequest.setSubscribeRequests(null);
			orderRequest.setOneamount(oneamount);
			if("hemai".equals(request.getParameter("daiGou"))){
				orderRequest.setBettype("3");//zhuihao(0), taocan(1), touzhu(2),hemai(3),zengsong(4),zengsong_nosms(5);
				CaseLotRequest clr = new CaseLotRequest();
				clr.toBean(clrJson);
				clr.setTotalAmt(orderRequest.getAmt().longValue());//合买总金额取投注总金额
				clr.setStarter(user.getUSERNO());
				clr.setBuyAmt(clr.getBuyAmt()*100);
				clr.setSafeAmt(clr.getSafeAmt()*100);
				clr.setMinAmt(clr.getMinAmt()*100);
				String desc = clr.getDesc();
				if(!"中".equals(clrJson.getString("isIe"))){
					desc = URLEncoder.decode(desc);
				}
				clr.setDesc(desc);
				orderRequest.setCaseLotRequest(clr);
			}
			//调用订单投注的方法
			String re=JSONReslutUtil.getResultMessage(ResourceBundleUtil.LINKURL +"/caselot/caselotOrder?","body="+JSONObject.fromObject(orderRequest),"POST");
			obj = JSONObject.fromObject(re);
			if(obj.getString("errorCode").equals("0")){
				//合买认购成功之后调用生成静态页面的方法
				JSONReslutUtil.sendUrl(ResourceBundleUtil.LINKSMSCOUNTURL+"/phoneInfo!refreshHemaiPage?lotno="+lotno);
			}
			if(!obj.isNullObject()){
				obj.put("message", ErrorCode.getMemo(obj.getString("errorCode")));
				dto_Sales.recordedSales(user.getUSERNO(), user.getUSERNAME(), totalMoney, lotno, orderRequest.getMemo(), multiple+"倍"+totalBetnum+"注[代购]");
			}else{
				obj.put("message", MessageUtil.ERROR_Message);
			}
		}else{
			obj = new JSONObject();
			obj.put("errorCode", "20100710");
			obj.put("message", "您的可投注余额不足，请先充值！");
		}
		
		return obj;
	}
	
	
	/**
	 * 订单追号的功能
	 * @param lotno 彩种
	 * @param betcode 注码
	 * @param batchnum 注数
	 * @param multiple 倍数
	 * @param oneMoney 大乐透追加的标识
	 * @param user 用户
	 * @param batchCode 期号
	 * @param wanfa 玩法
	 * @param request 请求
	 * @return JSONObject 后台返回的内容
	 * @throws Exception
	 */
	public static JSONObject getSubscribeOrder(String lotno, String betcode,String batchnum, 
			int multiple,String oneMoney, Tuserinfo user,String batchCode,String wanfa,
			HttpServletRequest request) throws Exception{
		JSONObject obj  = null;
		
		//1.根据彩种、注码、倍数调用算注数和金额的方法获取共有几张票得集合
		List<BetcodeBean> list = getBetcodeBeanList(lotno, betcode, multiple,getSuperaddition(oneMoney));
		logger.info("要投注的注码一共有" + list.size() + "张彩票");
		
		//2.调用查询账户余额获取用户账号的可投注金额
		JSONObject objBalance = CommonUtil.fiandBalance(request);
		double depositMoney = objBalance.getDouble("balance");
		
		int totalMoney = 0;int totalBetnum =0;
		List<BetRequest> betRequests=new ArrayList<BetRequest>();
		BetRequest betRequest = null;
		//获取传入的彩种和玩法算得销售代码值
		//List<BetRequest> listSaleid = getSaleid(wanfa, lotno);
		
		BigDecimal oneamount = new BigDecimal(0);
		
		//BigDecimal类型的倍数
		BigDecimal bd_multiple = new BigDecimal(multiple);
		
		//3.循环累加用户投注的金额获取投注的总金额
		for(int i=0;i<list.size();i++){
			BetcodeBean betcodeBean = (BetcodeBean)list.get(i);
			//获取总投注金额和总注数
			totalMoney += Integer.parseInt(betcodeBean.getTotalMoney());
			totalBetnum += Integer.parseInt(betcodeBean.getZhushu());
			
	
			//获取订单的每注金额及每注注码及追号的期数
			betRequest = new BetRequest();
			betRequest.setAmt(new BigDecimal(betcodeBean.getTotalMoneyFen()).divide(bd_multiple));
			if(i==0){
				oneamount = new BigDecimal(Long.valueOf(betcodeBean.getTotalMoneyFen())/Long.valueOf(betcodeBean.getZhushu())/Long.valueOf(betcodeBean.getMultiple()));
			}
			
			if(lotno.startsWith("F")){
				betRequest.setBetcode(betcodeBean.getBetcode().substring(0,2)+"01"+betcodeBean.getBetcode().substring(4));
			}else{
				betRequest.setBetcode(betcodeBean.getBetcode());
			}
			betRequests.add(betRequest);
		}
			
		//获取当前时间年
//		Calendar  c=Calendar.getInstance(); 
//		int y=c.get(Calendar.YEAR); 
	    //4.循环期数算得需要追号的期号并设置期号、倍数及金额传给lottery后台2011
		JSONArray tlotctrl = JSONObject.fromObject(JSONReslutUtil.getResultMessage( ResourceBundleUtil.LINKURL +"/select/getAfterIssue?lotno="+lotno+"&num="+batchnum)).getJSONArray("value");
		List<SubscribeRequest> subscribeRequests=new ArrayList<SubscribeRequest>();
		SubscribeRequest subscribeRequest = null;
		for(int i=0;i<Integer.parseInt(batchnum);i++){
			//循环获取该订单追号的每注金额及每注注码及追号的期数
			subscribeRequest = new SubscribeRequest();
			subscribeRequest.setBatchcode(tlotctrl.getJSONObject(i).getJSONObject("id").getString("batchcode"));
			subscribeRequest.setAmt(new BigDecimal(totalMoney*100));
			subscribeRequest.setLotmulti(new BigDecimal(multiple));
			subscribeRequest.setEndtime(1313477552255l);//官方截至时间，随便传个参数，到时有必要再做处理
			subscribeRequests.add(subscribeRequest);
		}
		
		
		//5.判断用户账户中可投注的金额是否大于当前追号的金额
		if(totalMoney <= depositMoney){
			
			//根据追号的总金额=投注的总金额*期数
			totalMoney = totalMoney*Integer.parseInt(batchnum);
			logger.info("用户要投注金额:"+totalMoney+";追号期数:"+batchnum+";总注数:"+totalBetnum+";实际账户可投注余额:"+depositMoney
					+";追号的集合subscribeRequests:"+subscribeRequests.size());
			//设置订单类传给lottery后台
			OrderRequest orderRequest = new OrderRequest();
			orderRequest.setLotno(lotno);
			orderRequest.setBatchcode(batchCode);
			orderRequest.setAmt(new BigDecimal(totalMoney*100));//追号的总金额以分为单位
			orderRequest.setUserno(user.getUSERNO());
			orderRequest.setLotmulti(new BigDecimal(multiple));
			orderRequest.setBuyuserno(user.getUSERNO());
			orderRequest.setChannel((String)request.getSession().getAttribute("CHANNEL"));
			orderRequest.setSubchannel(ResourceBundleUtil.DEFALUT_SUBCHANNEL);
			orderRequest.setPaytype(new BigDecimal(1));//1是一次性付款 0是未付款（现在追号都是一次性付款）
			orderRequest.setMemo(getMemo(wanfa, lotno,betcode));
			orderRequest.setBetRequests(betRequests);
			orderRequest.setSubscribeRequests(subscribeRequests);
			orderRequest.setBettype("0");//zhuihao(0), taocan(1), touzhu(2),hemai(3),zengsong(4),zengsong_nosms(5);
			orderRequest.setOneamount(oneamount);
			//调用订单追号的方法
			obj=JSONObject.fromObject(JSONReslutUtil.getResultMessage( ResourceBundleUtil.LINKURL +"/bet/subscribeOrder?","body="+JSONObject.fromObject(orderRequest),"POST"));
			if(!obj.isNullObject()){
				obj.put("message", ErrorCode.getMemo(obj.getString("errorCode")));
				dto_Sales.recordedSales(user.getUSERNO(), user.getUSERNAME(), totalMoney, lotno, orderRequest.getMemo(), multiple+"倍"+totalBetnum+"注"+batchnum+"期[追号]");
			}else{
				obj.put("message", MessageUtil.ERROR_Message);
			}
			
		}else{
			obj = new JSONObject();
			obj.put("errorCode", "20100710");
			obj.put("message", "您的可投注余额不足，请先充值！");
		}
		return obj;
	}
	/**
	 * 订单追号的功能
	 * @param lotno 彩种
	 * @param betcode 注码
	 * @param batchnum 注数
	 * @param multiple 倍数
	 * @param oneMoney 大乐透追加的标识
	 * @param user 用户
	 * @param batchCode 期号
	 * @param wanfa 玩法
	 * @param allMoney 追号总金额
	 * @param payType 扣款方式
	 * @param payStopInt 中奖后停止追号方式
	 * @param request 请求
	 * @return JSONObject 后台返回的内容
	 * @throws Exception
	 */
	public static JSONObject getSubscribeOrderByGaopin(String lotno, String betcode,String batchnum, 
			int multiple,String oneMoney, Tuserinfo user,String batchCode,String wanfa,String allMoney,
			int payType,int smsType,int payStopInt,String desc,
			HttpServletRequest request) throws Exception{
		JSONObject obj  = null;
		
		//1.根据彩种、注码、倍数调用算注数和金额的方法获取共有几张票得集合
		
		List<BetcodeBean> list = getBetcodeBeanList(lotno, betcode, multiple,getSuperaddition(oneMoney));
		logger.info("要投注的注码一共有" + list.size() + "张彩票");
		
		//2.调用查询账户余额获取用户账号的可投注金额
		JSONObject objBalance = CommonUtil.fiandBalance(request);
		double depositMoney = objBalance.getDouble("balance");
		
		int totalMoney = 0;int totalBetnum =0;
		List<BetRequest> betRequests=new ArrayList<BetRequest>();
		BetRequest betRequest = null;
		//获取传入的彩种和玩法算得销售代码值
		//List<BetRequest> listSaleid = getSaleid(wanfa, lotno);
		
		BigDecimal oneamount = new BigDecimal(0);
		
		//BigDecimal类型的倍数
		BigDecimal bd_multiple = new BigDecimal(multiple);
		
		//3.循环累加用户投注的金额获取投注的总金额
		for(int i=0;i<list.size();i++){
			BetcodeBean betcodeBean = (BetcodeBean)list.get(i);
			//获取总投注金额和总注数
			totalMoney += Integer.parseInt(betcodeBean.getTotalMoney());
			totalBetnum += Integer.parseInt(betcodeBean.getZhushu());
			
			
			//获取订单的每注金额及每注注码及追号的期数
			betRequest = new BetRequest();
			betRequest.setAmt(new BigDecimal(betcodeBean.getTotalMoneyFen()).divide(bd_multiple));
			if(i==0){
				oneamount = new BigDecimal(Long.valueOf(betcodeBean.getTotalMoneyFen())/Long.valueOf(betcodeBean.getZhushu())/Long.valueOf(betcodeBean.getMultiple()));
			}
			
			if(lotno.startsWith("F")){
				betRequest.setBetcode(betcodeBean.getBetcode().substring(0,2)+"01"+betcodeBean.getBetcode().substring(4));
			}else{
				betRequest.setBetcode(betcodeBean.getBetcode());
			}
			betRequests.add(betRequest);
		}
		
		//获取当前时间年
//		Calendar  c=Calendar.getInstance(); 
//		int y=c.get(Calendar.YEAR); 
		
		//4.循环期数算得需要追号的期号并设置期号、倍数及金额传给lottery后台2011
		JSONArray tlotctrl = JSONObject.fromObject(JSONReslutUtil.getResultMessage( ResourceBundleUtil.LINKURL +"/select/getAfterIssue?lotno="+lotno+"&num="+batchnum)).getJSONArray("value");

		List<SubscribeRequest> subscribeRequests=new ArrayList<SubscribeRequest>();
		SubscribeRequest subscribeRequest = null;
		String batchCodeStr = "";
		String[] qihaoStrarry = null;
    	if(batchCode.indexOf("#")>-1){
    		qihaoStrarry = batchCode.split("#");
    		batchCodeStr = qihaoStrarry[0].split(",")[0];
    	}
    	
		if(qihaoStrarry != null && qihaoStrarry.length > 0 ){
			int qishibaishu= Integer.parseInt(qihaoStrarry[0].indexOf(",")<0?"1":qihaoStrarry[0].split(",")[1]);
			for(int i=0;i<qihaoStrarry.length;i++){
				//循环获取该订单追号的每注金额及每注注码及追号的期数
				subscribeRequest = new SubscribeRequest();
				subscribeRequest.setBatchcode(qihaoStrarry[i].indexOf(",")<0?"0":qihaoStrarry[i].split(",")[0]);
				int baishu= Integer.parseInt(qihaoStrarry[i].indexOf(",")<0?"0":qihaoStrarry[i].split(",")[1]);
				subscribeRequest.setAmt(new BigDecimal(totalMoney/qishibaishu*100*baishu));
				subscribeRequest.setLotmulti(new BigDecimal(qihaoStrarry[i].indexOf(",")<0?"":qihaoStrarry[i].split(",")[1]));
				subscribeRequest.setDesc(qihaoStrarry[i].split(",")[2]);
//				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//			    Date toDate=dateFormat.parse(qihaoStrarry[i].split(",")[3]);
				subscribeRequest.setEndtime(new Long(qihaoStrarry[i].split(",")[3]==null||qihaoStrarry[i].split(",")[3].equals("null")?"0":qihaoStrarry[i].split(",")[3]));
				subscribeRequests.add(subscribeRequest);
			}
		}
		else{
			for(int i=0;i<Integer.parseInt(batchnum);i++){
				//循环获取该订单追号的每注金额及每注注码及追号的期数
				subscribeRequest = new SubscribeRequest();
				subscribeRequest.setBatchcode(tlotctrl.getJSONObject(i).getJSONObject("id").getString("batchcode"));
				subscribeRequest.setAmt(new BigDecimal(totalMoney*100));
				subscribeRequest.setLotmulti(new BigDecimal(multiple));
				subscribeRequests.add(subscribeRequest);
			}
		}
		
		//5.判断用户账户中可投注的金额是否大于当前追号的金额
		if(totalMoney <= depositMoney){
			
			//根据追号的总金额=投注的总金额*期数
			totalMoney = Integer.parseInt(allMoney);
			logger.info("用户要投注金额:"+totalMoney+";追号期数:"+batchnum+";总注数:"+totalBetnum+";实际账户可投注余额:"+depositMoney
					+";追号的集合subscribeRequests:"+subscribeRequests.size());
			//设置订单类传给lottery后台
			OrderRequest orderRequest = new OrderRequest();
			orderRequest.setLotno(lotno);
			orderRequest.setBatchcode(batchCodeStr);
			orderRequest.setAmt(new BigDecimal(totalMoney*100));//追号的总金额以分为单位
			orderRequest.setUserno(user.getUSERNO());
			orderRequest.setLotmulti(new BigDecimal(multiple));
			orderRequest.setBuyuserno(user.getUSERNO());
			orderRequest.setChannel((String)request.getSession().getAttribute("CHANNEL"));
			orderRequest.setSubchannel(ResourceBundleUtil.DEFALUT_SUBCHANNEL);
			orderRequest.setPaytype(new BigDecimal(payType));//1是一次性付款 0是未付款（现在追号都是一次性付款）
			orderRequest.setPrizeend(new BigDecimal(payStopInt));//中奖后停止 追号 0.不停止，1.停止
			orderRequest.setAccountnomoneysms(new BigDecimal(smsType));//余额不足 短信提醒 0.不提醒，1.提醒
			orderRequest.setDesc(desc);//用户设置的收益率
			orderRequest.setMemo(getMemo(wanfa, lotno,betcode));
			orderRequest.setBetRequests(betRequests);
			orderRequest.setSubscribeRequests(subscribeRequests);
			orderRequest.setBettype("0");//zhuihao(0), taocan(1), touzhu(2),hemai(3),zengsong(4),zengsong_nosms(5);
			orderRequest.setOneamount(oneamount);
			//调用订单追号的方法
			obj=JSONObject.fromObject(JSONReslutUtil.getResultMessage( ResourceBundleUtil.LINKURL +"/bet/subscribeOrder?","body="+URLEncoder.encode(JSONObject.fromObject(orderRequest).toString(),"UTF-8"),"POST"));
			if(!obj.isNullObject()){
				obj.put("message", ErrorCode.getMemo(obj.getString("errorCode")));
				dto_Sales.recordedSales(user.getUSERNO(), user.getUSERNAME(), totalMoney, lotno, orderRequest.getMemo(), multiple+"倍"+totalBetnum+"注"+batchnum+"期[追号]");
			}else{
				obj.put("message", MessageUtil.ERROR_Message);
			}
			
		}else{
			obj = new JSONObject();
			obj.put("errorCode", "20100710");
			obj.put("message", "您的可投注余额不足，请先充值！");
		}
		return obj;
	}
	/**
	 * 订单追号的功能
	 * @param lotno 彩种
	 * @param betcode 注码
	 * @param batchnum 注数
	 * @param multiple 倍数
	 * @param oneMoney 大乐透追加的标识
	 * @param user 用户
	 * @param batchCode 期号
	 * @param wanfa 玩法
	 * @param allMoney 追号总金额
	 * @param payType 扣款方式
	 * @param payStopInt 中奖后停止追号方式
	 * @param request 请求
	 * @return JSONObject 后台返回的内容
	 * @throws Exception
	 */
	public static JSONObject getSubscribeOrderByDipin(String lotno, String betcode,String batchnum, 
			int multiple,String oneMoney, Tuserinfo user,String[] batchCode,String wanfa,String allMoney,
			int payType,int smsType,int payStopInt,String desc,int danqiJIangjinInt,
			HttpServletRequest request) throws Exception{
		JSONObject obj  = null;
		
		//1.根据彩种、注码、倍数调用算注数和金额的方法获取共有几张票得集合
		
		List<BetcodeBean> list = getBetcodeBeanList(lotno, betcode, multiple,getSuperaddition(oneMoney));
		logger.info("要投注的注码一共有" + list.size() + "张彩票");
		
		//2.调用查询账户余额获取用户账号的可投注金额
		JSONObject objBalance = CommonUtil.fiandBalance(request);
		double depositMoney = objBalance.getDouble("balance");
		
		int totalMoney = 0;int totalBetnum =0;
		List<BetRequest> betRequests=new ArrayList<BetRequest>();
		BetRequest betRequest = null;
		//获取传入的彩种和玩法算得销售代码值
		//List<BetRequest> listSaleid = getSaleid(wanfa, lotno);
		
		BigDecimal oneamount = new BigDecimal(0);
		
		//BigDecimal类型的倍数
		BigDecimal bd_multiple = new BigDecimal(multiple);
		
		//3.循环累加用户投注的金额获取投注的总金额
		for(int i=0;i<list.size();i++){
			BetcodeBean betcodeBean = (BetcodeBean)list.get(i);
			//获取总投注金额和总注数
			//totalMoney += Integer.parseInt(betcodeBean.getTotalMoney());
			totalBetnum += Integer.parseInt(betcodeBean.getZhushu());
			
			
			//获取订单的每注金额及每注注码及追号的期数
			betRequest = new BetRequest();
			betRequest.setAmt(new BigDecimal(betcodeBean.getTotalMoneyFen()).divide(bd_multiple));
			if(i==0){
				oneamount = new BigDecimal(Long.valueOf(betcodeBean.getTotalMoneyFen())/Long.valueOf(betcodeBean.getZhushu())/Long.valueOf(betcodeBean.getMultiple()));
			}
			
			if(lotno.startsWith("F")){
				betRequest.setBetcode(betcodeBean.getBetcode().substring(0,2)+"01"+betcodeBean.getBetcode().substring(4));
			}else{
				betRequest.setBetcode(betcodeBean.getBetcode());
			}
			betRequests.add(betRequest);
		}
		
		List<SubscribeRequest> subscribeRequests=new ArrayList<SubscribeRequest>();
		SubscribeRequest subscribeRequest = null;
		String batchCodeStr = "";

		if(batchCode != null && batchCode.length > 0 ){
			totalMoney = 0;
			for(int i=0;i<batchCode.length;i++){
				String batchcodeArrey = batchCode[i];
				if(i==0){
					batchCodeStr = batchcodeArrey.split("_")[0];
				}
				int totalMoneyItem =  Integer.parseInt(batchcodeArrey.split("_")[2]);
				totalMoney += totalMoneyItem;
				//循环获取该订单追号的每注金额及每注注码及追号的期数
				subscribeRequest = new SubscribeRequest();
				subscribeRequest.setBatchcode(batchcodeArrey.split("_")[0]);
				subscribeRequest.setAmt(new BigDecimal(Integer.parseInt(batchcodeArrey.split("_")[2]) * 100));
				subscribeRequest.setLotmulti(new BigDecimal(batchcodeArrey.split("_")[1]));
				subscribeRequest.setDesc(totalMoney+"_"+batchcodeArrey.split("_")[1]+"_0");//做解析已追金额使用,每期倍数
				subscribeRequest.setEndtime(1313477552255l);//暂时写死 
				subscribeRequests.add(subscribeRequest);
				
			}
		}
	
		
		//5.判断用户账户中可投注的金额是否大于当前追号的金额
		if(Integer.parseInt(allMoney) <= depositMoney){
			
			//根据追号的总金额=投注的总金额*期数
			//totalMoney = Integer.parseInt(allMoney);
			logger.info("用户要投注金额:"+totalMoney+";追号期数:"+batchnum+";总注数:"+totalBetnum+";实际账户可投注余额:"+depositMoney
					+";追号的集合subscribeRequests:"+subscribeRequests.size());
			//设置订单类传给lottery后台
			OrderRequest orderRequest = new OrderRequest();
			orderRequest.setLotno(lotno);
			orderRequest.setBatchcode(batchCodeStr);
			orderRequest.setAmt(new BigDecimal(totalMoney*100));//追号的总金额以分为单位
			orderRequest.setUserno(user.getUSERNO());
			orderRequest.setLotmulti(new BigDecimal(multiple));
			orderRequest.setBuyuserno(user.getUSERNO());
			orderRequest.setChannel((String)request.getSession().getAttribute("CHANNEL"));
			orderRequest.setSubchannel(ResourceBundleUtil.DEFALUT_SUBCHANNEL);
			orderRequest.setPaytype(new BigDecimal(payType));//1是一次性付款 0是未付款（现在追号都是一次性付款）
			orderRequest.setPrizeend(new BigDecimal(payStopInt));//中奖后停止 追号 0.不停止，1.停止
			orderRequest.setAccountnomoneysms(new BigDecimal(smsType));//余额不足 短信提醒 0.不提醒，1.提醒
			orderRequest.setDesc(desc);//用户设置的收益率
			orderRequest.setPrizeendamt(new BigDecimal(danqiJIangjinInt));//单期奖金 中奖停止条件
			orderRequest.setMemo(getMemo(wanfa, lotno,betcode));
			orderRequest.setBetRequests(betRequests);
			orderRequest.setSubscribeRequests(subscribeRequests);
			orderRequest.setBettype("0");//zhuihao(0), taocan(1), touzhu(2),hemai(3),zengsong(4),zengsong_nosms(5);
			orderRequest.setOneamount(oneamount);
			if(Integer.parseInt(batchnum)>=10){
				orderRequest.setEndsms(new BigDecimal("1"));
			}else{
				orderRequest.setEndsms(new BigDecimal("0"));
			}
			
			//调用订单追号的方法
			obj=JSONObject.fromObject(JSONReslutUtil.getResultMessage( ResourceBundleUtil.LINKURL +"/bet/subscribeOrder?","body="+URLEncoder.encode(JSONObject.fromObject(orderRequest).toString(),"UTF-8"),"POST"));
			if(!obj.isNullObject()){
				obj.put("message", ErrorCode.getMemo(obj.getString("errorCode")));
				dto_Sales.recordedSales(user.getUSERNO(), user.getUSERNAME(), totalMoney, lotno, orderRequest.getMemo(), multiple+"倍"+totalBetnum+"注"+batchnum+"期[追号]");
			}else{
				obj.put("message", MessageUtil.ERROR_Message);
			}
			
		}else{
			obj = new JSONObject();
			obj.put("errorCode", "20100710");
			obj.put("message", "您的可投注余额不足，请先充值！");
		}
		return obj;
	}
	
	
	
	/**
	 * 订单追号的功能（追号包年套餐活动）
	 * @param lotno 彩种
	 * @param betcode 注码
	 * @param batchnum 注数
	 * @param multiple 倍数
	 * @param oneMoney 大乐透追加的标识
	 * @param user 用户
	 * @param batchCode 期号
	 * @param wanfa 玩法
	 * @param allMoney 追号总金额
	 * @param payType 扣款方式
	 * @param payStopInt 中奖后停止追号方式
	 * @param request 请求
	 * @return JSONObject 后台返回的内容
	 * @throws Exception
	 */
	public static JSONObject getSubscribeOrderByDipinToAllYears(String lotno, String betcode,String batchnum, 
			int multiple,String oneMoney, Tuserinfo user,String[] batchCode,String wanfa,String allMoney,
			int payType,int smsType,int payStopInt,String desc,int danqiJIangjinInt,
			HttpServletRequest request) throws Exception{
		JSONObject obj  = null;
		
		//1.根据彩种、注码、倍数调用算注数和金额的方法获取共有几张票得集合
		
		List<BetcodeBean> list = getBetcodeBeanList(lotno, betcode, multiple,getSuperaddition(oneMoney));
		logger.info("要投注的注码一共有" + list.size() + "张彩票");
		
		//2.调用查询账户余额获取用户账号的可投注金额
		JSONObject objBalance = CommonUtil.fiandBalance(request);
		double depositMoney = objBalance.getDouble("balance");
		
		int totalMoney = 0;int totalBetnum =0;
		List<BetRequest> betRequests=new ArrayList<BetRequest>();
		BetRequest betRequest = null;
		//获取传入的彩种和玩法算得销售代码值
		//List<BetRequest> listSaleid = getSaleid(wanfa, lotno);
		
		BigDecimal oneamount = new BigDecimal(0);
		
		//BigDecimal类型的倍数
		BigDecimal bd_multiple = new BigDecimal(multiple);
		
		//3.循环累加用户投注的金额获取投注的总金额
		for(int i=0;i<list.size();i++){
			BetcodeBean betcodeBean = (BetcodeBean)list.get(i);
			//获取总投注金额和总注数
			//totalMoney += Integer.parseInt(betcodeBean.getTotalMoney());
			totalBetnum += Integer.parseInt(betcodeBean.getZhushu());
			
			
			//获取订单的每注金额及每注注码及追号的期数
			betRequest = new BetRequest();
			betRequest.setAmt(new BigDecimal(betcodeBean.getTotalMoneyFen()).divide(bd_multiple));
			if(i==0){
				oneamount = new BigDecimal(Long.valueOf(betcodeBean.getTotalMoneyFen())/Long.valueOf(betcodeBean.getZhushu())/Long.valueOf(betcodeBean.getMultiple()));
			}
			
			if(lotno.startsWith("F")){
				betRequest.setBetcode(betcodeBean.getBetcode().substring(0,2)+"01"+betcodeBean.getBetcode().substring(4));
			}else{
				betRequest.setBetcode(betcodeBean.getBetcode());
			}
			betRequests.add(betRequest);
		}
		
		List<SubscribeRequest> subscribeRequests=new ArrayList<SubscribeRequest>();
		SubscribeRequest subscribeRequest = null;
		String batchCodeStr = "";

		if(batchCode != null && batchCode.length > 0 ){
			totalMoney = 0;
			for(int i=0;i<batchCode.length;i++){
				String batchcodeArrey = batchCode[i];
				if(i==0){
					batchCodeStr = batchcodeArrey.split("_")[0];
				}
				int totalMoneyItem =  Integer.parseInt("2");
				totalMoney += totalMoneyItem;
				//循环获取该订单追号的每注金额及每注注码及追号的期数
				subscribeRequest = new SubscribeRequest();
				subscribeRequest.setBatchcode(batchcodeArrey.split("_")[0]);
				subscribeRequest.setAmt(new BigDecimal(Integer.parseInt("2") * 100));
				subscribeRequest.setLotmulti(new BigDecimal(batchcodeArrey.split("_")[1]));
				subscribeRequest.setDesc(totalMoney+"_"+batchcodeArrey.split("_")[1]+"_0");//做解析已追金额使用,每期倍数
				subscribeRequest.setEndtime(1313477552255l);//暂时写死 
				subscribeRequests.add(subscribeRequest);
				
			}
		}
	
		
		//5.判断用户账户中可投注的金额是否大于当前追号的金额
		if(Integer.parseInt(allMoney) <= depositMoney){
			
			//根据追号的总金额=投注的总金额*期数
			//totalMoney = Integer.parseInt(allMoney);
			logger.info("用户要投注金额:"+totalMoney+";追号期数:"+batchnum+";总注数:"+totalBetnum+";实际账户可投注余额:"+depositMoney
					+";追号的集合subscribeRequests:"+subscribeRequests.size());
			//设置订单类传给lottery后台
			OrderRequest orderRequest = new OrderRequest();
			orderRequest.setLotno(lotno);
			orderRequest.setBatchcode(batchCodeStr);
			orderRequest.setAmt(new BigDecimal(totalMoney*100));//追号的总金额以分为单位
			orderRequest.setUserno(user.getUSERNO());
			orderRequest.setLotmulti(new BigDecimal(multiple));
			orderRequest.setBuyuserno(user.getUSERNO());
			orderRequest.setChannel((String)request.getSession().getAttribute("CHANNEL"));
			orderRequest.setSubchannel(ResourceBundleUtil.DEFALUT_SUBCHANNEL);
			orderRequest.setPaytype(new BigDecimal(payType));//1是一次性付款 0是未付款（现在追号都是一次性付款）
			orderRequest.setPrizeend(new BigDecimal(payStopInt));//中奖后停止 追号 0.不停止，1.停止
			orderRequest.setAccountnomoneysms(new BigDecimal(smsType));//余额不足 短信提醒 0.不提醒，1.提醒
			orderRequest.setDesc(desc);//用户设置的收益率
			orderRequest.setPrizeendamt(new BigDecimal(danqiJIangjinInt));//单期奖金 中奖停止条件
			orderRequest.setMemo(getMemo(wanfa, lotno,betcode));
			orderRequest.setBetRequests(betRequests);
			orderRequest.setSubscribeRequests(subscribeRequests);
			orderRequest.setBettype("0");//zhuihao(0), taocan(1), touzhu(2),hemai(3),zengsong(4),zengsong_nosms(5);
			orderRequest.setOneamount(oneamount);
			orderRequest.setCancancel(new BigDecimal("1"));
			if(Integer.parseInt(batchnum)>=10){
				orderRequest.setEndsms(new BigDecimal("1"));
			}else{
				orderRequest.setEndsms(new BigDecimal("0"));
			}
			
			//调用订单追号的方法
			/*2012.1.18双色球全年追号套餐活动截止，切换接口
			obj=JSONObject.fromObject(JSONReslutUtil.getResultMessage( ResourceBundleUtil.ACTIONCENTERURL +"/action/addNumOneYear?","body="+URLEncoder.encode(JSONObject.fromObject(orderRequest).toString(),"UTF-8"),"POST"));
			*/
			obj=JSONObject.fromObject(JSONReslutUtil.getResultMessage( ResourceBundleUtil.LINKURL +"/bet/subscribeOrder?","body="+URLEncoder.encode(JSONObject.fromObject(orderRequest).toString(),"UTF-8"),"POST"));
			if(!obj.isNullObject()){
				if(obj.getString("value").isEmpty()){
					obj.put("message", ErrorCode.getMemo(obj.getString("errorCode")));
				}else{
					obj.put("message", obj.getString("value"));
				}
				
				dto_Sales.recordedSales(user.getUSERNO(), user.getUSERNAME(), totalMoney, lotno, orderRequest.getMemo(), multiple+"倍"+totalBetnum+"注"+batchnum+"期[追号]");
			}else{
				obj.put("message", MessageUtil.ERROR_Message);
			}
			
		}else{
			obj = new JSONObject();
			obj.put("errorCode", "20100710");
			obj.put("message", "您的可投注余额不足，请先充值！");
		}
		return obj;
	}
		
	
	
	/**
	 * 
	 * 根据onMoney获取大乐透是否追加
	 * @param oneMoney 追加标识
	 * @return  追加为true 否则为false
	 */
	public static boolean getSuperaddition(String oneMoney){
		boolean superaddition = false;
		if(oneMoney.trim().equals("3")){ 
			superaddition=true;
		}
		return  superaddition;
	}
	
	/**
	 * 
	 * 拆分玩法匹配传入的玩法，匹配不同的设置为多方案
	 * @param wanfa 玩法
	 * @param lotno 彩种
	 * @param betcode 
	 * @return 返回方案
	 */
	public static String getMemo(String wanfa,String lotno, String betcode){
		String memo = "";
		String wanfas[];
		if(lotno.equals(Constant.JCLQ_SF)||lotno.equals(Constant.JCLQ_RFSF)||lotno.equals(Constant.JCLQ_SFC)||lotno.equals(Constant.JCLQ_DXF)){
			wanfas = wanfa.split("-");
		}else{
			wanfas= wanfa.split("\\+");
		}
		//拆分玩法匹配传入的玩法，匹配不同的设置为多方案
		for(int i=0;i<wanfas.length;i++){
			String rex = "^"+wanfas[i]+"*$";
			Pattern pattern=Pattern.compile(rex);
			Matcher matcher=pattern.matcher(wanfas[0]);
			if(matcher.matches()){
				JSONObject  obj = getLotnoBetType(wanfas[0], lotno,betcode);//获取memo值
				memo = obj.getString("memo");
			}else{
				memo="多方案";break;
			}
		}
		return memo;
	}
	/**
	 * 
	 * 拆分玩法匹配传入的玩法，匹配不同的设置为多方案
	 * @param wanfa 玩法
	 * @param lotno 彩种
	 * @param betcode 
	 * @return 返回方案
	 */
	public static int getMemo2(String wanfa,String lotno, String betcode){
		int memo = 0;
		String wanfas[];
		if(lotno.equals(Constant.JCLQ_SF)||lotno.equals(Constant.JCLQ_RFSF)||lotno.equals(Constant.JCLQ_SFC)||lotno.equals(Constant.JCLQ_DXF)){
			wanfas = wanfa.split("-");
		}else{
			wanfas = wanfa.split("\\+");
		}
		//拆分玩法匹配传入的玩法，匹配不同的设置为多方案
		for(int i=0;i<wanfas.length;i++){
			String rex = "^"+wanfas[i]+"*$";
			Pattern pattern=Pattern.compile(rex);
			Matcher matcher=pattern.matcher(wanfas[0]);
			if(matcher.matches()){
				JSONObject  obj = getLotnoBetType2(wanfas[0], lotno,betcode);//获取memo值
				memo = obj.getInt("memo");
			}else{
				memo=3;break;
			}
		}
		return memo;
	}
	/**
	 * 根据彩种判断玩法
	 * @param wanfa 玩法
	 * @param lotno 彩种
	 * @return 返回玩法
	 */
	public static JSONObject getLotnoBetType(String wanfa,String lotno,String betcode){
		JSONObject obj = new JSONObject();
		String memo ="";
		String saleid="";
		if(Constant.JCLQ_SF.equals(lotno)||Constant.JCLQ_RFSF.equals(lotno)||Constant.JCLQ_SFC.equals(lotno)||Constant.JCLQ_DXF.equals(lotno)){//竞彩篮球四种玩法
				if("500".equals(wanfa)){
					saleid = "500"; memo = "单关";
				}else if("502".equals(wanfa)){
					saleid = "502"; memo = "2串1";;
				}else if("503".equals(wanfa)){
					saleid = "503"; memo = "3串1";
				}else if("504".equals(wanfa)){
					saleid = "504"; memo = "4串1";
				}else if("505".equals(wanfa)){
					saleid = "505"; memo = "5串1";;
				}else if("506".equals(wanfa)){
					saleid = "506"; memo = "6串1";
				}else if("507".equals(wanfa)){
					saleid = "507"; memo = "7串1";
				}else if("508".equals(wanfa)){
					saleid = "508"; memo = "8串1";
				}else if("509".equals(wanfa)){
					saleid = "509"; memo = "2串3";
				}else if("510".equals(wanfa)){
					saleid = "510"; memo = "3串6";
				}else if("511".equals(wanfa)){
					saleid = "511"; memo = "3串7";
				}else if("512".equals(wanfa)){
					saleid = "512"; memo = "4串10";
				}else if("513".equals(wanfa)){
					saleid = "513"; memo = "4串14";
				}else if("514".equals(wanfa)){
					saleid = "514"; memo = "4串15";
				}else if("515".equals(wanfa)){
					saleid = "515"; memo = "5串15";
				}else if("516".equals(wanfa)){
					saleid = "516"; memo = "5串25";
				}else if("517".equals(wanfa)){
					saleid = "517"; memo = "5串30";
				}else if("518".equals(wanfa)){
					saleid = "518"; memo = "5串31";
				}else if("519".equals(wanfa)){
					saleid = "519"; memo = "6串21";
				}else if("520".equals(wanfa)){
					saleid = "520"; memo = "6串41";
				}else if("521".equals(wanfa)){
					saleid = "521"; memo = "6串56";
				}else if("522".equals(wanfa)){
					saleid = "522"; memo = "6串62";
				}else if("523".equals(wanfa)){
					saleid = "523"; memo = "6串63";
				}else if("524".equals(wanfa)){
					saleid = "524"; memo = "7串127";
				}else if("525".equals(wanfa)){
					saleid = "525"; memo = "8串255";
				}else if("526".equals(wanfa)){
					saleid = "526"; memo = "3串3";
				}else if("527".equals(wanfa)){
					saleid = "527"; memo = "3串4";
				}else if("528".equals(wanfa)){
					saleid = "528"; memo = "4串6";
				}else if("529".equals(wanfa)){
					saleid = "529"; memo = "4串11";
				}else if("530".equals(wanfa)){
					saleid = "530"; memo = "5串10";
				}else if("531".equals(wanfa)){
					saleid = "531"; memo = "5串20";
				}else if("532".equals(wanfa)){
					saleid = "532"; memo = "5串26";
				}else if("533".equals(wanfa)){
					saleid = "533"; memo = "6串15";
				}else if("534".equals(wanfa)){
					saleid = "534"; memo = "6串35";
				}else if("535".equals(wanfa)){
					saleid = "535"; memo = "6串50";
				}else if("536".equals(wanfa)){
					saleid = "536"; memo = "6串57";
				}else if("537".equals(wanfa)){
					saleid = "537"; memo = "7串120";
				}else if("538".equals(wanfa)){
					saleid = "538"; memo = "8串247";
				}else if("539".equals(wanfa)){
					saleid = "539"; memo = "4串4";
				}else if("540".equals(wanfa)){
					saleid = "540"; memo = "4串5";
				}else if("541".equals(wanfa)){
					saleid = "541"; memo = "5串16";
				}else if("542".equals(wanfa)){
					saleid = "542"; memo = "6串20";
				}else if("543".equals(wanfa)){
					saleid = "543"; memo = "6串42";
				}else if("544".equals(wanfa)){
					saleid = "544"; memo = "5串5";
				}else if("545".equals(wanfa)){
					saleid = "545"; memo = "5串6";
				}else if("546".equals(wanfa)){
					saleid = "546"; memo = "6串22";
				}else if("547".equals(wanfa)){
					saleid = "547"; memo = "7串35";
				}else if("548".equals(wanfa)){
					saleid = "548"; memo = "8串70";
				}else if("549".equals(wanfa)){
					saleid = "549"; memo = "6串6";
				}else if("550".equals(wanfa)){
					saleid = "550"; memo = "6串7";
				}else if("551".equals(wanfa)){
					saleid = "551"; memo = "7串21";
				}else if("552".equals(wanfa)){
					saleid = "552"; memo = "8串56";
				}else if("553".equals(wanfa)){
					saleid = "553"; memo = "7串7";
				}else if("554".equals(wanfa)){
					saleid = "554"; memo = "7串8";
				}else if("555".equals(wanfa)){
					saleid = "555"; memo = "8串28";
				}else if("556".equals(wanfa)){
					saleid = "556"; memo = "8串8";
				}else if("557".equals(wanfa)){
					saleid = "557"; memo = "8串9";
				}
			}else{
				memo = "其他";
			}		
		obj.put("saleid", saleid);
		obj.put("memo", memo);
		logger.info("BettingUtil:getMemo---"+obj);
		return obj;
	}
	/**
	 * 根据彩种判断玩法  粗略玩法  单式、  复式、  胆拖 、 多方案
	 * @param wanfa 玩法
	 * @param lotno 彩种
	 * @return 返回玩法 
	 */
	public static JSONObject getLotnoBetType2(String wanfa,String lotno,String betcode){
		JSONObject obj = new JSONObject();
		String memo = "0";
		if(Constant.JCLQ_SF.equals(lotno)||Constant.JCLQ_RFSF.equals(lotno)||Constant.JCLQ_SFC.equals(lotno)||Constant.JCLQ_DXF.equals(lotno)){// 竞彩篮球四种玩法
			if("500".equals(wanfa)){
				 memo = "0";
			}else{
				 memo = "1";
			}
		}
		
		obj.put("memo", memo);
		return obj;
	}

	/**
	 * 
	 * 单式上传获取多个文件和错误注码
	 * 将错误注码剔除并将正确注码拼接在一起
	 * @param paths 传入的路径
	 * @param errorCodes 错误注码
	 * @param lotno 彩种
	 * @return
	 * @throws IOException
	 */
	public static String getUploadBetcodes(String paths,String errorCodes,String lotno) throws IOException{
		String uploadCodes = "";
		logger.info("获取单式上传页面上传入的值path="+paths+";错误注码为errorCodes="+errorCodes);
		//当传的路径不为空时，将路径分隔并将错误注码分隔
		if(paths!=null && !paths.equals("")){
			if(paths.indexOf(ResourceBundleUtil.UPLOAD_SIGN) > -1){
				String path[] = paths.split("\\"+ResourceBundleUtil.UPLOAD_SIGN);
				String errorCode[] = errorCodes.split("\\"+ResourceBundleUtil.UPLOAD_SIGN);
				for(int i=0;i<path.length;i++){
					//若其中无错误注码将其替换为“”
					if(errorCode[i].equals(ResourceBundleUtil.UPLOADCODES)){
						errorCode[i]=errorCode[i].replace(ResourceBundleUtil.UPLOADCODES, "");
					}
					//调用转换注码的方法，将注码分隔拼接并返回
					uploadCodes += getUploadBetcode(path[i], errorCode[i],lotno);
				}
			}else{
				uploadCodes = getUploadBetcode(paths, errorCodes,lotno);
			}
		}
		System.out.println("多个文件时获取有效注码格式为:"+uploadCodes);
		return uploadCodes.trim();
	}
	
	/**
	 * 单式上传的路径和错误注码
	 * @param path--路径 
	 * 例D:\web\ruyicai\+传进来的类型+当前毫秒+用户的txt名字
	 *   D:\web\ruyicai\plw\1309142186718plw.txt  
	 * @param errorCode--错误注码
	 * @param lotno 彩种
	 * @return
	 * @throws IOException 
	 */
	public static String getUploadBetcode(String path,String errorCode,String lotno) throws IOException{
		    StringBuffer sbf = new StringBuffer();
			if (!path.equals("")) {
			// 1.根据传入的地址获取文件中的内容

			File file = new File(path);
			// 判断该文件是否存在
			if (file.exists()) {
				BufferedReader bufRead = new BufferedReader(
						new InputStreamReader(new FileInputStream(file)));
				String str;
				List<String> list = new ArrayList<String>();
				while ((str = bufRead.readLine()) != null) {
					if (str.equals("") || str.replace(" ", "").equals("")) {
					} else {
						list.add(str.trim());
					}
				}
				bufRead.close();// 关闭流
				String errorCodes[] = errorCode.split("\\"+Constant.TABNUMBER);
				int[] errs=new int[errorCodes.length];
				if(errorCodes[0].equals("")){
				}else{
					for (int i = 0; i < errorCodes.length; i++) {
						try {
							errs[i]=Integer.parseInt(errorCodes[i]);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
					for (int j =errs.length-1 ; j >=0; j--) {
						list.remove(errs[j]);
					}	
				}
				for (int i = 0; i < list.size(); i++) {
					if(list.get(i)==null||"".equals(list.get(i))){}else{
						String corr = getCodesByLotno(list.get(i), path, lotno);
						sbf.append(corr);
						if (lotno.equals(Constant.SSQ)
								|| lotno.equals(Constant.QLC)
								|| lotno.equals(Constant.SD)) {
							sbf.append(Constant.TABNUMBER);
						} 
						
						
						else {
							sbf.append(Constant.TC_TABNUMBER);
						}
					}
				}
			}
		}

		System.out.println("获取有效注码格式为:" + sbf + ";彩种为lotno=" + lotno);
		return sbf.toString();
	}
	
	/**
	 * 将含有0的注码去除0并累加排序返回
	 * @param strCodes 传入的注码数组
	 * @return
	 */
	private static String getCodes(String strCodes[]){
		 String str = "";
		 //当注码之间有小于0的注码将注码去“0”
		 for(int c=0;c<strCodes.length;c++){
			 if(strCodes[c].substring(0,1).equals("0")){
				 str += strCodes[c].substring(1,2)+Constant.SIGN;
			 }else{
				 str+=strCodes[c]+Constant.SIGN;
			 }
		 }
		 return str.substring(0,str.length()-1);
	}
	
	/**
	 * 根据不同彩种和玩法拼接所需注码返回
	 * @param str 从文件中读取的注码
	 * @param path 路径
	 * @param lotno 彩种
	 * @return
	 */
	private static String getCodesByLotno(String str,String path,String lotno){
		 //根据不同彩种拼接注码
		 if(lotno.equals(Constant.SSQ)){//双色球
   		 //重新拼接蓝球和红球，算得投注时所用到的注码
			 str = str.trim().replace(" + ", "+").replace(" ", ",").replace("|", "+");
			 String strs[] = str.split("\\+");
			 str = getCodes(strs[0].split("\\,"))+Constant.TAB +getCodes(strs[1].split("\\,"));
		 }else if(lotno.equals(Constant.QLC)){//七乐彩
			 str = str.trim().replace(" ", ",");
			 str = getCodes(str.split("\\,"));
		 }else if(lotno.equals(Constant.DLT)){//大乐透06 11 21 25 28+01 02
			 str = str.trim().replace(" + ", "+").replace(" ", ",").replace("|", "+");
			 String strs[] = str.split("\\+");
			 str = getCodes(strs[0].split("\\,"))+Constant.QH_TAB+getCodes(strs[1].split("\\,"));
		 }else if(lotno.equals(Constant.SD)){//福彩3D
			 String wanfa = "";
			 if(path.indexOf("zx")>-1){
				 wanfa=Constant.SD_ZXDS;
			 }else if(path.indexOf("zs")>-1){
				 wanfa=Constant.SD_Z3DS;
			 }else if(path.indexOf("zl")>-1){
				 wanfa=Constant.SD_Z6DS;
			 }
			 str = str.trim().replace(",", "");
			 String strNew ="";
			 for(int d=0;d<str.length();d++){
				 strNew+=str.substring(d,d+1)+",";
			 }
			 str=wanfa+strNew.substring(0,strNew.length()-1);
		 }else if(lotno.equals(Constant.PLS)){//排列三
			 String wanfa = "";
			 if(path.indexOf("zx")>-1){
				 wanfa=Constant.PLS_ZHX;
			 }else if(path.indexOf("zs")>-1){
				 wanfa=Constant.PLS_ZX;
			 }else if(path.indexOf("zl")>-1){
				 wanfa=Constant.PLS_ZX;
			 }
			 str = str.trim().replace(",", "");
			 String strNew ="";
			 for(int d=0;d<str.length();d++){
				 strNew+=str.substring(d,d+1)+",";
			 }
			 str=wanfa+strNew.substring(0,strNew.length()-1);
		 }else if(lotno.equals(Constant.SFC9)||lotno.equals(Constant.SFC14)||lotno.equals(Constant.JQC)||lotno.equals(Constant.BQC)) {
			 str = str.replace("*", "#");
			 str = addCommas(str);
			 if(Constant.SFC14.equals(lotno)) {//胜负彩
				if(str.length()>27) {
					str = Constant.ZC_SFC + Constant.ZC_FS + str;
				}else {
					str = Constant.ZC_SFC + Constant.ZC_DS + str;
				}
			 }else if(Constant.SFC9.equals(lotno)) {//任九场
				if(str.contains("$")) {
					str = Constant.ZC_RJC + Constant.ZC_DT + str;
				}else if(str.length()>27) {
					str = Constant.ZC_RJC + Constant.ZC_FS + str;
				}else {
					str = Constant.ZC_RJC + Constant.ZC_DS + str;
				}	
			}else if(Constant.JQC.equals(lotno)) {//进球彩
				if(str.length()>15) {
					str = Constant.ZC_JQC + Constant.ZC_FS + str;
				}else {
					str = Constant.ZC_JQC + Constant.ZC_DS + str;
				}	
			}else if(Constant.BQC.equals(lotno)) {//半全场
				if(str.length()>23) {
					str = Constant.ZC_BQC + Constant.ZC_FS + str;
				}else {
					str = Constant.ZC_BQC + Constant.ZC_DS + str;
				}	
			}
    	 }else if(lotno.equals(Constant.JCLQ_SF)||lotno.equals(Constant.JCLQ_RFSF)||lotno.equals(Constant.JCLQ_SFC)||lotno.equals(Constant.JCLQ_DXF)) {
			 str = addCommas(str);
			 str = str.replace(",", "|");
    	 }else{//其他彩种
			 str = str.trim().replace(",", "");
			 String strNew ="";
			 for(int d=0;d<str.length();d++){
				 strNew+=str.substring(d,d+1)+",";
			 }
			 str=strNew.substring(0,strNew.length()-1);
		 }
		 return str;
	}
	

	/**
	 * 
	 * 获取所有彩种的集合
	 * 
	 * @param lotno
	 *            彩种
	 * @param betcode
	 *            注码
	 * @param multiple
	 *            倍数
	 * @param superaddition
	 * 			大乐透彩种是否追加
	 * @return 
	 * 		 所有注码、金额、玩法、注数、倍数的集合
	 */
	public static List<BetcodeBean> getBetcodeBeanList(String lotno,
			String betcode, int multiple,boolean superaddition) {
		List<BetcodeBean> list = new ArrayList<BetcodeBean>();
		list = JCResolveService.getJCBetcodeList(lotno, betcode, multiple,Constant.TABNUMBER, Constant.JC_TAB);
		return list;
	}
	
	
	private static String addCommas(String betcode) {
		String commaBetcode = "";
		if(!betcode.contains(",")) {
			char[] betcodeChar = betcode.toCharArray();
			for(char c:betcodeChar) {
				commaBetcode = commaBetcode + c + ",";
			}
			commaBetcode = commaBetcode.substring(0, commaBetcode.length()-1);
			return commaBetcode;
		}
		return betcode;
	}
	
}
