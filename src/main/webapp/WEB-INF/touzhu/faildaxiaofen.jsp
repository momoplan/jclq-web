<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
		<div class="competingEventLeft">
		<div class="zucaitableceng1">
		<div class="zucaitu"><img src="/images/honggantan.gif" /></div>
		<div class="zucaizi"><img src="/images/zucaitsh.gif" /></div>
		</div>
		  <p><span class="Eventselect">联赛选择</span><span class="EventJzh">
		    <input type="checkbox" class="input" name="checkbox2" value="checkbox" />
		    已截止（<font id="JZTemNum">0</font>场） 已隐藏<font id="hidTemNum">0</font >场赛事　<font onclick="recoveryTem();" class="hand">恢复</font></span>
		    <span class="EventQuery">赛事回查
			  <select name="select" onchange='searchRDZ();' id="searchSg">
			   <c:forEach items="${dayArry}" var="dayArry"  >
			    <option value ="${dayArry.selectdays }">${dayArry.showdays }</option>
			    </c:forEach>
			  </select>
			</span>
		 </p>
		  <table class="competingEventTable" >
			  <thead>
			  <tr>
				<td width="94" rowspan="2">赛事编号</td>
				<td width="93" rowspan="2">赛事类型</td>
				<td width="102" rowspan="2">
				<select id="changTime" onchange="changtime()">
			<option value="0" selected>比赛时间</option>
			<option value="1">截止时间</option>
			</select></td> 
				<td width="177" rowspan="2">客队  预设总分  主队</td>
				<!-- <td width="106" rowspan="2">
				<select name="">
			<option>平均赔率</option>
			</select></td> -->
				<td colspan="2">投注</td>
				</tr>
			  <tr>
			    <td width="48">大分</td>
			    <td width="46">小分</td>
			  </tr>
			  </thead>
			  <tbody>
			  <c:forEach items="${duizhenInfo}" var="duizhens"  >
			   <c:forEach items="${duizhens}" var="duizhen" varStatus="s" >
			   <input type="hidden" name="teamid" value="${duizhen.teamid}">
			   <c:if test="${s.index==0 }">
			   <input type="hidden" name="day" value="${duizhen.day}|${duizhen.weekid}">
			   <tr class="show${duizhen.day}" style="display:none" >
				<th colspan="7" class="week">${duizhen.newday}${duizhen.newweek}　<font onclick='change("${duizhen.day}")' class="hand">显示</font></th>
			  </tr>
			   <tr class="hide${duizhen.day}">
				<th colspan="7" class="week">${duizhen.newday}${duizhen.newweek}　<font onclick='change("${duizhen.day}")' class="hand">隐藏</font></th>
			  </tr>
			   </c:if>
			   <tr <c:if test="${s.index%2!=0}">class="gray day${duizhen.day}"</c:if>  class="day${duizhen.day}" id="${duizhen.teamid}">
				<td><input type="checkbox" id="check_${duizhen.teamid}"class="input" onclick='hideTeam("${duizhen.teamid}")' checked="checked"/>${duizhen.newweek}${duizhen.teamid}</td>
				<td class="red">${duizhen.league}</td>
				<td class="game_Times">${duizhen.gameTime}</td>
				<td class="end_Times" style="display:none">${duizhen.endTime}</td>
				<td><font id="v_${duizhen.day}_${duizhen.teamid}">${duizhen.team1}</font>  ${duizhen.peilv.bs.basePoint }  <font id="h_${duizhen.day}_${duizhen.teamid}">${duizhen.team2 }</font></td>
				<!-- <td>1.49　3.75</td> -->
				<th><span class="result_3 result_${duizhen.teamid}" id="result_1_${duizhen.day}_${duizhen.teamid}" onclick='checkColor($(this),"${duizhen.day}","${duizhen.newweek}",1,"${duizhen.teamid}")'>${duizhen.peilv.bs.g }</span></th>
				<th><span class="result_3 result_${duizhen.teamid}" id="result_0_${duizhen.day}_${duizhen.teamid}" onclick='checkColor($(this),"${duizhen.day}","${duizhen.newweek}",0,"${duizhen.teamid}")'>${duizhen.peilv.bs.l }</span></th>
			  </tr>
			  </c:forEach>
			  </c:forEach>
			  </tbody>
		  </table>
	  </div>
	  <input type="hidden" id="hidTemId" value="">
	  <input type="hidden" id="selectedTemId" value="">
	  <script>
	  //var  matchNum=0;
	  /***
	  **daxiao 1:大分  0 xiaofen
	  **
	  */
	  /*function checkColor(obj,day,week,daxiao,teamid){
		  if($("#result_"+daxiao+"_"+day+"_"+teamid).hasClass("result_3")){
			  $("#result_"+daxiao+"_"+day+"_"+teamid).removeClass("result_3").addClass("result_1");
		  }else{
			  $("#result_"+daxiao+"_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
		  }
		  checkZhuma();
		  addRighTZInfo(obj,day,week,daxiao,teamid);
		  $("#matchNum").html(matchNum);
	  }
	  //显示自由过关咯多串过关的选项
	  function addRighBWInfo(obj,day,week,daxiao,teamid){
		  if(matchNum>1&&matchNum<9){
			  $("#r"+matchNum+"c1").css("display","");
		  }
		//定义数组存放多串投注方式时的id编号
			if (matchNum == 3) {
				var more = ["3", "4"];
			} else if (matchNum == 4) {
				var more = ["4", "5", "6", "11"];
			} else if (matchNum == 5) {
				var more = ["5", "6", "10", "16", "20", "26"];
			} else if (matchNum == 6) {
				var more = ["6", "7", "15", "20", "22", "35", "42", "50", "57"];
			} else if (matchNum == 7) {
				var more = ["7", "8", "21", "35", "120"];
			} else if (matchNum == 8) {
				var more = ["8", "9", "28", "56", "70", "247"];
			}

			for (var j = 3; j <= matchNum; j++) {
				for (var m = 0; m < more.length; m++) {
					var id = "r" + matchNum + "c" + more[m];
					$("#" + id).css("display", "");
				}
			}
		  
	  }
	  //显示自由过关咯多串过关的选项
	  function removeRighBWInfo(matchNum){
				  $("#r"+matchNum+"c1").remove();
				//定义数组存放多串投注方式时的id编号
					if (matchNum == 3) {
						var more = ["3", "4"];
					} else if (matchNum == 4) {
						var more = ["4", "5", "6", "11"];
					} else if (matchNum == 5) {
						var more = ["5", "6", "10", "16", "20", "26"];
					} else if (matchNum == 6) {
						var more = ["6", "7", "15", "20", "22", "35", "42", "50", "57"];
					} else if (matchNum == 7) {
						var more = ["7", "8", "21", "35", "120"];
					} else if (matchNum == 8) {
						var more = ["8", "9", "28", "56", "70", "247"];
					}

					for (var j = 3; j <= matchNum; j++) {
						for (var m = 0; m < more.length; m++) {
							var id = "r" + matchNum + "c" + more[m];
							$("#" + id).css("display", "none");
						}
					}
		  
	  }
	  //显示选择的赛事信息
	  function addRighTZInfo(obj,day,week,daxiao,teamid){
		  //如果是按钮式选不中状态，则删除 对应的投注信息
		  if(obj.hasClass("result_3")){
			 
			  if($("#result_0"+"_"+day+"_"+teamid).hasClass("result_3")||$("#result_1"+"_"+day+"_"+teamid).hasClass("result_3")){
				  if(daxiao==0){
					  $("#xiao-"+day+"-"+teamid).removeClass("selected");
				  }else if(daxiao==1){
					  $("#da-"+day+"-"+teamid).removeClass("selected");
				  }
			  }
			  if($("#result_0"+"_"+day+"_"+teamid).hasClass("result_3")&&$("#result_1"+"_"+day+"_"+teamid).hasClass("result_3")){
				  //移除自由过关咯多串过关的选项
				  $("#r"+matchNum+"c1").remove();
				  matchNum-=1;  
				  $("#choose_"+day+"_"+teamid).remove();
			  }
			 
		  }else{
		  //如果大小分全部选中，则不再重复加入
		  if($("#result_0"+"_"+day+"_"+teamid).hasClass("result_1")&&$("#result_1"+"_"+day+"_"+teamid).hasClass("result_1")){
			  if(daxiao==0){
				  $("#xiao-"+day+"-"+teamid).addClass("selected");
			  }else if(daxiao==1){
				  $("#da-"+day+"-"+teamid).addClass("selected");
			  }
		  }else{
			  matchNum+=1;
		  //获取主队名称 并判断大小分
		  var hTeam =$("#h_"+day+"_"+teamid).html();
		  var info ="<tr id='choose_"+day+"_"+teamid+"'><td><dl onclick='removeInfo($(this),"+day+","+daxiao+","+teamid+",1)' class='CheckBox light Switch'><dt></dt><dd id='no-"+daxiao+"-"+day+"-"+teamid+"'>"+week+teamid+"</dd></dl></td><td id='homeTeam-"+daxiao+"-"+day+"-"+teamid+"'>"+hTeam+"</td><td><span onclick='removeInfo($(this),"+day+",1,"+teamid+",0)' class='CheckWin' id='da-"+day+"-"+teamid+"'>大分</span><span onclick='removeInfo($(this),"+day+",0,"+teamid+",0)'class='CheckLoss' id='xiao-"+day+"-"+teamid+"'>小分</span></td><td><input name='' type='checkbox' value='' /></td></tr>";
		  $("#choose_list").append(info);
		  //自由过关咯多串过关的选项
		  checkZhuma();
		  addRighBWInfo(obj,day,week,daxiao,teamid);
		  if(daxiao==0){
			  $("#xiao-"+day+"-"+teamid).addClass("selected");
		  }else if(daxiao==1){
			  $("#da-"+day+"-"+teamid).addClass("selected");
		  }
		  }
		 
		  }
	  }
	  //flag 1:表示删除整场赛  0:删除半场比赛
	  function removeInfo(obj,day,daxiao,teamid,flag){
		  if(flag==1){
			  $("#result_1_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			  $("#result_0_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
			  $("#choose_"+day+"_"+teamid).remove();
			  //移除自由过关咯多串过关的选项
			  $("#r"+matchNum+"c1").remove();
			  matchNum-=1;  
		  }else if(flag==0){
			  if(daxiao==0){
				  $("#xiao-"+day+"-"+teamid).removeClass("selected");
			  }else if(daxiao==1){
				  $("#da-"+day+"-"+teamid).removeClass("selected");
			  }
			  if(!$("#xiao-"+day+"-"+teamid).hasClass("selected")&&!$("#da-"+day+"-"+teamid).hasClass("selected")){
				  $("#result_1_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
				  $("#result_0_"+day+"_"+teamid).removeClass("result_1").addClass("result_3");
				  $("#choose_"+day+"_"+teamid).remove();
				  //移除自由过关咯多串过关的选项
				  $("#r"+matchNum+"c1").remove();
				  matchNum-=1;    
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
					if($("#result_1_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_0_"+day+"_"+teamidArr[i]).hasClass("result_1")){
						zhuma=zhuma+dayweekArr[j]+"|"+teamidArr[i]+"|";
					}
					if($("#result_1_"+day+"_"+teamidArr[i]).hasClass("result_1")){
						zhuma=zhuma+"1";
					}
					if($("#result_0_"+day+"_"+teamidArr[i]).hasClass("result_1")){
						zhuma=zhuma+"2";
					}
					if($("#result_1_"+day+"_"+teamidArr[i]).hasClass("result_1")||$("#result_0_"+day+"_"+teamidArr[i]).hasClass("result_1")){
						zhuma=zhuma+"^";
					}else{
						zhuma=zhuma;
					}
				}
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