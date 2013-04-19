package com.ruyicai.jclq.web.util;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;


import com.ruyicai.util.JSONReslutUtil;
import com.ruyicai.util.MD5.PaySign;


/**
 * 活动相关的功能
 *
 */
public class dto_Sales {
	private Logger log = Logger.getLogger(dto_Sales.class);
	public static final String INTERFACE_KEY="ruyicaiwebgood";
	
	private Long id ; 
	private String userNo;//用户编号
	private String userName;//用户名
	private String creTime;//购买时间
	private Integer amt;//本次交易金额
	private String lotNo;//彩种编号
	private String wanfa;//玩法
	private String memo;//备注
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUserNo() {
		return userNo;
	}
	public void setUserNo(String userNo) {
		this.userNo = userNo;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getCreTime() {
		return creTime;
	}
	public void setCreTime(String creTime) {
		this.creTime = creTime;
	}
	public Integer getAmt() {
		return amt;
	}
	public void setAmt(Integer amt) {
		this.amt = amt;
	}
	public String getLotNo() {
		return lotNo;
	}
	public void setLotNo(String lotNo) {
		this.lotNo = lotNo;
	}
	public String getWanfa() {
		return wanfa;
	}
	public void setWanfa(String wanfa) {
		this.wanfa = wanfa;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public static dto_Sales getSales(Long id ,String userNo,String userName,
			String creTime,Integer amt,String lotNo,String wanfa,String memo) {
		dto_Sales ds = new dto_Sales();
		ds.setId(id);
		ds.setUserNo(userNo);
		ds.setUserName(userName);
		ds.setCreTime(creTime);
		ds.setAmt(amt);
		ds.setLotNo(lotNo);
		ds.setWanfa(wanfa);
		ds.setMemo(memo);
		return ds;
	}

	
	public String toString() {
		return "dto_Sales [log=" + log + ", id=" + id + ", userNo=" + userNo
				+ ", userName=" + userName + ", creTime=" + creTime + ", amt="
				+ amt + ", lotNo=" + lotNo + ", wanfa=" + wanfa + ", memo="
				+ memo + "]";
	}
	/**
	 * 
	 * @param id
	 * @param userNo
	 * @param userName
	 * @param creTime
	 * @param amt
	 * @param lotNo
	 * @param wanfa
	 * @param memo
	 */
	public static void recordedSales(String userNo,String userName,
			Integer amt,String lotNo,String wanfa,String memo){
		try {
			//调用jrtcms接口 组成json 并获得加密mac 请求jrtcms
			JSONObject obj = JSONObject.fromObject(dto_Sales.getSales(null,userNo,userName,null,amt,lotNo,wanfa,memo));
			
			String md5code = userNo + INTERFACE_KEY;
			String md5 = PaySign.EncoderByMd5(md5code);
			
			if(md5.indexOf("+")>-1){
				md5 = md5.replaceAll("\\+", "_");
			}
			md5 = URLEncoder.encode(md5);
			JSONReslutUtil.getResultMessage(
					ResourceBundleUtil.SENDURL + "/Interface!createSales?",
					"sales="+obj+"&userno=" + userNo + "&interfaceType=002&Mac=" + md5, "POST");
			
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	
}

