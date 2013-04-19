package com.ruyicai.util;

import net.sf.json.JSONObject;

import com.ruyicai.jclq.bean.Tuserinfo;

public class NameUtil {
	/**
	 * 根据传入的用户对象返回用户名
	 * @param user
	 * @return
	 */
	public static String getNameUtil(Tuserinfo user){
		String returnName = "";
		if("".equals(user.getNICKNAME().trim())|| user.getNICKNAME()==null ||"null".equals(user.getNICKNAME())){
			
			if("".equals(user.getUSERNAME().trim())|| user.getUSERNAME()==null ||"null".equals(user.getUSERNAME())){
				
				if("".equals(user.getMOBILEID().trim())|| user.getMOBILEID()==null ||"null".equals(user.getMOBILEID())){
					
					if("".equals(user.getEMAIL().trim())|| user.getEMAIL()==null ||"null".equals(user.getEMAIL())){
						
						returnName = "--***";
						//System.out.println("返回的userno名字是:"+returnName);
						return returnName;
						
					}else{
						returnName = user.getEMAIL();
					}
					
				}else{
					returnName = user.getMOBILEID();
				}
				
			}else{
				returnName = user.getUSERNAME();
			}
			if(returnName.length()>5){
				returnName = returnName.substring(0,4)+"***";
			}
			
		}else{
			returnName = user.getNICKNAME();
		}
		//System.out.println("返回的名字是:"+returnName);
		return returnName;
	}
	/**
	 * 根据传入的用户对象返回用户名
	 * @param user
	 * @return
	 */
	public static String getNameUtilJson(JSONObject user){
		String returnName = "";
		if("".equals(user.get("nickname").toString().trim())|| user.get("nickname")==null ||"null".equals(user.get("nickname").toString().trim())){
			
			if("".equals(user.get("userName").toString().trim())|| user.get("userName")==null ||"null".equals(user.get("userName"))){
				
				if("".equals(user.get("mobileid").toString().trim())|| user.get("mobileid")==null ||"null".equals(user.get("mobileid").toString().trim())){
					
					if("".equals(user.get("email").toString().trim())|| user.get("email")==null ||"null".equals(user.get("email").toString().trim())){
						
						returnName = "--***";
						//System.out.println("返回的userno名字是:"+returnName);
						return returnName;
						
					}else{
						returnName = user.get("email").toString();
					}
					
				}else{
					returnName = user.get("mobileid").toString();
				}
				
			}else{
				returnName = user.get("userName").toString();
			}
			if(returnName.length()>5){
				returnName = returnName.substring(0,4)+"***";
			}
			
		}else{
			returnName = user.get("nickname").toString();
		}
		//System.out.println("返回的名字是:"+returnName);
		return returnName;
	}

}
