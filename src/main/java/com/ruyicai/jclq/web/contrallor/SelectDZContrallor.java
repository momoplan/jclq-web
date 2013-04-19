package com.ruyicai.jclq.web.contrallor;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.springframework.expression.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ruyicai.jclq.web.util.ResourceBundleUtil;
import com.ruyicai.util.JSONReslutUtil;




@Controller
public class SelectDZContrallor {
	private static final Logger logger = Logger.getLogger(SelectDZContrallor.class);
    private static  DateFormat df=new SimpleDateFormat("yyyy-MM-dd");
    private static  DateFormat  timedf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static  SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
    private static  DateFormat  timedfN = new SimpleDateFormat("MM-dd HH:mm:ss");
	
	/**
	 * 获取竞彩 胜平负的对阵信息
	 * 
	 * @param type
	 *            查询类别 (0 篮彩 1足彩 )
	 * @param valueType
	 *            单关 /多关赔率
	 * @param model
	 * @return
	 */
    @SuppressWarnings("static-access")
	@RequestMapping("/SelectDZ.do")
	public String getJingcaiduizhen(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(value = "type", defaultValue = "") String type,
			@RequestParam(value = "valueType") String valueType,
			@RequestParam(value = "loton") String wanfa) {
		try {
			
			JSONArray jsArr = JSONObject.fromObject(
					JSONReslutUtil.getResultMessage(ResourceBundleUtil.LINKURL+"select/getjingcaiduizhen?&type="+type)).getJSONArray("value");
			int size=jsArr.size();
			if(size>0){
			request.setAttribute("size", size);
			// 调用赔率接口
			JSONObject peilv = JSONObject.fromObject(JSONReslutUtil.getResultMessage(ResourceBundleUtil.LINKURL +"select/findjincaipeilu?","type="+type+"&valueType="+valueType,"POST"));
			String peilvs = JSONObject.fromObject(peilv).getString("value");
			if(!peilvs.equals("null")){
			JSONObject peilvjs = new JSONObject();
			if (type.equals("0")) {
				peilvjs = LqpeilvDOM(peilvs).getJSONObject("body")
						.getJSONObject("matchList");
			}
			if (type.equals("1")) {
				peilvjs = peilvDOM(peilvs).getJSONObject("body").getJSONObject(
						"matchList");
			}
			// 按着日期 把对阵信息分别储存在map中
			for (int i = 0; i < jsArr.size(); i++) {
				Object obj = jsArr.get(i);
				Map<String, Object> map = (Map<String, Object>) jsArr.get(i);
				String strArr[] = ((String) (map.get("team"))).split("\\:");
				map.put("team1", strArr[0]);
				map.put("team2", strArr[1]);
				long time = (Long) map.get("time");
				long endtime = (Long) map.get("endtime");
			    map.put("league0",modifyleague((String)(map.get("league"))));
				map.put("gameTime", timedfN.format(new Long(time)));
			    map.put("endTime", timedf.format(new Long(endtime)).substring(5));
				map.put("newday",
						df.format(formatter.parse((String) (map.get("day")))));
				map.put("newweek",
						this.getWeekStr(String.valueOf(map.get("weekid"))));
				String peilvKey = map.get("day") + "_" + map.get("weekid")
						+ "_" + map.get("teamid");
				map.put("peilv", peilvjs.getJSONObject(peilvKey));
			}
			// 调用根据时间提取相对应的当天的对阵信息返回list 页面遍历 适应足球的对阵样式
			List<List<Map<String, Object>>> duizhenList = getDuizhenByEveryDay(jsArr);
			JSONArray dayArry = new JSONArray();
			Long nowtime = Long.valueOf(formatter.format(new Date()));
			for(int i=0;i<7;i++){
				JSONObject day = new JSONObject();
				day.put("showdays", df.format(formatter.parse(String.valueOf(nowtime))));
				day.put("selectdays", String.valueOf(nowtime));
				dayArry.add(day);
				nowtime--;
			}
			request.setAttribute("dayArry", dayArry);
			// 解析字符串
			logger.info("竞彩lottery返回数据处理后的结果：" + jsArr.toString());
			request.setAttribute("wanfa", wanfa);
			request.setAttribute("duizhenInfo", duizhenList);
			}
			else{
				return	getSucRul(wanfa);
			}}else{
				return	getFailRul(wanfa);
				
			}
		} catch (Exception e) {
			logger.debug("获取竞彩对阵信息异常！");
		}
		return	getSucRul(wanfa);
	}
    //获取跳转的地址
    public String getSucRul(String loton){
    	String url="touzhu/";
    	if("J00005".equals(loton)){
			url=url+"shengfu";
		}else if("J00006".equals(loton)){
			url=url+"rfshengfu";
		}else if("J00007".equals(loton)){
			url=url+"shengfencha";
		}else if("J00008".equals(loton)){
			url=url+"daxiaofen";
		}
    	return url;
    }
    public String getFailRul(String loton){
    	String url="touzhu/";
    	if("J00005".equals(loton)){
			url=url+"failshengfu";
		}else if("J00006".equals(loton)){
			url=url+"failrfshengfu";
		}else if("J00007".equals(loton)){
			url=url+"failshengfencha";
		}else if("J00008".equals(loton)){
			url=url+"faildaxiaofen";
		}
    	return url;
    }
	/* * 
	 * @param type
	 *            查询类别 (0 篮彩 1足彩 )
	 * @param valueType
	 *            单关 /多关赔率
	 * @param model
	 * @return
	 */
	@SuppressWarnings("static-access")
	@RequestMapping("/selectSG.do")
	public String getJingcaisaiguo(HttpServletRequest request,
			HttpServletResponse response,	@RequestParam(value = "type", defaultValue = "") String type,
			@RequestParam(value = "valueType") String valueType,
			@RequestParam(value = "date", defaultValue = "") String date,
			@RequestParam(value = "loton") String loton) {
		try {
			//date = "20120504";
			if("".equals(date)){
				date =formatter.format(new Date());
			}else{
				date =date.replace("-","");
			}
			//查询比赛结果
			JSONObject saiguo = JSONObject.fromObject(JSONReslutUtil.getResultMessage(ResourceBundleUtil.LINKURL +"select/getjingcairesultlimit?","date="+date+"&type="+type,"POST"));
			if(!saiguo.isEmpty()&&!saiguo.isNullObject()&&!saiguo.getJSONObject("value").isEmpty()&&!saiguo.getJSONObject("value").isNullObject()){
				JSONArray resultArry = saiguo.getJSONObject("value").getJSONArray("list");
			// 按着日期 把对阵信息分别储存在map中
			for (int i = 0; i < resultArry.size(); i++) {
				JSONObject obj = (JSONObject) resultArry.get(i);
				JSONObject matches = obj.getJSONObject("matches");
				JSONObject result = obj.getJSONObject("result");
				String strArr[] = ((String) (matches.getString("team"))).split("\\:");
				if(result.getString("result")!="null"){
				String[]  resultArr = (result.getString("result")).split("\\:");
				result.put("result",resultArr[1]+ ":"+resultArr[0]);
				if(Integer.valueOf(resultArr[0])>Integer.valueOf(resultArr[1])){
					result.put("newResult", "主胜");
					result.put("newResult1", "小分");
				}else{
					result.put("newResult", "主负");
					result.put("newResult1", "大分");
				}
				}else{
					result.put("newResult", "");
				}
				matches.put("team1", strArr[0]);
				matches.put("team2", strArr[1]);
				long time = matches.getLong("time");
				long endtime = matches.getLong("endtime");
				matches.put("league0",modifyleague((String)(matches.getString("league"))));
				matches.put("gameTime", timedfN.format(new Long(time)));
				matches.put("endTime", timedf.format(new Long(endtime)).substring(5));
				matches.put("newday",
						df.format(formatter.parse((matches.getString("day")))));
				matches.put("newweek",
						this.getWeekStr(matches.getString("weekid")));
			}
			/*JSONArray dayArry = new JSONArray();
			Long nowtime = Long.valueOf(formatter.format(new Date()));
			for(int i=0;i<7;i++){
				JSONObject day = new JSONObject();
				day.put("showdays", df.format(formatter.parse(String.valueOf(nowtime))));
				day.put("selectdays", String.valueOf(nowtime));
				dayArry.add(day);
				nowtime--;
			}
			request.setAttribute("dayArry", dayArry);*/
			// 解析字符串
			logger.info("竞彩lottery返回数据处理后的结果：" + resultArry.toString());
			request.setAttribute("wanfa", loton);
			request.setAttribute("saiguoInfo", resultArry);
			}
		} catch (Exception e) {
			logger.debug("获取竞彩对阵信息异常！");
		}
		return "/query/drawlotteryInfo";
	}
	/**
	 * 根据day 的信息分离对阵
	 * 
	 * @param arr
	 * @return
	 * @throws java.text.ParseException 
	 * @throws java.text.ParseException 
	 */
	@SuppressWarnings("unchecked")
	public List<List<Map<String, Object>>> getDuizhenByEveryDay(List<Object> li) throws java.text.ParseException  {

		Map<String, Object> mp = new HashMap<String, Object>();
		List<List<Map<String, Object>>> list = new ArrayList<List<Map<String, Object>>>();
		for (int j = 0; j < 6; j++) {// 循环6天的数据
			String newday = this.addOne(this.getDate(), j);
			List<Map<String, Object>> listArr = new ArrayList<Map<String, Object>>();
			for (int i = 0; i < li.size(); i++) {
				mp = (Map<String, Object>) li.get(i);
				String day = (String) (mp.get("day"));
				if (day.equals(newday)) {
					listArr.add(mp);
				}
			}
			list.add(listArr);
		}
		return list;
	}

