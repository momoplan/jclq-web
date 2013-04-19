// JavaScript Document

// 常用横切js

$(function() {
	$(".light").hover(function(){
		$(this).addClass("over");
	},
	function(){
		$(this).removeClass("over");
	});
});

$(function() {
	$(".switch").click(function(){
		$(this).toggleClass("SwitchOn");
	});
});

$(function() {
	$(".BaseBtn")
	//拿到.BaseButton,鼠标悬停加ButtonOver,移出后移除ButtonOver,被按下时加ButtonDown,弹起后去掉ButtonDown
	.hover(function(){ $(this).addClass("BtnOver"); }, function(){ $(this).removeClass("BtnOver"); })
	.mousedown(function(){ $(this).addClass("BtnDown"); })
	.mouseup(function(){ $(this).removeClass("BtnDown"); });
});

$(function() {
	$(".BaseTab").children().click(function(){
		var ControlTarget = $(this).attr("ControlTarget")
		$(this).siblings().removeClass("selected").end().addClass("selected");
		$(ControlTarget).siblings().removeClass("selected").end().addClass("selected");
	});
});

$(function() {
	$(".BaseList").children().click(function(){
		$(this).siblings().removeClass("selected").end().addClass("selected");
	});
});



$(function(){
		   $(".BaseTab").children().click( function(){
			var ControlTarget=$(this).attr("ControlTarget")
			$(this).siblings().removeClass("selected").end().addClass("selected");
			$(controlTarget).siblings().removeClass("selected").end().addClass("selected");
													});
		   });


