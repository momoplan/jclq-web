package com.ruyicai.jclq.web.contrallor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ruyicai.util.JSONReslutUtil;
import com.ruyicai.jclq.sevice.UserService;



@Controller
public class UserContrallor {
	@Autowired
	UserService service;
	@RequestMapping("/log.jspa")
	public String select(HttpServletRequest request,
			HttpServletResponse resp,
			@RequestParam(value = "name", defaultValue = "") String name,
			@RequestParam(value = "pass", defaultValue = "") String pass) throws Exception {
		if(service.bindTuserinfo(name, pass)){
			return "user/login";
			}
		else{
			return "user/relogin";
		}
	}
	/**
	 * 
	 * @Title:  loginOut
	 * @Description: 用户登录退出
	 * @return:   首页
	 * @exception:
	 */
	@RequestMapping("/loginOut.do")
	public String loginOut(HttpServletRequest request,
			HttpServletResponse response){
		try {
			String url = request.getParameter("url");
			//得到用户
			JSONReslutUtil.logoutUser(request);
			request.getSession().invalidate();
			if(url!=null){
				response.sendRedirect(url);//退出成功后重定向到当前页面
			}
			return null;
		} catch (Exception e) {
			return "error";
		}
	}
	
	
	
}