	/**
	 * 竞彩足球赔率解析
	 * 
	 * @return <vs> ,<score>,<goal>,<half> 对应足彩胜负 比分，总进 比分，总进球，半全场胜负
	 *         此方法应用DOM4j来解析赔率的XML字符串
	 * @param obj
	 *            XML字符串
	 */
	public JSONObject peilvDOM(String obj) {
		JSONObject jsonAll = null;
		try {
			// 后台返回的是XML字符串，采用dom4j 解析
			Document doc = DocumentHelper.parseText(obj);
			// 获取根节点的名称
			Element rootElt = doc.getRootElement();
			// 创建MAP储存list. 遍历缓存数据
			jsonAll = new JSONObject();
			// 获取message 子节点head属性数组
			Iterator Ihead = rootElt.elementIterator("head");
			while (Ihead.hasNext()) {
				// 遍历head 获取数据并且储存
				JSONObject json = new JSONObject();
				Element head = (Element) Ihead.next();
				String messageId = head.elementTextTrim("messageId");
				String result = head.elementTextTrim("result");
				String md = head.elementTextTrim("md");
				json.put("messageId", messageId);
				json.put("result", result);
				json.put("md", md);
				jsonAll.put("head", json);
			}
			// 获取message子节点body 数据
			Iterator Ibody = rootElt.elementIterator("body");
			// 遍历head节点
			JSONObject jsonmatchList = null;
			while (Ibody.hasNext()) {
				jsonmatchList = new JSONObject();
				Element body = (Element) Ibody.next();
				// body 下没有要获取的值 next获取body的子节点matchList
				Iterator ImatchList = body.elementIterator("matchList");
				Element matchList = (Element) ImatchList.next();
				Iterator Iitem = matchList.elementIterator("item");
				JSONObject jsonItem = null;
				Map<String, JSONObject> m = new HashMap<String, JSONObject>();
				while (Iitem.hasNext()) {
					jsonItem = new JSONObject();
					Element item = (Element) Iitem.next();
					String id = item.elementTextTrim("id");
					jsonItem.put("id", id);
					Iterator vslist = item.elementIterator("vs");
					while (vslist.hasNext()) {
						JSONObject json = new JSONObject();
						Element vsele = (Element) vslist.next();
						String v0 = vsele.elementTextTrim("v0");
						String v1 = vsele.elementTextTrim("v1");
						String v3 = vsele.elementTextTrim("v3");
						String letPoint = vsele.elementTextTrim("letPoint");
						json.put("v0", v0);
						json.put("v1", v1);
						json.put("v3", v3);
						json.put("letPoint", letPoint);
						jsonItem.put("vs", json);
					}
					// 遍历score结点下的数据浮动奖金 浮动奖金 (赔率 )
					Iterator scorelist = item.elementIterator("score");
					while (scorelist.hasNext()) {
						Element scorele = (Element) scorelist.next();
						JSONObject ddd = getVsElement(scorele);
						jsonItem.put("score", ddd);
					}
					// 遍历goal结点下的数据
					Iterator goallist = item.elementIterator("goal");
					while (goallist.hasNext()) {
						Element goalele = (Element) goallist.next();
						JSONObject li = getGoalElement(goalele);
						jsonItem.put("goal", li);
					}
					// 遍历half结点数据
					Iterator halflist = item.elementIterator("half");
					while (halflist.hasNext()) {
						Element goalele = (Element) halflist.next();
						// 因跨度太大没有用for循环
						String v00 = goalele.elementTextTrim("v00");
						String v01 = goalele.elementTextTrim("v01");
						String v03 = goalele.elementTextTrim("v03");
						String v10 = goalele.elementTextTrim("v10");
						String v11 = goalele.elementTextTrim("v11");
						String v13 = goalele.elementTextTrim("v13");
						String v30 = goalele.elementTextTrim("v30");
						String v31 = goalele.elementTextTrim("v31");
						String v33 = goalele.elementTextTrim("v33");
						JSONObject jsHalf = new JSONObject();
						jsHalf.put("v00", v00);
						jsHalf.put("v01", v01);
						jsHalf.put("v03", v03);
						jsHalf.put("v10", v10);
						jsHalf.put("v11", v11);
						jsHalf.put("v13", v13);
						jsHalf.put("v30", v30);
						jsHalf.put("v31", v31);
						jsHalf.put("v33", v33);
						jsonItem.put("half", jsHalf);
					}
					m.put(id, jsonItem);
				}
				jsonmatchList.put("matchList", m);
			}
			jsonAll.put("body", jsonmatchList);
			// 存放到body
		} catch (DocumentException e) {
			e.printStackTrace();
			logger.debug("将字符串转为XML出现异常！");
		}
		return jsonAll;
	}

