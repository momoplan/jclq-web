package com.ruyicai.jclq.web.util;

import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;

/**
 * 
 * 读取如意彩配置文件
 * 
*/
public class ResourceBundleUtil {
	private static ResourceBundle rbint = ResourceBundle.getBundle("jclq") ;
	
	//新的链接地址
	public static final String LINKURL = rbint.getString("lottery.uri");
	//发送手机短信的链接地址
	public static final String SENDURL = rbint.getString("sendUrl");
	//获取默认的渠道号
	public static String DEFALUT_SUBCHANNEL  = rbint.getString("defalut_subchannel");
	//短信计数的链接地址
	public static final String LINKSMSCOUNTURL = rbint.getString("linksmsCount");
	//前台单式上传的多个文件之间的分隔符
	public static String UPLOAD_SIGN = rbint.getString("uploadSign");
	public static String UPLOADCODES = rbint.getString("uploadCodes");
	
}
