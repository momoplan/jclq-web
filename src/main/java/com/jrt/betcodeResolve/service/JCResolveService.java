package com.jrt.betcodeResolve.service;

import java.util.ArrayList;
import java.util.List;

import com.jrt.betcodeResolve.lotnoBetcodeUtil.JCBetcodeUtil;
import com.jrt.betcodeResolve.resolve.JCBetcodeResovle;
import com.ruyicai.jclq.bean.BetcodeBean;
import com.ruyicai.util.Constant;



/**
 *      竞彩 将所有注码 玩法、倍数、金额、注码存入注码实体bean中
 * 		并且存入list中返回的类
 * 
 */
public class JCResolveService {
	
	/**
	 * @param lotno
	 * 		彩种： 
	 * @param betcode
	 * 		注码：
	 * @param multiple
	 * 		倍数 示例为1倍
	 * @param tcTabNumber
	 * 		多注之间的分隔符 示例中为"^"
	 * @param sign
	 * 		场次之间的分隔符 示例中为"|"
	 * @return 实体集合
	 * 
	 */
	public static List<BetcodeBean> getJCBetcodeList(String lotno, String betcode,
			int multiple, String tcTabNumber, String sign) {
		List<BetcodeBean> list = new ArrayList<BetcodeBean>();
		BetcodeBean betcodeBean = null;
		String zhuma = "";
		int zhushu = 0;
		int totalMoney = 0;
		
		String wanfa = betcode.substring(0,betcode.indexOf("+"));
		if(wanfa.indexOf("-")!=-1){
			for(int m=0;m<wanfa.split("-").length;m++){
				betcodeBean = new BetcodeBean();
				betcodeBean.setMultiple(String.valueOf(multiple));
				//设置彩种内容
				betcodeBean.setLotno(lotno);
				betcodeBean.setGameMethod(wanfa.split("-")[m]);
				//非单关
				if(lotno.equals(Constant.JCLQ_SFC)){
					zhushu = JCBetcodeUtil.getJCSFCDuplexZhushu(m,betcode, sign);
					totalMoney = JCBetcodeUtil.getJCDuplexMoney(m,betcode, multiple, sign);
				}else{
					zhushu = JCBetcodeUtil.getJCDuplexZhushu(m,betcode, sign);
					totalMoney = JCBetcodeUtil.getJCDuplexMoney(m,betcode, multiple, sign);
				}
				
				//设置注码
				zhuma = JCBetcodeResovle.getJCBetcode(betcode, sign);
				betcodeBean.setBetcode(wanfa.split("-")[m]+"@"+zhuma.substring(zhuma.indexOf("+")+1));
				betcodeBean.setZhushu(String.valueOf(zhushu));
				betcodeBean.setTotalMoney(String.valueOf(totalMoney));
				list.add(betcodeBean);
			}
		}else{
			betcodeBean = new BetcodeBean();
			betcodeBean.setMultiple(String.valueOf(multiple));
			//设置彩种内容
			betcodeBean.setLotno(lotno);
			betcodeBean.setGameMethod(wanfa);
			//单关玩法
			if(wanfa.equals("500")){
				if(lotno.equals(Constant.JCLQ_SFC)){
					zhushu = JCBetcodeUtil.getJCSFCSimplexZhushu(betcode, tcTabNumber);
					totalMoney = JCBetcodeUtil.getJCSFCSimplexMoney(betcode, multiple, tcTabNumber);
				}else{
					zhushu = JCBetcodeUtil.getJCSimplexZhushu(betcode, tcTabNumber);
					totalMoney = JCBetcodeUtil.getJCSimplexMoney(betcode, multiple, tcTabNumber);
				}
				
				//设置注码
				zhuma = JCBetcodeResovle.getJCBetcode(betcode, sign);
				betcodeBean.setBetcode(wanfa + "@" +zhuma.substring(zhuma.indexOf("+")+1));
				betcodeBean.setZhushu(String.valueOf(zhushu));
				betcodeBean.setTotalMoney(String.valueOf(totalMoney));
				list.add(betcodeBean);
			}else{
				//非单关
				if(lotno.equals(Constant.JCLQ_SFC)){
					zhushu = JCBetcodeUtil.getJCSFCDuplexZhushu(0,betcode, sign);
					totalMoney = JCBetcodeUtil.getJCSFCDuplexMoney(0,betcode, multiple, sign);
				}else{
					zhushu = JCBetcodeUtil.getJCDuplexZhushu(0,betcode, sign);
					totalMoney = JCBetcodeUtil.getJCDuplexMoney(0,betcode, multiple, sign);
				}
				
				//设置注码
				zhuma = JCBetcodeResovle.getJCBetcode(betcode, sign);
				betcodeBean.setBetcode(wanfa + "@" +zhuma.substring(zhuma.indexOf("+")+1));
				betcodeBean.setZhushu(String.valueOf(zhushu));
				betcodeBean.setTotalMoney(String.valueOf(totalMoney));
				list.add(betcodeBean);
			}
		}
			
		
		return list;		 
	}
	
}