	/**
	 * 篮球赔率解析
	 * 
	 * @return *<vs>，<letVs>，<bs> , <diff > 对应篮彩胜负，让分胜负，大小分，分差
	 *         此方法应用DOM4j来解析赔率的XML字符串
	 * @param obj
	 *            XML字符串
	 */
	public JSONObject LqpeilvDOM(String obj) {
		JSONObject jsonAll = null;
		try {
			// 后台返回的是XML字符串，采用dom4j 解析
			Document doc = DocumentHelper.parseText(obj);
			// 获取根节点的名称
			Element rootElt = doc.getRootElement();
			// 创建MAP储存list. 遍历缓存数据
			jsonAll = new JSONObject();
			// 获取message 子节点head属性数组
			Iterator Ihead = rootElt.elementIterator("head");
			while (Ihead.hasNext()) {
				// 遍历head 获取数据并且储存
				JSONObject json = new JSONObject();
				Element head = (Element) Ihead.next();
				String messageId = head.elementTextTrim("messageId");
				String result = head.elementTextTrim("result");
				String md = head.elementTextTrim("md");
				json.put("messageId", messageId);
				json.put("result", result);
				json.put("md", md);
				jsonAll.put("head", json);
			}
			// 获取message子节点body 数据
			Iterator Ibody = rootElt.elementIterator("body");
			// 遍历head节点
			JSONObject jsonmatchList = null;
			while (Ibody.hasNext()) {
				jsonmatchList = new JSONObject();
				Element body = (Element) Ibody.next();
				// body 下没有要获取的值 next获取body的子节点matchList
				Iterator ImatchList = body.elementIterator("matchList");
				Element matchList = (Element) ImatchList.next();
				Iterator Iitem = matchList.elementIterator("item");
				JSONObject jsonItem = null;
				Map<String, JSONObject> m = new HashMap<String, JSONObject>();
				while (Iitem.hasNext()) {
					jsonItem = new JSONObject();
					Element item = (Element) Iitem.next();
					String id = item.elementTextTrim("id");
					jsonItem.put("id", id);
					Iterator vslist = item.elementIterator("vs");
					while (vslist.hasNext()) {
						JSONObject json = new JSONObject();
						Element vsele = (Element) vslist.next();
						String v0 = vsele.elementTextTrim("v0");// 主负
						String v3 = vsele.elementTextTrim("v3");// 主胜
						json.put("v0", v0);
						json.put("v3", v3);
						jsonItem.put("vs", json);
					}
					// 遍历letVs结点下的数据让分胜负的赔率
					Iterator letVslist = item.elementIterator("letVs");
					while (letVslist.hasNext()) {
						JSONObject json = new JSONObject();
						Element letVs = (Element) letVslist.next();
						String v0 = letVs.elementTextTrim("v0");// 主负
						String v3 = letVs.elementTextTrim("v3");// 主胜
						String letPoint = letVs.elementTextTrim("letPoint");// 让分
						json.put("v0", v0);
						json.put("v3", v3);
						json.put("letPoint", letPoint);
						jsonItem.put("letVs", json);
					}
					// 遍历bs结点下的数据
					Iterator bslist = item.elementIterator("bs");
					while (bslist.hasNext()) {
						JSONObject json = new JSONObject();
						Element bs = (Element) bslist.next();
						String g = bs.elementTextTrim("g");// 大于预设总分浮动奖金(赔率)
						String l = bs.elementTextTrim("l");// 小于预设总分浮动奖金(赔率)
						String basePoint = bs.elementTextTrim("basePoint");// 预设总分
						json.put("g", g);
						json.put("l", l);
						json.put("basePoint", basePoint);
						jsonItem.put("bs", json);
					}
					// 遍历diff结点数据
					Iterator difflist = item.elementIterator("diff");
					while (difflist.hasNext()) {
						Element diff = (Element) difflist.next();
						String v01 = diff.elementTextTrim("v01");
						String v02 = diff.elementTextTrim("v02");
						String v03 = diff.elementTextTrim("v03");
						String v04 = diff.elementTextTrim("v04");
						String v05 = diff.elementTextTrim("v05");
						String v06 = diff.elementTextTrim("v06");
						String v11 = diff.elementTextTrim("v11");
						String v12 = diff.elementTextTrim("v12");
						String v13 = diff.elementTextTrim("v13");
						String v14 = diff.elementTextTrim("v14");
						String v15 = diff.elementTextTrim("v15");
						String v16 = diff.elementTextTrim("v16");

						JSONObject json = new JSONObject();
						json.put("v01", v01);
						json.put("v02", v02);
						json.put("v03", v03);
						json.put("v04", v04);
						json.put("v05", v05);
						json.put("v06", v06);
						json.put("v11", v11);
						json.put("v12", v12);
						json.put("v13", v13);
						json.put("v14", v14);
						json.put("v15", v15);
						json.put("v16", v16);
						jsonItem.put("diff", json);
					}
					m.put(id, jsonItem);
				}
				jsonmatchList.put("matchList", m);
			}
			jsonAll.put("body", jsonmatchList);
			// 存放到body
		} catch (DocumentException e) {
			e.printStackTrace();
			logger.debug("将字符串转为XML出现异常！");
		}
		return jsonAll;
	}

