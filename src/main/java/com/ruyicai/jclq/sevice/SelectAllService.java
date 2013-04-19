package com.ruyicai.jclq.sevice;

import org.springframework.stereotype.Component;


@Component
public class SelectAllService {
	
	public boolean bindTuserinfo(String name,String pass)  {
		if("aa".equals(name)&&"aa".equals(pass)){
			
			return true;
		}
		else{
			return false;
		}
	}

	

}
