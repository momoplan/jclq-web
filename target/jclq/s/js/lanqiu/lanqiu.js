//请求后台获取对阵的方法
function getDuiZhen(loton){
	$.ajax({
		url:"/jclq/SelectDZ.do?loton="+loton,//后台处理程序
		type:"POST",//数据发送方式
		dataType:'html',//接受数据格式
		success:function(data){
			alert(data);
			$("#daxiaofen").html(data);
			}
		
		
	});
	
}
//切换标签的选中状态
//selected:选中时对象使用的class
//nonselect：没有选中时对象使用的class
function changStatue(obj,selected,nonselect){
	objsiblings().removeClass(nonselect).end().addClass(selected);
	obj.siblings().removeClass(selected).end().addClass(nonselect);
	
}