	/**
	 * @param scorele
	 * @return
	 */
	public JSONObject getVsElement(Element scorele) {
		String var = "";
		String scoreValue = "";
		JSONObject js = new JSONObject();
		for (int i = 0; i < 100; i++) {
			if (i < 10) {
				var = "v0" + String.valueOf(i);
			} else {
				var = "v" + String.valueOf(i);
			}
			scoreValue = scorele.elementTextTrim(var);
			js.put(var, scoreValue);
		}
		return js;

	}

	/**
	 * @param goal
	 * @return
	 */
	public JSONObject getGoalElement(Element goal) {
		String var = "";
		String goalValue = "";
		JSONObject js = new JSONObject();
		for (int i = 0; i < 100; i++) {
			var = "v" + String.valueOf(i);
			goalValue = goal.elementTextTrim(var);
			js.put(var, goalValue);
		}
		return js;

	}

	/**
	 * 
	 * @return 赛果
	 */

	public JSONObject getResult(
			@RequestParam(value = "type", defaultValue = "0") String type,
			@RequestParam("date") String date, Model model) {
		try {
			// 获取系统当天时间
			Date dateTime = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			String today = sdf.format(dateTime);
			// 从页面得到参数数据
			// 发送请求获取比例的数据
			// LotteryResponse response =
			// lotteryService.setUrlByPOSTLottery(lottery+"/getjingcairesult","type="+type+"&date="+date);

		} catch (Exception e) {
		}
		return null;

	}
	@RequestMapping(value="/jclqdeatil.jspa")
	public String toJclqDeatil( 
			@RequestParam(value="zf") String zf,
			@RequestParam(value="zs") String zs,
			@RequestParam(value="teamid") String teamid,
			Model model){
		return "";
		
	}

