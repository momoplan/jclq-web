<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
      <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
		<div class="competingEventLeft">
		  <p><span class="Eventselect">联赛选择</span><span class="EventJzh">
		    <input type="checkbox" class="input" name="checkbox2" value="checkbox" />
		  	  已截止（<font id="JZTemNum">0</font>场） 已隐藏<font id="hidTemNum">0</font>场赛事　<font onclick="recoveryTem();" class="hand">恢复</font></span>
		    <span class="EventQuery">赛事回查
			  <select name="select">
			    <option>3131313123</option>
			  </select>
			</span>
		</p>
		  <table class="competingEventTable" >
			  <thead>
			  <tr>
				<td width="69" rowspan="2">赛事编号</td>
				<td width="68" rowspan="2">赛事类型</td>
				<td width="84" rowspan="2">
				<select id="changTime" onchange="changtime()">
			<option value="0" selected>比赛时间</option>
			<option value="1">截止时间</option>
			</select></td> 
				<td width="103" rowspan="2">客队/主队</td>
				<td colspan="7">投注</td>
				</tr>
			  <tr>
			    <td width="50">&nbsp;</td>
			    <td width="50">1-5</td>
			    <td width="50">6-10</td>
			    <td width="50">11-15</td>
			    <td width="50">16-20</td>
			    <td width="50">21-25</td>
			    <td width="50">26+</td>
			  </tr>
			  </thead>
			  <tbody>
			  <c:forEach items="${duizhenInfo}" var="duizhens"  >
			   <c:forEach items="${duizhens}" var="duizhen" varStatus="s" >
			   <input type="hidden" name="teamid" value="${duizhen.teamid}">
			   <c:if test="${s.index==0 }">
			   <input type="hidden" name="day" value="${duizhen.day}|${duizhen.weekid}">
			   <tr class="show${duizhen.day}" style="display:none">
				<th colspan="11" class="week">${duizhen.newday}${duizhen.newweek}　<font onclick='change("${duizhen.day}")' class="hand">显示</font></th>
			  </tr>
			   <tr class="hide${duizhen.day}">
				<th colspan="11" class="week">${duizhen.newday}${duizhen.newweek}　<font onclick='change("${duizhen.day}")' class="hand">隐藏</font></th>
			  </tr>
			   </c:if>
			   <tr <c:if test="${s.index%2!=0}">class="gray day${duizhen.day}"</c:if>  class="day${duizhen.day}" id="${duizhen.teamid}">
				<td rowspan="2"><input type="checkbox" id="check_${duizhen.teamid}" class="input" onclick='hideTeam("${duizhen.teamid}")' checked="checked"/>${duizhen.newweek}${duizhen.teamid}</td>
				<td class="red" rowspan="2">${duizhen.league}</td>
				<td class="game_Times" rowspan="2">${duizhen.gameTime}</td>
				<td class="end_Times" style="display:none" rowspan="2">${duizhen.endTime}</td>
				<td ><font id="v_${duizhen.day}_${duizhen.teamid}">${duizhen.team1}</font></td>
				<th>客胜</th>
				<th><span class="result_3 result_${duizhen.teamid}" id="result_k1_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k1","${duizhen.teamid}")'>${duizhen.peilv.diff.v01 }</span></th>
				<th><span class="result_3 result_${duizhen.teamid}" id="result_k2_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k2","${duizhen.teamid}")'>${duizhen.peilv.diff.v02 }</span></th>
				<th><span class="result_3 result_${duizhen.teamid}" id="result_k3_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k3","${duizhen.teamid}")'>${duizhen.peilv.diff.v03 }</span></th>
				<th><span class="result_3 result_${duizhen.teamid}" id="result_k4_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k4","${duizhen.teamid}")'>${duizhen.peilv.diff.v04 }</span></th>
				<th><span class="result_3 result_${duizhen.teamid}" id="result_k5_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k5","${duizhen.teamid}")'>${duizhen.peilv.diff.v05 }</span></th>
				<th><span class="result_3 result_${duizhen.teamid}" id="result_k6_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","k6","${duizhen.teamid}")'>${duizhen.peilv.diff.v06 }</span></th>
			  </tr>
			 <tr <c:if test="${s.index%2!=0}">class="gray day${duizhen.day}"</c:if>  class="day${duizhen.day}" id="${duizhen.teamid}">
			    <td><font id="h_${duizhen.day}_${duizhen.teamid}">${duizhen.team1}</font></td>
				<th>主胜</th>
				<th><span class="result_3 result_${duizhen.teamid}" id="result_z1_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z1","${duizhen.teamid}")'>${duizhen.peilv.diff.v11 }</span></th>
				<th><span class="result_3 result_${duizhen.teamid}" id="result_z2_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z2","${duizhen.teamid}")'>${duizhen.peilv.diff.v12 }</span></th>
				<th><span class="result_3 result_${duizhen.teamid}" id="result_z3_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z3","${duizhen.teamid}")'>${duizhen.peilv.diff.v13 }</span></th>
				<th><span class="result_3 result_${duizhen.teamid}" id="result_z4_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z4","${duizhen.teamid}")'>${duizhen.peilv.diff.v14 }</span></th>
				<th><span class="result_3 result_${duizhen.teamid}" id="result_z5_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z5","${duizhen.teamid}")'>${duizhen.peilv.diff.v15 }</span></th>
				<th><span class="result_3 result_${duizhen.teamid}" id="result_z6_${duizhen.day}_${duizhen.teamid}" onclick='checkColorSFC($(this),"${duizhen.day}","${duizhen.newweek}","z6","${duizhen.teamid}")'>${duizhen.peilv.diff.v16 }</span></th>
			  </tr>
			  </c:forEach>
			  </c:forEach>
			  </tbody>
		  </table>
	  </div>
	   <input type="hidden" id="hidTemId" value="">
	  <script>
	  //var  sfmatchNum=0;
	  /***
	  **selected 1:1-5 2:6-10 3:11-15 4:16-20 5:21-26 6:26+
	  **
	  */
	  /*function checkColor(obj,day,week,selected,teamid){
		  if($("#result_"+selected+"_"+day+"_"+teamid).hasClass("result_3")){
			  $("#result_"+selected+"_"+day+"_"+teamid).removeClass("result_3").addClass("result_1");
		  }else{
			  $("#result_"+selected+"_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		  }
		  checkZhuma();
		  addRighTZInfo(obj,day,week,selected,teamid);
		  $("#matchNum").html(sfmatchNum);
		  
	  }
	//显示自由过关咯多串过关的选项
	  function addRighBWInfo(obj,day,week,selected,teamid){
		  if(sfmatchNum>1&&sfmatchNum<9){
			  $("#r"+sfmatchNum+"c1").css("display","");
		  }
		//定义数组存放多串投注方式时的id编号
			if (sfmatchNum == 3) {
				var more = ["3", "4"];
			} else if (sfmatchNum == 4) {
				var more = ["4", "5", "6", "11"];
			} else if (sfmatchNum == 5) {
				var more = ["5", "6", "10", "16", "20", "26"];
			} else if (sfmatchNum == 6) {
				var more = ["6", "7", "15", "20", "22", "35", "42", "50", "57"];
			} else if (sfmatchNum == 7) {
				var more = ["7", "8", "21", "35", "120"];
			} else if (sfmatchNum == 8) {
				var more = ["8", "9", "28", "56", "70", "247"];
			}

			for (var j = 3; j <= sfmatchNum; j++) {
				for (var m = 0; m < more.length; m++) {
					var id = "r" + sfmatchNum + "c" + more[m];
					$("#" + id).css("display", "");
				}
			}
		  
	  }
	  //显示自由过关咯多串过关的选项
	  function removeRighBWInfo(sfmatchNum){
				  $("#r"+sfmatchNum+"c1").remove();
				  if (sfmatchNum == 3) {
						var more = ["3", "4"];
					} else if (sfmatchNum == 4) {
						var more = ["4", "5", "6", "11"];
					} else if (sfmatchNum == 5) {
						var more = ["5", "6", "10", "16", "20", "26"];
					} else if (sfmatchNum == 6) {
						var more = ["6", "7", "15", "20", "22", "35", "42", "50", "57"];
					} else if (sfmatchNum == 7) {
						var more = ["7", "8", "21", "35", "120"];
					} else if (sfmatchNum == 8) {
						var more = ["8", "9", "28", "56", "70", "247"];
					}

					for (var j = 3; j <= sfmatchNum; j++) {
						for (var m = 0; m < more.length; m++) {
							var id = "r" + sfmatchNum + "c" + more[m];
							$("#" + id).css("display", "none");
						}
					}
		  
	  }
	  //显示选择的赛事信息
	  function addRighTZInfo(obj,day,week,selected,teamid){
		  //如果是按钮式选不中状态，则删除 对应的投注信息
		  if(obj.hasClass("result_3")){
			 //二次点击时移除赛事信息
			  if($("#choose_"+day+"_"+teamid).html().length>0){
				  $("#"+selected+"-"+day+"-"+teamid).removeClass("selected");
			  }
			  if( $("#result_k1_"+day+"_"+teamid).hasClass("result_3")&& $("#result_k2_"+day+"_"+teamid).hasClass("result_3")&& $("#result_k3_"+day+"_"+teamid).hasClass("result_3")&&$("#result_k4_"+day+"_"+teamid).hasClass("result_3")&&$("#result_k5_"+day+"_"+teamid).hasClass("result_3")&&
				 $("#result_k5_"+day+"_"+teamid).hasClass("result_3")&&$("#result_k6_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z1_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z2_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z3_"+day+"_"+teamid).hasClass("result_3")&&
				 $("#result_z4_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z5_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z6_"+day+"_"+teamid).hasClass("result_3")){
				  //移除自由过关咯多串过关的选项
				  $("#r"+sfmatchNum+"c1").remove();
				  sfmatchNum-=1;  
				  $("#choose_"+day+"_"+teamid).remove();
				  $("#choose2_"+day+"_"+teamid).remove();
			  } 
			 
		  }else{
			  var str =$("#choose_"+day+"_"+teamid).html();
 			if(str!=null){
 				$("#"+selected+"-"+day+"-"+teamid).addClass("selected");
		  }else{
			  sfmatchNum+=1;
		  //获取主队名称 并判断大小分
		  var hTeam =$("#h_"+day+"_"+teamid).html();
		  var vTeam =$("#v_"+day+"_"+teamid).html();
		  var str ='"'+selected+'"';
		  var aa ='"';
		  var info =
			  "<tr id='choose_"+day+"_"+teamid+"'><td><dl onclick='removeInfo($(this),"+day+","+str+","+teamid+
			  ",1)' class='CheckBox light Switch' ><dt></dt><dd id='no-"+day+"-"+teamid+"'>"+week+teamid+"</dd></dl></td><td colspan='2' id='homeTeam-"+day+"-"+teamid+
			  "'>"+vTeam+"v"+vTeam+"</td> <td> <input name='' type='checkbox' value='' /></td></tr><tr  id='choose2_"+day+"_"+teamid+
			  "'><td colspan='4' align='left'><span class='CheckWin' id='k1"+"-"+day+"-"+teamid+"' onclick='removeInfo($(this),"+day+","+aa+"k1"+aa+","+teamid+
			  ",0)'>客胜1-5</span><span class='CheckLoss' id='k2"+"-"+day+"-"+teamid+ "' onclick='removeInfo($(this),"+day+","+aa+"k2"+aa+","+teamid+
			  ",0)'>客胜6-10</span><span class='CheckLoss' id='k3"+"-"+day+"-"+teamid+"' onclick='removeInfo($(this),"+day+","+aa+"k3"+aa+","+teamid+
			  ",0)'>客胜11-15</span><span class='CheckLoss' id='k4"+"-"+day+"-"+teamid+ "' onclick='removeInfo($(this),"+day+","+aa+"k4"+aa+","+teamid+
			  ",0)'>客胜16-20</span><span class='CheckWin'id='k5"+"-"+day+"-"+teamid +"' onclick='removeInfo($(this),"+day+","+aa+"k5"+aa+","+teamid+
			 ",0)'>客胜21-25</span><span class='CheckLoss' id='k6"+"-"+day+"-"+teamid+"'onclick='removeInfo($(this),"+day+","+aa+"k6"+aa+","+teamid+
			  ",0)'>客胜26+</span><span class='CheckLoss' id='z1"+"-"+day+"-"+teamid+ "'onclick='removeInfo($(this),"+day+","+aa+"z1"+aa+","+teamid+
			  ",0)'>主胜1-5</span><span class='CheckLoss' id='z2"+"-"+day+"-"+teamid+"'onclick='removeInfo($(this),"+day+","+aa+"z2"+aa+","+teamid+
			  ",0)'>主胜6-10</span><span class='CheckWin' id='z3"+"-"+day+"-"+teamid+ "'onclick='removeInfo($(this),"+day+","+aa+"z3"+aa+","+teamid+
			  ",0)'>主胜11-15</span><span class='CheckLoss' id='z4"+"-"+day+"-"+teamid+"'onclick='removeInfo($(this),"+day+","+aa+"z4"+aa+","+teamid+
			  ",0)'>主胜16-20</span><span class='CheckLoss' id='z5"+"-"+day+"-"+teamid+"'onclick='removeInfo($(this),"+day+","+aa+"z5"+aa+","+teamid+
			  ",0)'>主胜21-25</span><span class='CheckLoss' id='z6"+"-"+day+"-"+teamid+"'onclick='removeInfo($(this),"+day+","+aa+"z6"+aa+","+teamid+
			  ",0)'>主胜26+</span></td></tr>";
		  $("#choose_list").append(info);
		  //自由过关咯多串过关的选项
		  checkZhuma();
		  addRighBWInfo(obj,day,week,selected,teamid);
			$("#"+selected+"-"+day+"-"+teamid).addClass("selected");
		  }
		 
		  }
	  }
	  //flag 1:表示删除整场赛  0:删除半场比赛
	  function removeInfo(obj,day,selected,teamid,flag){
		  if(flag==1){
			  $("#result_k1_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			  $("#result_k2_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			  $("#result_k3_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			  $("#result_k4_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			  $("#result_k5_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			  $("#result_k6_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			  $("#result_z1_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			  $("#result_z2_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			  $("#result_z3_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			  $("#result_z4_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			  $("#result_z5_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			  $("#result_z6_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			  $("#choose_"+day+"_"+teamid).remove();
			  $("#choose2_"+day+"_"+teamid).remove();
			  $("#r"+sfmatchNum+"c1").remove();
			  sfmatchNum-=1; 
			  //移除自由过关咯多串过关的选项
		  }else if(flag==0){
			  $("#"+selected+"-"+day+"-"+teamid).removeClass("selected");
			  $("#result_"+selected+"_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			  if( $("#result_k1_"+day+"_"+teamid).hasClass("result_3")&& $("#result_k2_"+day+"_"+teamid).hasClass("result_3")&& $("#result_k3_"+day+"_"+teamid).hasClass("result_3")&&$("#result_k4_"+day+"_"+teamid).hasClass("result_3")&&$("#result_k5_"+day+"_"+teamid).hasClass("result_3")&&
						 $("#result_k5_"+day+"_"+teamid).hasClass("result_3")&&$("#result_k6_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z1_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z2_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z3_"+day+"_"+teamid).hasClass("result_3")&&
						 $("#result_z4_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z5_"+day+"_"+teamid).hasClass("result_3")&&$("#result_z6_"+day+"_"+teamid).hasClass("result_3")){
				  $("#result_1_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
				  $("#result_0_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
				  $("#choose_"+day+"_"+teamid).remove();
				  $("#choose2_"+day+"_"+teamid).remove();
				  //移除自由过关咯多串过关的选项
				  $("#r"+sfmatchNum+"c1").remove();
				  sfmatchNum-=1; 
				 
			  }
		  }
		  
		  $("#matchNum").html(sfmatchNum);
	  }
	  function checkZhuma(){
		  $("option", $("#list_LotteryNumber")).remove();
			$("#codes li").remove();
		  var zhuma="";
		  //获取比赛的teamid组合
			var teamidArr = [];
			$("input[name='teamid']").each(function(i) {
				teamidArr[i] =$(this).val();
			});
		//获取日期和周的组合
			var dayweekArr = [];
			$("input[name='day']").each(function(i) {
				dayweekArr[i] = $(this).val();
			});
			
			for(var j=0;j<dayweekArr.length;j++){
			for(var i=0;i<teamidArr.length;i++){
					var day =dayweekArr[j].split("|")[0];
					if( $("#result_k1_"+day+"_"+teamidArr[i]).hasClass("result_1")|| $("#result_k2_"+day+"_"+teamidArr[i]).hasClass("result_1")|| $("#result_k3_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_k4_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_k5_"+day+"_"+teamidArr[i]).hasClass("result_1")||
							 $("#result_k5_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_k6_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z1_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z2_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z3_"+day+"_"+teamidArr[i]).hasClass("result_1")||
							 $("#result_z4_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z5_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z6_"+day+"_"+teamidArr[i]).hasClass("result_1")){
						zhuma=zhuma+dayweekArr[j]+"|"+teamidArr[i]+"|";
					}
					for(var i=1;i<7;i++){
					if($("#result_k"+i+"_"+day+"_"+teamidArr[i]).hasClass("result_1")){
						zhuma=zhuma+"0"+i;
					}
					if($("#result_z"+i+"_"+day+"_"+teamidArr[i]).hasClass("result_1")){
						zhuma=zhuma+"1"+i;
					}
					}
					if( $("#result_k1_"+day+"_"+teamidArr[i]).hasClass("result_1")|| $("#result_k2_"+day+"_"+teamidArr[i]).hasClass("result_1")|| $("#result_k3_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_k4_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_k5_"+day+"_"+teamidArr[i]).hasClass("result_1")||
							 $("#result_k5_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_k6_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z1_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z2_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z3_"+day+"_"+teamidArr[i]).hasClass("result_1")||
							 $("#result_z4_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z5_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_z6_"+day+"_"+teamidArr[i]).hasClass("result_1")){
						zhuma=zhuma+"^";
					}else{
						zhuma=zhuma;
					}
				}
			alert(zhuma);
			}

			var lotteryListSelect = $("#list_LotteryNumber");
			var opt;
			var wanfa = saleMa();
			if (wanfa.indexOf("|") != -1) {
				for (var k = 0; k < wanfa.split("|").length; k++) {
					opt = new Option(zhuma, zhuma);
					opt.setAttribute('wangFang', wanfa.split("|")[k]);
					add_codes(zhuma, zhuma);
					lotteryListSelect[k].options.add(opt);
				}
			} else {
				opt = new Option(zhuma, zhuma);
				opt.setAttribute('wangFang', wanfa);
				add_codes(zhuma, zhuma);
				lotteryListSelect[0].options.add(opt);
			}

			//添加到弹出框的注码
			$("#alert_zhuma").text(zhuma);
		  }
	  function saleMa() {
			var allWanfa = "";
			if ($("#allWanfa").val().indexOf("|") != -1) {
				var wanfaArr = $("#allWanfa").val().split("|");
				for (var m = 1; m < wanfaArr.length; m++) {
					if (wanfaArr[m] == "2串1") {
						wanfaArr[m] = "502";
					} else if (wanfaArr[m] == "3串1") {
						wanfaArr[m] = "503";
					} else if (wanfaArr[m] == "4串1") {
						wanfaArr[m] = "504";
					} else if (wanfaArr[m] == "5串1") {
						wanfaArr[m] = "505";
					} else if (wanfaArr[m] == "6串1") {
						wanfaArr[m] = "506";
					} else if (wanfaArr[m] == "7串1") {
						wanfaArr[m] = "507";
					} else if (wanfaArr[m] == "8串1") {
						wanfaArr[m] = "508";
					} else if (wanfaArr[m] == "3串3") {
						wanfaArr[m] = "526";
					} else if (wanfaArr[m] == "3串4") {
						wanfaArr[m] = "527";
					} else if (wanfaArr[m] == "4串6") {
						wanfaArr[m] = "528";
					} else if (wanfaArr[m] == "4串11") {
						wanfaArr[m] = "529";
					} else if (wanfaArr[m] == "5串10") {
						wanfaArr[m] = "530";
					} else if (wanfaArr[m] == "5串20") {
						wanfaArr[m] = "531";
					} else if (wanfaArr[m] == "5串26") {
						wanfaArr[m] = "532";
					} else if (wanfaArr[m] == "6串15") {
						wanfaArr[m] = "533";
					} else if (wanfaArr[m] == "6串35") {
						wanfaArr[m] = "534";
					} else if (wanfaArr[m] == "6串50") {
						wanfaArr[m] = "535";
					} else if (wanfaArr[m] == "6串57") {
						wanfaArr[m] = "536";
					} else if (wanfaArr[m] == "7串120") {
						wanfaArr[m] = "537";
					} else if (wanfaArr[m] == "8串247") {
						wanfaArr[m] = "538";
					} else if (wanfaArr[m] == "4串4") {
						wanfaArr[m] = "539";
					} else if (wanfaArr[m] == "4串5") {
						wanfaArr[m] = "540";
					} else if (wanfaArr[m] == "5串16") {
						wanfaArr[m] = "541";
					} else if (wanfaArr[m] == "6串20") {
						wanfaArr[m] = "542";
					} else if (wanfaArr[m] == "6串42") {
						wanfaArr[m] = "543";
					} else if (wanfaArr[m] == "5串5") {
						wanfaArr[m] = "544";
					} else if (wanfaArr[m] == "5串6") {
						wanfaArr[m] = "545";
					} else if (wanfaArr[m] == "6串22") {
						wanfaArr[m] = "546";
					} else if (wanfaArr[m] == "7串35") {
						wanfaArr[m] = "547";
					} else if (wanfaArr[m] == "8串70") {
						wanfaArr[m] = "548";
					} else if (wanfaArr[m] == "6串6") {
						wanfaArr[m] = "549";
					} else if (wanfaArr[m] == "6串7") {
						wanfaArr[m] = "550";
					} else if (wanfaArr[m] == "7串21") {
						wanfaArr[m] = "551";
					} else if (wanfaArr[m] == "8串56") {
						wanfaArr[m] = "552";
					} else if (wanfaArr[m] == "7串7") {
						wanfaArr[m] = "553";
					} else if (wanfaArr[m] == "7串8") {
						wanfaArr[m] = "554";
					} else if (wanfaArr[m] == "8串28") {
						wanfaArr[m] = "555";
					} else if (wanfaArr[m] == "8串8") {
						wanfaArr[m] = "556";
					} else if (wanfaArr[m] == "8串9") {
						wanfaArr[m] = "557";
					}
					allWanfa += wanfaArr[m] + "-";
				}
				allWanfa = allWanfa.substring(0, allWanfa.length - 1);
			} else {
				allWanfa = $("#allWanfa").val();
			}

			return allWanfa;
		}*/
	  </script>
	  <script type="text/javascript">cleanReady();</script>