package com.ruyicai.jclq.web.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

public class SimpleDateUtil {
	/**
	 * 
	 * @param d
	 * @return
	 */
	public static String addOne (String d ,int n){
		String DateStr = "";
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		try {
			Date date = dateFormat.parse(d);
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);
			calendar.add(Calendar.DATE, n); 
			DateStr = dateFormat.format(calendar.getTime());
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return DateStr;
	}
	
	public static String getDate (String s){
		 Date d = null;
		    SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		    try {
			     d = formatter.parse(s);
			     DateFormat df=new SimpleDateFormat("yyyy-MM-dd");
			     return df.format(d);
		    } catch (ParseException e) {
		         e.printStackTrace();
		    }
		    return null;
	}
	/**
	 * 获取时间，格式为：yyyyMMdd
	 * */
	public static String getDate(){
		Date date=new Date();
		DateFormat df=new SimpleDateFormat("yyyyMMdd");
		return df.format(date);
	}
	/**
	 * 根据周次（1-7）, 得到星期
	 * @param sdate
	 * @return
	 */
	public static String getWeekStr(String sdate){
		   String str = "";
	      if("1".equals(sdate)){
		    str = "星期一";
		   }else if("2".equals(sdate)){
		    str = "星期二";
		   }else if("3".equals(sdate)){
		    str = "星期三";
		   }else if("4".equals(sdate)){
		    str = "星期四";
		   }else if("5".equals(sdate)){
		    str = "星期五";
		   }else if("6".equals(sdate)){
		    str = "星期六";
		   }else  if("7".equals(sdate)){
		    str = "星期七";
		   }
		   return str;
		}
	/**
	 * 
	 * @Title:  getBackValue
	 * @Description: 验证返回的json
	 * @param: str 键
	 * @return:   
	 * @throws JSONException 
	 * @exception:
	 */
	public static String getBackValue(String str,JSONObject objValue) throws JSONException{
		String result =  objValue.get(str)==null?"":objValue.getString(str).equals("")?"":objValue.getString(str) ;
		return result.trim();
	}
}