	/**
	 * 这个延后（国家赛事太多，做不了。） 更换赛事name
	 * 
	 * @param name
	 *            此功能以国家为1级搜索词 每个国家又以超级 ，杯 ，甲乙丙级为2级搜索词 （甲乙丙级联赛的下属赛事为4级）
	 *            以国家之中的特有联赛为3级搜索词 每 个国家
	 * 
	 * 
	 * @return
	 */
	public String modifyleague(String name) {
		//关键词  甲级联赛 超级联赛  非职业联赛  乙组联赛 足总杯 联赛杯  意大利杯  超级杯  国王杯  丙組
		if(name.equals("美国职业篮球联盟")){
			return "NBA";
		}
		return name;

	}

	/**
	 * 
	 * @param d
	 * @return
	 * @throws java.text.ParseException 
	 */
	public String addOne(String d, int n) throws java.text.ParseException {
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

	/**
	 * 获取时间，格式为：yyyyMMdd
	 * */
	public String getDate() {
		Date date = new Date();
		DateFormat df = new SimpleDateFormat("yyyyMMdd");
		return df.format(date);
	}

	/**
	 * 根据周次（1-7）, 得到星期
	 * 
	 * @param sdate
	 * @return
	 */
	public static String getWeekStr(String sdate) {
		String str = "";
		if ("1".equals(sdate)) {
			str = "星期一";
		} else if ("2".equals(sdate)) {
			str = "星期二";
		} else if ("3".equals(sdate)) {
			str = "星期三";
		} else if ("4".equals(sdate)) {
			str = "星期四";
		} else if ("5".equals(sdate)) {
			str = "星期五";
		} else if ("6".equals(sdate)) {
			str = "星期六";
		} else if ("7".equals(sdate)) {
			str = "星期七";
		}
		return str;
	}

}
