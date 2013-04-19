package com.ruyicai.jclq.web.contrallor;

import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ruyicai.jclq.bean.Tuserinfo;
import com.ruyicai.util.BettingUtil;
import com.ruyicai.util.CommonUtil;
import com.ruyicai.util.InvokeLotteryUtil;
import com.ruyicai.util.JSONReslutUtil;





/**
 * 投注的Action
 */
@Controller
public class BettingContrallor{
	private static Logger logger = Logger.getLogger(BettingContrallor.class);
	//private Tuserinfo user = Tuserinfo.setJson(JSONReslutUtil.getUserInfo(request).getJSONObject("value"));

	
	/**
	 * 
	 * 调用jrtLot执行 适应常规彩票的 追号投注
	 * 
	 * @return 对应的跳转地址
	 * 
	 */
	@SuppressWarnings("static-access")
	@RequestMapping("/bettingByDipin.do")
	public String bettingByDipin(HttpServletRequest request,
			HttpServletResponse response) {
		
		try {
			Tuserinfo user = Tuserinfo.setJson(JSONReslutUtil.getUserInfo(request).getJSONObject("value"));
			//1.获取页面参数
			String jsonString = request.getParameter("jsonString");
			JSONObject json = JSONObject.fromObject(jsonString);
			//合买、代购、追号、赠彩 
			String hemai = request.getParameter("daiGou")==null?"daigou"
					:request.getParameter("daiGou").equals("")?"daigou"
							:request.getParameter("daiGou");
			//倍数
			String multiple = "";
			if(!hemai.equals("zengcai")){
				multiple = request.getParameter("tb_Multiple")==null?"1"
						:request.getParameter("tb_Multiple").equals("")?"1"
								:request.getParameter("tb_Multiple");
			}
			
			
			//要追的期数
			String batchNum = request.getParameter("batchNum")==null?"1"
					:request.getParameter("batchNum").equals("")?"1"
							:request.getParameter("batchNum");
			//期号和倍数的拼接串
			
			String[] qihaocheckbox = request.getParameterValues("baishucheckbox");
			//总金额
			String allqiMoney = request.getParameter("allqiMoney")==null ||"".equals(request.getParameter("allqiMoney"))?"0":request.getParameter("allqiMoney");
			//扣款方式 0.分期扣款 1.提前扣款
			String payType =request.getParameter("payType")==null || "".equals(request.getParameter("payType"))?"0":request.getParameter("payType");
			int payTypeInt = Integer.parseInt(payType);
			//单期奖金 达到多少 停止追号
			
			int danqiJIangjinInt = 0;//Integer.parseInt(danqiJIangjin);
			String danqiJIangjin1 = request.getParameter("danqiJiangjin1")==null?"0":request.getParameter("danqiJiangjin1");
			String danqiJIangjin2 = request.getParameter("danqiJiangjin2")==null?"0":request.getParameter("danqiJiangjin2");
			//收益率的描述
			String shouyiDesc = "";
			if(payTypeInt == 0){
				allqiMoney =request.getParameter("diyiqiMoney")==null || "".equals(request.getParameter("diyiqiMoney"))?"0":request.getParameter("diyiqiMoney");
				danqiJIangjinInt = Integer.parseInt(danqiJIangjin1);
				
			}else{
				danqiJIangjinInt = Integer.parseInt(danqiJIangjin2);
			}
			if(danqiJIangjinInt == 0){
				shouyiDesc = "否";
			}else{
				shouyiDesc = "单期奖金≥"+danqiJIangjinInt+"元终止追号";
			}
			//中奖后是否停止追号 1.是中奖停止，0.是不停止
			String payStop =request.getParameter("payStop")==null|| "".equals(request.getParameter("payStop"))?"0":request.getParameter("payStop");
			int payStopInt = Integer.parseInt(payStop);
			//没钱了是否下发短信 1.是下发短信，0.是不下发
			String smsType =request.getParameter("smsType") ==null|| "".equals(request.getParameter("smsType"))?"0":request.getParameter("smsType");
			int smsTypeInt = Integer.parseInt(smsType);
			
			
			logger.info("页面传入的参数为:期号和倍数的拼接串="+ qihaocheckbox + ";彩种和注码jsonString:"
					+ jsonString +"付款类型："+payType+";中奖是否停止："+payStop+";是否下发短信："+smsType);
			//体彩追加功能
			String oneMoney = request.getParameter("oneMoney")==null?"2"
					:request.getParameter("oneMoney").equals("")?"2"
							:request.getParameter("oneMoney");
			logger.info("页面传入的参数为:是否追号="+ hemai + ";彩种和注码jsonString:" + jsonString + ";倍数:" 
					+ multiple+";要追的期数:"+batchNum + ";大乐透追加金额:" + oneMoney);
			int beishu = 0; 
			if(!hemai.equals("zengcai")){
				beishu = Integer.parseInt(multiple);
			}
			// 判断注码、执行追号、投注
			String lotno = CommonUtil.getBackValue("lotno", json);
			String betcode = CommonUtil.getBackValue("betcode", json);
			String wanfa = CommonUtil.getBackValue("wanfa", json);
			
			//获取单式上传的路径和错误注码
			String path=request.getParameter("path");
			String errorCode=request.getParameter("errorCode");
			if(errorCode!=null){
				errorCode=new String(errorCode.getBytes("ISO-8859-1"),"UTF-8");
				String codes = BettingUtil.getUploadBetcodes(path, errorCode,lotno);
				logger.info("获取单式上传的注码为Codes="+codes);
				//拼接单式上传的注码
				betcode += codes;
			}
			JSONObject jsonObject = null;
			String batchCode = InvokeLotteryUtil.getIssue(lotno);//获取当前期号
			
			//获取用户选择的是代购还是追号
			if(hemai.trim().equals("daigou")){
				jsonObject = BettingUtil.getOrderBet(lotno, betcode, beishu, oneMoney, user, 
						batchCode, wanfa, request);
				logger.info("投注返回的jsonObject="+jsonObject);	
			}else if(hemai.trim().equals("hemai")){// 合买
				jsonObject = BettingUtil.getOrderBetHemai(lotno, betcode, beishu, oneMoney, user, 
						batchCode, wanfa, request);
				logger.info("投注(合买投注)返回的jsonObject="+jsonObject);
				//追号时执行调用追号功能
			}else if(hemai.trim().equals("zhuihao")){
				beishu = Integer.parseInt(multiple);
					jsonObject = BettingUtil.getSubscribeOrderByDipin(lotno, betcode, batchNum, beishu,
							oneMoney, user, qihaocheckbox, wanfa,allqiMoney,payTypeInt,smsTypeInt,payStopInt,shouyiDesc, danqiJIangjinInt,request);
				
			}
			
			String url = request.getHeader("Referer");//获取请求地址并重定向到当前地址
			String urlAdd=request.getParameter("urlAdd");
			String goId = "0";
			String gourl = "http://www.ruyicai.com/rules/user.html?key="+goId+"_view=ChildMenu2_style=menu2";
			request.setAttribute("gourl", gourl);
			request.setAttribute("cai", lotno);
			request.setAttribute("urlAdd", urlAdd);
			request.setAttribute("jsonObject", jsonObject);	
			request.setAttribute("url", url);
			
			return "/backResult/betBack";
			
		} catch (Exception e) {
			logger.error("执行投注出Exception:(Implementation of abnormal betting)" + e.toString());
			e.printStackTrace();
			return "/backResult/error";
		}
	}
	
	/**
	 *查看所有注码
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@SuppressWarnings("static-access")
	@RequestMapping("/bettingAll.do")
	public String bettingAll(HttpServletRequest request,
			HttpServletResponse response) throws UnsupportedEncodingException {
		String codeAll = request.getParameter("codeAll")==null?"":request.getParameter("codeAll");
		request.setAttribute("codeAll", codeAll);
		return "/backResult/codeAll";
	}
}
