package com.ruyicai.util;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.sf.json.JSONObject;
import com.ruyicai.jclq.web.util.ResourceBundleUtil;


/**
 * 调用lottery的类
 * 
 * @author Administrator
 * 
 */
public class InvokeLotteryUtil {
	/**
	 * 调用新接口查询返回内容
	 * {"value":{"id":{"lotno":"F47104","batchcode":"2011270","agencyno"
	 * :"R00001"},"state":0,"starttime":1307947628000,"endtime":1308120428000},
	 * "errorCode":"0"}
	 * @param lotno
	 * 			彩种
	 * @return 查询到的信息
	 * @throws IOException
	 */
	public static JSONObject getIssueObject(String lotno) throws IOException {
		// 调用lottery中查询期号的方法
		String re = JSONReslutUtil.getResultMessage(ResourceBundleUtil.LINKURL
				+ "/select/getIssue?", "lotno=" + lotno, "POST");
		JSONObject obj = JSONObject.fromObject(re);
		if (!obj.isNullObject() && 
				CommonUtil.getBackValue("errorCode", obj).equals(LotErrorCode.NEW_OK)) {
			String value = CommonUtil.getBackValue("value", obj); 
			
			//判断返回的value是否不为null值
			if (!value.equals("null") && !value.equals("") && value != null) {
				
				JSONObject objValue = JSONObject.fromObject(value);
				if(!objValue.isNullObject()){
					
					JSONObject jsonId = JSONObject.fromObject(CommonUtil.getBackValue("id", objValue));
					objValue.put("lotno", CommonUtil.getBackValue("lotno", jsonId));
					objValue.put("batchCode", CommonUtil.getBackValue("batchcode", jsonId));
					objValue.put("agencyno", CommonUtil.getBackValue("agencyno", jsonId));
					objValue.remove("id");
					
					//将结束时间转换为年-月-日 时:分:秒
					objValue.put("end_time", getEndTime(CommonUtil.getBackValue("endbettime", objValue)));
					return objValue;
				}
				
			}
		}
		return null;
	}

	/**
	 * 根据彩种得到期号
	 * 
	 * @param lotno
	 *            彩种
	 * @return 期号
	 * @throws IOException
	 */
	public static String getIssue(String lotno) throws IOException {
		//获取期号
		JSONObject obj = getIssueObject(lotno);
		if(obj!=null){
			System.out.println("获得的期号为"+ CommonUtil.getBackValue("batchCode", obj));
			return CommonUtil.getBackValue("batchCode", obj);
		}
		return "";
	}

	/**
	 * 获取截止时间转换为年-月-日 时:分:秒
	 * 
	 * @param endTime 毫秒数
	 * @return
	 * @throws IOException
	 */
	public static String getEndTime(String endTime) throws IOException {
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		long ms = Long.parseLong(endTime);
		Date date = new Date(ms);
		endTime = sdf.format(date);
		return endTime;
	}

	//调用 查询总记录条数和总金额的方法
	public static JSONObject getTongjiInfo (String beginTime,String endTime,String userno,Integer types) throws Exception{
		
		JSONObject returnObject = JSONObject.fromObject(JSONReslutUtil.getResultMessage(ResourceBundleUtil.LINKURL + 
				"/select/getTransWithTongji?userno=" + userno + "&beginTime=" + beginTime + "&endTime="+ endTime+"&types="+types));
		
		return returnObject;
	}
	
}
